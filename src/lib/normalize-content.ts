import { COPY_LIMITS as L, CAROUSEL_SLIDE_TYPES } from "./constants";
import { PROMO_PATTERN } from "./promo";
import type { GeneratedContent, PromoMode, SlideContent } from "./types";

/** Potong di batas kata terakhir yang muat, tanpa memotong di tengah kata. */
export function clampText(text: unknown, maxChars: number): string {
  const s = String(text ?? "").replace(/\s+/g, " ").trim();
  if (s.length <= maxChars) return s;
  const cut = s.slice(0, maxChars + 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > maxChars * 0.5 ? cut.slice(0, lastSpace) : s.slice(0, maxChars)).replace(/[,.;:\-–]+$/, "");
}

export interface NormalizeResult {
  content: GeneratedContent;
  warnings: string[]; // untuk console.warn / telemetry, tidak ditampilkan ke user
}

const EMOJI_PATTERN = /\p{Extended_Pictographic}/gu;
const HASHTAG_PATTERN = /#[\p{L}\p{N}_]+/gu;

/** Bersihkan bullet: tanpa emoji, tanpa titik di akhir, dipotong sesuai batas. */
function cleanBullet(raw: unknown): string {
  const noEmoji = String(raw ?? "").replace(EMOJI_PATTERN, "");
  return clampText(noEmoji.replace(/\.+\s*$/, ""), L.bullet.maxChars);
}

/** Angka (tanpa pemisah) yang muncul di teks. "Rp 15.000" -> ["15", "000"]. */
function digitGroups(text: string): string[] {
  return text.match(/\d+/g) ?? [];
}

function hasUnknownNumber(text: string, allowed: Set<string>): boolean {
  return digitGroups(text).some((n) => !allowed.has(n));
}

function asRecord(v: unknown): Record<string, unknown> | null {
  return v && typeof v === "object" && !Array.isArray(v) ? (v as Record<string, unknown>) : null;
}

/**
 * Memastikan apa pun yang dikembalikan AI aman untuk layout, dan diskon karangan
 * tidak pernah sampai ke slide. Mengembalikan null jika struktur tidak bisa diperbaiki.
 */
