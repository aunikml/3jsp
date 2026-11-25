import React from "react";
import { motion } from "framer-motion";
import { brandColors } from "../../theme/theme";

interface EdTechVisualAnimationProps {
  size?: number;
  interactive?: boolean;
}

export const EdTechVisualAnimation: React.FC<EdTechVisualAnimationProps> = ({
  size = 460,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <defs>
          <radialGradient
            id="edtech-glow"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor={brandColors.pantoneOrange} stopOpacity="0.12" />
            <stop offset="40%" stopColor={brandColors.teachingLearning} stopOpacity="0.06" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          <linearGradient id="orbit-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={brandColors.pantoneOrange} stopOpacity="0.4" />
            <stop offset="100%" stopColor={brandColors.teachingLearning} stopOpacity="0.1" />
          </linearGradient>

          <linearGradient id="orbit-grad-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={brandColors.teachingLearning} stopOpacity="0.35" />
            <stop offset="100%" stopColor={brandColors.pantoneCoolGray7} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Ambient Soft Glow Behind Orbit */}
        <circle cx="200" cy="200" r="170" fill="url(#edtech-glow)" />

        {/* Outer Orbit Track */}
        <motion.circle
          cx="200"
          cy="200"
          r="140"
          stroke="url(#orbit-grad-1)"
          strokeWidth="1.2"
          strokeDasharray="4 6"
          fill="none"
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "200px" }}
        />

        {/* Middle Orbit Track */}
        <motion.circle
          cx="200"
          cy="200"
          r="105"
          stroke="url(#orbit-grad-2)"
          strokeWidth="1.2"
          strokeDasharray="8 8"
          fill="none"
          animate={{ rotate: -360 }}
          transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "200px" }}
        />

        {/* Inner Elliptical Path */}
        <motion.ellipse
          cx="200"
          cy="200"
          rx="75"
          ry="55"
          stroke={brandColors.teachingLearning}
          strokeWidth="1"
          strokeOpacity="0.25"
          fill="none"
          animate={{ rotate: [0, 180, 360] }}
          transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "200px" }}
        />

        {/* Subtle Geometric Constellation Lines */}
        <path
          d="M 120 140 Q 200 90, 280 140 T 200 290 Z"
          stroke={brandColors.pantoneCoolGray7}
          strokeWidth="0.8"
          strokeOpacity="0.3"
          strokeDasharray="3 3"
          fill="none"
        />

        {/* Orbiting Satellite Node 1: Adaptive Learning (Orange) */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "200px" }}
        >
          <g transform="translate(200, 60)">
            <circle cx="0" cy="0" r="10" fill="rgba(255, 81, 0, 0.12)" />
            <circle cx="0" cy="0" r="4.5" fill={brandColors.pantoneOrange} />
            <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
          </g>
        </motion.g>

        {/* Orbiting Satellite Node 2: Learning Management (Purple) */}
        <motion.g
          animate={{ rotate: -360 }}
          transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "200px" }}
        >
          <g transform="translate(95, 200)">
            <circle cx="0" cy="0" r="8" fill="rgba(109, 104, 175, 0.15)" />
            <circle cx="0" cy="0" r="4" fill={brandColors.teachingLearning} />
          </g>
        </motion.g>

        {/* Orbiting Satellite Node 3: Digital Assessment (Cool Gray / Dark) */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 34, repeat: Infinity, ease: "linear" }}
          style={{ originX: "200px", originY: "200px" }}
        >
          <g transform="translate(305, 200)">
            <circle cx="0" cy="0" r="7" fill="rgba(69, 85, 96, 0.12)" />
            <circle cx="0" cy="0" r="3.5" fill={brandColors.pantone432} />
          </g>
        </motion.g>

        {/* Central Core: Digital Scaffolding Node */}
        <g transform="translate(200, 200)">
          {/* Gentle breath pulse */}
          <motion.circle
            cx="0"
            cy="0"
            r="38"
            fill="none"
            stroke={brandColors.pantoneOrange}
            strokeWidth="1.2"
            animate={{
              r: [36, 44, 36],
              opacity: [0.35, 0.1, 0.35],
            }}
            transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
          />

          <circle
            cx="0"
            cy="0"
            r="28"
            fill="#FFFFFF"
            stroke={brandColors.teachingLearning}
            strokeWidth="1.8"
            strokeOpacity="0.4"
          />

          {/* Minimalist Tech Icon: Stylized Graduation Cap + Circuit Nodes */}
          {/* Cap diamond */}
          <path
            d="M 0 -10 L 14 -3 L 0 4 L -14 -3 Z"
            fill={brandColors.pantone432}
          />
          {/* Cap skullcap */}
          <path
            d="M -9 1 C -9 8, 9 8, 9 1"
            stroke={brandColors.pantone432}
            strokeWidth="1.6"
            fill="none"
          />
          {/* Tassel */}
          <path
            d="M 10 -2 L 14 6"
            stroke={brandColors.pantoneOrange}
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="14" cy="7" r="1.5" fill={brandColors.pantoneOrange} />
        </g>
      </svg>
    </div>
  );
};
