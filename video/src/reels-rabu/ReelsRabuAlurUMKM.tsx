import React from "react";
import { Audio, Sequence, staticFile } from "remotion";
import { TransitionSeries, linearTiming } from "@remotion/transitions";
import { slide } from "@remotion/transitions/slide";
import { fade } from "@remotion/transitions/fade";
import { wipe } from "@remotion/transitions/wipe";
import {
  SceneBesokAja,
  SceneCaption,
  SceneDesain,
  SceneLokaGen,
  SceneNiat,
  SceneScroll,
} from "./Scenes";

// Total duration calculation (30 fps):
// 75 + 70 + 70 + 70 + 60 + 115 = 460
// Minus transitions: 8 + 8 + 8 + 6 + 10 = 40
// Total = 420 frames = 14.0 seconds (within 10-15s Reels target)
export const REELS_RABU_DURATION = 420;

export const ReelsRabuAlurUMKM: React.FC<{ includeBgm?: boolean }> = ({
  includeBgm = true,
}) => {
  return (
    <>
      {/* Background Music (drops out during "BESOK AJA." punchline, returns on LokaGen) */}
      {includeBgm && (
        <Audio src={staticFile("audio/bgm.wav")} volume={0.38} />
      )}

      {/* Scene 1: Stamp "100% GAS POL!" */}
      <Sequence from={24} durationInFrames={12}>
        <Audio src={staticFile("audio/sfx-pop.wav")} volume={0.65} />
      </Sequence>

      {/* Transition 1 -> Scene 2 */}
      <Sequence from={67} durationInFrames={15}>
        <Audio src={staticFile("audio/sfx-whoosh.wav")} volume={0.45} />
      </Sequence>

      {/* Scene 2: Typing & Backspacing */}
      <Sequence from={73} durationInFrames={28}>
        <Audio src={staticFile("audio/sfx-typing.wav")} volume={0.55} />
      </Sequence>
      <Sequence from={109} durationInFrames={18}>
        <Audio src={staticFile("audio/sfx-backspace.wav")} volume={0.55} />
      </Sequence>

      {/* Transition 2 -> Scene 3 */}
      <Sequence from={129} durationInFrames={15}>
        <Audio src={staticFile("audio/sfx-whoosh.wav")} volume={0.45} />
      </Sequence>

      {/* Scene 3: Messy Design Boing */}
      <Sequence from={139} durationInFrames={18}>
        <Audio src={staticFile("audio/sfx-boing.wav")} volume={0.5} />
      </Sequence>

      {/* Transition 3 -> Scene 4 */}
      <Sequence from={191} durationInFrames={15}>
        <Audio src={staticFile("audio/sfx-whoosh.wav")} volume={0.45} />
      </Sequence>

      {/* Scene 4: Doomscrolling Swipes */}
      <Sequence from={201} durationInFrames={10}>
        <Audio src={staticFile("audio/sfx-swipe.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={219} durationInFrames={10}>
        <Audio src={staticFile("audio/sfx-swipe.wav")} volume={0.4} />
      </Sequence>
      <Sequence from={237} durationInFrames={10}>
        <Audio src={staticFile("audio/sfx-swipe.wav")} volume={0.4} />
      </Sequence>

      {/* Scene 5: "BESOK AJA." Slam */}
      <Sequence from={256} durationInFrames={24}>
        <Audio src={staticFile("audio/sfx-slam.wav")} volume={0.85} />
      </Sequence>

      {/* Transition 5 -> Scene 6 */}
      <Sequence from={305} durationInFrames={15}>
        <Audio src={staticFile("audio/sfx-whoosh.wav")} volume={0.45} />
      </Sequence>

      {/* Scene 6: LokaGen Logo Chime & CTA Pop */}
      <Sequence from={321} durationInFrames={35}>
        <Audio src={staticFile("audio/sfx-chime.wav")} volume={0.65} />
      </Sequence>
      <Sequence from={353} durationInFrames={12}>
        <Audio src={staticFile("audio/sfx-pop.wav")} volume={0.55} />
      </Sequence>

      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={75}>
          <SceneNiat />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: 8 })}
        />

        <TransitionSeries.Sequence durationInFrames={70}>
          <SceneCaption />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={linearTiming({ durationInFrames: 8 })}
        />

        <TransitionSeries.Sequence durationInFrames={70}>
          <SceneDesain />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={wipe({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 8 })}
        />

        <TransitionSeries.Sequence durationInFrames={70}>
          <SceneScroll />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: 6 })}
        />

        <TransitionSeries.Sequence durationInFrames={60}>
          <SceneBesokAja />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={linearTiming({ durationInFrames: 10 })}
        />

        <TransitionSeries.Sequence durationInFrames={115}>
          <SceneLokaGen />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
