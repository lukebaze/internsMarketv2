// Video dimensions and timing constants
export const VIDEO_WIDTH = 1920;
export const VIDEO_HEIGHT = 1080;
export const VIDEO_FPS = 30;
export const VIDEO_DURATION_FRAMES = 2100; // 70 seconds

// Brand colors matching the landing page terminal
export const COLORS = {
  background: '#141210',
  terminalBg: '#1a1816',
  terminalBorder: '#2a2724',
  accent: '#F5B041',
  accentDim: '#c4893a',
  green: '#4CAF50',
  red: '#E74C3C',
  yellow: '#F5B041',
  blue: '#5DADE2',
  textPrimary: '#e8e2d9',
  textSecondary: '#9b8f82',
  textDim: '#6b5f52',
  cmdColor: '#F5B041',
  successColor: '#4CAF50',
  infoColor: '#5DADE2',
  errorColor: '#E74C3C',
} as const;

// Font families
export const FONTS = {
  mono: "'Courier New', 'Lucida Console', monospace",
  sans: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
} as const;

// Scene frame boundaries
export const SCENES = {
  title: { start: 0, end: 90 },       // 0-3s
  install: { start: 90, end: 450 },    // 3-15s
  browse: { start: 450, end: 1200 },   // 15-40s
  apply: { start: 1200, end: 1800 },   // 40-60s
  closing: { start: 1800, end: 2100 }, // 60-70s
} as const;
