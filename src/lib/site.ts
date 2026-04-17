import type {
  EducationItem,
  ExperienceItem,
  HighlightItem,
  InterestWorld,
  NavItem,
  ProfileIntro,
  SkillGroup,
  SocialLink,
} from "@/lib/types";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio.example.com";

export const profileIntro: ProfileIntro = {
  name: "Akshit Gangwar",
  title: "Software Development Engineer (SDE)       | Backend Developer | Full-Stack Developer",
  tagline:
    "Backend-focused engineer building production-grade full-stack systems with scalable APIs, strong architecture, and performance-first execution.",
  location: "Bengaluru, India",
  phone: "+91 63971 77067",
  shortBio:
    "Hi, I am a Computer Science undergrad and backend-focused software engineer. I specialize in building scalable, production-grade web applications, with hands-on experience in designing API-driven, microservices-style, and serverless systems. I’ve developed and deployed full-stack platforms used by 50,000+ users, focusing on performance, reliability, and clean architecture. My work spans modern web technologies including Node.js, Next.js, PostgreSQL, and cloud-native tooling, with a strong emphasis on backend engineering and system design. I enjoy solving complex problems, shipping efficient solutions, and continuously pushing my technical boundaries.",
  oldLongBio:
    "I enjoy building systems where architecture, performance, and product clarity all matter at once. Most of my work has centered on API-driven applications, secure authentication flows, async job orchestration, and scalable full-stack products that can handle real traffic without losing developer ergonomics.",
  longBio:
    "HI!!! I am Akshit Gangwar, i am a 3rd year student, doing BTech in Computer Science. I like to explore things , explore new technolligies, build end-to-end products and solve problems. I can be lazy at times, but if a deadline is up on the neck, i tend to deliver my best work. Currently I’ve been getting my hands dirty in developing Web-Based Solutions, building backend heavy applications and grinding leetcode(istg killme fr). Apart from camoing on my laptop and bed-rotting, I love to go out for early morning jogs, challenge myself in pushups, ggetting depressed when my favourate football team-Chelsea looses(happening a lot lately), running through my spotify playlist, watching all kind of animes(name any and i bet i have watched it), and binge-watch series. By nature, i am the guy who pushes to the max at the end of the 400m stint, the one who locks in when deadline could make flatline, dive in the lappy and rest lyf in the bin. Hence, I can boast I have experience in delivering best quality under extremely high pressure situations. I tends to ship fast fast, get done with the work and then chill out. But problem solving is what i take with respect, i take my sweet long timethere. My phyosophy:- ‘Efforts follow law of equivalent exchange, higher the efforts, higher win probability. But results, wo to sab prabhu ki icha hai” ",
  professionalSummary:
    "Backend-focused software engineer experienced in building and deploying production-grade full-stack applications. I design API-driven, microservices-style, serverless, and async systems with a focus on scalable architecture, reliability, and performance-oriented backend engineering.",
  availability: "Open to software engineering, backend, and full-stack opportunities.",
  email: "akshitgangwar02@gmail.com",
};

export const navItems: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
];

export const socialLinks: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Aksh002" },
  { label: "LinkedIn", href: "https://linkedin.com/in/akshit-gangwar-b93840282" },
  { label: "LeetCode", href: "https://leetcode.com/u/Aksh002/" },
  { label: "Email", href: `mailto:${profileIntro.email}` },
];

export const profileHighlights: HighlightItem[] = [
  { label: "Focus", value: "Backend systems, scalable APIs, and production-grade full-stack delivery" },
  { label: "Scale", value: "50K+ visitors, 6.5K+ registered users, and 99.9% uptime on live event traffic" },
  { label: "Stack", value: "Next.js, TypeScript, Node.js, FastAPI, PostgreSQL, Docker, Redis" },
  { label: "Strength", value: "Async workflows, auth systems, serverless runtimes, and deployment-ready architecture" },
];

