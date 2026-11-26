import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import {
  ArrowRight,
  Bookmark,
  Check,
  Lightbulb,
  Sparkles,
  X,
} from "lucide-react";
import { FONT_FAMILY, LOKAGEN_COLORS, MONO_FONT } from "../reels-rabu/palette";

export type SelasaSlideProps = {
  slideIndex: 1 | 2 | 3 | 4 | 5;
};

const SubtleGrid: React.FC<{ dark?: boolean }> = ({ dark = false }) => {
  const stroke = dark ? "rgba(255, 248, 240, 0.05)" : "rgba(28, 25, 23, 0.05)";
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `linear-gradient(to right, ${stroke} 1px, transparent 1px), linear-gradient(to bottom, ${stroke} 1px, transparent 1px)`,
        backgroundSize: "54px 54px",
        pointerEvents: "none",
      }}
    />
  );
};

const SlideChrome: React.FC<{
  slideIndex: number;
  totalSlides?: number;
  tag: string;
  dark?: boolean;
  footerRight?: string;
  children: React.ReactNode;
}> = ({
  slideIndex,
  totalSlides = 5,
  tag,
  dark = false,
  footerRight = "Geser →",
  children,
}) => {
  const fg = dark ? LOKAGEN_COLORS.krim : LOKAGEN_COLORS.arang;
  const muted = dark ? LOKAGEN_COLORS.mutedLight : LOKAGEN_COLORS.mutedDark;
  const border = dark
    ? "rgba(255, 248, 240, 0.14)"
    : "rgba(28, 25, 23, 0.12)";

  return (
    <AbsoluteFill
      style={{
        backgroundColor: dark ? LOKAGEN_COLORS.arang : LOKAGEN_COLORS.krim,
        fontFamily: FONT_FAMILY,
        padding: "64px 72px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        color: fg,
      }}
    >
      <SubtleGrid dark={dark} />

      {/* Top Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 22px",
            borderRadius: 999,
            backgroundColor: dark
              ? "rgba(245, 158, 11, 0.16)"
              : "rgba(194, 65, 12, 0.1)",
            color: dark ? LOKAGEN_COLORS.kunyit : LOKAGEN_COLORS.sambal,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
          }}
        >
          <span>{tag}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ display: "flex", gap: 8 }}>
            {Array.from({ length: totalSlides }).map((_, i) => {
              const active = i + 1 === slideIndex;
              return (
                <div
                  key={i}
                  style={{
                    width: active ? 32 : 10,
                    height: 10,
                    borderRadius: 999,
                    backgroundColor: active
                      ? dark
                        ? LOKAGEN_COLORS.kunyit
                        : LOKAGEN_COLORS.sambal
                      : border,
                  }}
                />
              );
            })}
          </div>
          <span
            style={{
              fontFamily: MONO_FONT,
              fontSize: 22,
              fontWeight: 700,
              color: muted,
            }}
          >
            0{slideIndex}/0{totalSlides}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          zIndex: 1,
        }}
      >
        {children}
      </div>

      {/* Footer */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 26,
          borderTop: `2px solid ${border}`,
          zIndex: 1,
        }}
      >
        <span
          style={{
            fontFamily: MONO_FONT,
            fontSize: 24,
            fontWeight: 700,
            color: fg,
          }}
        >
          @lokagen.id
        </span>

        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontSize: 24,
            fontWeight: 700,
            color: dark ? LOKAGEN_COLORS.kunyit : LOKAGEN_COLORS.sambal,
          }}
        >
          {footerRight}
        </span>
      </div>
    </AbsoluteFill>
  );
};

