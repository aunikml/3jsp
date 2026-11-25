import React, { useEffect, useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import {
  TrendingUp,
  Users,
  Layers,
  Clock,
} from "lucide-react";
import { AnalyticsSummary } from "../types/dashboard";
import { analyticsService } from "../services/analyticsService";
import { brandColors } from "../theme/theme";
import { useThemeStore } from "../theme/themeStore";

export const AnalyticsPage: React.FC = () => {
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);

  useEffect(() => {
    analyticsService.getSummary().then(setAnalytics);
  }, []);

  if (!analytics) {
    return (
      <Typography variant="body2" sx={{ color: "text.secondary" }}>
        Loading usage analytics...
      </Typography>
    );
  }

  const maxWeekly = Math.max(1, ...analytics.weeklyTrends.map((w) => w.launches));

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
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
          Usage Analytics
        </Typography>
        <Typography variant="body2" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
          Aggregated launch counts, session duration trends, and presentation popularity.
        </Typography>
      </div>

      <Grid container spacing={2.5}>
        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
              borderColor: isDark ? brandColors.darkBorder : brandColors.lightBorder,
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                  TOTAL LAUNCHES
                </Typography>
                <TrendingUp size={18} color={brandColors.pantoneOrange} />
              </div>
              <Typography variant="h4" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                {analytics.totalLaunches}
              </Typography>
              <Typography variant="caption" sx={{ color: brandColors.mentalHealth, fontWeight: 600 }}>
                +18.4% vs last month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
              borderColor: isDark ? brandColors.darkBorder : brandColors.lightBorder,
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                  ACTIVE DECKS
                </Typography>
                <Layers size={18} color={brandColors.teachingLearning} />
              </div>
              <Typography variant="h4" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                {analytics.activePresentations}
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                100% hardcoded 3D builds
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
              borderColor: isDark ? brandColors.darkBorder : brandColors.lightBorder,
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                  ACTIVE PRESENTERS
                </Typography>
                <Users size={18} color={brandColors.earlyChildhood} />
              </div>
              <Typography variant="h4" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                {analytics.activePermissions}
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                Across 5 BRAC IED pillars
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card
            sx={{
              backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
              borderColor: isDark ? brandColors.darkBorder : brandColors.lightBorder,
            }}
          >
            <CardContent sx={{ p: 2.5 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                <Typography variant="caption" sx={{ fontWeight: 700, color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                  AVG SESSION
                </Typography>
                <Clock size={18} color={brandColors.climateChange} />
              </div>
              <Typography variant="h4" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                36 min
              </Typography>
              <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                Interactive spatial delivery
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
              border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
              Weekly Presentation Launches
            </Typography>
            <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", mb: 3 }}>
              Total 3D presentation sessions initiated per day
            </Typography>

            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "space-between",
                gap: 12,
                paddingTop: 20,
                minHeight: 180,
              }}
            >
              {analytics.weeklyTrends.map((item) => {
                const heightPercent = Math.round((item.launches / maxWeekly) * 100);
                return (
                  <div
                    key={item.day}
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 8,
                      height: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Typography variant="caption" sx={{ fontSize: "0.72rem", fontWeight: 700, color: isDark ? "#CBD5E1" : brandColors.pantone432 }}>
                      {item.launches}
                    </Typography>

                    <div
                      style={{
                        width: "100%",
                        maxWidth: 36,
                        height: `${heightPercent}%`,
                        backgroundColor: brandColors.pantoneOrange,
                        borderRadius: "6px 6px 0 0",
                        transition: "height 0.4s ease",
                      }}
                    />

                    <Typography
                      variant="caption"
                      sx={{
                        color: isDark ? brandColors.pantoneCoolGray7 : "#64748B",
                        fontWeight: 600,
                        fontSize: "0.75rem",
                      }}
                    >
                      {item.day}
                    </Typography>
                  </div>
                );
              })}
            </div>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper
            sx={{
              p: 3,
              borderRadius: 3,
              backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
              border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
              height: "100%",
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 0.5, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
              Top Presentations
            </Typography>
            <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", mb: 2, display: "block" }}>
              Most frequent presenter sessions by launch count
            </Typography>

            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {analytics.topPresentations.length === 0 ? (
                <Typography variant="body2" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", py: 4, textAlign: "center" }}>
                  No presentation launch statistics recorded yet.
                </Typography>
              ) : (
                analytics.topPresentations.map((p, index) => (
                <div
                  key={p.slug}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "10px 14px",
                    borderRadius: 8,
                    backgroundColor: isDark ? "rgba(0,0,0,0.15)" : "#F8FAFC",
                    border: `1px solid ${isDark ? "rgba(255,255,255,0.04)" : "#E2E8F0"}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontWeight: 700, fontSize: "0.85rem", color: brandColors.pantoneOrange, width: 16 }}>
                      {index + 1}
                    </span>
                    <div>
                      <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                        {p.title}
                      </Typography>
                      <Typography variant="caption" sx={{ color: p.color, fontWeight: 600 }}>
                        {p.category}
                      </Typography>
                    </div>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <Typography variant="body2" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                      {p.launches}
                    </Typography>
                    <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#94A3B8" }}>
                      runs
                    </Typography>
                  </div>
                </div>
              )))}
            </div>
          </Paper>
        </Grid>
      </Grid>

      <Paper
        sx={{
          borderRadius: 3,
          backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
          border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
          overflow: "hidden",
        }}
      >
        <div style={{ padding: "20px 24px", borderBottom: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}` }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
            Recent Activity Log
          </Typography>
          <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
            Real-time presentation launches and interactive node sessions
          </Typography>
        </div>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ backgroundColor: isDark ? "rgba(0,0,0,0.2)" : "#F8FAFC" }}>
                <TableCell sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                  Presentation
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                  Presenter
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                  Action / Mode
                </TableCell>
                <TableCell sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                  Duration
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                  Timestamp
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {analytics.recentActivity.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} sx={{ textAlign: "center", py: 4, color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                    No recent presentation activity logs found.
                  </TableCell>
                </TableRow>
              ) : (
                analytics.recentActivity.map((log) => (
                <TableRow
                  key={log.id}
                  hover
                  sx={{
                    "&:last-child td, &:last-child th": { border: 0 },
                    borderColor: isDark ? brandColors.darkBorder : brandColors.lightBorder,
                  }}
                >
                  <TableCell sx={{ fontWeight: 600, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                    {log.presentationTitle}
                  </TableCell>
                  <TableCell sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#475569" }}>
                    {log.userName}
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={log.action}
                      size="small"
                      sx={{
                        fontSize: "0.72rem",
                        backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9",
                        color: brandColors.pantoneOrange,
                        fontWeight: 600,
                      }}
                    />
                  </TableCell>
                  <TableCell sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#475569" }}>
                    {log.durationMinutes} mins
                  </TableCell>
                  <TableCell align="right" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#94A3B8" }}>
                    {log.timestamp}
                  </TableCell>
                </TableRow>
              )))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
};
