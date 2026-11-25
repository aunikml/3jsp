import React from "react";
import { AppBar, Toolbar, Typography, Button, Chip } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { Box as BoxIcon, Play } from "lucide-react";

export const Header: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "rgba(17, 24, 39, 0.95)",
        backdropFilter: "blur(8px)",
        borderBottom: "1px solid",
        borderColor: "divider",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", minHeight: 56 }}>
        <div
          onClick={() => navigate("/")}
          style={{ display: "flex", alignItems: "center", gap: 12, cursor: "pointer" }}
        >
          <BoxIcon color="#38bdf8" size={24} />
          <Typography
            variant="h6"
            sx={{
              color: "#f9fafb",
              fontWeight: 700,
              letterSpacing: "-0.025em",
            }}
          >
            3D Presentation Engine
          </Typography>
          <Chip label="Three.js + Theatre.js" size="small" color="primary" variant="outlined" />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Button
            onClick={() => navigate("/")}
            variant={location.pathname === "/" ? "contained" : "text"}
            size="small"
          >
            Home
          </Button>
          <Button
            onClick={() => navigate("/presentation/dev")}
            variant={location.pathname.startsWith("/presentation") ? "contained" : "outlined"}
            size="small"
            startIcon={<Play size={16} />}
          >
            Launch 3D Dev Scene
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};
