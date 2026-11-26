import React from "react";
import { Composition } from "remotion";
import { LokaGenIntro } from "./LokaGenIntro";
import {
  REELS_RABU_DURATION,
  ReelsRabuAlurUMKM,
} from "./reels-rabu/ReelsRabuAlurUMKM";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="ReelsRabuAlurUMKM"
        component={ReelsRabuAlurUMKM}
        durationInFrames={REELS_RABU_DURATION}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ includeBgm: true }}
      />
      <Composition
        id="LokaGenLandscape"
        component={LokaGenIntro}
        durationInFrames={150}
        fps={30}
        width={1920}
        height={1080}
      />
      <Composition
        id="LokaGenVertical"
        component={LokaGenIntro}
        durationInFrames={150}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};
