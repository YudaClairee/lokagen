import type { Theme } from "@/lib/types";

interface ThemeStyles {
  background: string;
  pattern: string;
  titleColor: string;
  subtitleColor: string;
  textColor: string;
  mutedColor: string;
  cardBg: string;
  badgeBg: string;
  badgeColor: string;
}

export function getThemeStyles(theme: Theme, brandColor: string): ThemeStyles {
  switch (theme) {
    case "Colorful Gen Z":
      return {
        background: `linear-gradient(135deg, #fef3c7 0%, #fce7f3 50%, #ddd6fe 100%)`,
        pattern: `radial-gradient(circle at 25% 25%, ${brandColor}20 2px, transparent 2px)`,
        titleColor: "#1f2937",
        subtitleColor: "#4b5563",
        textColor: "#374151",
        mutedColor: "#6b7280",
        cardBg: "rgba(255, 255, 255, 0.8)",
        badgeBg: "rgba(255, 255, 255, 0.9)",
        badgeColor: "#374151",
      };

    case "Minimal Clean Modern":
      return {
        background: "#ffffff",
        pattern: "none",
        titleColor: "#111827",
        subtitleColor: "#4b5563",
        textColor: "#374151",
        mutedColor: "#9ca3af",
        cardBg: "#f9fafb",
        badgeBg: "#f3f4f6",
        badgeColor: "#374151",
      };

    case "Dark Modern/Futuristic":
      return {
        background: `linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 100%)`,
        pattern: `linear-gradient(90deg, ${brandColor}10 1px, transparent 1px), linear-gradient(${brandColor}10 1px, transparent 1px)`,
        titleColor: "#ffffff",
        subtitleColor: "#d1d5db",
        textColor: "#e5e7eb",
        mutedColor: "#9ca3af",
        cardBg: "rgba(255, 255, 255, 0.05)",
        badgeBg: "rgba(255, 255, 255, 0.1)",
        badgeColor: "#ffffff",
      };

    case "Bold Typography":
      return {
        background: "#fafafa",
        pattern: "none",
        titleColor: "#000000",
        subtitleColor: "#525252",
        textColor: "#262626",
        mutedColor: "#737373",
        cardBg: "#f5f5f5",
        badgeBg: "#e5e5e5",
        badgeColor: "#262626",
      };

    default:
      return {
        background: "#ffffff",
        pattern: "none",
        titleColor: "#111827",
        subtitleColor: "#4b5563",
        textColor: "#374151",
        mutedColor: "#9ca3af",
        cardBg: "#f9fafb",
        badgeBg: "#f3f4f6",
        badgeColor: "#374151",
      };
  }
}

