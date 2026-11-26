import React from "react";
import {
  AbsoluteFill,
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Camera,
  Clock,
  Flame,
  Heart,
  LayoutGrid,
  MessageCircle,
  Palette,
  PenLine,
  Share2,
  Smartphone,
  Sparkles,
} from "lucide-react";
import {
  FONT_FAMILY,
  LOKAGEN_COLORS,
  MONO_FONT,
  REELS_SAFE_PADDING,
} from "./palette";

const SubtleGrid: React.FC<{ dark?: boolean }> = ({ dark = false }) => {
  const stroke = dark ? "rgba(255, 248, 240, 0.06)" : "rgba(28, 25, 23, 0.055)";
  return (
    <AbsoluteFill
      style={{
        backgroundImage: `linear-gradient(to right, ${stroke} 1px, transparent 1px), linear-gradient(to bottom, ${stroke} 1px, transparent 1px)`,
        backgroundSize: "56px 56px",
        pointerEvents: "none",
      }}
    />
  );
};

const StatusHeader: React.FC<{
  timeLabel: string;
  energyPercent: number;
  prevEnergyPercent: number;
  dark?: boolean;
}> = ({ timeLabel, energyPercent, prevEnergyPercent, dark = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame,
    fps,
    config: { damping: 18, stiffness: 120 },
  });

  const animatedEnergy = Math.round(
    interpolate(progress, [0, 1], [prevEnergyPercent, energyPercent])
  );

  const barColor =
    energyPercent >= 60
      ? LOKAGEN_COLORS.kunyit
      : energyPercent >= 25
        ? LOKAGEN_COLORS.sambal
        : "#EF4444";

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: 18,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "12px 22px",
            borderRadius: 999,
            backgroundColor: dark
              ? "rgba(255, 248, 240, 0.1)"
              : LOKAGEN_COLORS.white,
            border: `2px solid ${dark ? "rgba(255,248,240,0.18)" : LOKAGEN_COLORS.borderWarm}`,
            color: dark ? LOKAGEN_COLORS.krim : LOKAGEN_COLORS.arang,
            fontFamily: MONO_FONT,
            fontSize: 28,
            fontWeight: 700,
          }}
        >
          <Clock size={26} color={LOKAGEN_COLORS.kunyit} />
          <span>{timeLabel}</span>
        </div>

        <div
          style={{
            fontFamily: MONO_FONT,
            fontSize: 28,
            fontWeight: 700,
            color: dark ? LOKAGEN_COLORS.krim : LOKAGEN_COLORS.arang,
          }}
        >
          SEMANGAT: {animatedEnergy}%
        </div>
      </div>

      <div
        style={{
          width: "100%",
          height: 18,
          borderRadius: 999,
          backgroundColor: dark
            ? "rgba(255, 248, 240, 0.14)"
            : "rgba(28, 25, 23, 0.1)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${animatedEnergy}%`,
            height: "100%",
            borderRadius: 999,
            backgroundColor: barColor,
          }}
        />
      </div>
    </div>
  );
};

/* =========================================================
   SCENE 1: NIAT (0 - 2.5s)
   ========================================================= */
