import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Chip,
  Paper,
  Grid,
  Divider,
  Breadcrumbs,
  Link as MuiLink,
} from "@mui/material";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Layers,
  Clock,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { Presentation } from "../types/dashboard";
import { presentationService } from "../services/presentationService";
import { brandColors } from "../theme/theme";
import { useThemeStore } from "../theme/themeStore";

export const PresentationDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const [presentation, setPresentation] = useState<Presentation | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      presentationService.getPresentationBySlug(slug).then((res: Presentation | null) => {
        setPresentation(res);
        setLoading(false);
      });
    }
  }, [slug]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Loading presentation details...
        </Typography>
      </div>
    );
  }

  if (!presentation) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0" }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
          Presentation Not Found
        </Typography>
        <Button variant="contained" onClick={() => navigate("/presentations")}>
          Return to Presentations
        </Button>
      </div>
    );
  }

  const handleLaunch = () => {
    presentationService.recordPresentationLaunch(presentation.slug);
    navigate(`/presentation/${presentation.slug}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Breadcrumb Navigation & Back Action */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Button
          size="small"
          onClick={() => navigate("/presentations")}
          startIcon={<ArrowLeft size={16} />}
          sx={{
            color: isDark ? brandColors.pantoneCoolGray7 : brandColors.pantone432,
            fontWeight: 600,
          }}
        >
          Back
        </Button>

        <Breadcrumbs sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
          <MuiLink
            component={Link}
            to="/dashboard"
            underline="hover"
            color="inherit"
            sx={{ fontSize: "0.85rem" }}
          >
            Dashboard
          </MuiLink>
          <MuiLink
            component={Link}
            to="/presentations"
            underline="hover"
            color="inherit"
            sx={{ fontSize: "0.85rem" }}
          >
            Presentations
          </MuiLink>
          <Typography
            sx={{
              fontSize: "0.85rem",
              fontWeight: 700,
              color: brandColors.pantoneOrange,
            }}
          >
            {presentation.title}
          </Typography>
        </Breadcrumbs>
      </div>

      {/* Main Cover Banner */}
      <div
        style={{
          borderRadius: 16,
          overflow: "hidden",
          border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
          backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
        }}
      >
        <div
          style={{
            height: 220,
            background: `linear-gradient(135deg, ${presentation.gradient[0]} 0%, ${presentation.gradient[1]} 100%)`,
            position: "relative",
            display: "flex",
            alignItems: "flex-end",
            padding: "28px 32px",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.15,
              backgroundImage:
                "radial-gradient(circle at 15% 20%, rgba(255,255,255,0.6) 0%, transparent 60%)",
            }}
          />

          <div style={{ zIndex: 2, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <Chip
                label={presentation.type}
                size="small"
                sx={{
                  backgroundColor: "rgba(255,255,255,0.2)",
                  backdropFilter: "blur(6px)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.75rem",
                }}
              />
              <Chip
                label={presentation.category}
                size="small"
                sx={{
                  backgroundColor: "rgba(0,0,0,0.3)",
                  backdropFilter: "blur(6px)",
                  color: "#FFFFFF",
                  fontWeight: 600,
                  fontSize: "0.75rem",
                }}
              />
            </div>

            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                color: "#FFFFFF",
                lineHeight: 1.2,
                textShadow: "0 2px 10px rgba(0,0,0,0.4)",
              }}
            >
              {presentation.title}
            </Typography>
          </div>
        </div>

        <div
          style={{
            padding: "24px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 16,
            borderBottom: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
          }}
        >
          <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Layers size={18} color={brandColors.pantoneOrange} />
              <div>
                <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", display: "block" }}>
                  Structure
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                  {presentation.slidesCount} Slides • {presentation.interactiveNodesCount} 3D Nodes
                </Typography>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Clock size={18} color={brandColors.teachingLearning} />
              <div>
                <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", display: "block" }}>
                  Last Accessed
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                  {presentation.lastAccessed}
                </Typography>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ShieldCheck size={18} color={brandColors.mentalHealth} />
              <div>
                <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", display: "block" }}>
                  Access Policy
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 700, textTransform: "capitalize", color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                  {presentation.accessLevel} (Admin Access)
                </Typography>
              </div>
            </div>
          </div>

          <Button
            variant="contained"
            size="large"
            onClick={handleLaunch}
            startIcon={<Play size={20} fill="#FFFFFF" />}
            sx={{
              backgroundColor: brandColors.pantoneOrange,
              fontWeight: 700,
              fontSize: "1rem",
              px: 4,
              py: 1.4,
              boxShadow: "0 6px 20px rgba(255, 81, 0, 0.4)",
              "&:hover": {
                backgroundColor: "#E04800",
              },
            }}
          >
            Launch Presentation
          </Button>
        </div>
      </div>

      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Paper
            sx={{
              p: 3.5,
              borderRadius: 3,
              backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
              border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1.5, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
              Presentation Overview
            </Typography>

            <Typography
              variant="body1"
              sx={{
                color: isDark ? "#D1D5DB" : "#334155",
                fontSize: "0.98rem",
                lineHeight: 1.7,
                mb: 3,
              }}
            >
              {presentation.description}
            </Typography>

            <Divider sx={{ my: 3, borderColor: isDark ? brandColors.darkBorder : brandColors.lightBorder }} />

            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
              Pedagogical & Technical Objectives
            </Typography>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {presentation.keyObjectives.map((obj: string, i: number) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <CheckCircle2 size={18} color={brandColors.pantoneOrange} style={{ marginTop: 3, flexShrink: 0 }} />
                  <Typography variant="body2" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#475569", lineHeight: 1.6 }}>
                    {obj}
                  </Typography>
                </div>
              ))}
            </div>

            <Divider sx={{ my: 3, borderColor: isDark ? brandColors.darkBorder : brandColors.lightBorder }} />

            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1.5, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
              Topic Tags
            </Typography>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {presentation.tags.map((tag: string) => (
                <Chip
                  key={tag}
                  label={`#${tag}`}
                  size="small"
                  sx={{
                    backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9",
                    color: isDark ? "#CBD5E1" : brandColors.pantone432,
                    fontWeight: 600,
                  }}
                />
              ))}
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper
            sx={{
              p: 3.5,
              borderRadius: 3,
              backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
              border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
              display: "flex",
              flexDirection: "column",
              gap: 2.5,
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
              Presentation Spec
            </Typography>

            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                  SLUG IDENTIFIER
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: "monospace", fontWeight: 700, color: brandColors.pantoneOrange }}>
                  {presentation.slug}
                </Typography>
              </div>

              <div>
                <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                  GRAPHICS STACK
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                  Three.js + R3F + Theatre.js
                </Typography>
              </div>

              <div>
                <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                  PILLAR ALIGNMENT
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: presentation.categoryColor }}>
                  {presentation.category}
                </Typography>
              </div>

              <div>
                <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                  CREATED ON
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                  {presentation.createdAt}
                </Typography>
              </div>

              <div>
                <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                  LAST MODIFIED
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                  {presentation.updatedAt}
                </Typography>
              </div>
            </div>

            <Button
              variant="outlined"
              fullWidth
              onClick={() => navigate("/access")}
              startIcon={<ShieldCheck size={18} />}
              sx={{
                mt: 1,
                borderColor: isDark ? brandColors.darkBorder : brandColors.lightBorder,
                color: isDark ? brandColors.pantoneCoolGray7 : brandColors.pantone432,
              }}
            >
              Manage Presentation Access
            </Button>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};
