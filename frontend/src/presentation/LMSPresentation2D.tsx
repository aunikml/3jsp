import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Button,
  IconButton,
  Chip,
  Tooltip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Play,
  Pause,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Maximize2,
  Minimize2,
  Sparkles,
  FileText,
  Video,
  Presentation as PresentationIcon,
} from "lucide-react";
import { brandColors } from "../theme/theme";
import { usePresentationStore } from "./presentationStore";
import { MoodleAssignmentWorkflow } from "./MoodleAssignmentWorkflow";
import { AsyncVideoQuizWorkflow } from "./AsyncVideoQuizWorkflow";
import { SlidesAvailabilityModal } from "./SlidesAvailabilityModal";
import { LoginProcessSlide } from "./LoginProcessSlide";

export const LMSPresentation2D: React.FC = () => {
  const navigate = useNavigate();
  const { setPresentationId } = usePresentationStore();

  // 0 = Cover, 1 = LMS Branching Stage, 2 = Login Process Slide
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [isLmsBranchExpanded, setIsLmsBranchExpanded] = useState<boolean>(false);
  const [isAssignmentWorkflowOpen, setIsAssignmentWorkflowOpen] = useState<boolean>(false);
  const [isVideoWorkflowOpen, setIsVideoWorkflowOpen] = useState<boolean>(false);
  const [isSlideModalOpen, setIsSlideModalOpen] = useState<boolean>(false);

  // 2 Content Slides: Slide 1 (LMS Branches), Slide 2 (Login Process)
  const totalContentSlides = 2;

  useEffect(() => {
    setPresentationId("intro-to-lms", "Introduction to Learning Management System (LMS)");
  }, [setPresentationId]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().then(() => setIsFullscreen(true)).catch((e) => console.warn(e));
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch((e) => console.warn(e));
    }
  };

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < totalContentSlides ? prev + 1 : prev));
  }, [totalContentSlides]);

  const handlePrevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : 0));
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        handleNextSlide();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrevSlide();
      } else if (e.key === "Escape" && currentSlide > 0) {
        setCurrentSlide(0);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNextSlide, handlePrevSlide, currentSlide]);

  // Auto-play timer
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isPlaying && currentSlide < totalContentSlides) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => {
          if (prev < totalContentSlides) return prev + 1;
          setIsPlaying(false);
          return prev;
        });
      }, 7000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentSlide, totalContentSlides]);

  const handleStartPresentation = () => {
    setCurrentSlide(1);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#0B0F17",
        backgroundImage: `
          radial-gradient(circle at 50% 15%, rgba(255, 81, 0, 0.12) 0%, transparent 65%),
          radial-gradient(circle at 80% 85%, rgba(69, 85, 96, 0.25) 0%, transparent 60%),
          linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px)
        `,
        backgroundSize: "100% 100%, 100% 100%, 48px 48px, 48px 48px",
        color: "#FFFFFF",
        fontFamily: "'Quicksand', sans-serif",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Top Header Bar */}
      <header
        style={{
          height: 64,
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 30,
          borderBottom: "1px solid rgba(255, 255, 255, 0.07)",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(11, 15, 23, 0.8)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => navigate("/dashboard")}
            startIcon={<ArrowLeft size={16} />}
            sx={{
              color: brandColors.pantoneCoolGray7,
              borderColor: "rgba(255, 255, 255, 0.15)",
              backgroundColor: "rgba(255, 255, 255, 0.03)",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: 2,
              "&:hover": {
                borderColor: brandColors.pantoneOrange,
                color: "#FFFFFF",
                backgroundColor: "rgba(255, 81, 0, 0.1)",
              },
            }}
          >
            Exit to Dashboard
          </Button>

          <div style={{ height: 20, width: 1, backgroundColor: "rgba(255, 255, 255, 0.12)" }} />

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: brandColors.pantoneOrange,
                boxShadow: `0 0 10px ${brandColors.pantoneOrange}`,
              }}
            />
            <Typography variant="body2" sx={{ fontWeight: 700, color: "#FFFFFF", letterSpacing: "0.02em" }}>
              BRAC IED Presentation Studio
            </Typography>
            <Chip
              label="2D Interactive"
              size="small"
              sx={{
                ml: 1,
                height: 22,
                fontSize: "0.7rem",
                fontWeight: 700,
                backgroundColor: "rgba(255, 81, 0, 0.15)",
                color: brandColors.pantoneOrange,
                border: `1px solid rgba(255, 81, 0, 0.3)`,
              }}
            />
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {currentSlide > 0 && (
            <Chip
              label={`Slide ${currentSlide} of ${totalContentSlides}`}
              size="small"
              sx={{
                backgroundColor: "rgba(255, 255, 255, 0.08)",
                color: "#FFFFFF",
                fontWeight: 600,
              }}
            />
          )}

          <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Fullscreen"}>
            <IconButton
              size="small"
              onClick={toggleFullscreen}
              sx={{
                color: brandColors.pantoneCoolGray7,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                "&:hover": { color: "#FFFFFF", backgroundColor: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </IconButton>
          </Tooltip>
        </div>
      </header>

      {/* Main Presentation Stage */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px 32px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <AnimatePresence mode="wait">
          {/* SLIDE 0: COVER / TITLE SLIDE WITH PLAY BUTTON */}
          {currentSlide === 0 && (
            <motion.div
              key="cover"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              style={{
                maxWidth: 960,
                width: "100%",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 28,
              }}
            >
              {/* Pillar Badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <Chip
                  icon={<Sparkles size={14} color={brandColors.pantoneOrange} />}
                  label="TEACHING & LEARNING PILLAR • FOUNDATIONS"
                  sx={{
                    px: 1.5,
                    py: 2,
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    backgroundColor: "rgba(255, 81, 0, 0.12)",
                    color: brandColors.pantoneOrange,
                    border: "1px solid rgba(255, 81, 0, 0.35)",
                    borderRadius: 3,
                  }}
                />
              </motion.div>

              {/* Title Requested by User */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    fontSize: { xs: "2.2rem", sm: "3.2rem", md: "3.8rem" },
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    background: `linear-gradient(135deg, #FFFFFF 30%, ${brandColors.pantoneCoolGray7} 100%)`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    maxWidth: 880,
                    margin: "0 auto",
                  }}
                >
                  Introduction to Learning Management System (LMS)
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    mt: 2,
                    color: brandColors.pantoneCoolGray7,
                    fontWeight: 500,
                    maxWidth: 680,
                    margin: "16px auto 0 auto",
                    lineHeight: 1.5,
                  }}
                >
                  An interactive 2D presentation exploring digital course environments,
                  instructional architecture, student engagement, and educational workflows.
                </Typography>
              </motion.div>

              {/* Play Button Below the Title (Prominent & Styled) */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                style={{ marginTop: 12 }}
              >
                <Button
                  onClick={handleStartPresentation}
                  variant="contained"
                  startIcon={<Play size={24} fill="#FFFFFF" />}
                  sx={{
                    px: 4.5,
                    py: 1.8,
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    borderRadius: "50px",
                    textTransform: "none",
                    letterSpacing: "0.02em",
                    background: `linear-gradient(135deg, ${brandColors.pantoneOrange} 0%, #D84400 100%)`,
                    boxShadow: `0 10px 30px rgba(255, 81, 0, 0.45), 0 0 0 1px rgba(255, 255, 255, 0.2) inset`,
                    color: "#FFFFFF",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      background: `linear-gradient(135deg, #FF6622 0%, ${brandColors.pantoneOrange} 100%)`,
                      boxShadow: `0 14px 40px rgba(255, 81, 0, 0.65)`,
                    },
                  }}
                >
                  Play Presentation
                </Button>
              </motion.div>

              {/* Sub-info metadata */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 24,
                  marginTop: 16,
                  color: "rgba(255, 255, 255, 0.45)",
                  fontSize: "0.85rem",
                }}
              >
                <span>Interactive 2D Branching Presentation</span>
                <span>•</span>
                <span>Presenter & Self-Paced Modes</span>
                <span>•</span>
                <span>Keyboard Nav (Arrow Keys / Space)</span>
              </motion.div>
            </motion.div>
          )}

          {/* SLIDE 1: LMS SQUARE WITH 3 BRANCHING NODES (Assignment, Slide, Video) */}
          {currentSlide === 1 && (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.35 }}
              style={{
                maxWidth: 1040,
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 20,
              }}
            >
              {/* Slide Content Stage: Either Moodle Workflow, Video Quiz Workflow, Slide Modal, or Branching Diagram */}
              <AnimatePresence mode="wait">
                {isAssignmentWorkflowOpen ? (
                  <MoodleAssignmentWorkflow
                    key="moodle-assignment-workflow"
                    onClose={() => setIsAssignmentWorkflowOpen(false)}
                  />
                ) : isVideoWorkflowOpen ? (
                  <AsyncVideoQuizWorkflow
                    key="async-video-quiz-workflow"
                    onClose={() => setIsVideoWorkflowOpen(false)}
                  />
                ) : isSlideModalOpen ? (
                  <SlidesAvailabilityModal
                    key="slides-availability-modal"
                    onClose={() => setIsSlideModalOpen(false)}
                  />
                ) : (
                  <motion.div
                    key="lms-branches"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      width: "100%",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 20,
                    }}
                  >
                    {/* Header and Instructions */}
                    <div style={{ textAlign: "center" }}>
                      <Chip
                        label="LMS ARCHITECTURE • CORE COMPONENTS"
                        size="small"
                        sx={{
                          mb: 1.5,
                          backgroundColor: "rgba(255, 81, 0, 0.15)",
                          color: brandColors.pantoneOrange,
                          fontWeight: 700,
                        }}
                      />
                      <Typography variant="h3" sx={{ fontWeight: 800, color: "#FFFFFF" }}>
                        LMS Core Components
                      </Typography>
                      <Typography variant="body1" sx={{ color: brandColors.pantoneCoolGray7, mt: 1, maxWidth: 680 }}>
                        Click the <strong>LMS</strong> square to reveal its three core branches: <strong>For assignment Submission</strong>, <strong>Slide</strong>, and <strong>Aysnchronus Video</strong>.
                      </Typography>
                    </div>

                    {/* Branching Canvas */}
                    <div
                      style={{
                        position: "relative",
                        width: "100%",
                        minHeight: 380,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        paddingTop: 10,
                      }}
                    >
                      {/* Central Square: LMS (Clean, without chip) */}
                      <motion.div
                        onClick={() => setIsLmsBranchExpanded((prev) => !prev)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.96 }}
                        style={{
                          width: 150,
                          height: 150,
                          borderRadius: 18,
                          backgroundColor: isLmsBranchExpanded
                            ? "rgba(255, 81, 0, 0.18)"
                            : "rgba(255, 255, 255, 0.05)",
                          border: `2px solid ${
                            isLmsBranchExpanded ? brandColors.pantoneOrange : "rgba(255, 255, 255, 0.25)"
                          }`,
                          boxShadow: isLmsBranchExpanded
                            ? `0 0 35px rgba(255, 81, 0, 0.45), 0 12px 28px rgba(0,0,0,0.5)`
                            : "0 10px 25px rgba(0,0,0,0.4)",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          zIndex: 10,
                          position: "relative",
                          transition: "border 0.25s, background-color 0.25s, box-shadow 0.25s",
                        }}
                      >
                        <Typography
                          variant="h3"
                          sx={{
                            fontWeight: 800,
                            color: "#FFFFFF",
                            letterSpacing: "0.06em",
                          }}
                        >
                          LMS
                        </Typography>
                      </motion.div>

                      {/* Branching SVG Connectors & 3 Branching Squares */}
                      <AnimatePresence>
                        {isLmsBranchExpanded && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            style={{
                              width: "100%",
                              display: "flex",
                              flexDirection: "column",
                              alignItems: "center",
                            }}
                          >
                            {/* SVG Connecting Branches for 3 Nodes */}
                            <svg
                              width="720"
                              height="55"
                              viewBox="0 0 720 55"
                              style={{ overflow: "visible", display: "block" }}
                            >
                              {/* Vertical line from LMS center down to fork point */}
                              <line
                                x1="360"
                                y1="0"
                                x2="360"
                                y2="25"
                                stroke={brandColors.pantoneOrange}
                                strokeWidth="2.5"
                              />
                              {/* Horizontal fork line spanning all 3 branches */}
                              <line
                                x1="100"
                                y1="25"
                                x2="620"
                                y2="25"
                                stroke={brandColors.pantoneOrange}
                                strokeWidth="2.5"
                              />
                              {/* Downward drop line to Left Branch (Assignment) */}
                              <line
                                x1="100"
                                y1="25"
                                x2="100"
                                y2="55"
                                stroke={brandColors.pantoneOrange}
                                strokeWidth="2.5"
                              />
                              {/* Downward drop line to Center Branch (Slide) */}
                              <line
                                x1="360"
                                y1="25"
                                x2="360"
                                y2="55"
                                stroke={brandColors.pantoneOrange}
                                strokeWidth="2.5"
                              />
                              {/* Downward drop line to Right Branch (Video) */}
                              <line
                                x1="620"
                                y1="25"
                                x2="620"
                                y2="55"
                                stroke={brandColors.pantoneOrange}
                                strokeWidth="2.5"
                              />
                            </svg>

                            {/* The Three Branching Squares */}
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                gap: 32,
                                width: "100%",
                                maxWidth: 860,
                              }}
                            >
                              {/* Branch 1: For assignment Submission */}
                              <motion.div
                                onClick={() => setIsAssignmentWorkflowOpen(true)}
                                initial={{ opacity: 0, scale: 0.75, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.75, y: 15 }}
                                transition={{ duration: 0.35, delay: 0.12 }}
                                whileHover={{ scale: 1.06, y: -4 }}
                                whileTap={{ scale: 0.96 }}
                                style={{
                                  width: 175,
                                  height: 175,
                                  borderRadius: 18,
                                  backgroundColor: "rgba(56, 189, 248, 0.1)",
                                  border: `2px solid #38BDF8`,
                                  boxShadow: "0 10px 30px rgba(56, 189, 248, 0.3)",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  padding: 14,
                                  textAlign: "center",
                                  gap: 8,
                                  cursor: "pointer",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 12,
                                    backgroundColor: "rgba(56, 189, 248, 0.22)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <FileText size={22} color="#38BDF8" />
                                </div>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    fontWeight: 700,
                                    color: "#FFFFFF",
                                    fontSize: "0.92rem",
                                    lineHeight: 1.3,
                                  }}
                                >
                                  For assignment Submission
                                </Typography>
                                <Chip
                                  icon={<Sparkles size={11} color="#38BDF8" />}
                                  label="Moodle steps"
                                  size="small"
                                  sx={{
                                    height: 20,
                                    fontSize: "0.64rem",
                                    fontWeight: 700,
                                    backgroundColor: "rgba(56, 189, 248, 0.2)",
                                    color: "#38BDF8",
                                    border: "1px solid rgba(56, 189, 248, 0.4)",
                                  }}
                                />
                              </motion.div>

                              {/* Branch 2: Slide (New Branch Requested by User) */}
                              <motion.div
                                onClick={() => setIsSlideModalOpen(true)}
                                initial={{ opacity: 0, scale: 0.75, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.75, y: 15 }}
                                transition={{ duration: 0.35, delay: 0.18 }}
                                whileHover={{ scale: 1.06, y: -4 }}
                                whileTap={{ scale: 0.96 }}
                                style={{
                                  width: 175,
                                  height: 175,
                                  borderRadius: 18,
                                  backgroundColor: "rgba(255, 81, 0, 0.12)",
                                  border: `2px solid ${brandColors.pantoneOrange}`,
                                  boxShadow: "0 10px 30px rgba(255, 81, 0, 0.35)",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  padding: 14,
                                  textAlign: "center",
                                  gap: 8,
                                  cursor: "pointer",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 12,
                                    backgroundColor: "rgba(255, 81, 0, 0.22)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <PresentationIcon size={22} color={brandColors.pantoneOrange} />
                                </div>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    fontWeight: 800,
                                    color: "#FFFFFF",
                                    fontSize: "1.05rem",
                                    letterSpacing: "0.02em",
                                  }}
                                >
                                  Slide
                                </Typography>
                                <Chip
                                  icon={<Sparkles size={11} color={brandColors.pantoneOrange} />}
                                  label="Class slides available"
                                  size="small"
                                  sx={{
                                    height: 20,
                                    fontSize: "0.64rem",
                                    fontWeight: 700,
                                    backgroundColor: "rgba(255, 81, 0, 0.2)",
                                    color: brandColors.pantoneOrange,
                                    border: `1px solid rgba(255, 81, 0, 0.4)`,
                                  }}
                                />
                              </motion.div>

                              {/* Branch 3: Aysnchronus Video */}
                              <motion.div
                                onClick={() => setIsVideoWorkflowOpen(true)}
                                initial={{ opacity: 0, scale: 0.75, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.75, y: 15 }}
                                transition={{ duration: 0.35, delay: 0.24 }}
                                whileHover={{ scale: 1.06, y: -4 }}
                                whileTap={{ scale: 0.96 }}
                                style={{
                                  width: 175,
                                  height: 175,
                                  borderRadius: 18,
                                  backgroundColor: "rgba(52, 211, 153, 0.1)",
                                  border: `2px solid #34D399`,
                                  boxShadow: "0 10px 30px rgba(52, 211, 153, 0.3)",
                                  display: "flex",
                                  flexDirection: "column",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  padding: 14,
                                  textAlign: "center",
                                  gap: 8,
                                  cursor: "pointer",
                                  position: "relative",
                                }}
                              >
                                <div
                                  style={{
                                    width: 44,
                                    height: 44,
                                    borderRadius: 12,
                                    backgroundColor: "rgba(52, 211, 153, 0.22)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Video size={22} color="#34D399" />
                                </div>
                                <Typography
                                  variant="subtitle1"
                                  sx={{
                                    fontWeight: 700,
                                    color: "#FFFFFF",
                                    fontSize: "0.92rem",
                                    lineHeight: 1.3,
                                  }}
                                >
                                  Aysnchronus Video
                                </Typography>
                                <Chip
                                  icon={<Sparkles size={11} color="#34D399" />}
                                  label="Mental Health Video & Quiz"
                                  size="small"
                                  sx={{
                                    height: 20,
                                    fontSize: "0.64rem",
                                    fontWeight: 700,
                                    backgroundColor: "rgba(52, 211, 153, 0.2)",
                                    color: "#34D399",
                                    border: "1px solid rgba(52, 211, 153, 0.4)",
                                  }}
                                />
                              </motion.div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {/* SLIDE 2: BRACU LMS LOGIN PROCESS */}
          {currentSlide === 2 && <LoginProcessSlide key="slide-2-login" />}
        </AnimatePresence>
      </main>

      {/* Bottom Presenter Toolbar */}
      <footer
        style={{
          height: 72,
          padding: "0 28px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 30,
          borderTop: "1px solid rgba(255, 255, 255, 0.07)",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(11, 15, 23, 0.8)",
        }}
      >
        {/* Left Side: Return to Cover */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {currentSlide > 0 && (
            <Button
              size="small"
              onClick={() => setCurrentSlide(0)}
              startIcon={<RotateCcw size={14} />}
              sx={{
                color: brandColors.pantoneCoolGray7,
                fontSize: "0.8rem",
                textTransform: "none",
                "&:hover": { color: "#FFFFFF" },
              }}
            >
              Cover
            </Button>
          )}
        </div>

        {/* Center: Slide Dots and Navigation Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Tooltip title="Previous Slide (Left Arrow)">
            <span>
              <IconButton
                size="small"
                onClick={handlePrevSlide}
                disabled={currentSlide === 0}
                sx={{
                  color: "#FFFFFF",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.12)" },
                  "&.Mui-disabled": { opacity: 0.3, color: "rgba(255, 255, 255, 0.2)" },
                }}
              >
                <ChevronLeft size={20} />
              </IconButton>
            </span>
          </Tooltip>

          {/* Slide Indicator Dots (Cover=0, Slide 1=LMS Branches, Slide 2=Login Process) */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            {[0, 1, 2].map((idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                style={{
                  width: currentSlide === idx ? 24 : 8,
                  height: 8,
                  borderRadius: 4,
                  backgroundColor:
                    currentSlide === idx
                      ? brandColors.pantoneOrange
                      : "rgba(255, 255, 255, 0.2)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  padding: 0,
                }}
                title={
                  idx === 0
                    ? "Cover"
                    : idx === 1
                    ? "LMS Components & Branches"
                    : "BRACU LMS Login Process"
                }
              />
            ))}
          </div>

          <Tooltip title="Next Slide (Right Arrow / Space)">
            <span>
              <IconButton
                size="small"
                onClick={handleNextSlide}
                disabled={currentSlide === totalContentSlides}
                sx={{
                  color: "#FFFFFF",
                  backgroundColor: "rgba(255, 255, 255, 0.06)",
                  "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.12)" },
                  "&.Mui-disabled": { opacity: 0.3, color: "rgba(255, 255, 255, 0.2)" },
                }}
              >
                <ChevronRight size={20} />
              </IconButton>
            </span>
          </Tooltip>

          {/* Auto-Play Toggle */}
          {currentSlide > 0 && (
            <Tooltip title={isPlaying ? "Pause Slideshow" : "Auto-Play Slideshow"}>
              <IconButton
                size="small"
                onClick={() => setIsPlaying(!isPlaying)}
                sx={{
                  color: isPlaying ? brandColors.pantoneOrange : brandColors.pantoneCoolGray7,
                  backgroundColor: isPlaying ? "rgba(255, 81, 0, 0.15)" : "rgba(255, 255, 255, 0.06)",
                  "&:hover": { color: "#FFFFFF", backgroundColor: "rgba(255, 255, 255, 0.12)" },
                }}
              >
                {isPlaying ? <Pause size={18} /> : <Play size={18} />}
              </IconButton>
            </Tooltip>
          )}
        </div>

        {/* Right Side: Status Badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Typography variant="caption" sx={{ color: brandColors.pantoneCoolGray7 }}>
            {currentSlide === 0
              ? "Ready to Present"
              : `Slide ${currentSlide} of ${totalContentSlides} • ${
                  currentSlide === 1 ? "LMS Branches" : "Login Process"
                }`}
          </Typography>
        </div>
      </footer>
    </div>
  );
};
