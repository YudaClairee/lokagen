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
import type { Tone, Theme } from "@/lib/types";

interface GenerateOptionsProps {
  tone: Tone;
  setTone: (tone: Tone) => void;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  brandColor: string;
  setBrandColor: (color: string) => void;
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
  tone,
  setTone,
  theme,
  setTheme,
  brandColor,
  setBrandColor,
}: GenerateOptionsProps) {
  return (
    <div className="mt-6 space-y-4">
      {/* Tone Selection */}
      <div>
        <Label className="mb-2 block text-slate-200">Tone Konten</Label>
        <Select value={tone} onValueChange={(val) => setTone(val as Tone)}>
          <SelectTrigger className="w-full border-white/10 bg-slate-800/50 text-white">
            <SelectValue placeholder="Pilih tone" />
          </SelectTrigger>
          <SelectContent className="border-white/10 bg-slate-900">
            {toneOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-white focus:bg-slate-800 focus:text-white">
                <div className="flex flex-row items-center gap-4 justify-between">
                  <span>{option.label}</span>
                  <span className="text-xs text-slate-400">
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
        <Label className="mb-2 block text-slate-200">Tema Visual</Label>
        <Select value={theme} onValueChange={(val) => setTheme(val as Theme)}>
          <SelectTrigger className="w-full border-white/10 bg-slate-800/50 text-white">
            <SelectValue placeholder="Pilih tema" />
          </SelectTrigger>
          <SelectContent className="border-white/10 bg-slate-900">
            {themeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value} className="text-white focus:bg-slate-800 focus:text-white">
                <div className="flex flex-row items-center gap-4 justify-between">
                  <span>{option.label}</span>
                  <span className="text-xs text-slate-400">
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
        <Label className="mb-2 block text-slate-200">
          Warna Brand{" "}
          <span className="text-slate-500">(opsional)</span>
        </Label>
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="color"
              value={brandColor}
              onChange={(e) => setBrandColor(e.target.value)}
              className="h-10 w-14 cursor-pointer rounded-md border border-white/10"
            />
          </div>
          <Input
            type="text"
            value={brandColor}
            onChange={(e) => setBrandColor(e.target.value)}
            placeholder="#3b82f6"
            className="w-28 font-mono text-sm border-white/10 bg-slate-800/50 text-white"
            maxLength={7}
          />
          <span className="text-sm text-slate-400">
            Warna aksen untuk carousel
          </span>
        </div>
      </div>
    </div>
  );
}

