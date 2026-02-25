export interface Intern {
  name: string;
  role: string;
  tier: "free" | "starter" | "pro";
  quote: string;
  skills: string[];
  image: string;
  price: number;
  checkoutUrl?: string;
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
    checkoutUrl: "https://buy.polar.sh/polar_cl_YYCz8Qfb4hTNaw8G6jykQyBAbwlbtiQWjGLaA1OACq1",
    quote: '"I found 3 edge cases you missed."',
    skills: ["Test Plans", "Bug Reports", "Edge Cases"],
    image: "/images/alex-rivera.jpg",
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
  },
];

export const tierColors: Record<string, string> = {
  free: "var(--free-tier)",
  starter: "var(--starter-tier)",
  pro: "var(--pro-tier)",
};
