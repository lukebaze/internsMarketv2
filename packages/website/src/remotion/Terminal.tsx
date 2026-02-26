import React from 'react';
import { useCurrentFrame } from 'remotion';
import { COLORS, FONTS } from './constants';
import { TerminalLine, buildLineTimings, getLineVisibility } from './typewriter-utils';
import { TerminalDots, TerminalLineView, CursorBlock } from './terminal-components';

interface TerminalProps {
  lines: TerminalLine[];
  width?: number;
  height?: number;
  title?: string;
  startFrame?: number;
}

export const Terminal: React.FC<TerminalProps> = ({
  lines,
  width = 1100,
  height = 580,
  title = 'internsmarket — zsh',
  startFrame = 0,
}) => {
  const frame = useCurrentFrame();
  const relativeFrame = frame - startFrame;

  const lineTimings = buildLineTimings(lines);
  const lastLineStart = lineTimings[lineTimings.length - 1] ?? 0;
  const lastLine = lines[lines.length - 1];
  const lastLineDuration = lastLine?.type === 'command'
    ? Math.ceil(lastLine.text.length * 1.2) + 9
    : 4;
  const allComplete = relativeFrame > lastLineStart + lastLineDuration;

  // Find active (currently typing) line
  let activeLine = -1;
  for (let i = 0; i < lines.length; i++) {
    const { isComplete } = getLineVisibility(lines[i], lineTimings[i], relativeFrame);
    if (!isComplete && relativeFrame >= lineTimings[i]) { activeLine = i; break; }
    if (relativeFrame >= lineTimings[i] && i === lines.length - 1 && !allComplete) activeLine = i;
  }
  if (activeLine === -1 && !allComplete) activeLine = 0;

  const showCursor = Math.floor(frame / 15) % 2 === 0;
  const fontSize = 20;

  return (
    <div style={{
      width, height,
      backgroundColor: COLORS.terminalBg,
      borderRadius: 12,
      border: `1px solid ${COLORS.terminalBorder}`,
      overflow: 'hidden',
      boxShadow: '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Chrome title bar */}
      <div style={{
        height: 44, backgroundColor: '#1f1d1a',
        borderBottom: `1px solid ${COLORS.terminalBorder}`,
        display: 'flex', alignItems: 'center',
        paddingLeft: 16, paddingRight: 16, flexShrink: 0,
      }}>
        <TerminalDots />
        <div style={{
          flex: 1, textAlign: 'center',
          fontFamily: FONTS.sans, fontSize: 13,
          color: COLORS.textDim, letterSpacing: '0.5px',
        }}>
          {title}
        </div>
      </div>

      {/* Terminal content area */}
      <div style={{ flex: 1, padding: '20px 28px', overflowY: 'hidden' }}>
        {lines.map((line, i) => {
          const startF = lineTimings[i];
          if (relativeFrame < startF) return null;

          const { visibleText, isComplete } = getLineVisibility(line, startF, relativeFrame);
          if (!visibleText && line.type !== 'blank') return null;

          return (
            <TerminalLineView
              key={i}
              line={line}
              visibleText={visibleText}
              showCursor={showCursor}
              isCurrentLine={activeLine === i && !isComplete}
              fontSize={fontSize}
            />
          );
        })}

        {/* Idle prompt after all lines complete */}
        {allComplete && (
          <div style={{
            fontFamily: FONTS.mono, fontSize,
            lineHeight: 1.6, color: COLORS.cmdColor,
            display: 'flex', alignItems: 'center',
          }}>
            <span>$ </span>
            {showCursor && <CursorBlock fontSize={fontSize} />}
          </div>
        )}
      </div>
    </div>
  );
};
