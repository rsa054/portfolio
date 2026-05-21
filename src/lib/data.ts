import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  ShieldCheck,
  Network,
  Cpu,
  Layers,
  Gamepad2,
  GitBranch,
  Sparkles,
  Workflow,
  Wand2,
  Bot,
  Truck,
  GraduationCap,
  Server,
} from "lucide-react";

export const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#expertise", label: "Expertise" },
  { href: "#community", label: "Community" },
  { href: "#contact", label: "Contact" },
] as const;

export const SOCIALS = {
  github: "https://github.com/rsa054",
  linkedin: "https://www.linkedin.com/in/amit-k-6861261b1/",
  x: "https://x.com/rsa2054",
  medium: "https://medium.com/@rsa054",
  email: "mailto:thisismrkhatri@gmail.com",
};

export const HERO_TITLES = [
  "Software Engineer",
  "Backend Engineer",
  "Smart Contract Engineer",
  "Distributed Systems Engineer",
  "AI Systems Engineer",
];

export const STATS = [
  { value: "7+", label: "Years engineering" },
  { value: "4+", label: "Years in blockchain" },
  { value: "20+", label: "Production systems shipped" },
  { value: "99.9%", label: "Production uptime" },
  { value: "Multi", label: "Stack & chain expertise" },
  { value: "10M+", label: "Requests served daily" },
];

export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  stack: string[];
  active?: boolean;
};

export const EXPERIENCE: Experience[] = [
  {
    company: "Venture23.io",
    role: "Blockchain Developer",
    period: "Feb 2022 – Present",
    location: "Remote · Web3",
    summary:
      "Lead engineer designing and shipping DeFi infrastructure, cross-chain systems and AI-integrated on-chain gaming protocols across EVM chains and Sui.",
    highlights: [
      "Architected UUPS upgradeable smart contracts with role-based access and timelocked governance.",
      "Shipped cross-chain swap infrastructure and AI-powered on-chain gaming agents across EVM and Sui.",
      "Led gas optimization, post-audit security remediations and Gnosis Safe + AWS KMS deployment workflows.",
    ],
    stack: ["Solidity", "Sui Move", "TypeScript", "Foundry", "Viem", "AWS KMS", "Across"],
    active: true,
  },
  {
    company: "Eatziffy",
    role: "Python / Django Tech Lead",
    period: "2020 – 2022",
    summary:
      "Led the platform team building real-time food delivery infrastructure that powered routing, dispatch and order orchestration at city-scale.",
    highlights: [
      "Architected the DRF service layer for orders, dispatch and merchant APIs at city scale.",
      "Optimized Redis-backed real-time channels and owned the in-flight dispatch state machine.",
    ],
    stack: ["Python", "Django", "DRF", "Redis", "PostgreSQL", "Celery"],
  },
  {
    company: "Uptechsys",
    role: "Python / Django Developer",
    period: "2018 – 2020",
    summary:
      "Built scalable financial and operational backend systems using DDD and clean architecture patterns.",
    highlights: [
      "Modeled financial domains with DDD aggregates, value objects and explicit invariants.",
      "Designed read-optimized APIs and zero-downtime migration playbooks.",
    ],
    stack: ["Python", "Django", "PostgreSQL", "DDD"],
  },
];