export const interestWorlds: InterestWorld[] = [
  {
    key: "football",
    title: "Football World",
    kicker: "Energy, tactics, pressure.",
    description:
      "I love the structure of the game: shapes, transitions, timing, and the way individual brilliance only works inside a strong system.",
    motifs: ["Pitch grids", "Match graphics", "Formation-inspired layouts"],
    uiTreatment: "Sharp diagonals, tactical lines, live-score accents, and high-intensity pacing.",
  },
  {
    key: "anime",
    title: "Anime World",
    kicker: "Emotion, scale, and narrative.",
    description:
      "Anime influences how I think about mood and pacing: clean setup, dramatic build, and moments that earn their impact.",
    motifs: ["Cinematic framing", "Panel transitions", "High-contrast focus moments"],
    uiTreatment: "Framed sections, scene-change transitions, and narrative section reveals.",
  },
  {
    key: "music",
    title: "Music World",
    kicker: "Rhythm, layering, replay value.",
    description:
      "Music is part of how I work and think. I like interfaces that feel composed, with cadence in how content enters and resolves.",
    motifs: ["Waveforms", "Equalizer bars", "Album-card textures"],
    uiTreatment: "Rhythmic motion, layered gradients, and looping ambient visual patterns.",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "Languages",
    items: [
      { name: "C++", context: "Strong problem-solving foundations and systems-oriented thinking." },
      { name: "TypeScript", context: "Typed backend and frontend development across monorepos and production apps." },
      { name: "Python", context: "API services, AI workflows, automation, and backend orchestration." },
      { name: "JavaScript", context: "Modern full-stack application development and runtime flexibility." },
    ],
  },
  {
    category: "Frontend",
    items: [
      { name: "Next.js", context: "App architecture, auth-aware products, and production deployment." },
      { name: "React.js", context: "Interactive product UI, stateful interfaces, and reusable components." },
      { name: "Tailwind CSS", context: "Fast, scalable styling for polished product surfaces." },
      { name: "Recoil", context: "State management for richer frontend workflows." },
      { name: "Motion.dev", context: "Animation and interaction polish for modern web interfaces." },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js / Express.js", context: "REST APIs, webhooks, async flows, and service-oriented backend logic." },
      { name: "FastAPI", context: "Typed Python APIs and modular service design." },
      { name: "WebSockets / Webhooks", context: "Realtime and event-driven integrations." },
      { name: "Cloudflare Workers / Hono.js", context: "Edge-native serverless APIs with low-latency request handling." },
    ],
  },
  {
    category: "Data, Infra, and Tooling",
    items: [
      { name: "PostgreSQL / Prisma", context: "Relational data modeling, ORM-backed services, and transaction-aware application logic." },
      { name: "MongoDB / MySQL / SQLite", context: "Flexible persistence options across application styles." },
      { name: "Docker / AWS / CI/CD", context: "Deployment-ready services, containerized workflows, and scalable delivery pipelines." },
      { name: "Supabase / Firebase / GitHub", context: "Product infrastructure, auth flows, and team collaboration workflows." },
    ],
  },
];

export const experienceItems: ExperienceItem[] = [
  {
    company: "Falak'25 Cultural-Sports Fest, MIT Bengaluru",
    role: "IT Head",
    period: "Aug 2025 - Oct 2025",
    highlights: [
      "Architected and deployed a full-stack fest platform with Next.js, NextAuth, and Supabase, achieving 99.9% uptime during peak traffic.",
      "Scaled the platform to 50,000+ visitors, 6,500+ registered users, 5,000+ secure ticket sales, and 2,000+ team registrations.",
      "Built a role-based admin dashboard for four admin types and optimized caching, reducing video load time by 40%.",
      "Led a 5-member UI/UX team, coordinated cross-team delivery, and managed GitHub workflows to ship within the first two weeks.",
    ],
    tech: ["Next.js", "NextAuth", "TypeScript", "Supabase", "Firebase", "Tailwind CSS", "shadcn/ui", "Vercel"],
    outcomes: ["99.9% uptime", "50K+ visitors served", "40% faster video loading"],
  },
];

export const educationItems: EducationItem[] = [
  {
    institution: "Manipal Institute of Technology, Bengaluru",
    credential: "B.Tech in Computer Science and Engineering",
    period: "2023 - 2027",
    notes: [
      "Minor in Data Science.",
      "Current GPA: 8.72.",
    ],
  },
];

export const resumeStats = [
  { label: "Scale Shipped", value: "50K+ users" },
  { label: "Primary Focus", value: "Backend + Full-Stack" },
  { label: "Core Stack", value: "Next.js / TS / Python" },
];
