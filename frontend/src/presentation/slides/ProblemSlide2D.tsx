import React, { useState } from "react";
import { Typography, Tooltip, IconButton } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Sparkles,
  AlertCircle,
  BookOpen,
  ClipboardCheck,
  BarChart3,
  LucideIcon,
} from "lucide-react";
import { brandColors } from "../../theme/theme";

type CategoryId = "instruction" | "assessment" | "evaluation";

interface ProblemItem {
  id: string;
  text: string;
  x: number; // target card center X in SVG
  y: number; // target card center Y in SVG
}

interface ConstellationHub {
  id: CategoryId;
  title: string;
  subtitle: string;
  color: string;
  hubX: number;
  hubY: number;
  icon: LucideIcon;
  problems: ProblemItem[];
}

// Equilateral Triangular Constellation Layout
// Hub 1 (Instruction): Top Center (0, -140)
// Hub 2 (Assessment): Bottom Right (+180, +110)
// Hub 3 (Evaluation): Bottom Left (-180, +110)
const CONSTELLATION: ConstellationHub[] = [
  {
    id: "instruction",
    title: "Instruction",
    subtitle: "Classroom Dynamics & Delivery",
    color: brandColors.pantoneOrange, // #FF5100
    hubX: 0,
    hubY: -135,
    icon: BookOpen,
    problems: [
      { id: "inst-1", text: "Overcrowded classrooms", x: -330, y: -230 },
      { id: "inst-2", text: "Differences in student learning levels", x: -330, y: -130 },
      { id: "inst-3", text: "Language barriers", x: 330, y: -230 },
      { id: "inst-4", text: "Low student engagement", x: 330, y: -130 },
    ],
  },
  {
    id: "assessment",
    title: "Assessment",
    subtitle: "Tracking & Timely Feedback",
    color: brandColors.teachingLearning, // #6D68AF
    hubX: 185,
    hubY: 110,
    icon: ClipboardCheck,
    problems: [
      { id: "ass-1", text: "Limited time for providing feedback", x: 380, y: 50 },
      { id: "ass-2", text: "Difficulty tracking student progress consistently", x: 380, y: 160 },
    ],
  },
  {
    id: "evaluation",
    title: "Evaluation",
    subtitle: "Curriculum Currency & Fairness",
    color: brandColors.climateChange, // #44C8F5
    hubX: -185,
    hubY: 110,
    icon: BarChart3,
    problems: [
      { id: "eval-1", text: "Lack of up-to-date learning materials", x: -380, y: 50 },
      { id: "eval-2", text: "Difficulty evaluating students fairly and consistently", x: -380, y: 160 },
    ],
  },
];

interface ProblemSlide2DProps {
  onPrevSlide?: () => void;
  onNextSlide?: () => void;
}

