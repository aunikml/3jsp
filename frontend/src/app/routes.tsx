import React, { Suspense } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { Typography, Button } from "@mui/material";
import { DashboardLayout } from "../components/dashboard/DashboardLayout";
import { DashboardHomePage } from "../pages/DashboardHomePage";
import { PresentationsPage } from "../pages/PresentationsPage";
import { PresentationDetailsPage } from "../pages/PresentationDetailsPage";
import { RecentPage } from "../pages/RecentPage";
import { AccessManagementPage } from "../pages/AccessManagementPage";
import { AnalyticsPage } from "../pages/AnalyticsPage";
import { SettingsPage } from "../pages/SettingsPage";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { brandColors } from "../theme/theme";
import { useThemeStore } from "../theme/themeStore";

// Code-split the 3D presentation player for instant dashboard load
const PresentationController = React.lazy(() =>
  import("../presentation/PresentationController").then((m) => ({
    default: m.PresentationController,
  }))
);

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "60vh",
        textAlign: "center",
        padding: 32,
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        sx={{ fontWeight: 700, color: brandColors.pantoneOrange }}
      >
        404
      </Typography>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}
      >
        Page Not Found
      </Typography>
      <Typography
        variant="body1"
        sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", mb: 3, maxWidth: 440 }}
      >
        The presentation studio workspace route you requested does not exist or has been relocated.
      </Typography>
      <Button
        onClick={() => navigate("/dashboard")}
        variant="contained"
        sx={{ backgroundColor: brandColors.pantoneOrange, fontWeight: 700 }}
      >
        Return to Dashboard
      </Button>
    </div>
  );
};

export const AppRoutes: React.FC = () => {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading Presentation Studio..." />}>
      <Routes>
        {/* Root redirect to /dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        {/* Main Administrative Dashboard Routes */}
        <Route
          path="/dashboard"
          element={
            <DashboardLayout>
              <DashboardHomePage />
            </DashboardLayout>
          }
        />

        <Route
          path="/presentations"
          element={
            <DashboardLayout>
              <PresentationsPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/presentations/:slug"
          element={
            <DashboardLayout>
              <PresentationDetailsPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/recent"
          element={
            <DashboardLayout>
              <RecentPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/access"
          element={
            <DashboardLayout>
              <AccessManagementPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/analytics"
          element={
            <DashboardLayout>
              <AnalyticsPage />
            </DashboardLayout>
          }
        />

        <Route
          path="/settings"
          element={
            <DashboardLayout>
              <SettingsPage />
            </DashboardLayout>
          }
        />

        {/* Presentation Launch & Play Routes */}
        <Route path="/presentation" element={<PresentationController />} />
        <Route path="/presentation-launch/:slug" element={<PresentationController />} />
        <Route path="/presentation/dev" element={<PresentationController />} />
        <Route path="/presentation/:slug" element={<PresentationController />} />

        {/* Catch-all 404 */}
        <Route
          path="*"
          element={
            <DashboardLayout>
              <NotFoundPage />
            </DashboardLayout>
          }
        />
      </Routes>
    </Suspense>
  );
};
