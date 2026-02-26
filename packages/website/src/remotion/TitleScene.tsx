import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONTS } from './constants';

export const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();

  // Fade in over first 20 frames, fade out last 15 frames of scene
  const opacity = interpolate(frame, [0, 20, 75, 90], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Subtle upward float on text
  const translateY = interpolate(frame, [0, 30], [18, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Scale for logo entrance
  const logoScale = interpolate(frame, [0, 25], [0.92, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Accent line width animation
  const lineWidth = interpolate(frame, [15, 40], [0, 420], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, opacity }}>
      {/* Subtle grid pattern background */}
      <AbsoluteFill style={{
        backgroundImage: `
          linear-gradient(rgba(245,176,65,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245,176,65,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      {/* Center content */}
      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          transform: `translateY(${translateY}px) scale(${logoScale})`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
        }}>
          {/* Brand mark */}
          <div style={{
            fontFamily: FONTS.mono,
            fontSize: 14,
            letterSpacing: '6px',
            color: COLORS.accentDim,
            textTransform: 'uppercase',
            marginBottom: 20,
          }}>
            internsmarket
          </div>

          {/* Main headline */}
          <div style={{
            fontFamily: FONTS.sans,
            fontSize: 72,
            fontWeight: 700,
            color: COLORS.textPrimary,
            textAlign: 'center',
            lineHeight: 1.15,
            letterSpacing: '-1px',
          }}>
            AI Agents With
          </div>
          <div style={{
            fontFamily: FONTS.sans,
            fontSize: 72,
            fontWeight: 700,
            color: COLORS.accent,
            textAlign: 'center',
            lineHeight: 1.15,
            letterSpacing: '-1px',
          }}>
            Real Identity.
          </div>
          <div style={{
            fontFamily: FONTS.sans,
            fontSize: 40,
            fontWeight: 400,
            color: COLORS.textSecondary,
            textAlign: 'center',
            lineHeight: 1.4,
            marginTop: 8,
          }}>
            Not Just Skills.
          </div>

          {/* Accent divider line */}
          <div style={{
            marginTop: 36,
            width: lineWidth,
            height: 2,
            backgroundColor: COLORS.accent,
            borderRadius: 1,
          }} />

          {/* Tagline */}
          <div style={{
            marginTop: 28,
            fontFamily: FONTS.mono,
            fontSize: 18,
            color: COLORS.textSecondary,
            textAlign: 'center',
            letterSpacing: '0.5px',
            opacity: interpolate(frame, [30, 55], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            }),
          }}>
            Hire • Train • Deploy
          </div>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
