export type PresentationMode = "presenter" | "audience" | "preview";

export interface PresentationNode {
  id: string;
  title: string;
  sequenceRange?: [number, number];
  description?: string;
  cameraTarget?: [number, number, number];
  cameraPosition?: [number, number, number];
}

export interface PresentationMetadata {
  id?: number;
  title: string;
  slug: string;
  description: string;
  is_active: boolean;
  user_role?: string;
  created_at?: string;
  updated_at?: string;
}

export interface PresentationState {
  presentationId: string | null;
  presentationTitle: string;
  currentNodeId: string;
  history: string[];
  mode: PresentationMode;
  isLoading: boolean;
  error: string | null;

  // Actions
  setPresentationId: (id: string, title?: string) => void;
  navigateToNode: (nodeId: string) => void;
  goBack: () => void;
  resetPresentation: () => void;
  setPresentationMode: (mode: PresentationMode) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}
