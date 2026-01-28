// /data/forumData.ts
export const dummyPosts = [
  {
    id: 1,
    author: "Kai Lee",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    title: "How to convince customers to drop bad UX decisions?",
    body: "Working with a client who keeps insisting on patterns that harm usability. How do you guide them diplomatically?",
    tags: ["Soft Skills", "Communication", "Customer"],
    views: 5,
    comments: 1,
    likes: 2,
    created_at: "2025-12-12T09:42:00Z",
    updated_at: "2025-12-12T09:45:00Z"
  },
  {
    id: 2,
    author: "Noah Peterson",
    avatar: "https://randomuser.me/api/portraits/men/44.jpg",
    title: "Need feedback: Dashboard feels too messy",
    body: "My dashboard design feels overloaded. Looking for guidance on better hierarchy and content grouping.",
    tags: ["Dashboard", "Cognitive Load", "Need Advice"],
    views: 26,
    comments: 3,
    likes: 5,
    created_at: "2025-12-12T09:30:00Z",
    updated_at: "2025-12-12T09:50:00Z"
  },
  {
    id: 3,
    author: "Emma Reed",
    avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    title: "Rename or delete theme colors in Slides Deck",
    body: "Struggling with theme colors. Is there a workaround to rename or reset theme presets in Slides?",
    tags: ["Figma", "Theme Colors", "Slide Deck"],
    views: 21,
    comments: 2,
    likes: 7,
    created_at: "2025-12-12T08:12:00Z",
    updated_at: "2025-12-12T09:10:00Z"
  },

  // -------- 9 More Dummy Posts ----------
  {
    id: 4,
    author: "Mira Collins",
    avatar: "https://randomuser.me/api/portraits/women/12.jpg",
    title: "How to approach color contrast in dark mode?",
    body: "My dark mode palette sometimes fails WCAG contrast guidelines. Looking for techniques to fix this.",
    tags: ["Color", "Accessibility", "UI Design"],
    views: 48,
    comments: 6,
    likes: 12,
    created_at: "2025-12-10T10:00:00Z",
    updated_at: "2025-12-12T09:20:00Z"
  },
  {
    id: 5,
    author: "James Ortega",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    title: "Best way to present product features?",
    body: "Should I use cards or a long-form layout for showcasing features? Which converts better?",
    tags: ["Product Design", "Marketing", "UI Design"],
    views: 77,
    comments: 12,
    likes: 30,
    created_at: "2025-12-08T12:00:00Z",
    updated_at: "2025-12-11T15:00:00Z"
  },
  {
    id: 6,
    author: "Aarav Mehta",
    avatar: "https://randomuser.me/api/portraits/men/78.jpg",
    title: "Are neumorphic designs still relevant?",
    body: "Clients keep asking about neumorphism. Are we still using it, or is it outdated?",
    tags: ["Trends", "UI Design", "Visual Design"],
    views: 40,
    comments: 5,
    likes: 9,
    created_at: "2025-12-09T14:32:00Z",
    updated_at: "2025-12-10T16:00:00Z"
  },
  {
    id: 7,
    author: "Helena Cooper",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    title: "Should headings be sentence case or title case?",
    body: "Style guides vary. Curious which one works best for readability and branding.",
    tags: ["Typography", "Copywriting"],
    views: 12,
    comments: 1,
    likes: 3,
    created_at: "2025-12-11T10:00:00Z",
    updated_at: "2025-12-12T08:00:00Z"
  },
  {
    id: 8,
    author: "Leo Jensen",
    avatar: "https://randomuser.me/api/portraits/men/23.jpg",
    title: "Card grids vs masonry layouts?",
    body: "Which one works better for content-heavy dashboards? Need opinions.",
    tags: ["Layout", "Grid Systems", "Dashboard"],
    views: 90,
    comments: 14,
    likes: 22,
    created_at: "2025-12-06T09:00:00Z",
    updated_at: "2025-12-12T09:00:00Z"
  },
  {
    id: 9,
    author: "Aisha Khan",
    avatar: "https://randomuser.me/api/portraits/women/88.jpg",
    title: "How many fonts are too many?",
    body: "Is using 3 fonts acceptable, or should I stick to 2? What’s modern practice?",
    tags: ["Typography", "Branding"],
    views: 110,
    comments: 22,
    likes: 55,
    created_at: "2025-12-05T13:00:00Z",
    updated_at: "2025-12-10T09:00:00Z"
  },
  {
    id: 10,
    author: "Oliver Mills",
    avatar: "https://randomuser.me/api/portraits/men/11.jpg",
    title: "Low contrast mode for accessibility?",
    body: "Accessibility suggests avoiding extremely high contrast for certain users. Any tips?",
    tags: ["Accessibility", "Color"],
    views: 34,
    comments: 3,
    likes: 9,
    created_at: "2025-12-09T07:45:00Z",
    updated_at: "2025-12-11T08:00:00Z"
  },
  {
    id: 11,
    author: "Sophia Turner",
    avatar: "https://randomuser.me/api/portraits/women/92.jpg",
    title: "Center alignment vs left alignment?",
    body: "When designing mobile apps, which alignment should headings use?",
    tags: ["UX Design", "Mobile Design"],
    views: 65,
    comments: 8,
    likes: 18,
    created_at: "2025-12-07T15:00:00Z",
    updated_at: "2025-12-12T06:00:00Z"
  },
  {
    id: 12,
    author: "Elijah Brooks",
    avatar: "https://randomuser.me/api/portraits/men/95.jpg",
    title: "Do animations slow users down?",
    body: "Subtle animations improve delight, but do they reduce task speed?",
    tags: ["Animation", "Microinteractions"],
    views: 150,
    comments: 30,
    likes: 60,
    created_at: "2025-12-04T10:00:00Z",
    updated_at: "2025-12-08T12:00:00Z"
  }
];

// Build tags automatically
export const dummyTags = (() => {
  const tagSet = new Map();
  dummyPosts.forEach(p =>
    p.tags.forEach(tag => {
      tagSet.set(tag, (tagSet.get(tag) || 0) + 1);
    })
  );
  return [...tagSet].map(([name, count], i) => ({
    id: i + 1,
    name,
    count
  }));
})();
