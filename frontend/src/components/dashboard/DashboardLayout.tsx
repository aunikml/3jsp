import React, { useState } from "react";
import { Drawer, useMediaQuery, useTheme } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { DashboardHeader } from "./DashboardHeader";
import { brandColors } from "../../theme/theme";
import { useThemeStore } from "../../theme/themeStore";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";
  const location = useLocation();

  const handleToggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  const handleMobileToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: isDark ? brandColors.darkBg : brandColors.lightBg,
      }}
    >
      {/* Desktop Persistent Sidebar */}
      {!isMobile && (
        <Sidebar
          collapsed={collapsed}
          onToggleCollapse={handleToggleCollapse}
          isMobile={false}
        />
      )}

      {/* Mobile Drawer Sidebar */}
      {isMobile && (
        <Drawer
          anchor="left"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          PaperProps={{
            sx: {
              width: 260,
              backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
              backgroundImage: "none",
            },
          }}
        >
          <Sidebar
            collapsed={false}
            onToggleCollapse={() => setMobileOpen(false)}
            isMobile={true}
            onMobileClose={() => setMobileOpen(false)}
          />
        </Drawer>
      )}

      {/* Main Content Area */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
          height: "100%",
          overflow: "hidden",
        }}
      >
        <DashboardHeader onMobileMenuToggle={handleMobileToggle} />

        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "28px",
            position: "relative",
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              style={{ maxWidth: 1380, margin: "0 auto", height: "100%" }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};
