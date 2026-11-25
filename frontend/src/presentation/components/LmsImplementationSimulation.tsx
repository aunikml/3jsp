import React, { useState } from "react";
import { Typography, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileVideo,
  Users,
  MessageSquare,
  ClipboardCheck,
  BarChart3,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  ArrowRight,
  X,
  GraduationCap,
  Activity,
  Workflow,
  LucideIcon,
} from "lucide-react";
import { brandColors } from "../../theme/theme";

interface InfographicPillar {
  step: number;
  id: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  color: string;
  lightBg: string;
  badge: string;
  actionText: string;
  classroomArtifact: string;
  keyBenefit: string;
}

const LMS_PILLARS: InfographicPillar[] = [
  {
    step: 1,
    id: "content",
    title: "Deliver Content",
    subtitle: "Centralized Media Hub",
    icon: FileVideo,
    color: "#059669", // Emerald
    lightBg: "#ECFDF5",
    badge: "Pillar 1",
    actionText: "Upload & distribute curated materials",
    classroomArtifact: "Photosynthesis animation, worksheets & readings",
    keyBenefit: "24/7 access for all students from any device",
  },
  {
    step: 2,
    id: "learners",
    title: "Manage Learners",
    subtitle: "Roster & Cohort Control",
    icon: Users,
    color: "#6D68AF", // Teaching & Learning Purple
    lightBg: "#F5F3FF",
    badge: "Pillar 2",
    actionText: "Organize enrollment and group permissions",
    classroomArtifact: "Section A (35 students) + peer study pods",
    keyBenefit: "Clear visibility into who is enrolled and participating",
  },
  {
    step: 3,
    id: "facilitate",
    title: "Facilitate Learning",
    subtitle: "Interactive Dialogue",
    icon: MessageSquare,
    color: "#0284C7", // Cyan / Ocean Blue
    lightBg: "#F0F9FF",
    badge: "Pillar 3",
    actionText: "Engage students through guided activities",
    classroomArtifact: "Discussion prompt: 'Why are leaves green?' (24 replies)",
    keyBenefit: "Bypasses classroom noise and encourages shy learners",
  },
  {
    step: 4,
    id: "assess",
    title: "Assess Learning",
    subtitle: "Formative Verification",
    icon: ClipboardCheck,
    color: "#D97706", // Amber
    lightBg: "#FFFBEB",
    badge: "Pillar 4",
    actionText: "Conduct digital quizzes & assignment tasks",
    classroomArtifact: "Chlorophyll quiz: 32/35 auto-graded submissions",
    keyBenefit: "Instant scoring eliminates grading backlog",
  },
  {
    step: 5,
    id: "monitor",
    title: "Monitor Progress",
    subtitle: "Actionable Telemetry",
    icon: BarChart3,
    color: "#FF5100", // BRAC Pantone Orange
    lightBg: "#FFF7ED",
    badge: "Pillar 5",
    actionText: "Track completion rates & identify learning gaps",
    classroomArtifact: "88% completion dashboard • 3 targeted interventions",
    keyBenefit: "Data-driven insights for targeted teacher support",
  },
];

interface LmsImplementationSimulationProps {
  onClose?: () => void;
  onProceedToEvaluate?: () => void;
}

