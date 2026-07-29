export const CONTACT = {
  email: "hello@pixelforge.studio",
  phone: "+49 30 9018 2046",
  phoneHref: "tel:+493090182046",
  addressLines: ["Torstraße 140", "10119 Berlin, Germany"],
  cityLine: "Based in Berlin — available worldwide",
  coords: "52.52°N / 13.40°E",
};

export const SOCIALS = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "YouTube", href: "https://youtube.com" },
];

export const NAV_LINKS = [
  { id: "work", label: "Work" },
  { id: "vfx", label: "VFX" },
  { id: "web", label: "Web & SEO" },
  { id: "design", label: "Design" },
  { id: "studio", label: "Studio" },
  { id: "contact", label: "Contact" },
];

export const SECTION_LABELS: Record<string, string> = {
  top: "Top",
  home: "Top",
  work: "Work",
  vfx: "VFX",
  web: "Web",
  design: "Design",
  services: "Services",
  studio: "Studio",
  team: "Team",
  results: "Proof",
  contact: "Contact",
};

export interface Project {
  id: string;
  index: string;
  name: string;
  client: string;
  year: string;
  tags: string[];
  desc: string;
  detail: string;
  outcome: string;
  image: string;
}

export const PROJECTS: Project[] = [
  {
    id: "afterglow",
    index: "01",
    name: "Afterglow",
    client: "Nova Films",
    year: "2025",
    tags: ["VFX", "Video Editing"],
    desc: "Invisible compositing and a full CG harbour extension for an indie sci-fi short — 47 shots, one impossible night.",
    detail:
      "Nova Films came to us with a two-minute short and an impossible shot list. We built the harbour entirely in CG, composited it against plates shot in a parking lot at 3 AM, and cut the trailer to a heartbeat-synced rhythm. Every frame was graded in-house.",
    outcome: "Official selection at 6 international festivals",
    image: "/images/work-afterglow.jpg",
  },
  {
    id: "bloom-vine",
    index: "02",
    name: "Bloom & Vine",
    client: "Meridian Commerce",
    year: "2025",
    tags: ["Website", "SEO", "Graphic Design"],
    desc: "A headless e-commerce rebuild with a technical SEO foundation — from art direction to Core Web Vitals.",
    detail:
      "We rebuilt the shop headless, art-directed the product photography system, and wired technical SEO into the template layer rather than bolting it on after. Organic became their #1 acquisition channel within two quarters.",
    outcome: "+212% organic revenue in 6 months",
    image: "/images/work-bloom.jpg",
  },
  {
    id: "signal-lost",
    index: "03",
    name: "Signal Lost",
    client: "Orbit Records",
    year: "2024",
    tags: ["VFX", "Graphic Design"],
    desc: "A particle-destruction title sequence and cover artwork system for a synthwave album rollout.",
    detail:
      "Orbit Records wanted the album to feel like a transmission breaking apart. We simulated chrome destruction for the release film, then reduced the same frames into a cover artwork system that worked from vinyl sleeves to playlist thumbnails.",
    outcome: "2.1M streams in the first week",
    image: "/images/work-signal.jpg",
  },
  {
    id: "atlas",
    index: "04",
    name: "Atlas Platform",
    client: "Atlas Ventures",
    year: "2024",
    tags: ["Website", "SEO"],
    desc: "A SaaS marketing site and documentation hub tuned to a 0.8s LCP — speed as a ranking weapon.",
    detail:
      "Atlas needed to outrank incumbents with ten times their backlink budget. We shipped a statically-rendered marketing site with an MDX docs hub, chased every millisecond, and built the content architecture around the keywords that actually convert.",
    outcome: "Top-3 rankings on 38 target keywords",
    image: "/images/work-atlas.jpg",
  },
  {
    id: "velocity",
    index: "05",
    name: "Velocity",
    client: "Hyperline Athletics",
    year: "2026",
    tags: ["VFX", "Website", "Graphic Design"],
    desc: "A launch campaign across film, site and brand — one idea, forged end-to-end in six weeks.",
    detail:
      "Hyperline gave us one brief: make running look like flight. We shot and graded the campaign film with long-exposure light trails, built the drop-day landing experience around it, and designed the social kit that carried it across every platform.",
    outcome: "4.2M views across paid & organic social",
    image: "/images/work-velocity.jpg",
  },
];

export interface ServiceColumn {
  id: string;
  index: string;
  title: string;
  icon: "vfx" | "web" | "growth";
  items: string[];
  footnote: string;
}

