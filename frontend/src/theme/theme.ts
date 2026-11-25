import { createTheme, ThemeOptions } from "@mui/material/styles";

/**
 * BRAC IED Brand Guidelines Palette
 */
export const brandColors = {
  // Primary Colours
  pantoneOrange: "#FF5100", // Primary action, active nav, highlights
  pantoneCoolGray7: "#ADAFB2", // Muted text, subtle borders, dividers
  pantone432: "#455560", // Dark navigation surfaces, headings

  // Secondary Colours (Program / Pillar Categorization)
  teachingLearning: "#6D68AF", // Purple
  earlyChildhood: "#FDB913", // Yellow
  mentalHealth: "#8DC63F", // Green
  careCompassion: "#CA489A", // Pink
  climateChange: "#44C8F5", // Blue

  // Neutrals
  darkBg: "#121619", // Dark creative workspace background
  darkPaper: "#1A2024", // Sidebar & panel surface
  darkCard: "#222B30", // Elevated cards
  darkBorder: "rgba(173, 175, 178, 0.16)",

  lightBg: "#F8F8F8", // Light page background
  lightPaper: "#FFFFFF",
  lightBorder: "#E8E8E8",
  lightMutedText: "#777777",
};

export const getTheme = (mode: "dark" | "light" = "dark") => {
  const isDark = mode === "dark";

  const themeOptions: ThemeOptions = {
    palette: {
      mode,
      primary: {
        main: brandColors.pantoneOrange,
        light: "#FF7433",
        dark: "#D64400",
        contrastText: "#FFFFFF",
      },
      secondary: {
        main: brandColors.pantone432,
        light: brandColors.pantoneCoolGray7,
        dark: "#2A353C",
        contrastText: "#FFFFFF",
      },
      background: {
        default: isDark ? brandColors.darkBg : brandColors.lightBg,
        paper: isDark ? brandColors.darkPaper : brandColors.lightPaper,
      },
      text: {
        primary: isDark ? "#F4F5F7" : brandColors.pantone432,
        secondary: isDark ? brandColors.pantoneCoolGray7 : "#64748B",
      },
      divider: isDark ? brandColors.darkBorder : brandColors.lightBorder,
    },
    typography: {
      fontFamily: [
        "Quicksand",
        "Kohinoor Bangla",
        "Sutonny MJ",
        "Inter",
        "-apple-system",
        "sans-serif",
      ].join(","),
      h1: { fontWeight: 700, letterSpacing: "-0.02em" },
      h2: { fontWeight: 700, letterSpacing: "-0.02em" },
      h3: { fontWeight: 700, letterSpacing: "-0.01em" },
      h4: { fontWeight: 600 },
      h5: { fontWeight: 600 },
      h6: { fontWeight: 600 },
      subtitle1: { fontWeight: 500 },
      subtitle2: { fontWeight: 500 },
      body1: { fontWeight: 400, lineHeight: 1.6 },
      body2: { fontWeight: 400, lineHeight: 1.5 },
      button: {
        fontWeight: 600,
        textTransform: "none",
        letterSpacing: "0.01em",
      },
      overline: { fontWeight: 700, letterSpacing: "0.08em" },
    },
    shape: {
      borderRadius: 10,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: "8px 18px",
            boxShadow: "none",
            "&:hover": {
              boxShadow: "none",
            },
          },
          containedPrimary: {
            backgroundColor: brandColors.pantoneOrange,
            "&:hover": {
              backgroundColor: "#E04800",
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            backgroundImage: "none",
            border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
            boxShadow: isDark
              ? "0 4px 20px -2px rgba(0, 0, 0, 0.4)"
              : "0 2px 12px -2px rgba(69, 85, 96, 0.08)",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 600,
            borderRadius: 6,
          },
        },
      },
    },
  };

  return createTheme(themeOptions);
};

export const defaultTheme = getTheme("dark");