export type SkillGroup = {
  name: string;
  icon: LucideIcon;
  accent: "cyan" | "purple" | "blue";
  items: string[];
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    name: "Blockchain",
    icon: Boxes,
    accent: "cyan",
    items: ["Solidity", "Sui Move", "Rust", "Vyper", "Anchor"],
  },
  {
    name: "Smart Contract Security",
    icon: ShieldCheck,
    accent: "purple",
    items: ["Foundry", "Echidna", "Slither", "Certora", "Move Prover"],
  },
  {
    name: "Web3 Infrastructure",
    icon: Network,
    accent: "blue",
    items: ["Hardhat", "The Graph", "OpenZeppelin", "Tenderly", "ERC-4337", "ERC-4626"],
  },
  {
    name: "AI Agentic Stack",
    icon: Bot,
    accent: "cyan",
    items: [
      "LLM Orchestration",
      "LangChain",
      "Tool Routing",
      "MCP",
      "Anthropic SDK",
      "RAG",
      "pgvector",
      "Agent Memory",
    ],
  },
  {
    name: "Backend",
    icon: Cpu,
    accent: "blue",
    items: ["Node.js", "TypeScript", "Django", "PostgreSQL", "Redis"],
  },
  {
    name: "Frontend",
    icon: Layers,
    accent: "purple",
    items: ["React", "Next.js", "Viem", "Ethers.js"],
  },
];

export type Project = {
  slug: string;
  title: string;
  role?: string;
  category: string;
  description: string;
  details: string[];
  stack: string[];
  links?: { label: string; href: string }[];
  accent: "cyan" | "purple" | "blue";
  icon: LucideIcon;
};

export const PROJECTS: Project[] = [
  {
    slug: "makara",
    title: "Makara",
    category: "On-Chain Gaming Framework",
    description:
      "Open-source Entity-Component-System framework for fully on-chain games on Sui; composable Move modules for combat, inventory and world simulation.",
    details: [
      "Designed Move-native ECS primitives with type-safe component registration and storage layout.",
      "Composable combat, inventory and movement modules drive end-to-end game logic on-chain.",
      "TypeScript SDK and PTB orchestration deliver gas-efficient, batched player actions.",
    ],
    stack: ["Sui Move", "TypeScript", "React", "PTBs"],
    accent: "cyan",
    icon: Gamepad2,
  },
  {
    slug: "vendetta",
    title: "Vendetta",
    role: "Lead Smart Contract Engineer",
    category: "On-Chain Game · Sui",
    description:
      "Secure modular on-chain game contracts on Sui with deterministic match settlement, encrypted moves and verifiable randomness.",
    details: [
      "Engineered the Move module hierarchy: matches, treasury, anti-cheat invariants and signed result attestations.",
      "Implemented commit-reveal and verifiable randomness flows tightly coupled to player escrow.",
      "Hardened the contract surface against re-entry, replay and front-running through formal review.",
    ],
    stack: ["Sui Move", "TypeScript", "Move Prover"],
    accent: "purple",
    icon: ShieldCheck,
  },
  {
    slug: "cross-chain-swap",
    title: "Cross-Chain Integration Platform",
    category: "DeFi Infrastructure",
    description:
      "Production-grade cross-chain swap infrastructure with robust input validation, multi-source signature verification and graceful settlement recovery.",
    details: [
      "Built atop Across Protocol with custom router, slippage and quote-validation logic.",
      "Multi-source signature aggregation with strict replay protection and EIP-712 typed data.",
      "End-to-end observability: quote, fill, settlement and rebalance events stitched together.",
    ],
    stack: ["Solidity", "Across", "Viem", "TypeScript"],
    accent: "blue",
    icon: Network,
  },
  {
    slug: "ai-game-agent",
    title: "AI-Powered Game Agent Platform",
    category: "AI × Blockchain",
    description:
      "Autonomous AI agents that generate, simulate and deploy on-chain Sui games from natural language prompts; context-aware tool routing across the dev pipeline.",
    details: [
      "LLM orchestration with tool routing for code generation, Move module synthesis and deployment.",
      "Context-aware agent memory binds prompts to project state, contracts and previous deployments.",
      "Autonomous deploy pipelines spin up testnet packages, run sims and publish to mainnet under guardrails.",
    ],
    stack: ["LLM Agents", "Sui Move", "TypeScript", "Tool Routing"],
    accent: "purple",
    icon: Sparkles,
  },
  {
    slug: "eatziffy",
    title: "Eatziffy",
    role: "Tech Lead",
    category: "Real-time Food Delivery",
    description:
      "City-scale food delivery backend powering live order routing, dispatch and courier ETA streams across multiple regions.",
    details: [
      "Architected the DRF service layer for orders, dispatch and merchant APIs under strict throughput SLOs.",
      "Optimized Redis-backed real-time channels for live order, courier and ETA streams.",
      "Owned the dispatch state machine and recovery semantics for in-flight orders during partial outages.",
    ],
    stack: ["Python", "Django", "DRF", "Redis", "PostgreSQL", "Celery"],
    accent: "cyan",
    icon: Truck,
  },
  {
    slug: "hamroacademy",
    title: "Hamro Academy",
    category: "Ed-Tech Platform",
    description:
      "Online learning platform delivering structured courses, live cohorts and assessments to students at scale.",
    details: [
      "Designed the course, cohort and enrollment domain with clean architecture and explicit invariants.",
      "Built secure payments, progress tracking and certificate issuance flows on top of a Django/DRF stack.",
      "Tuned read-heavy endpoints with caching and query optimization to keep the experience snappy under load.",
    ],
    stack: ["Python", "Django", "DRF", "PostgreSQL", "Redis"],
    accent: "blue",
    icon: GraduationCap,
  },
];

