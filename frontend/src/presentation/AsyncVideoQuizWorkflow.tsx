import React, { useState, useEffect, useRef } from "react";
import {
  Typography,
  Button,
  Chip,
  Paper,
  IconButton,
  Tooltip,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Lock,
  Unlock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Volume2,
  VolumeX,
  HelpCircle,
  Heart,
  Sparkles,
} from "lucide-react";
import { brandColors } from "../theme/theme";

interface AsyncVideoQuizWorkflowProps {
  onClose: () => void;
}

export const AsyncVideoQuizWorkflow: React.FC<AsyncVideoQuizWorkflowProps> = ({
  onClose,
}) => {
  // Stages: "video1" (Playing Mental Health Video) | "quiz" (Checkpoint) | "video2" (Unlocked Video 2)
  const [stage, setStage] = useState<"video1" | "quiz" | "video2">("video1");
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [videoProgress, setVideoProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizStatus, setQuizStatus] = useState<"unanswered" | "correct" | "wrong">("unanswered");
  const [wrongAttempts, setWrongAttempts] = useState<number>(0);
  const [videoError, setVideoError] = useState<boolean>(false);
  const useRealVideo = true;

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Closed caption narration text synchronized with playback
  const captions = [
    { at: 0, text: "Welcome to Mental Health in Education: Adolescent Emotional Regulation." },
    { at: 6, text: "In high-stress learning environments, cognitive fatigue triggers the fight-or-flight response." },
    { at: 12, text: "Notice the grounding rhythm: deep diaphragmatic breathing calms the amygdala." },
    { at: 18, text: "Prepare for the knowledge check on emotional stabilization..." },
  ];

  const currentCaption =
    [...captions].reverse().find((c) => currentTime >= c.at)?.text ||
    captions[0].text;

  const mentalHealthQuiz = {
    prompt: "According to this mental health module, how should an educator respond when a student experiences acute classroom anxiety?",
    options: [
      {
        id: 0,
        text: "Demand the student immediately complete a timed test to redirect their attention.",
        isCorrect: false,
      },
      {
        id: 1,
        text: "Guide the student through sensory grounding and breathing exercises before asking for cognitive tasks.",
        isCorrect: true,
      },
      {
        id: 2,
        text: "Publicly point out their disengagement in front of peers to prompt quick recovery.",
        isCorrect: false,
      },
    ],
  };

  // Video playback & timer logic
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (stage === "video1" && isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((t) => {
          const nextTime = t + 1;
          const prog = Math.min(100, Math.round((nextTime / 30) * 100));
          setVideoProgress(prog);

          // Checkpoint triggered at 20 seconds
          if (nextTime >= 20) {
            setIsPlaying(false);
            if (videoRef.current) {
              videoRef.current.pause();
            }
            setStage("quiz");
            return 20;
          }
          return nextTime;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [stage, isPlaying]);

  // Video element play/pause synchronization
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying && stage === "video1") {
        videoRef.current.play().catch(() => setVideoError(true));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, stage]);

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    const chosen = mentalHealthQuiz.options.find((o) => o.id === selectedOption);
    if (chosen?.isCorrect) {
      setQuizStatus("correct");
    } else {
      setQuizStatus("wrong");
      setWrongAttempts((prev) => prev + 1);
    }
  };

  const handleRetryQuiz = () => {
    setSelectedOption(null);
    setQuizStatus("unanswered");
  };

  const handleProceedToNextVideo = () => {
    if (quizStatus === "correct") {
      setStage("video2");
      setIsPlaying(true);
      setCurrentTime(0);
      setVideoProgress(5);
    }
  };

  const handleRestart = () => {
    setStage("video1");
    setIsPlaying(true);
    setCurrentTime(0);
    setVideoProgress(0);
    setSelectedOption(null);
    setQuizStatus("unanswered");
    setWrongAttempts(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const togglePlayPause = () => {
    if (stage === "quiz") return;
    setIsPlaying((prev) => !prev);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 15 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 15 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      style={{
        width: "100%",
        maxWidth: 900,
        backgroundColor: "rgba(11, 15, 23, 0.96)",
        borderRadius: 20,
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: "0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 45px rgba(52, 211, 153, 0.18)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Top Window Bar: Mental Health Theme Header */}
      <div
        style={{
          padding: "14px 24px",
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
              padding: "4px 10px",
              borderRadius: 6,
              backgroundColor: "#10B981",
              color: "#0B0F17",
              fontWeight: 800,
              fontSize: "0.78rem",
              letterSpacing: "0.04em",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <Heart size={14} color="#0B0F17" />
            <span>MENTAL HEALTH PILLAR</span>
          </div>

          <Typography variant="body2" sx={{ color: "#FFFFFF", fontWeight: 700 }}>
            {stage === "video2"
              ? "Video 2: Trauma-Informed Classroom Strategies (Unlocked)"
              : "Video 1: Student Emotional Regulation & Mindfulness"}
          </Typography>

          <Chip
            label={
              stage === "video1"
                ? "Streaming Video..."
                : stage === "quiz"
                ? "Checkpoint Quiz"
                : "Video 2 Unlocked"
            }
            size="small"
            sx={{
              height: 22,
              backgroundColor:
                stage === "video2"
                  ? "rgba(52, 211, 153, 0.2)"
                  : stage === "quiz"
                  ? "rgba(255, 81, 0, 0.2)"
                  : "rgba(56, 189, 248, 0.18)",
              color:
                stage === "video2"
                  ? "#34D399"
                  : stage === "quiz"
                  ? brandColors.pantoneOrange
                  : "#38BDF8",
              fontWeight: 700,
              fontSize: "0.72rem",
            }}
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Button
            size="small"
            variant="outlined"
            onClick={handleRestart}
            startIcon={<RotateCcw size={14} />}
            sx={{
              color: brandColors.pantoneCoolGray7,
              borderColor: "rgba(255, 255, 255, 0.15)",
              fontSize: "0.75rem",
              textTransform: "none",
              borderRadius: 2,
              "&:hover": { color: "#FFFFFF", borderColor: "#FFFFFF" },
            }}
          >
            Restart
          </Button>

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

      {/* Main Video & Quiz Stage Area */}
      <div style={{ padding: "20px 24px", minHeight: 380, display: "flex", flexDirection: "column", gap: 16 }}>
        {/* MENTAL HEALTH VIDEO PLAYER CONTAINER */}
        <Paper
          sx={{
            width: "100%",
            height: 260,
            borderRadius: 3,
            backgroundColor: "#030712",
            border: `2px solid ${
              quizStatus === "wrong"
                ? "#EF4444"
                : stage === "video2"
                ? "#34D399"
                : "rgba(52, 211, 153, 0.3)"
            }`,
            overflow: "hidden",
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            boxShadow:
              quizStatus === "wrong"
                ? "0 0 30px rgba(239, 68, 68, 0.35)"
                : stage === "video2"
                ? "0 0 30px rgba(52, 211, 153, 0.3)"
                : "0 10px 30px rgba(0, 0, 0, 0.5)",
            transition: "all 0.3s ease",
          }}
        >
          {/* Real HTML5 Video or Animated Mental Health Session Visual */}
          {useRealVideo && !videoError && stage === "video1" ? (
            <video
              ref={videoRef}
              src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
              playsInline
              muted={isMuted}
              loop
              onError={() => setVideoError(true)}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                objectFit: "cover",
                opacity: 0.65,
                filter: "brightness(0.85) contrast(1.1)",
              }}
            />
          ) : null}

          {/* Calming Mental Health Ambient Visualizer Overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                stage === "video2"
                  ? "radial-gradient(circle at 50% 40%, rgba(16, 185, 129, 0.25) 0%, rgba(3, 7, 18, 0.85) 75%)"
                  : "radial-gradient(circle at 50% 40%, rgba(6, 182, 212, 0.2) 0%, rgba(3, 7, 18, 0.85) 75%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
              gap: 12,
              zIndex: 2,
            }}
          >
            {stage === "video1" && (
              <>
                {/* Pulsing Breathing Guide Circle for Mental Health */}
                <motion.div
                  animate={{
                    scale: isPlaying ? [1, 1.25, 1] : 1,
                    opacity: isPlaying ? [0.7, 1, 0.7] : 0.8,
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    backgroundColor: "rgba(52, 211, 153, 0.2)",
                    border: "2px solid #34D399",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 25px rgba(52, 211, 153, 0.4)",
                  }}
                >
                  <Heart size={32} color="#34D399" />
                </motion.div>

                <div style={{ textAlign: "center" }}>
                  <Typography variant="subtitle1" sx={{ color: "#FFFFFF", fontWeight: 700, letterSpacing: "0.02em" }}>
                    Lesson 1.1: Mindfulness & Diaphragmatic Breathing
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#34D399", fontWeight: 600 }}>
                    {isPlaying
                      ? "● Live Video Playing • Breathing Exercise Active (Checkpoint at 0:20)"
                      : "⏸ Video Paused at Knowledge Checkpoint"}
                  </Typography>
                </div>
              </>
            )}

            {stage === "quiz" && (
              <div style={{ textAlign: "center", padding: "0 20px" }}>
                <Chip
                  icon={<HelpCircle size={14} color="#F59E0B" />}
                  label="CHECKPOINT PAUSE • MASTERY REQUIRED"
                  sx={{
                    backgroundColor: "rgba(245, 158, 11, 0.2)",
                    color: "#F59E0B",
                    fontWeight: 700,
                    fontSize: "0.75rem",
                    mb: 1,
                  }}
                />
                <Typography variant="h6" sx={{ color: "#FFFFFF", fontWeight: 700 }}>
                  Checkpoint Reached: Answer the Mental Health Question Below
                </Typography>
              </div>
            )}

            {stage === "video2" && (
              <>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  style={{
                    width: 68,
                    height: 68,
                    borderRadius: "50%",
                    backgroundColor: "rgba(52, 211, 153, 0.25)",
                    border: "2px solid #34D399",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 0 30px rgba(52, 211, 153, 0.5)",
                  }}
                >
                  <CheckCircle2 size={36} color="#34D399" />
                </motion.div>
                <div style={{ textAlign: "center" }}>
                  <Typography variant="h6" sx={{ color: "#34D399", fontWeight: 800 }}>
                    Video 2 Unlocked: Trauma-Informed Classroom Scaffolding
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#E2E8F0" }}>
                    Emotional regulation prerequisite completed • Next session loaded
                  </Typography>
                </div>
              </>
            )}
          </div>

          {/* Top Video Header: Topic Badge & Audio Toggle */}
          <div style={{ position: "relative", zIndex: 5, padding: "12px 16px", display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <Chip
                label={stage === "video2" ? "PART 2: TRAUMA-INFORMED" : "PART 1: MINDFULNESS"}
                size="small"
                sx={{ backgroundColor: "rgba(0,0,0,0.65)", color: "#FFFFFF", fontWeight: 700, fontSize: "0.68rem" }}
              />
              <Chip
                icon={<Sparkles size={11} color="#34D399" />}
                label="Mental Health & Psychosocial"
                size="small"
                sx={{ backgroundColor: "rgba(52, 211, 153, 0.2)", color: "#34D399", fontWeight: 700, fontSize: "0.68rem" }}
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Tooltip title={isMuted ? "Unmute Audio" : "Mute Audio"}>
                <IconButton
                  size="small"
                  onClick={() => setIsMuted(!isMuted)}
                  sx={{ color: "#FFFFFF", backgroundColor: "rgba(0,0,0,0.5)" }}
                >
                  {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
                </IconButton>
              </Tooltip>
              <Typography variant="caption" sx={{ color: "#94A3B8", fontWeight: 600 }}>
                1080p Full HD
              </Typography>
            </div>
          </div>

          {/* Live Subtitle / Closed Caption Bar */}
          {stage === "video1" && (
            <div
              style={{
                position: "relative",
                zIndex: 5,
                margin: "0 16px 8px 16px",
                padding: "6px 14px",
                borderRadius: 8,
                backgroundColor: "rgba(0, 0, 0, 0.75)",
                backdropFilter: "blur(4px)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                textAlign: "center",
              }}
            >
              <Typography variant="caption" sx={{ color: "#F1F5F9", fontStyle: "italic", fontWeight: 500 }}>
                💬 CC: "{currentCaption}"
              </Typography>
            </div>
          )}

          {/* Bottom Video Controls & Timeline with Checkpoint Marker */}
          <div
            style={{
              position: "relative",
              zIndex: 5,
              padding: "10px 16px",
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              backdropFilter: "blur(8px)",
              display: "flex",
              flexDirection: "column",
              gap: 8,
            }}
          >
            {/* Timeline Bar with Quiz Checkpoint Dot */}
            <div style={{ position: "relative", width: "100%", height: 6, backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 3 }}>
              {/* Progress fill */}
              <div
                style={{
                  width: `${videoProgress}%`,
                  height: "100%",
                  backgroundColor: stage === "video2" ? "#34D399" : "#38BDF8",
                  borderRadius: 3,
                  transition: "width 0.3s ease",
                }}
              />
              {/* Yellow Checkpoint Marker at 66% (20s mark) */}
              <div
                style={{
                  position: "absolute",
                  left: "66%",
                  top: "50%",
                  transform: "translate(-50%, -50%)",
                  width: 14,
                  height: 14,
                  borderRadius: "50%",
                  backgroundColor: "#F59E0B",
                  border: "2px solid #FFFFFF",
                  boxShadow: "0 0 10px #F59E0B",
                  zIndex: 2,
                }}
                title="Checkpoint: Mental Health Quiz (0:20)"
              />
            </div>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <IconButton
                  size="small"
                  onClick={togglePlayPause}
                  disabled={stage === "quiz"}
                  sx={{ color: "#FFFFFF", padding: 0.5 }}
                >
                  {isPlaying ? <Pause size={16} /> : <Play size={16} />}
                </IconButton>
                <Typography variant="caption" sx={{ color: "#CBD5E1", fontWeight: 600 }}>
                  {stage === "video1"
                    ? `0:${currentTime < 10 ? `0${currentTime}` : currentTime} / 0:30`
                    : stage === "quiz"
                    ? "0:20 / 0:30 (Quiz Point)"
                    : "0:04 / 0:45"}
                </Typography>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: "#F59E0B" }} />
                <Typography variant="caption" sx={{ color: "#F59E0B", fontWeight: 700, fontSize: "0.72rem" }}>
                  Knowledge Checkpoint (0:20)
                </Typography>
              </div>
            </div>
          </div>
        </Paper>

        {/* MENTAL HEALTH IN-VIDEO QUIZ */}
        {(stage === "quiz" || stage === "video1") && (
          <Paper
            sx={{
              p: 2.5,
              borderRadius: 3,
              backgroundColor: "rgba(0, 0, 0, 0.45)",
              border: `1.5px solid ${
                quizStatus === "wrong"
                  ? "#EF4444"
                  : quizStatus === "correct"
                  ? "#34D399"
                  : "rgba(255, 255, 255, 0.08)"
              }`,
              transition: "border 0.25s ease",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Heart size={16} color="#34D399" />
                <Typography variant="subtitle2" sx={{ color: "#FFFFFF", fontWeight: 700 }}>
                  Psychosocial Knowledge Check • {mentalHealthQuiz.prompt}
                </Typography>
              </div>
              {stage === "video1" && (
                <Chip
                  label="Unlocks at 0:20"
                  size="small"
                  sx={{ backgroundColor: "rgba(255,255,255,0.06)", color: "#94A3B8", fontSize: "0.7rem" }}
                />
              )}
            </div>

            {/* Quiz Options */}
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
              {mentalHealthQuiz.options.map((option) => {
                const isSelected = selectedOption === option.id;
                let borderColor = "rgba(255, 255, 255, 0.1)";
                let bgColor = "rgba(255, 255, 255, 0.03)";

                if (isSelected) {
                  if (quizStatus === "correct") {
                    borderColor = "#34D399";
                    bgColor = "rgba(52, 211, 153, 0.15)";
                  } else if (quizStatus === "wrong") {
                    borderColor = "#EF4444";
                    bgColor = "rgba(239, 68, 68, 0.15)";
                  } else {
                    borderColor = "#38BDF8";
                    bgColor = "rgba(56, 189, 248, 0.12)";
                  }
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => {
                      if (quizStatus !== "correct") {
                        setSelectedOption(option.id);
                        if (quizStatus === "wrong") setQuizStatus("unanswered");
                      }
                    }}
                    disabled={stage === "video1" || quizStatus === "correct"}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "10px 14px",
                      borderRadius: 10,
                      backgroundColor: bgColor,
                      border: `1.5px solid ${borderColor}`,
                      cursor: stage === "video1" || quizStatus === "correct" ? "default" : "pointer",
                      textAlign: "left",
                      color: "#FFFFFF",
                      transition: "all 0.2s ease",
                    }}
                  >
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: "50%",
                        border: `2px solid ${
                          isSelected
                            ? quizStatus === "correct"
                              ? "#34D399"
                              : quizStatus === "wrong"
                              ? "#EF4444"
                              : "#38BDF8"
                            : "rgba(255,255,255,0.3)"
                        }`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                      }}
                    >
                      {isSelected && (
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            backgroundColor:
                              quizStatus === "correct"
                                ? "#34D399"
                                : quizStatus === "wrong"
                                ? "#EF4444"
                                : "#38BDF8",
                          }}
                        />
                      )}
                    </div>
                    <Typography variant="body2" sx={{ fontSize: "0.85rem", color: "#FFFFFF" }}>
                      {option.text}
                    </Typography>
                  </button>
                );
              })}
            </div>

            {/* FEEDBACK STATUS BANNER */}
            <AnimatePresence>
              {quizStatus === "wrong" && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    marginTop: 12,
                    padding: "10px 14px",
                    borderRadius: 8,
                    backgroundColor: "rgba(239, 68, 68, 0.15)",
                    border: "1px solid #EF4444",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <XCircle size={18} color="#EF4444" />
                    <div>
                      <Typography variant="caption" sx={{ color: "#EF4444", fontWeight: 800 }}>
                        INCORRECT ANSWER • ADVANCE BLOCKED
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#FECACA", fontSize: "0.8rem" }}>
                        In an LMS mental health module, emotional safety must be restored before demands are placed on the student. You are not allowed to advance to the next video!
                      </Typography>
                    </div>
                  </div>
                  <Button
                    size="small"
                    onClick={handleRetryQuiz}
                    sx={{
                      color: "#FFFFFF",
                      backgroundColor: "rgba(239, 68, 68, 0.3)",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      textTransform: "none",
                      "&:hover": { backgroundColor: "#EF4444" },
                    }}
                  >
                    Try Again
                  </Button>
                </motion.div>
              )}

              {quizStatus === "correct" && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  style={{
                    marginTop: 12,
                    padding: "10px 14px",
                    borderRadius: 8,
                    backgroundColor: "rgba(52, 211, 153, 0.15)",
                    border: "1px solid #34D399",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                >
                  <CheckCircle2 size={18} color="#34D399" />
                  <div>
                    <Typography variant="caption" sx={{ color: "#34D399", fontWeight: 800 }}>
                      CORRECT ANSWER • NEXT VIDEO UNLOCKED!
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#D1FAE5", fontSize: "0.8rem" }}>
                      Sensory grounding lowers autonomic arousal and restores prefrontal cortex functioning. You may now advance to Video 2.
                    </Typography>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Action Bar for Submitting Answer */}
            {stage === "quiz" && quizStatus !== "correct" && (
              <div style={{ marginTop: 14, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  size="small"
                  variant="contained"
                  onClick={handleSubmitAnswer}
                  disabled={selectedOption === null}
                  sx={{
                    backgroundColor: "#34D399",
                    color: "#0B0F17",
                    fontWeight: 800,
                    textTransform: "none",
                    borderRadius: 2,
                    px: 3,
                    "&:hover": { backgroundColor: "#10B981", color: "#FFFFFF" },
                    "&.Mui-disabled": { backgroundColor: "rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)" },
                  }}
                >
                  Submit Answer
                </Button>
              </div>
            )}
          </Paper>
        )}
      </div>

      {/* Footer Navigation Bar with Lock Indicator */}
      <div
        style={{
          padding: "14px 24px",
          borderTop: "1px solid rgba(255, 255, 255, 0.08)",
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Chip
            icon={
              quizStatus === "correct" || stage === "video2" ? (
                <Unlock size={14} color="#34D399" />
              ) : (
                <Lock size={14} color="#EF4444" />
              )
            }
            label={
              quizStatus === "correct" || stage === "video2"
                ? "Video 2: Unlocked"
                : "Video 2: Locked (Answer mental health quiz correctly)"
            }
            size="small"
            sx={{
              backgroundColor:
                quizStatus === "correct" || stage === "video2"
                  ? "rgba(52, 211, 153, 0.15)"
                  : "rgba(239, 68, 68, 0.15)",
              color: quizStatus === "correct" || stage === "video2" ? "#34D399" : "#EF4444",
              fontWeight: 700,
              fontSize: "0.75rem",
              border: `1px solid ${
                quizStatus === "correct" || stage === "video2"
                  ? "rgba(52, 211, 153, 0.3)"
                  : "rgba(239, 68, 68, 0.3)"
              }`,
            }}
          />
          {wrongAttempts > 0 && quizStatus !== "correct" && (
            <Typography variant="caption" sx={{ color: "#EF4444", fontWeight: 600 }}>
              Attempts: {wrongAttempts} (Must pass to advance)
            </Typography>
          )}
        </div>

        {/* GATED "NEXT VIDEO" BUTTON */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {stage === "video2" ? (
            <Button
              size="small"
              variant="contained"
              onClick={onClose}
              sx={{
                backgroundColor: brandColors.pantoneOrange,
                color: "#FFFFFF",
                fontWeight: 700,
                textTransform: "none",
                borderRadius: 2,
                px: 3,
                "&:hover": { backgroundColor: "#D84400" },
              }}
            >
              Done • Back to Branches
            </Button>
          ) : (
            <Tooltip
              title={
                quizStatus !== "correct"
                  ? "User is not allowed to move to the next video until the quiz is answered correctly!"
                  : "Proceed to Video 2"
              }
            >
              <span>
                <Button
                  size="small"
                  variant="contained"
                  disabled={quizStatus !== "correct"}
                  onClick={handleProceedToNextVideo}
                  endIcon={
                    quizStatus === "correct" ? (
                      <ArrowRight size={16} />
                    ) : (
                      <Lock size={16} color="rgba(255,255,255,0.4)" />
                    )
                  }
                  sx={{
                    backgroundColor: "#34D399",
                    color: "#0B0F17",
                    fontWeight: 800,
                    textTransform: "none",
                    borderRadius: 2,
                    px: 3,
                    py: 1,
                    boxShadow: quizStatus === "correct" ? "0 4px 20px rgba(52, 211, 153, 0.4)" : "none",
                    "&:hover": {
                      backgroundColor: "#10B981",
                      color: "#FFFFFF",
                    },
                    "&.Mui-disabled": {
                      backgroundColor: "rgba(255, 255, 255, 0.08)",
                      color: "rgba(255, 255, 255, 0.3)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    },
                  }}
                >
                  {quizStatus === "correct" ? "Proceed to Video 2" : "Next Video (Locked)"}
                </Button>
              </span>
            </Tooltip>
          )}
        </div>
      </div>
    </motion.div>
  );
};