export function normalizeContent(
  raw: unknown,
  promoMode: PromoMode,
  userText: string // gabungan input user, untuk cek "angka ini ada di input user?"
): NormalizeResult | null {
  const root = asRecord(raw);
  if (!root || !Array.isArray(root.slides)) return null;
  const rawSlides: unknown[] = root.slides;

  const warnings: string[] = [];
  const allowedNumbers = new Set(digitGroups(userText));

  // 1. Struktur: ambil slide per tipe, urutan dibetulkan jika AI menukar urutan.
  const byType = new Map<string, Record<string, unknown>>();
  for (const item of rawSlides) {
    const rec = asRecord(item);
    if (rec && typeof rec.type === "string" && !byType.has(rec.type)) byType.set(rec.type, rec);
  }
  if (CAROUSEL_SLIDE_TYPES.some((t) => !byType.has(t))) return null;
  const ordered = CAROUSEL_SLIDE_TYPES.map((t) => byType.get(t)!);
  if (ordered.some((s, i) => s !== rawSlides[i])) warnings.push("urutan slide diperbaiki");

  const intro = ordered[0];
  const features = ordered[1];
  const benefits = ordered[2];
  const promo = ordered[3];
  const cta = ordered[4];

  // 2. Panjang judul & subjudul
  const title = (rec: Record<string, unknown>, label: string) => {
    const text = clampText(rec.title, L.title.maxChars);
    if (String(rec.title ?? "").trim().length > L.title.maxChars) warnings.push(`${label}.title dipotong`);
    return text;
  };

  const introSlide: SlideContent = {
    type: "intro",
    title: title(intro, "intro"),
    subtitle: clampText(intro.subtitle, L.subtitle.maxChars),
  };

  // 3. Bullets: maks 3, tanpa emoji dan titik di akhir (komponen aman untuk 1–3 bullet)
  const bulletsOf = (rec: Record<string, unknown>, label: string) => {
    const list = Array.isArray(rec.bullets) ? rec.bullets : [];
    const cleaned = list
      .map((b) => cleanBullet(b))
      .filter(Boolean)
      .slice(0, L.bulletCount);
    if (cleaned.length === 0) warnings.push(`${label}.bullets kosong`);
    return cleaned;
  };
  const featureBullets = bulletsOf(features, "features");
  const benefitBullets = bulletsOf(benefits, "benefits");
  if (featureBullets.length === 0 || benefitBullets.length === 0) return null;

  const featuresSlide: SlideContent = {
    type: "features",
    title: title(features, "features"),
    bullets: featureBullets,
  };
  const benefitsSlide: SlideContent = {
    type: "benefits",
    title: title(benefits, "benefits"),
    bullets: benefitBullets,
  };

  // 4. Duplikasi slide 2 vs 3 (cukup dicatat dulu)
  const featureSet = new Set(featureBullets.map((b) => b.toLowerCase()));
  if (benefitBullets.some((b) => featureSet.has(b.toLowerCase()))) {
    warnings.push("bullet benefits sama dengan features");
  }

  // 5. Anti-halusinasi promo (lapis kedua)
  const promoFields = {
    title: clampText(promo.title, L.title.maxChars),
    promoText: clampText(promo.promoText, L.promoText.maxChars),
    highlightBadge: clampText(promo.highlightBadge, L.highlightBadge.maxChars),
  };
  const ctaText = clampText(cta.ctaText, L.ctaText.maxChars);

  let ctaFinal = ctaText;
  if (promoMode === "value") {
    const promoLeak = [promoFields.title, promoFields.promoText, promoFields.highlightBadge].some((t) =>
      PROMO_PATTERN.test(t)
    );
    if (promoLeak) {
      warnings.push("slide promo (value) mengandung kata promo, diganti fallback");
      promoFields.highlightBadge = "FAVORIT";
      promoFields.promoText = clampText(intro.subtitle, L.promoText.maxChars);
      promoFields.title = "Wajib Coba!";
    }
    if (PROMO_PATTERN.test(ctaFinal)) {
      warnings.push("ctaText (value) mengandung kata promo, diganti fallback");
      ctaFinal = "Yuk, langsung pesan sekarang";
    }
  } else {
    // Mode promo: setiap angka di slide 4 harus berasal dari input user.
    const fallbacks = {
      title: "Penawaran Spesial",
      promoText: clampText(intro.subtitle, L.promoText.maxChars),
      highlightBadge: "PROMO",
    } as const;
    for (const key of ["title", "promoText", "highlightBadge"] as const) {
      if (hasUnknownNumber(promoFields[key], allowedNumbers)) {
        warnings.push(`angka promo karangan di ${key} diganti fallback`);
        promoFields[key] = fallbacks[key];
      }
    }
  }

  const promoSlide: SlideContent = {
    type: "promo",
    mode: promoMode,
    title: promoFields.title,
    promoText: promoFields.promoText,
    highlightBadge: promoFields.highlightBadge || undefined,
  };
  const ctaSlide: SlideContent = {
    type: "cta",
    title: title(cta, "cta"),
    ctaText: ctaFinal,
  };

  // 6. Caption: pastikan blok terpisah baris kosong, hashtag di baris terakhir,
  //    dan buang baris yang memuat angka/promo karangan.
  const rawCaption = String(root.caption ?? "").replace(/\r\n/g, "\n").trim();
  if (!rawCaption) return null;

  const captionHashtags = rawCaption.match(HASHTAG_PATTERN) ?? [];
  const aiHashtags = Array.isArray(root.hashtags)
    ? root.hashtags.filter((h): h is string => typeof h === "string")
    : [];
  const hashtagSet: string[] = [];
  for (const h of [...aiHashtags, ...captionHashtags]) {
    const tag = h.startsWith("#") ? h : `#${h.replace(/^#+/, "")}`;
    const clean = tag.replace(/[^\p{L}\p{N}_#]/gu, "");
    if (clean.length > 1 && !hashtagSet.some((x) => x.toLowerCase() === clean.toLowerCase())) {
      hashtagSet.push(clean);
    }
  }
  const hashtags = hashtagSet.slice(0, L.hashtagCount.max);

  let blocks = rawCaption
    .replace(HASHTAG_PATTERN, "")
    .split(/\n\s*\n/)
    .map((b) => b.replace(/[ \t]+\n/g, "\n").replace(/[ \t]{2,}/g, " ").trim())
    .filter(Boolean);
  if (blocks.length === 1 && !blocks[0].includes("\n")) {
    // Tanpa jeda baris: kalimat pertama jadi hook, sisanya paragraf.
    const sentences = blocks[0].split(/(?<=[.!?])\s+/).filter(Boolean);
    if (sentences.length > 1) {
      blocks = [sentences[0], sentences.slice(1).join(" ")];
      warnings.push("caption dipecah otomatis");
    }
  }

  const isPromoLeak = (block: string) =>
    promoMode === "value"
      ? PROMO_PATTERN.test(block)
      : hasUnknownNumber(block, allowedNumbers);
  const keptBlocks = blocks.filter((b) => !isPromoLeak(b));
  if (keptBlocks.length !== blocks.length) warnings.push("caption: blok promo karangan dibuang");

  const captionBody = keptBlocks.join("\n\n");
  if (!captionBody) return null;
  const caption = hashtags.length ? `${captionBody}\n\n${hashtags.join(" ")}` : captionBody;

  // 7. WhatsApp template (opsional)
  const whatsappTemplate =
    typeof root.whatsappTemplate === "string" && root.whatsappTemplate.trim()
      ? clampText(root.whatsappTemplate, L.whatsapp.maxChars)
      : undefined;

  const content: GeneratedContent = {
    caption,
    hashtags,
    whatsappTemplate,
    slides: [introSlide, featuresSlide, benefitsSlide, promoSlide, ctaSlide] as GeneratedContent["slides"],
  };

  return { content, warnings };
}
