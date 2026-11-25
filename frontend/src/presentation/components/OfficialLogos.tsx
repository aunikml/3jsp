import React from "react";

interface LogoProps {
  size?: number;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Official BRAC University Vector Brandmark
 */
export const BracUniversityLogo: React.FC<LogoProps> = ({ size = 120, style }) => {
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 240 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", ...style }}
    >
      {/* BRAC stylized arches symbol */}
      <g id="brac-symbol">
        {/* Red arch/burst */}
        <path
          d="M60 48 C 60 28, 92 12, 120 12 C 148 12, 180 28, 180 48 C 172 48, 150 26, 120 26 C 90 26, 68 48, 60 48 Z"
          fill="#ED1C24"
        />
        {/* Yellow-Orange arch */}
        <path
          d="M72 60 C 72 44, 96 32, 120 32 C 144 32, 168 44, 168 60 C 160 60, 142 42, 120 42 C 98 42, 80 60, 72 60 Z"
          fill="#F58220"
        />
        {/* Blue arch */}
        <path
          d="M84 72 C 84 60, 102 50, 120 50 C 138 50, 156 60, 156 72 C 150 72, 136 58, 120 58 C 104 58, 90 72, 84 72 Z"
          fill="#0054A6"
        />
        {/* Center core dot */}
        <circle cx="120" cy="74" r="6" fill="#0054A6" />
      </g>

      {/* brac text */}
      <text
        x="120"
        y="118"
        textAnchor="middle"
        fontFamily="'Quicksand', 'Arial', sans-serif"
        fontWeight="800"
        fontSize="36"
        fill="#ED1C24"
        letterSpacing="-1px"
      >
        brac
      </text>

      {/* UNIVERSITY text */}
      <text
        x="120"
        y="142"
        textAnchor="middle"
        fontFamily="'Quicksand', 'Arial', sans-serif"
        fontWeight="700"
        fontSize="16"
        fill="#0054A6"
        letterSpacing="6px"
      >
        UNIVERSITY
      </text>

      {/* Inspiring Excellence subline */}
      <text
        x="120"
        y="158"
        textAnchor="middle"
        fontFamily="'Quicksand', 'Arial', sans-serif"
        fontWeight="500"
        fontSize="9"
        fill="#455560"
        letterSpacing="1px"
      >
        Inspiring Excellence
      </text>
    </svg>
  );
};

/**
 * Official United Nations (UN) Emblem & Wordmark
 */
