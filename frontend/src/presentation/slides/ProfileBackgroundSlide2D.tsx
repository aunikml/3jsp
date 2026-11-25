import React, { useState } from "react";
import { Typography, Tooltip, IconButton, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Sparkles,
  MousePointerClick,
  ChevronDown,
  Layers,
  ArrowUp,
} from "lucide-react";
import {
  BracUniversityLogo,
  UnitedNationsLogo,
  SaveTheChildrenLogo,
  UsaidLogo,
  CrpBangladeshLogo,
  UnescoLogo,
  BracIedLogo,
} from "../components/OfficialLogos";
import { brandColors } from "../../theme/theme";

interface MilestoneItem {
  id: string;
  year: string;
  organization: string;
  orgType: string;
  summary: string;
  color: string;
  component: React.FC<{ size?: number; style?: React.CSSProperties }>;
  side: "left" | "right";
  badge?: string;
}

const MILESTONES: MilestoneItem[] = [
  {
    id: "m-2011",
    year: "2011",
    organization: "BRAC University",
    orgType: "Higher Education",
    summary: "One of the first active LMS implementations for a higher education institution in Bangladesh.",
    color: "#ED1C24",
    component: BracUniversityLogo,
    side: "left",
    badge: "Pioneering LMS",
  },
  {
    id: "m-2013",
    year: "2013",
    organization: "United Nations (UN)",
    orgType: "Global Agency",
    summary: "Case study on Open and Distance Learning in Bangladesh.",
    color: "#009EDB",
    component: UnitedNationsLogo,
    side: "right",
    badge: "Policy & Distance Learning",
  },
  {
    id: "m-2014",
    year: "2014",
    organization: "USAID",
    orgType: "Global Development",
    summary: "EdTech implementation in Public Health Education.",
    color: "#002F6C",
    component: UsaidLogo,
    side: "left",
    badge: "Public Health EdTech",
  },
  {
    id: "m-2017",
    year: "2017",
    organization: "CRP Bangladesh",
    orgType: "Specialized Rehabilitation",
    summary: "EdTech implementation in Disability Studies.",
    color: "#DA291C",
    component: CrpBangladeshLogo,
    side: "right",
    badge: "Inclusive Technology",
  },
  {
    id: "m-2018",
    year: "2018",
    organization: "Save the Children",
    orgType: "International NGO",
    summary: "Instructional Technology in Education in Emergencies.",
    color: "#DA291C",
    component: SaveTheChildrenLogo,
    side: "left",
    badge: "Education in Emergencies",
  },
  {
    id: "m-2023-unesco",
    year: "2023",
    organization: "BRAC IED",
    orgType: "Global Research",
    summary: "Co-author of UNESCO Global Education Monitoring (GEM) Report 2022.",
    color: "#0077D4",
    component: UnescoLogo,
    side: "right",
    badge: "UNESCO GEM Report",
  },
  {
    id: "m-2023-2026",
    year: "2023–2026",
    organization: "BRAC IED",
    orgType: "National & Regional EdTech",
    summary: "Tele-learning initiatives focused on childcare and climate change.",
    color: brandColors.pantoneOrange,
    component: BracIedLogo,
    side: "left",
    badge: "Tele-Learning Ecosystem",
  },
  {
    id: "m-2026-ai",
    year: "2026",
    organization: "BRAC IED",
    orgType: "Emerging Tech Policy",
    summary: "Co-author of the AI Guideline Policy.",
    color: brandColors.teachingLearning,
    component: BracIedLogo,
    side: "right",
    badge: "AI Guideline Policy",
  },
];

interface ProfileBackgroundSlide2DProps {
  onPrevSlide?: () => void;
  onNextSlide?: () => void;
}

