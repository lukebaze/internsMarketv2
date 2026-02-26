import { TerminalLine } from './typewriter-utils';

// Scene 2: Install CLI (frames 90-450, 360 frames, 12s)
export const INSTALL_SCENE_LINES: TerminalLine[] = [
  { text: '$ npm install -g internsmarket', type: 'command' },
  { text: '', type: 'blank' },
  { text: '  added 47 packages in 3.2s', type: 'output' },
  { text: '  ✓ installed internsmarket@2.4.0', type: 'output' },
  { text: '', type: 'blank' },
  { text: '$ im setup', type: 'command', delayFrames: 12 },
  { text: '', type: 'blank' },
  { text: '  → Detecting runtimes...', type: 'output' },
  { text: '  → ZeroClaw found at ~/.zeroclaw', type: 'output' },
  { text: '  → OpenClaw not detected', type: 'output' },
  { text: '  ✓ Setup complete', type: 'output' },
];

// Scene 3: Browse & Install Intern (frames 450-1200, 750 frames, 25s)
export const BROWSE_SCENE_LINES: TerminalLine[] = [
  { text: '$ im list --available', type: 'command' },
  { text: '', type: 'blank' },
  { text: '  NAME                ROLE                  TIER     PRICE', type: 'output' },
  { text: '  ──────────────────────────────────────────────────────────', type: 'output' },
  { text: '  jordan-lee          Content Marketing     FREE     $0', type: 'output' },
  { text: '  mia-santos          Social Media          FREE     $0', type: 'output' },
  { text: '  tomoko-nakamura     Technical Writer      FREE     $0', type: 'output' },
  { text: '  alex-rivera         QA Testing            STARTER  $12/mo', type: 'output' },
  { text: '  ethan-hale          Code Review           STARTER  $12/mo', type: 'output' },
  { text: '  marcus-chen         DevOps                STARTER  $12/mo', type: 'output' },
  { text: '  priya-sharma        Data Analysis         PRO      $19/mo', type: 'output' },
  { text: '  sam-park            UX Research           PRO      $19/mo', type: 'output' },
  { text: '', type: 'blank' },
  { text: '$ im install content-marketing-intern', type: 'command', delayFrames: 60 },
  { text: '', type: 'blank' },
  { text: '  → Downloading content-marketing-intern@1.0.0...', type: 'output' },
  { text: '  → Verifying Ed25519 signature... ✓', type: 'output' },
  { text: '  → Extracting package...', type: 'output' },
  { text: '  ✓ Jordan Lee installed successfully', type: 'output' },
];

// Scene 4: Apply & Deploy (frames 1200-1800, 600 frames, 20s)
export const APPLY_SCENE_LINES: TerminalLine[] = [
  { text: '$ im apply content-marketing-intern', type: 'command' },
  { text: '', type: 'blank' },
  { text: '  → Generating ZeroClaw config...', type: 'output' },
  { text: '  → Writing to ~/.zeroclaw/agents/jordan-lee/', type: 'output' },
  { text: '  → Personality: creativity=0.9  empathy=0.85  charisma=0.8', type: 'output' },
  { text: '  → Skills: Blog Writing, SEO Strategy, Brand Voice', type: 'output' },
  { text: '  → Voice: Warm, narrative-driven, uses storytelling', type: 'output' },
  { text: '  ✓ Jordan Lee is now live in ZeroClaw', type: 'output' },
  { text: '', type: 'blank' },
  { text: '$ im status', type: 'command', delayFrames: 15 },
  { text: '', type: 'blank' },
  { text: '  Tier:              Free', type: 'output' },
  { text: '  Interns installed: 1/3', type: 'output' },
  { text: '  Active:            jordan-lee (Content Marketing)', type: 'output' },
];
