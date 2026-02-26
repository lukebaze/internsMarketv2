// Utilities for computing typewriter animation state from frame number

export interface TerminalLine {
  text: string;
  type: 'command' | 'output' | 'blank';
  // Delay in frames before this line starts rendering
  delayFrames?: number;
}

export interface TypewriterState {
  lines: Array<{
    text: string;
    type: 'command' | 'output' | 'blank';
    visibleText: string;
    isComplete: boolean;
  }>;
  showCursor: boolean;
  cursorLineIndex: number;
}

// Timing configuration
const CHAR_DELAY_COMMAND = 1.2;  // frames per character for commands (~40ms at 30fps)
const LINE_GAP_FRAMES = 9;       // pause between output complete and next command (0.3s)
const OUTPUT_LINE_DELAY = 4;     // frames between consecutive output lines

/**
 * Simpler sequential approach: computes line visibility based on
 * cumulative timing where each line has a fixed start frame.
 */
export function buildLineTimings(lines: TerminalLine[]): number[] {
  const startFrames: number[] = [];
  let cursor = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const extraDelay = line.delayFrames ?? 0;
    startFrames.push(cursor + extraDelay);

    if (line.type === 'command') {
      const typeDuration = Math.ceil(line.text.length * CHAR_DELAY_COMMAND);
      cursor = startFrames[i] + typeDuration + LINE_GAP_FRAMES;
    } else if (line.type === 'output') {
      cursor = startFrames[i] + OUTPUT_LINE_DELAY;
    } else {
      cursor = startFrames[i] + 2;
    }
  }

  return startFrames;
}

/**
 * For a given line and its start frame, compute how much of it is visible.
 */
export function getLineVisibility(
  line: TerminalLine,
  lineStartFrame: number,
  currentFrame: number
): { visibleText: string; isComplete: boolean } {
  if (currentFrame < lineStartFrame) {
    return { visibleText: '', isComplete: false };
  }

  const elapsed = currentFrame - lineStartFrame;

  if (line.type === 'command') {
    const charCount = Math.floor(elapsed / CHAR_DELAY_COMMAND);
    const visibleText = line.text.slice(0, Math.min(charCount, line.text.length));
    return { visibleText, isComplete: charCount >= line.text.length };
  }

  // Output lines appear immediately
  return { visibleText: line.text, isComplete: true };
}