export type ExpertiseArea = {
  title: string;
  description: string;
  icon: LucideIcon;
  accent: "cyan" | "purple" | "blue";
  bullets: string[];
};

export const EXPERTISE: ExpertiseArea[] = [
  {
    title: "Upgradeable Smart Contracts",
    description:
      "UUPS proxy patterns, storage layout hygiene and timelocked governance for long-lived protocols.",
    icon: Layers,
    accent: "cyan",
    bullets: ["UUPS / Transparent proxies", "Storage gap discipline", "Migration playbooks"],
  },
  {
    title: "Cross-chain Systems",
    description:
      "Bridges, intent settlement and message-passing built around real adversarial models, not happy paths.",
    icon: Network,
    accent: "blue",
    bullets: ["Intent settlement", "Multi-source signatures", "Replay & finality safety"],
  },
  {
    title: "DeFi Engineering",
    description:
      "AMMs, vaults, lending and yield primitives, engineered for capital efficiency and exit liquidity.",
    icon: Workflow,
    accent: "purple",
    bullets: ["ERC-4626 vaults", "Oracle hardening", "Fee & accounting invariants"],
  },
  {
    title: "AI + Blockchain Integration",
    description:
      "LLM-orchestrated agents with on-chain tool routing, deterministic guardrails and verifiable execution.",
    icon: Wand2,
    accent: "cyan",
    bullets: ["Agent tooling", "Prompt → contract", "On-chain verification"],
  },
  {
    title: "Smart Contract Security",
    description:
      "Threat modeling, invariant testing and remediation: Foundry, Echidna, Slither and Move Prover in production loops.",
    icon: ShieldCheck,
    accent: "purple",
    bullets: ["Invariant fuzzing", "Static analysis", "Post-audit remediation"],
  },
  {
    title: "Protocol Architecture",
    description:
      "Modular protocols with explicit boundaries; system maps, state machines and migration semantics designed up-front.",
    icon: GitBranch,
    accent: "blue",
    bullets: ["Module boundaries", "Event-first design", "Backwards-compatible evolution"],
  },
  {
    title: "On-chain Gaming",
    description:
      "ECS frameworks, deterministic simulation and commit-reveal mechanics built for fully on-chain game economies.",
    icon: Gamepad2,
    accent: "cyan",
    bullets: ["ECS in Move", "Commit-reveal", "Verifiable randomness"],
  },
  {
    title: "Backend Architecture",
    description:
      "Production-grade backend systems across DRF (Django REST Framework), .NET web apps and Rust services, designed with clean architecture and explicit boundaries.",
    icon: Server,
    accent: "blue",
    bullets: ["DRF / Django", ".NET web apps", "Rust services"],
  },
];
