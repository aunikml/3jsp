import React from "react";
import { Typography, Button } from "@mui/material";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { brandColors } from "../../theme/theme";

interface TitleSlide2DProps {
  onNextSlide: () => void;
}

export const TitleSlide2D: React.FC<TitleSlide2DProps> = ({ onNextSlide }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFFFFF",
        overflow: "hidden",
        padding: "40px",
      }}
    >
      {/* Main Foreground Title Card & Content */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          zIndex: 10,
          maxWidth: 900,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Pillar Category Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "6px 16px",
            backgroundColor: "rgba(109, 104, 175, 0.08)",
            borderRadius: "24px",
            border: "1px solid rgba(109, 104, 175, 0.2)",
            marginBottom: 32,
          }}
        >
          <Sparkles size={14} color={brandColors.teachingLearning} />
          <Typography
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontSize: "12px",
              fontWeight: 700,
              color: brandColors.teachingLearning,
              letterSpacing: "0.8px",
              textTransform: "uppercase",
            }}
          >
            BRAC IED • Teaching & Learning
          </Typography>
        </motion.div>

        {/* Presentation Title */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
              fontSize: { xs: "38px", sm: "52px", md: "62px" },
              color: brandColors.pantone432,
              lineHeight: 1.18,
              letterSpacing: "-0.8px",
              marginBottom: 5,
            }}
          >
            Instruction technology for enhanced Learnng
          </Typography>
        </motion.div>

        {/* Action Button: Proceed to Slide 2 */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <Button
            variant="contained"
            size="large"
            onClick={onNextSlide}
            endIcon={<ArrowRight size={18} />}
            sx={{
              backgroundColor: brandColors.pantoneOrange,
              color: "#FFFFFF",
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
              fontSize: "15px",
              textTransform: "none",
              padding: "12px 34px",
              borderRadius: "12px",
              boxShadow: "0 6px 20px rgba(255, 81, 0, 0.28)",
              transition: "all 0.25s ease",
              "&:hover": {
                backgroundColor: "#E04800",
                transform: "translateY(-2px)",
                boxShadow: "0 10px 24px rgba(255, 81, 0, 0.35)",
              },
            }}
          >
            Start Presentation
          </Button>
        </motion.div>

        {/* Subtle Presentation Metadata Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          style={{
            marginTop: 48,
            display: "flex",
            alignItems: "center",
            gap: 16,
            color: brandColors.pantoneCoolGray7,
            fontSize: "12px",
            fontFamily: "'Quicksand', sans-serif",
            fontWeight: 600,
          }}
        >
          <span>Slide 1 of 2</span>
          <span>•</span>
          <span>Press Next or Click Button to Advance</span>
        </motion.div>
      </motion.div>
    </div>
  );
};
