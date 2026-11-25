import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  Chip,
  Button,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Clock, Play, Sparkles, Layers, Inbox } from "lucide-react";
import { Presentation } from "../types/dashboard";
import { presentationService } from "../services/presentationService";
import { brandColors } from "../theme/theme";
import { useThemeStore } from "../theme/themeStore";

export const RecentPage: React.FC = () => {
  const navigate = useNavigate();
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const [recentList, setRecentList] = useState<Presentation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    presentationService.getAllPresentations().then((res) => {
      setRecentList(res);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: isDark ? "#FFFFFF" : brandColors.pantone432,
            lineHeight: 1.2,
            mb: 0.5,
          }}
        >
          Recently Accessed Presentations
        </Typography>
        <Typography variant="body2" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
          Chronological session history of interactive presentations opened on this device.
        </Typography>
      </div>

      {loading ? (
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Loading recent activity...
        </Typography>
      ) : recentList.length === 0 ? (
        <div
          style={{
            padding: "56px 24px",
            textAlign: "center",
            borderRadius: 12,
            backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
            border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
          }}
        >
          <Inbox size={36} color={isDark ? brandColors.pantoneCoolGray7 : "#94A3B8"} style={{ marginBottom: 12 }} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432, mb: 0.5 }}>
            No recent presentation sessions
          </Typography>
          <Typography variant="body2" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", maxWidth: 440, margin: "0 auto" }}>
            Presentation launch records will be tracked here once sessions are started.
          </Typography>
        </div>
      ) : (
        <Grid container spacing={2.5}>
          {recentList.map((p, idx) => (
            <Grid item xs={12} key={p.id}>
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
                <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", padding: "16px 20px", gap: 16 }}>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontWeight: 700,
                      fontSize: "1rem",
                      color: isDark ? brandColors.pantoneCoolGray7 : "#94A3B8",
                      width: 24,
                    }}
                  >
                    #{idx + 1}
                  </span>

                  <div
                    style={{
                      width: 54,
                      height: 54,
                      borderRadius: 10,
                      background: `linear-gradient(135deg, ${p.gradient[0]} 0%, ${p.gradient[1]} 100%)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Sparkles size={20} color="#FFFFFF" />
                  </div>

                  <div style={{ flex: 1, minWidth: 240 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <Chip
                        label={p.type}
                        size="small"
                        sx={{
                          fontSize: "0.68rem",
                          height: 20,
                          backgroundColor: `${p.categoryColor}22`,
                          color: p.categoryColor,
                          fontWeight: 700,
                        }}
                      />
                      <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", fontWeight: 600 }}>
                        {p.category}
                      </Typography>
                    </div>

                    <Typography
                      variant="h6"
                      onClick={() => navigate(`/presentations/${p.slug}`)}
                      sx={{
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        color: isDark ? "#FFFFFF" : brandColors.pantone432,
                        cursor: "pointer",
                        "&:hover": { color: brandColors.pantoneOrange },
                      }}
                    >
                      {p.title}
                    </Typography>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Layers size={15} color={brandColors.pantoneOrange} />
                      <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                        {p.interactiveNodesCount} nodes
                      </Typography>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <Clock size={15} color={isDark ? brandColors.pantoneCoolGray7 : "#64748B"} />
                      <Typography variant="body2" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                        {p.lastAccessed}
                      </Typography>
                    </div>

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => navigate(`/presentations/${p.slug}`)}
                      startIcon={<Play size={14} />}
                      sx={{
                        color: brandColors.pantoneOrange,
                        borderColor: isDark ? "rgba(255, 81, 0, 0.4)" : "rgba(255, 81, 0, 0.5)",
                        fontWeight: 700,
                      }}
                    >
                      Open
                    </Button>
                  </div>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </div>
  );
};
