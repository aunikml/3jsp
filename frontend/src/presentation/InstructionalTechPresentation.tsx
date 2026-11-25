import React, { useState, useEffect, useCallback } from "react";
import {
  Typography,
  Button,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Presentation as PresentationIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { TitleSlide2D } from "./slides/TitleSlide2D";
import { ProfileBackgroundSlide2D } from "./slides/ProfileBackgroundSlide2D";
import { ProblemSlide2D } from "./slides/ProblemSlide2D";
import { ClassroomTypesSlide3D } from "./slides/ClassroomTypesSlide3D";
import { AddieSlide2D } from "./slides/AddieSlide2D";
import { brandColors } from "../theme/theme";

export const InstructionalTechPresentation: React.FC = () => {
  const navigate = useNavigate();
  // 0: Slide 1 (Presentation Title)
  // 1: Slide 2 (Introduction, Profile & EdTech Journey)
  // 2: Slide 3 (The Problem - Radial Interactive Problem Mapping)
  // 3: Slide 4 (Classroom Types: Traditional, Low-Tech, Virtual, High-Tech 3D Diorama)
  // 4: Slide 5 (ADDIE Instructional Design Framework 2D)
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const totalSlides = 5;

  const handleNext = useCallback(() => {
    setCurrentSlide((prev) => Math.min(prev + 1, totalSlides - 1));
  }, [totalSlides]);

  const handlePrev = useCallback(() => {
    setCurrentSlide((prev) => Math.max(prev - 1, 0));
  }, []);

  // Keyboard Navigation: ArrowRight / Space / ArrowLeft
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        handlePrev();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
      setIsFullscreen(false);
    }
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        height: "100vh",
        backgroundColor: "#FFFFFF",
        color: brandColors.pantone432,
        fontFamily: "'Quicksand', -apple-system, BlinkMacSystemFont, sans-serif",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      {/* 1. TOP BRAND HEADER & UTILITY NAVIGATION */}
      <header
        style={{
          height: 64,
          borderBottom: "1px solid #EAEAEA",
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          zIndex: 30,
        }}
      >
        {/* Left: Exit & Institutional Identity */}
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <Button
            variant="outlined"
            size="small"
            onClick={() => navigate("/dashboard")}
            startIcon={<ArrowLeft size={15} />}
            sx={{
              borderColor: "#E2E8F0",
              color: brandColors.pantone432,
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "8px",
              padding: "4px 12px",
              "&:hover": {
                borderColor: brandColors.pantoneOrange,
                color: brandColors.pantoneOrange,
                backgroundColor: "rgba(255, 81, 0, 0.04)",
              },
            }}
          >
            Dashboard
          </Button>

          <div style={{ height: 24, width: 1, backgroundColor: "#E2E8F0" }} />

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Typography
              sx={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 700,
                fontSize: "13px",
                color: brandColors.pantone432,
              }}
            >
              BRAC Institute of Educational Development
            </Typography>
            <Chip
              label="Teaching & Learning"
              size="small"
              sx={{
                backgroundColor: "rgba(109, 104, 175, 0.1)",
                color: brandColors.teachingLearning,
                fontWeight: 700,
                fontSize: "11px",
                fontFamily: "'Quicksand', sans-serif",
                height: 22,
              }}
            />
          </div>
        </div>

        {/* Center: Slide Switcher Tabs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 8px",
            backgroundColor: "#F8F8F8",
            borderRadius: "24px",
            border: "1px solid #EAEAEA",
          }}
        >
          {[
            { index: 0, title: "1. Presentation Title" },
            { index: 1, title: "2. Profile & Journey" },
            { index: 2, title: "3. The Problem" },
            { index: 3, title: "4. Classroom Diorama" },
            { index: 4, title: "5. ADDIE Framework" },
          ].map((tab) => {
            const isActive = currentSlide === tab.index;
            return (
              <button
                key={tab.index}
                onClick={() => setCurrentSlide(tab.index)}
                style={{
                  border: "none",
                  backgroundColor: isActive ? "#FFFFFF" : "transparent",
                  color: isActive ? brandColors.pantoneOrange : brandColors.pantoneCoolGray7,
                  fontFamily: "'Quicksand', sans-serif",
                  fontWeight: isActive ? 700 : 600,
                  fontSize: "12px",
                  padding: "6px 14px",
                  borderRadius: "18px",
                  cursor: "pointer",
                  boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: isActive ? brandColors.pantoneOrange : "transparent",
                  }}
                />
                {tab.title}
              </button>
            );
          })}
        </div>

        {/* Right: Controls & Fullscreen */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Tooltip title={isFullscreen ? "Exit Fullscreen" : "Fullscreen Presentation"}>
            <IconButton
              size="small"
              onClick={toggleFullscreen}
              sx={{
                color: brandColors.pantone432,
                border: "1px solid #E2E8F0",
                "&:hover": { borderColor: brandColors.pantoneOrange },
              }}
            >
              {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
            </IconButton>
          </Tooltip>
        </div>
      </header>

      {/* 2. MAIN SLIDE WORKSPACE (SLIDE 1, 2, 3) */}
      <main style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          {currentSlide === 0 && (
            <motion.div
              key="slide-1"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{ width: "100%", height: "100%" }}
            >
              <TitleSlide2D onNextSlide={handleNext} />
            </motion.div>
          )}

          {currentSlide === 1 && (
            <motion.div
              key="slide-2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{ width: "100%", height: "100%" }}
            >
              <ProfileBackgroundSlide2D
                onPrevSlide={handlePrev}
                onNextSlide={handleNext}
              />
            </motion.div>
          )}

          {currentSlide === 2 && (
            <motion.div
              key="slide-3"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{ width: "100%", height: "100%" }}
            >
              <ProblemSlide2D
                onPrevSlide={handlePrev}
                onNextSlide={handleNext}
              />
            </motion.div>
          )}

          {currentSlide === 3 && (
            <motion.div
              key="slide-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{ width: "100%", height: "100%" }}
            >
              <ClassroomTypesSlide3D
                onPrevSlide={handlePrev}
                onNextSlide={handleNext}
              />
            </motion.div>
          )}

          {currentSlide === 4 && (
            <motion.div
              key="slide-5"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{ width: "100%", height: "100%" }}
            >
              <AddieSlide2D
                onPrevSlide={handlePrev}
                onNextSlide={handleNext}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* 3. BOTTOM PRESENTATION DOCK & SLIDE CONTROLLER */}
      <footer
        style={{
          height: 54,
          borderTop: "1px solid #EAEAEA",
          backgroundColor: "#FFFFFF",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 28px",
          zIndex: 30,
        }}
      >
        {/* Left: Presentation Branding Tag */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <PresentationIcon size={16} color={brandColors.pantoneOrange} />
          <Typography
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              color: brandColors.pantone432,
            }}
          >
            Instruction technology for enhanced Learnng
          </Typography>
          <span style={{ color: "#E2E8F0" }}>|</span>
          <Typography
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "11px",
              fontWeight: 600,
              color: brandColors.pantoneCoolGray7,
            }}
          >
            {currentSlide === 0
              ? "Slide 1: Presentation Title"
              : currentSlide === 1
              ? "Slide 2: Professional Profile & EdTech Journey"
              : currentSlide === 2
              ? "Slide 3: The Problem (Constellation Problem Map)"
              : "Slide 4: Classroom Environments (3D Stress-Test Diorama)"}
          </Typography>
        </div>

        {/* Center: Slide Progress Bar */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 160,
              height: 5,
              backgroundColor: "#F1F5F9",
              borderRadius: 3,
              overflow: "hidden",
            }}
          >
            <motion.div
              style={{
                height: "100%",
                backgroundColor: brandColors.pantoneOrange,
                borderRadius: 3,
              }}
              animate={{
                width: `${((currentSlide + 1) / totalSlides) * 100}%`,
              }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
            />
          </div>
          <Typography
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "11px",
              fontWeight: 700,
              color: brandColors.pantone432,
            }}
          >
            {currentSlide + 1} / {totalSlides}
          </Typography>
        </div>

        {/* Right: Prev / Next Slide Navigation Buttons */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Button
            size="small"
            disabled={currentSlide === 0}
            onClick={handlePrev}
            startIcon={<ChevronLeft size={16} />}
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              textTransform: "none",
              color: currentSlide === 0 ? brandColors.pantoneCoolGray7 : brandColors.pantone432,
              borderColor: "#E2E8F0",
              "&:hover": { borderColor: brandColors.pantoneOrange },
            }}
          >
            Previous
          </Button>

          <Button
            variant="contained"
            size="small"
            disabled={currentSlide === totalSlides - 1}
            onClick={handleNext}
            endIcon={<ChevronRight size={16} />}
            sx={{
              backgroundColor: brandColors.pantoneOrange,
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              textTransform: "none",
              borderRadius: "8px",
              padding: "4px 14px",
              boxShadow: "0 2px 8px rgba(255, 81, 0, 0.2)",
              "&:hover": { backgroundColor: "#E04800" },
              "&:disabled": {
                backgroundColor: "#F1F5F9",
                color: "#94A3B8",
              },
            }}
          >
            Next Slide
          </Button>
        </div>
      </footer>
    </div>
  );
};
