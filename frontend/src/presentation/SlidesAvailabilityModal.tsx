import React from "react";
import {
  Typography,
  Button,
  Chip,
  Paper,
} from "@mui/material";
import { motion } from "framer-motion";
import {
  X,
  Presentation,
  DownloadCloud,
  CheckCircle2,
  Calendar,
  Layers,
  Sparkles,
  FileCheck,
} from "lucide-react";
import { brandColors } from "../theme/theme";

interface SlidesAvailabilityModalProps {
  onClose: () => void;
}

export const SlidesAvailabilityModal: React.FC<SlidesAvailabilityModalProps> = ({
  onClose,
}) => {
  const lectureSlides = [
    {
      session: "Session 01",
      title: "Introduction to LMS Architecture & Course Design",
      format: "Interactive 3D / PDF",
      updated: "Updated today",
      size: "4.8 MB",
    },
    {
      session: "Session 02",
      title: "Pedagogy, Formative Rubrics & Assessment Engines",
      format: "PDF & PPTX",
      updated: "Available",
      size: "6.2 MB",
    },
    {
      session: "Session 03",
      title: "Student Emotional Regulation & Classroom Wellbeing",
      format: "Slides + Video Guide",
      updated: "Coming next class",
      size: "8.1 MB",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        width: "100%",
        maxWidth: 820,
        backgroundColor: "rgba(11, 15, 23, 0.96)",
        borderRadius: 20,
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(255, 81, 0, 0.18)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Top Header Bar */}
      <div
        style={{
          padding: "16px 24px",
          backgroundColor: "rgba(15, 23, 42, 0.92)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              padding: "6px 12px",
              borderRadius: 8,
              backgroundColor: "rgba(255, 81, 0, 0.18)",
              border: `1px solid ${brandColors.pantoneOrange}`,
              color: brandColors.pantoneOrange,
              fontWeight: 800,
              fontSize: "0.8rem",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Presentation size={16} color={brandColors.pantoneOrange} />
            <span>COURSE PRESENTATION SLIDES</span>
          </div>

          <Typography variant="body2" sx={{ color: "#FFFFFF", fontWeight: 700 }}>
            Lecture Slide Repository
          </Typography>
        </div>

        <Button
          size="small"
          onClick={onClose}
          startIcon={<X size={16} />}
          sx={{
            color: brandColors.pantoneCoolGray7,
            backgroundColor: "rgba(255, 255, 255, 0.06)",
            borderRadius: 2,
            fontSize: "0.78rem",
            textTransform: "none",
            fontWeight: 600,
            "&:hover": {
              backgroundColor: "rgba(255, 81, 0, 0.15)",
              color: "#FFFFFF",
            },
          }}
        >
          Close
        </Button>
      </div>

      {/* Content Area */}
      <div style={{ padding: "24px 28px", display: "flex", flexDirection: "column", gap: 20 }}>
        {/* Primary Notification Banner Requested by User */}
        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            background: `linear-gradient(135deg, rgba(255, 81, 0, 0.15) 0%, rgba(15, 23, 42, 0.6) 100%)`,
            border: `1.5px solid ${brandColors.pantoneOrange}`,
            boxShadow: "0 10px 30px rgba(255, 81, 0, 0.2)",
            display: "flex",
            alignItems: "flex-start",
            gap: 16,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: 14,
              backgroundColor: brandColors.pantoneOrange,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 0 20px rgba(255, 81, 0, 0.4)",
            }}
          >
            <Sparkles size={24} color="#FFFFFF" />
          </div>

          <div>
            <Typography variant="h5" sx={{ fontWeight: 800, color: "#FFFFFF", mb: 0.5 }}>
              All the slides being used in the class will be available here.
            </Typography>
            <Typography variant="body2" sx={{ color: brandColors.pantoneCoolGray7, lineHeight: 1.6 }}>
              Every slide deck, visual model, and classroom presentation resource presented by the instructor
              is published here directly after each class session for student review, revision, and offline download.
            </Typography>
          </div>
        </Paper>

        {/* Feature Highlights Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
          {[
            {
              icon: <Layers size={20} color="#38BDF8" />,
              title: "Full Deck Access",
              desc: "All session slide decks archived chronologically.",
            },
            {
              icon: <DownloadCloud size={20} color="#34D399" />,
              title: "Multiple Formats",
              desc: "Available as interactive web decks, PDF, and PPTX.",
            },
            {
              icon: <CheckCircle2 size={20} color={brandColors.pantoneOrange} />,
              title: "Always Up-to-Date",
              desc: "Instructor annotations synced after every lecture.",
            },
          ].map((item, i) => (
            <Paper
              key={i}
              sx={{
                p: 2,
                borderRadius: 2.5,
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                {item.icon}
                <Typography variant="subtitle2" sx={{ fontWeight: 700, color: "#FFFFFF" }}>
                  {item.title}
                </Typography>
              </div>
              <Typography variant="caption" sx={{ color: brandColors.pantoneCoolGray7, lineHeight: 1.5, display: "block" }}>
                {item.desc}
              </Typography>
            </Paper>
          ))}
        </div>

        {/* Available Slide Decks List */}
        <div>
          <Typography variant="caption" sx={{ color: brandColors.pantoneCoolGray7, fontWeight: 700, letterSpacing: "0.06em", mb: 1.5, display: "block" }}>
            AVAILABLE CLASS LECTURE SLIDE DECKS
          </Typography>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {lectureSlides.map((slide, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 18px",
                  borderRadius: 10,
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  transition: "all 0.2s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 10,
                      backgroundColor: "rgba(255, 81, 0, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FileCheck size={18} color={brandColors.pantoneOrange} />
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Typography variant="subtitle2" sx={{ color: "#FFFFFF", fontWeight: 700 }}>
                        {slide.session}: {slide.title}
                      </Typography>
                      <Chip
                        label={slide.format}
                        size="small"
                        sx={{
                          height: 20,
                          fontSize: "0.68rem",
                          fontWeight: 700,
                          backgroundColor: "rgba(56, 189, 248, 0.15)",
                          color: "#38BDF8",
                        }}
                      />
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
                      <span style={{ color: brandColors.pantoneCoolGray7, fontSize: "0.75rem", display: "flex", alignItems: "center", gap: 4 }}>
                        <Calendar size={12} /> {slide.updated}
                      </span>
                      <span style={{ color: brandColors.pantoneCoolGray7, fontSize: "0.75rem" }}>
                        • {slide.size}
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<DownloadCloud size={14} />}
                  sx={{
                    borderColor: "rgba(255, 255, 255, 0.2)",
                    color: "#FFFFFF",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    textTransform: "none",
                    borderRadius: 2,
                    "&:hover": {
                      borderColor: brandColors.pantoneOrange,
                      color: brandColors.pantoneOrange,
                    },
                  }}
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div
        style={{
          padding: "14px 24px",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
        }}
      >
        <Button
          size="small"
          variant="contained"
          onClick={onClose}
          sx={{
            backgroundColor: brandColors.pantoneOrange,
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "0.8rem",
            textTransform: "none",
            borderRadius: 2,
            px: 3,
            py: 1,
            "&:hover": { backgroundColor: "#D84400" },
          }}
        >
          Done • Back to Branches
        </Button>
      </div>
    </motion.div>
  );
};
