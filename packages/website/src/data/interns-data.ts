export interface Intern {
  name: string;
  role: string;
  tier: "free" | "starter" | "pro";
  quote: string;
  skills: string[];
  image: string;
  price: number;
}

export const BUNDLE_PRICES = {
  starter: 29, // all 11 current interns
  pro: 49,     // all interns + unlimited + future v1.x
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
  },
  {
    name: "MIA SANTOS",
    role: "Social Media Intern",
    tier: "free",
    price: 0,
    quote: '"Your engagement is about to skyrocket."',
    skills: ["Social Strategy", "Content Calendar", "Analytics"],
    image: "/images/mia-santos.jpg",
  },
  {
    name: "TOMOKO NAKAMURA",
    role: "Technical Writer Intern",
    tier: "free",
    price: 0,
    quote: '"Clear documentation is the best code review."',
    skills: ["API Docs", "Tutorials", "Style Guides"],
    image: "/images/tomoko-nakamura.jpg",
  },
  {
    name: "ALEX RIVERA",
    role: "QA Testing Intern",
    tier: "starter",
    price: 12,
    quote: '"I found 3 edge cases you missed."',
    skills: ["Test Plans", "Bug Reports", "Edge Cases"],
    image: "/images/alex-rivera.jpg",
  },
  {
    name: "ETHAN HALE",
    role: "Code Review Intern",
    tier: "starter",
    price: 12,
    quote: '"This PR needs work. Here\'s why."',
    skills: ["Code Review", "Best Practices", "Refactoring"],
    image: "/images/ethan-hale.jpg",
  },
  {
    name: "LUNA SAGE",
    role: "Life OS Coach Intern",
    tier: "starter",
    price: 12,
    quote: '"Let\'s align your energy with your priorities."',
    skills: ["Productivity", "Habit Design", "Reflection"],
    image: "/images/luna-sage.jpg",
  },
  {
    name: "MARCUS CHEN",
    role: "DevOps Intern",
    tier: "starter",
    price: 12,
    quote: '"Your pipeline is now 10x faster."',
    skills: ["CI/CD", "Docker", "Monitoring", "IaC"],
    image: "/images/marcus-chen.jpg",
  },
  {
    name: "NADIA OKAFOR",
    role: "Research Intern",
    tier: "starter",
    price: 12,
    quote: '"I\'ve compiled 47 sources on that topic."',
    skills: ["Deep Research", "Synthesis", "Citations"],
    image: "/images/nadia-okafor.jpg",
  },
  {
    name: "PRIYA SHARMA",
    role: "Data Analyst Intern",
    tier: "starter",
    price: 12,
    quote: '"The data tells a different story."',
    skills: ["Data Analysis", "Visualization", "SQL"],
    image: "/images/priya-sharma.jpg",
  },
  {
    name: "SAM PATEL",
    role: "Ops & Meetings Intern",
    tier: "starter",
    price: 12,
    quote: '"Meeting notes sent. Action items assigned."',
    skills: ["Meeting Notes", "Task Tracking", "Ops"],
    image: "/images/sam-patel.jpg",
  },
  {
    name: "SOFIA REYES",
    role: "UX Research & Design Intern",
    tier: "pro",
    price: 15,
    quote: '"Users don\'t think the way you think they do."',
    skills: ["UX Research", "Wireframes", "Usability"],
    image: "/images/sofia-reyes.jpg",
  },
];

export const tierColors: Record<string, string> = {
  free: "var(--free-tier)",
  starter: "var(--starter-tier)",
  pro: "var(--pro-tier)",
};
