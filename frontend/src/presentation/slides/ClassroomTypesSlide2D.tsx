import React, { useState } from "react";
import { Typography, Tooltip, IconButton, Button } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import {
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  UserCheck,
  Users,
  PenTool,
  BookOpen,
  Volume2,
  MessageSquare,
  Grid,
  Clock,
  FileText,
  Slash,
  Boxes,
  Layers,
  Shapes,
  Radio,
  Shuffle,
  CheckCircle2,
  ShieldCheck,
  Eye,
  Monitor,
  Laptop,
  Wifi,
  Database,
  PlayCircle,
  Cpu,
  BrainCircuit,
  CheckSquare,
  BarChart3,
  Globe,
  Cloud,
  HeartHandshake,
  LucideIcon,
  Check,
} from "lucide-react";
import { brandColors } from "../../theme/theme";

type ClassroomId = "traditional" | "lowtech" | "hightech";

interface FeatureItem {
  id: string;
  title: string;
  icon: LucideIcon;
  badge?: string;
}

interface ClassroomType {
  id: ClassroomId;
  title: string;
  label: string; // e.g. "Teacher-Centered Learning"
  stageNumber: number;
  color: string;
  secondaryColor: string;
  lightBg: string;
  borderActive: string;
  description: string;
  pedagogicalFocus: string;
  features: FeatureItem[];
}

const CLASSROOM_TYPES: ClassroomType[] = [
  {
    id: "traditional",
    title: "Traditional Classroom",
    label: "Teacher-Centered Learning",
    stageNumber: 1,
    color: "#4A5568", // Deep Slate
    secondaryColor: "#DD6B20", // Warm Chalk Amber
    lightBg: "#F7FAFC",
    borderActive: "#4A5568",
    description: "Centuries-tested instruction focused on direct verbal transmission, standard printed textbooks, and teacher-led pacing.",
    pedagogicalFocus: "Direct Instruction & Structured Delivery",
    features: [
      { id: "t1", title: "Teacher-centered instruction", icon: UserCheck, badge: "Structure" },
      { id: "t2", title: "Face-to-face teaching and learning", icon: Users, badge: "Delivery" },
      { id: "t3", title: "Chalkboard or whiteboard as the primary teaching aid", icon: PenTool, badge: "Aid" },
      { id: "t4", title: "Printed textbooks and physical learning materials", icon: BookOpen, badge: "Media" },
      { id: "t5", title: "Lecture, demonstration, and rote learning", icon: Volume2, badge: "Method" },
      { id: "t6", title: "Limited student interaction beyond verbal discussion", icon: MessageSquare, badge: "Interaction" },
      { id: "t7", title: "Fixed classroom seating arrangement", icon: Grid, badge: "Environment" },
      { id: "t8", title: "Teacher controls the pace of learning", icon: Clock, badge: "Pacing" },
      { id: "t9", title: "Assessment mainly through written exams and paper-based assignments", icon: FileText, badge: "Evaluation" },
      { id: "t10", title: "Limited use of digital technology", icon: Slash, badge: "Technology" },
    ],
  },
  {
    id: "lowtech",
    title: "Low-Tech Resource Classroom",
    label: "Resource-Supported Learning",
    stageNumber: 2,
    color: brandColors.teachingLearning, // #6D68AF
    secondaryColor: "#10B981", // Resource Emerald
    lightBg: "#F5F3FF",
    borderActive: brandColors.teachingLearning,
    description: "Enriched learning utilizing cost-effective physical manipulatives, charts, group tasks, and tangible classroom objects.",
    pedagogicalFocus: "Active Manipulation & Collaborative Inquiry",
    features: [
      { id: "lt1", title: "Uses simple, affordable teaching and learning resources", icon: Boxes, badge: "Materials" },
      { id: "lt2", title: "Chalkboards, posters, charts, flashcards, and physical models", icon: Layers, badge: "Visuals" },
      { id: "lt3", title: "Printed worksheets and supplementary reading materials", icon: FileText, badge: "Handouts" },
      { id: "lt4", title: "Hands-on activities and group work", icon: Users, badge: "Collaboration" },
      { id: "lt5", title: "Learning through manipulatives and classroom objects", icon: Shapes, badge: "Kinesthetic" },
      { id: "lt6", title: "Teacher-led instruction supported by visual aids", icon: Eye, badge: "Scaffolding" },
      { id: "lt7", title: "Limited or no internet dependency", icon: ShieldCheck, badge: "Resilience" },
      { id: "lt8", title: "Radio, basic audio players, or calculators may be used", icon: Radio, badge: "Audio/Tools" },
      { id: "lt9", title: "Flexible seating and collaborative learning", icon: Shuffle, badge: "Layout" },
      { id: "lt10", title: "Suitable for resource-constrained environments", icon: CheckCircle2, badge: "Accessibility" },
    ],
  },
  {
    id: "hightech",
    title: "High-Tech Resource Classroom",
    label: "Technology-Enhanced Learning",
    stageNumber: 3,
    color: brandColors.pantoneOrange, // #FF5100
    secondaryColor: brandColors.climateChange, // #44C8F5
    lightBg: "#FFF7ED",
    borderActive: brandColors.pantoneOrange,
    description: "Dynamic digital ecosystem harnessing interactive displays, connected student devices, cloud LMS, and AI learning tools.",
    pedagogicalFocus: "Personalized Paths & Ubiquitous Connectivity",
    features: [
      { id: "ht1", title: "Interactive whiteboards and digital displays", icon: Monitor, badge: "Display" },
      { id: "ht2", title: "Computers, tablets, and student devices", icon: Laptop, badge: "Devices" },
      { id: "ht3", title: "Internet-connected learning resources", icon: Wifi, badge: "Network" },
      { id: "ht4", title: "Learning Management Systems (LMS)", icon: Database, badge: "Platforms" },
      { id: "ht5", title: "Multimedia presentations, videos, and animations", icon: PlayCircle, badge: "Multimedia" },
      { id: "ht6", title: "Digital simulations and virtual laboratories", icon: Cpu, badge: "Simulations" },
      { id: "ht7", title: "AI-powered learning tools and personalized learning systems", icon: BrainCircuit, badge: "AI & Adaptivity" },
      { id: "ht8", title: "Online assessment and automated feedback", icon: CheckSquare, badge: "Formative" },
      { id: "ht9", title: "Real-time student progress tracking and learning analytics", icon: BarChart3, badge: "Analytics" },
      { id: "ht10", title: "Hybrid and blended learning opportunities", icon: Globe, badge: "Blended" },
      { id: "ht11", title: "Cloud-based collaboration and digital communication", icon: Cloud, badge: "Cloud" },
      { id: "ht12", title: "Assistive technologies for inclusive learning", icon: HeartHandshake, badge: "Inclusion" },
    ],
  },
];