export const SceneNiat: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const titleSpring = spring({
    frame: frame - 6,
    fps,
    config: { damping: 14, stiffness: 150 },
  });

  const stampSpring = spring({
    frame: frame - 24,
    fps,
    config: { damping: 10, stiffness: 180 },
  });

  const stampScale = interpolate(stampSpring, [0, 1], [1.7, 1]);
  const stampOpacity = interpolate(frame, [24, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: LOKAGEN_COLORS.krim,
        fontFamily: FONT_FAMILY,
        paddingTop: REELS_SAFE_PADDING.top,
        paddingBottom: REELS_SAFE_PADDING.bottom,
        paddingLeft: REELS_SAFE_PADDING.horizontal,
        paddingRight: REELS_SAFE_PADDING.horizontal,
        justifyContent: "space-between",
      }}
    >
      <SubtleGrid />

      <StatusHeader
        timeLabel="09.00 WIB"
        prevEnergyPercent={0}
        energyPercent={100}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 36,
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "14px 28px",
            borderRadius: 999,
            backgroundColor: "rgba(245, 158, 11, 0.16)",
            color: LOKAGEN_COLORS.sambal,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "0.02em",
            textTransform: "uppercase",
          }}
        >
          <Flame size={30} color={LOKAGEN_COLORS.sambal} />
          <span>Alur Bikin Konten UMKM</span>
        </div>

        <h1
          style={{
            margin: 0,
            fontSize: 88,
            lineHeight: 1.08,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: LOKAGEN_COLORS.arang,
            transform: `translateY(${interpolate(titleSpring, [0, 1], [50, 0])}px)`,
            opacity: interpolate(frame, [6, 18], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          Niat bikin konten hari ini:
        </h1>

        <div
          style={{
            padding: "26px 52px",
            borderRadius: 28,
            backgroundColor: LOKAGEN_COLORS.sambal,
            color: LOKAGEN_COLORS.krim,
            fontSize: 64,
            fontWeight: 900,
            letterSpacing: "-0.02em",
            boxShadow: "0 20px 45px rgba(194, 65, 12, 0.28)",
            opacity: stampOpacity,
            transform: `scale(${stampScale}) rotate(-3deg)`,
          }}
        >
          100% GAS POL!
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: 600,
          color: LOKAGEN_COLORS.mutedDark,
        }}
      >
        Foto produk udah siap. Tinggal posting... kan?
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================
   SCENE 2: BINGUNG CAPTION (2.5 - 4.8s)
   ========================================================= */
export const SceneCaption: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const fullText = "Halo kak, hari ini menu kami ready...";
  // Type out from frame 6..32, pause 32..42, erase 42..58
  const charCount =
    frame < 32
      ? Math.floor(
          interpolate(frame, [6, 32], [0, fullText.length], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })
        )
      : frame < 42
        ? fullText.length
        : Math.floor(
            interpolate(frame, [42, 58], [fullText.length, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })
          );

  const shownText = fullText.slice(0, charCount);
  const showCursor = Math.floor(frame / 8) % 2 === 0;

  const badgeSpring = spring({
    frame: frame - 10,
    fps,
    config: { damping: 14, stiffness: 160 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: LOKAGEN_COLORS.krim,
        fontFamily: FONT_FAMILY,
        paddingTop: REELS_SAFE_PADDING.top,
        paddingBottom: REELS_SAFE_PADDING.bottom,
        paddingLeft: REELS_SAFE_PADDING.horizontal,
        paddingRight: REELS_SAFE_PADDING.horizontal,
        justifyContent: "space-between",
      }}
    >
      <SubtleGrid />

      <StatusHeader
        timeLabel="09.15 WIB"
        prevEnergyPercent={100}
        energyPercent={65}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 36,
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            alignItems: "center",
            gap: 14,
            padding: "14px 26px",
            borderRadius: 18,
            backgroundColor: LOKAGEN_COLORS.kunyit,
            color: LOKAGEN_COLORS.arang,
            fontSize: 34,
            fontWeight: 800,
            transform: `scale(${badgeSpring})`,
          }}
        >
          <PenLine size={32} />
          <span>TAHAP 1: CAPTION</span>
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: 76,
            lineHeight: 1.08,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: LOKAGEN_COLORS.arang,
          }}
        >
          Bingung mau nulis caption apa...
        </h2>

        {/* Mockup Caption Box */}
        <div
          style={{
            backgroundColor: LOKAGEN_COLORS.white,
            borderRadius: 32,
            padding: 40,
            border: `3px solid ${LOKAGEN_COLORS.borderWarm}`,
            boxShadow: "0 18px 40px rgba(28, 25, 23, 0.08)",
            minHeight: 260,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              fontSize: 38,
              lineHeight: 1.45,
              color:
                shownText.length > 0
                  ? LOKAGEN_COLORS.arang
                  : LOKAGEN_COLORS.mutedLight,
              fontWeight: 500,
            }}
          >
            {shownText.length > 0 ? shownText : "Tulis caption yang menarik..."}
            <span
              style={{
                display: "inline-block",
                width: 4,
                height: 40,
                backgroundColor: LOKAGEN_COLORS.sambal,
                marginLeft: 6,
                verticalAlign: "middle",
                opacity: showCursor ? 1 : 0,
              }}
            />
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontFamily: MONO_FONT,
              fontSize: 24,
              color: LOKAGEN_COLORS.mutedDark,
              borderTop: `2px solid ${LOKAGEN_COLORS.borderWarm}`,
              paddingTop: 20,
            }}
          >
            <span>{frame >= 42 ? "Hapus lagi..." : "Mengetik..."}</span>
            <span>{shownText.length} karakter</span>
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: 600,
          color: LOKAGEN_COLORS.mutedDark,
        }}
      >
        Ketik → hapus → ketik → hapus lagi.
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================
   SCENE 3: BINGUNG DESAIN (4.8 - 7.1s)
   ========================================================= */
