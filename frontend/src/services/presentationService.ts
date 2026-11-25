import { Presentation, PillarCategory } from "../types/dashboard";
import { MOCK_PRESENTATIONS } from "./mockData";

const presentationsState: Presentation[] = [...MOCK_PRESENTATIONS];

export const presentationService = {
  async getAllPresentations(): Promise<Presentation[]> {
    await new Promise((r) => setTimeout(r, 80));
    return [...presentationsState];
  },

  async getRecentPresentations(limit = 3): Promise<Presentation[]> {
    await new Promise((r) => setTimeout(r, 60));
    return presentationsState.slice(0, limit);
  },

  async getPresentationBySlug(slug: string): Promise<Presentation | null> {
    await new Promise((r) => setTimeout(r, 60));
    const found = presentationsState.find(
      (p) => p.slug === slug || slug.includes("lms") || p.id === slug
    );
    return found ? { ...found } : null;
  },

  async searchAndFilter(
    query: string,
    category?: PillarCategory | "All",
    sortBy: "recent" | "title" | "nodes" = "recent"
  ): Promise<Presentation[]> {
    await new Promise((r) => setTimeout(r, 60));
    let results = [...presentationsState];

    if (query.trim()) {
      const q = query.toLowerCase();
      results = results.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    if (category && category !== "All") {
      results = results.filter((p) => p.category === category);
    }

    if (sortBy === "title") {
      results.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "nodes") {
      results.sort((a, b) => b.interactiveNodesCount - a.interactiveNodesCount);
    }

    return results;
  },

  async recordPresentationLaunch(slug: string): Promise<void> {
    const idx = presentationsState.findIndex((p) => p.slug === slug);
    if (idx !== -1) {
      presentationsState[idx] = {
        ...presentationsState[idx],
        lastAccessed: "Just now",
      };
    }
  },
};