export const SERVICES: ServiceColumn[] = [
  {
    id: "vfx",
    index: "01",
    title: "VFX & Motion",
    icon: "vfx",
    items: [
      "Video editing",
      "Visual effects & compositing",
      "Motion graphics",
      "Color grading",
      "Short-form content for social",
    ],
    footnote: "Frame by frame, on deadline.",
  },
  {
    id: "web",
    index: "02",
    title: "Web",
    icon: "web",
    items: [
      "Website design & development",
      "E-commerce",
      "Landing pages",
      "App / web platforms",
      "Performance optimization",
    ],
    footnote: "Fast enough to rank.",
  },
  {
    id: "design",
    index: "03",
    title: "Growth & Design",
    icon: "growth",
    items: [
      "SEO & SEM",
      "Graphic design & branding",
      "Social media content",
      "Digital advertising",
      "Content strategy",
    ],
    footnote: "Visibility, engineered.",
  },
];

export const PROCESS = [
  { step: "01", name: "Discover", line: "Goals, audience, audit — before a single pixel moves." },
  { step: "02", name: "Design", line: "Direction, moodframes and prototypes you can react to." },
  { step: "03", name: "Forge", line: "Production sprints: shots, code and assets in parallel." },
  { step: "04", name: "Launch", line: "Ship, measure, iterate. Rankings and views are the receipt." },
];

export const STATS = [
  { value: 140, suffix: "+", decimals: 0, label: "Projects shipped since 2019" },
  { value: 4.2, suffix: "M", decimals: 1, label: "Views generated for client campaigns" },
  { value: 312, prefix: "+", suffix: "%", decimals: 0, label: "Average organic traffic lift" },
  { value: 98, suffix: "%", decimals: 0, label: "Client retention rate" },
];

export const CLIENTS: { name: string; style: "display" | "serif" | "wide" }[] = [
  { name: "Nova Films", style: "display" },
  { name: "Bloom & Vine", style: "serif" },
  { name: "Orbit Records", style: "wide" },
  { name: "Atlas Ventures", style: "display" },
  { name: "Hyperline", style: "serif" },
  { name: "Kessler Motorworks", style: "wide" },
  { name: "Monolith Games", style: "display" },
  { name: "Ferra Hotels", style: "serif" },
];

export const TESTIMONIALS = [
  {
    quote:
      "PixelForge took our launch film from rough cut to 1.4M organic views. The grade alone was worth the invoice.",
    name: "Lena Hartwig",
    role: "Marketing Lead — Nova Films",
  },
  {
    quote:
      "They rebuilt our shop end-to-end and organic revenue tripled in two quarters. One studio, zero hand-offs.",
    name: "David Okafor",
    role: "Founder — Bloom & Vine",
  },
  {
    quote:
      "The film, the site, the campaign — all one idea, all one team. It's the first launch we've ever had with no seams.",
    name: "Sofia Reyes",
    role: "CMO — Hyperline Athletics",
  },
  {
    quote:
      "Our platform finally feels as fast as it is. And it ranks for the terms that matter. Rare combination.",
    name: "Marc Delacroix",
    role: "CEO — Atlas Ventures",
  },
];

export const TEAM = [
  { initials: "ML", name: "Mara Lindqvist", role: "VFX Supervisor", focus: "Compositing · Grade" },
  { initials: "JB", name: "Jonas Beck", role: "Creative Director", focus: "Campaigns · Brand" },
  { initials: "AD", name: "Aylin Demir", role: "Head of Web", focus: "Performance · Platforms" },
  { initials: "TM", name: "Theo Marchetti", role: "SEO Lead", focus: "Technical · Content" },
];

export const LEGAL: Record<"privacy" | "cookies", { title: string; body: string[] }> = {
  privacy: {
    title: "Privacy Policy",
    body: [
      "PixelForge collects only the data needed to answer your enquiries — your name, email and anything you choose to send us via the contact channels on this site. We do not sell, rent or trade personal data, ever.",
      "Data is stored within the EU and deleted on request. To access, correct or erase your data, write to hello@pixelforge.studio and we will respond within 14 days.",
    ],
  },
  cookies: {
    title: "Cookie Policy",
    body: [
      "This site uses a minimal set of strictly necessary cookies to remember preferences such as reduced-motion settings. We do not run third-party advertising trackers on pixelforge.studio.",
      "Analytics, where used, are cookieless and aggregated. You can clear or block cookies in your browser at any time without losing access to any part of this site.",
    ],
  },
};

export const SHOWREEL_VIDEO =
  "https://videos.pexels.com/video-files/29717425/12777809_3840_2160_30fps.mp4";
