import React, { useState, useEffect } from "react";
import {
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Chip,
  RadioGroup,
  Radio,
} from "@mui/material";
import {
  User as UserIcon,
  Palette,
  Server,
  Save,
  CheckCircle,
  Moon,
  Sun,
} from "lucide-react";
import { User } from "../types/dashboard";
import { authService } from "../services/authService";
import { brandColors } from "../theme/theme";
import { useThemeStore } from "../theme/themeStore";

export const SettingsPage: React.FC = () => {
  const { mode, setTheme } = useThemeStore();
  const isDark = mode === "dark";

  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [department, setDepartment] = useState("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    authService.getCurrentUser().then((u) => {
      setUser(u);
      setName(u.name);
      setEmail(u.email);
      setDepartment(u.department);
    });
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const updated = await authService.updateProfile({ name, email, department });
    setUser(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  if (!user) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, maxWidth: 960 }}>
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
          Workspace Settings
        </Typography>
        <Typography variant="body2" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
          Configure administrator profile, visual workspace appearance, and runtime environments.
        </Typography>
      </div>

      {/* 1. Appearance Preferences */}
      <Paper
        sx={{
          p: 3.5,
          borderRadius: 3,
          backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
          border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <Palette size={20} color={brandColors.pantoneOrange} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
            Appearance & Workspace Theme
          </Typography>
        </div>
        <Typography variant="body2" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", mb: 3 }}>
          Select your preferred workspace aesthetic. Preferences are persisted automatically in your browser.
        </Typography>

        <RadioGroup
          row
          value={mode}
          onChange={(e) => setTheme(e.target.value as "dark" | "light")}
          sx={{ gap: 2 }}
        >
          <div
            onClick={() => setTheme("dark")}
            style={{
              flex: 1,
              minWidth: 220,
              padding: "16px 20px",
              borderRadius: 10,
              cursor: "pointer",
              border: `2px solid ${isDark ? brandColors.pantoneOrange : "rgba(173, 175, 178, 0.2)"}`,
              backgroundColor: isDark ? "rgba(255, 81, 0, 0.06)" : "#F8FAFC",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  backgroundColor: "#121619",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
              >
                <Moon size={18} color="#FF5100" />
              </div>
              <div>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                  Dark Creative (Default)
                </Typography>
                <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                  Optimized for 3D graphics & low glare
                </Typography>
              </div>
            </div>
            <Radio value="dark" color="primary" checked={isDark} />
          </div>

          <div
            onClick={() => setTheme("light")}
            style={{
              flex: 1,
              minWidth: 220,
              padding: "16px 20px",
              borderRadius: 10,
              cursor: "pointer",
              border: `2px solid ${!isDark ? brandColors.pantoneOrange : "rgba(173, 175, 178, 0.2)"}`,
              backgroundColor: !isDark ? "rgba(255, 81, 0, 0.06)" : "transparent",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: 8,
                  backgroundColor: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #CBD5E1",
                }}
              >
                <Sun size={18} color="#FF5100" />
              </div>
              <div>
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                  Light Clean
                </Typography>
                <Typography variant="caption" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
                  BRAC IED neutral #F8F8F8 background
                </Typography>
              </div>
            </div>
            <Radio value="light" color="primary" checked={!isDark} />
          </div>
        </RadioGroup>
      </Paper>

      {/* 2. Administrator Profile */}
      <Paper
        sx={{
          p: 3.5,
          borderRadius: 3,
          backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
          border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <UserIcon size={20} color={brandColors.pantoneOrange} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
            Administrator Profile
          </Typography>
        </div>
        <Typography variant="body2" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", mb: 3 }}>
          Manage your personal administrative contact details and institutional affiliation.
        </Typography>

        <form onSubmit={handleSaveProfile} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 8 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                fontSize: "1.3rem",
                fontWeight: 700,
                backgroundColor: brandColors.pantone432,
                color: "#FFFFFF",
                border: `2px solid ${brandColors.pantoneOrange}`,
              }}
            >
              {user.avatarInitials}
            </Avatar>

            <div>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
                {user.name}
              </Typography>
              <div style={{ display: "flex", gap: 8, marginTop: 4 }}>
                <Chip
                  label="Primary Administrator"
                  size="small"
                  sx={{
                    backgroundColor: "rgba(255, 81, 0, 0.15)",
                    color: brandColors.pantoneOrange,
                    fontWeight: 700,
                    fontSize: "0.72rem",
                  }}
                />
                <Chip
                  label="Role: Admin"
                  size="small"
                  variant="outlined"
                  sx={{ fontSize: "0.72rem", fontWeight: 600 }}
                />
              </div>
            </div>
          </div>

          <Grid container spacing={2.5}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                size="small"
                label="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                size="small"
                label="Department / Institute"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              />
            </Grid>
          </Grid>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8 }}>
            <div>
              {savedSuccess && (
                <div style={{ display: "flex", alignItems: "center", gap: 6, color: brandColors.mentalHealth }}>
                  <CheckCircle size={16} />
                  <Typography variant="body2" sx={{ fontWeight: 600 }}>
                    Profile settings updated successfully!
                  </Typography>
                </div>
              )}
            </div>

            <Button
              type="submit"
              variant="contained"
              startIcon={<Save size={16} />}
              sx={{ backgroundColor: brandColors.pantoneOrange, fontWeight: 700 }}
            >
              Save Profile Changes
            </Button>
          </div>
        </form>
      </Paper>

      {/* 3. System & Application Architecture Information */}
      <Paper
        sx={{
          p: 3.5,
          borderRadius: 3,
          backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
          border: `1px solid ${isDark ? brandColors.darkBorder : brandColors.lightBorder}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
          <Server size={20} color={brandColors.pantoneOrange} />
          <Typography variant="h6" sx={{ fontWeight: 700, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
            System & Runtime Specifications
          </Typography>
        </div>
        <Typography variant="body2" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B", mb: 3 }}>
          Underlying technology stack, backend connection, and rendering engine state.
        </Typography>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9"}` }}>
            <Typography variant="body2" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
              Frontend Application
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
              React 18.3 • TypeScript 5.4 • Vite 5.2 • Material UI 5.15
            </Typography>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9"}` }}>
            <Typography variant="body2" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
              3D & Motion Engine
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
              Three.js 0.160 • React Three Fiber 8.16 • Theatre.js 0.7.2
            </Typography>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9"}` }}>
            <Typography variant="body2" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
              Backend Integration Target
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: brandColors.pantoneOrange, fontFamily: "monospace" }}>
              Django 5.1 REST Framework • PostgreSQL 16
            </Typography>
          </div>

          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
            <Typography variant="body2" sx={{ color: isDark ? brandColors.pantoneCoolGray7 : "#64748B" }}>
              Presentation Content Architecture
            </Typography>
            <Typography variant="body2" sx={{ fontWeight: 600, color: isDark ? "#FFFFFF" : brandColors.pantone432 }}>
              Hardcoded React/TypeScript Component Modules (No CMS)
            </Typography>
          </div>
        </div>
      </Paper>
    </div>
  );
};
