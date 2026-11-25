import { AnalyticsSummary, PresentationUsage } from "../types/dashboard";
import { MOCK_ANALYTICS, MOCK_USAGE_LOGS } from "./mockData";

export const analyticsService = {
  async getSummary(): Promise<AnalyticsSummary> {
    await new Promise((r) => setTimeout(r, 80));
    return { ...MOCK_ANALYTICS };
  },

  async getRecentActivity(): Promise<PresentationUsage[]> {
    await new Promise((r) => setTimeout(r, 60));
    return [...MOCK_USAGE_LOGS];
  },
};
