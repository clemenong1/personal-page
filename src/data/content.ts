/**
 * Everything the site says lives here: profile, experience, projects, education,
 * activities, page copy and the mascot's lines. Components only render it.
 * Skills are not listed by hand; they are derived from the tags below.
 */

export type SocialKind = 'github' | 'linkedin' | 'email';

export interface Social {
  kind: SocialKind;
  label: string;
  url: string;
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  role: string;
  tagline: string;
  /** One line under the tagline on the landing screen. */
  blurb: string;
  location: string;
  coordinates: string;
  email: string;
  website: string;
  photo: string;
  greeting: string;
  bio: string[];
  currently: string;
  /** `preview` is page 1 of the PDF as an image: pdftoppm -r 160 -png -singlefile <pdf> <name>. */
  resume: { pdf: string; preview: string; fileName: string; label: string };
  socials: Social[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  dates: string;
  /** A role that has not started yet. */
  upcoming?: boolean;
  /** The role I hold right now. */
  current?: boolean;
  /** One line about the company and the job, shown above the bullets. */
  summary?: string;
  bullets: string[];
  tags: string[];
  photos?: Photo[];
  links?: ProjectLink[];
  /** Slugs of projects built in this role. */
  projects?: string[];
}

export interface Photo {
  src: string;
  alt: string;
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  /** The hackathon or programme it was built for. */
  event: string;
  role: string;
  dates: string;
  featured: boolean;
  summary: string;
  problem: string;
  built: string[];
  /** Left out when the resume states no result. */
  outcome?: string;
  tags: string[];
  /** Left out when there is no screenshot yet; a placeholder is drawn instead. */
  image?: Photo;
  links: ProjectLink[];
}

export interface Education {
  school: string;
  degree: string;
  dates: string;
  note: string;
}

export interface Activity {
  role: string;
  organisation: string;
  dates: string;
  description: string;
}

export const profile: Profile = {
  name: 'Clemen Ong',
  firstName: 'Clemen',
  lastName: 'Ong',
  role: 'Software Engineer',
  tagline: 'Relentless Curiosity, Boundless Innovation.',
  blurb: 'Software engineer and Computer Science undergraduate at NUS, drawn to distributed systems.',
  location: 'Singapore',
  coordinates: '1.35°N 103.82°E',
  email: 'clemenojk28@gmail.com',
  website: 'clemen.vercel.app',
  photo: '/images/profile-bg.jpg',
  greeting: "Hi, I'm Clemen.",
  bio: [
    "I'm a penultimate-year Computer Science student at the National University of Singapore.",
    "I've had experience as a software engineer at PayPal, GovTech and UBS, where I worked on service migrations, CI and test automation, and AI engineering.",
    "I am interested in AI with FinTech. I also love learning about distributed systems.",
  ],
  currently: 'Software Engineer @ PayPal',
  resume: {
    pdf: '/resume/ClemenOng_2026_Resume.pdf',
    preview: '/resume/ClemenOng_2026_Resume.png',
    fileName: 'ClemenOng_2026_Resume.pdf',
    label: 'Download resume',
  },
  socials: [
    { kind: 'github', label: 'GitHub', url: 'https://github.com/clemenong1' },
    { kind: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/clemenong1' },
    { kind: 'email', label: 'Email', url: 'mailto:clemenojk28@gmail.com' },
  ],
};

/** Newest first. */
export const experiences: Experience[] = [
  {
    id: 'binance',
    role: 'Software Engineer',
    company: 'Binance',
    location: 'Singapore',
    dates: 'Dec 2026',
    upcoming: true,
    bullets: ['Backend engineer on the KYC team.'],
    tags: [],
  },
  {
    id: 'paypal',
    role: 'Software Engineer Intern',
    company: 'PayPal',
    location: 'Singapore',
    dates: 'May 2026 – Nov 2026',
    bullets: [
      "I led the migration of 5+ services across domains from Spring to PayPal's Java Cloud Framework on Google Cloud.",
      'I worked with agentic Playwright workflows for end-to-end checkout testing across 5 disconnected systems, which raised test coverage and cut manual QA effort.',
      'I built CI automation on Harness and GitHub Actions, including a batch settlement pipeline that stays safe when several developers trigger it at once, and tuned an MCP-integrated PRD-to-PR generator with repo-specific context so its code fits each codebase.',
    ],
    tags: ['Java', 'Spring', 'Google Cloud', 'Playwright', 'Agentic workflows', 'Harness CI', 'GitHub Actions', 'MCP'],
    photos: [
      { src: '/images/paypal-office.jpg', alt: 'Clemen at the PayPal Singapore Development Center' },
      { src: '/images/paypal-interns.jpg', alt: "Clemen with PayPal's intern cohort in Singapore" },
    ],
    links: [
      {
        label: "Featured in 'Meet our Interns' on PayPal's university hiring page",
        url: 'https://careers.pypl.com/university-hiring/asia-pacific/default.aspx',
      },
    ],
  },
  {
    id: 'teck-wei',
    role: 'Forward Deployed Engineer',
    company: 'Teck Wei Credit',
    location: 'Singapore',
    dates: 'Sep 2026 – Nov 2026',
    current: true,
    summary:
      'Teck Wei Credit provides vehicle floor-stock financing for car and motorcycle dealerships in Singapore. I work on-site every week with the operations staff, scoping pain points and building AI solutions that take manual work out of their day-to-day workflows.',
    // TODO(Clemen): no figures beyond "50+ client companies" yet. Time saved per report or reports per month
    // would strengthen the second bullet if you have them.
    bullets: [
      "I built dashboards and metrics that pull client data from PICOM, the company's core system, giving staff day-to-day updates on client activity across 50+ client companies.",
      'I wrote reusable AI skills for recurring workflows, including insurance report handling and the monthly Floor Stock Department report, which is generated from the outstanding-listing PDF.',
      'I extended the existing non-AI automation to cover special cases that integrate with PICOM.',
      "I shipped TW Document Automation, a PWA that drafts agreements by filling the company's Word templates from a single form.",
    ],
    tags: ['AI workflows', 'React', 'TypeScript', 'Vite', 'PWA'],
    projects: ['tw-document-automation'],
  },
  {
    id: 'govtech',
    role: 'Software Engineer Intern',
    company: 'GovTech',
    location: 'Singapore',
    dates: 'Jan 2026 – May 2026',
    bullets: [
      'I built a pipeline that pulls live data from internal scrum dashboards and turns it into polished PowerPoint progress reports for Program Managers, cutting report creation from 1–2 days to minutes.',
      'I added AI-generated captions, tuning prompt structure and token usage so large volumes of dashboard data become presentation-ready summaries at a low LLM API cost.',
      'I standardised the front-end HTML to fix UI inconsistencies and make future dashboard-parsing features easier to plug in.',
    ],
    tags: ['Python', 'JavaScript', 'HTML', 'CSS', 'YAML', 'LLMs', 'Prompt engineering'],
  },
  {
    id: 'ubs',
    role: 'Software Engineer Intern',
    company: "UBS Tomorrow's Talent Programme",
    location: 'Shanghai',
    dates: 'Dec 2025 – Jan 2026',
    bullets: [
      'In a group of 5, and working with subject matter experts, I helped build an LLM-powered coding assistant on GraphRAG that traces dependencies across modules to generate context-aware code that fits the codebase.',
      'It shortened the time engineers need to learn an unfamiliar codebase and improved code accuracy across trading and risk workflows.',
    ],
    tags: ['LLMs', 'GraphRAG'],
  },
];

/** Newest first. Featured projects get cards; the rest go in the archive list. */
export const projects: Project[] = [
  {
    slug: 'tw-document-automation',
    title: 'TW Document Automation',
    event: 'Teck Wei Credit',
    role: 'Forward Deployed Engineer',
    // TODO(Clemen): confirm when this was built; only the year is certain from the role's start date.
    dates: '2026',
    featured: false,
    summary: 'A PWA that fills Word agreement templates from a single form and outputs .docx and PDF, entirely in the browser.',
    problem: "Drafting an agreement meant filling in the company's Word templates by hand.",
    built: [
      'I built a PWA in Vite, React and TypeScript where a single form fills the Word agreement templates and outputs both .docx and PDF.',
      'Everything runs client-side: the documents are assembled in the browser with JSZip and nothing is stored on a server.',
      'It is installable through vite-plugin-pwa and deployed on Vercel.',
    ],
    // TODO(Clemen): no outcome stated yet (for example time saved per agreement), so the section is left out.
    tags: ['Vite', 'React', 'TypeScript', 'JSZip', 'PWA', 'Vercel'],
    // TODO(Clemen): add the repo link here once you confirm it is public.
    links: [],
  },
  {
    slug: 'news-trading-bot',
    title: 'News-driven trading bot',
    event: 'GIC Code to Impact 2026',
    role: 'AI Engineer',
    dates: 'Sep 2026',
    featured: true,
    summary: 'An automated bot that trades multiple instruments and picks its strategy from live news.',
    problem: 'Build an automated trading bot that trades multiple instruments to maximise PnL.',
    built: [
      'I led a group of 5 to build the bot.',
      'I built a news-driven strategy: it extracts keywords from a live news API, uses an LLM to map them to the industries affected, and triggers the most effective strategy for each instrument.',
    ],
    outcome: 'Placed top 2 in both bot rating and PnL out of 14 teams.',
    tags: ['LLMs'],
    image: { src: '/images/gic-leaderboard.jpg', alt: "Final leaderboard from GIC Code to Impact 2026" },
    links: [],
  },
  {
    slug: 'agent-marketplace',
    title: 'Agent Marketplace',
    event: 'AMEX Innovation Labs Hackathon',
    role: 'AI Engineer',
    dates: 'Aug 2026 – Sep 2026',
    featured: true,
    summary: 'A marketplace where consumers find AI shopping agents, ranked by a transaction-based Trust Score.',
    problem: 'Consumers need a way to find AI shopping agents suited to a category and use case.',
    built: [
      "I built an Agent Marketplace on AMEX's Agentic Commerce Experience (ACE) developer kit.",
      'I designed a weighted Trust Score across 5 transaction-based dimensions, with a 90-day decay that favours recent performance.',
      'I built an explainable recommendation engine that ranks agents by blending the priorities a user chooses into weighted scores.',
    ],
    outcome: 'Led a team of 4 to the finals, placing top 5 out of more than 100 participants.',
    tags: ['AI agents'],
    image: { src: '/images/agent-marketplace.jpg', alt: "Home screen of the Agent Marketplace" },
    links: [],
  },
  {
    slug: 'psa-ops-dashboard',
    title: 'AI operations dashboard',
    event: 'PSA Code Sprint',
    role: 'AI Engineer',
    dates: 'Aug 2025',
    featured: true,
    summary: 'An AI-powered dashboard that automates PSA L2 Product Ops.',
    problem: 'Improve operational resilience and continuity for PSA L2 Product Ops.',
    built: [
      'I led a team of 4 to build an AI-powered dashboard that automates L2 Product Ops.',
      'I developed an AI workflow that gives accurate diagnostics across varied customer alert formats.',
    ],
    outcome: 'Top 4 among 300+ teams.',
    tags: ['AI workflows'],
    image: { src: '/images/psa-code-sprint.jpg', alt: "My team on stage at the PSA Code Sprint finals" },
    links: [],
  },
  {
    slug: 'singasport',
    title: 'SingaSport',
    event: 'NUS Orbital Apollo (Advanced)',
    role: 'Full Stack Developer',
    dates: 'May 2025 – Aug 2025',
    featured: true,
    summary: "A mobile app showing real-time occupancy across 370+ of Singapore's public sports facilities.",
    problem: 'See how busy a public sports facility is before heading down, across 370+ facilities in Singapore.',
    built: [
      'I co-developed the mobile app in React Native and Firebase, using geolocation and geofencing to monitor occupancy in real time.',
      'I developed an AI recommendation chatbot that helps users find better facility alternatives.',
    ],
    tags: ['React Native', 'Firebase', 'Geolocation', 'AI chatbots'],
    image: { src: '/images/singasport-app.jpg', alt: "Screens from the SingaSport app" },
    links: [{ label: 'GitHub', url: 'https://github.com/clemenong1/SingaSport' }],
  },
  {
    slug: 'project-reach',
    title: 'Catch Them Young',
    event: 'Morgan Stanley Code to Give 2025',
    role: 'Full Stack Developer',
    dates: 'Aug 2025',
    featured: false,
    summary: "A donor platform for a non-profit supporting underprivileged children's education in Hong Kong.",
    problem:
      "Non-profit Project Reach wanted to increase donor retention and outreach for underprivileged children's education in Hong Kong.",
    built: [
      'In a team of 7, competing with 80 other participants over a 4-day hackathon, I helped develop the donor platform in React, Next.js and Firebase.',
      'I built a CMS and integrated Mistral AI to automate PDF generation for the monthly newsletters.',
    ],
    tags: ['React', 'Next.js', 'Firebase', 'Mistral AI'],
    image: { src: '/images/project-reach.jpg', alt: "Home screen of the platform built for Project Reach" },
    links: [],
  },
  {
    slug: 'sigmapore',
    title: 'Sigmapore',
    event: 'NUS LifeHack',
    role: 'App Developer',
    dates: 'May 2025 – Jun 2025',
    featured: false,
    summary: 'A real-time mobile health monitoring system with geographic mapping and an AI chatbot.',
    problem: 'Enhance public health response and education.',
    built: [
      'I led a team of 4 to build a real-time mobile health monitoring system with geographic mapping.',
      'It includes an AI chatbot, built on Firebase.',
    ],
    outcome: "Reached the finals and won 'Most Impressive Usage of Data' out of 300 participants.",
    tags: ['Firebase', 'AI chatbots', 'Geographic mapping'],
    image: { src: '/images/sigmapore-app.jpg', alt: "Screens from the Sigmapore app" },
    links: [{ label: 'GitHub', url: 'https://github.com/clemenong1/Sigmapore' }],
  },
  {
    slug: 'ship-repair-classifier',
    title: 'Ship repair classifier',
    event: 'Maritime Hackathon',
    role: 'Machine Learning Engineer',
    dates: 'Jan 2025',
    featured: false,
    summary: 'A fine-tuned DistilBERT model that classifies ship repair needs.',
    problem: 'Classify ship repair needs from 10,000+ data entries.',
    built: [
      'I led a team of 4 and fine-tuned a transformer model (DistilBERT) for the classification.',
      'I built a Python algorithm that consolidates subject matter expert annotations through a structured consensus method.',
    ],
    outcome: 'The model reached over 90% accuracy.',
    tags: ['Python', 'DistilBERT', 'Transformer fine-tuning'],
    image: { src: '/images/maritime.jpg', alt: "Maritime Hackathon 2025 banner" },
    links: [{ label: 'GitHub', url: 'https://github.com/clemenong1/Maritime-Hackathon-2025' }],
  },
];

export const education: Education[] = [
  {
    school: 'National University of Singapore (NUS)',
    degree: 'Bachelor of Computing (Honours) in Computer Science, Second Minor in Data Science',
    dates: 'Aug 2024 – Present',
    note: 'Penultimate year',
  },
];

export const activities: Activity[] = [
  {
    role: 'Operations Executive',
    organisation: 'NUS Entrepreneurship Society',
    dates: 'Aug 2025 – Present',
    description: 'I organise and facilitate weekly classes on entrepreneurship for a class of 50 students.',
  },
];

/** Headings and labels for each section. */
export const sections = {
  desktop: {
    name: 'ClemenOS',
    idleLabel: 'Desktop',
    exitLabel: 'Back to space',
    dockLabel: 'Dock',
    iconsLabel: 'Desktop icons',
    openState: 'open',
  },
  about: {
    label: 'About me',
    currentlyLabel: 'Currently',
    copyLabel: 'Copy email',
    copiedLabel: 'Copied',
  },
  experience: {
    label: 'Experience',
    title: 'Experience',
    lead: "Where I've worked, newest first.",
    upcomingLabel: 'Upcoming',
    currentLabel: 'Present',
    educationTitle: 'Education',
    activitiesTitle: 'Activities',
  },
  projects: {
    label: 'Projects',
    title: 'Projects',
    lead: 'Hackathon builds and apps, newest first.',
    backLabel: 'All projects',
    problemTitle: 'The problem',
    builtTitle: 'What I built',
    stackTitle: 'Stack',
    outcomeTitle: 'Outcome',
    linksTitle: 'Links',
    placeholderLabel: 'Screenshot coming soon',
  },
  skills: {
    label: 'Skills',
    title: 'Skills',
    lead: 'The stack behind the work in Experience and Projects.',
  },
  browser: {
    label: 'Browser',
    backLabel: 'Back',
    forwardLabel: 'Forward',
    addressLabel: 'Address',
    tabsLabel: 'Tabs',
    closeTabLabel: 'Close tab',
    favouritesLabel: 'Favourites',
  },
  mail: {
    label: 'Mail',
    title: 'New message',
    toLabel: 'To',
    lead: "Send a note and it lands straight in my inbox. I'll reply to the email you leave.",
  },
  preview: {
    label: 'Preview',
    shortcutLabel: 'Resume.pdf',
    downloadLabel: 'Download',
    imageAlt: "Clemen Ong's resume",
  },
} as const;

/** Pages of the site inside the laptop's browser. */
export type PageId = 'about' | 'experience' | 'projects' | 'skills';
/** Apps in the dock. */
export type AppId = 'browser' | 'mail' | 'preview';

/** What the avatar says when the laptop opens and when each section is on screen. */
export const mascot: Record<PageId | 'welcome' | 'project' | 'mail' | 'preview', string> = {
  welcome: "Hey, I'm Clemen! Welcome to my laptop. Click around and I'll walk you through it.",
  about: "This one's all about me: who I am, what I'm studying and what I'm into.",
  experience: "Here's where I've worked so far, newest first.",
  projects: "These are the things I've built outside of work. Open one for the full story.",
  project: 'This is the full story: the problem, what I built and how it went.',
  skills: "This is the stack I've actually worked with, grouped by what it's for.",
  mail: 'Want to chat? Drop me a message here and it lands straight in my inbox.',
  preview: "Here's my resume on one page. Hit download if you'd like to keep a copy.",
};

/* ---------- Derived: skills ---------- */

export type SkillCategory = 'Languages' | 'Frameworks & platforms' | 'AI & ML' | 'Testing & automation';

/** Sorting only. A skill appears on the site only if an experience or project is tagged with it. */
const SKILL_CATEGORIES: Record<string, SkillCategory> = {
  Python: 'Languages',
  Java: 'Languages',
  JavaScript: 'Languages',
  TypeScript: 'Languages',
  HTML: 'Languages',
  CSS: 'Languages',
  YAML: 'Languages',
  Spring: 'Frameworks & platforms',
  React: 'Frameworks & platforms',
  'React Native': 'Frameworks & platforms',
  'Next.js': 'Frameworks & platforms',
  Firebase: 'Frameworks & platforms',
  'Google Cloud': 'Frameworks & platforms',
  Vite: 'Frameworks & platforms',
  PWA: 'Frameworks & platforms',
  Vercel: 'Frameworks & platforms',
  JSZip: 'Frameworks & platforms',
  Geolocation: 'Frameworks & platforms',
  'Geographic mapping': 'Frameworks & platforms',
  LLMs: 'AI & ML',
  'Prompt engineering': 'AI & ML',
  GraphRAG: 'AI & ML',
  MCP: 'AI & ML',
  'AI agents': 'AI & ML',
  'AI workflows': 'AI & ML',
  'AI chatbots': 'AI & ML',
  'Agentic workflows': 'AI & ML',
  'Mistral AI': 'AI & ML',
  DistilBERT: 'AI & ML',
  'Transformer fine-tuning': 'AI & ML',
  Playwright: 'Testing & automation',
  'Harness CI': 'Testing & automation',
  'GitHub Actions': 'Testing & automation',
};

const CATEGORY_ORDER: SkillCategory[] = ['Languages', 'Frameworks & platforms', 'AI & ML', 'Testing & automation'];

export interface Skill {
  name: string;
  category: SkillCategory;
  /** How many experiences and projects are tagged with it. */
  uses: number;
}

function collectSkills(): Skill[] {
  const byName = new Map<string, Skill>();
  [...experiences, ...projects].forEach((item) =>
    item.tags.forEach((tag) => {
      const skill = byName.get(tag) ?? { name: tag, category: SKILL_CATEGORIES[tag] ?? 'Frameworks & platforms', uses: 0 };
      skill.uses += 1;
      byName.set(tag, skill);
    }),
  );
  return [...byName.values()].sort((a, b) => b.uses - a.uses || a.name.localeCompare(b.name));
}

export const skills: Skill[] = collectSkills();

export const skillGroups: { category: SkillCategory; skills: Skill[] }[] = CATEGORY_ORDER.map((category) => ({
  category,
  skills: skills.filter((skill) => skill.category === category),
})).filter((group) => group.skills.length > 0);

export const featuredProjects = projects.filter((project) => project.featured);
export const otherProjects = projects.filter((project) => !project.featured);

export function findProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
