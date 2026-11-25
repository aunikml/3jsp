import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Compass,
  Hammer,
  PlayCircle,
  Award,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Sparkles,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  LucideIcon,
  Monitor,
} from "lucide-react";
import { brandColors } from "../../theme/theme";
import { LmsImplementationSimulation } from "../components/LmsImplementationSimulation";

interface AddieStage {
  id: "A" | "D1" | "D2" | "I" | "E";
  letter: string;
  name: string;
  color: string;
  accent: string;
  icon: LucideIcon;
  explanation: string;
  guidingQuestion: string;
  classroomExample: string;
  angle: number; // in degrees for circular layout (0 at top, clockwise)
}

const ADDIE_STAGES: AddieStage[] = [
  {
    id: "A",
    letter: "A",
    name: "Analyze",
    color: "#FF5100", // BRAC Pantone Orange
    accent: "#FFF7ED",
    icon: Search,
    explanation:
      "Understand the learners, their needs, the learning objectives, and the challenges they face.",
    guidingQuestion: "What do my learners need to learn?",
    classroomExample:
      "Students understand plants but struggle to explain how plants make their own food.",
    angle: -90, // Top
  },
  {
    id: "D1",
    letter: "D",
    name: "Design",
    color: "#6D68AF", // Teaching & Learning Purple
    accent: "#F5F3FF",
    icon: Compass,
    explanation:
      "Plan the lesson, learning activities, teaching strategies, resources, and assessment methods.",
    guidingQuestion: "How will I help them learn?",
    classroomExample:
      "Plan a lesson using an animation, group discussion, and a short quiz.",
    angle: -18, // Top-Right
  },
  {
    id: "D2",
    letter: "D",
    name: "Develop",
    color: "#0284C7", // Cyan / Ocean Blue
    accent: "#F0F9FF",
    icon: Hammer,
    explanation:
      "Create the actual learning materials, presentations, worksheets, videos, or digital resources.",
    guidingQuestion: "What materials do I need to prepare?",
    classroomExample:
      "Create an animation, worksheet, and quiz about photosynthesis.",
    angle: 54, // Bottom-Right
  },
  {
    id: "I",
    letter: "I",
    name: "Implement",
    color: "#10B981", // Emerald Green
    accent: "#ECFDF5",
    icon: PlayCircle,
    explanation:
      "Deliver the lesson and facilitate learning using the planned activities and resources.",
    guidingQuestion: "How will I deliver the learning experience?",
    classroomExample:
      "Teach the lesson and let students explore the animation and discuss their observations.",
    angle: 126, // Bottom-Left
  },
  {
    id: "E",
    letter: "E",
    name: "Evaluate",
    color: "#D97706", // Amber
    accent: "#FFFBEB",
    icon: Award,
    explanation:
      "Check whether learners achieved the objectives and identify what needs to be improved.",
    guidingQuestion: "Did the learning experience work?",
    classroomExample:
      "Review quiz results and student explanations to determine whether they understood photosynthesis.",
    angle: 198, // Top-Left
  },
];

interface AddieSlide2DProps {
  onPrevSlide?: () => void;
  onNextSlide?: () => void;
}