export const LmsImplementationSimulation: React.FC<LmsImplementationSimulationProps> = ({
  onClose,
  onProceedToEvaluate,
}) => {
  // activePillarIndex: 1 to 5, or viewMode "overview"
  const [activeStep, setActiveStep] = useState<number>(1);
  const [viewMode, setViewMode] = useState<"stepper" | "overview">("stepper");

  const currentPillar = LMS_PILLARS[activeStep - 1];

  const handleNext = () => {
    if (activeStep < 5) {
      setActiveStep((prev) => prev + 1);
    } else {
      setViewMode("overview");
    }
  };

  const handleBack = () => {
    if (viewMode === "overview") {
      setViewMode("stepper");
      setActiveStep(5);
    } else if (activeStep > 1) {
      setActiveStep((prev) => prev - 1);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
      }}
    >
      {/* 1. TOP INFOGRAPHIC CONTEXT BANNER */}
      <div
        style={{
          backgroundColor: "#ECFDF5",
          border: "1.5px solid #A7F3D0",
          borderRadius: "14px",
          padding: "10px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div
            style={{
              width: 32,
              height: 32,
              borderRadius: "10px",
              backgroundColor: "#10B981",
              color: "#FFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Workflow size={18} />
          </div>
          <div>
            <span
              style={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 800,
                fontSize: "10.5px",
                color: "#047857",
                letterSpacing: "0.6px",
                textTransform: "uppercase",
              }}
            >
              LMS Infographic Architecture • ADDIE Implementation
            </span>
            <Typography
              sx={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 700,
                fontSize: "12.5px",
                color: "#065F46",
                lineHeight: 1.3,
              }}
            >
              "Once we have designed the learning and developed the materials, we need a platform to deliver and manage that learning."
            </Typography>
          </div>
        </div>

        {onClose && (
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#059669",
              cursor: "pointer",
              padding: 4,
            }}
            title="Close LMS Infographic"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* 2. THE MAIN INFOGRAPHIC CONTAINER */}
      <div
        style={{
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          border: "2px solid #10B981",
          boxShadow: "0 10px 28px rgba(16, 185, 129, 0.12), 0 2px 8px rgba(0,0,0,0.04)",
          padding: "18px 20px",
          display: "flex",
          flexDirection: "column",
          gap: 14,
        }}
      >
        {/* INFOGRAPHIC HEADER: CENTRAL HUB TITLE */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid #E2E8F0",
            paddingBottom: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "10px",
                backgroundColor: "#064E3B",
                color: "#FFF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GraduationCap size={20} color="#34D399" />
            </div>
            <div>
              <Typography
                sx={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontWeight: 800,
                  fontSize: "16px",
                  color: brandColors.pantone432,
                  lineHeight: 1.15,
                }}
              >
                The 5 Functional Pillars of an LMS
              </Typography>
              <Typography
                sx={{
                  fontFamily: "'Quicksand', sans-serif",
                  fontWeight: 600,
                  fontSize: "11px",
                  color: brandColors.pantoneCoolGray7,
                }}
              >
                How teachers operationalize lesson delivery in real classrooms
              </Typography>
            </div>
          </div>

          {/* View Toggle: Step-by-Step Focus vs All-in-One Synthesis */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              backgroundColor: "#F1F5F9",
              borderRadius: "20px",
              padding: "2px",
            }}
          >
            <button
              onClick={() => setViewMode("stepper")}
              style={{
                border: "none",
                backgroundColor: viewMode === "stepper" ? "#FFFFFF" : "transparent",
                color: viewMode === "stepper" ? "#065F46" : "#64748B",
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 700,
                fontSize: "10.5px",
                padding: "4px 10px",
                borderRadius: "16px",
                cursor: "pointer",
                boxShadow: viewMode === "stepper" ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
              }}
            >
              Step-by-Step
            </button>
            <button
              onClick={() => setViewMode("overview")}
              style={{
                border: "none",
                backgroundColor: viewMode === "overview" ? "#FFFFFF" : "transparent",
                color: viewMode === "overview" ? "#065F46" : "#64748B",
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 700,
                fontSize: "10.5px",
                padding: "4px 10px",
                borderRadius: "16px",
                cursor: "pointer",
                boxShadow: viewMode === "overview" ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
              }}
            >
              All 5 Pillars
            </button>
          </div>
        </div>

        {/* 3. VISUAL INFOGRAPHIC PRESENTATION */}
        {viewMode === "stepper" ? (
          /* --- A. STEP-BY-STEP INFOGRAPHIC FOCUS --- */
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {/* Top 5-Step Horizontal Breadcrumb Ribbon */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 8,
              }}
            >
              {LMS_PILLARS.map((p) => {
                const isCurrent = p.step === activeStep;
                const isPassed = p.step < activeStep;

                return (
                  <div
                    key={p.id}
                    onClick={() => setActiveStep(p.step)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "6px 8px",
                      borderRadius: "10px",
                      backgroundColor: isCurrent ? p.lightBg : isPassed ? "#F8FAFC" : "#FAFAFA",
                      border: isCurrent
                        ? `2px solid ${p.color}`
                        : isPassed
                        ? "1px solid #CBD5E1"
                        : "1px dashed #E2E8F0",
                      cursor: "pointer",
                      transition: "all 0.25s ease",
                      opacity: isCurrent ? 1 : isPassed ? 0.9 : 0.6,
                    }}
                  >
                    <div
                      style={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: isCurrent ? p.color : isPassed ? "#10B981" : "#E2E8F0",
                        color: isCurrent || isPassed ? "#FFF" : "#64748B",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "10px",
                        fontWeight: 800,
                        flexShrink: 0,
                      }}
                    >
                      {isPassed ? <CheckCircle2 size={13} /> : p.step}
                    </div>
                    <div style={{ overflow: "hidden" }}>
                      <div
                        style={{
                          fontSize: "10px",
                          fontWeight: 800,
                          color: isCurrent ? p.color : "#475569",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          overflow: "hidden",
                        }}
                      >
                        {p.title}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Active Pillar Deep-Dive Infographic Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPillar.id}
                initial={{ opacity: 0, y: 12, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                style={{
                  backgroundColor: currentPillar.lightBg,
                  borderRadius: "14px",
                  border: `2px solid ${currentPillar.color}`,
                  padding: "16px 20px",
                  display: "grid",
                  gridTemplateColumns: "1fr 1.2fr",
                  gap: 16,
                  alignItems: "center",
                }}
              >
                {/* Left Side: Pillar Definition & Purpose */}
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 44,
                        height: 44,
                        borderRadius: "12px",
                        backgroundColor: currentPillar.color,
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        boxShadow: `0 4px 14px ${currentPillar.color}44`,
                      }}
                    >
                      {React.createElement(currentPillar.icon, { size: 22, color: "#FFFFFF" })}
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: "10px",
                          fontWeight: 800,
                          color: currentPillar.color,
                          textTransform: "uppercase",
                          letterSpacing: "0.5px",
                        }}
                      >
                        {currentPillar.badge} • Function
                      </span>
                      <Typography
                        sx={{
                          fontFamily: "'Quicksand', sans-serif",
                          fontWeight: 800,
                          fontSize: "19px",
                          color: brandColors.pantone432,
                          lineHeight: 1.15,
                        }}
                      >
                        {currentPillar.title}
                      </Typography>
                    </div>
                  </div>

                  <Typography
                    sx={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontWeight: 700,
                      fontSize: "13.5px",
                      color: "#1E293B",
                      lineHeight: 1.4,
                    }}
                  >
                    {currentPillar.actionText}
                  </Typography>

                  <div
                    style={{
                      backgroundColor: "#FFFFFF",
                      borderRadius: "10px",
                      padding: "8px 12px",
                      border: "1px solid rgba(0,0,0,0.06)",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "9.5px",
                        fontWeight: 800,
                        color: currentPillar.color,
                        textTransform: "uppercase",
                      }}
                    >
                      Key Pedagogical Benefit
                    </span>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: "#334155", marginTop: 2 }}>
                      {currentPillar.keyBenefit}
                    </div>
                  </div>
                </div>

                {/* Right Side: Concrete Classroom Artifact Visualization */}
                <div
                  style={{
                    backgroundColor: "#FFFFFF",
                    borderRadius: "12px",
                    padding: "14px 16px",
                    border: `1.5px solid ${currentPillar.color}40`,
                    boxShadow: "0 4px 14px rgba(0,0,0,0.04)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 8,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <span style={{ fontSize: "10px", fontWeight: 800, color: "#64748B", textTransform: "uppercase" }}>
                      Photosynthesis Unit Artifact
                    </span>
                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 800,
                        backgroundColor: currentPillar.color,
                        color: "#FFF",
                        padding: "2px 7px",
                        borderRadius: "10px",
                      }}
                    >
                      Active
                    </span>
                  </div>

                  <div
                    style={{
                      backgroundColor: currentPillar.lightBg,
                      borderRadius: "8px",
                      padding: "10px 12px",
                      fontSize: "12.5px",
                      fontWeight: 700,
                      color: "#0F172A",
                      lineHeight: 1.35,
                      borderLeft: `4px solid ${currentPillar.color}`,
                    }}
                  >
                    "{currentPillar.classroomArtifact}"
                  </div>

                  <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "11px", color: "#64748B" }}>
                    <Activity size={13} color={currentPillar.color} />
                    <span>Synchronously synced across all 35 enrolled student accounts</span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        ) : (
          /* --- B. ALL 5 PILLARS INFOGRAPHIC OVERVIEW --- */
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4 }}
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(5, 1fr)",
              gap: 10,
            }}
          >
            {LMS_PILLARS.map((p) => {
              const IconComponent = p.icon;
              return (
                <div
                  key={p.id}
                  style={{
                    backgroundColor: p.lightBg,
                    borderRadius: "12px",
                    border: `1.5px solid ${p.color}`,
                    padding: "12px 10px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: p.color,
                      color: "#FFFFFF",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <IconComponent size={16} />
                  </div>

                  <div>
                    <span style={{ fontSize: "9px", fontWeight: 800, color: p.color, textTransform: "uppercase" }}>
                      {p.badge}
                    </span>
                    <div style={{ fontSize: "12px", fontWeight: 800, color: "#0F172A", lineHeight: 1.2 }}>
                      {p.title}
                    </div>
                  </div>

                  <div
                    style={{
                      fontSize: "9.5px",
                      color: "#334155",
                      lineHeight: 1.3,
                      backgroundColor: "#FFFFFF",
                      padding: "6px 8px",
                      borderRadius: "6px",
                      width: "100%",
                      boxSizing: "border-box",
                      marginTop: "auto",
                      border: "1px solid rgba(0,0,0,0.05)",
                    }}
                  >
                    {p.classroomArtifact}
                  </div>
                </div>
              );
            })}
          </motion.div>
        )}

        {/* 4. FOOTER INTERACTION BAR */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderTop: "1px solid #E2E8F0",
            paddingTop: 10,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: "11px", fontWeight: 700, color: "#64748B" }}>
              {viewMode === "stepper" ? `Pillar ${activeStep} of 5` : "Complete 5-Pillar Infographic View"}
            </span>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Button
              size="small"
              onClick={handleBack}
              disabled={viewMode === "stepper" && activeStep === 1}
              startIcon={<ChevronLeft size={14} />}
              sx={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 700,
                fontSize: "11.5px",
                textTransform: "none",
                padding: "3px 10px",
              }}
            >
              Previous
            </Button>

            <Button
              size="small"
              onClick={handleNext}
              variant="contained"
              endIcon={<ChevronRight size={14} />}
              sx={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 800,
                fontSize: "11.5px",
                textTransform: "none",
                backgroundColor: "#10B981",
                padding: "4px 14px",
                "&:hover": { backgroundColor: "#059669" },
              }}
            >
              {viewMode === "overview"
                ? "Back to Step-by-Step"
                : activeStep < 5
                ? `Next: Pillar ${activeStep + 1}`
                : "View Full Synthesis"}
            </Button>
          </div>
        </div>
      </div>

      {/* 5. FINAL SYNTHESIS & CORE TAKEAWAY */}
      <div
        style={{
          backgroundColor: "#F0FDF4",
          border: "1.5px solid #86EFAC",
          borderRadius: "12px",
          padding: "12px 18px",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <CheckCircle2 size={16} color="#059669" />
          <Typography
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 800,
              fontSize: "13px",
              color: "#065F46",
            }}
          >
            "An LMS provides the digital environment where teachers organize, deliver, facilitate, and manage learning."
          </Typography>
        </div>

        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "8px",
            padding: "8px 12px",
            borderLeft: "4px solid #10B981",
          }}
        >
          <Typography
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 800,
              fontSize: "13px",
              color: "#047857",
              lineHeight: 1.35,
            }}
          >
            "An LMS is not the learning itself. It is the platform that helps teachers organize, deliver, and manage the learning experience."
          </Typography>
        </div>

        {onProceedToEvaluate && (
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
            <Button
              size="small"
              variant="outlined"
              onClick={onProceedToEvaluate}
              endIcon={<ArrowRight size={14} />}
              sx={{
                fontFamily: "'Quicksand', sans-serif",
                fontWeight: 700,
                fontSize: "11px",
                textTransform: "none",
                borderColor: "#10B981",
                color: "#065F46",
                "&:hover": { borderColor: "#059669", backgroundColor: "#ECFDF5" },
              }}
            >
              Proceed to E — Evaluate
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