interface ClassroomTypesSlide2DProps {
  onPrevSlide?: () => void;
  onNextSlide?: () => void;
}

export const ClassroomTypesSlide2D: React.FC<ClassroomTypesSlide2DProps> = () => {
  // Scaffolding stage:
  // 1: Stage 1 Traditional revealed
  // 2: Stage 2 Low-Tech revealed
  // 3: Stage 3 High-Tech revealed (All 3 available for interactive feature clicking)
  const [scaffoldingStage, setScaffoldingStage] = useState<number>(3); // Defaults to unlocked/ready or 1 on start
  const [selectedClassroom, setSelectedClassroom] = useState<ClassroomId | null>("traditional");

  const handleNextStage = () => {
    setScaffoldingStage((prev) => Math.min(prev + 1, 3));
  };

  const handlePrevStage = () => {
    setScaffoldingStage((prev) => Math.max(prev - 1, 1));
  };

  const handleReset = () => {
    setScaffoldingStage(1);
    setSelectedClassroom(null);
  };

  const handleSelectClassroom = (id: ClassroomId) => {
    if (selectedClassroom === id) {
      // Toggle collapse if already selected
      setSelectedClassroom(null);
    } else {
      setSelectedClassroom(id);
    }
  };

  const activeClassroom = CLASSROOM_TYPES.find((c) => c.id === selectedClassroom);

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
      {/* 1. SLIDE HEADER & SCAFFOLDING CONTROLS */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 12,
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
              Slide 04 • Learning Environments & Pedagogical Evolution
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
            Classroom Resources: From Traditional to High-Tech
          </Typography>
        </div>

        {/* Minimal Presentation Scaffolding Controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Stage Sequence Pills */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 4,
              padding: "4px 8px",
              backgroundColor: "#F8F8F8",
              borderRadius: "20px",
              border: "1px solid #EAEAEA",
            }}
          >
            {[
              { stage: 1, label: "1. Traditional" },
              { stage: 2, label: "2. Low-Tech" },
              { stage: 3, label: "3. High-Tech" },
            ].map((s) => {
              const isPassed = scaffoldingStage >= s.stage;
              const isCurrent = scaffoldingStage === s.stage;
              return (
                <button
                  key={s.stage}
                  onClick={() => setScaffoldingStage(s.stage)}
                  style={{
                    border: "none",
                    backgroundColor: isCurrent ? "#FFFFFF" : "transparent",
                    color: isPassed ? brandColors.pantone432 : brandColors.pantoneCoolGray7,
                    fontWeight: isCurrent ? 800 : isPassed ? 600 : 500,
                    fontFamily: "'Quicksand', sans-serif",
                    fontSize: "11px",
                    padding: "4px 10px",
                    borderRadius: "14px",
                    cursor: "pointer",
                    boxShadow: isCurrent ? "0 2px 6px rgba(0,0,0,0.06)" : "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    transition: "all 0.2s ease",
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      backgroundColor:
                        s.stage === 1
                          ? "#4A5568"
                          : s.stage === 2
                          ? brandColors.teachingLearning
                          : brandColors.pantoneOrange,
                      opacity: isPassed ? 1 : 0.35,
                    }}
                  />
                  {s.label}
                </button>
              );
            })}
          </div>

          {/* Scaffolding Navigation Buttons */}
          <Tooltip title="Previous Scaffolding Stage">
            <span>
              <IconButton
                size="small"
                disabled={scaffoldingStage === 1}
                onClick={handlePrevStage}
                sx={{
                  border: "1px solid #E2E8F0",
                  color: brandColors.pantone432,
                  "&:hover": { borderColor: brandColors.pantoneOrange },
                }}
              >
                <ChevronLeft size={16} />
              </IconButton>
            </span>
          </Tooltip>

          <Button
            size="small"
            variant="outlined"
            onClick={handleNextStage}
            disabled={scaffoldingStage === 3}
            endIcon={<ChevronRight size={15} />}
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
              fontSize: "11.5px",
              textTransform: "none",
              borderRadius: "8px",
              borderColor: "#E2E8F0",
              color: brandColors.pantone432,
              padding: "4px 12px",
              "&:hover": {
                borderColor: brandColors.pantoneOrange,
                color: brandColors.pantoneOrange,
              },
            }}
          >
            Continue
          </Button>

          <Tooltip title="Reset Scaffolding & Initial State">
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

      {/* 2. MAIN HORIZONTAL CLASSROOM SHOWCASE & INTERACTIVE FEATURE SCAFFOLD */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          gap: 14,
          minHeight: 0,
          overflowY: "auto",
        }}
      >
        {/* ROW OF THREE CLASSROOM CARDS */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            flexShrink: 0,
          }}
        >
          {CLASSROOM_TYPES.map((classroom) => {
            const isRevealed = scaffoldingStage >= classroom.stageNumber;
            const isSelected = selectedClassroom === classroom.id;
            const isSubdued = selectedClassroom !== null && !isSelected;

            return (
              <motion.div
                key={classroom.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{
                  opacity: !isRevealed ? 0.35 : isSubdued ? 0.5 : 1,
                  y: 0,
                  scale: isSelected ? 1.015 : 1,
                }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                onClick={() => {
                  if (isRevealed) {
                    handleSelectClassroom(classroom.id);
                  }
                }}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderRadius: "16px",
                  border: isSelected
                    ? `2.5px solid ${classroom.color}`
                    : `1.5px solid ${isRevealed ? "#E2E8F0" : "#EDF2F7"}`,
                  boxShadow: isSelected
                    ? `0 10px 25px ${classroom.color}22`
                    : "0 2px 10px rgba(0,0,0,0.04)",
                  padding: "16px 18px",
                  cursor: isRevealed ? "pointer" : "not-allowed",
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  position: "relative",
                  transition: "border 0.2s ease, box-shadow 0.2s ease",
                }}
              >
                {/* Top Badge: Pedagogical Paradigm */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      padding: "4px 10px",
                      borderRadius: "12px",
                      backgroundColor: `${classroom.color}15`,
                      color: classroom.color,
                      fontSize: "11px",
                      fontWeight: 700,
                      fontFamily: "'Quicksand', sans-serif",
                    }}
                  >
                    <span
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: "50%",
                        backgroundColor: classroom.color,
                      }}
                    />
                    {classroom.label}
                  </span>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      color: brandColors.pantoneCoolGray7,
                      fontFamily: "'Quicksand', sans-serif",
                    }}
                  >
                    Stage 0{classroom.stageNumber}
                  </span>
                </div>

                {/* Classroom Title */}
                <div>
                  <Typography
                    sx={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontWeight: 800,
                      fontSize: "19px",
                      color: brandColors.pantone432,
                      letterSpacing: "-0.3px",
                      lineHeight: 1.25,
                    }}
                  >
                    {classroom.title}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: "'Quicksand', sans-serif",
                      fontSize: "12px",
                      fontWeight: 600,
                      color: brandColors.pantoneCoolGray7,
                      marginTop: "2px",
                    }}
                  >
                    {classroom.pedagogicalFocus}
                  </Typography>
                </div>

                {/* 2D SVG Classroom Illustration */}
                <div
                  style={{
                    width: "100%",
                    height: 120,
                    borderRadius: "10px",
                    backgroundColor: classroom.lightBg,
                    border: `1px solid ${classroom.color}25`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    position: "relative",
                  }}
                >
                  {classroom.id === "traditional" && (
                    <svg viewBox="0 0 320 120" style={{ width: "100%", height: "100%" }}>
                      {/* Chalkboard on wall */}
                      <rect x="75" y="12" width="170" height="52" rx="4" fill="#2D3748" stroke="#718096" strokeWidth="2.5" />
                      <line x1="88" y1="28" x2="160" y2="28" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="5 3" opacity="0.8" />
                      <line x1="88" y1="40" x2="200" y2="40" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="8 4" opacity="0.6" />
                      <line x1="88" y1="52" x2="140" y2="52" stroke="#ECC94B" strokeWidth="1.5" opacity="0.9" />
                      <rect x="215" y="48" width="18" height="6" rx="2" fill="#E2E8F0" />

                      {/* Wall Clock */}
                      <circle cx="280" cy="28" r="12" fill="#FFFFFF" stroke="#4A5568" strokeWidth="1.5" />
                      <line x1="280" y1="28" x2="280" y2="20" stroke="#4A5568" strokeWidth="1.5" />
                      <line x1="280" y1="28" x2="286" y2="28" stroke="#4A5568" strokeWidth="1.5" />

                      {/* Teacher Podium & Book */}
                      <rect x="140" y="66" width="40" height="32" rx="2" fill="#718096" />
                      <path d="M 148 66 L 160 60 L 172 66 Z" fill="#E2E8F0" />
                      <circle cx="160" cy="48" r="8" fill="#4A5568" />

                      {/* Traditional Neat Rows of Desks */}
                      <rect x="35" y="82" width="60" height="24" rx="3" fill="#A0AEC0" stroke="#4A5568" strokeWidth="1" />
                      <rect x="42" y="86" width="16" height="12" rx="1" fill="#FFFFFF" />
                      <rect x="225" y="82" width="60" height="24" rx="3" fill="#A0AEC0" stroke="#4A5568" strokeWidth="1" />
                      <rect x="255" y="86" width="16" height="12" rx="1" fill="#FFFFFF" />
                    </svg>
                  )}

                  {classroom.id === "lowtech" && (
                    <svg viewBox="0 0 320 120" style={{ width: "100%", height: "100%" }}>
                      {/* Chalkboard + Resource Posters on Wall */}
                      <rect x="40" y="12" width="100" height="50" rx="3" fill="#4C51BF" stroke="#6D68AF" strokeWidth="2" />
                      <line x1="50" y1="26" x2="110" y2="26" stroke="#E9D8FD" strokeWidth="2" strokeDasharray="6 3" />
                      <line x1="50" y1="38" x2="95" y2="38" stroke="#E9D8FD" strokeWidth="1.5" />

                      {/* Visual Wall Chart (Solar / Science Model) */}
                      <rect x="155" y="12" width="65" height="50" rx="3" fill="#FFFFFF" stroke="#6D68AF" strokeWidth="1.5" />
                      <circle cx="187" cy="30" r="12" fill="#FEFCBF" stroke="#D69E2E" strokeWidth="1" />
                      <circle cx="170" cy="44" r="5" fill="#44C8F5" />
                      <circle cx="204" cy="44" r="6" fill="#48BB78" />

                      {/* Hanging Flashcards Line */}
                      <line x1="230" y1="16" x2="295" y2="16" stroke="#ADAFB2" strokeWidth="1.5" strokeDasharray="3 3" />
                      <rect x="240" y="18" width="14" height="20" rx="2" fill="#FEEBC8" stroke="#DD6B20" strokeWidth="1" />
                      <rect x="262" y="18" width="14" height="20" rx="2" fill="#EBF8FF" stroke="#3182CE" strokeWidth="1" />

                      {/* Collaborative Hexagonal Work Desks with Manipulatives */}
                      <ellipse cx="90" cy="94" rx="42" ry="18" fill="#E9D8FD" stroke="#6D68AF" strokeWidth="1.5" />
                      <circle cx="75" cy="94" r="6" fill="#ED8936" />
                      <polygon points="95,88 102,98 88,98" fill="#38A169" />

                      <ellipse cx="230" cy="94" rx="42" ry="18" fill="#E9D8FD" stroke="#6D68AF" strokeWidth="1.5" />
                      <rect x="220" y="88" width="18" height="12" rx="2" fill="#FFFFFF" stroke="#6D68AF" strokeWidth="1" />
                      <circle cx="246" cy="94" r="5" fill="#E53E3E" />
                    </svg>
                  )}

                  {classroom.id === "hightech" && (
                    <svg viewBox="0 0 320 120" style={{ width: "100%", height: "100%" }}>
                      {/* Big Interactive Smartboard Screen with Glow */}
                      <rect x="70" y="8" width="180" height="58" rx="6" fill="#1A202C" stroke={brandColors.pantoneOrange} strokeWidth="2.5" />
                      <rect x="78" y="14" width="164" height="46" rx="3" fill="#2D3748" />

                      {/* Smartboard Display Content: Graphs & Cloud Wave */}
                      <path d="M 88 44 Q 115 20, 140 36 T 195 24 T 230 40" fill="none" stroke="#44C8F5" strokeWidth="2" />
                      <rect x="90" y="20" width="22" height="14" rx="2" fill="#FF5100" opacity="0.8" />
                      <circle cx="218" cy="24" r="6" fill="#48BB78" />

                      {/* Floating Wi-Fi & Cloud Network Pulses */}
                      <path d="M 152 14 A 8 8 0 0 1 168 14" fill="none" stroke="#44C8F5" strokeWidth="1.5" strokeDasharray="2 2" />
                      <path d="M 148 10 A 13 13 0 0 1 172 10" fill="none" stroke="#44C8F5" strokeWidth="1.5" strokeDasharray="2 2" />

                      {/* Connected Smart Pods & Tablets */}
                      <rect x="35" y="84" width="60" height="26" rx="5" fill="#EDF2F7" stroke="#CBD5E0" strokeWidth="1" />
                      <rect x="52" y="87" width="26" height="18" rx="2" fill="#1A202C" stroke="#44C8F5" strokeWidth="1" />
                      <line x1="65" y1="84" x2="105" y2="60" stroke="#44C8F5" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />

                      <rect x="225" y="84" width="60" height="26" rx="5" fill="#EDF2F7" stroke="#CBD5E0" strokeWidth="1" />
                      <rect x="242" y="87" width="26" height="18" rx="2" fill="#1A202C" stroke="#FF5100" strokeWidth="1" />
                      <line x1="255" y1="84" x2="215" y2="60" stroke="#FF5100" strokeWidth="1" strokeDasharray="3 3" opacity="0.7" />
                    </svg>
                  )}
                </div>

                {/* Bottom Action Prompt / Toggle Pill */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingTop: 4,
                  }}
                >
                  <span
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 700,
                      color: isSelected ? classroom.color : brandColors.pantone432,
                      fontFamily: "'Quicksand', sans-serif",
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    {isSelected ? (
                      <>
                        <Check size={14} color={classroom.color} />
                        Active Feature View
                      </>
                    ) : (
                      <>
                        <span>{classroom.features.length} Features</span>
                        <ArrowRight size={13} />
                      </>
                    )}
                  </span>

                  <span
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: isSelected ? classroom.color : brandColors.pantoneCoolGray7,
                      fontFamily: "'Quicksand', sans-serif",
                    }}
                  >
                    {isSelected ? "Click to Collapse" : "Click to Explore"}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* EXPANDED INTERACTIVE FEATURE SCAFFOLD AREA */}
        <AnimatePresence mode="wait">
          {activeClassroom && (
            <motion.div
              key={`features-${activeClassroom.id}`}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "16px",
                border: `2px solid ${activeClassroom.color}`,
                boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
                padding: "16px 20px",
                display: "flex",
                flexDirection: "column",
                gap: 12,
              }}
            >
              {/* Feature Header with Quick Category Switchers */}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  borderBottom: "1px solid #EDF2F7",
                  paddingBottom: 10,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "8px",
                      backgroundColor: `${activeClassroom.color}15`,
                      color: activeClassroom.color,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <Typography
                      sx={{
                        fontFamily: "'Quicksand', sans-serif",
                        fontWeight: 800,
                        fontSize: "16px",
                        color: brandColors.pantone432,
                      }}
                    >
                      {activeClassroom.title} • Key Characteristics & Resource Mechanics
                    </Typography>
                    <Typography
                      sx={{
                        fontFamily: "'Quicksand', sans-serif",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: brandColors.pantoneCoolGray7,
                      }}
                    >
                      {activeClassroom.description}
                    </Typography>
                  </div>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span
                    style={{
                      fontSize: "11.5px",
                      fontWeight: 700,
                      color: brandColors.pantoneCoolGray7,
                      fontFamily: "'Quicksand', sans-serif",
                    }}
                  >
                    Switch Type:
                  </span>
                  {CLASSROOM_TYPES.map((ct) => (
                    <button
                      key={ct.id}
                      onClick={() => setSelectedClassroom(ct.id)}
                      style={{
                        border: selectedClassroom === ct.id ? `1.5px solid ${ct.color}` : "1px solid #E2E8F0",
                        backgroundColor: selectedClassroom === ct.id ? `${ct.color}15` : "#FFFFFF",
                        color: selectedClassroom === ct.id ? ct.color : brandColors.pantone432,
                        fontFamily: "'Quicksand', sans-serif",
                        fontWeight: selectedClassroom === ct.id ? 800 : 600,
                        fontSize: "11px",
                        padding: "3px 10px",
                        borderRadius: "12px",
                        cursor: "pointer",
                        transition: "all 0.15s ease",
                      }}
                    >
                      {ct.title.replace(" Classroom", "")}
                    </button>
                  ))}
                </div>
              </div>

              {/* Scaffolding Feature Grid with Animated Sequential Cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: activeClassroom.features.length > 10 ? "repeat(4, 1fr)" : "repeat(3, 1fr)",
                  gap: 10,
                }}
              >
                {activeClassroom.features.map((feature, idx) => {
                  const IconComponent = feature.icon;
                  return (
                    <motion.div
                      key={feature.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.28, ease: "easeOut" }}
                      whileHover={{ scale: 1.02 }}
                      style={{
                        backgroundColor: activeClassroom.lightBg,
                        borderRadius: "10px",
                        border: "1px solid #E2E8F0",
                        padding: "10px 12px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 10,
                        cursor: "default",
                      }}
                    >
                      <div
                        style={{
                          width: 26,
                          height: 26,
                          borderRadius: "6px",
                          backgroundColor: "#FFFFFF",
                          color: activeClassroom.color,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 1,
                          boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
                        }}
                      >
                        <IconComponent size={15} />
                      </div>

                      <div style={{ flex: 1, minWidth: 0 }}>
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
                              color: activeClassroom.color,
                              fontFamily: "'Quicksand', sans-serif",
                              letterSpacing: "0.4px",
                            }}
                          >
                            {feature.badge || `Item 0${idx + 1}`}
                          </span>
                        </div>
                        <Typography
                          sx={{
                            fontFamily: "'Quicksand', sans-serif",
                            fontSize: "12.5px",
                            fontWeight: 700,
                            color: brandColors.pantone432,
                            lineHeight: 1.35,
                          }}
                        >
                          {feature.title}
                        </Typography>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 3. CORE PEDAGOGICAL TAKEAWAY BANNER & FOOTER */}
      <div
        style={{
          marginTop: 10,
          padding: "10px 18px",
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
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: "50%",
              backgroundColor: brandColors.pantoneOrange,
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <Sparkles size={16} />
          </div>
          <Typography
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "13.5px",
              fontWeight: 700,
              color: brandColors.pantone432,
              lineHeight: 1.35,
            }}
          >
            <strong>Central Principle:</strong> &ldquo;Effective teaching depends on how resources are used to support learning, not simply on how much technology a classroom contains.&rdquo;
          </Typography>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              padding: "4px 12px",
              backgroundColor: "#FFFFFF",
              borderRadius: "14px",
              fontSize: "11px",
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
    </div>
  );
};
