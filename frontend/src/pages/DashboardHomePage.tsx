import React, { useEffect, useState } from "react";
import {
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Layers,
  Clock,
  ShieldCheck,
  Play,
  Sparkles,
  Inbox,
} from "lucide-react";
import { Presentation } from "../types/dashboard";
import { presentationService } from "../services/presentationService";
import { PresentationCard } from "../components/dashboard/PresentationCard";
import { brandColors } from "../theme/theme";
import { useThemeStore } from "../theme/themeStore";

export const DashboardHomePage: React.FC = () => {
  const navigate = useNavigate();
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const [recentPresentations, setRecentPresentations] = useState<Presentation[]>([]);
  const [allPresentations, setAllPresentations] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      presentationService.getRecentPresentations(3),
      presentationService.getAllPresentations(),
    ]).then(([recents, all]) => {
      setRecentPresentations(recents);
      setAllPresentations(all.slice(0, 6));
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {/* 1. Welcome Section & Compact Metrics */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          alignItems: "flex-end",
          gap: 20,
          padding: "24px 28px",
          borderRadius: 14,
          backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
          border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: brandColors.pantoneOrange,
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: brandColors.pantoneOrange,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
              }}
            >
              BRAC IED PRESENTATION PLATFORM
            </Typography>
          </div>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: isDark ? "#FFFFFF" : brandColors.pantone432,
              lineHeight: 1.2,
              mb: 1,
            }}
          >
            Welcome back
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: isDark ? brandColors.pantoneCoolGray7 : "#64748B",
              fontSize: "0.95rem",
              lineHeight: 1.5,
              mb: 2.5,
            }}
          >
            Your presentation workspace. Browse, manage access permissions, and launch your
            interactive 3D learning experiences.
          </Typography>

          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/presentations")}
            endIcon={<ArrowRight size={18} />}
            sx={{
              backgroundColor: brandColors.pantoneOrange,
              fontWeight: 700,
              px: 2.5,
              py: 1,
            }}
          >
            Browse Presentations
          </Button>
        </div>

        {/* Compact, Unobtrusive Summary Info */}
        <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
          <div
            style={{
              padding: "14px 18px",
              borderRadius: 10,
              backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "#F8FAFC",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#E2E8F0"}`,
              minWidth: 125,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <Layers size={15} color={brandColors.pantoneOrange} />
              <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", fontWeight: 600 }}>
                Presentations
              </Typography>
            </div>
            <Typography variant="h5" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
              {allPresentations.length}
            </Typography>
          </div>

          <div
            style={{
              padding: "14px 18px",
              borderRadius: 10,
              backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "#F8FAFC",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#E2E8F0"}`,
              minWidth: 125,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <ShieldCheck size={15} color={brandColors.teachingLearning} />
              <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", fontWeight: 600 }}>
                Permissions
              </Typography>
            </div>
            <Typography variant="h5" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
              0 Active
            </Typography>
          </div>

          <div
            style={{
              padding: "14px 18px",
              borderRadius: 10,
              backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "#F8FAFC",
              border: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#E2E8F0"}`,
              minWidth: 125,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
              <Clock size={15} color={brandColors.mentalHealth} />
              <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", fontWeight: 600 }}>
                Launches
              </Typography>
            </div>
            <Typography variant="h5" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
              0
            </Typography>
          </div>
        </div>
      </div>

      {/* 2. Recent Presentations Section */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: isDark ? "#FFFFFF" : brandColors.pantone432,
              }}
            >
              Recent Presentations
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}
            >
              Quickly resume your most recently accessed 3D decks
            </Typography>
          </div>
        </div>

        {recentPresentations.length === 0 ? (
          <div
            style={{
              padding: "36px 20px",
              textAlign: "center",
              borderRadius: 12,
              backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
              border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
            }}
          >
            <Clock size={24} color={isDark ? brandColors.pantoneCoolGray7 : "#94A3B8"} style={{ marginBottom: 8 }} />
            <Typography variant="subtitle2" sx={{ fontWeight: 600, color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
              No recent presentations
            </Typography>
            <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#94A3B8" }}>
              Sessions will appear here once presentations are launched.
            </Typography>
          </div>
        ) : (
          <Grid container spacing={2.5}>
            {recentPresentations.map((p) => (
              <Grid item xs={12} md={4} key={p.id}>
                <Card
                  sx={{
                    backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
                    borderColor: isDark ? brandColors.darkBorder : brandColors.lightBorder,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      borderColor: isDark ? "rgba(255, 81, 0, 0.4)" : "rgba(255, 81, 0, 0.5)",
                    },
                  }}
                >
                  <div style={{ display: "flex", alignItems: "stretch" }}>
                    <div
                      style={{
                        width: 100,
                        background: `linear-gradient(135deg, ${p.gradient[0]} 0%, ${p.gradient[1]} 100%)`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      <Sparkles size={20} color="#FFFFFF" />
                    </div>

                    <CardContent
                      sx={{
                        flex: 1,
                        p: 2,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <Chip
                          label={p.type}
                          size="small"
                          sx={{
                            fontSize: "0.68rem",
                            height: 20,
                            mb: 0.75,
                            backgroundColor: `${p.categoryColor}22`,
                            color: p.categoryColor,
                            fontWeight: 700,
                          }}
                        />
                        <Typography
                          variant="subtitle2"
                          onClick={() => navigate(`/presentations/${p.slug}`)}
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.95rem",
                            color: isDark ? "#FFFFFF" : brandColors.pantone432,
                            cursor: "pointer",
                            "&:hover": { color: brandColors.pantoneOrange },
                            lineHeight: 1.3,
                          }}
                        >
                          {p.title}
                        </Typography>
                      </div>

                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginTop: 12,
                        }}
                      >
                        <Typography
                          variant="caption"
                          sx={{
                            color: isDark ? brandColors.pantoneCoolGray7 : "#94A3B8",
                            fontSize: "0.74rem",
                          }}
                        >
                          {p.lastAccessed}
                        </Typography>

                        <Tooltip title="Open presentation">
                          <IconButton
                            size="small"
                            onClick={() => navigate(`/presentations/${p.slug}`)}
                            sx={{
                              backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9",
                              color: brandColors.pantoneOrange,
                              "&:hover": {
                                backgroundColor: brandColors.pantoneOrange,
                                color: "#FFFFFF",
                              },
                            }}
                          >
                            <Play size={14} />
                          </IconButton>
                        </Tooltip>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </div>

      {/* 3. My Presentations Library Preview */}
      <div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 16,
          }}
        >
          <div>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: isDark ? "#FFFFFF" : brandColors.pantone432,
              }}
            >
              My Presentations
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}
            >
              Hardcoded 3D interactive presentations across BRAC IED pillars
            </Typography>
          </div>

          <Button
            size="small"
            onClick={() => navigate("/presentations")}
            endIcon={<ArrowRight size={16} />}
            sx={{ color: brandColors.pantoneOrange, fontWeight: 700 }}
          >
            View All ({allPresentations.length})
          </Button>
        </div>

        {loading ? (
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Loading presentations...
          </Typography>
        ) : allPresentations.length === 0 ? (
          <div
            style={{
              padding: "48px 24px",
              textAlign: "center",
              borderRadius: 12,
              backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
              border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
            }}
          >
            <Inbox size={32} color={isDark ? brandColors.pantoneCoolGray7 : "#94A3B8"} style={{ marginBottom: 12 }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432, mb: 0.5 }}>
              No presentations found
            </Typography>
            <Typography variant="body2" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", maxWidth: 440, margin: "0 auto" }}>
              All presentations have been deleted. New 3D presentations configured in the workspace will appear here.
            </Typography>
          </div>
        ) : (
          <Grid container spacing={3}>
            {allPresentations.map((p) => (
              <Grid item xs={12} sm={6} lg={4} key={p.id}>
                <PresentationCard presentation={p} />
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};
