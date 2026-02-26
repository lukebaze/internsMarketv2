// Sub-components used by Terminal.tsx: dots, line view, cursor
import React from 'react';
import { COLORS, FONTS } from './constants';
import { TerminalLine } from './typewriter-utils';

// Terminal chrome dots (traffic light buttons)
export const TerminalDots: React.FC = () => (
  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
    <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: COLORS.red, opacity: 0.85 }} />
    <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: COLORS.yellow, opacity: 0.85 }} />
    <div style={{ width: 14, height: 14, borderRadius: '50%', backgroundColor: COLORS.green, opacity: 0.85 }} />
  </div>
);

// Resolve text color based on line type and content
export function getLineColor(line: TerminalLine, visibleText: string): string {
  if (line.type === 'command') return COLORS.cmdColor;
  if (line.type === 'blank') return 'transparent';
  if (visibleText.startsWith('✓') || visibleText.includes('successfully')) return COLORS.successColor;
  if (visibleText.startsWith('→')) return COLORS.infoColor;
  if (visibleText.startsWith('NAME') || visibleText.startsWith('---') || visibleText.startsWith('──')) return COLORS.textSecondary;
  if (visibleText.startsWith('Tier:') || visibleText.startsWith('Active:') || visibleText.startsWith('Interns')) return COLORS.textPrimary;
  return COLORS.textSecondary;
}

// Inline cursor block element
export const CursorBlock: React.FC<{ fontSize: number }> = ({ fontSize }) => (
  <span style={{
    display: 'inline-block',
    width: Math.floor(fontSize * 0.6),
    height: fontSize * 1.1,
    backgroundColor: COLORS.accent,
    marginLeft: 1,
    verticalAlign: 'middle',
  }} />
);

// Single terminal line renderer
export const TerminalLineView: React.FC<{
  line: TerminalLine;
  visibleText: string;
  showCursor: boolean;
  isCurrentLine: boolean;
  fontSize: number;
}> = ({ line, visibleText, showCursor, isCurrentLine, fontSize }) => {
  if (line.type === 'blank') {
    return <div style={{ height: fontSize * 0.8, fontFamily: FONTS.mono }} />;
  }

  return (
    <div style={{
      fontFamily: FONTS.mono,
      fontSize,
      lineHeight: 1.6,
      color: getLineColor(line, visibleText),
      whiteSpace: 'pre',
      display: 'flex',
      alignItems: 'center',
    }}>
      <span>{visibleText}</span>
      {isCurrentLine && showCursor && <CursorBlock fontSize={fontSize} />}
    </div>
  );
};
