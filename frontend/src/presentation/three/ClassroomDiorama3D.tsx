import React, { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { brandColors } from "../../theme/theme";
import {
  ClassroomMode,
  HotspotData,
  CLASSROOM_HOTSPOTS,
} from "./classroomHotspotsData";
import {
  generateStudentLayout,
  TelemetryMetrics,
  LowTechSubMode,
} from "./ClassroomSimulationEngine";
import { StudentAvatars3D } from "./StudentAvatars3D";

interface ClassroomDiorama3DProps {
  mode: ClassroomMode;
  lowTechSubMode?: LowTechSubMode;
  classSize: number;
  telemetry: TelemetryMetrics;
  activeHotspotId: string | null;
  onSelectHotspot: (hotspot: HotspotData) => void;
  autoRotate: boolean;
}

export const ClassroomDiorama3D: React.FC<ClassroomDiorama3DProps> = ({
  mode,
  lowTechSubMode = "standard",
  classSize,
  telemetry,
  activeHotspotId,
  onSelectHotspot,
  autoRotate,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate dynamic student layout based on mode, lowTechSubMode and class size
  const students = useMemo(
    () => generateStudentLayout(mode, classSize, lowTechSubMode),
    [mode, classSize, lowTechSubMode]
  );

  // Subtle ambient breathing animation when auto-rotate is enabled
  useFrame((_, delta) => {
    if (groupRef.current && autoRotate) {
      groupRef.current.rotation.y += delta * 0.12;
    }
  });

  const hotspots = CLASSROOM_HOTSPOTS[mode];

  const modeAccent =
    mode === "traditional"
      ? "#4A5568"
      : mode === "lowtech"
      ? brandColors.teachingLearning
      : mode === "virtual"
      ? "#0284C7"
      : brandColors.pantoneOrange;

  return (
    <>
      {/* Studio Lighting */}
      <ambientLight intensity={0.7} />
      <directionalLight
        position={[8, 12, 6]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-6, 8, -6]} intensity={0.5} />
      <pointLight
        position={[0, 4, 0]}
        intensity={mode === "hightech" ? 1.0 : 0.4}
        color={mode === "hightech" ? "#44C8F5" : "#FFF7ED"}
      />

      {/* Orbit Controls (Manual Orbit, Smooth Damping) */}
      <OrbitControls
        enablePan={false}
        enableZoom={true}
        minDistance={6}
        maxDistance={14}
        minPolarAngle={Math.PI / 4.5}
        maxPolarAngle={Math.PI / 2.15}
        dampingFactor={0.05}
      />

      {/* Center 3D Diorama Stage Group */}
      <group ref={groupRef} position={[0, -0.6, 0]}>
        {/* A. Physical Plinth Base & Cutaway Room Architecture (Only rendered for physical classroom modes!) */}
        {mode !== "virtual" && (
          <group name="physical-classroom-envelope">
            {/* Circular Studio Base */}
            <mesh position={[0, -0.22, 0]} receiveShadow>
              <cylinderGeometry args={[4.4, 4.6, 0.44, 48]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.05} />
            </mesh>

            {/* Plinth Accent Ring */}
            <mesh position={[0, -0.01, 0]}>
              <ringGeometry args={[4.2, 4.38, 48]} />
              <meshBasicMaterial color={modeAccent} side={THREE.DoubleSide} transparent opacity={0.6} />
            </mesh>

            {/* Parquet / Tile Room Floor */}
            <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
              <planeGeometry args={[6.2, 6.2]} />
              <meshStandardMaterial
                color={
                  mode === "traditional"
                    ? "#C49A6C"
                    : mode === "lowtech"
                    ? "#DFD3C3"
                    : "#F1F5F9"
                }
                roughness={0.5}
              />
            </mesh>

            {/* Left Cutaway Wall */}
            <mesh position={[-3.1, 1.8, 0]}>
              <boxGeometry args={[0.15, 3.6, 6.2]} />
              <meshStandardMaterial color="#FAFAFA" roughness={0.6} />
            </mesh>

            {/* Back Cutaway Wall (THE FRONT OF THE CLASSROOM) */}
            <mesh position={[0, 1.8, -3.1]}>
              <boxGeometry args={[6.2, 3.6, 0.15]} />
              <meshStandardMaterial color="#FAFAFA" roughness={0.6} />
            </mesh>

            {/* Classroom Window on Left Wall letting in morning daylight */}
            <group position={[-3.0, 2.1, 0.5]} rotation={[0, Math.PI / 2, 0]}>
              <mesh>
                <boxGeometry args={[2.2, 1.8, 0.08]} />
                <meshStandardMaterial
                  color={mode === "traditional" ? "#8D5B4C" : mode === "lowtech" ? "#6D68AF" : "#CBD5E0"}
                />
              </mesh>
              <mesh position={[0, 0, 0.02]}>
                <planeGeometry args={[1.9, 1.5]} />
                <meshStandardMaterial
                  color="#BAE6FD"
                  roughness={0.1}
                  metalness={0.8}
                  transparent
                  opacity={0.4}
                />
              </mesh>
            </group>
          </group>
        )}

        {/* B. ENVIRONMENT-SPECIFIC PROPS (FRONT OF CLASSROOM AT BACK WALL z = -3.0) */}

        {/* ============================================================ */}
        {/* 1. TRADITIONAL ENVIRONMENT PROPS */}
        {/* ============================================================ */}
        {mode === "traditional" && (
          <group key="props-traditional">
            {/* Front Blackboard on Back Wall (Center: [0, 2.0, -3.0]) */}
            <group position={[0, 2.0, -3.0]}>
              {/* Outer Wooden Frame */}
              <mesh>
                <boxGeometry args={[3.8, 1.6, 0.08]} />
                <meshStandardMaterial color="#8D5B4C" roughness={0.6} />
              </mesh>
              {/* Green Slate Surface */}
              <mesh position={[0, 0, 0.05]}>
                <boxGeometry args={[3.6, 1.4, 0.02]} />
                <meshStandardMaterial color="#1E3A2F" roughness={0.8} />
              </mesh>
              {/* Chalk Math / Lesson Notes */}
              <mesh position={[-0.8, 0.2, 0.065]}>
                <planeGeometry args={[0.01, 0.4]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              {/* Chalk Tray */}
              <mesh position={[0, -0.72, 0.09]}>
                <boxGeometry args={[3.6, 0.04, 0.1]} />
                <meshStandardMaterial color="#8D5B4C" />
              </mesh>
            </group>

            {/* Front Analog Wall Clock above Board */}
            <group position={[0, 2.95, -3.0]}>
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <cylinderGeometry args={[0.26, 0.26, 0.05, 24]} />
                <meshStandardMaterial color="#FFFFFF" />
              </mesh>
              <mesh position={[0, 0, 0.035]}>
                <ringGeometry args={[0.22, 0.25, 24]} />
                <meshBasicMaterial color="#1E293B" />
              </mesh>
            </group>

            {/* Teacher Podium & Growing Paper Exam Stack */}
            <group position={[-1.2, 0.55, -2.1]}>
              <mesh position={[0, 0, 0]}>
                <boxGeometry args={[0.9, 1.0, 0.6]} />
                <meshStandardMaterial color="#78350F" roughness={0.6} />
              </mesh>
              {/* Open Textbook on Podium */}
              <mesh position={[-0.15, 0.53, 0]} rotation={[0, 0.1, 0]}>
                <boxGeometry args={[0.34, 0.03, 0.26]} />
                <meshStandardMaterial color="#FDF6E2" />
              </mesh>
              {/* Dynamic Stack of Paper Exams (Grading Backlog under scale) */}
              <mesh position={[0.22, 0.53 + telemetry.paperStackHeight / 2, 0]}>
                <boxGeometry args={[0.26, telemetry.paperStackHeight, 0.2]} />
                <meshStandardMaterial color="#FFFFFF" roughness={0.9} />
              </mesh>
              {/* Red Grading Pencil */}
              <mesh position={[0.22, 0.53 + telemetry.paperStackHeight + 0.012, 0]} rotation={[0, 0.35, 0]}>
                <boxGeometry args={[0.015, 0.015, 0.16]} />
                <meshStandardMaterial color="#DC2626" />
              </mesh>
            </group>

            {/* ON-GOING ACTIVITY: 3D Teacher Avatar at Front Chalkboard */}
            <group position={[-0.6, 0.42, -2.2]} rotation={[0, 0.15, 0]}>
              {/* Torso */}
              <mesh position={[0, 0.16, 0]}>
                <boxGeometry args={[0.26, 0.32, 0.18]} />
                <meshStandardMaterial color="#334155" roughness={0.6} />
              </mesh>
              {/* Head */}
              <mesh position={[0, 0.42, 0]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial color="#FBBF24" />
              </mesh>
              {/* Right Arm raised pointing chalk towards board */}
              <group position={[0.15, 0.26, 0]} rotation={[-0.7, 0.6, 0]}>
                <mesh position={[0, 0.16, 0]}>
                  <cylinderGeometry args={[0.02, 0.02, 0.32]} />
                  <meshStandardMaterial color="#334155" />
                </mesh>
                {/* Yellow Chalk / Pointer */}
                <mesh position={[0, 0.33, 0]}>
                  <cylinderGeometry args={[0.008, 0.008, 0.12]} />
                  <meshStandardMaterial color="#FDE047" />
                </mesh>
              </group>
              {/* Teacher HUD label */}
              <Html position={[0, 0.72, 0]} center distanceFactor={10}>
                <div
                  style={{
                    backgroundColor: "#1E293B",
                    color: "#FFFFFF",
                    fontSize: "9px",
                    fontWeight: 800,
                    padding: "2px 7px",
                    borderRadius: "8px",
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  Teacher (Direct Lecture)
                </div>
              </Html>
            </group>
          </group>
        )}

        {/* ============================================================ */}
        {/* 2. LOW-TECH RESOURCE ENVIRONMENT PROPS */}
        {/* ============================================================ */}
        {mode === "lowtech" && (
          <group key={`props-lowtech-${lowTechSubMode}`}>
            {lowTechSubMode === "standard" ? (
              /* --- 2A: STANDARD LOW-TECH CLASSROOM WITH OHP & WALL CHARTS --- */
              <group>
                {/* Front Wall Board & Projection Screen on Back Wall */}
                <group position={[0, 2.0, -3.0]}>
                  {/* Chalkboard / Whiteboard Base */}
                  <mesh position={[-1.2, 0, 0]}>
                    <boxGeometry args={[1.5, 1.4, 0.04]} />
                    <meshStandardMaterial color="#1E293B" />
                  </mesh>

                  {/* Pull-down OHP Projection Screen (White Matte) */}
                  <group position={[0.4, 0.1, 0.02]}>
                    <mesh>
                      <boxGeometry args={[1.9, 1.5, 0.03]} />
                      <meshStandardMaterial color="#F8FAFC" roughness={0.3} />
                    </mesh>
                    {/* Screen Top Roller Bar */}
                    <mesh position={[0, 0.78, 0.02]}>
                      <cylinderGeometry args={[0.04, 0.04, 2.0, 16]} />
                      <meshStandardMaterial color="#475569" metalness={0.6} />
                    </mesh>
                    {/* Projected OHP Transparency Slide (Anatomy / Solar Diagram) */}
                    <mesh position={[0, 0, 0.02]}>
                      <planeGeometry args={[1.7, 1.3]} />
                      <meshBasicMaterial color="#E0F2FE" />
                    </mesh>
                    {/* Hand-drawn Transparency Diagram details */}
                    <mesh position={[0, 0.1, 0.025]}>
                      <ringGeometry args={[0.2, 0.23, 24]} />
                      <meshBasicMaterial color="#0284C7" />
                    </mesh>
                    <mesh position={[0, -0.28, 0.025]}>
                      <planeGeometry args={[0.9, 0.03]} />
                      <meshBasicMaterial color="#0369A1" />
                    </mesh>
                  </group>

                  {/* Science Chart Poster (Yellow) */}
                  <mesh position={[1.8, 0.2, 0.02]}>
                    <boxGeometry args={[0.7, 0.9, 0.02]} />
                    <meshStandardMaterial color="#ECC94B" />
                  </mesh>
                </group>

                {/* Hanging Clothesline Flashcards across Front Wall */}
                <group position={[0, 2.9, -2.95]}>
                  <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[3.8, 0.015, 0.015]} />
                    <meshBasicMaterial color="#718096" />
                  </mesh>
                  {[-1.4, -0.7, 0, 0.7, 1.4].map((posX, i) => (
                    <mesh key={i} position={[posX, -0.16, 0]} rotation={[0, 0, (i % 2 === 0 ? 0.04 : -0.04)]}>
                      <boxGeometry args={[0.24, 0.3, 0.01]} />
                      <meshStandardMaterial
                        color={i === 0 ? "#FF5100" : i === 1 ? "#6D68AF" : i === 2 ? "#10B981" : i === 3 ? "#44C8F5" : "#F59E0B"}
                      />
                    </mesh>
                  ))}
                </group>

                {/* OVERHEAD PROJECTOR (OHP) ON ROLLING CART */}
                <group position={[0.4, 0.0, -1.8]}>
                  {/* Rolling Metal Cart */}
                  <mesh position={[0, 0.38, 0]}>
                    <boxGeometry args={[0.6, 0.04, 0.55]} />
                    <meshStandardMaterial color="#64748B" metalness={0.5} roughness={0.4} />
                  </mesh>
                  <mesh position={[0, 0.15, 0]}>
                    <boxGeometry args={[0.55, 0.03, 0.5]} />
                    <meshStandardMaterial color="#64748B" metalness={0.5} roughness={0.4} />
                  </mesh>
                  {/* 4 Cart Legs */}
                  {[[-0.26, -0.23], [0.26, -0.23], [-0.26, 0.23], [0.26, 0.23]].map(([lx, lz], li) => (
                    <mesh key={li} position={[lx, 0.2, lz]}>
                      <cylinderGeometry args={[0.018, 0.018, 0.4, 12]} />
                      <meshStandardMaterial color="#334155" metalness={0.7} />
                    </mesh>
                  ))}

                  {/* OHP Projector Base / Light Box Body */}
                  <mesh position={[0, 0.54, 0]}>
                    <boxGeometry args={[0.42, 0.22, 0.38]} />
                    <meshStandardMaterial color="#E2E8F0" roughness={0.3} metalness={0.2} />
                  </mesh>
                  {/* Glowing Illuminated Glass Plinth Stage (Fresnel Lens) */}
                  <mesh position={[0, 0.655, 0]}>
                    <boxGeometry args={[0.34, 0.01, 0.3]} />
                    <meshStandardMaterial color="#FEF08A" emissive="#FEF08A" emissiveIntensity={0.8} />
                  </mesh>
                  {/* Transparency Sheet with Marker Notes */}
                  <mesh position={[0, 0.665, 0]} rotation={[0, 0.05, 0]}>
                    <planeGeometry args={[0.26, 0.22]} />
                    <meshBasicMaterial color="#38BDF8" transparent opacity={0.75} side={THREE.DoubleSide} />
                  </mesh>

                  {/* Vertical Chrome Support Arm */}
                  <mesh position={[0.16, 0.95, -0.14]}>
                    <cylinderGeometry args={[0.014, 0.014, 0.6, 12]} />
                    <meshStandardMaterial color="#CBD5E1" metalness={0.9} roughness={0.1} />
                  </mesh>
                  {/* Top Optical Focusing Head & Angled Mirror */}
                  <group position={[0.1, 1.25, -0.08]} rotation={[-0.35, 0, 0]}>
                    <mesh>
                      <boxGeometry args={[0.14, 0.12, 0.15]} />
                      <meshStandardMaterial color="#334155" />
                    </mesh>
                    {/* Mirror Lens Facing Front Screen */}
                    <mesh position={[0, 0, -0.08]} rotation={[-0.4, 0, 0]}>
                      <boxGeometry args={[0.11, 0.08, 0.01]} />
                      <meshStandardMaterial color="#E0F2FE" metalness={0.95} roughness={0.05} />
                    </mesh>
                  </group>

                  {/* Light Cone Projection Beam from OHP Mirror to Screen */}
                  <mesh position={[0, 1.1, -0.6]} rotation={[Math.PI / 2 + 0.1, 0, 0]}>
                    <coneGeometry args={[0.7, 1.2, 16, 1, true]} />
                    <meshBasicMaterial
                      color="#FEF08A"
                      transparent
                      opacity={0.12}
                      side={THREE.DoubleSide}
                      depthWrite={false}
                    />
                  </mesh>
                </group>

                {/* ON-GOING ACTIVITY: Teacher Operating the OHP */}
                <group position={[-0.1, 0.42, -1.8]} rotation={[0, 0.3, 0]}>
                  {/* Teacher Body */}
                  <mesh position={[0, 0.16, 0]}>
                    <boxGeometry args={[0.26, 0.32, 0.18]} />
                    <meshStandardMaterial color="#6D68AF" roughness={0.5} />
                  </mesh>
                  {/* Teacher Head */}
                  <mesh position={[0, 0.42, 0]}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial color="#FBBF24" />
                  </mesh>
                  {/* Transparency Pen in Teacher Hand */}
                  <mesh position={[0.2, 0.22, 0.12]} rotation={[0.4, 0.3, 0]}>
                    <cylinderGeometry args={[0.01, 0.01, 0.16]} />
                    <meshStandardMaterial color="#0284C7" />
                  </mesh>
                  {/* Teacher HUD label */}
                  <Html position={[0, 0.72, 0]} center distanceFactor={10}>
                    <div
                      style={{
                        backgroundColor: "#6D68AF",
                        color: "#FFFFFF",
                        fontSize: "9px",
                        fontWeight: 800,
                        padding: "2px 7px",
                        borderRadius: "8px",
                        whiteSpace: "nowrap",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      Teacher (OHP Lecture)
                    </div>
                  </Html>
                </group>
              </group>
            ) : (
              /* --- 2B: MORPHED SHARED COMPUTER LAB (EDTECH SHIFT) --- */
              <group>
                {/* Front Lab Whiteboard & Instructor Display on Back Wall */}
                <group position={[0, 2.0, -3.0]}>
                  {/* Digital Lab Whiteboard */}
                  <mesh position={[-0.8, 0, 0]}>
                    <boxGeometry args={[2.0, 1.4, 0.04]} />
                    <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
                  </mesh>
                  {/* Lab Guidelines / Code Poster */}
                  <mesh position={[1.2, 0.2, 0.02]}>
                    <boxGeometry args={[1.2, 0.9, 0.02]} />
                    <meshStandardMaterial color="#1E293B" />
                  </mesh>
                  <mesh position={[1.2, 0.2, 0.035]}>
                    <planeGeometry args={[1.05, 0.75]} />
                    <meshBasicMaterial color="#38BDF8" />
                  </mesh>
                  {/* Header Banner */}
                  <mesh position={[-0.8, 0.55, 0.025]}>
                    <planeGeometry args={[1.8, 0.18]} />
                    <meshBasicMaterial color="#6D68AF" />
                  </mesh>
                </group>

                {/* Shared Network Server Rack & Lab Printer Unit */}
                <group position={[-2.4, 0.6, -2.2]}>
                  {/* Server Cabinet */}
                  <mesh>
                    <boxGeometry args={[0.55, 1.2, 0.45]} />
                    <meshStandardMaterial color="#1E293B" metalness={0.7} />
                  </mesh>
                  {/* Flashing Green/Blue Server LEDs */}
                  {[-0.3, -0.1, 0.1, 0.3].map((ledY, li) => (
                    <mesh key={li} position={[0, ledY, 0.23]}>
                      <planeGeometry args={[0.38, 0.05]} />
                      <meshBasicMaterial color={li % 2 === 0 ? "#10B981" : "#38BDF8"} />
                    </mesh>
                  ))}
                  <Html position={[0, 0.75, 0]} center distanceFactor={10}>
                    <div
                      style={{
                        backgroundColor: "#1E293B",
                        color: "#10B981",
                        fontSize: "8px",
                        fontWeight: 800,
                        padding: "1px 5px",
                        borderRadius: "6px",
                        border: "1px solid #10B981",
                        whiteSpace: "nowrap",
                      }}
                    >
                      LAN Server Node
                    </div>
                  </Html>
                </group>

                {/* ON-GOING ACTIVITY: Teacher Facilitating Lab Session */}
                <group position={[0.1, 0.42, -1.8]} rotation={[0, 0.2, 0]}>
                  <mesh position={[0, 0.16, 0]}>
                    <boxGeometry args={[0.26, 0.32, 0.18]} />
                    <meshStandardMaterial color="#6D68AF" roughness={0.5} />
                  </mesh>
                  <mesh position={[0, 0.42, 0]}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial color="#FBBF24" />
                  </mesh>
                  {/* Master Lab Admin Tablet */}
                  <mesh position={[0.14, 0.18, 0.12]} rotation={[0.4, 0, 0]}>
                    <boxGeometry args={[0.16, 0.22, 0.02]} />
                    <meshStandardMaterial color="#38BDF8" emissive="#38BDF8" emissiveIntensity={0.6} />
                  </mesh>
                  <Html position={[0, 0.72, 0]} center distanceFactor={10}>
                    <div
                      style={{
                        backgroundColor: "#6D68AF",
                        color: "#FFFFFF",
                        fontSize: "9px",
                        fontWeight: 800,
                        padding: "2px 7px",
                        borderRadius: "8px",
                        whiteSpace: "nowrap",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                      }}
                    >
                      Teacher (Lab Instructor)
                    </div>
                  </Html>
                </group>
              </group>
            )}
          </group>
        )}

        {/* ============================================================ */}
        {/* 3. PURE VIRTUAL / ONLINE CLASS: ZERO PHYSICAL CLASSROOM */}
        {/* CLEAN, ELEGANT ALL-VIDEO CONFERENCE GRID (TEACHER + ALL STUDENTS) */}
        {/* ============================================================ */}
        {mode === "virtual" && (
          <group key="props-pure-virtual" position={[0, 1.8, 0]}>
            {/* Monitor Stand Base */}
            <mesh position={[0, -2.1, 0]}>
              <cylinderGeometry args={[2.0, 2.2, 0.1, 32]} />
              <meshStandardMaterial color="#0F172A" roughness={0.5} />
            </mesh>
            <mesh position={[0, -1.95, 0]}>
              <cylinderGeometry args={[0.12, 0.16, 0.3, 16]} />
              <meshStandardMaterial color="#334155" metalness={0.8} />
            </mesh>

            {/* MONITOR FRAME (Width: 6.6, Height: 3.7) */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[6.6, 3.7, 0.08]} />
              <meshStandardMaterial color="#0B0F19" metalness={0.9} roughness={0.2} />
            </mesh>
            {/* Screen Inner Display Surface */}
            <mesh position={[0, 0, 0.045]}>
              <planeGeometry args={[6.46, 3.56]} />
              <meshStandardMaterial color="#090D16" roughness={0.3} />
            </mesh>

            {/* MINIMAL TOP HEADER */}
            <group position={[0, 1.62, 0.055]}>
              <mesh>
                <planeGeometry args={[6.4, 0.22]} />
                <meshBasicMaterial color="#0F172A" />
              </mesh>
              <Html position={[-2.4, 0, 0.01]} center distanceFactor={11}>
                <div style={{ color: "#E2E8F0", fontSize: "11px", fontWeight: 700, whiteSpace: "nowrap" }}>
                  🌐 Virtual Online Classroom • Respiratory Mechanics
                </div>
              </Html>
              <Html position={[2.4, 0, 0.01]} center distanceFactor={11}>
                <div style={{ color: "#38BDF8", fontSize: "10px", fontWeight: 700 }}>
                  👥 {classSize + 1} Online
                </div>
              </Html>
            </group>

            {/* ============================================================ */}
            {/* UNIFIED VIDEO TILES: INSTRUCTOR + ALL STUDENTS IN A CLEAN GRID */}
            {/* ============================================================ */}
            <group position={[0, -0.05, 0.06]}>
              {(() => {
                // Total participants = 1 (Teacher) + classSize (Students)
                const total = classSize + 1;
                // Responsive grid calculation for 16:9 screen area
                const cols = total <= 16 ? 4 : total <= 25 ? 5 : total <= 36 ? 6 : total <= 49 ? 7 : 8;
                const rows = Math.ceil(total / cols);

                const areaW = 6.2;
                const areaH = 2.85;
                const tileW = areaW / cols - 0.06;
                const tileH = areaH / rows - 0.06;

                const tiles = [];

                // 1. TILE 0: TEACHER TILE (Featured with glowing green speaker border)
                const teacherX = -areaW / 2 + 0.5 * (areaW / cols);
                const teacherY = areaH / 2 - 0.5 * (areaH / rows);

                tiles.push(
                  <group key="tile-teacher" position={[teacherX, teacherY, 0]}>
                    <mesh>
                      <planeGeometry args={[tileW, tileH]} />
                      <meshBasicMaterial color="#1E293B" />
                    </mesh>
                    {/* Active Speaker Border */}
                    <mesh position={[0, 0, 0.002]}>
                      <planeGeometry args={[tileW, tileH]} />
                      <meshBasicMaterial color="#10B981" wireframe />
                    </mesh>

                    {/* Teacher Mini Avatar in Tile */}
                    <group position={[0, -tileH * 0.22, 0.01]} scale={[tileW * 0.8, tileH * 0.8, 0.05]}>
                      <mesh position={[0, 0.15, 0]}>
                        <boxGeometry args={[0.34, 0.32, 0.1]} />
                        <meshStandardMaterial color="#6D68AF" />
                      </mesh>
                      <mesh position={[0, 0.44, 0]}>
                        <sphereGeometry args={[0.15, 16, 16]} />
                        <meshStandardMaterial color="#FBBF24" />
                      </mesh>
                    </group>

                    <Html position={[0, -tileH * 0.38, 0.02]} center distanceFactor={13}>
                      <div
                        style={{
                          backgroundColor: "#10B981",
                          color: "#FFFFFF",
                          fontSize: "7px",
                          fontWeight: 800,
                          padding: "1px 5px",
                          borderRadius: "3px",
                          whiteSpace: "nowrap",
                        }}
                      >
                        🎙️ Teacher (Host)
                      </div>
                    </Html>
                  </group>
                );

                // 2. TILES 1 to classSize: ALL STUDENTS
                for (let i = 0; i < classSize; i++) {
                  const idx = i + 1;
                  const r = Math.floor(idx / cols);
                  const c = idx % cols;
                  const x = -areaW / 2 + (c + 0.5) * (areaW / cols);
                  const y = areaH / 2 - (r + 0.5) * (areaH / rows);

                  const isHandRaised = i % 7 === 1;
                  const isCameraOff = i % 8 === 6;

                  tiles.push(
                    <group key={`tile-student-${i}`} position={[x, y, 0]}>
                      {/* Video Tile Background */}
                      <mesh>
                        <planeGeometry args={[tileW, tileH]} />
                        <meshBasicMaterial color={isCameraOff ? "#0F172A" : "#1E293B"} />
                      </mesh>

                      {/* Border */}
                      <mesh position={[0, 0, 0.001]}>
                        <planeGeometry args={[tileW, tileH]} />
                        <meshBasicMaterial color={isHandRaised ? "#38BDF8" : "#334155"} wireframe />
                      </mesh>

                      {/* Student Video Content */}
                      {isCameraOff ? (
                        <mesh position={[0, 0, 0.005]}>
                          <circleGeometry args={[Math.min(tileW, tileH) * 0.28, 16]} />
                          <meshBasicMaterial color="#475569" />
                        </mesh>
                      ) : (
                        <group position={[0, -tileH * 0.22, 0.01]} scale={[tileW * 0.8, tileH * 0.8, 0.05]}>
                          <mesh position={[0, 0.15, 0]}>
                            <boxGeometry args={[0.3, 0.3, 0.1]} />
                            <meshStandardMaterial
                              color={
                                i % 5 === 0
                                  ? "#1D4ED8"
                                  : i % 5 === 1
                                  ? "#B45309"
                                  : i % 5 === 2
                                  ? "#047857"
                                  : i % 5 === 3
                                  ? "#6D28D9"
                                  : "#B91C1C"
                              }
                            />
                          </mesh>
                          <mesh position={[0, 0.42, 0]}>
                            <sphereGeometry args={[0.13, 12, 12]} />
                            <meshStandardMaterial color="#FBBF24" />
                          </mesh>
                        </group>
                      )}

                      {/* Clean Hand Raised Icon */}
                      {isHandRaised && (
                        <Html position={[tileW * 0.32, tileH * 0.26, 0.02]} center distanceFactor={14}>
                          <div style={{ fontSize: "8px" }}>✋</div>
                        </Html>
                      )}

                      {/* Student Label */}
                      <Html position={[0, -tileH * 0.38, 0.02]} center distanceFactor={14}>
                        <div
                          style={{
                            backgroundColor: "rgba(0,0,0,0.6)",
                            color: "#E2E8F0",
                            fontSize: "6.5px",
                            padding: "0 4px",
                            borderRadius: "2px",
                            whiteSpace: "nowrap",
                          }}
                        >
                          Student {i + 1}
                        </div>
                      </Html>
                    </group>
                  );
                }

                return tiles;
              })()}
            </group>

            {/* MINIMAL BOTTOM TOOLBAR */}
            <group position={[0, -1.62, 0.055]}>
              <mesh>
                <planeGeometry args={[6.4, 0.2]} />
                <meshBasicMaterial color="#0F172A" />
              </mesh>
              <Html position={[0, 0, 0.01]} center distanceFactor={11}>
                <div style={{ display: "flex", gap: "16px", alignItems: "center", color: "#94A3B8", fontSize: "9px" }}>
                  <span>🎤 Mute</span>
                  <span>📹 Video</span>
                  <span>✋ Raise Hand</span>
                  <span>💬 Chat</span>
                  <span style={{ backgroundColor: "#EF4444", color: "#FFF", padding: "1px 6px", borderRadius: "3px", fontWeight: 700 }}>Leave</span>
                </div>
              </Html>
            </group>
          </group>
        )}

        {/* ============================================================ */}
        {/* 4. HIGH-TECH RESOURCE ENVIRONMENT PROPS */}
        {/* ============================================================ */}
        {mode === "hightech" && (
          <group key="props-hightech">
            {/* 4K Interactive Smart Display on Front Back Wall */}
            <group position={[0, 2.0, -3.0]}>
              <mesh>
                <boxGeometry args={[4.2, 1.8, 0.06]} />
                <meshStandardMaterial color="#0F172A" metalness={0.8} roughness={0.2} />
              </mesh>
              {/* Glowing High-Tech Display Surface */}
              <mesh position={[0, 0, 0.04]}>
                <boxGeometry args={[4.0, 1.65, 0.02]} />
                <meshStandardMaterial
                  color="#0284C7"
                  emissive="#0284C7"
                  emissiveIntensity={0.65}
                  roughness={0.1}
                />
              </mesh>
              {/* Visual Telemetry Graph Bars */}
              <mesh position={[-0.8, 0.2, 0.055]}>
                <planeGeometry args={[0.01, 0.4]} />
                <meshBasicMaterial color="#38BDF8" />
              </mesh>
              <mesh position={[0.8, -0.15, 0.055]}>
                <planeGeometry args={[0.01, 0.5]} />
                <meshBasicMaterial color="#FF5100" />
              </mesh>
            </group>

            {/* AI Copilot Node Floating Orb above screen */}
            <Float speed={3} rotationIntensity={0.8} floatIntensity={0.6}>
              <group position={[0, 3.2, -2.6]}>
                <mesh>
                  <sphereGeometry args={[0.22, 24, 24]} />
                  <meshStandardMaterial
                    color={brandColors.pantoneOrange}
                    emissive={brandColors.pantoneOrange}
                    emissiveIntensity={0.8}
                  />
                </mesh>
                <mesh>
                  <torusGeometry args={[0.35, 0.02, 12, 32]} />
                  <meshBasicMaterial color="#44C8F5" />
                </mesh>
              </group>
            </Float>

            {/* ON-GOING ACTIVITY: Teacher with Live Analytics Dashboard */}
            <group position={[-1.7, 0.42, -1.8]} rotation={[0, 0.45, 0]}>
              <mesh position={[0, 0.16, 0]}>
                <boxGeometry args={[0.26, 0.32, 0.18]} />
                <meshStandardMaterial color="#0F172A" />
              </mesh>
              <mesh position={[0, 0.42, 0]}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial color="#FBBF24" />
              </mesh>
              {/* Glowing Analytics Tablet */}
              <mesh position={[0.14, 0.2, 0.12]} rotation={[0.45, 0, 0]}>
                <boxGeometry args={[0.2, 0.26, 0.02]} />
                <meshStandardMaterial color="#0284C7" emissive="#0284C7" emissiveIntensity={0.85} />
              </mesh>
              <Html position={[0, 0.72, 0]} center distanceFactor={10}>
                <div
                  style={{
                    backgroundColor: "#FF5100",
                    color: "#FFFFFF",
                    fontSize: "9px",
                    fontWeight: 800,
                    padding: "2px 7px",
                    borderRadius: "8px",
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
                  }}
                >
                  Teacher (AI Analytics)
                </div>
              </Html>
            </group>

            {/* Network Pulse Waves on floor */}
            <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <ringGeometry args={[1.6, 1.66, 32]} />
              <meshBasicMaterial color="#38BDF8" transparent opacity={0.35} />
            </mesh>
          </group>
        )}

        {/* Dynamic Simulated 3D Student Avatars & Desk Layer */}
        <StudentAvatars3D
          students={students}
          mode={mode}
          lowTechSubMode={lowTechSubMode}
        />

        {/* C. FLOATING INTERACTIVE 3D HOTSPOT PINS (1, 2, 3, 4) */}
        {hotspots.map((hotspot) => {
          const isActive = activeHotspotId === hotspot.id;
          return (
            <group key={hotspot.id} position={hotspot.position}>
              <Html center distanceFactor={10} zIndexRange={[100, 0]}>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectHotspot(hotspot);
                  }}
                  style={{
                    border: isActive ? `3px solid ${modeAccent}` : "2px solid #FFFFFF",
                    backgroundColor: isActive ? modeAccent : "#FFFFFF",
                    color: isActive ? "#FFFFFF" : brandColors.pantone432,
                    boxShadow: isActive
                      ? `0 0 18px ${modeAccent}88, 0 6px 14px rgba(0,0,0,0.2)`
                      : "0 4px 12px rgba(0,0,0,0.15)",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Quicksand', sans-serif",
                    fontWeight: 800,
                    fontSize: "13px",
                    cursor: "pointer",
                    transform: isActive ? "scale(1.2)" : "scale(1.0)",
                    transition: "all 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    outline: "none",
                  }}
                  title={hotspot.title}
                >
                  {hotspot.pinNumber}
                </button>
              </Html>
            </group>
          );
        })}
      </group>
    </>
  );
};
