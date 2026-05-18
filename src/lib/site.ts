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
    "HI!!! I am Akshit Gangwar, i am a 3rd year student, doing BTech in Computer Science. I like to explore things , explore new technolligies, build end-to-end products and solve problems. I can be lazy at times, but if a deadline is up on the neck, i tend to deliver my best work. Currently I’ve been getting my hands dirty in developing Web-Based Solutions, building backend heavy applications and grinding leetcode(istg killme fr). Apart from camping on my laptop and bed-rotting, I love to go out for early morning jogs, challenge myself in pushups, ggetting depressed when my favourate football team-Chelsea looses(happening a lot lately), running through my spotify playlist, watching all kind of animes(name any and i bet i have watched it), and binge-watch series. By nature, i am the guy who pushes to the max at the end of the 400m stint, the one who locks in when deadline could make flatline, dive in the lappy and rest lyf in the bin. Hence, I can boast I have experience in delivering best quality under extremely high pressure situations. I tends to ship fast fast, get done with the work and then chill out. But problem solving is what i take with respect, i take my sweet long timethere. My phyosophy:- ‘Efforts follow law of equivalent exchange, higher the efforts, higher win probability. But results, wo to sab prabhu ki icha hai” ",
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

export const landingShortBioParagraphs = [
  "Computer Science undergrad and backend-focused engineer, building scalable web applications with API-first thinking, strong architecture, and production readiness in mind.",
  "I have shipped full-stack platforms used by 50,000+ users and enjoy turning complex requirements into reliable systems with clean execution.",
];

export const aboutBioParagraphs = [
  "Hi, I am Akshit Gangwar, a third-year Computer Science student who likes exploring new technologies, building end-to-end products, and solving problems that actually feel worth the effort.",
  "Most of my recent work has been around web-based solutions and backend-heavy applications. Outside that, I am equally at home going for early morning jogs, running through my Spotify playlist, watching anime, or getting emotionally invested in Chelsea matches that absolutely do not help my peace of mind.",
  "I tend to do my best work under pressure. I ship fast when the direction is clear, stay stubborn about problem solving when it matters, and genuinely enjoy the part where effort, systems, and deadlines all collide.",
];

export const autoBioParagraphs2 = [
  "HI!!! I am Akshit Gangwar, i am a 3rd year student, doing BTech in Computer Science. I like to explore things , explore new technolligies, build end-to-end products and solve problems.",
  "Currently I’ve been getting my hands dirty in developing Web-Based Solutions, building backend heavy applications and grinding leetcode(istg killme fr).",
  "By nature, i am the guy who pushes to the max at the end of the 400m stint, the one who locks in when deadline could make you flatline, diving in the lappy and rest of my lyf in the bin kinda situation. I can be lazy at times, but if a deadline is up on the neck, i tend to deliver my best work. Hence, I can boast that I have experience in delivering best quality under extremely high pressure situations(created by me only). I tends to ship fast fast, get done with the work and then chill out. But problem solving is what i treat with respect, i take my sweet long time there to think through of all the edge-cases.",
  "Apart from camping on my laptop and bed-rotting, I love to go out for early morning jogs, challenge myself in pushups, getting depressed when my favourate football team-Chelsea looses(happening a lot lately), running through my spotify playlist, watching all kind of animes(name any and i bet i have watched it), and binge-watch series.",
  "My phyosophy:- ‘Efforts follow law of equivalent exchange, higher the efforts, higher win probability. But results, wo to sab prabhu ki icha hai”"

]

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

export const mlResumeProfile = {
  title: "Machine Learning Engineer | Data-Driven Systems | Full-Stack Developer",
  summary:
    "Computer Science student at MIT Bengaluru with hands-on experience building data-driven systems and machine learning pipelines. Skilled in Python, data analysis, recommendation systems, and scalable system design, with a focus on modeling user behavior and delivering production-ready solutions.",
  availability: "Open to machine learning, data science, backend, and full-stack opportunities.",
  focusChips: ["Recommendation systems", "Data pipelines", "Production ML"],
};

export const mlResumeStats = [
  { label: "ML Focus", value: "Recommenders" },
  { label: "Data Scale", value: "100K+ users" },
  { label: "Core Stack", value: "Python / Pandas / sklearn" },
];

