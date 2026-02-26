import React from 'react';
import { AbsoluteFill, interpolate, useCurrentFrame } from 'remotion';
import { COLORS, FONTS } from './constants';

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  // Scene is 300 frames total (10s)

  const fadeIn = interpolate(frame, [0, 25], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const fadeOut = interpolate(frame, [255, 295], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const opacity = Math.min(fadeIn, fadeOut);

  // Staggered entrance for each element
  const headlineOpacity = interpolate(frame, [10, 35], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });
  const headlineY = interpolate(frame, [10, 35], [20, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const cmdOpacity = interpolate(frame, [35, 60], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const urlOpacity = interpolate(frame, [55, 80], [0, 1], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  const lineWidth = interpolate(frame, [25, 55], [0, 500], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp',
  });

  // Blinking cursor on command line
  const showCursor = Math.floor(frame / 15) % 2 === 0;

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.background, opacity }}>
      {/* Background grid */}
      <AbsoluteFill style={{
        backgroundImage: `
          linear-gradient(rgba(245,176,65,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(245,176,65,0.03) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
      }} />

      <AbsoluteFill style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 0,
      }}>
        {/* Brand */}
        <div style={{
          fontFamily: FONTS.mono,
          fontSize: 13,
          letterSpacing: '6px',
          color: COLORS.accentDim,
          textTransform: 'uppercase',
          marginBottom: 24,
          opacity: headlineOpacity,
        }}>
          internsmarket
        </div>

        {/* Main CTA headline */}
        <div style={{
          fontFamily: FONTS.sans,
          fontSize: 62,
          fontWeight: 700,
          color: COLORS.textPrimary,
          textAlign: 'center',
          letterSpacing: '-0.5px',
          opacity: headlineOpacity,
          transform: `translateY(${headlineY}px)`,
        }}>
          Your AI team is ready.
        </div>

        {/* Divider */}
        <div style={{
          marginTop: 32,
          width: lineWidth,
          height: 2,
          backgroundColor: COLORS.accent,
          borderRadius: 1,
        }} />

        {/* Install command */}
        <div style={{
          marginTop: 36,
          fontFamily: FONTS.mono,
          fontSize: 28,
          color: COLORS.accent,
          opacity: cmdOpacity,
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          backgroundColor: COLORS.terminalBg,
          padding: '14px 32px',
          borderRadius: 8,
          border: `1px solid ${COLORS.terminalBorder}`,
        }}>
          <span style={{ color: COLORS.textSecondary, marginRight: 10 }}>$</span>
          <span>npm install -g internsmarket</span>
          {showCursor && cmdOpacity > 0.9 && (
            <span style={{
              display: 'inline-block',
              width: 18,
              height: 30,
              backgroundColor: COLORS.accent,
              marginLeft: 3,
              verticalAlign: 'middle',
            }} />
          )}
        </div>

        {/* Website URL */}
        <div style={{
          marginTop: 28,
          fontFamily: FONTS.sans,
          fontSize: 22,
          color: COLORS.textSecondary,
          opacity: urlOpacity,
          letterSpacing: '0.5px',
        }}>
          internsmarket.com
        </div>

        {/* Tagline */}
        <div style={{
          marginTop: 16,
          fontFamily: FONTS.sans,
          fontSize: 16,
          color: COLORS.textDim,
          opacity: urlOpacity,
          letterSpacing: '1px',
          textTransform: 'uppercase',
        }}>
          Hire • Train • Deploy
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
