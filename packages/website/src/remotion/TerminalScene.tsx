import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONTS } from './constants';
import { Terminal } from './Terminal';
import { TerminalLine } from './typewriter-utils';

interface TerminalSceneProps {
  lines: TerminalLine[];
  sceneStartFrame: number;
  sceneEndFrame: number;
  label?: string;
}

export const TerminalScene: React.FC<TerminalSceneProps> = ({
  lines,
  sceneStartFrame,
  sceneEndFrame,
  label,
}) => {
  const frame = useCurrentFrame();
  const sceneDuration = sceneEndFrame - sceneStartFrame;
  const fadeInEnd = 20;
  const fadeOutStart = sceneDuration - 20;

  // Scene-local opacity fade
  const opacity = interpolate(
    frame,
    [0, fadeInEnd, fadeOutStart, sceneDuration],
    [0, 1, 1, 0],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  // Terminal slides in from slightly below
  const terminalY = interpolate(frame, [0, 25], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, opacity }}>
      {/* Background grid */}
      <AbsoluteFill style={{
        backgroundImage: `
          linear-gradient(rgba(245,176,65,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245,176,65,0.025) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Scene label */}
      {label && (
        <div style={{
          position: 'absolute',
          top: 48,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontFamily: FONTS.mono,
          fontSize: 13,
          letterSpacing: '4px',
          color: COLORS.accentDim,
          textTransform: 'uppercase',
          opacity: interpolate(frame, [10, 30], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          }),
        }}>
          {label}
        </div>
      )}

      {/* Terminal centered */}
      <AbsoluteFill style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `translateY(${terminalY}px)`,
      }}>
        <Terminal
          lines={lines}
          width={1100}
          height={780}
          startFrame={0}
        />
      </AbsoluteFill>

      {/* Bottom watermark */}
      <div style={{
        position: 'absolute',
        bottom: 36,
        right: 52,
        fontFamily: FONTS.mono,
        fontSize: 13,
        color: COLORS.textDim,
        letterSpacing: '1px',
        opacity: interpolate(frame, [30, 50], [0, 0.6], {
          extrapolateLeft: 'clamp',
          extrapolateRight: 'clamp',
        }),
      }}>
        internsmarket.com
      </div>
    </AbsoluteFill>
  );
};
