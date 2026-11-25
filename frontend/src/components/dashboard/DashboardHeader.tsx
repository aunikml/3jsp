import React from "react";
import {
  IconButton,
  Tooltip,
  Typography,
  Button,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Menu,
  Sun,
  Moon,
  Box as CubeIcon,
  Search,
} from "lucide-react";
import { brandColors } from "../../theme/theme";
import { useThemeStore } from "../../theme/themeStore";

interface DashboardHeaderProps {
  onMobileMenuToggle: () => void;
}

export const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  onMobileMenuToggle,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleTheme } = useThemeStore();
  const isDark = mode === "dark";

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/dashboard") return "Dashboard Overview";
    if (path === "/presentations") return "My Presentations";
    if (path.startsWith("/presentations/")) return "Presentation Details";
    if (path === "/recent") return "Recent Presentations";
    if (path === "/access") return "Access Management";
    if (path === "/analytics") return "Usage Analytics";
    if (path === "/settings") return "Workspace Settings";
    return "Presentation Studio";
  };

  return (
    <header
      style={{
        height: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 28px",
        backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
        borderBottom: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
        flexShrink: 0,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        {/* Mobile Hamburger Menu Button */}
        <div style={{ display: "flex" }}>
          <IconButton
            size="small"
            onClick={onMobileMenuToggle}
            sx={{
              display: { xs: "flex", md: "none" },
              color: isDark ? "#FFFFFF" : brandColors.pantone432,
            }}
          >
            <Menu size={22} />
          </IconButton>
        </div>

        <div>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1.15rem",
              color: isDark ? "#FFFFFF" : brandColors.pantone432,
              lineHeight: 1.2,
            }}
          >
            {getPageTitle()}
          </Typography>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        {/* Quick Search Shortcut */}
        <div
          onClick={() => navigate("/presentations")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 14px",
            borderRadius: 8,
            backgroundColor: isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "#E2E8F0"}`,
            color: isDark ? brandColors.pantoneCoolGray7 : "#64748B",
            cursor: "pointer",
            fontSize: "0.84rem",
          }}
        >
          <Search size={15} />
          <span style={{ display: "none" }}>Search presentations...</span>
          <span style={{ fontSize: "0.82rem" }}>Search</span>
          <kbd
            style={{
              padding: "2px 6px",
              borderRadius: 4,
              fontSize: "0.7rem",
              backgroundColor: isDark ? "rgba(0,0,0,0.3)" : "#E2E8F0",
              color: isDark ? "#A0AEC0" : "#475569",
            }}
          >
            /
          </kbd>
        </div>

        {/* 3D Instructional Technology Presentation Link */}
        <Button
          variant="outlined"
          size="small"
          onClick={() => navigate("/presentation/instructional-technology")}
          startIcon={<CubeIcon size={16} color={brandColors.pantoneOrange} />}
          sx={{
            borderColor: isDark ? "rgba(255, 81, 0, 0.4)" : "rgba(255, 81, 0, 0.5)",
            color: isDark ? "#FFFFFF" : brandColors.pantone432,
            fontWeight: 600,
            fontSize: "0.82rem",
            px: 1.5,
            display: { xs: "none", sm: "inline-flex" },
            "&:hover": {
              borderColor: brandColors.pantoneOrange,
              backgroundColor: "rgba(255, 81, 0, 0.08)",
            },
          }}
        >
          Launch 3D Presentation
        </Button>

        {/* Theme Toggle Button */}
        <Tooltip title={`Switch to ${isDark ? "Light" : "Dark"} Mode`}>
          <IconButton
            size="small"
            onClick={toggleTheme}
            sx={{
              color: isDark ? brandColors.pantoneCoolGray7 : brandColors.pantone432,
              backgroundColor: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
              "&:hover": {
                color: brandColors.pantoneOrange,
                backgroundColor: isDark ? "rgba(255, 81, 0, 0.12)" : "rgba(255, 81, 0, 0.08)",
              },
            }}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </IconButton>
        </Tooltip>
      </div>
    </header>
  );
};