export const SceneDesain: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const wobble1 = Math.sin(frame * 0.25) * 28;
  const wobble2 = Math.cos(frame * 0.22) * 22;
  const rotateCard = Math.sin(frame * 0.18) * 6;

  const badgeSpring = spring({
    frame: frame - 8,
    fps,
    config: { damping: 14, stiffness: 160 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: LOKAGEN_COLORS.krim,
        fontFamily: FONT_FAMILY,
        paddingTop: REELS_SAFE_PADDING.top,
        paddingBottom: REELS_SAFE_PADDING.bottom,
        paddingLeft: REELS_SAFE_PADDING.horizontal,
        paddingRight: REELS_SAFE_PADDING.horizontal,
        justifyContent: "space-between",
      }}
    >
      <SubtleGrid />

      <StatusHeader
        timeLabel="09.42 WIB"
        prevEnergyPercent={65}
        energyPercent={30}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 34,
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            alignItems: "center",
            gap: 14,
            padding: "14px 26px",
            borderRadius: 18,
            backgroundColor: LOKAGEN_COLORS.sambal,
            color: LOKAGEN_COLORS.krim,
            fontSize: 34,
            fontWeight: 800,
            transform: `scale(${badgeSpring})`,
          }}
        >
          <Palette size={32} />
          <span>TAHAP 2: DESAIN</span>
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: 76,
            lineHeight: 1.08,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: LOKAGEN_COLORS.arang,
          }}
        >
          Bingung desainnya kok nggak rapi-rapi...
        </h2>

        {/* Messy Design Canvas Mockup */}
        <div
          style={{
            position: "relative",
            height: 360,
            borderRadius: 32,
            backgroundColor: LOKAGEN_COLORS.white,
            border: `3px dashed ${LOKAGEN_COLORS.sambal}`,
            overflow: "hidden",
            boxShadow: "0 18px 40px rgba(28, 25, 23, 0.08)",
          }}
        >
          {/* Floating misaligned photo block */}
          <div
            style={{
              position: "absolute",
              top: 36,
              left: 52 + wobble1,
              width: 240,
              height: 220,
              borderRadius: 20,
              backgroundColor: LOKAGEN_COLORS.kunyit,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              color: LOKAGEN_COLORS.arang,
              fontWeight: 800,
              fontSize: 26,
              transform: `rotate(${-5 + rotateCard}deg)`,
            }}
          >
            <Camera size={46} />
            <span>FOTO.JPG</span>
          </div>

          {/* Floating misaligned text box */}
          <div
            style={{
              position: "absolute",
              top: 70 - wobble2 * 0.6,
              right: 40 + wobble2,
              width: 390,
              padding: "20px 26px",
              borderRadius: 16,
              backgroundColor: LOKAGEN_COLORS.arang,
              color: LOKAGEN_COLORS.krim,
              fontSize: 32,
              fontWeight: 800,
              transform: `rotate(${4 - rotateCard * 0.7}deg)`,
            }}
          >
            Font kegedean?!
          </div>

          {/* Floating misaligned button */}
          <div
            style={{
              position: "absolute",
              bottom: 36 + wobble2 * 0.5,
              right: 120 - wobble1,
              padding: "16px 32px",
              borderRadius: 999,
              backgroundColor: LOKAGEN_COLORS.sambal,
              color: LOKAGEN_COLORS.krim,
              fontSize: 28,
              fontWeight: 800,
              transform: `rotate(${-3 + rotateCard * 0.5}deg)`,
            }}
          >
            Warna nabrak
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: 600,
          color: LOKAGEN_COLORS.mutedDark,
        }}
      >
        Geser kiri, geser kanan... malah makin pusing.
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================
   SCENE 4: SCROLL MEDSOS (7.1 - 9.4s)
   ========================================================= */
