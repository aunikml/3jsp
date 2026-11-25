import React, { useState, useEffect } from "react";
import {
  Typography,
  Button,
  Chip,
  Paper,
  IconButton,
  LinearProgress,
  Tooltip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  FileText,
  UploadCloud,
  CheckCircle2,
  MousePointer,
} from "lucide-react";
import { brandColors } from "../theme/theme";

interface MoodleAssignmentWorkflowProps {
  onClose: () => void;
}

export const MoodleAssignmentWorkflow: React.FC<MoodleAssignmentWorkflowProps> = ({
  onClose,
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(true);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const steps = [
    {
      stepNumber: 1,
      title: "Locate & Click Assignment Activity",
      subtitle: "Student navigates the Moodle course section and selects the assignment item.",
    },
    {
      stepNumber: 2,
      title: "Review Submission Guidelines & Click 'Add Submission'",
      subtitle: "Examine due date, cut-off time, and rubrics, then launch the submission form.",
    },
    {
      stepNumber: 3,
      title: "Drag & Drop File into Moodle File Picker",
      subtitle: "Upload the completed document (.pdf or .docx) to the secure submission area.",
    },
    {
      stepNumber: 4,
      title: "Save Changes & Verify 'Submitted for Grading'",
      subtitle: "Commit the submission and receive timestamped verification with turnitin receipt.",
    },
  ];

  // Upload progress animation for Step 3
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (activeStep === 2) {
      setUploadProgress(0);
      let p = 0;
      timer = setInterval(() => {
        p += 15;
        if (p >= 100) {
          setUploadProgress(100);
          if (timer) clearInterval(timer);
        } else {
          setUploadProgress(p);
        }
      }, 150);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [activeStep]);

  // Auto-play steps cycle
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : 0));
      }, 5500);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isAutoPlaying, steps.length]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        width: "100%",
        maxWidth: 880,
        backgroundColor: "rgba(17, 24, 39, 0.96)",
        borderRadius: 20,
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 40px rgba(56, 189, 248, 0.15)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Top Window Bar - Moodle LMS Header */}
      <div
        style={{
          padding: "14px 24px",
          backgroundColor: "rgba(15, 23, 42, 0.9)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Moodle Orange Accent Badge */}
          <div
            style={{
              padding: "4px 10px",
              borderRadius: 6,
              backgroundColor: "#F98012",
              color: "#FFFFFF",
              fontWeight: 800,
              fontSize: "0.78rem",
              letterSpacing: "0.04em",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span>moodle</span>
          </div>

          <Typography variant="body2" sx={{ color: "#FFFFFF", fontWeight: 700 }}>
            Moodle LMS • Assignment Submission Workflow
          </Typography>

          <Chip
            label={`Step ${activeStep + 1} of ${steps.length}`}
            size="small"
            sx={{
              height: 22,
              backgroundColor: "rgba(56, 189, 248, 0.15)",
              color: "#38BDF8",
              fontWeight: 700,
              fontSize: "0.72rem",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Tooltip title={isAutoPlaying ? "Pause Auto Animation" : "Auto-Play Steps"}>
            <IconButton
              size="small"
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              sx={{
                color: isAutoPlaying ? brandColors.pantoneOrange : brandColors.pantoneCoolGray7,
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                "&:hover": { backgroundColor: "rgba(255, 255, 255, 0.12)" },
              }}
            >
              {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
            </IconButton>
          </Tooltip>

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
      </div>

      {/* Step Progress Pills */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 8,
          padding: "16px 24px 0 24px",
        }}
      >
        {steps.map((s, idx) => {
          const isCurrent = activeStep === idx;
          const isPassed = activeStep > idx;
          return (
            <button
              key={idx}
              onClick={() => {
                setActiveStep(idx);
                setIsAutoPlaying(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                padding: "8px 12px",
                borderRadius: 8,
                backgroundColor: isCurrent
                  ? "rgba(56, 189, 248, 0.18)"
                  : isPassed
                  ? "rgba(52, 211, 153, 0.1)"
                  : "rgba(255, 255, 255, 0.03)",
                border: isCurrent
                  ? "1px solid #38BDF8"
                  : isPassed
                  ? "1px solid rgba(52, 211, 153, 0.3)"
                  : "1px solid rgba(255, 255, 255, 0.06)",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s ease",
              }}
            >
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.75rem",
                  fontWeight: 800,
                  backgroundColor: isCurrent ? "#38BDF8" : isPassed ? "#34D399" : "rgba(255, 255, 255, 0.15)",
                  color: isCurrent || isPassed ? "#0B0F17" : "#FFFFFF",
                  flexShrink: 0,
                }}
              >
                {isPassed ? "✓" : s.stepNumber}
              </div>
              <Typography
                variant="caption"
                sx={{
                  color: isCurrent ? "#FFFFFF" : brandColors.pantoneCoolGray7,
                  fontWeight: isCurrent ? 700 : 500,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                }}
              >
                {s.title}
              </Typography>
            </button>
          );
        })}
      </div>

      {/* Animated Step Stage Area */}
      <div style={{ padding: "20px 24px", minHeight: 330, display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <AnimatePresence mode="wait">
          {/* STEP 1: LOCATE AND CLICK ACTIVITY */}
          {activeStep === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div>
                <Typography variant="h6" sx={{ color: "#38BDF8", fontWeight: 700 }}>
                  Step 1: Locate Activity on Course Page
                </Typography>
                <Typography variant="body2" sx={{ color: brandColors.pantoneCoolGray7, mt: 0.5 }}>
                  The student scrolls to the weekly topic in Moodle and clicks the Assignment icon.
                </Typography>
              </div>

              {/* Moodle Course Section Mockup */}
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: "rgba(0, 0, 0, 0.35)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 3,
                }}
              >
                <Typography variant="caption" sx={{ color: brandColors.pantoneOrange, fontWeight: 700, letterSpacing: "0.06em" }}>
                  TOPIC 04 • DIGITAL PEDAGOGY & CURRICULUM
                </Typography>

                <div
                  style={{
                    marginTop: 14,
                    display: "flex",
                    flexDirection: "column",
                    gap: 10,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 14px",
                      borderRadius: 8,
                      backgroundColor: "rgba(255, 255, 255, 0.03)",
                    }}
                  >
                    <FileText size={18} color="#94A3B8" />
                    <Typography variant="body2" sx={{ color: "#94A3B8" }}>
                      Lecture Notes 04: Frameworks of Educational Software.pdf
                    </Typography>
                  </div>

                  {/* Target Assignment with Pulsing Click Animation */}
                  <motion.div
                    animate={{
                      boxShadow: [
                        "0 0 0px rgba(56, 189, 248, 0)",
                        "0 0 20px rgba(56, 189, 248, 0.4)",
                        "0 0 0px rgba(56, 189, 248, 0)",
                      ],
                    }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 16px",
                      borderRadius: 10,
                      backgroundColor: "rgba(56, 189, 248, 0.12)",
                      border: "1.5px solid #38BDF8",
                      position: "relative",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      {/* Iconic Moodle Assignment Icon with clip badge */}
                      <div
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          backgroundColor: "#F98012",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <FileText size={18} color="#FFFFFF" />
                      </div>
                      <div>
                        <Typography variant="subtitle2" sx={{ color: "#FFFFFF", fontWeight: 700 }}>
                          Assignment 1: Pedagogy & Technology Essay
                        </Typography>
                        <Typography variant="caption" sx={{ color: "#38BDF8" }}>
                          Due: Friday, 28 November, 23:59 BST
                        </Typography>
                      </div>
                    </div>

                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <Chip
                        label="Click to Open"
                        size="small"
                        sx={{
                          backgroundColor: "#38BDF8",
                          color: "#0B0F17",
                          fontWeight: 800,
                          fontSize: "0.7rem",
                        }}
                      />
                      <motion.div
                        animate={{ x: [0, 6, 0] }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                      >
                        <MousePointer size={18} color="#38BDF8" />
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </Paper>
            </motion.div>
          )}

          {/* STEP 2: REVIEW STATUS & CLICK ADD SUBMISSION */}
          {activeStep === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div>
                <Typography variant="h6" sx={{ color: "#38BDF8", fontWeight: 700 }}>
                  Step 2: Review Moodle Submission Status
                </Typography>
                <Typography variant="body2" sx={{ color: brandColors.pantoneCoolGray7, mt: 0.5 }}>
                  The submission table outlines the current attempt, due date, and grading state.
                </Typography>
              </div>

              {/* Moodle Status Table */}
              <Paper
                sx={{
                  p: 2.5,
                  backgroundColor: "rgba(0, 0, 0, 0.35)",
                  border: "1px solid rgba(255, 255, 255, 0.08)",
                  borderRadius: 3,
                }}
              >
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <Typography variant="caption" sx={{ color: brandColors.pantoneCoolGray7 }}>Submission status</Typography>
                      <Chip label="No attempt" size="small" sx={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#FFFFFF", height: 20, fontSize: "0.7rem" }} />
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <Typography variant="caption" sx={{ color: brandColors.pantoneCoolGray7 }}>Grading status</Typography>
                      <Typography variant="caption" sx={{ color: "#CBD5E1", fontWeight: 600 }}>Not graded</Typography>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <Typography variant="caption" sx={{ color: brandColors.pantoneCoolGray7 }}>Due date</Typography>
                      <Typography variant="caption" sx={{ color: "#FFFFFF", fontWeight: 600 }}>Friday, 28 Nov, 23:59</Typography>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
                      <Typography variant="caption" sx={{ color: brandColors.pantoneCoolGray7 }}>Time remaining</Typography>
                      <Typography variant="caption" sx={{ color: "#38BDF8", fontWeight: 700 }}>2 days 4 hours</Typography>
                    </div>
                  </div>
                </div>

                {/* Animated "Add submission" button */}
                <div style={{ marginTop: 20, textAlign: "center" }}>
                  <motion.div
                    animate={{ scale: [1, 1.04, 1] }}
                    transition={{ repeat: Infinity, duration: 1.8 }}
                    style={{ display: "inline-block" }}
                  >
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#F98012",
                        color: "#FFFFFF",
                        fontWeight: 800,
                        px: 4,
                        py: 1.2,
                        borderRadius: 2,
                        textTransform: "none",
                        fontSize: "0.95rem",
                        boxShadow: "0 6px 20px rgba(249, 128, 18, 0.45)",
                        "&:hover": { backgroundColor: "#E06F0B" },
                      }}
                    >
                      Add submission
                    </Button>
                  </motion.div>
                </div>
              </Paper>
            </motion.div>
          )}

          {/* STEP 3: DRAG AND DROP FILE UPLOAD */}
          {activeStep === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div>
                <Typography variant="h6" sx={{ color: "#38BDF8", fontWeight: 700 }}>
                  Step 3: Moodle File Picker Upload Area
                </Typography>
                <Typography variant="body2" sx={{ color: brandColors.pantoneCoolGray7, mt: 0.5 }}>
                  The student drops their completed assignment document into the designated drop-zone.
                </Typography>
              </div>

              {/* Moodle Dropzone Simulation */}
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: "rgba(0, 0, 0, 0.35)",
                  border: "2px dashed rgba(56, 189, 248, 0.5)",
                  borderRadius: 3,
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 12,
                  minHeight: 180,
                }}
              >
                {/* Floating animated file icon dropping into area */}
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                >
                  <div
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: 14,
                      backgroundColor: "rgba(56, 189, 248, 0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <UploadCloud size={28} color="#38BDF8" />
                  </div>
                </motion.div>

                <div>
                  <Typography variant="subtitle2" sx={{ color: "#FFFFFF", fontWeight: 700 }}>
                    You can drag and drop files here to add them.
                  </Typography>
                  <Typography variant="caption" sx={{ color: brandColors.pantoneCoolGray7 }}>
                    Accepted file formats: PDF (.pdf), Word (.docx) • Max size: 20MB
                  </Typography>
                </div>

                {/* Simulated Dropped File with Progress Bar */}
                <div
                  style={{
                    width: "100%",
                    maxWidth: 380,
                    padding: "10px 14px",
                    borderRadius: 8,
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <FileText size={16} color="#38BDF8" />
                      <Typography variant="caption" sx={{ color: "#FFFFFF", fontWeight: 600 }}>
                        Pedagogy_Essay_Final_v1.pdf
                      </Typography>
                    </div>
                    <Typography variant="caption" sx={{ color: "#34D399", fontWeight: 700 }}>
                      {uploadProgress}%
                    </Typography>
                  </div>
                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                    sx={{
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: uploadProgress === 100 ? "#34D399" : "#38BDF8",
                      },
                    }}
                  />
                </div>
              </Paper>
            </motion.div>
          )}

          {/* STEP 4: SAVE CHANGES & CONFIRMATION */}
          {activeStep === 3 && (
            <motion.div
              key="step-3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              style={{ display: "flex", flexDirection: "column", gap: 16 }}
            >
              <div>
                <Typography variant="h6" sx={{ color: "#34D399", fontWeight: 700 }}>
                  Step 4: Save & Verified Submission Receipt
                </Typography>
                <Typography variant="body2" sx={{ color: brandColors.pantoneCoolGray7, mt: 0.5 }}>
                  The attempt is locked in Moodle, and the status changes to green confirmation.
                </Typography>
              </div>

              {/* Moodle Submission Confirmation Card */}
              <Paper
                sx={{
                  p: 3,
                  backgroundColor: "rgba(0, 0, 0, 0.35)",
                  border: "1px solid rgba(52, 211, 153, 0.4)",
                  borderRadius: 3,
                  display: "flex",
                  flexDirection: "column",
                  gap: 16,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      backgroundColor: "rgba(52, 211, 153, 0.2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CheckCircle2 size={26} color="#34D399" />
                  </div>
                  <div>
                    <Typography variant="subtitle1" sx={{ color: "#FFFFFF", fontWeight: 700 }}>
                      Submission Successfully Recorded
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#34D399", fontWeight: 600 }}>
                      Turnitin Digital Receipt ID: #MOODLE-78921-2026
                    </Typography>
                  </div>
                </div>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: 12,
                    padding: 12,
                    borderRadius: 8,
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                  }}
                >
                  <div>
                    <Typography variant="caption" sx={{ color: brandColors.pantoneCoolGray7 }}>Submission status</Typography>
                    <div style={{ marginTop: 4 }}>
                      <Chip
                        label="Submitted for grading"
                        size="small"
                        sx={{
                          backgroundColor: "rgba(52, 211, 153, 0.2)",
                          color: "#34D399",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <Typography variant="caption" sx={{ color: brandColors.pantoneCoolGray7 }}>Last modified</Typography>
                    <Typography variant="body2" sx={{ color: "#FFFFFF", fontWeight: 600, mt: 0.5 }}>
                      Wednesday, 25 Nov, 14:32 (On time)
                    </Typography>
                  </div>
                </div>
              </Paper>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Navigation within Moodle Modal */}
      <div
        style={{
          padding: "12px 24px",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          backgroundColor: "rgba(15, 23, 42, 0.7)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Button
          size="small"
          onClick={() => {
            setActiveStep((prev) => Math.max(0, prev - 1));
            setIsAutoPlaying(false);
          }}
          disabled={activeStep === 0}
          startIcon={<ChevronLeft size={16} />}
          sx={{
            color: "#FFFFFF",
            textTransform: "none",
            "&.Mui-disabled": { color: "rgba(255,255,255,0.2)" },
          }}
        >
          Previous Step
        </Button>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setActiveStep(0);
              setIsAutoPlaying(true);
            }}
            startIcon={<RotateCcw size={14} />}
            sx={{
              borderColor: "rgba(255,255,255,0.2)",
              color: "#FFFFFF",
              fontSize: "0.75rem",
              textTransform: "none",
            }}
          >
            Replay Workflow
          </Button>

          <Button
            size="small"
            variant="contained"
            onClick={onClose}
            sx={{
              backgroundColor: brandColors.pantoneOrange,
              color: "#FFFFFF",
              fontWeight: 700,
              fontSize: "0.78rem",
              textTransform: "none",
              borderRadius: 2,
              "&:hover": { backgroundColor: "#D84400" },
            }}
          >
            Done • Back to Branches
          </Button>
        </div>

        <Button
          size="small"
          onClick={() => {
            setActiveStep((prev) => Math.min(steps.length - 1, prev + 1));
            setIsAutoPlaying(false);
          }}
          disabled={activeStep === steps.length - 1}
          endIcon={<ChevronRight size={16} />}
          sx={{
            color: "#FFFFFF",
            textTransform: "none",
            "&.Mui-disabled": { color: "rgba(255,255,255,0.2)" },
          }}
        >
          Next Step
        </Button>
      </div>
    </motion.div>
  );
};
