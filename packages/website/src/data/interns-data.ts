export interface Intern {
  name: string;
  role: string;
  tier: "free" | "starter" | "pro";
  quote: string;
  skills: string[];
  image: string;
}

export const interns: Intern[] = [
  {
    name: "JORDAN LEE",
    role: "Content Marketing Intern",
    tier: "free",
    quote: '"Let me craft that narrative for you."',
    skills: ["Blog Writing", "SEO Strategy", "Brand Voice"],
    image: "/images/jordan-lee.jpg",
  },
  {
    name: "MIA SANTOS",
    role: "Social Media Intern",
    tier: "free",
    quote: '"Your engagement is about to skyrocket."',
    skills: ["Social Strategy", "Content Calendar", "Analytics"],
    image: "/images/mia-santos.jpg",
  },
  {
    name: "TOMOKO NAKAMURA",
    role: "Technical Writer Intern",
    tier: "free",
    quote: '"Clear documentation is the best code review."',
    skills: ["API Docs", "Tutorials", "Style Guides"],
    image: "/images/tomoko-nakamura.jpg",
  },
  {
    name: "ALEX RIVERA",
    role: "QA Testing Intern",
    tier: "starter",
    quote: '"I found 3 edge cases you missed."',
    skills: ["Test Plans", "Bug Reports", "Edge Cases"],
    image: "/images/alex-rivera.jpg",
  },
  {
    name: "ETHAN HALE",
    role: "Code Review Intern",
    tier: "starter",
    quote: '"This PR needs work. Here\'s why."',
    skills: ["Code Review", "Best Practices", "Refactoring"],
    image: "/images/ethan-hale.jpg",
  },
  {
    name: "LUNA SAGE",
    role: "Life OS Coach Intern",
    tier: "starter",
    quote: '"Let\'s align your energy with your priorities."',
    skills: ["Productivity", "Habit Design", "Reflection"],
    image: "/images/luna-sage.jpg",
  },
  {
    name: "MARCUS CHEN",
    role: "DevOps Intern",
    tier: "starter",
    quote: '"Your pipeline is now 10x faster."',
    skills: ["CI/CD", "Docker", "Monitoring", "IaC"],
    image: "/images/marcus-chen.jpg",
  },
  {
    name: "NADIA OKAFOR",
    role: "Research Intern",
    tier: "starter",
    quote: '"I\'ve compiled 47 sources on that topic."',
    skills: ["Deep Research", "Synthesis", "Citations"],
    image: "/images/nadia-okafor.jpg",
  },
  {
    name: "PRIYA SHARMA",
    role: "Data Analyst Intern",
    tier: "starter",
    quote: '"The data tells a different story."',
    skills: ["Data Analysis", "Visualization", "SQL"],
    image: "/images/priya-sharma.jpg",
  },
  {
    name: "SAM PATEL",
    role: "Ops & Meetings Intern",
    tier: "starter",
    quote: '"Meeting notes sent. Action items assigned."',
    skills: ["Meeting Notes", "Task Tracking", "Ops"],
    image: "/images/sam-patel.jpg",
  },
  {
    name: "SOFIA REYES",
    role: "UX Research & Design Intern",
    tier: "pro",
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
