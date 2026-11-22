"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { CampaignType, ProductCategory, Tone, Theme } from "@/lib/types";
import { CAMPAIGN_OPTIONS, CATEGORY_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface GenerateOptionsProps {
  category: ProductCategory;
  setCategory: (category: ProductCategory) => void;
  tone: Tone;
  setTone: (tone: Tone) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  brandColor: string;
  setBrandColor: (color: string) => void;
  suggestedColors: string[];
  campaignType: CampaignType;
  setCampaignType: (type: CampaignType) => void;
}

const toneOptions: { value: Tone; label: string; description: string }[] = [
  { value: "playful", label: "Playful", description: "Fun, santai, friendly" },
  { value: "formal", label: "Formal", description: "Profesional & terpercaya" },
  { value: "elegan", label: "Elegan", description: "Mewah & premium" },
  { value: "lokal", label: "Lokal", description: "Akrab, pakai slang lokal" },
];

const themeOptions: { value: Theme; label: string; description: string }[] = [
  {
    value: "Colorful Gen Z",
    label: "Colorful Gen Z",
    description: "Warna-warni, vibrant, eye-catching",
  },
  {
    value: "Minimal Clean Modern",
    label: "Minimal Clean",
    description: "Bersih, simpel, modern",
  },
  {
    value: "Dark Modern/Futuristic",
    label: "Dark Modern",
    description: "Gelap, futuristik, bold",
  },
  {
    value: "Bold Typography",
    label: "Bold Typography",
    description: "Typography dominan, impactful",
  },
];

export function GenerateOptions({
  category,
  setCategory,
  tone,
  setTone,
  theme,
  setTheme,
  brandColor,
  setBrandColor,
  suggestedColors,
  campaignType,
  setCampaignType,
}: GenerateOptionsProps) {
  return (
    <div className="mt-6 space-y-4">
      {/* Jenis Usaha: mengisi tema default otomatis */}
      <div>
        <Label className="mb-2 block text-foreground/80">Jenis Usaha</Label>
        <Select value={category} onValueChange={(val) => setCategory(val as ProductCategory)}>
          <SelectTrigger className="w-full border-border bg-card text-foreground">
            <SelectValue placeholder="Pilih jenis usaha" />
          </SelectTrigger>
          <SelectContent className="border-border bg-card">
            {CATEGORY_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-foreground focus:bg-muted focus:text-foreground">
                <div className="flex flex-row items-center gap-4 justify-between">
                  <span>{option.label}</span>
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Campaign Type */}
      <div>
        <Label className="mb-2 block text-foreground/80">Tujuan Konten</Label>
        <Select value={campaignType} onValueChange={(val) => setCampaignType(val as CampaignType)}>
          <SelectTrigger className="w-full border-border bg-card text-foreground">
            <SelectValue placeholder="Pilih tujuan" />
          </SelectTrigger>
          <SelectContent className="border-border bg-card">
            {CAMPAIGN_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-foreground focus:bg-muted focus:text-foreground">
                <div className="flex flex-row items-center gap-4 justify-between">
                  <span>{option.label}</span>
                  <span className="text-xs text-muted-foreground">{option.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {campaignType === "promo" && (
          <p className="mt-2 text-xs text-primary">
            Tulis detail promo (mis. &quot;Diskon 20% s/d 30 Nov&quot;) di kolom Harga / Label Promo agar muncul di slide.
          </p>
        )}
      </div>

      {/* Tone Selection */}
      <div>
        <Label className="mb-2 block text-foreground/80">Tone Konten</Label>
        <Select value={tone} onValueChange={(val) => setTone(val as Tone)}>
          <SelectTrigger className="w-full border-border bg-card text-foreground">
            <SelectValue placeholder="Pilih tone" />
          </SelectTrigger>
          <SelectContent className="border-border bg-card">
            {toneOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-foreground focus:bg-muted focus:text-foreground">
                <div className="flex flex-row items-center gap-4 justify-between">
                  <span>{option.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {option.description}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Theme Selection */}
      <div>
        <Label className="mb-2 block text-foreground/80">Tema Visual</Label>
        <p className="mb-2 text-xs text-muted-foreground">
          Otomatis mengikuti jenis usaha. Bisa kamu ubah sendiri.
        </p>
        <Select value={theme} onValueChange={(val) => setTheme(val as Theme)}>
          <SelectTrigger className="w-full border-border bg-card text-foreground">
            <SelectValue placeholder="Pilih tema" />
          </SelectTrigger>
          <SelectContent className="border-border bg-card">
            {themeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-foreground focus:bg-muted focus:text-foreground">
                <div className="flex flex-row items-center gap-4 justify-between">
                  <span>{option.label}</span>
                  <span className="text-xs text-muted-foreground">
                    {option.description}
                  </span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Brand Color Picker */}
      <div>
        <Label className="mb-2 block text-foreground/80">
          Warna Brand{" "}
          <span className="text-muted-foreground">(opsional)</span>
        </Label>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="color"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded-md border border-border"
            />
          </div>
          <Input
            type="text"
            value={brandColor}
            onChange={(e) => setBrandColor(e.target.value)}
            placeholder="#3b82f6"
            className="w-28 font-mono text-sm border-border bg-card text-foreground"
            maxLength={7}
          />
          <span className="text-sm text-muted-foreground">
            Warna aksen untuk carousel
          </span>
        </div>

        {suggestedColors.length > 0 && (
          <div className="mt-3">
            <p className="mb-2 text-xs text-muted-foreground">Rekomendasi dari foto produk:</p>
            <div className="flex flex-wrap gap-2">
              {suggestedColors.map((color) => (
                <button
                  key={color}
                  type="button"
                  title={color}
                  aria-label={`Pakai warna ${color}`}
                  onClick={() => setBrandColor(color)}
                  className={cn(
                    "h-8 w-8 rounded-full border-2 transition-transform hover:scale-110",
                    brandColor.toLowerCase() === color.toLowerCase()
                      ? "border-white"
                      : "border-border"
                  )}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