export const mlSkillGroups: SkillGroup[] = [
  {
    category: "Languages",
    items: [
      { name: "Python", context: "Machine learning pipelines, data analysis, modeling, and backend automation." },
      { name: "TypeScript", context: "Typed full-stack products and API-driven interfaces." },
      { name: "JavaScript", context: "Modern web application development and integration work." },
      { name: "C++ / C", context: "Problem-solving foundations and systems-oriented programming practice." },
    ],
  },
  {
    category: "Data Science",
    items: [
      { name: "Scikit-learn", context: "Collaborative filtering, matrix factorization, evaluation workflows, and model iteration." },
      { name: "Pandas / NumPy", context: "Data wrangling, feature construction, temporal windows, and numerical analysis." },
      { name: "SciPy", context: "Sparse matrix workflows and scalable recommender-system computation." },
      { name: "Seaborn / Matplotlib", context: "Exploratory analysis, drift visualization, and model-behavior reporting." },
    ],
  },
  {
    category: "Frameworks",
    items: [
      { name: "Next.js / React.js", context: "Product UI and full-stack delivery for production web platforms." },
      { name: "Node.js / Express.js", context: "REST APIs, asynchronous workflows, and service-oriented backend logic." },
      { name: "WebSockets / REST APIs", context: "Realtime and request-driven integrations across web systems." },
      { name: "Serverless Architectures", context: "Deployable services with scalable request handling and lower operational overhead." },
    ],
  },
  {
    category: "Data, Infra, and Tools",
    items: [
      { name: "PostgreSQL / Prisma / Drizzle", context: "Relational modeling, typed data access, and transactional application state." },
      { name: "MongoDB / MySQL / SQLite", context: "Persistence choices across experiments, products, and service prototypes." },
      { name: "Docker / AWS / CI/CD", context: "Deployment-ready services and reproducible delivery workflows." },
      { name: "Git / GitHub / Postman", context: "Version control, API validation, and collaborative engineering workflows." },
    ],
  },
];

export const mlExperienceItems: ExperienceItem[] = [
  {
    company: "Falak'25 Cultural-Sports Fest, MIT Bengaluru",
    role: "IT Head",
    period: "Aug 2025 - Oct 2025",
    highlights: [
      "Architected and deployed scalable backend systems for a high-traffic fest platform, achieving 99.9% uptime.",
      "Supported 50,000+ visitors, 6,500+ users, 5,000+ ticket transactions, and 2,000+ registrations.",
      "Built role-based admin dashboards for monitoring and decision support; optimized caching to reduce load time by 40%.",
      "Led a 5-member team, coordinating cross-functional workflows and version control to deliver the system within 2 weeks.",
    ],
    tech: ["Next.js", "NextAuth", "TypeScript", "Supabase", "Firebase", "Tailwind CSS", "JavaScript", "Vercel"],
    outcomes: ["99.9% uptime", "50K+ visitors", "40% faster loads"],
  },
];

export const mlResumeProjects = [
  {
    slug: "tenflix-recommendation-system",
    title: "TenFlix",
    summary:
      "A hybrid, lifecycle-aware recommender system designed for cold-start, sparse, and mature users with adaptive recommendation strategies.",
    roles: ["Machine Learning Engineer", "Data Scientist"],
    stack: [
      "Python",
      "Pandas",
      "NumPy",
      "SciPy",
      "Scikit-learn",
      "Sparse Matrices",
      "Matrix Factorization",
    ],
    impact:
      "Scaled time-aware collaborative filtering to 100K+ users and quantified temporal preference drift with latent embeddings.",
    links: [{ label: "GitHub", href: "https://github.com/Aksh002" }],
  },
  {
    slug: "paytm-payments-platform-ml-resume",
    title: "Paytm (Payments Platform)",
    summary:
      "A microservices-based payments platform supporting secure P2P and P2M transactions across user and merchant systems.",
    roles: ["Full-Stack Developer", "Backend Engineer"],
    stack: [
      "Next.js",
      "Node.js",
      "Express.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Webhooks",
      "Docker",
      "CI/CD",
      "AWS",
      "Turborepo",
    ],
    impact:
      "Implemented asynchronous transaction workflows with webhooks and job queues for reliable event-driven processing.",
    links: [{ label: "GitHub", href: "https://github.com/Aksh002/Paytm-project-adv" }],
  },
];
