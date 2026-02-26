export interface Intern {
  name: string;
  role: string;
  tier: "free" | "starter" | "pro";
  quote: string;
  skills: string[];
  image: string;
  price: number;
  checkoutUrl?: string;
  bio: string;
  personality: string;
  delivers: string[];
}

export const BUNDLE_PRICES = {
  starter: 29, // all 11 current interns
  pro: 49,     // all interns + unlimited + future v1.x
} as const;

export const BUNDLE_CHECKOUT_URLS = {
  starter: "https://buy.polar.sh/polar_cl_IJd1k7iAzEiXwo6CYjQcUxRh2eyqilj00fraQ2vFLG1",
  pro: "https://buy.polar.sh/polar_cl_ozV4UH6FiZsIg19EqEYJkzRUY5WtJ2FiKGfpI22bqq0",
} as const;

export const interns: Intern[] = [
  {
    name: "JORDAN LEE",
    role: "Content Marketing Intern",
    tier: "free",
    price: 0,
    quote: '"Let me craft that narrative for you."',
    skills: ["Blog Writing", "SEO Strategy", "Brand Voice"],
    image: "/images/jordan-lee.jpg",
    bio: "Content marketing specialist who believes the internet needs fewer buzzwords and more honest storytelling. Went viral on LinkedIn with a no-fluff content strategy breakdown.",
    personality: "ENFP",
    delivers: ["SEO-optimized blog posts", "Platform-specific social posts", "Email sequences & newsletters", "Keyword research & content gaps", "Long-form to short-form repurposing"],
  },
  {
    name: "MIA SANTOS",
    role: "Social Media Intern",
    tier: "free",
    price: 0,
    quote: '"Your engagement is about to skyrocket."',
    skills: ["Social Strategy", "Content Calendar", "Analytics"],
    image: "/images/mia-santos.jpg",
    bio: "Social media strategist who thinks in hooks, not headlines. Turned her parents' bubble tea business viral with a 15-second TikTok that got 2.3M views.",
    personality: "ENFP",
    delivers: ["Platform-native social posts", "Monthly content calendars", "Brand-voice engagement replies", "Trending topic angles", "Captions & hashtag sets"],
  },
  {
    name: "TOMOKO NAKAMURA",
    role: "Technical Writer Intern",
    tier: "free",
    price: 0,
    quote: '"Clear documentation is the best code review."',
    skills: ["API Docs", "Tutorials", "Style Guides"],
    image: "/images/tomoko-nakamura.jpg",
    bio: "Technical writer from Osaka who believes bad documentation is a form of disrespect — it tells users 'figure it out yourself.'",
    personality: "INFJ",
    delivers: ["API reference documentation", "Developer READMEs", "Human-readable changelogs", "Architecture docs with diagrams", "Task-oriented user guides"],
  },
  {
    name: "ALEX RIVERA",
    role: "QA Testing Intern",
    tier: "starter",
    price: 12,
    checkoutUrl: "https://buy.polar.sh/polar_cl_YYCz8Qfb4hTNaw8G6jykQyBAbwlbtiQWjGLaA1OACq1",
    quote: '"I found 3 edge cases you missed."',
    skills: ["Test Plans", "Bug Reports", "Edge Cases"],
    image: "/images/alex-rivera.jpg",
    bio: "QA engineer with a gift for thinking like a system under adversarial conditions. If there's an edge case to find, Alex finds it before the user does.",
    personality: "ISTJ",
    delivers: ["Comprehensive test plans", "Structured bug reports", "Playwright/Cypress automation scripts", "Risk-prioritized regression suites", "API test collections"],
  },
  {
    name: "ETHAN HALE",
    role: "Code Review Intern",
    tier: "starter",
    price: 12,
    checkoutUrl: "https://buy.polar.sh/polar_cl_C0cQTw0uRiN6VYS4S5lc2lDrUdI35ko4QlkDn3HJvT6",
    quote: '"This PR needs work. Here\'s why."',
    skills: ["Code Review", "Best Practices", "Refactoring"],
    image: "/images/ethan-hale.jpg",
    bio: "Code review specialist who believes every pull request is a conversation, not a gatekeeping exercise. Reviewed 2,000+ PRs and builds review cultures that catch real problems.",
    personality: "ISTJ",
    delivers: ["Scout-based deep code reviews", "Multi-framework test strategies", "Codebase health audits", "Git workflow & PR standards", "Incident debugging & root cause analysis"],
  },
  {
    name: "LUNA SAGE",
    role: "Life OS Coach Intern",
    tier: "starter",
    price: 12,
    checkoutUrl: "https://buy.polar.sh/polar_cl_ODxiEjniMeacjr3xv104LxnjlpPZmAUSPFUg50n2l0g",
    quote: '"Let\'s align your energy with your priorities."',
    skills: ["Productivity", "Habit Design", "Reflection"],
    image: "/images/luna-sage.jpg",
    bio: "Life systems designer who rebuilt herself after burning out as a startup founder at 24. Helps overwhelmed founders build structures that reduce chaos without killing spontaneity.",
    personality: "INFJ",
    delivers: ["Weekly review & planning sessions", "Goal decomposition systems", "Habit-stacking strategies", "Personalized reflection prompts", "Life audit with 90-day action plan"],
  },
  {
    name: "MARCUS CHEN",
    role: "DevOps Intern",
    tier: "starter",
    price: 12,
    checkoutUrl: "https://buy.polar.sh/polar_cl_55fPjOB3wdCssrdIuJK3iVTPnxyFOzBBzMPSV1IoWMK",
    quote: '"Your pipeline is now 10x faster."',
    skills: ["CI/CD", "Docker", "Monitoring", "IaC"],
    image: "/images/marcus-chen.jpg",
    bio: "DevOps engineer who believes the best infrastructure is the kind nobody notices. Became obsessed with resilient systems after watching a deployment collapse during a 3am outage.",
    personality: "ISTJ",
    delivers: ["GitHub Actions / GitLab CI pipelines", "Production-ready Docker configs", "Cloud infrastructure plans (AWS/GCP)", "Monitoring dashboards & alert rules", "Deployment automation scripts"],
  },
  {
    name: "NADIA OKAFOR",
    role: "Research Intern",
    tier: "starter",
    price: 12,
    checkoutUrl: "https://buy.polar.sh/polar_cl_8ELSHicndk2IRRH2uqtbNw6a1Kb5gho6cZ73G1y36TT",
    quote: '"I\'ve compiled 47 sources on that topic."',
    skills: ["Deep Research", "Synthesis", "Citations"],
    image: "/images/nadia-okafor.jpg",
    bio: "Research specialist who treats every claim like a hypothesis until she's seen the evidence. Helps startups make decisions based on evidence instead of vibes.",
    personality: "INTJ",
    delivers: ["Sourced research briefs", "Competitor analysis matrices", "Source credibility evaluations", "Executive trend summaries", "Bias & framing detection reports"],
  },
  {
    name: "PRIYA SHARMA",
    role: "Data Analyst Intern",
    tier: "starter",
    price: 12,
    checkoutUrl: "https://buy.polar.sh/polar_cl_us0kJ3l6td16nTjmH4HOULVP2yGLJefx2VJVa3ehYc6",
    quote: '"The data tells a different story."',
    skills: ["Data Analysis", "Visualization", "SQL"],
    image: "/images/priya-sharma.jpg",
    bio: "Data analyst with a gift for finding the one number in a dashboard that actually matters and building an entire narrative around it.",
    personality: "INTJ",
    delivers: ["Optimized SQL queries", "Dashboard layouts (Metabase/Looker)", "Executive-ready data narratives", "KPI tracking & interpretation", "Data cleaning pipelines"],
  },
  {
    name: "SAM PATEL",
    role: "Ops & Meetings Intern",
    tier: "starter",
    price: 12,
    checkoutUrl: "https://buy.polar.sh/polar_cl_HT3npwEbtBhpkrNs4tlljZ2vJqN9tydOp7vhv4UI0EK",
    quote: '"Meeting notes sent. Action items assigned."',
    skills: ["Meeting Notes", "Task Tracking", "Ops"],
    image: "/images/sam-patel.jpg",
    bio: "Operations specialist with a near-pathological need for things to be organized and actionable. Turns chaotic meetings into clear action items and tribal knowledge into searchable docs.",
    personality: "ESTJ",
    delivers: ["Structured meeting summaries", "Per-stakeholder follow-up emails", "Knowledge base articles", "Weekly/monthly status reports", "Standard operating procedures"],
  },
  {
    name: "SOFIA REYES",
    role: "UX Research & Design Intern",
    tier: "pro",
    price: 15,
    checkoutUrl: "https://buy.polar.sh/polar_cl_YNvYQLTgMB5lQNOSOdwxiwO9Dsv6KLo7twmbz3JAXub",
    quote: '"Users don\'t think the way you think they do."',
    skills: ["UX Research", "Wireframes", "Usability"],
    image: "/images/sofia-reyes.jpg",
    bio: "UX researcher convinced that most bad products are simply products no one talked to users about. Bridges the gap between user needs and product decisions.",
    personality: "ENFJ",
    delivers: ["User research study designs", "Annotated wireframes & IA maps", "Usability test scripts & metrics", "Design system documentation", "WCAG 2.1 AA accessibility audits"],
  },
];

export const tierColors: Record<string, string> = {
  free: "var(--free-tier)",
  starter: "var(--starter-tier)",
  pro: "var(--pro-tier)",
};

export const tierBgClass: Record<string, string> = {
  free: "bg-[var(--free-tier)]",
  starter: "bg-[var(--starter-tier)]",
  pro: "bg-[var(--pro-tier)]",
};
