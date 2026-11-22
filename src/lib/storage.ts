// Penyimpanan per-browser (localStorage). Semua akses dibungkus try/catch karena
// bisa gagal di private window, saat kuota penuh, atau site data diblokir.
import type { BrandInfo, GeneratedContent, ProductCategory, Theme, Tone } from "./types";

export const PROFILE_KEY = "lokagen_brand_profile";
export const HISTORY_KEY = "lokagen_history";
export const HISTORY_LIMIT = 5;

export interface BrandProfile {
  storeName?: string;
  contactInfo?: string;
  location?: string;
  brandColor?: string;
  tone?: Tone;
  theme?: Theme;
}

// Foto (base64) sengaja TIDAK disimpan agar tidak memenuhi kuota ~5MB.
export interface HistoryItem {
  id: string;
  timestamp: number;
  productName?: string;
  tone: Tone;
  category?: ProductCategory; // opsional: riwayat lama belum punya kategori
  theme: Theme;
  brandColor?: string;
  brandInfo?: BrandInfo;
  result: GeneratedContent;
}

function readJson(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function writeJson(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Diabaikan: aplikasi tetap berjalan tanpa penyimpanan
  }
}

function isHistoryItem(v: unknown): v is HistoryItem {
  if (!v || typeof v !== "object") return false;
  const item = v as Partial<HistoryItem>;
  return (
    typeof item.id === "string" &&
    typeof item.timestamp === "number" &&
    !!item.result &&
    Array.isArray(item.result.slides) &&
    item.result.slides.length === 5
  );
}

export function loadProfile(): BrandProfile | null {
  const value = readJson(PROFILE_KEY);
  return value && typeof value === "object" ? (value as BrandProfile) : null;
}

export function saveProfile(profile: BrandProfile): void {
  writeJson(PROFILE_KEY, profile);
}

export function loadHistory(): HistoryItem[] {
  const value = readJson(HISTORY_KEY);
  return Array.isArray(value) ? value.filter(isHistoryItem).slice(0, HISTORY_LIMIT) : [];
}

export function saveHistory(items: HistoryItem[]): void {
  writeJson(HISTORY_KEY, items.slice(0, HISTORY_LIMIT));
}
