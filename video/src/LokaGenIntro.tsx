import React from "react";
import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Sparkles } from "lucide-react";

export const LokaGenIntro: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const isVertical = height > width;

  const badgeScale = spring({
    frame,
    fps,
    config: { damping: 14, stiffness: 120 },
  });

  const titleOpacity = interpolate(frame, [12, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const titleY = interpolate(frame, [12, 30], [40, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleOpacity = interpolate(frame, [28, 48], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const subtitleY = interpolate(frame, [28, 48], [24, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        background:
          "radial-gradient(circle at 20% 20%, #1e293b 0%, #0f172a 55%, #020617 100%)",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Inter, system-ui, -apple-system, sans-serif",
        padding: isVertical ? 80 : 120,
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 28,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 28px",
            borderRadius: 999,
            background: "rgba(99, 102, 241, 0.16)",
            border: "1px solid rgba(129, 140, 248, 0.4)",
            color: "#c7d2fe",
            fontSize: isVertical ? 28 : 26,
            fontWeight: 600,
            transform: `scale(${badgeScale})`,
          }}
        >
          <Sparkles size={26} color="#818cf8" />
          <span>AI Content Assistant for Local MSMEs</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: isVertical ? 112 : 128,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            background: "linear-gradient(135deg, #ffffff 0%, #a5b4fc 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            opacity: titleOpacity,
            transform: `translateY(${titleY}px)`,
          }}
        >
          LokaGen
        </h1>

        <p
          style={{
            margin: 0,
            maxWidth: isVertical ? 820 : 1080,
            fontSize: isVertical ? 38 : 36,
            lineHeight: 1.45,
            color: "#94a3b8",
            opacity: subtitleOpacity,
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          Buat konten carousel &amp; caption Instagram untuk UMKM secara instan,
          tanpa perlu skill desain.
        </p>
      </div>
    </AbsoluteFill>
  );
};
