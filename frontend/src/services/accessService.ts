import { PresentationAccessRecord, User } from "../types/dashboard";
import { MOCK_ACCESS_RECORDS, MOCK_USERS, MOCK_PRESENTATIONS } from "./mockData";

let accessRecordsState: PresentationAccessRecord[] = [...MOCK_ACCESS_RECORDS];

export const accessService = {
  async getAccessRecords(): Promise<PresentationAccessRecord[]> {
    await new Promise((r) => setTimeout(r, 80));
    return [...accessRecordsState];
  },

  async getUsers(): Promise<User[]> {
    await new Promise((r) => setTimeout(r, 50));
    return [...MOCK_USERS];
  },

  async grantAccess(params: {
    userId: string;
    presentationSlug: string;
    role: "viewer" | "presenter" | "admin";
    expirationDate: string | null;
  }): Promise<PresentationAccessRecord> {
    await new Promise((r) => setTimeout(r, 100));
    const user = MOCK_USERS.find((u) => u.id === params.userId) || MOCK_USERS[0];
    const presentation =
      MOCK_PRESENTATIONS.find((p) => p.slug === params.presentationSlug) || MOCK_PRESENTATIONS[0];

    const newRecord: PresentationAccessRecord = {
      id: `acc-${Date.now()}`,
      userId: user.id,
      user,
      presentationId: presentation.id,
      presentationSlug: presentation.slug,
      presentationTitle: presentation.title,
      accessRole: params.role,
      isActive: true,
      expirationDate: params.expirationDate,
      grantedAt: new Date().toISOString().split("T")[0],
    };

    accessRecordsState = [newRecord, ...accessRecordsState];
    return newRecord;
  },

  async revokeAccess(recordId: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 80));
    accessRecordsState = accessRecordsState.filter((rec) => rec.id !== recordId);
    return true;
  },

  async toggleAccessStatus(recordId: string): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 60));
    const idx = accessRecordsState.findIndex((r) => r.id === recordId);
    if (idx !== -1) {
      accessRecordsState[idx] = {
        ...accessRecordsState[idx],
        isActive: !accessRecordsState[idx].isActive,
      };
      return true;
    }
    return false;
  },

  async updateRole(
    recordId: string,
    newRole: "viewer" | "presenter" | "admin"
  ): Promise<boolean> {
    await new Promise((r) => setTimeout(r, 60));
    const idx = accessRecordsState.findIndex((r) => r.id === recordId);
    if (idx !== -1) {
      accessRecordsState[idx] = {
        ...accessRecordsState[idx],
        accessRole: newRole,
      };
      return true;
    }
    return false;
  },
};
