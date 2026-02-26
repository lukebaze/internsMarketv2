"use client";

import { Player } from "@remotion/player";
import { DemoVideoComposition, VIDEO_DURATION_FRAMES, VIDEO_FPS, VIDEO_WIDTH, VIDEO_HEIGHT } from "@/remotion";

/** Inline Remotion player rendering the demo video composition */
export function DemoVideoPlayer() {
  return (
    <Player
      component={DemoVideoComposition}
      durationInFrames={VIDEO_DURATION_FRAMES}
      compositionWidth={VIDEO_WIDTH}
      compositionHeight={VIDEO_HEIGHT}
      fps={VIDEO_FPS}
      style={{ width: "100%" }}
      controls
      autoPlay
      loop
      acknowledgeRemotionLicense
    />
  );
}