export const AddieSlide2D: React.FC<AddieSlide2DProps> = () => {
  // activeStageIndex: null means overview state (all stages visible)
  const [activeStageIndex, setActiveStageIndex] = useState<number | null>(null);
  const [isCycleComplete, setIsCycleComplete] = useState<boolean>(false);
  const [showLmsDemo, setShowLmsDemo] = useState<boolean>(false);

  const activeStage =
    activeStageIndex !== null ? ADDIE_STAGES[activeStageIndex] : null;

  // Navigation handlers
  const handleNextStage = () => {
    if (activeStageIndex === null) {
      setActiveStageIndex(0);
      setIsCycleComplete(false);
      setShowLmsDemo(false);
    } else if (activeStageIndex < ADDIE_STAGES.length - 1) {
      const nextIndex = activeStageIndex + 1;
      setActiveStageIndex(nextIndex);
      // Auto-open LMS feature when reaching I — Implement stage (index 3)
      if (nextIndex === 3) {
        setShowLmsDemo(true);
      } else {
        setShowLmsDemo(false);
      }
    } else {
      // Completed all 5 stages: transition to continuous cycle overview
      setActiveStageIndex(null);
      setIsCycleComplete(true);
      setShowLmsDemo(false);
    }
  };

  const handlePrevStage = () => {
    if (activeStageIndex === null) {
      if (isCycleComplete) {
        setActiveStageIndex(ADDIE_STAGES.length - 1);
        setIsCycleComplete(false);
        setShowLmsDemo(false);
      } else {
        setActiveStageIndex(0);
        setShowLmsDemo(false);
      }
    } else if (activeStageIndex > 0) {
      const prevIndex = activeStageIndex - 1;
      setActiveStageIndex(prevIndex);
      if (prevIndex === 3) {
        setShowLmsDemo(true);
      } else {
        setShowLmsDemo(false);
      }
    } else {
      setActiveStageIndex(null);
      setIsCycleComplete(false);
      setShowLmsDemo(false);
    }
  };

  const handleReset = () => {
    setActiveStageIndex(null);
    setIsCycleComplete(false);
    setShowLmsDemo(false);
  };

  const handleSelectStage = (index: number) => {
    setActiveStageIndex(index);
    setIsCycleComplete(false);
    // If selecting Implement stage directly, open the LMS feature
    if (index === 3) {
      setShowLmsDemo(true);
    } else {
      setShowLmsDemo(false);
    }
  };

  // Dimensions for SVG Circular Layout
  const svgSize = 520;
  const center = svgSize / 2;
  const radius = 175;

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
        padding: "18px 36px 20px 36px",
      }}
    >
      {/* 1. TOP HEADER & EDUCATIONAL BREADCRUMB */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
          flexShrink: 0,
        }}
      >
        <div>
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
              Slide 05 • Instructional Design Framework
            </Typography>
          </div>
          <Typography
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
              fontSize: "25px",
              color: brandColors.pantone432,
              letterSpacing: "-0.4px",
            }}
          >
            ADDIE: A Framework for Designing Effective Learning
          </Typography>
        </div>

        {/* Minimal Presentation Controls (Back, Continue, Reset) */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Button
            size="small"
            onClick={handlePrevStage}
            disabled={activeStageIndex === null && !isCycleComplete}
            startIcon={<ChevronLeft size={16} />}
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              textTransform: "none",
              color: brandColors.pantone432,
              borderColor: "#E2E8F0",
              borderRadius: "8px",
              padding: "4px 12px",
              "&:hover": { borderColor: brandColors.pantoneOrange },
            }}
            variant="outlined"
          >
            Back
          </Button>

          <Button
            size="small"
            onClick={handleNextStage}
            endIcon={<ChevronRight size={16} />}
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              textTransform: "none",
              backgroundColor: brandColors.pantoneOrange,
              color: "#FFFFFF",
              borderRadius: "8px",
              padding: "5px 16px",
              boxShadow: "0 2px 8px rgba(255, 81, 0, 0.25)",
              "&:hover": { backgroundColor: "#E04800" },
            }}
            variant="contained"
          >
            {activeStageIndex === null
              ? isCycleComplete
                ? "Explore Again"
                : "Explore ADDIE"
              : activeStageIndex === ADDIE_STAGES.length - 1
              ? "Complete Cycle"
              : "Continue"}
          </Button>

          <Button
            size="small"
            onClick={handleReset}
            startIcon={<RotateCcw size={14} />}
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 600,
              fontSize: "12px",
              textTransform: "none",
              color: brandColors.pantoneCoolGray7,
              borderRadius: "8px",
              padding: "4px 10px",
            }}
          >
            Reset
          </Button>
        </div>
      </div>

      {/* 2. MAIN INTERACTIVE STAGE: CIRCULAR ADDIE FRAMEWORK + DEDICATED INFO PANEL */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          gap: 36,
          minHeight: 0,
        }}
      >
        {/* LEFT / CENTER: THE 5-STAGE CIRCULAR ADDIE FRAMEWORK */}
        <motion.div
          animate={{
            x: activeStage !== null ? -30 : 0,
            scale: activeStage !== null ? 0.94 : 1.0,
          }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          style={{
            position: "relative",
            width: svgSize,
            height: svgSize,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Subtle Outer Pulsing Halo */}
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              opacity: [0.35, 0.6, 0.35],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              width: radius * 2 + 130,
              height: radius * 2 + 130,
              borderRadius: "50%",
              background:
                "radial-gradient(circle, rgba(255,81,0,0.06) 0%, rgba(109,104,175,0.05) 55%, transparent 75%)",
              pointerEvents: "none",
            }}
          />

          {/* SVG Canvas for Framework Ring, Connecting Curved Directional Arrows, and Particles */}
          <svg
            width={svgSize}
            height={svgSize}
            viewBox={`0 0 ${svgSize} ${svgSize}`}
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            <defs>
              {/* Arrowhead Markers for connecting paths */}
              {ADDIE_STAGES.map((stage) => (
                <marker
                  key={`marker-${stage.id}`}
                  id={`arrow-${stage.id}`}
                  viewBox="0 0 10 10"
                  refX="6"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 1 L 10 5 L 0 9 z" fill={stage.color} />
                </marker>
              ))}

              <marker
                id="arrow-default"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto-start-reverse"
              >
                <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#CBD5E1" />
              </marker>

              <marker
                id="arrow-active"
                viewBox="0 0 10 10"
                refX="6"
                refY="5"
                markerWidth="7"
                markerHeight="7"
                orient="auto-start-reverse"
              >
                <path
                  d="M 0 1 L 10 5 L 0 9 z"
                  fill={activeStage ? activeStage.color : brandColors.pantoneOrange}
                />
              </marker>
            </defs>

            {/* Background Circular Ring Outline */}
            <circle
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="2.5"
              strokeDasharray="4 6"
            />

            {/* CURVED DIRECTIONAL ARROWS CONNECTING THE 5 NODES (A -> D -> D -> I -> E -> A) */}
            {ADDIE_STAGES.map((fromStage, idx) => {
              const toStage = ADDIE_STAGES[(idx + 1) % ADDIE_STAGES.length];

              // Angular positions in radians (offset to stop at node boundaries)
              const fromRad = (fromStage.angle * Math.PI) / 180;
              const toRad = (toStage.angle * Math.PI) / 180;

              // Angular margin around nodes (node radius ~ 38px -> ~14 degrees)
              const margin = 0.28;
              const startAngle = fromRad + margin;
              const endAngle = toRad - margin;

              const x1 = center + radius * Math.cos(startAngle);
              const y1 = center + radius * Math.sin(startAngle);
              const x2 = center + radius * Math.cos(endAngle);
              const y2 = center + radius * Math.sin(endAngle);

              // SVG Arc path along circle: A rx ry x-axis-rotation large-arc-flag sweep-flag x y
              const pathD = `M ${x1} ${y1} A ${radius} ${radius} 0 0 1 ${x2} ${y2}`;

              // Is this arrow pointing toward the currently active stage?
              const isActiveArrow =
                activeStageIndex !== null &&
                (activeStageIndex === (idx + 1) % ADDIE_STAGES.length ||
                  activeStageIndex === idx);

              // Special requirement: When reaching I — Implement (idx 2 pointing to idx 3), emphasize the Develop -> Implement arrow
              const isDevelopToImplement =
                activeStageIndex === 3 && idx === 2;

              const isHighlightedInCycle = isCycleComplete;

              return (
                <g key={`arrow-path-${idx}`}>
                  {/* Subtle Background Glow for Active Arrow or Develop->Implement transition */}
                  {(isActiveArrow || isDevelopToImplement || isHighlightedInCycle) && (
                    <path
                      d={pathD}
                      fill="none"
                      stroke={isDevelopToImplement ? "#10B981" : toStage.color}
                      strokeWidth={isDevelopToImplement ? "10" : "8"}
                      strokeOpacity={isDevelopToImplement ? "0.35" : "0.2"}
                      strokeLinecap="round"
                    />
                  )}

                  {/* Main Directional Connecting Arrow */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={
                      isDevelopToImplement
                        ? "#10B981"
                        : isActiveArrow || isHighlightedInCycle
                        ? toStage.color
                        : "#CBD5E1"
                    }
                    strokeWidth={
                      isDevelopToImplement ? 4 : isActiveArrow || isHighlightedInCycle ? 3 : 2
                    }
                    markerEnd={
                      isDevelopToImplement
                        ? `url(#arrow-I)`
                        : isActiveArrow || isHighlightedInCycle
                        ? `url(#arrow-${toStage.id})`
                        : "url(#arrow-default)"
                    }
                  />
                </g>
              );
            })}

            {/* ANIMATED PARTICLES MOVING ALONG THE CIRCULAR PATH */}
            <circle cx={center} cy={center} r={radius} fill="none">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from={`0 ${center} ${center}`}
                to={`360 ${center} ${center}`}
                dur="16s"
                repeatCount="indefinite"
              />
            </circle>
          </svg>

          {/* CENTER EMBLEM: "ADDIE INSTRUCTIONAL DESIGN CYCLE" */}
          <div
            style={{
              position: "absolute",
              width: 140,
              height: 140,
              borderRadius: "50%",
              backgroundColor: "#FFFFFF",
              border: isCycleComplete
                ? `3px solid ${brandColors.pantoneOrange}`
                : "2px solid #E2E8F0",
              boxShadow: isCycleComplete
                ? "0 0 24px rgba(255, 81, 0, 0.25), 0 8px 20px rgba(0,0,0,0.06)"
                : "0 6px 18px rgba(0,0,0,0.04)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              padding: "10px",
              zIndex: 10,
              transition: "all 0.4s ease",
            }}
          >
            <Sparkles
              size={20}
              color={
                isCycleComplete
                  ? brandColors.pantoneOrange
                  : activeStage
                  ? activeStage.color
                  : brandColors.teachingLearning
              }
            />
            <Typography
              sx={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 800,
                fontSize: "14px",
                color: brandColors.pantone432,
                marginTop: "4px",
                lineHeight: 1.1,
              }}
            >
              ADDIE
            </Typography>
            <Typography
              sx={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 600,
                fontSize: "10px",
                color: brandColors.pantoneCoolGray7,
                marginTop: "2px",
              }}
            >
              Continuous Cycle
            </Typography>
          </div>

          {/* THE FIVE INTERCONNECTED ADDIE NODES */}
          {ADDIE_STAGES.map((stage, idx) => {
            const rad = (stage.angle * Math.PI) / 180;
            const x = center + radius * Math.cos(rad);
            const y = center + radius * Math.sin(rad);

            const isSelected = activeStageIndex === idx;
            const isSubdued = activeStageIndex !== null && !isSelected;
            const IconComponent = stage.icon;

            return (
              <motion.div
                key={stage.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: isSelected ? 1.18 : isSubdued ? 0.88 : 1.0,
                  opacity: isSubdued ? 0.45 : 1.0,
                }}
                transition={{
                  duration: 0.4,
                  delay: 0.1 + idx * 0.1,
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                }}
                onClick={() => handleSelectStage(idx)}
                style={{
                  position: "absolute",
                  left: x - 42,
                  top: y - 42,
                  width: 84,
                  height: 84,
                  borderRadius: "50%",
                  backgroundColor: isSelected ? stage.color : "#FFFFFF",
                  border: isSelected
                    ? `3px solid #FFFFFF`
                    : `2.5px solid ${stage.color}`,
                  boxShadow: isSelected
                    ? `0 0 24px ${stage.color}88, 0 8px 18px rgba(0,0,0,0.18)`
                    : "0 4px 14px rgba(0,0,0,0.08)",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: isSelected ? 25 : 15,
                  userSelect: "none",
                  transition: "background-color 0.3s ease, border 0.3s ease",
                }}
                title={`Explore ${stage.name}`}
              >
                {/* Node Letter Badge */}
                <div
                  style={{
                    position: "absolute",
                    top: -6,
                    right: -4,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    backgroundColor: isSelected ? "#FFFFFF" : stage.color,
                    color: isSelected ? stage.color : "#FFFFFF",
                    fontFamily: "'Quicksand', sans-serif",
                    fontWeight: 800,
                    fontSize: "11px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
                  }}
                >
                  {stage.letter}
                </div>

                {/* Educational Icon */}
                <IconComponent
                  size={24}
                  color={isSelected ? "#FFFFFF" : stage.color}
                />

                {/* Stage Name */}
                <Typography
                  sx={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontWeight: 800,
                    fontSize: "10.5px",
                    color: isSelected ? "#FFFFFF" : brandColors.pantone432,
                    marginTop: "3px",
                    textAlign: "center",
                    lineHeight: 1,
                  }}
                >
                  {stage.name}
                </Typography>
              </motion.div>
            );
          })}
        </motion.div>

        {/* RIGHT: DEDICATED INFORMATION PANEL BESIDE THE FRAMEWORK */}
        <div
          style={{
            flex: 1,
            maxWidth: showLmsDemo ? 580 : 520,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minHeight: 440,
            transition: "max-width 0.3s ease",
          }}
        >
          <AnimatePresence mode="wait">
            {/* STATE 1A: LMS INTEGRATION DEMONSTRATION (DURING I — IMPLEMENT STAGE) */}
            {activeStage?.id === "I" && showLmsDemo ? (
              <motion.div
                key="lms-demo-panel"
                initial={{ opacity: 0, x: 30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -20, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 8,
                }}
              >
                {/* Mode Switcher pill (between LMS Simulation & Standard ADDIE Card) */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 800,
                      color: "#059669",
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    ADDIE Stage 4: Implementation in Action
                  </span>
                  <Button
                    size="small"
                    onClick={() => setShowLmsDemo(false)}
                    sx={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "11px",
                      textTransform: "none",
                      color: brandColors.pantoneCoolGray7,
                    }}
                  >
                    View Text Card
                  </Button>
                </div>

                <LmsImplementationSimulation
                  onClose={() => setShowLmsDemo(false)}
                  onProceedToEvaluate={() => {
                    setActiveStageIndex(4);
                    setShowLmsDemo(false);
                  }}
                />
              </motion.div>
            ) : activeStage !== null ? (
              /* STATE 1B: STANDARD ACTIVE STAGE INSPECTION PANEL */
              <motion.div
                key={`panel-${activeStage.id}`}
                initial={{ opacity: 0, x: 30, y: 10 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                exit={{ opacity: 0, x: -20, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "18px",
                  border: `2px solid ${activeStage.color}`,
                  boxShadow: `0 14px 34px rgba(0,0,0,0.08), 0 0 20px ${activeStage.color}15`,
                  padding: "26px 30px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 18,
                }}
              >
                {/* Stage Header */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderBottom: "1px solid #F1F5F9",
                    paddingBottom: 14,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "12px",
                        backgroundColor: activeStage.color,
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontFamily: "'Quicksand', sans-serif",
                        fontWeight: 800,
                        fontSize: "20px",
                        boxShadow: `0 4px 12px ${activeStage.color}40`,
                      }}
                    >
                      {activeStage.letter}
                    </div>
                    <div>
                      <span
                        style={{
                          fontFamily: "'Quicksand', sans-serif",
                          fontWeight: 700,
                          fontSize: "11px",
                          color: activeStage.color,
                          letterSpacing: "0.8px",
                          textTransform: "uppercase",
                        }}
                      >
                        ADDIE Stage {activeStageIndex !== null ? activeStageIndex + 1 : ""}/5
                      </span>
                      <Typography
                        sx={{
                          fontFamily: "'Quicksand', sans-serif",
                          fontWeight: 800,
                          fontSize: "24px",
                          color: brandColors.pantone432,
                          lineHeight: 1.15,
                        }}
                      >
                        {activeStage.name}
                      </Typography>
                    </div>
                  </div>

                  {/* If in Implement stage, offer one-click toggle to open LMS simulation */}
                  {activeStage.id === "I" && (
                    <Button
                      size="small"
                      variant="contained"
                      onClick={() => setShowLmsDemo(true)}
                      startIcon={<Monitor size={14} />}
                      sx={{
                        fontFamily: "'Quicksand', sans-serif",
                        fontWeight: 800,
                        fontSize: "11px",
                        textTransform: "none",
                        backgroundColor: "#10B981",
                        color: "#FFFFFF",
                        borderRadius: "8px",
                        padding: "4px 12px",
                        "&:hover": { backgroundColor: "#059669" },
                      }}
                    >
                      Open LMS Demo
                    </Button>
                  )}
                </div>

                {/* 1. Explanation */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                >
                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: brandColors.pantoneCoolGray7,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Explanation
                  </span>
                  <Typography
                    sx={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontWeight: 600,
                      fontSize: "15px",
                      color: brandColors.pantone432,
                      marginTop: "3px",
                      lineHeight: 1.45,
                    }}
                  >
                    {activeStage.explanation}
                  </Typography>
                </motion.div>

                {/* 2. Guiding Question */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  style={{
                    backgroundColor: activeStage.accent,
                    borderRadius: "12px",
                    padding: "12px 16px",
                    borderLeft: `4px solid ${activeStage.color}`,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <HelpCircle size={15} color={activeStage.color} />
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 800,
                        color: activeStage.color,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Guiding Question
                    </span>
                  </div>
                  <Typography
                    sx={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontWeight: 700,
                      fontSize: "15.5px",
                      color: brandColors.pantone432,
                      marginTop: "3px",
                      lineHeight: 1.35,
                    }}
                  >
                    "{activeStage.guidingQuestion}"
                  </Typography>
                </motion.div>

                {/* 3. Classroom Example */}
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <BookOpen size={14} color={brandColors.pantoneCoolGray7} />
                    <span
                      style={{
                        fontSize: "11px",
                        fontWeight: 700,
                        color: brandColors.pantoneCoolGray7,
                        textTransform: "uppercase",
                        letterSpacing: "0.5px",
                      }}
                    >
                      Classroom Example (Photosynthesis)
                    </span>
                  </div>
                  <Typography
                    sx={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontWeight: 600,
                      fontSize: "14px",
                      color: "#334155",
                      marginTop: "4px",
                      lineHeight: 1.4,
                      backgroundColor: "#F8FAFC",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      border: "1px solid #E2E8F0",
                    }}
                  >
                    {activeStage.classroomExample}
                  </Typography>
                </motion.div>
              </motion.div>
            ) : null}

            {/* STATE 2: FINAL ANIMATION — ADDIE AS A CONTINUOUS CYCLE OVERVIEW */}
            {activeStage === null && isCycleComplete && (
              <motion.div
                key="cycle-complete-overview"
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: "easeOut" }}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "18px",
                  border: `2px solid ${brandColors.pantoneOrange}`,
                  boxShadow: "0 16px 36px rgba(255, 81, 0, 0.12)",
                  padding: "28px 32px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 38,
                      height: 38,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 81, 0, 0.1)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircle2 size={22} color={brandColors.pantoneOrange} />
                  </div>
                  <div>
                    <span
                      style={{
                        fontFamily: "'Quicksand', sans-serif",
                        fontWeight: 800,
                        fontSize: "11px",
                        color: brandColors.pantoneOrange,
                        textTransform: "uppercase",
                        letterSpacing: "0.6px",
                      }}
                    >
                      Framework Synthesis
                    </span>
                    <Typography
                      sx={{
                        fontFamily: "'Quicksand', sans-serif",
                        fontWeight: 800,
                        fontSize: "20px",
                        color: brandColors.pantone432,
                      }}
                    >
                      Instructional Design in Practice
                    </Typography>
                  </div>
                </div>

                {/* Primary Concluding Statement */}
                <Typography
                  sx={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontWeight: 700,
                    fontSize: "16px",
                    color: brandColors.pantone432,
                    lineHeight: 1.45,
                    borderLeft: `4px solid ${brandColors.teachingLearning}`,
                    paddingLeft: "14px",
                  }}
                >
                  "ADDIE is a continuous process of designing, delivering,
                  evaluating, and improving learning experiences."
                </Typography>

                {/* Final Key Takeaway */}
                <div
                  style={{
                    backgroundColor: "#FFF7ED",
                    borderRadius: "12px",
                    padding: "14px 18px",
                    border: "1px solid #FFEDD5",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontWeight: 800,
                      fontSize: "11px",
                      color: brandColors.pantoneOrange,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                    }}
                  >
                    Key Pedagogical Takeaway
                  </span>
                  <Typography
                    sx={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontWeight: 800,
                      fontSize: "15px",
                      color: "#C2410C",
                      marginTop: "4px",
                      lineHeight: 1.4,
                    }}
                  >
                    "Choose technology based on learning needs and objectives,
                    not simply because it is available."
                  </Typography>
                </div>

                <Typography
                  sx={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: "13px",
                    color: brandColors.pantoneCoolGray7,
                    lineHeight: 1.4,
                  }}
                >
                  Click any node on the circular framework to review individual
                  stages, or click Reset to return to the initial overview.
                </Typography>
              </motion.div>
            )}

            {/* STATE 3: INITIAL INTRODUCTORY OVERVIEW (BEFORE CLICKING ANY NODE) */}
            {activeStage === null && !isCycleComplete && (
              <motion.div
                key="initial-guide"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                style={{
                  backgroundColor: "#F8FAFC",
                  borderRadius: "18px",
                  border: "1.5px dashed #CBD5E1",
                  padding: "32px 34px",
                  display: "flex",
                  flexDirection: "column",
                  gap: 14,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Sparkles size={20} color={brandColors.pantoneOrange} />
                  <Typography
                    sx={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontWeight: 800,
                      fontSize: "18px",
                      color: brandColors.pantone432,
                    }}
                  >
                    Systematic Instructional Planning
                  </Typography>
                </div>

                <Typography
                  sx={{
                    fontFamily: "'Quicksand', sans-serif",
                    fontWeight: 600,
                    fontSize: "14.5px",
                    color: brandColors.pantoneCoolGray7,
                    lineHeight: 1.5,
                  }}
                >
                  Following our exploration of classroom resource environments, the{" "}
                  <strong>ADDIE framework</strong> serves as a practical roadmap
                  for educators to purposefully integrate technology into learning.
                </Typography>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    marginTop: 6,
                  }}
                >
                  <Button
                    onClick={handleNextStage}
                    variant="contained"
                    size="medium"
                    endIcon={<ChevronRight size={16} />}
                    sx={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontWeight: 700,
                      fontSize: "13px",
                      textTransform: "none",
                      backgroundColor: brandColors.pantoneOrange,
                      borderRadius: "10px",
                      padding: "6px 18px",
                      boxShadow: "0 4px 12px rgba(255, 81, 0, 0.25)",
                      "&:hover": { backgroundColor: "#E04800" },
                    }}
                  >
                    Start Guided Walkthrough
                  </Button>
                  <Typography
                    sx={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "12px",
                      color: brandColors.pantoneCoolGray7,
                    }}
                  >
                    or click any node on the circle
                  </Typography>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