export const UnitedNationsLogo: React.FC<LogoProps> = ({ size = 120, style }) => {
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 240 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", ...style }}
    >
      {/* UN Blue Emblem Base */}
      <g transform="translate(120, 58)">
        {/* Outer concentric latitude circles */}
        <circle cx="0" cy="0" r="42" stroke="#009EDB" strokeWidth="1.5" fill="none" opacity="0.6" />
        <circle cx="0" cy="0" r="32" stroke="#009EDB" strokeWidth="1.2" fill="none" opacity="0.7" />
        <circle cx="0" cy="0" r="22" stroke="#009EDB" strokeWidth="1" fill="none" opacity="0.8" />
        <circle cx="0" cy="0" r="11" stroke="#009EDB" strokeWidth="1" fill="none" opacity="0.9" />

        {/* Polar grid lines */}
        <line x1="0" y1="-44" x2="0" y2="44" stroke="#009EDB" strokeWidth="1" opacity="0.6" />
        <line x1="-44" y1="0" x2="44" y2="0" stroke="#009EDB" strokeWidth="1" opacity="0.6" />
        <line x1="-31" y1="-31" x2="31" y2="31" stroke="#009EDB" strokeWidth="0.8" opacity="0.4" />
        <line x1="-31" y1="31" x2="31" y2="-31" stroke="#009EDB" strokeWidth="0.8" opacity="0.4" />

        {/* Continents silhouette stylized */}
        <path
          d="M-10 -22 C-4 -28, 8 -24, 14 -16 C18 -8, 22 2, 16 12 C10 18, -4 20, -12 14 C-20 8, -24 -2, -18 -12 Z"
          fill="#009EDB"
          opacity="0.35"
        />
        <circle cx="0" cy="0" r="4" fill="#009EDB" />

        {/* Olive branch left */}
        <path
          d="M -30 20 C -48 10, -52 -16, -34 -38 C -36 -28, -36 -12, -26 0 C -22 6, -18 12, -10 18"
          stroke="#009EDB"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Left leaves */}
        <ellipse cx="-44" cy="-26" rx="5" ry="2.5" transform="rotate(-30 -44 -26)" fill="#009EDB" />
        <ellipse cx="-48" cy="-12" rx="5" ry="2.5" transform="rotate(-10 -48 -12)" fill="#009EDB" />
        <ellipse cx="-46" cy="4" rx="5" ry="2.5" transform="rotate(15 -46 4)" fill="#009EDB" />
        <ellipse cx="-38" cy="18" rx="5" ry="2.5" transform="rotate(35 -38 18)" fill="#009EDB" />

        {/* Olive branch right */}
        <path
          d="M 30 20 C 48 10, 52 -16, 34 -38 C 36 -28, 36 -12, 26 0 C 22 6, 18 12, 10 18"
          stroke="#009EDB"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Right leaves */}
        <ellipse cx="44" cy="-26" rx="5" ry="2.5" transform="rotate(30 44 -26)" fill="#009EDB" />
        <ellipse cx="48" cy="-12" rx="5" ry="2.5" transform="rotate(10 48 -12)" fill="#009EDB" />
        <ellipse cx="46" cy="4" rx="5" ry="2.5" transform="rotate(-15 46 4)" fill="#009EDB" />
        <ellipse cx="38" cy="18" rx="5" ry="2.5" transform="rotate(-35 38 18)" fill="#009EDB" />
      </g>

      {/* Typography */}
      <text
        x="120"
        y="130"
        textAnchor="middle"
        fontFamily="'Quicksand', 'Arial', sans-serif"
        fontWeight="800"
        fontSize="20"
        fill="#009EDB"
        letterSpacing="3px"
      >
        UNITED NATIONS
      </text>
      <text
        x="120"
        y="148"
        textAnchor="middle"
        fontFamily="'Quicksand', 'Arial', sans-serif"
        fontWeight="600"
        fontSize="11"
        fill="#455560"
        letterSpacing="1.5px"
      >
        NATIONS UNIES
      </text>
    </svg>
  );
};

/**
 * Official Save the Children Vector Logo
 */
export const SaveTheChildrenLogo: React.FC<LogoProps> = ({ size = 120, style }) => {
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 240 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", ...style }}
    >
      {/* Red circle container with child silhouette */}
      <g transform="translate(120, 54)">
        {/* Red circle */}
        <circle cx="0" cy="0" r="34" fill="#DA291C" />

        {/* Child silhouette with outstretched arms */}
        {/* Head */}
        <circle cx="0" cy="-12" r="7" fill="#FFFFFF" />
        {/* Body and joyful curved arms */}
        <path
          d="M 0 -2 
             C -14 -16, -24 -6, -26 2
             C -23 4, -14 -4, -4 4
             L -8 24 L -1 24 L -2 14 L 2 14 L 1 24 L 8 24 L 4 4
             C 14 -4, 23 4, 26 2
             C 24 -6, 14 -16, 0 -2 Z"
          fill="#FFFFFF"
        />
      </g>

      {/* Save the Children Typography */}
      <text
        x="120"
        y="126"
        textAnchor="middle"
        fontFamily="'Quicksand', 'Arial', sans-serif"
        fontWeight="800"
        fontSize="17"
        fill="#DA291C"
        letterSpacing="-0.2px"
      >
        Save the Children
      </text>
      <text
        x="120"
        y="144"
        textAnchor="middle"
        fontFamily="'Quicksand', 'Arial', sans-serif"
        fontWeight="600"
        fontSize="10"
        fill="#455560"
        letterSpacing="0.5px"
      >
        International NGO
      </text>
    </svg>
  );
};

