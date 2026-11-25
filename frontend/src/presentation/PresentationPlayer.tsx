import React, { useEffect, useState } from "react";
import { Paper, Typography, Fade, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DevelopmentScene } from "../scenes/DevelopmentScene";
import { PresenterToolbar } from "../components/layout/PresenterToolbar";
import { usePresentationStore } from "./presentationStore";
import { fetchCsrfToken } from "../services/api";
import { brandColors } from "../theme/theme";

export const PresentationPlayer: React.FC = () => {
  const navigate = useNavigate();
  const { presentationTitle, currentNodeId } = usePresentationStore();
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    fetchCsrfToken();
  }, []);

  const handleObjectClick = (objectId: string) => {
    setNotification(`Interacted with 3D Object: ${objectId}`);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {/* 3D Scene */}
      <DevelopmentScene onObjectClick={handleObjectClick} />

      {/* Top Bar with Clean Exit & Status */}
      <div
        style={{
          position: "absolute",
          top: 18,
          left: 18,
          zIndex: 40,
          display: "flex",
          alignItems: "center",
          gap: 12,
        }}
      >
        <Button
          variant="contained"
          size="small"
          onClick={() => navigate("/dashboard")}
          startIcon={<ArrowLeft size={16} />}
          sx={{
            backgroundColor: "rgba(17, 24, 39, 0.85)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            color: "#FFFFFF",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: brandColors.pantoneOrange,
            },
          }}
        >
          Exit to Dashboard
        </Button>

        <Paper
          sx={{
            px: 2,
            py: 0.75,
            backgroundColor: "rgba(17, 24, 39, 0.85)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: 2,
            display: { xs: "none", sm: "block" },
          }}
        >
          <Typography variant="caption" sx={{ color: brandColors.pantoneOrange, fontWeight: 700, mr: 1 }}>
            LIVE 3D
          </Typography>
          <Typography variant="caption" sx={{ color: "#FFFFFF", fontWeight: 600 }}>
            {presentationTitle} • Node: <strong>{currentNodeId}</strong>
          </Typography>
        </Paper>
      </div>

      <Fade in={Boolean(notification)}>
        <div
          style={{
            position: "absolute",
            top: 24,
            right: 24,
            zIndex: 40,
            pointerEvents: "none",
          }}
        >
          <Paper
            sx={{
              px: 2.5,
              py: 1.5,
              backgroundColor: "rgba(168, 85, 247, 0.9)",
              color: "#fff",
              borderRadius: 3,
              fontWeight: 500,
            }}
          >
            {notification}
          </Paper>
        </div>
      </Fade>

      <PresenterToolbar />
    </div>
  );
};
