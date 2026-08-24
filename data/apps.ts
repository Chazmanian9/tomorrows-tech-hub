export type HubApp = {
  name: string;
  description: string;
  href: string;
};

// The hub for Tomorrow's Tech. To add a new app: add an object here.
// Cards render in this order on the landing page automatically.
export const apps: HubApp[] = [
  {
    name: "AI Beginner Guide",
    description: "A plain-language walkthrough for getting started with AI tools.",
    // TODO: replace with the real URL.
    href: "https://example.com/ai-beginner-guide",
  },
  {
    name: "Resume Builder",
    description: "Build and polish a resume with AI-assisted suggestions.",
    // TODO: replace with the real URL.
    href: "https://example.com/resume-builder",
  },
];
