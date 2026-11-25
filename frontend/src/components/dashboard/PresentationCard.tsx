import React from "react";
import {
  Card,
  CardContent,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Play, Sparkles, Clock, Layers } from "lucide-react";
import { Presentation } from "../../types/dashboard";
import { brandColors } from "../../theme/theme";
import { useThemeStore } from "../../theme/themeStore";

interface PresentationCardProps {
  presentation: Presentation;
  onLaunch?: (e: React.MouseEvent, presentation: Presentation) => void;
}

export const PresentationCard: React.FC<PresentationCardProps> = ({
  presentation,
  onLaunch,
}) => {
  const navigate = useNavigate();
  const mode = useThemeStore((state) => state.mode);
  const isDark = mode === "dark";

  const handleCardClick = () => {
    navigate(`/presentations/${presentation.slug}`);
  };

  const handleLaunchClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onLaunch) {
      onLaunch(e, presentation);
    } else {
      navigate(`/presentation/${presentation.slug}`);
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      style={{ height: "100%" }}
    >
      <Card
        onClick={handleCardClick}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          cursor: "pointer",
          backgroundColor: isDark ? brandColors.darkPaper : "#FFFFFF",
          borderColor: isDark ? brandColors.darkBorder : brandColors.lightBorder,
          overflow: "hidden",
          transition: "border-color 0.2s, box-shadow 0.2s",
          "&:hover": {
            borderColor: isDark ? "rgba(255, 81, 0, 0.4)" : "rgba(255, 81, 0, 0.5)",
            boxShadow: isDark
              ? "0 12px 30px -4px rgba(0, 0, 0, 0.6)"
              : "0 8px 24px -2px rgba(69, 85, 96, 0.12)",
          },
        }}
      >
        <div
          style={{
            height: 160,
            position: "relative",
            background: `linear-gradient(135deg, ${presentation.gradient[0]} 0%, ${presentation.gradient[1]} 100%)`,
            overflow: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 0,
              opacity: 0.18,
              backgroundImage:
                "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.4) 0%, transparent 60%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.6) 0%, transparent 70%)",
            }}
          />

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              zIndex: 2,
            }}
          >
            <div
              style={{
                width: 48,
                height: 48,
                borderRadius: 12,
                backgroundColor: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 8px 16px rgba(0,0,0,0.2)",
              }}
            >
              <Sparkles size={24} color="#FFFFFF" />
            </div>
            <Typography
              variant="caption"
              sx={{
                color: "#FFFFFF",
                fontWeight: 700,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
                fontSize: "0.72rem",
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              {presentation.type}
            </Typography>
          </div>

          <Tooltip title="Launch 3D Presentation">
            <IconButton
              size="small"
              onClick={handleLaunchClick}
              sx={{
                position: "absolute",
                bottom: 12,
                right: 12,
                backgroundColor: brandColors.pantoneOrange,
                color: "#FFFFFF",
                boxShadow: "0 4px 12px rgba(255, 81, 0, 0.4)",
                "&:hover": {
                  backgroundColor: "#E04800",
                  transform: "scale(1.08)",
                },
                transition: "all 0.15s ease",
              }}
            >
              <Play size={16} fill="#FFFFFF" />
            </IconButton>
          </Tooltip>
        </div>

        <CardContent sx={{ flex: 1, p: 2.5, display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: presentation.categoryColor,
                display: "inline-block",
              }}
            />
            <Typography
              variant="caption"
              sx={{
                color: isDark ? brandColors.pantoneCoolGray7 : "#64748B",
                fontWeight: 700,
                fontSize: "0.74rem",
                letterSpacing: "0.03em",
              }}
            >
              {presentation.category}
            </Typography>
          </div>

          <Typography
            variant="h6"
            sx={{
              fontWeight: 700,
              fontSize: "1.05rem",
              lineHeight: 1.3,
              mb: 1,
              color: isDark ? "#FFFFFF" : brandColors.pantone432,
            }}
          >
            {presentation.title}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: isDark ? brandColors.pantoneCoolGray7 : "#64748B",
              fontSize: "0.85rem",
              lineHeight: 1.5,
              mb: 2,
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              flex: 1,
            }}
          >
            {presentation.description}
          </Typography>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 12,
              borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "#F1F5F9"}`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Layers size={14} color={isDark ? brandColors.pantoneCoolGray7 : "#94A3B8"} />
              <Typography
                variant="caption"
                sx={{
                  color: isDark ? brandColors.pantoneCoolGray7 : "#64748B",
                  fontSize: "0.75rem",
                  fontWeight: 600,
                }}
              >
                {presentation.interactiveNodesCount} 3D nodes
              </Typography>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <Clock size={14} color={isDark ? brandColors.pantoneCoolGray7 : "#94A3B8"} />
              <Typography
                variant="caption"
                sx={{
                  color: isDark ? brandColors.pantoneCoolGray7 : "#94A3B8",
                  fontSize: "0.75rem",
                }}
              >
                {presentation.lastAccessed}
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
