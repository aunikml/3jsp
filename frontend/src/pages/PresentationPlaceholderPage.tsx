import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Paper,
  Chip,
} from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Box as CubeIcon,
  Sparkles,
} from "lucide-react";
import { Presentation } from "../types/dashboard";
import { presentationService } from "../services/presentationService";
import { brandColors } from "../theme/theme";
import { useThemeStore } from "../theme/themeStore";

export const PresentationPlaceholderPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const [presentation, setPresentation] = useState<Presentation | null>(null);

  useEffect(() => {
    if (slug) {
      presentationService.getPresentationBySlug(slug).then(setPresentation);
    }
  }, [slug]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "80vh",
        textAlign: "center",
        padding: "32px 16px",
      }}
    >
      <Paper
        sx={{
          p: 5,
          maxWidth: 640,
          width: "100%",
          borderRadius: 4,
          backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
          border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
          boxShadow: isDark
            ? "0 20px 40px -8px rgba(0,0,0,0.7)"
            : "0 10px 30px -4px rgba(69, 85, 96, 0.1)",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            borderRadius: 18,
            backgroundColor: "rgba(255, 81, 0, 0.12)",
            border: `2px solid ${brandColors.pantoneOrange}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 20px auto",
          }}
        >
          <CubeIcon size={36} color={brandColors.pantoneOrange} />
        </div>

        <Chip
          label="Presentation Player Route"
          size="small"
          sx={{
            mb: 2,
            backgroundColor: "rgba(255, 81, 0, 0.15)",
            color: brandColors.pantoneOrange,
            fontWeight: 700,
          }}
        />

        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
          {presentation ? presentation.title : "Presentation Experience"}
        </Typography>

        <Typography variant="body1" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", mb: 3 }}>
          This is a placeholder for the live presentation player. The custom 3D presentation
          experience for <strong>"{slug}"</strong> will be integrated with Three.js, React Three Fiber,
          and Theatre.js camera animation sequences in subsequent development stages.
        </Typography>

        {presentation && (
          <div
            style={{
              padding: "16px 20px",
              borderRadius: 10,
              backgroundColor: isDark ? "rgba(0,0,0,0.25)" : "#F8FAFC",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#E2E8F0"}`,
              marginBottom: 28,
              textAlign: "left",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: "0.8rem", color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                Target Architecture:
              </span>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: presentation.categoryColor }}>
                {presentation.type}
              </span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ fontSize: "0.8rem", color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                Interactive Nodes:
              </span>
              <span style={{ fontSize: "0.8rem", fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                {presentation.interactiveNodesCount} spatial checkpoints
              </span>
            </div>
          </div>
        )}

        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <Button
            variant="contained"
            onClick={() => navigate("/presentation/dev")}
            startIcon={<Sparkles size={18} />}
            sx={{
              backgroundColor: brandColors.pantoneOrange,
              fontWeight: 700,
              px: 3,
            }}
          >
            Launch 3D Dev Scene
          </Button>

          <Button
            variant="outlined"
            onClick={() => navigate("/dashboard")}
            startIcon={<ArrowLeft size={18} />}
            sx={{
              borderColor: isDark ? brandColors.darkBorder : brandColors.lightBorder,
              color: isDark ? "#FFFFFF" : brandColors.pantone432,
              fontWeight: 600,
            }}
          >
            Back to Dashboard
          </Button>
        </div>
      </Paper>
    </div>
  );
};