export const ProblemSlide2D: React.FC<ProblemSlide2DProps> = () => {
  // State:
  // isExpanded: false = Only the single big prominent "Problem" hub at center
  //             true  = Splits into the 3 triangular constellation hubs
  // activeHub: null | "instruction" | "assessment" | "evaluation"
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [activeHub, setActiveHub] = useState<CategoryId | null>(null);

  const handleInitialClick = () => {
    setIsExpanded(true);
    setActiveHub("instruction"); // Default open top hub on first split
  };

  const handleHubClick = (id: CategoryId) => {
    if (activeHub === id) {
      setActiveHub(null); // Collapse if clicking the already active one
    } else {
      setActiveHub(id); // Switch active domain
    }
  };

  const handleReset = () => {
    setIsExpanded(false);
    setActiveHub(null);
  };

  const activeHubData = CONSTELLATION.find((h) => h.id === activeHub);

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
        padding: "20px 36px 28px 36px",
      }}
    >
      {/* 1. SLIDE HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 4,
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
              Slide 03 • Pedagogical Challenges & Bottlenecks
            </Typography>
          </div>
          <Typography
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
              fontSize: "26px",
              color: brandColors.pantone432,
              letterSpacing: "-0.4px",
            }}
          >
            The Problem: Educational Challenges in Focus
          </Typography>
        </div>

        {/* Status Pill & Reset */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "6px 16px",
              backgroundColor: "#F8F8F8",
              borderRadius: "20px",
              border: "1px solid #E8E8E8",
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                backgroundColor: isExpanded
                  ? brandColors.pantoneOrange
                  : brandColors.pantoneCoolGray7,
                transition: "all 0.3s ease",
              }}
            />
            <Typography
              sx={{
                fontFamily: "'Quicksand', sans-serif",
                fontSize: "12px",
                fontWeight: 700,
                color: brandColors.pantone432,
              }}
            >
              {!isExpanded
                ? "State 1: Core Problem"
                : activeHub
                ? `State 3: ${activeHubData?.title} Focus`
                : "State 2: Constellation Hubs"}
            </Typography>
          </div>

          <Tooltip title="Reset & merge constellation back to initial circle">
            <IconButton
              size="small"
              onClick={handleReset}
              sx={{
                border: "1px solid #E2E8F0",
                color: brandColors.pantone432,
                "&:hover": {
                  borderColor: brandColors.pantoneOrange,
                  color: brandColors.pantoneOrange,
                },
              }}
            >
              <RotateCcw size={16} />
            </IconButton>
          </Tooltip>
        </div>
      </div>

      {/* 2. MAIN TRIANGULAR CONSTELLATION STAGE (CLEAN WHITE, NO BACKGROUND ANIMATION) */}
      <div
        style={{
          flex: 1,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "visible",
        }}
      >
        <svg
          viewBox="-580 -380 1160 760"
          style={{
            width: "100%",
            height: "100%",
            maxHeight: "calc(100vh - 160px)",
            overflow: "visible",
            userSelect: "none",
          }}
        >
          <defs>
            {/* Soft drop shadow for floating cards & constellation hubs */}
            <filter id="hub-shadow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow dx="0" dy="6" stdDeviation="10" floodOpacity="0.1" />
            </filter>
          </defs>

          {/* A. CONSTELLATION STRUCTURE: TRIANGULAR CONNECTING SPINE LINES (WHEN EXPANDED) */}
          {isExpanded && (
            <g id="constellation-triangle-lines">
              {/* Triangular connection lines between the 3 hubs */}
              <motion.line
                x1={CONSTELLATION[0].hubX}
                y1={CONSTELLATION[0].hubY}
                x2={CONSTELLATION[1].hubX}
                y2={CONSTELLATION[1].hubY}
                stroke="#E2E8F0"
                strokeWidth="2"
                strokeDasharray="6 6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.5 }}
              />
              <motion.line
                x1={CONSTELLATION[1].hubX}
                y1={CONSTELLATION[1].hubY}
                x2={CONSTELLATION[2].hubX}
                y2={CONSTELLATION[2].hubY}
                stroke="#E2E8F0"
                strokeWidth="2"
                strokeDasharray="6 6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.5 }}
              />
              <motion.line
                x1={CONSTELLATION[2].hubX}
                y1={CONSTELLATION[2].hubY}
                x2={CONSTELLATION[0].hubX}
                y2={CONSTELLATION[0].hubY}
                stroke="#E2E8F0"
                strokeWidth="2"
                strokeDasharray="6 6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ duration: 0.5 }}
              />
            </g>
          )}

          {/* B. CURVED BEZIER CONNECTING LINES TO ACTIVE PROBLEM NODES */}
          <g id="branch-lines">
            <AnimatePresence>
              {isExpanded && activeHubData && activeHubData.problems.map((prob, idx) => {
                const originX = activeHubData.hubX;
                const originY = activeHubData.hubY;
                const targetX = prob.x;
                const targetY = prob.y;

                // Bezier curve control point
                const midX = (originX + targetX) / 2;
                const midY = (originY + targetY) / 2 + (idx % 2 === 0 ? -15 : 15);
                const pathData = `M ${originX} ${originY} Q ${midX} ${midY} ${targetX} ${targetY}`;

                return (
                  <motion.g key={prob.id}>
                    <motion.path
                      d={pathData}
                      fill="none"
                      stroke={activeHubData.color}
                      strokeWidth="3"
                      strokeDasharray="6 6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.9 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, delay: idx * 0.08, ease: "easeOut" }}
                    />
                    <motion.circle
                      cx={targetX}
                      cy={targetY}
                      r="6"
                      fill={activeHubData.color}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ delay: 0.25 + idx * 0.08 }}
                    />
                  </motion.g>
                );
              })}
            </AnimatePresence>
          </g>

          {/* C. INITIAL STATE: SINGLE PROMINENT "PROBLEM" HUB IN CENTER (NO SLICES, NO AMBIENT ANIMATION) */}
          <AnimatePresence>
            {!isExpanded && (
              <motion.g
                key="initial-problem-hub"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ type: "spring", stiffness: 260, damping: 24 }}
                onClick={handleInitialClick}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                style={{ cursor: "pointer" }}
              >
                {/* Big Solid Outer Circle (Radius 165px / Diameter 330px) */}
                <circle
                  cx="0"
                  cy="0"
                  r="165"
                  fill={brandColors.pantoneOrange}
                  stroke="#FFFFFF"
                  strokeWidth="7"
                  filter="url(#hub-shadow)"
                />

                {/* Concentric inner dashed ring */}
                <circle
                  cx="0"
                  cy="0"
                  r="148"
                  fill="none"
                  stroke="#FFFFFF"
                  strokeWidth="2.5"
                  strokeDasharray="8 8"
                  opacity="0.5"
                />

                {/* Big Label "Problem" in 60px Bold Font */}
                <text
                  x="0"
                  y="-4"
                  textAnchor="middle"
                  fontFamily="'Quicksand', sans-serif"
                  fontWeight="800"
                  fontSize="60"
                  fill="#FFFFFF"
                  letterSpacing="-0.5px"
                >
                  Problem
                </text>

                {/* Subtitle / Interaction Prompt with Generous Margins */}
                <rect
                  x="-105"
                  y="34"
                  width="210"
                  height="36"
                  rx="18"
                  fill="rgba(255, 255, 255, 0.25)"
                />
                <text
                  x="0"
                  y="57"
                  textAnchor="middle"
                  fontFamily="'Quicksand', sans-serif"
                  fontWeight="700"
                  fontSize="14"
                  fill="#FFFFFF"
                  letterSpacing="0.8px"
                >
                  Click to Expand Constellation
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* D. EXPANDED STATE: THE 3 TRIANGULAR CONSTELLATION HUBS */}
          <AnimatePresence>
            {isExpanded && (
              <g id="constellation-hubs">
                {CONSTELLATION.map((hub, idx) => {
                  const isActive = activeHub === hub.id;
                  const isDimmed = activeHub !== null && !isActive;
                  const IconComp = hub.icon;

                  // Dimensions of each constellation hub
                  const width = 230;
                  const height = 90;

                  return (
                    <motion.g
                      key={hub.id}
                      initial={{
                        x: 0,
                        y: 0,
                        scale: 0.3,
                        opacity: 0,
                      }}
                      animate={{
                        x: hub.hubX,
                        y: hub.hubY,
                        scale: isActive ? 1.08 : 1.0,
                        opacity: isDimmed ? 0.45 : 1.0,
                      }}
                      exit={{
                        x: 0,
                        y: 0,
                        scale: 0.3,
                        opacity: 0,
                      }}
                      transition={{
                        delay: idx * 0.1,
                        type: "spring",
                        stiffness: 240,
                        damping: 22,
                      }}
                      onClick={() => handleHubClick(hub.id)}
                      whileHover={{ scale: isDimmed ? 0.95 : 1.05, opacity: 1.0 }}
                      style={{ cursor: "pointer" }}
                    >
                      {/* Rounded Hub Rectangular Card */}
                      <rect
                        x={-width / 2}
                        y={-height / 2}
                        width={width}
                        height={height}
                        rx="22"
                        fill={isActive ? hub.color : "#FFFFFF"}
                        stroke={hub.color}
                        strokeWidth={isActive ? 3.5 : 2.5}
                        filter="url(#hub-shadow)"
                      />

                      {/* Top Accent Strip inside card */}
                      <rect
                        x={-width / 2 + 14}
                        y={-height / 2 + 5}
                        width={width - 28}
                        height="4"
                        rx="2"
                        fill={isActive ? "#FFFFFF" : hub.color}
                        opacity={isActive ? 0.8 : 0.4}
                      />

                      {/* Hub Icon Container */}
                      <g transform={`translate(${-width / 2 + 32}, 0)`}>
                        <circle
                          cx="0"
                          cy="0"
                          r="18"
                          fill={isActive ? "rgba(255, 255, 255, 0.2)" : `${hub.color}15`}
                        />
                        <g transform="translate(-10, -10)" color={isActive ? "#FFFFFF" : hub.color}>
                          <IconComp size={20} />
                        </g>
                      </g>

                      {/* Hub Titles & Count Badge in Large Bold Font with clean margins */}
                      <g transform={`translate(${16}, 0)`}>
                        <text
                          textAnchor="middle"
                          y="-2"
                          fontFamily="'Quicksand', sans-serif"
                          fontWeight="800"
                          fontSize="24"
                          fill={isActive ? "#FFFFFF" : brandColors.pantone432}
                          letterSpacing="-0.3px"
                        >
                          {hub.title}
                        </text>
                        <text
                          textAnchor="middle"
                          y="20"
                          fontFamily="'Quicksand', sans-serif"
                          fontWeight="700"
                          fontSize="12.5"
                          fill={isActive ? "#FFFFFF" : brandColors.pantoneCoolGray7}
                          opacity={isActive ? 0.95 : 0.85}
                        >
                          {hub.problems.length} Challenges • {isActive ? "Active" : "Click to View"}
                        </text>
                      </g>
                    </motion.g>
                  );
                })}

                {/* Central Reset Core between the 3 hubs */}
                <motion.g
                  key="center-merge-node"
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0, opacity: 0 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 280 }}
                  onClick={handleReset}
                  whileHover={{ scale: 1.12 }}
                  whileTap={{ scale: 0.92 }}
                  style={{ cursor: "pointer" }}
                >
                  <circle
                    cx="0"
                    cy="0"
                    r="34"
                    fill="#FFFFFF"
                    stroke={brandColors.pantoneOrange}
                    strokeWidth="3"
                    filter="url(#hub-shadow)"
                  />
                  <circle cx="0" cy="0" r="26" fill="rgba(255, 81, 0, 0.08)" />
                  <RotateCcw
                    x="-10"
                    y="-10"
                    size={20}
                    color={brandColors.pantoneOrange}
                    style={{ pointerEvents: "none" }}
                  />
                </motion.g>
              </g>
            )}
          </AnimatePresence>

          {/* E. OUTWARD PROBLEM SATELLITE CARDS (BIGGER FONTS & GENEROUS MARGINS) */}
          <g id="problem-nodes">
            <AnimatePresence>
              {isExpanded && activeHubData && activeHubData.problems.map((node, idx) => {
                // Card dimensions: generous width and height with large readable fonts
                const cardWidth = 310;
                const cardHeight = 84;

                const cardX = node.x - cardWidth / 2;
                const cardY = node.y - cardHeight / 2;

                return (
                  <motion.g
                    key={node.id}
                    initial={{
                      opacity: 0,
                      scale: 0.6,
                      x: activeHubData.hubX - node.x,
                      y: activeHubData.hubY - node.y,
                    }}
                    animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
                    transition={{
                      delay: 0.12 + idx * 0.08,
                      type: "spring",
                      stiffness: 260,
                      damping: 22,
                    }}
                  >
                    <foreignObject
                      x={cardX}
                      y={cardY}
                      width={cardWidth}
                      height={cardHeight + 20}
                      style={{ overflow: "visible" }}
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.04,
                          boxShadow: `0 12px 30px ${activeHubData.color}35`,
                        }}
                        style={{
                          width: cardWidth,
                          minHeight: cardHeight,
                          backgroundColor: "#FFFFFF",
                          borderRadius: "18px",
                          border: `2.5px solid ${activeHubData.color}`,
                          boxShadow: "0 10px 26px rgba(0,0,0,0.07)",
                          padding: "16px 20px",
                          display: "flex",
                          alignItems: "center",
                          gap: 15,
                          position: "relative",
                          cursor: "default",
                        }}
                      >
                        {/* Alert Status Icon */}
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            borderRadius: "50%",
                            backgroundColor: `${activeHubData.color}18`,
                            color: activeHubData.color,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          <AlertCircle size={20} />
                        </div>

                        {/* Problem Statement Text in LARGER 16.5px BOLD FONT */}
                        <Typography
                          sx={{
                            fontFamily: "'Quicksand', sans-serif",
                            fontWeight: 700,
                            fontSize: "16.5px",
                            color: brandColors.pantone432,
                            lineHeight: 1.4,
                            letterSpacing: "-0.2px",
                            margin: 0,
                          }}
                        >
                          {node.text}
                        </Typography>
                      </motion.div>
                    </foreignObject>
                  </motion.g>
                );
              })}
            </AnimatePresence>
          </g>
        </svg>
      </div>

      {/* 3. SLIDE FOOTER / INTERACTION GUIDANCE TRAY */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 12,
          borderTop: "1px solid #F1F5F9",
          zIndex: 30,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Sparkles size={16} color={brandColors.pantoneOrange} />
          <Typography
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "13px",
              fontWeight: 600,
              color: brandColors.pantone432,
            }}
          >
            {!isExpanded && (
              <span>Step 1: Click the central <strong>"Problem"</strong> hub to split into the 3 triangular constellation domains</span>
            )}
            {isExpanded && activeHub && (
              <span>Active Domain: <strong>{activeHubData?.title}</strong> • Click any other hub to focus or center core to reset</span>
            )}
            {isExpanded && !activeHub && (
              <span>Click any domain hub (<strong>Instruction</strong>, <strong>Assessment</strong>, or <strong>Evaluation</strong>) to explore challenges</span>
            )}
          </Typography>
        </div>

        {/* Quick Domain Jump Pills */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {isExpanded && CONSTELLATION.map((hub) => {
            const isHubActive = activeHub === hub.id;
            return (
              <button
                key={hub.id}
                onClick={() => handleHubClick(hub.id)}
                style={{
                  border: isHubActive ? `2px solid ${hub.color}` : "1.5px solid #E2E8F0",
                  backgroundColor: isHubActive ? `${hub.color}15` : "#FFFFFF",
                  color: isHubActive ? hub.color : brandColors.pantone432,
                  fontFamily: "'Quicksand', sans-serif",
                  fontWeight: isHubActive ? 800 : 600,
                  fontSize: "12px",
                  padding: "5px 14px",
                  borderRadius: "16px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: "50%",
                    backgroundColor: hub.color,
                  }}
                />
                {hub.title}
              </button>
            );
          })}

          <span
            style={{
              padding: "5px 12px",
              backgroundColor: "#F8F8F8",
              borderRadius: "14px",
              fontSize: "12px",
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
              color: brandColors.pantoneCoolGray7,
            }}
          >
            Slide 3 of 3
          </span>
        </div>
      </div>
    </div>
  );
};
