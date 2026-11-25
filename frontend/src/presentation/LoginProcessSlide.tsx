import React, { useState } from "react";
import {
  Typography,
  Button,
  IconButton,
  Chip,
  Paper,
} from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  UserCheck,
  Key,
  ShieldAlert,
  GraduationCap,
  LogIn,
  ExternalLink,
  Copy,
  Check,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { brandColors } from "../theme/theme";

export const LoginProcessSlide: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(true);
  const [activeStepIndex, setActiveStepIndex] = useState<number | null>(null);
  const [copiedUrl, setCopiedUrl] = useState<boolean>(false);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [simStep, setSimStep] = useState<number>(1);

  const steps = [
    {
      step: 1,
      tag: "PORTAL ACCESS",
      icon: <Globe size={22} color="#38BDF8" />,
      color: "#38BDF8",
      title: "Portal URL",
      description: "Go to: http://lms.bracu.ac.bd",
      url: "http://lms.bracu.ac.bd",
      detail: "Open any web browser and navigate directly to the official BRACU Moodle portal.",
    },
    {
      step: 2,
      tag: "AUTHENTICATION",
      icon: <UserCheck size={22} color="#A855F7" />,
      color: "#A855F7",
      title: "Username",
      description: "Use your PIN address (the one you provided during registration) as your username.",
      detail: "Your institutional PIN email address serves as your official unique LMS user identifier.",
    },
    {
      step: 3,
      tag: "CREDENTIALS",
      icon: <Key size={22} color="#F59E0B" />,
      color: "#F59E0B",
      title: "Password",
      description: "Use PIN as your password.",
      detail: "Enter your registered PIN code into the password field for initial account verification.",
    },
    {
      step: 4,
      tag: "SECURITY ONBOARDING",
      icon: <ShieldAlert size={22} color="#EF4444" />,
      color: "#EF4444",
      title: "First-Time Change",
      description:
        "Upon your first login, you will be prompted to change your password. Enter changeme in the Current Password field, then set a new password of your choice.",
      codeKeyword: "changeme",
      detail: "Mandatory security policy: Input 'changeme' as current password, then create a secure new password.",
    },
    {
      step: 5,
      tag: "COURSE ACCESS",
      icon: <GraduationCap size={22} color="#10B981" />,
      color: "#10B981",
      title: "Enrolled Course",
      description:
        "After completing the password change, you will be redirected to your dashboard, where you will find your enrolled course. Click on the course to access its contents.",
      detail: "Your landing dashboard displays all registered academic courses and learning materials.",
    },
  ];

  const handleCopyUrl = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText("http://lms.bracu.ac.bd");
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35 }}
      style={{
        maxWidth: 1100,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      {/* Slide Header */}
      <div style={{ textAlign: "center" }}>
        <Chip
          label="PART 02 • USER ONBOARDING & ACCESS"
          size="small"
          sx={{
            mb: 1,
            backgroundColor: "rgba(255, 81, 0, 0.15)",
            color: brandColors.pantoneOrange,
            fontWeight: 700,
          }}
        />
        <Typography variant="h3" sx={{ fontWeight: 800, color: "#FFFFFF" }}>
          BRACU LMS Login Process
        </Typography>
        <Typography variant="body1" sx={{ color: brandColors.pantoneCoolGray7, mt: 0.5, maxWidth: 680 }}>
          Please follow the steps below to log in to your enrolled courses on <strong>http://lms.bracu.ac.bd</strong>.
        </Typography>
      </div>

      {/* Main Interactive Branching Canvas */}
      <div
        style={{
          position: "relative",
          width: "100%",
          minHeight: 400,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          paddingTop: 6,
        }}
      >
        {/* Central Block: Login Process */}
        <motion.div
          onClick={() => setIsExpanded((prev) => !prev)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
          style={{
            padding: "16px 28px",
            minWidth: 200,
            borderRadius: 18,
            backgroundColor: isExpanded
              ? "rgba(255, 81, 0, 0.18)"
              : "rgba(255, 255, 255, 0.05)",
            border: `2px solid ${
              isExpanded ? brandColors.pantoneOrange : "rgba(255, 255, 255, 0.25)"
            }`,
            boxShadow: isExpanded
              ? `0 0 35px rgba(255, 81, 0, 0.45), 0 12px 28px rgba(0,0,0,0.5)`
              : "0 10px 25px rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 12,
            cursor: "pointer",
            zIndex: 10,
            position: "relative",
            transition: "border 0.25s, background-color 0.25s, box-shadow 0.25s",
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              backgroundColor: brandColors.pantoneOrange,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 0 15px rgba(255, 81, 0, 0.5)",
            }}
          >
            <LogIn size={20} color="#FFFFFF" />
          </div>

          <div>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "0.03em",
                lineHeight: 1.1,
              }}
            >
              Login Process
            </Typography>
            <Typography variant="caption" sx={{ color: brandColors.pantoneCoolGray7, fontSize: "0.72rem" }}>
              {isExpanded ? "5 Steps Branching Active" : "Click to expand branches"}
            </Typography>
          </div>
        </motion.div>

        {/* 5-Branch SVG Connector Lines & 5 Branch Cards */}
        <AnimatePresence>
          {isExpanded && (
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
              {/* SVG Connecting Branches for 5 Nodes */}
              <svg
                width="1040"
                height="55"
                viewBox="0 0 1040 55"
                style={{ overflow: "visible", display: "block" }}
              >
                {/* Vertical line from center of Login Process block */}
                <line
                  x1="520"
                  y1="0"
                  x2="520"
                  y2="25"
                  stroke={brandColors.pantoneOrange}
                  strokeWidth="2.5"
                />
                {/* Horizontal main crossbar */}
                <line
                  x1="100"
                  y1="25"
                  x2="940"
                  y2="25"
                  stroke={brandColors.pantoneOrange}
                  strokeWidth="2.5"
                />
                {/* 5 Downward drop lines to each branch */}
                <line x1="100" y1="25" x2="100" y2="55" stroke={brandColors.pantoneOrange} strokeWidth="2.5" />
                <line x1="310" y1="25" x2="310" y2="55" stroke={brandColors.pantoneOrange} strokeWidth="2.5" />
                <line x1="520" y1="25" x2="520" y2="55" stroke={brandColors.pantoneOrange} strokeWidth="2.5" />
                <line x1="730" y1="25" x2="730" y2="55" stroke={brandColors.pantoneOrange} strokeWidth="2.5" />
                <line x1="940" y1="25" x2="940" y2="55" stroke={brandColors.pantoneOrange} strokeWidth="2.5" />
              </svg>

              {/* The 5 Branch Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(5, 1fr)",
                  gap: 14,
                  width: "100%",
                  maxWidth: 1080,
                }}
              >
                {steps.map((item, idx) => {
                  const isSelected = activeStepIndex === idx;
                  return (
                    <motion.div
                      key={item.step}
                      onClick={() => setActiveStepIndex(isSelected ? null : idx)}
                      initial={{ opacity: 0, scale: 0.8, y: 15 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.08 * idx }}
                      whileHover={{ scale: 1.04, y: -4 }}
                      whileTap={{ scale: 0.97 }}
                      style={{
                        borderRadius: 16,
                        backgroundColor: isSelected
                          ? "rgba(255, 255, 255, 0.08)"
                          : "rgba(255, 255, 255, 0.03)",
                        border: isSelected
                          ? `2px solid ${item.color}`
                          : `1.5px solid rgba(255, 255, 255, 0.1)`,
                        boxShadow: isSelected
                          ? `0 12px 30px ${item.color}35`
                          : "0 8px 24px rgba(0,0,0,0.4)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        padding: 16,
                        minHeight: 220,
                        cursor: "pointer",
                        position: "relative",
                        transition: "all 0.25s ease",
                      }}
                    >
                      {/* Card Top: Step number badge and Icon */}
                      <div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                          <span
                            style={{
                              fontSize: "0.72rem",
                              fontWeight: 800,
                              color: item.color,
                              padding: "2px 8px",
                              borderRadius: 6,
                              backgroundColor: `${item.color}20`,
                              border: `1px solid ${item.color}40`,
                            }}
                          >
                            STEP 0{item.step}
                          </span>

                          <div
                            style={{
                              width: 34,
                              height: 34,
                              borderRadius: 10,
                              backgroundColor: `${item.color}18`,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {item.icon}
                          </div>
                        </div>

                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: 800,
                            color: "#FFFFFF",
                            fontSize: "0.95rem",
                            mb: 0.8,
                          }}
                        >
                          {item.title}
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            color: "#CBD5E1",
                            fontSize: "0.8rem",
                            lineHeight: 1.45,
                          }}
                        >
                          {item.description}
                        </Typography>
                      </div>

                      {/* Card Bottom Actions / Highlights */}
                      <div style={{ marginTop: 12 }}>
                        {item.url && (
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <Button
                              size="small"
                              variant="outlined"
                              onClick={handleCopyUrl}
                              startIcon={copiedUrl ? <Check size={12} color="#34D399" /> : <Copy size={12} />}
                              sx={{
                                fontSize: "0.68rem",
                                py: 0.4,
                                px: 1,
                                borderColor: "rgba(56, 189, 248, 0.4)",
                                color: "#38BDF8",
                                textTransform: "none",
                              }}
                            >
                              {copiedUrl ? "Copied" : "Copy URL"}
                            </Button>
                            <IconButton
                              size="small"
                              href="http://lms.bracu.ac.bd"
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e: React.MouseEvent) => e.stopPropagation()}
                              sx={{ color: "#38BDF8", padding: 0.5 }}
                              title="Open Portal"
                            >
                              <ExternalLink size={14} />
                            </IconButton>
                          </div>
                        )}

                        {item.codeKeyword && (
                          <Chip
                            label="Current Password: changeme"
                            size="small"
                            sx={{
                              height: 20,
                              fontSize: "0.65rem",
                              fontFamily: "monospace",
                              fontWeight: 800,
                              backgroundColor: "rgba(239, 68, 68, 0.18)",
                              color: "#FCA5A5",
                              border: "1px solid rgba(239, 68, 68, 0.4)",
                            }}
                          />
                        )}

                        {!item.url && !item.codeKeyword && (
                          <Typography variant="caption" sx={{ color: brandColors.pantoneCoolGray7, fontSize: "0.68rem" }}>
                            Click to highlight
                          </Typography>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Interactive Simulation Walkthrough Bar */}
      <Paper
        sx={{
          p: 2,
          borderRadius: 3,
          backgroundColor: "rgba(15, 23, 42, 0.8)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          width: "100%",
          maxWidth: 1040,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              backgroundColor: "rgba(255, 81, 0, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Sparkles size={18} color={brandColors.pantoneOrange} />
          </div>
          <div>
            <Typography variant="subtitle2" sx={{ color: "#FFFFFF", fontWeight: 700 }}>
              Need a live walkthrough?
            </Typography>
            <Typography variant="caption" sx={{ color: brandColors.pantoneCoolGray7 }}>
              Simulate the complete first-time BRACU login, password reset, and dashboard redirect.
            </Typography>
          </div>
        </div>

        <Button
          variant="contained"
          size="small"
          onClick={() => {
            setIsSimulating(true);
            setSimStep(1);
          }}
          startIcon={<LogIn size={15} />}
          sx={{
            backgroundColor: brandColors.pantoneOrange,
            color: "#FFFFFF",
            fontWeight: 700,
            fontSize: "0.78rem",
            textTransform: "none",
            borderRadius: 2,
            px: 2.5,
            py: 0.8,
            "&:hover": { backgroundColor: "#D84400" },
          }}
        >
          Simulate First-Time Login
        </Button>
      </Paper>

      {/* Interactive First-Time Login Simulator Modal */}
      <AnimatePresence>
        {isSimulating && (
          <div
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.75)",
              backdropFilter: "blur(10px)",
              zIndex: 100,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: 24,
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              style={{
                maxWidth: 620,
                width: "100%",
                backgroundColor: "#0F172A",
                borderRadius: 20,
                border: "1px solid rgba(255, 255, 255, 0.12)",
                boxShadow: "0 25px 60px rgba(0,0,0,0.8)",
                overflow: "hidden",
              }}
            >
              {/* Modal Bar */}
              <div
                style={{
                  padding: "14px 20px",
                  borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Globe size={18} color="#38BDF8" />
                  <Typography variant="subtitle2" sx={{ color: "#FFFFFF", fontWeight: 700 }}>
                    http://lms.bracu.ac.bd • First-Time Login Simulation
                  </Typography>
                </div>
                <Button
                  size="small"
                  onClick={() => setIsSimulating(false)}
                  sx={{ color: brandColors.pantoneCoolGray7, textTransform: "none" }}
                >
                  Close
                </Button>
              </div>

              {/* Simulation Steps Content */}
              <div style={{ padding: 24 }}>
                {simStep === 1 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ textAlign: "center", marginBottom: 8 }}>
                      <Typography variant="h6" sx={{ color: "#FFFFFF", fontWeight: 800 }}>
                        BRAC University LMS Login
                      </Typography>
                      <Typography variant="body2" sx={{ color: brandColors.pantoneCoolGray7 }}>
                        Enter your PIN address and initial PIN password.
                      </Typography>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <div>
                        <Typography variant="caption" sx={{ color: "#94A3B8" }}>Username (PIN Address)</Typography>
                        <div style={{ padding: "10px 14px", borderRadius: 8, backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#FFFFFF", fontFamily: "monospace" }}>
                          student.pin@bracu.ac.bd
                        </div>
                      </div>
                      <div>
                        <Typography variant="caption" sx={{ color: "#94A3B8" }}>Password (PIN)</Typography>
                        <div style={{ padding: "10px 14px", borderRadius: 8, backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#FFFFFF", fontFamily: "monospace" }}>
                          •••••••• (PIN)
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="contained"
                      onClick={() => setSimStep(2)}
                      sx={{
                        mt: 1,
                        backgroundColor: brandColors.pantoneOrange,
                        fontWeight: 700,
                        py: 1.2,
                        textTransform: "none",
                        "&:hover": { backgroundColor: "#D84400" },
                      }}
                    >
                      Log In ➔
                    </Button>
                  </div>
                )}

                {simStep === 2 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <div style={{ textAlign: "center", marginBottom: 8 }}>
                      <Chip
                        label="FIRST LOGIN DETECTED"
                        size="small"
                        sx={{ backgroundColor: "rgba(239, 68, 68, 0.2)", color: "#EF4444", fontWeight: 800, mb: 1 }}
                      />
                      <Typography variant="h6" sx={{ color: "#FFFFFF", fontWeight: 800 }}>
                        Password Change Required
                      </Typography>
                      <Typography variant="body2" sx={{ color: brandColors.pantoneCoolGray7 }}>
                        You must change your password to proceed.
                      </Typography>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                      <div>
                        <Typography variant="caption" sx={{ color: "#F87171", fontWeight: 700 }}>
                          Current Password (Enter "changeme")
                        </Typography>
                        <div style={{ padding: "10px 14px", borderRadius: 8, backgroundColor: "rgba(239, 68, 68, 0.1)", border: "1.5px solid #EF4444", color: "#FCA5A5", fontFamily: "monospace", fontWeight: 700 }}>
                          changeme
                        </div>
                      </div>
                      <div>
                        <Typography variant="caption" sx={{ color: "#94A3B8" }}>New Password</Typography>
                        <div style={{ padding: "10px 14px", borderRadius: 8, backgroundColor: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.15)", color: "#FFFFFF", fontFamily: "monospace" }}>
                          •••••••••••• (Set by user)
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="contained"
                      onClick={() => setSimStep(3)}
                      sx={{
                        mt: 1,
                        backgroundColor: "#34D399",
                        color: "#0B0F17",
                        fontWeight: 800,
                        py: 1.2,
                        textTransform: "none",
                        "&:hover": { backgroundColor: "#10B981", color: "#FFFFFF" },
                      }}
                    >
                      Save Password Changes ➔
                    </Button>
                  </div>
                )}

                {simStep === 3 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
                    <div style={{ width: 56, height: 56, borderRadius: "50%", backgroundColor: "rgba(52, 211, 153, 0.2)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto" }}>
                      <CheckCircle2 size={32} color="#34D399" />
                    </div>

                    <div>
                      <Typography variant="h6" sx={{ color: "#34D399", fontWeight: 800 }}>
                        Redirected to Dashboard!
                      </Typography>
                      <Typography variant="body2" sx={{ color: brandColors.pantoneCoolGray7, mt: 0.5 }}>
                        Password change completed. Your enrolled courses are now ready.
                      </Typography>
                    </div>

                    {/* Enrolled Course Card */}
                    <Paper
                      sx={{
                        p: 2.5,
                        backgroundColor: "rgba(255, 255, 255, 0.04)",
                        border: "1px solid rgba(52, 211, 153, 0.3)",
                        borderRadius: 3,
                        textAlign: "left",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                        <GraduationCap size={28} color="#34D399" />
                        <div>
                          <Typography variant="subtitle2" sx={{ color: "#FFFFFF", fontWeight: 700 }}>
                            EDU 501: Educational Technology & Pedagogy
                          </Typography>
                          <Typography variant="caption" sx={{ color: "#34D399" }}>
                            Enrolled • Ready to Access Contents
                          </Typography>
                        </div>
                      </div>

                      <Button
                        size="small"
                        variant="contained"
                        sx={{
                          backgroundColor: "#34D399",
                          color: "#0B0F17",
                          fontWeight: 700,
                          fontSize: "0.75rem",
                          textTransform: "none",
                        }}
                      >
                        Enter Course
                      </Button>
                    </Paper>

                    <Button
                      variant="outlined"
                      onClick={() => setIsSimulating(false)}
                      sx={{
                        borderColor: "rgba(255,255,255,0.2)",
                        color: "#FFFFFF",
                        textTransform: "none",
                        mt: 1,
                      }}
                    >
                      Finish Simulation
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
