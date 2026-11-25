import React from "react";
import {
  Typography,
  Tooltip,
  Avatar,
  IconButton,
  Divider,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Layers,
  Clock,
  ShieldCheck,
  BarChart3,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { brandColors } from "../../theme/theme";
import { useThemeStore } from "../../theme/themeStore";
import { authService } from "../../services/authService";

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  isMobile?: boolean;
  onMobileClose?: () => void;
}

interface NavItem {
  label: string;
  path: string;
  icon: React.ReactNode;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  isMobile = false,
  onMobileClose,
}) => {
  const location = useLocation();
  const navigate = useNavigate();
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const primaryNavItems: NavItem[] = [
    { label: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { label: "My Presentations", path: "/presentations", icon: <Layers size={20} /> },
    { label: "Recent", path: "/recent", icon: <Clock size={20} /> },
  ];

  const adminNavItems: NavItem[] = [
    { label: "Access Management", path: "/access", icon: <ShieldCheck size={20} /> },
    { label: "Analytics", path: "/analytics", icon: <BarChart3 size={20} /> },
    { label: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  const handleNavClick = (path: string) => {
    navigate(path);
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  const handleLogout = async () => {
    await authService.logout();
    navigate("/dashboard");
  };

  const isActive = (path: string) => {
    if (path === "/presentations") {
      return location.pathname === "/presentations" || location.pathname.startsWith("/presentations/");
    }
    return location.pathname === path;
  };

  const sidebarWidth = collapsed && !isMobile ? 74 : 260;

  return (
    <aside
      style={{
        width: sidebarWidth,
        minWidth: sidebarWidth,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
        borderRight: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
        transition: "width 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
        overflowX: "hidden",
        zIndex: 100,
        position: "relative",
      }}
    >
      {/* Branding Header */}
      <div
        style={{
          height: 68,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed && !isMobile ? "center" : "space-between",
          padding: collapsed && !isMobile ? "0" : "0 20px",
          borderBottom: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
        }}
      >
        <div
          onClick={() => handleNavClick("/dashboard")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            cursor: "pointer",
          }}
        >
          {/* Minimal Geometric Brand Mark in BRAC IED Orange */}
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: 8,
              backgroundColor: brandColors.pantoneOrange,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 12px rgba(255, 81, 0, 0.3)",
              flexShrink: 0,
            }}
          >
            <Sparkles size={18} color="#FFFFFF" />
          </div>

          {(!collapsed || isMobile) && (
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  fontSize: "1.05rem",
                  lineHeight: 1.2,
                  color: isDark ? "#FFFFFF" : brandColors.pantone432,
                }}
              >
                Presentation Studio
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: isDark ? brandColors.pantoneCoolGray7 : "#777777",
                  fontSize: "0.7rem",
                  fontWeight: 600,
                  letterSpacing: "0.04em",
                }}
              >
                BRAC IED WORKSPACE
              </Typography>
            </div>
          )}
        </div>

        {!isMobile && (
          <IconButton
            size="small"
            onClick={onToggleCollapse}
            sx={{
              color: isDark ? brandColors.pantoneCoolGray7 : "#777777",
              "&:hover": { color: brandColors.pantoneOrange },
            }}
          >
            {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          </IconButton>
        )}
      </div>

      {/* Navigation Links Area */}
      <div
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "16px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 24,
        }}
      >
        {/* Primary Navigation Section */}
        <div>
          {(!collapsed || isMobile) && (
            <Typography
              variant="caption"
              sx={{
                px: 1.5,
                mb: 1,
                display: "block",
                color: isDark ? brandColors.pantoneCoolGray7 : "#888888",
                fontWeight: 700,
                fontSize: "0.68rem",
                letterSpacing: "0.08em",
              }}
            >
              WORKSPACE
            </Typography>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {primaryNavItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Tooltip
                  key={item.path}
                  title={collapsed && !isMobile ? item.label : ""}
                  placement="right"
                >
                  <div
                    onClick={() => handleNavClick(item.path)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: collapsed && !isMobile ? "10px 0" : "10px 14px",
                      justifyContent: collapsed && !isMobile ? "center" : "flex-start",
                      borderRadius: 8,
                      cursor: "pointer",
                      position: "relative",
                      backgroundColor: active
                        ? isDark
                          ? "rgba(255, 81, 0, 0.12)"
                          : "rgba(255, 81, 0, 0.08)"
                        : "transparent",
                      color: active
                        ? brandColors.pantoneOrange
                        : isDark
                        ? "#D1D5DB"
                        : brandColors.pantone432,
                      fontWeight: active ? 700 : 500,
                      transition: "all 0.15s ease",
                    }}
                  >
                    {/* Active Accent Indicator */}
                    {active && (
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "15%",
                          height: "70%",
                          width: 3.5,
                          borderRadius: "0 4px 4px 0",
                          backgroundColor: brandColors.pantoneOrange,
                        }}
                      />
                    )}
                    <span style={{ display: "flex", color: active ? brandColors.pantoneOrange : "inherit" }}>
                      {item.icon}
                    </span>
                    {(!collapsed || isMobile) && (
                      <span style={{ fontSize: "0.92rem" }}>{item.label}</span>
                    )}
                  </div>
                </Tooltip>
              );
            })}
          </div>
        </div>

        {/* Administration Section */}
        <div>
          {(!collapsed || isMobile) && (
            <Typography
              variant="caption"
              sx={{
                px: 1.5,
                mb: 1,
                display: "block",
                color: isDark ? brandColors.pantoneCoolGray7 : "#888888",
                fontWeight: 700,
                fontSize: "0.68rem",
                letterSpacing: "0.08em",
              }}
            >
              ADMINISTRATION
            </Typography>
          )}

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {adminNavItems.map((item) => {
              const active = isActive(item.path);
              return (
                <Tooltip
                  key={item.path}
                  title={collapsed && !isMobile ? item.label : ""}
                  placement="right"
                >
                  <div
                    onClick={() => handleNavClick(item.path)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: collapsed && !isMobile ? "10px 0" : "10px 14px",
                      justifyContent: collapsed && !isMobile ? "center" : "flex-start",
                      borderRadius: 8,
                      cursor: "pointer",
                      position: "relative",
                      backgroundColor: active
                        ? isDark
                          ? "rgba(255, 81, 0, 0.12)"
                          : "rgba(255, 81, 0, 0.08)"
                        : "transparent",
                      color: active
                        ? brandColors.pantoneOrange
                        : isDark
                        ? "#D1D5DB"
                        : brandColors.pantone432,
                      fontWeight: active ? 700 : 500,
                      transition: "all 0.15s ease",
                    }}
                  >
                    {active && (
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "15%",
                          height: "70%",
                          width: 3.5,
                          borderRadius: "0 4px 4px 0",
                          backgroundColor: brandColors.pantoneOrange,
                        }}
                      />
                    )}
                    <span style={{ display: "flex", color: active ? brandColors.pantoneOrange : "inherit" }}>
                      {item.icon}
                    </span>
                    {(!collapsed || isMobile) && (
                      <span style={{ fontSize: "0.92rem" }}>{item.label}</span>
                    )}
                  </div>
                </Tooltip>
              );
            })}
          </div>
        </div>
      </div>

      <Divider sx={{ borderColor: isDark ? brandColors.darkBorder : brandColors.lightBorder }} />

      {/* Sidebar Footer with Administrator Profile */}
      <div
        style={{
          padding: collapsed && !isMobile ? "16px 8px" : "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed && !isMobile ? "center" : "space-between",
          backgroundColor: isDark ? "rgba(0,0,0,0.15)" : "rgba(0,0,0,0.02)",
        }}
      >
        <div
          onClick={() => handleNavClick("/settings")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            cursor: "pointer",
            minWidth: 0,
          }}
        >
          <Avatar
            sx={{
              width: 34,
              height: 34,
              fontSize: "0.82rem",
              fontWeight: 700,
              backgroundColor: brandColors.pantone432,
              color: "#FFFFFF",
              border: `1.5px solid ${brandColors.pantoneOrange}`,
            }}
          >
            FA
          </Avatar>
          {(!collapsed || isMobile) && (
            <div style={{ display: "flex", flexDirection: "column", minWidth: 0 }}>
              <Typography
                variant="body2"
                noWrap
                sx={{
                  fontWeight: 700,
                  fontSize: "0.84rem",
                  color: isDark ? "#FFFFFF" : brandColors.pantone432,
                }}
              >
                Dr. Farhana Ahmed
              </Typography>
              <Typography
                variant="caption"
                noWrap
                sx={{
                  color: isDark ? brandColors.pantoneCoolGray7 : "#777777",
                  fontSize: "0.72rem",
                }}
              >
                Administrator
              </Typography>
            </div>
          )}
        </div>

        {(!collapsed || isMobile) && (
          <Tooltip title="Log out">
            <IconButton
              size="small"
              onClick={handleLogout}
              sx={{
                color: isDark ? brandColors.pantoneCoolGray7 : "#888888",
                "&:hover": { color: "#F43F5E" },
              }}
            >
              <LogOut size={16} />
            </IconButton>
          </Tooltip>
        )}
      </div>
    </aside>
  );
};