/**
 * Official USAID Vector Brandmark
 */
export const UsaidLogo: React.FC<LogoProps> = ({ size = 120, style }) => {
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 240 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", ...style }}
    >
      {/* USAID Seal on left of grouped layout or centered */}
      <g transform="translate(120, 48)">
        {/* Outer Navy Ring */}
        <circle cx="0" cy="0" r="32" fill="#002F6C" />
        <circle cx="0" cy="0" r="30" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />

        {/* Clasped Hands (Handshake) */}
        <g fill="#FFFFFF">
          {/* Left hand & cuff */}
          <path d="M -16 6 L -9 -2 C -6 -5, -2 -5, 0 -2 L 5 3 C 3 5, 0 6, -3 4 L -6 7 L -16 6 Z" />
          {/* Right hand clasping */}
          <path d="M 16 6 L 9 -2 C 6 -5, 2 -5, 0 -2 L -5 3 C -3 5, 0 6, 3 4 L 6 7 L 16 6 Z" />
          {/* Handshake center knuckles */}
          <ellipse cx="0" cy="2" rx="4" ry="3" />
        </g>

        {/* 4 Stars over handshake */}
        <polygon points="0,-16 2,-12 6,-12 3,-9 4,-5 0,-8 -4,-5 -3,-9 -6,-12 -2,-12" fill="#BA0C2F" />
        <polygon points="-12,-12 -10,-9 -7,-9 -9,-6 -8,-3 -11,-5 -14,-3 -13,-6 -16,-9 -13,-9" fill="#BA0C2F" transform="scale(0.7) translate(-5, -5)" />
        <polygon points="12,-12 14,-9 17,-9 15,-6 16,-3 13,-5 10,-3 11,-6 8,-9 11,-9" fill="#BA0C2F" transform="scale(0.7) translate(5, -5)" />
      </g>

      {/* USAID Wordmark */}
      <text
        x="120"
        y="114"
        textAnchor="middle"
        fontFamily="'Quicksand', 'Arial', sans-serif"
        fontWeight="800"
        fontSize="24"
        fill="#002F6C"
        letterSpacing="2px"
      >
        USAID
      </text>

      {/* FROM THE AMERICAN PEOPLE */}
      <text
        x="120"
        y="132"
        textAnchor="middle"
        fontFamily="'Quicksand', 'Arial', sans-serif"
        fontWeight="700"
        fontSize="9"
        fill="#BA0C2F"
        letterSpacing="1.2px"
      >
        FROM THE AMERICAN PEOPLE
      </text>

      {/* International Development subtext */}
      <text
        x="120"
        y="146"
        textAnchor="middle"
        fontFamily="'Quicksand', 'Arial', sans-serif"
        fontWeight="500"
        fontSize="9"
        fill="#777777"
        letterSpacing="0.5px"
      >
        Global Development Agency
      </text>
    </svg>
  );
};

/**
 * Official BRAC IED Logo (Using uploaded master artwork)
 */
export const BracIedLogo: React.FC<LogoProps> = ({ size = 140, style }) => {
  return (
    <img
      src="/assets/brac-ied-logo.png"
      alt="BRAC IED"
      style={{
        width: size,
        height: "auto",
        maxHeight: size * 0.85,
        objectFit: "contain",
        display: "block",
        ...style,
      }}
    />
  );
};

/**
 * Official CRP Bangladesh Vector Brandmark (Centre for the Rehabilitation of the Paralysed)
 */