export const SceneScroll: React.FC = () => {
  const frame = useCurrentFrame();

  const scrollOffset = interpolate(frame, [0, 70], [0, -760]);
  const minutesElapsed = Math.floor(interpolate(frame, [0, 70], [5, 118]));
  const hours = 10 + Math.floor(minutesElapsed / 60);
  const mins = String(minutesElapsed % 60).padStart(2, "0");

  const fakePosts = [
    { tag: "Resep Viral", color: "#292524", accent: LOKAGEN_COLORS.kunyit },
    { tag: "Kucing Lucu", color: "#3F1D0D", accent: LOKAGEN_COLORS.sambal },
    { tag: "Tips FYP #47", color: "#292524", accent: LOKAGEN_COLORS.kunyit },
    { tag: "Drama Netizen", color: "#1C1917", accent: LOKAGEN_COLORS.sambal },
  ];

  return (
    <AbsoluteFill
      style={{
        backgroundColor: LOKAGEN_COLORS.arang,
        fontFamily: FONT_FAMILY,
        paddingTop: REELS_SAFE_PADDING.top,
        paddingBottom: REELS_SAFE_PADDING.bottom,
        paddingLeft: REELS_SAFE_PADDING.horizontal,
        paddingRight: REELS_SAFE_PADDING.horizontal,
        justifyContent: "space-between",
      }}
    >
      <SubtleGrid dark />

      <StatusHeader
        timeLabel={`${hours}.${mins} WIB`}
        prevEnergyPercent={30}
        energyPercent={5}
        dark
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 32,
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "inline-flex",
            alignSelf: "flex-start",
            alignItems: "center",
            gap: 14,
            padding: "14px 26px",
            borderRadius: 18,
            backgroundColor: "rgba(245, 158, 11, 0.2)",
            border: `2px solid ${LOKAGEN_COLORS.kunyit}`,
            color: LOKAGEN_COLORS.kunyit,
            fontSize: 32,
            fontWeight: 800,
          }}
        >
          <Smartphone size={30} />
          <span>CARI REFERENSI BENTAR...</span>
        </div>

        <h2
          style={{
            margin: 0,
            fontSize: 78,
            lineHeight: 1.06,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            color: LOKAGEN_COLORS.krim,
          }}
        >
          Eh, malah keterusan{" "}
          <span style={{ color: LOKAGEN_COLORS.kunyit }}>scroll medsos.</span>
        </h2>

        {/* Scrolling Phone Feed Mockup */}
        <div
          style={{
            height: 360,
            borderRadius: 32,
            backgroundColor: "#0C0A09",
            border: "3px solid rgba(255, 248, 240, 0.16)",
            overflow: "hidden",
            padding: 24,
            position: "relative",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 20,
              transform: `translateY(${scrollOffset}px)`,
            }}
          >
            {fakePosts.map((post, idx) => (
              <div
                key={idx}
                style={{
                  height: 240,
                  borderRadius: 24,
                  backgroundColor: post.color,
                  border: "1px solid rgba(255,248,240,0.1)",
                  padding: 28,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <span
                    style={{
                      display: "inline-block",
                      alignSelf: "flex-start",
                      padding: "6px 16px",
                      borderRadius: 999,
                      backgroundColor: post.accent,
                      color: LOKAGEN_COLORS.arang,
                      fontSize: 22,
                      fontWeight: 800,
                    }}
                  >
                    {post.tag}
                  </span>
                  <span
                    style={{
                      color: LOKAGEN_COLORS.krim,
                      fontSize: 32,
                      fontWeight: 700,
                    }}
                  >
                    &ldquo;Bentar, 1 video lagi...&rdquo;
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 16,
                    color: LOKAGEN_COLORS.krim,
                    opacity: 0.8,
                  }}
                >
                  <Heart size={30} />
                  <MessageCircle size={30} />
                  <Share2 size={30} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          textAlign: "center",
          fontSize: 30,
          fontWeight: 600,
          color: LOKAGEN_COLORS.mutedLight,
        }}
      >
        Niatnya 5 menit, tahu-tahu udah 2 jam.
      </div>
    </AbsoluteFill>
  );
};