const MistakeSlide: React.FC<{
  slideIndex: 2 | 3 | 4;
  numberLabel: string;
  title: string;
  subtitle: string;
  beforeText: string;
  afterText: string;
  tipText: string;
}> = ({
  slideIndex,
  numberLabel,
  title,
  subtitle,
  beforeText,
  afterText,
  tipText,
}) => {
  return (
    <SlideChrome slideIndex={slideIndex} tag={`Kesalahan ${numberLabel}`}>
      <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
        {/* Heading Block */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <h2
            style={{
              margin: 0,
              fontSize: 66,
              lineHeight: 1.08,
              fontWeight: 900,
              letterSpacing: "-0.03em",
              color: LOKAGEN_COLORS.arang,
            }}
          >
            {title}
          </h2>
          <p
            style={{
              margin: 0,
              fontSize: 30,
              lineHeight: 1.4,
              fontWeight: 500,
              color: LOKAGEN_COLORS.mutedDark,
            }}
          >
            {subtitle}
          </p>
        </div>

        {/* Before Card */}
        <div
          style={{
            backgroundColor: "#FEF2F2",
            border: "2px solid #FECACA",
            borderRadius: 28,
            padding: "28px 34px",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 999,
              backgroundColor: "#DC2626",
              color: LOKAGEN_COLORS.white,
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: "0.05em",
            }}
          >
            <X size={20} strokeWidth={3} />
            <span>KURANG PAS</span>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 30,
              lineHeight: 1.45,
              fontWeight: 500,
              color: "#7F1D1D",
            }}
          >
            &ldquo;{beforeText}&rdquo;
          </p>
        </div>

        {/* After Card */}
        <div
          style={{
            backgroundColor: LOKAGEN_COLORS.white,
            border: `3px solid ${LOKAGEN_COLORS.sambal}`,
            borderRadius: 28,
            padding: "30px 34px",
            boxShadow: "0 16px 36px rgba(194, 65, 12, 0.1)",
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          <div
            style={{
              display: "inline-flex",
              alignSelf: "flex-start",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              borderRadius: 999,
              backgroundColor: LOKAGEN_COLORS.sambal,
              color: LOKAGEN_COLORS.krim,
              fontSize: 20,
              fontWeight: 800,
              letterSpacing: "0.05em",
            }}
          >
            <Check size={20} strokeWidth={3} />
            <span>LEBIH MENARIK</span>
          </div>
          <p
            style={{
              margin: 0,
              fontSize: 31,
              lineHeight: 1.45,
              fontWeight: 700,
              color: LOKAGEN_COLORS.arang,
            }}
          >
            &ldquo;{afterText}&rdquo;
          </p>
        </div>

        {/* Quick Tip Strip */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
            padding: "22px 28px",
            borderRadius: 22,
            backgroundColor: "rgba(245, 158, 11, 0.16)",
            border: "2px solid rgba(245, 158, 11, 0.35)",
          }}
        >
          <Lightbulb
            size={30}
            color={LOKAGEN_COLORS.sambal}
            style={{ flexShrink: 0, marginTop: 4 }}
          />
          <p
            style={{
              margin: 0,
              fontSize: 25,
              lineHeight: 1.4,
              fontWeight: 700,
              color: LOKAGEN_COLORS.arang,
            }}
          >
            {tipText}
          </p>
        </div>
      </div>
    </SlideChrome>
  );
};

