// Standalone composition component for use with @remotion/player
// Does NOT include registerRoot or <Composition> wrapper (those are CLI-only)
import React from 'react';
import { Sequence, AbsoluteFill } from 'remotion';
import { TitleScene } from './TitleScene';
import { TerminalScene } from './TerminalScene';
import { ClosingScene } from './ClosingScene';
import {
  INSTALL_SCENE_LINES,
  BROWSE_SCENE_LINES,
  APPLY_SCENE_LINES,
} from './scene-data';
import { COLORS, SCENES } from './constants';

export const DemoVideoComposition: React.FC = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background }}>
      {/* Scene 1: Title Card (0-90 frames, 3s) */}
      <Sequence from={SCENES.title.start} durationInFrames={SCENES.title.end - SCENES.title.start}>
        <TitleScene />
      </Sequence>

      {/* Scene 2: Install CLI (90-450 frames, 12s) */}
      <Sequence from={SCENES.install.start} durationInFrames={SCENES.install.end - SCENES.install.start}>
        <TerminalScene
          lines={INSTALL_SCENE_LINES}
          sceneStartFrame={SCENES.install.start}
          sceneEndFrame={SCENES.install.end}
          label="Step 1 — Install"
        />
      </Sequence>

      {/* Scene 3: Browse & Install Intern (450-1200 frames, 25s) */}
      <Sequence from={SCENES.browse.start} durationInFrames={SCENES.browse.end - SCENES.browse.start}>
        <TerminalScene
          lines={BROWSE_SCENE_LINES}
          sceneStartFrame={SCENES.browse.start}
          sceneEndFrame={SCENES.browse.end}
          label="Step 2 — Browse & Install"
        />
      </Sequence>

      {/* Scene 4: Apply & Deploy (1200-1800 frames, 20s) */}
      <Sequence from={SCENES.apply.start} durationInFrames={SCENES.apply.end - SCENES.apply.start}>
        <TerminalScene
          lines={APPLY_SCENE_LINES}
          sceneStartFrame={SCENES.apply.start}
          sceneEndFrame={SCENES.apply.end}
          label="Step 3 — Apply & Deploy"
        />
      </Sequence>

      {/* Scene 5: Closing Card (1800-2100 frames, 10s) */}
      <Sequence from={SCENES.closing.start} durationInFrames={SCENES.closing.end - SCENES.closing.start}>
        <ClosingScene />
      </Sequence>
    </AbsoluteFill>
  );
};