export const CrpBangladeshLogo: React.FC<LogoProps> = ({ size = 120, style }) => {
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 240 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", ...style }}
    >
      {/* Red outer circle with laurel leaves & disability rehabilitation icon */}
      <g transform="translate(120, 52)">
        {/* Red circle */}
        <circle cx="0" cy="0" r="34" fill="#DA291C" />
        <circle cx="0" cy="0" r="31" stroke="#FFFFFF" strokeWidth="1.2" fill="none" />

        {/* Stylized Active Figure / Wheelchair Silhouette */}
        {/* Head */}
        <circle cx="2" cy="-14" r="5" fill="#FFFFFF" />
        {/* Torso & Wheelchair wheel */}
        <path
          d="M -3 -8 L 5 -5 L 3 3 L -7 3"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Wheel circle */}
        <circle cx="-1" cy="7" r="10" stroke="#FFFFFF" strokeWidth="2.5" fill="none" />
        {/* Forward leg */}
        <path
          d="M 3 3 L 8 11 L 14 11"
          stroke="#FFFFFF"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </g>

      {/* CRP BANGLADESH text */}
      <text
        x="120"
        y="120"
        textAnchor="middle"
        fontFamily="'Quicksand', 'Arial', sans-serif"
        fontWeight="800"
        fontSize="22"
        fill="#DA291C"
        letterSpacing="2px"
      >
        CRP
      </text>
      <text
        x="120"
        y="138"
        textAnchor="middle"
        fontFamily="'Quicksand', 'Arial', sans-serif"
        fontWeight="700"
        fontSize="11"
        fill="#006A4E"
        letterSpacing="1px"
      >
        BANGLADESH
      </text>
      <text
        x="120"
        y="152"
        textAnchor="middle"
        fontFamily="'Quicksand', 'Arial', sans-serif"
        fontWeight="500"
        fontSize="9"
        fill="#455560"
        letterSpacing="0.5px"
      >
        Disability & Rehabilitation Studies
      </text>
    </svg>
  );
};

/**
 * Official UNESCO Vector Brandmark (GEM Report)
 */
export const UnescoLogo: React.FC<LogoProps> = ({ size = 120, style }) => {
  return (
    <svg
      width={size}
      height={size * 0.72}
      viewBox="0 0 240 170"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", ...style }}
    >
      {/* UNESCO Blue Temple Columns Symbol */}
      <g transform="translate(120, 52)">
        {/* Pediment / Triangle top */}
        <path d="M -40 -12 L 0 -34 L 40 -12 Z" fill="#0077D4" />
        <line x1="-42" y1="-10" x2="42" y2="-10" stroke="#0077D4" strokeWidth="2.5" />
        {/* 6 Columns */}
        {[-32, -19, -6, 7, 20, 33].map((x, i) => (
          <rect key={i} x={x} y="-8" width="5" height="26" fill="#0077D4" rx="1" />
        ))}
        {/* Base Steps */}
        <line x1="-44" y1="20" x2="44" y2="20" stroke="#0077D4" strokeWidth="3" />
        <line x1="-48" y1="24" x2="48" y2="24" stroke="#0077D4" strokeWidth="2" />
      </g>

      <text
        x="120"
        y="120"
        textAnchor="middle"
        fontFamily="'Quicksand', 'Arial', sans-serif"
        fontWeight="800"
        fontSize="22"
        fill="#0077D4"
        letterSpacing="3px"
      >
        UNESCO
      </text>
      <text
        x="120"
        y="138"
        textAnchor="middle"
        fontFamily="'Quicksand', 'Arial', sans-serif"
        fontWeight="700"
        fontSize="10"
        fill="#455560"
        letterSpacing="1px"
      >
        GLOBAL EDUCATION MONITORING
      </text>
      <text
        x="120"
        y="152"
        textAnchor="middle"
        fontFamily="'Quicksand', 'Arial', sans-serif"
        fontWeight="600"
        fontSize="9"
        fill="#ED1C24"
      >
        GEM Report 2022
      </text>
    </svg>
  );
};