/* =========================================================
   SCENE 5: BESOK AJA (9.4 - 11.4s)
   ========================================================= */
export const SceneBesokAja: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const slam = spring({
    frame,
    fps,
    config: { damping: 11, stiffness: 200 },
  });

  const scale = interpolate(slam, [0, 1], [2.2, 1]);
  const subOpacity = interpolate(frame, [16, 28], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: LOKAGEN_COLORS.sambal,
        fontFamily: FONT_FAMILY,
        paddingTop: REELS_SAFE_PADDING.top,
        paddingBottom: REELS_SAFE_PADDING.bottom,
        paddingLeft: REELS_SAFE_PADDING.horizontal,
        paddingRight: REELS_SAFE_PADDING.horizontal,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <SubtleGrid dark />

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 28px",
          borderRadius: 999,
          backgroundColor: "rgba(28, 25, 23, 0.25)",
          color: LOKAGEN_COLORS.krim,
          fontFamily: MONO_FONT,
          fontSize: 30,
          fontWeight: 700,
        }}
      >
        <Clock size={28} color={LOKAGEN_COLORS.kunyit} />
        <span>19.00 WIB • EKSEKUSI: 0%</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 32,
          zIndex: 1,
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 700,
            color: "rgba(255, 248, 240, 0.85)",
          }}
        >
          Ujung-ujungnya:
        </div>

        <div
          style={{
            padding: "36px 56px",
            borderRadius: 32,
            border: `8px solid ${LOKAGEN_COLORS.krim}`,
            backgroundColor: LOKAGEN_COLORS.arang,
            color: LOKAGEN_COLORS.kunyit,
            fontSize: 108,
            fontWeight: 900,
            letterSpacing: "-0.03em",
            lineHeight: 1,
            transform: `scale(${scale}) rotate(-4deg)`,
            boxShadow: "0 28px 60px rgba(0, 0, 0, 0.35)",
          }}
        >
          BESOK AJA.
        </div>

        <div
          style={{
            fontSize: 36,
            fontWeight: 600,
            color: LOKAGEN_COLORS.krim,
            opacity: subOpacity,
          }}
        >
          Besoknya? Ulangi dari awal lagi...
        </div>
      </div>

      <div style={{ height: 40 }} />
    </AbsoluteFill>
  );
};

/* =========================================================
   SCENE 6: SOLUSI LOKAGEN + CTA (11.4 - 14.5s)
   ========================================================= */
