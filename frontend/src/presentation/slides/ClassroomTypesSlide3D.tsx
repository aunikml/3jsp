import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Typography, Tooltip, IconButton, Slider } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Sparkles,
  Play,
  Pause,
  X,
  Target,
  Compass,
  Users,
  Activity,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
} from "lucide-react";
import { WebGLErrorBoundary } from "../../components/three/WebGLErrorBoundary";
import { brandColors } from "../../theme/theme";
import { ClassroomDiorama3D } from "../three/ClassroomDiorama3D";
import {
  ClassroomMode,
  HotspotData,
  CLASSROOM_HOTSPOTS,
} from "../three/classroomHotspotsData";
import {
  calculateTelemetry,
  LowTechSubMode,
} from "../three/ClassroomSimulationEngine";
import { Monitor, FileSpreadsheet } from "lucide-react";

interface ClassroomTypesSlide3DProps {
  onPrevSlide?: () => void;
  onNextSlide?: () => void;
}

export const ClassroomTypesSlide3D: React.FC<ClassroomTypesSlide3DProps> = () => {
  const [mode, setMode] = useState<ClassroomMode>("traditional");
  const [lowTechSubMode, setLowTechSubMode] = useState<LowTechSubMode>("standard");
  const [classSize, setClassSize] = useState<number>(35);
  const [activeHotspot, setActiveHotspot] = useState<HotspotData | null>(
    CLASSROOM_HOTSPOTS["traditional"][0]
  );
  const [autoRotate, setAutoRotate] = useState<boolean>(false);
  const [showSlide3Mapping, setShowSlide3Mapping] = useState<boolean>(false);

  // Compute live pedagogical telemetry dynamically
  const telemetry = calculateTelemetry(mode, classSize, lowTechSubMode);

  const handleModeChange = (newMode: ClassroomMode) => {
    setMode(newMode);
    setActiveHotspot(CLASSROOM_HOTSPOTS[newMode][0]);
  };

  const handleSelectHotspot = (hotspot: HotspotData) => {
    if (activeHotspot?.id === hotspot.id) {
      setActiveHotspot(null);
    } else {
      setActiveHotspot(hotspot);
    }
  };

  const modeData = {
    traditional: {
      name: "Traditional Classroom",
      badge: "Teacher-Centered Learning",
      color: "#4A5568",
      accent: "#D97706",
      bgLight: "#F8FAFC",
      summary: "Direct instruction anchored by blackboard demonstration and uniform textbooks.",
      roleNarrative: "Accumulation of Slide 3 bottlenecks: rigid seating, high grading latency, and back-row disengagement.",
    },
    lowtech: {
      name:
        lowTechSubMode === "standard"
          ? "Low-Tech Resource Classroom"
          : "Low-Tech: Shared Computer Lab Shift",
      badge:
        lowTechSubMode === "standard"
          ? "Resource-Supported Learning"
          : "Scheduled EdTech Shift",
      color: brandColors.teachingLearning, // #6D68AF
      accent: lowTechSubMode === "standard" ? "#10B981" : "#38BDF8",
      bgLight: "#F5F3FF",
      summary:
        lowTechSubMode === "standard"
          ? "Forward-facing desks with Overhead Projector (OHP), transparencies, and peer manipulatives."
          : "Shifted cohort in shared computer lab workstation: 2 students per PC with scheduled software tasks.",
      roleNarrative:
        lowTechSubMode === "standard"
          ? "Solution 1 to Slide 3: Front-facing OHP focuses visual attention; shared transparencies cut textbook printing deficits."
          : "Low-Resource School Reality: Shifting classes to a shared lab provides high-impact EdTech access without costly 1:1 hardware in every room.",
    },
    virtual: {
      name: "Virtual / Online Classes",
      badge: "Pure Screen Conference",
      color: "#0284C7", // Cyan/Sky Blue
      accent: "#38BDF8",
      bgLight: "#F0F9FF",
      summary: "Zero physical classroom: An all-digital interactive conference screen where the teacher, slides, and all students exist in a connected video tile matrix.",
      roleNarrative: "Total dissolution of physical boundaries: Eliminates travel and room capacity limits while automated LMS tests return instant grades.",
    },
    hightech: {
      name: "High-Tech Resource Classroom",
      badge: "Technology-Enhanced Learning",
      color: brandColors.pantoneOrange, // #FF5100
      accent: brandColors.climateChange, // #44C8F5
      bgLight: "#FFF7ED",
      summary: "Ubiquitous digital ecosystem with interactive displays, 1:1 devices, LMS, and AI diagnostics.",
      roleNarrative: "Solution 3 to Slide 3: Self-paced digital branching solves student learning level gaps; AI delivers instant feedback.",
    },
  }[mode];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        padding: "14px 28px 16px 28px",
      }}
    >
      {/* 1. TOP CONTROLS & ENVIRONMENT SELECTOR */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 8,
          zIndex: 30,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: brandColors.pantoneOrange,
              }}
            />
            <Typography
              sx={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 700,
                fontSize: "12px",
                color: brandColors.pantoneOrange,
                letterSpacing: "0.8px",
                textTransform: "uppercase",
              }}
            >
              Slide 04 • Dynamic Pedagogical Stress-Test Simulation
            </Typography>
          </div>
          <Typography
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
              fontSize: "23px",
              color: brandColors.pantone432,
              letterSpacing: "-0.4px",
            }}
          >
            Classroom Resources: From Traditional to High-Tech
          </Typography>
        </div>

        {/* Top Controls: Mode Switcher & Slider & Slide 3 Link */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Environment Mode Switcher */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 6px",
              backgroundColor: "#F8F8F8",
              borderRadius: "24px",
              border: "1px solid #EAEAEA",
            }}
          >
            {[
              { id: "traditional" as ClassroomMode, label: "1. Traditional" },
              { id: "lowtech" as ClassroomMode, label: "2. Low-Tech Resource" },
              { id: "virtual" as ClassroomMode, label: "3. Virtual/Online" },
              { id: "hightech" as ClassroomMode, label: "4. High-Tech Resource" },
            ].map((tab) => {
              const isActive = mode === tab.id;
              const color =
                tab.id === "traditional"
                  ? "#4A5568"
                  : tab.id === "lowtech"
                  ? brandColors.teachingLearning
                  : tab.id === "virtual"
                  ? "#0284C7"
                  : brandColors.pantoneOrange;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleModeChange(tab.id)}
                  style={{
                    border: "none",
                    backgroundColor: isActive ? "#FFFFFF" : "transparent",
                    color: isActive ? color : brandColors.pantoneCoolGray7,
                    fontFamily: "'Quicksand', sans-serif",
                    fontWeight: isActive ? 800 : 600,
                    fontSize: "11.5px",
                    padding: "5px 12px",
                    borderRadius: "18px",
                    cursor: "pointer",
                    boxShadow: isActive ? "0 2px 8px rgba(0,0,0,0.06)" : "none",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor: isActive ? color : "transparent",
                    }}
                  />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Slide 3 Problem/Solution Alignment Pill */}
          <button
            onClick={() => setShowSlide3Mapping(!showSlide3Mapping)}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "5px 12px",
              borderRadius: "18px",
              border: showSlide3Mapping ? `2px solid ${modeData.color}` : "1.5px solid #CBD5E1",
              backgroundColor: showSlide3Mapping ? `${modeData.color}15` : "#FFFFFF",
              color: showSlide3Mapping ? modeData.color : brandColors.pantone432,
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
              fontSize: "11.5px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <Lightbulb size={14} color={modeData.color} />
            {mode === "traditional" ? "Slide 3 Breakdown" : "Slide 3 Solutions"}
          </button>

          {/* Low-Tech Computer Lab Morph Toggle (Only visible in Low-Tech Mode) */}
          {mode === "lowtech" && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#EDE9FE",
                borderRadius: "20px",
                padding: "2px 4px",
                border: "1px solid #DDD6FE",
                boxShadow: "0 2px 6px rgba(109, 104, 175, 0.15)",
              }}
            >
              <button
                onClick={() => setLowTechSubMode("standard")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "4px 10px",
                  borderRadius: "16px",
                  border: "none",
                  backgroundColor:
                    lowTechSubMode === "standard"
                      ? brandColors.teachingLearning
                      : "transparent",
                  color:
                    lowTechSubMode === "standard" ? "#FFFFFF" : brandColors.teachingLearning,
                  fontFamily: "'Quicksand', sans-serif",
                  fontWeight: 800,
                  fontSize: "11px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                title="Standard Low-Tech Classroom with Overhead Projector & Transparencies"
              >
                <FileSpreadsheet size={13} />
                <span>OHP Classroom</span>
              </button>
              <button
                onClick={() => setLowTechSubMode("computer_lab")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "4px 10px",
                  borderRadius: "16px",
                  border: "none",
                  backgroundColor:
                    lowTechSubMode === "computer_lab"
                      ? brandColors.teachingLearning
                      : "transparent",
                  color:
                    lowTechSubMode === "computer_lab" ? "#FFFFFF" : brandColors.teachingLearning,
                  fontFamily: "'Quicksand', sans-serif",
                  fontWeight: 800,
                  fontSize: "11px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                title="Shift Cohort to Shared School Computer Lab (e.g. Sheikh Russel Lab)"
              >
                <Monitor size={13} />
                <span>Shift to Computer Lab</span>
              </button>
            </div>
          )}

          {/* 3D Orbit & Rotation Controls */}
          <Tooltip title={autoRotate ? "Pause Diorama Orbit" : "Auto-Rotate Diorama"}>
            <IconButton
              size="small"
              onClick={() => setAutoRotate(!autoRotate)}
              sx={{
                border: "1px solid #E2E8F0",
                color: autoRotate ? brandColors.pantoneOrange : brandColors.pantone432,
                "&:hover": { borderColor: brandColors.pantoneOrange },
              }}
            >
              {autoRotate ? <Pause size={14} /> : <Play size={14} />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Reset View">
            <IconButton
              size="small"
              onClick={() => {
                setActiveHotspot(CLASSROOM_HOTSPOTS[mode][0]);
                setClassSize(35);
                setAutoRotate(false);
              }}
              sx={{
                border: "1px solid #E2E8F0",
                color: brandColors.pantone432,
                "&:hover": { borderColor: brandColors.pantoneOrange },
              }}
            >
              <RotateCcw size={14} />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* 2. MAIN 3D WORKSPACE STAGE WITH SIMULATION ENGINE */}
      <div
        style={{
          flex: 1,
          position: "relative",
          width: "100%",
          borderRadius: "16px",
          backgroundColor: "#FAFAFA",
          border: "1px solid #F1F5F9",
          overflow: "hidden",
          minHeight: 0,
        }}
      >
        {/* HUD: INTERACTIVE CLASS SIZE MODULATOR (TOP-LEFT) */}
        <div
          style={{
            position: "absolute",
            top: 14,
            left: 18,
            zIndex: 10,
            display: "flex",
            flexDirection: "column",
            gap: 6,
            backgroundColor: "rgba(255, 255, 255, 0.94)",
            backdropFilter: "blur(10px)",
            borderRadius: "14px",
            border: `1.5px solid ${modeData.color}35`,
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            padding: "12px 16px",
            width: 290,
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Users size={15} color={modeData.color} />
              <Typography
                sx={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: "12px",
                  fontWeight: 800,
                  color: brandColors.pantone432,
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                Class Size Stress-Test
              </Typography>
            </div>
            <span
              style={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: "13px",
                fontWeight: 800,
                color: modeData.color,
                backgroundColor: `${modeData.color}15`,
                padding: "2px 8px",
                borderRadius: "10px",
              }}
            >
              {classSize} Students
            </span>
          </div>

          {/* Slider */}
          <Slider
            value={classSize}
            min={20}
            max={65}
            step={5}
            onChange={(_, val) => setClassSize(val as number)}
            sx={{
              color: modeData.color,
              padding: "8px 0",
              "& .MuiSlider-thumb": {
                width: 14,
                height: 14,
                "&:hover, &.Mui-focusVisible": {
                  boxShadow: `0px 0px 0px 6px ${modeData.color}25`,
                },
              },
            }}
          />

          {/* Quick presets */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            {[
              { val: 20, label: "20 Std" },
              { val: 35, label: "35 Dense" },
              { val: 50, label: "50 Crowded" },
              { val: 65, label: "65 Extreme" },
            ].map((p) => (
              <button
                key={p.val}
                onClick={() => setClassSize(p.val)}
                style={{
                  border: "none",
                  backgroundColor: classSize === p.val ? modeData.color : "#F1F5F9",
                  color: classSize === p.val ? "#FFFFFF" : brandColors.pantone432,
                  fontFamily: "'Quicksand', sans-serif",
                  fontWeight: 700,
                  fontSize: "10px",
                  padding: "2px 6px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                }}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* HUD: LIVE PEDAGOGICAL TELEMETRY GAUGES (BOTTOM-LEFT) */}
        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: 18,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "rgba(255, 255, 255, 0.94)",
            backdropFilter: "blur(10px)",
            borderRadius: "14px",
            border: "1px solid #E2E8F0",
            boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
            padding: "8px 14px",
          }}
        >
          {/* Engagement Meter */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Activity size={14} color={modeData.color} />
            <div>
              <span
                style={{
                  display: "block",
                  fontSize: "9.5px",
                  fontWeight: 700,
                  color: brandColors.pantoneCoolGray7,
                  textTransform: "uppercase",
                }}
              >
                Engagement Rate
              </span>
              <span
                style={{
                  fontSize: "13px",
                  fontWeight: 800,
                  color:
                    telemetry.engagementPercentage >= 80
                      ? "#059669"
                      : telemetry.engagementPercentage >= 50
                      ? "#D97706"
                      : "#DC2626",
                }}
              >
                {telemetry.engagementPercentage}%
              </span>
            </div>
          </div>

          <div style={{ width: 1, height: 26, backgroundColor: "#E2E8F0" }} />

          {/* Feedback Latency */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Clock size={14} color={modeData.color} />
            <div>
              <span
                style={{
                  display: "block",
                  fontSize: "9.5px",
                  fontWeight: 700,
                  color: brandColors.pantoneCoolGray7,
                  textTransform: "uppercase",
                }}
              >
                Feedback Latency
              </span>
              <span
                style={{
                  fontSize: "11.5px",
                  fontWeight: 700,
                  color: brandColors.pantone432,
                }}
              >
                {telemetry.feedbackLatency}
              </span>
            </div>
          </div>

          <div style={{ width: 1, height: 26, backgroundColor: "#E2E8F0" }} />

          {/* Differentiation */}
          <div>
            <span
              style={{
                display: "block",
                fontSize: "9.5px",
                fontWeight: 700,
                color: brandColors.pantoneCoolGray7,
                textTransform: "uppercase",
              }}
            >
              Instructional Pacing
            </span>
            <span
              style={{
                fontSize: "11.5px",
                fontWeight: 700,
                color: modeData.color,
              }}
            >
              {telemetry.differentiationModel}
            </span>
          </div>
        </div>

        {/* 3D WebGL Canvas */}
        <div style={{ width: "100%", height: "100%" }}>
          <WebGLErrorBoundary>
            <Canvas
              shadows
              camera={{ position: [8.5, 6.8, 8.5], fov: 38 }}
              style={{ width: "100%", height: "100%" }}
            >
              <ClassroomDiorama3D
                mode={mode}
                lowTechSubMode={lowTechSubMode}
                classSize={classSize}
                telemetry={telemetry}
                activeHotspotId={activeHotspot?.id || null}
                onSelectHotspot={handleSelectHotspot}
                autoRotate={autoRotate}
              />
            </Canvas>
          </WebGLErrorBoundary>
        </div>

        {/* FLOATING INSPECTION DETAIL DRAWER (TOP-RIGHT) */}
        <AnimatePresence>
          {activeHotspot && !showSlide3Mapping && (
            <motion.div
              key={activeHotspot.id}
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: 14,
                right: 18,
                width: 310,
                backgroundColor: "rgba(255, 255, 255, 0.96)",
                backdropFilter: "blur(12px)",
                borderRadius: "14px",
                border: `2px solid ${modeData.color}`,
                boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
                padding: "16px 18px",
                zIndex: 20,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              {/* Card Header */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #F1F5F9",
                  paddingBottom: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 26,
                      height: 26,
                      borderRadius: "50%",
                      backgroundColor: modeData.color,
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontFamily: "'Quicksand', sans-serif",
                      fontWeight: 800,
                      fontSize: "12px",
                    }}
                  >
                    {activeHotspot.pinNumber}
                  </div>
                  <div>
                    <span
                      style={{
                        fontSize: "9.5px",
                        fontWeight: 800,
                        textTransform: "uppercase",
                        color: modeData.color,
                        fontFamily: "'Quicksand', sans-serif",
                        letterSpacing: "0.5px",
                      }}
                    >
                      {activeHotspot.category}
                    </span>
                    <Typography
                      sx={{
                        fontFamily: "'Quicksand', sans-serif",
                        fontWeight: 800,
                        fontSize: "15px",
                        color: brandColors.pantone432,
                        lineHeight: 1.25,
                      }}
                    >
                      {activeHotspot.title}
                    </Typography>
                  </div>
                </div>

                <IconButton
                  size="small"
                  onClick={() => setActiveHotspot(null)}
                  sx={{ color: brandColors.pantoneCoolGray7 }}
                >
                  <X size={15} />
                </IconButton>
              </div>

              {/* Description */}
              <Typography
                sx={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontSize: "12.5px",
                  color: brandColors.pantone432,
                  lineHeight: 1.4,
                  fontWeight: 600,
                }}
              >
                {activeHotspot.description}
              </Typography>

              {/* Pedagogical Function Box */}
              <div
                style={{
                  backgroundColor: modeData.bgLight,
                  borderRadius: "8px",
                  padding: "8px 10px",
                  border: `1px solid ${modeData.color}25`,
                }}
              >
                <span
                  style={{
                    fontSize: "9.5px",
                    fontWeight: 800,
                    textTransform: "uppercase",
                    color: modeData.color,
                    fontFamily: "'Quicksand', sans-serif",
                    display: "block",
                    marginBottom: 2,
                  }}
                >
                  Pedagogical Role:
                </span>
                <Typography
                  sx={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: "11.5px",
                    color: brandColors.pantone432,
                    fontWeight: 600,
                    lineHeight: 1.35,
                  }}
                >
                  {activeHotspot.pedagogicalRole}
                </Typography>
              </div>

              {/* Key Characteristic Badge */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  padding: "5px 8px",
                  backgroundColor: "#F8FAFC",
                  borderRadius: "6px",
                  border: "1px solid #E2E8F0",
                }}
              >
                <Target size={13} color={modeData.color} />
                <Typography
                  sx={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: "11px",
                    fontWeight: 700,
                    color: brandColors.pantone432,
                  }}
                >
                  {activeHotspot.keyFeature}
                </Typography>
              </div>
            </motion.div>
          )}

          {/* SLIDE 3 PROBLEM / SOLUTION OVERLAY DRAWER */}
          {showSlide3Mapping && (
            <motion.div
              key="slide-3-mapping-drawer"
              initial={{ opacity: 0, x: 50, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 50, scale: 0.95 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                position: "absolute",
                top: 14,
                right: 18,
                width: 340,
                backgroundColor: "rgba(255, 255, 255, 0.97)",
                backdropFilter: "blur(12px)",
                borderRadius: "14px",
                border: `2px solid ${modeData.color}`,
                boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                padding: "16px 18px",
                zIndex: 25,
                display: "flex",
                flexDirection: "column",
                gap: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #F1F5F9",
                  paddingBottom: 8,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  {mode === "traditional" ? (
                    <AlertTriangle size={18} color="#DC2626" />
                  ) : (
                    <CheckCircle2 size={18} color="#059669" />
                  )}
                  <div>
                    <Typography
                      sx={{
                        fontFamily: "'Quicksand', sans-serif",
                        fontWeight: 800,
                        fontSize: "14.5px",
                        color: brandColors.pantone432,
                      }}
                    >
                      {mode === "traditional"
                        ? "Slide 3: Problem Breakdown"
                        : "Slide 3: Solutions Deployed"}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Quicksand', sans-serif",
                        fontSize: "11px",
                        color: brandColors.pantoneCoolGray7,
                        fontWeight: 600,
                      }}
                    >
                      {modeData.roleNarrative}
                    </Typography>
                  </div>
                </div>

                <IconButton
                  size="small"
                  onClick={() => setShowSlide3Mapping(false)}
                  sx={{ color: brandColors.pantoneCoolGray7 }}
                >
                  <X size={15} />
                </IconButton>
              </div>

              {/* List of Slide 3 Challenges and their status in this environment */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {telemetry.slide3ProblemsSolved.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "8px 10px",
                      borderRadius: "8px",
                      backgroundColor: item.isResolved ? "#F0FDF4" : "#FEF2F2",
                      border: `1px solid ${item.isResolved ? "#BBF7D0" : "#FECACA"}`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        marginBottom: 2,
                      }}
                    >
                      <span
                        style={{
                          fontSize: "9.5px",
                          fontWeight: 800,
                          textTransform: "uppercase",
                          color: item.isResolved ? "#166534" : "#991B1B",
                          fontFamily: "'Quicksand', sans-serif",
                        }}
                      >
                        {item.category} Challenge
                      </span>
                      <span
                        style={{
                          fontSize: "9px",
                          fontWeight: 800,
                          padding: "1px 6px",
                          borderRadius: "6px",
                          backgroundColor: item.isResolved ? "#DCFCE7" : "#FEE2E2",
                          color: item.isResolved ? "#15803D" : "#B91C1C",
                        }}
                      >
                        {item.isResolved ? "SOLVED" : "STRAINED"}
                      </span>
                    </div>

                    <Typography
                      sx={{
                        fontFamily: "'Quicksand', sans-serif",
                        fontSize: "11.5px",
                        fontWeight: 700,
                        color: brandColors.pantone432,
                        lineHeight: 1.25,
                      }}
                    >
                      {item.problemText}
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Quicksand', sans-serif",
                        fontSize: "11px",
                        color: brandColors.pantoneCoolGray7,
                        fontWeight: 600,
                        marginTop: "3px",
                        lineHeight: 1.3,
                      }}
                    >
                      {item.resolutionNote}
                    </Typography>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Orbit Helper Tip */}
        <div
          style={{
            position: "absolute",
            bottom: 14,
            right: 18,
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "4px 10px",
            backgroundColor: "rgba(255, 255, 255, 0.88)",
            backdropFilter: "blur(6px)",
            borderRadius: "12px",
            border: "1px solid #E2E8F0",
            pointerEvents: "none",
          }}
        >
          <Compass size={13} color={brandColors.pantoneCoolGray7} />
          <Typography
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "10.5px",
              fontWeight: 600,
              color: brandColors.pantoneCoolGray7,
            }}
          >
            Drag to orbit 3D stage • Scroll to zoom • Adjust student slider
          </Typography>
        </div>
      </div>

      {/* 3. CORE TAKEAWAY BANNER */}
      <div
        style={{
          marginTop: 10,
          padding: "8px 16px",
          backgroundColor: "#FFF7ED",
          borderRadius: "12px",
          border: `1.5px solid ${brandColors.pantoneOrange}40`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 30,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 24,
              height: 24,
              borderRadius: "50%",
              backgroundColor: brandColors.pantoneOrange,
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Sparkles size={14} />
          </div>
          <Typography
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "12.5px",
              fontWeight: 700,
              color: brandColors.pantone432,
            }}
          >
            <strong>Central Principle:</strong> &ldquo;Effective teaching depends on how resources are used to support learning, not simply on how much technology a classroom contains.&rdquo;
          </Typography>
        </div>

        <span
          style={{
            padding: "3px 10px",
            backgroundColor: "#FFFFFF",
            borderRadius: "12px",
            fontSize: "10.5px",
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 700,
            color: brandColors.pantoneCoolGray7,
            border: "1px solid #EAEAEA",
          }}
        >
          Slide 4 of 4
        </span>
      </div>
    </div>
  );
};
