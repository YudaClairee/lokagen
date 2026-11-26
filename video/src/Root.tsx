import React from "react";
import { Composition, Folder, Still } from "remotion";
import { LokaGenIntro } from "./LokaGenIntro";
import {
  REELS_RABU_DURATION,
  ReelsRabuAlurUMKM,
} from "./reels-rabu/ReelsRabuAlurUMKM";
import { CarouselSelasa } from "./carousel-selasa/CarouselSelasa";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Folder name="Carousel-Selasa-8-Des">
        <Still
          id="SelasaSlide1"
          component={CarouselSelasa}
          width={1080}
          height={1350}
          defaultProps={{ slideIndex: 1 as const }}
        />
        <Still
          id="SelasaSlide2"
          component={CarouselSelasa}
          width={1080}
          height={1350}
          defaultProps={{ slideIndex: 2 as const }}
        />
        <Still
          id="SelasaSlide3"
          component={CarouselSelasa}
          width={1080}
          height={1350}
          defaultProps={{ slideIndex: 3 as const }}
        />
        <Still
          id="SelasaSlide4"
          component={CarouselSelasa}
          width={1080}
          height={1350}
          defaultProps={{ slideIndex: 4 as const }}
        />
        <Still
          id="SelasaSlide5"
          component={CarouselSelasa}
          width={1080}
          height={1350}
          defaultProps={{ slideIndex: 5 as const }}
        />
      </Folder>

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
