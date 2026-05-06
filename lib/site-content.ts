export const site = {
  name: "YOUSSEF ElSHOHARY",
  title: "Mobile & Full-Stack Engineer | Tech Lead",
  description:
    "I build high-quality mobile applications, scalable backend systems, and AI-powered solutions, with experience deploying on AWS.",
  about:
    "I enjoy turning complex product ideas into clear, reliable software. My focus is building mobile-first experiences, scaling backend systems, and helping teams ship with confidence.",
  contact: {
    email: "youssefmohamed0321@gmail.com",
    emailHref: "mailto:youssefmohamed0321@gmail.com",
    github: "https://github.com/youssefmohamed",
    linkedin: "https://www.linkedin.com/in/joe032/",
  },
} as const;

export type Project = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  tags: readonly string[];
};

export const projects: readonly Project[] = [
  {
    title: "App 1",
    description:
      "Cross-platform mobile experience with offline-first sync, polished UI, and production monitoring on AWS.",
    image: "/projects/app-1.svg",
    imageAlt: "App 1 product preview",
    tags: ["Flutter", "Node.js", "AWS"],
  },
  {
    title: "App 2",
    description:
      "Consumer-facing app with real-time features, secure APIs, and CloudFront-backed media delivery.",
    image: "/projects/app-2.svg",
    imageAlt: "App 2 product preview",
    tags: ["Flutter", "AWS", "RDS"],
  },
  {
    title: "App 3",
    description:
      "Performance-focused client with deep integrations, IAM-hardened services, and scalable Node backends.",
    image: "/projects/app-3.svg",
    imageAlt: "App 3 product preview",
    tags: ["Flutter", "Node.js", "CloudFront"],
  },
] as const;

export const leadership = [
  {
    title: "Tech Lead — Web application",
    points: [
      "Owned technical direction, delivery cadence, and code quality for a multi-team web platform.",
      "Partnered with product and stakeholders to scope releases, mitigate risk, and ship reliably.",
    ],
  },
  {
    title: "Led AI / Computer Vision team",
    points: [
      "Directed detection, tracking, and re-identification initiatives from research to deployment.",
      "Aligned model lifecycle, evaluation metrics, and cloud infrastructure with product goals.",
    ],
  },
] as const;

export const skillGroups = [
  {
    label: "Mobile Development",
    items: ["Flutter", "React"],
  },
  {
    label: "Full-Stack Development",
    items: ["Node.js", "Python"],
  },
  {
    label: "AI & Computer Vision",
    items: ["YOLO", "SSD", "Faster R-CNN", "Tracking", "Person Re-ID"],
  },
  {
    label: "Cloud & Deployment",
    items: [
      "AWS (EC2, S3, RDS, CloudFront, IAM)",
      "Docker",
      "Linux (Ubuntu)",
    ],
  },
] as const;