export const SceneLokaGen: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const headerSpring = spring({
    frame: frame - 4,
    fps,
    config: { damping: 14, stiffness: 150 },
  });

  const brandSpring = spring({
    frame: frame - 16,
    fps,
    config: { damping: 12, stiffness: 150 },
  });

  const flowSpring = spring({
    frame: frame - 32,
    fps,
    config: { damping: 15, stiffness: 140 },
  });

  const ctaSpring = spring({
    frame: frame - 48,
    fps,
    config: { damping: 13, stiffness: 150 },
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: LOKAGEN_COLORS.krim,
        fontFamily: FONT_FAMILY,
        paddingTop: REELS_SAFE_PADDING.top,
        paddingBottom: REELS_SAFE_PADDING.bottom,
        paddingLeft: REELS_SAFE_PADDING.horizontal,
        paddingRight: REELS_SAFE_PADDING.horizontal,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <SubtleGrid />

      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 12,
          padding: "14px 28px",
          borderRadius: 999,
          backgroundColor: LOKAGEN_COLORS.white,
          border: `2px solid ${LOKAGEN_COLORS.borderWarm}`,
          color: LOKAGEN_COLORS.sambal,
          fontSize: 28,
          fontWeight: 800,
        }}
      >
        <Sparkles size={26} color={LOKAGEN_COLORS.kunyit} />
        <span>AI Content Assistant untuk UMKM</span>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 32,
          width: "100%",
          zIndex: 1,
        }}
      >
        <p
          style={{
            margin: 0,
            fontSize: 52,
            lineHeight: 1.25,
            fontWeight: 800,
            color: LOKAGEN_COLORS.arang,
            transform: `translateY(${interpolate(headerSpring, [0, 1], [30, 0])}px)`,
            opacity: headerSpring,
          }}
        >
          Biar nggak &ldquo;besok aja&rdquo; terus, ada
        </p>

        <div
          style={{
            transform: `scale(${interpolate(brandSpring, [0, 1], [0.8, 1])})`,
            opacity: brandSpring,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px 0",
          }}
        >
          <Img
            src={staticFile("lokagen-logo.png")}
            style={{
              width: 620,
              height: "auto",
              objectFit: "contain",
            }}
          />
        </div>

        {/* 3-Step Visual Pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 20,
            width: "100%",
            marginTop: 12,
            padding: "28px 32px",
            borderRadius: 28,
            backgroundColor: LOKAGEN_COLORS.white,
            border: `2px solid ${LOKAGEN_COLORS.borderWarm}`,
            boxShadow: "0 16px 36px rgba(28, 25, 23, 0.07)",
            transform: `translateY(${interpolate(flowSpring, [0, 1], [40, 0])}px)`,
            opacity: flowSpring,
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              flex: 1,
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 20,
                backgroundColor: "rgba(245, 158, 11, 0.18)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Camera size={36} color={LOKAGEN_COLORS.sambal} />
            </div>
            <span
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: LOKAGEN_COLORS.arang,
              }}
            >
              1 Foto Produk
            </span>
          </div>

          <span
            style={{
              fontSize: 40,
              fontWeight: 900,
              color: LOKAGEN_COLORS.kunyit,
            }}
          >
            →
          </span>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
              flex: 1.3,
            }}
          >
            <div
              style={{
                width: 68,
                height: 68,
                borderRadius: 20,
                backgroundColor: LOKAGEN_COLORS.sambal,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LayoutGrid size={36} color={LOKAGEN_COLORS.krim} />
            </div>
            <span
              style={{
                fontSize: 26,
                fontWeight: 800,
                color: LOKAGEN_COLORS.arang,
              }}
            >
              Caption + Carousel IG
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <div
          style={{
            marginTop: 14,
            padding: "24px 48px",
            borderRadius: 999,
            backgroundColor: LOKAGEN_COLORS.sambal,
            color: LOKAGEN_COLORS.krim,
            fontSize: 38,
            fontWeight: 800,
            boxShadow: "0 18px 36px rgba(194, 65, 12, 0.28)",
            transform: `scale(${interpolate(ctaSpring, [0, 1], [0.85, 1])})`,
            opacity: ctaSpring,
          }}
        >
          Coba gratis • Link di bio
        </div>
      </div>

      <div
        style={{
          fontSize: 30,
          fontWeight: 700,
          color: LOKAGEN_COLORS.arang,
          opacity: ctaSpring,
        }}
      >
        Tag teman UMKM yang relate!
      </div>
    </AbsoluteFill>
  );
};
