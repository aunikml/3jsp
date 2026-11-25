import { create } from "zustand";

interface ThemeState {
  mode: "dark" | "light";
  toggleTheme: () => void;
  setTheme: (mode: "dark" | "light") => void;
}

const getInitialMode = (): "dark" | "light" => {
  const saved = localStorage.getItem("presentation_studio_theme");
  if (saved === "light" || saved === "dark") return saved;
  return "dark"; // Default to dark creative workspace
};

export const useThemeStore = create<ThemeState>((set) => ({
  mode: getInitialMode(),
  toggleTheme: () =>
    set((state) => {
      const nextMode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem("presentation_studio_theme", nextMode);
      return { mode: nextMode };
    }),
  setTheme: (mode) => {
    localStorage.setItem("presentation_studio_theme", mode);
    set({ mode });
  },
}));