export const CarouselSelasa: React.FC<SelasaSlideProps> = ({ slideIndex }) => {
  if (slideIndex === 1) {
    return (
      <SlideChrome slideIndex={1} tag="Tips Caption UMKM">
        <div style={{ display: "flex", flexDirection: "column", gap: 44 }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Img
              src={staticFile("lokagen-logo.png")}
              style={{ width: 220, height: "auto", objectFit: "contain" }}
            />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            <h1
              style={{
                margin: 0,
                fontSize: 88,
                lineHeight: 1.06,
                fontWeight: 900,
                letterSpacing: "-0.035em",
                color: LOKAGEN_COLORS.arang,
              }}
            >
              Caption jualanmu{" "}
              <span
                style={{
                  color: LOKAGEN_COLORS.sambal,
                  textDecoration: "underline",
                  textDecorationColor: LOKAGEN_COLORS.kunyit,
                  textDecorationThickness: "10px",
                  textUnderlineOffset: "10px",
                }}
              >
                sepi komentar?
              </span>
            </h1>

            <p
              style={{
                margin: 0,
                fontSize: 40,
                lineHeight: 1.35,
                fontWeight: 600,
                color: LOKAGEN_COLORS.mutedDark,
              }}
            >
              Cek{" "}
              <strong style={{ color: LOKAGEN_COLORS.arang }}>
                3 kesalahan umum
              </strong>{" "}
              ini di caption jualan makananmu — plus cara memperbaikinya.
            </p>
          </div>

          {/* Mini Table of Contents */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              padding: "32px 36px",
              borderRadius: 28,
              backgroundColor: LOKAGEN_COLORS.white,
              border: `2px solid ${LOKAGEN_COLORS.borderWarm}`,
              boxShadow: "0 16px 36px rgba(28, 25, 23, 0.06)",
            }}
          >
            {[
              { num: "01", label: "Kurang detail produk" },
              { num: "02", label: "Ajakan order tidak jelas" },
              { num: "03", label: "Kalimat pembuka terlalu datar" },
            ].map((item) => (
              <div
                key={item.num}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                  fontSize: 30,
                  fontWeight: 700,
                  color: LOKAGEN_COLORS.arang,
                }}
              >
                <span
                  style={{
                    fontFamily: MONO_FONT,
                    fontSize: 24,
                    fontWeight: 800,
                    padding: "6px 14px",
                    borderRadius: 12,
                    backgroundColor: "rgba(245, 158, 11, 0.2)",
                    color: LOKAGEN_COLORS.sambal,
                  }}
                >
                  {item.num}
                </span>
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </SlideChrome>
    );
  }

  if (slideIndex === 2) {
    return (
      <MistakeSlide
        slideIndex={2}
        numberLabel="01"
        title="Kurang detail produk"
        subtitle="Cuma bilang 'enak' belum bikin pembeli kebayang rasa, tekstur, atau porsinya."
        beforeText="Sambal cumi ready ya kak! Enak banget pokoknya, yuk diorder!"
        afterText="Sambal cumi asin dimasak pelan dengan cabai rawit merah & daun jeruk. Gurih, pedas nendang, pas buat lauk nasi hangat."
        tipText="Tip: sebutkan minimal 2 hal dari rasa, tekstur, bahan khas, atau momen makan yang cocok."
      />
    );
  }

  if (slideIndex === 3) {
    return (
      <MistakeSlide
        slideIndex={3}
        numberLabel="02"
        title="Ajakan order tidak jelas"
        subtitle="Pembeli sudah tertarik, tapi bingung harus pesan ke mana dan kapan bisa dikirim."
        beforeText="Yang mau boleh ya, stok hari ini terbatas banget nih."
        afterText="Mau coba? Komen 'MAU' atau klik link WhatsApp di bio untuk pesan. Pengiriman harian mulai jam 10.00 WIB."
        tipText="Tip: tutup caption dengan 1 langkah aksi yang jelas—cara pesan, saluran, dan jam layanan."
      />
    );
  }

  if (slideIndex === 4) {
    return (
      <MistakeSlide
        slideIndex={4}
        numberLabel="03"
        title="Kalimat pembuka lemah"
        subtitle="Baris pertama datar bikin orang langsung lewat sebelum klik 'selengkapnya'."
        beforeText="Halo kak, selamat siang. Hari ini toko kami buka seperti biasa ya..."
        afterText="Lagi cari lauk praktis yang tinggal tuang di atas nasi hangat? Ini jawabannya."
        tipText="Tip: mulai baris pertama dengan pertanyaan, masalah, atau situasi makan yang langsung relate."
      />
    );
  }

  return (
    <SlideChrome
      slideIndex={5}
      tag="Simpan & Coba"
      dark
      footerRight="Simpan postingan ini"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 38,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 26px",
            borderRadius: 999,
            backgroundColor: "rgba(245, 158, 11, 0.16)",
            border: `2px solid ${LOKAGEN_COLORS.kunyit}`,
            color: LOKAGEN_COLORS.kunyit,
            fontSize: 26,
            fontWeight: 800,
          }}
        >
          <Sparkles size={26} />
          <span>Dari 1 Foto Produk</span>
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: 66,
            lineHeight: 1.12,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: LOKAGEN_COLORS.krim,
          }}
        >
          Mau dibantu bikin caption &amp; slide carousel lebih mudah?
        </h2>

        {/* White Brand Card */}
        <div
          style={{
            width: "100%",
            backgroundColor: LOKAGEN_COLORS.krim,
            borderRadius: 32,
            padding: "42px 44px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 24,
            boxShadow: "0 24px 60px rgba(0, 0, 0, 0.35)",
          }}
        >
          <Img
            src={staticFile("lokagen-logo.png")}
            style={{ width: 420, height: "auto", objectFit: "contain" }}
          />
          <p
            style={{
              margin: 0,
              fontSize: 30,
              lineHeight: 1.4,
              fontWeight: 600,
              color: LOKAGEN_COLORS.arang,
            }}
          >
            Unggah 1 foto produkmu → dapatkan draf caption &amp; 5 slide carousel
            Instagram siap pakai.
          </p>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 14,
              padding: "22px 42px",
              borderRadius: 999,
              backgroundColor: LOKAGEN_COLORS.sambal,
              color: LOKAGEN_COLORS.krim,
              fontSize: 32,
              fontWeight: 800,
            }}
          >
            <span>Coba gratis • 3 konten pertama</span>
            <ArrowRight size={30} strokeWidth={3} />
          </div>
        </div>

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            fontSize: 28,
            fontWeight: 700,
            color: LOKAGEN_COLORS.mutedLight,
          }}
        >
          <Bookmark size={28} color={LOKAGEN_COLORS.kunyit} />
          <span>Simpan buat contekan nulis caption • Link di bio</span>
        </div>
      </div>
    </SlideChrome>
  );
};
