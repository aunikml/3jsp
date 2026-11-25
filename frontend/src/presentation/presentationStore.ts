import { create } from "zustand";
import { PresentationState, PresentationMode } from "./types";

const INITIAL_NODE_ID = "intro";

export const usePresentationStore = create<PresentationState>((set, get) => ({
  presentationId: "interactive-3d-presentation",
  presentationTitle: "Interactive 3D Presentation",
  currentNodeId: INITIAL_NODE_ID,
  history: [INITIAL_NODE_ID],
  mode: "preview",
  isLoading: false,
  error: null,

  setPresentationId: (id: string, title = "") =>
    set({
      presentationId: id,
      presentationTitle: title || id,
      currentNodeId: INITIAL_NODE_ID,
      history: [INITIAL_NODE_ID],
      error: null,
    }),

  navigateToNode: (nodeId: string) => {
    const { currentNodeId, history } = get();
    if (currentNodeId === nodeId) return;

    set({
      currentNodeId: nodeId,
      history: [...history, nodeId],
      error: null,
    });
  },

  goBack: () => {
    const { history } = get();
    if (history.length <= 1) return;

    const newHistory = history.slice(0, -1);
    const prevNode = newHistory[newHistory.length - 1];
    set({
      currentNodeId: prevNode,
      history: newHistory,
      error: null,
    });
  },

  resetPresentation: () =>
    set({
      currentNodeId: INITIAL_NODE_ID,
      history: [INITIAL_NODE_ID],
      error: null,
    }),

  setPresentationMode: (mode: PresentationMode) => set({ mode }),

  setLoading: (isLoading: boolean) => set({ isLoading }),

  setError: (error: string | null) => set({ error }),
}));
