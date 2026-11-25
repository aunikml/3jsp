import { User } from "../types/dashboard";
import { MOCK_USERS } from "./mockData";

let currentUser: User = { ...MOCK_USERS[0] };

export const authService = {
  async getCurrentUser(): Promise<User> {
    await new Promise((r) => setTimeout(r, 50));
    return { ...currentUser };
  },

  async updateProfile(updates: Partial<User>): Promise<User> {
    await new Promise((r) => setTimeout(r, 100));
    currentUser = { ...currentUser, ...updates };
    return { ...currentUser };
  },

  async logout(): Promise<void> {
    await new Promise((r) => setTimeout(r, 80));
    console.info("User session terminated.");
  },
};
