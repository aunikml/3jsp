export type PresentationType =
  | "2D Presentation"
  | "3D Simulation"
  | "Hybrid 2D/3D Presentation"
  | "Interactive Concept Map"
  | "Visual Narrative"
  | "Classroom Model"
  | "Assessment Lab";

export type PillarCategory =
  | "Teaching & Learning"
  | "Early Childhood & Play"
  | "Mental Health"
  | "Care & Compassion"
  | "Climate Change";

export interface Presentation {
  id: string;
  slug: string;
  title: string;
  description: string;
  type: PresentationType;
  category: PillarCategory;
  categoryColor: string;
  gradient: [string, string];
  lastAccessed: string;
  createdAt: string;
  updatedAt: string;
  status: "active" | "draft" | "archived";
  slidesCount: number;
  interactiveNodesCount: number;
  accessLevel: "public" | "restricted" | "private";
  tags: string[];
  keyObjectives: string[];
}

export interface User {
  id: string;
  username: string;
  name: string;
  email: string;
  role: "admin" | "presenter" | "viewer";
  department: string;
  avatarInitials: string;
}

export interface PresentationAccessRecord {
  id: string;
  userId: string;
  user: User;
  presentationId: string;
  presentationSlug: string;
  presentationTitle: string;
  accessRole: "viewer" | "presenter" | "admin";
  isActive: boolean;
  expirationDate: string | null;
  grantedAt: string;
}

export interface PresentationUsage {
  id: string;
  presentationTitle: string;
  presentationSlug: string;
  userName: string;
  timestamp: string;
  durationMinutes: number;
  action: string;
}

export interface AnalyticsSummary {
  totalLaunches: number;
  activePresentations: number;
  activePermissions: number;
  weeklyTrends: { day: string; launches: number }[];
  topPresentations: {
    title: string;
    slug: string;
    launches: number;
    category: PillarCategory;
    color: string;
  }[];
  recentActivity: PresentationUsage[];
}