export const ProfileBackgroundSlide2D: React.FC<ProfileBackgroundSlide2DProps> = () => {
  // State: false = Initial Centered Profile Box
  //        true  = Profile Box transitions to top, branching journey unfolds
  const [isUnfolded, setIsUnfolded] = useState<boolean>(false);
  const [selectedMilestone, setSelectedMilestone] = useState<string | null>(null);

  const handleProfileClick = () => {
    setIsUnfolded(true);
  };

  const handleReset = () => {
    setIsUnfolded(false);
    setSelectedMilestone(null);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#FFFFFF",
        overflowY: isUnfolded ? "auto" : "hidden",
        overflowX: "hidden",
        padding: "24px 36px 36px 36px",
      }}
    >
      {/* 1. TOP UTILITY HEADER */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: isUnfolded ? 16 : 0,
          zIndex: 30,
          flexShrink: 0,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
            Slide 02 • Professional Profile & EdTech Journey
          </Typography>
        </div>

        {isUnfolded && (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Button
              size="small"
              onClick={handleReset}
              startIcon={<ArrowUp size={14} />}
              sx={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 600,
                fontSize: "12px",
                color: brandColors.pantone432,
                textTransform: "none",
                borderRadius: "8px",
                border: "1px solid #E2E8F0",
                "&:hover": {
                  borderColor: brandColors.pantoneOrange,
                  color: brandColors.pantoneOrange,
                },
              }}
            >
              Center Profile
            </Button>

            <Tooltip title="Replay branching journey animation">
              <IconButton
                size="small"
                onClick={() => {
                  setIsUnfolded(false);
                  setTimeout(() => setIsUnfolded(true), 150);
                }}
                sx={{
                  border: "1px solid #E2E8F0",
                  color: brandColors.pantone432,
                  "&:hover": {
                    borderColor: brandColors.pantoneOrange,
                    color: brandColors.pantoneOrange,
                  },
                }}
              >
                <RotateCcw size={15} />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </div>

      {/* 2. PROFILE BOX & BRANCHING TIMELINE WORKSPACE */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: isUnfolded ? "flex-start" : "center",
          position: "relative",
          width: "100%",
          minHeight: isUnfolded ? "auto" : "calc(100% - 40px)",
        }}
      >
        {/* A. THE PROFILE BOX (TRANSITIONS FROM CENTER TO TOP) */}
        <motion.div
          layout
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          onClick={!isUnfolded ? handleProfileClick : undefined}
          whileHover={!isUnfolded ? { scale: 1.02, y: -4 } : {}}
          whileTap={!isUnfolded ? { scale: 0.99 } : {}}
          style={{
            width: isUnfolded ? "100%" : "auto",
            maxWidth: isUnfolded ? 820 : 640,
            cursor: !isUnfolded ? "pointer" : "default",
            backgroundColor: "#FFFFFF",
            borderRadius: "24px",
            border: isUnfolded
              ? `2px solid #E2E8F0`
              : `2.5px solid ${brandColors.pantoneOrange}`,
            boxShadow: isUnfolded
              ? "0 6px 20px rgba(0,0,0,0.04)"
              : "0 18px 48px rgba(255, 81, 0, 0.16), 0 4px 16px rgba(0,0,0,0.06)",
            padding: isUnfolded ? "18px 28px" : "38px 44px",
            display: "flex",
            flexDirection: isUnfolded ? "row" : "column",
            alignItems: "center",
            justifyContent: isUnfolded ? "space-between" : "center",
            gap: isUnfolded ? 24 : 18,
            textAlign: isUnfolded ? "left" : "center",
            position: "relative",
            zIndex: 25,
            transition: "all 0.4s ease",
            marginBottom: isUnfolded ? 24 : 0,
          }}
        >
          {/* Top Brand Accent Line on Box */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              borderRadius: "24px 24px 0 0",
              backgroundColor: brandColors.pantoneOrange,
            }}
          />

          {/* Official BRAC IED Logo Prominently Displayed */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <BracIedLogo
              size={isUnfolded ? 120 : 200}
              style={{
                transition: "all 0.4s ease",
                filter: "drop-shadow(0 2px 6px rgba(0,0,0,0.05))",
              }}
            />
          </div>

          {/* Typography Content: Name and Designation */}
          <div style={{ flex: 1 }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 700,
                fontSize: isUnfolded
                  ? { xs: "22px", md: "26px" }
                  : { xs: "32px", md: "40px" },
                color: brandColors.pantone432,
                lineHeight: 1.2,
                letterSpacing: "-0.5px",
                marginBottom: isUnfolded ? 0.5 : 1.2,
                transition: "all 0.3s ease",
              }}
            >
              Hamim Al Ahsan
            </Typography>

            <Typography
              sx={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 600,
                fontSize: isUnfolded
                  ? { xs: "13px", md: "15px" }
                  : { xs: "16px", md: "19px" },
                color: brandColors.pantoneOrange,
                lineHeight: 1.4,
                letterSpacing: "-0.2px",
                transition: "all 0.3s ease",
              }}
            >
              Manager IT (EdTech and System Development)
            </Typography>

            {!isUnfolded && (
              <Typography
                sx={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontWeight: 500,
                  fontSize: "13px",
                  color: "#64748B",
                  marginTop: 1.5,
                  maxWidth: 420,
                  marginInline: "auto",
                }}
              >
                16+ Years orchestrating national e-learning systems, inclusive learning technologies, and educational innovation.
              </Typography>
            )}
          </div>

          {/* Initial State Prompt: Click to Reveal */}
          {!isUnfolded ? (
            <motion.div
              animate={{ y: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 18px",
                backgroundColor: "rgba(255, 81, 0, 0.1)",
                color: brandColors.pantoneOrange,
                borderRadius: "20px",
                fontSize: "13px",
                fontWeight: 700,
                fontFamily: "'Quicksand', sans-serif",
                marginTop: 10,
              }}
            >
              <MousePointerClick size={16} />
              <span>Click to Reveal Professional Journey</span>
              <ChevronDown size={15} />
            </motion.div>
          ) : (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                backgroundColor: "rgba(109, 104, 175, 0.1)",
                color: brandColors.teachingLearning,
                borderRadius: "16px",
                fontSize: "12px",
                fontWeight: 700,
                fontFamily: "'Quicksand', sans-serif",
                flexShrink: 0,
              }}
            >
              <Sparkles size={14} />
              <span>EdTech Milestones (2011–2026)</span>
            </div>
          )}
        </motion.div>

        {/* B. BRANCHING TIMELINE UNFOLDS FROM THE BOTTOM OF PROFILE BOX */}
        <AnimatePresence>
          {isUnfolded && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 1040,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginTop: 8,
                paddingBottom: 40,
              }}
            >
              {/* Central Trunk Line Connecting From Profile Box */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 40,
                  left: "50%",
                  width: 3,
                  backgroundColor: "#E2E8F0",
                  transform: "translateX(-50%)",
                  zIndex: 1,
                }}
              >
                {/* Animated Glowing Liquid Pulse along central spine */}
                <motion.div
                  style={{
                    width: "100%",
                    height: 80,
                    backgroundColor: brandColors.pantoneOrange,
                    borderRadius: 2,
                  }}
                  animate={{ y: [0, 600, 0] }}
                  transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
                />
              </div>

              {/* Staggered Chronological Milestones (Alternating Left & Right) */}
              <div
                style={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "column",
                  gap: 20,
                  position: "relative",
                  zIndex: 10,
                }}
              >
                {MILESTONES.map((milestone, index) => {
                  const isLeft = milestone.side === "left";
                  const LogoComponent = milestone.component;
                  const isSelected = selectedMilestone === milestone.id;

                  return (
                    <motion.div
                      key={milestone.id}
                      initial={{
                        opacity: 0,
                        x: isLeft ? -50 : 50,
                        scale: 0.92,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                        scale: 1,
                      }}
                      transition={{
                        delay: 0.15 + index * 0.1,
                        type: "spring",
                        stiffness: 240,
                        damping: 24,
                      }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: isLeft ? "flex-start" : "flex-end",
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      {/* Milestone Card Container */}
                      <div
                        style={{
                          width: "46%",
                          display: "flex",
                          flexDirection: "column",
                          alignItems: isLeft ? "flex-end" : "flex-start",
                        }}
                      >
                        <motion.div
                          whileHover={{
                            scale: 1.025,
                            y: -3,
                            boxShadow: `0 12px 28px ${milestone.color}20, 0 2px 8px rgba(0,0,0,0.05)`,
                          }}
                          onClick={() => setSelectedMilestone(milestone.id)}
                          style={{
                            width: "100%",
                            backgroundColor: "#FFFFFF",
                            borderRadius: "18px",
                            border: isSelected
                              ? `2px solid ${milestone.color}`
                              : "1.5px solid #EAEAEA",
                            boxShadow: isSelected
                              ? `0 10px 24px ${milestone.color}22`
                              : "0 4px 16px rgba(0,0,0,0.04)",
                            padding: "16px 20px",
                            cursor: "pointer",
                            position: "relative",
                            overflow: "hidden",
                            transition: "border-color 0.25s, box-shadow 0.25s",
                          }}
                        >
                          {/* Top Accent Strip */}
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              left: 0,
                              right: 0,
                              height: 3,
                              backgroundColor: milestone.color,
                            }}
                          />

                          {/* Card Header: Year, Badge & Organization Logo */}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              marginBottom: 10,
                              gap: 12,
                            }}
                          >
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                              <span
                                style={{
                                  padding: "3px 10px",
                                  backgroundColor: `${milestone.color}15`,
                                  color: milestone.color,
                                  borderRadius: "12px",
                                  fontFamily: "'Quicksand', sans-serif",
                                  fontWeight: 800,
                                  fontSize: "13px",
                                }}
                              >
                                {milestone.year}
                              </span>

                              {milestone.badge && (
                                <span
                                  style={{
                                    fontSize: "11px",
                                    fontFamily: "'Quicksand', sans-serif",
                                    fontWeight: 700,
                                    color: "#64748B",
                                    backgroundColor: "#F8F8F8",
                                    padding: "2px 8px",
                                    borderRadius: "8px",
                                  }}
                                >
                                  {milestone.badge}
                                </span>
                              )}
                            </div>

                            {/* Official Logo Display */}
                            <div
                              style={{
                                width: 56,
                                height: 38,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "flex-end",
                                flexShrink: 0,
                              }}
                            >
                              <LogoComponent size={54} />
                            </div>
                          </div>

                          {/* Organization Name & Sector */}
                          <div style={{ marginBottom: 6 }}>
                            <Typography
                              sx={{
                                fontFamily: "'Quicksand', sans-serif",
                                fontWeight: 700,
                                fontSize: "16px",
                                color: brandColors.pantone432,
                                lineHeight: 1.25,
                              }}
                            >
                              {milestone.organization}
                            </Typography>
                            <Typography
                              sx={{
                                fontFamily: "'Quicksand', sans-serif",
                                fontWeight: 600,
                                fontSize: "11px",
                                color: brandColors.pantoneCoolGray7,
                              }}
                            >
                              {milestone.orgType}
                            </Typography>
                          </div>

                          {/* Summary / Milestone Achievement */}
                          <Typography
                            sx={{
                              fontFamily: "'Quicksand', sans-serif",
                              fontWeight: 500,
                              fontSize: "13px",
                              color: "#475569",
                              lineHeight: 1.5,
                            }}
                          >
                            {milestone.summary}
                          </Typography>
                        </motion.div>
                      </div>

                      {/* Center Node on Timeline Spine */}
                      <div
                        style={{
                          position: "absolute",
                          left: "50%",
                          transform: "translateX(-50%)",
                          width: 24,
                          height: 24,
                          borderRadius: "50%",
                          backgroundColor: "#FFFFFF",
                          border: `3px solid ${milestone.color}`,
                          boxShadow: `0 0 0 4px #FFFFFF, 0 2px 8px rgba(0,0,0,0.12)`,
                          zIndex: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            backgroundColor: milestone.color,
                          }}
                        />
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* End of Journey Anchor Node */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1.1, type: "spring" }}
                style={{
                  marginTop: 24,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "8px 20px",
                  borderRadius: "20px",
                  backgroundColor: "rgba(109, 104, 175, 0.08)",
                  border: `1.5px solid ${brandColors.teachingLearning}`,
                  color: brandColors.teachingLearning,
                  fontSize: "12px",
                  fontFamily: "'Quicksand', sans-serif",
                  fontWeight: 700,
                  zIndex: 10,
                }}
              >
                <Layers size={15} />
                <span>Continuous Leadership & Policy Innovation (2011 — Present)</span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
