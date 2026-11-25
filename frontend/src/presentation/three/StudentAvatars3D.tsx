import React from "react";
import * as THREE from "three";
import { Html } from "@react-three/drei";
import { StudentAvatarData, LowTechSubMode } from "./ClassroomSimulationEngine";
import { ClassroomMode } from "./classroomHotspotsData";

interface StudentAvatars3DProps {
  students: StudentAvatarData[];
  mode: ClassroomMode;
  lowTechSubMode?: LowTechSubMode;
}

export const StudentAvatars3D: React.FC<StudentAvatars3DProps> = ({
  students,
  mode,
  lowTechSubMode = "standard",
}) => {
  return (
    <group name="students-layer">
      {students.map((student, index) => {
        const isConfused = student.status === "confused";
        const isHandRaised = student.isHandRaised;

        return (
          <group
            key={student.id}
            position={student.position}
            rotation={[0, student.rotationY, 0]}
          >
            {/* Student Body (Low-poly Stylized Humanoid) */}
            {/* Torso */}
            <mesh position={[0, 0.14, 0]}>
              <boxGeometry args={[0.22, 0.28, 0.16]} />
              <meshStandardMaterial color={student.shirtColor} roughness={0.6} />
            </mesh>

            {/* Head */}
            <mesh position={[0, 0.38, 0]}>
              <sphereGeometry args={[0.11, 16, 16]} />
              <meshStandardMaterial color="#FBBF24" roughness={0.4} />
            </mesh>

            {/* Hair */}
            <mesh position={[0, 0.44, -0.02]}>
              <sphereGeometry args={[0.11, 12, 12]} />
              <meshStandardMaterial color="#1E293B" roughness={0.9} />
            </mesh>

            {/* Left Arm Resting / Typing on Desk */}
            <mesh position={[-0.12, 0.08, 0.08]}>
              <boxGeometry args={[0.06, 0.16, 0.14]} />
              <meshStandardMaterial color={student.shirtColor} />
            </mesh>

            {/* Right Arm: Either Raised or on Desk */}
            {isHandRaised ? (
              <group position={[0.13, 0.28, 0]} rotation={[0, 0, 0.3]}>
                <mesh position={[0, 0.12, 0]}>
                  <boxGeometry args={[0.05, 0.22, 0.05]} />
                  <meshStandardMaterial color={student.shirtColor} />
                </mesh>
                <mesh position={[0, 0.25, 0]}>
                  <sphereGeometry args={[0.04, 8, 8]} />
                  <meshStandardMaterial color="#FBBF24" />
                </mesh>
              </group>
            ) : (
              <mesh position={[0.12, 0.08, 0.08]}>
                <boxGeometry args={[0.06, 0.16, 0.14]} />
                <meshStandardMaterial color={student.shirtColor} />
              </mesh>
            )}

            {/* Traditional Overcrowding Alert */}
            {isConfused && (
              <Html position={[0, 0.65, 0]} center distanceFactor={11}>
                <div
                  style={{
                    backgroundColor: "#EF4444",
                    color: "#FFFFFF",
                    fontSize: "10px",
                    fontWeight: 800,
                    width: 18,
                    height: 18,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 2px 6px rgba(239, 68, 68, 0.5)",
                  }}
                  title="Overcrowded / Sightline Blocked"
                >
                  ?
                </div>
              </Html>
            )}

            {/* Active Participant Hand Raised Badge */}
            {isHandRaised && (
              <Html position={[0.16, 0.68, 0]} center distanceFactor={11}>
                <div
                  style={{
                    backgroundColor: "#10B981",
                    color: "#FFFFFF",
                    fontSize: "9px",
                    fontWeight: 800,
                    padding: "1px 5px",
                    borderRadius: "8px",
                    whiteSpace: "nowrap",
                    boxShadow: "0 2px 6px rgba(16, 185, 129, 0.4)",
                  }}
                >
                  Hand Raised
                </div>
              </Html>
            )}

            {/* 1. TRADITIONAL BANGLADESHI BENCH-DESK SET */}
            {mode === "traditional" && (
              <group position={[0, 0.05, 0.18]}>
                <mesh position={[0, 0, 0]}>
                  <boxGeometry args={[0.34, 0.03, 0.22]} />
                  <meshStandardMaterial color="#854D0E" roughness={0.7} />
                </mesh>
                <mesh position={[-0.14, -0.22, 0.08]}>
                  <cylinderGeometry args={[0.015, 0.015, 0.42]} />
                  <meshStandardMaterial color="#334155" />
                </mesh>
                <mesh position={[0.14, -0.22, 0.08]}>
                  <cylinderGeometry args={[0.015, 0.015, 0.42]} />
                  <meshStandardMaterial color="#334155" />
                </mesh>
                <mesh position={[0, 0.024, 0]}>
                  <boxGeometry args={[0.18, 0.015, 0.14]} />
                  <meshStandardMaterial color="#F8FAFC" />
                </mesh>
                <mesh position={[0.06, 0.035, 0]} rotation={[0, 0.2, 0]}>
                  <boxGeometry args={[0.01, 0.01, 0.1]} />
                  <meshStandardMaterial color="#1D4ED8" />
                </mesh>
                <mesh position={[0, -0.16, -0.18]}>
                  <boxGeometry args={[0.34, 0.03, 0.16]} />
                  <meshStandardMaterial color="#713F12" roughness={0.7} />
                </mesh>
              </group>
            )}

            {/* 2. LOW-TECH STANDARD CLASSROOM: GROUP DESK WITH COMPANION WORKSHEETS */}
            {mode === "lowtech" && lowTechSubMode === "standard" && (
              <group position={[0, 0.05, 0.18]}>
                <mesh position={[0, 0, 0]}>
                  <boxGeometry args={[0.36, 0.03, 0.24]} />
                  <meshStandardMaterial color="#6D68AF" roughness={0.5} />
                </mesh>
                {/* Legs */}
                <mesh position={[-0.15, -0.22, 0.08]}>
                  <cylinderGeometry args={[0.015, 0.015, 0.42]} />
                  <meshStandardMaterial color="#475569" />
                </mesh>
                <mesh position={[0.15, -0.22, 0.08]}>
                  <cylinderGeometry args={[0.015, 0.015, 0.42]} />
                  <meshStandardMaterial color="#475569" />
                </mesh>
                {/* Printed Companion Worksheet matching OHP screen */}
                <mesh position={[-0.04, 0.024, 0]}>
                  <boxGeometry args={[0.2, 0.015, 0.16]} />
                  <meshStandardMaterial color="#FEF9C3" />
                </mesh>
                {/* Color Pen / Highlighter */}
                <mesh position={[0.1, 0.035, 0]}>
                  <boxGeometry args={[0.015, 0.015, 0.1]} />
                  <meshStandardMaterial color="#DC2626" />
                </mesh>
                {/* Seat */}
                <mesh position={[0, -0.16, -0.18]}>
                  <cylinderGeometry args={[0.12, 0.12, 0.03, 16]} />
                  <meshStandardMaterial color="#FBBF24" />
                </mesh>
              </group>
            )}

            {/* 3. LOW-TECH MORPH: SHARED COMPUTER LAB WORKSTATION (DESKTOP PC + MONITOR + KEYBOARD) */}
            {mode === "lowtech" && lowTechSubMode === "computer_lab" && (
              <group position={[0, 0.05, 0.18]}>
                {/* Computer Table */}
                <mesh position={[0, 0, 0]}>
                  <boxGeometry args={[0.38, 0.03, 0.26]} />
                  <meshStandardMaterial color="#334155" roughness={0.4} />
                </mesh>
                <mesh position={[-0.16, -0.22, 0.08]}>
                  <cylinderGeometry args={[0.015, 0.015, 0.42]} />
                  <meshStandardMaterial color="#0F172A" />
                </mesh>
                <mesh position={[0.16, -0.22, 0.08]}>
                  <cylinderGeometry args={[0.015, 0.015, 0.42]} />
                  <meshStandardMaterial color="#0F172A" />
                </mesh>

                {/* Desktop Monitor Stand */}
                <mesh position={[0, 0.04, 0.06]}>
                  <cylinderGeometry args={[0.03, 0.04, 0.06, 12]} />
                  <meshStandardMaterial color="#1E293B" />
                </mesh>
                {/* Desktop Monitor Screen (Facing student) */}
                <mesh position={[0, 0.12, 0.06]}>
                  <boxGeometry args={[0.22, 0.15, 0.02]} />
                  <meshStandardMaterial color="#0F172A" />
                </mesh>
                {/* Glowing Illuminated Screen Surface */}
                <mesh position={[0, 0.12, 0.048]}>
                  <boxGeometry args={[0.2, 0.13, 0.005]} />
                  <meshStandardMaterial color="#0284C7" emissive="#0284C7" emissiveIntensity={0.8} />
                </mesh>

                {/* Keyboard & Mouse on Table */}
                <mesh position={[0, 0.022, -0.04]}>
                  <boxGeometry args={[0.16, 0.01, 0.06]} />
                  <meshStandardMaterial color="#1E293B" />
                </mesh>
                <mesh position={[0.11, 0.022, -0.04]}>
                  <boxGeometry args={[0.03, 0.012, 0.04]} />
                  <meshStandardMaterial color="#475569" />
                </mesh>

                {/* Stool */}
                <mesh position={[0, -0.16, -0.18]}>
                  <cylinderGeometry args={[0.12, 0.12, 0.03, 16]} />
                  <meshStandardMaterial color="#0F172A" />
                </mesh>
              </group>
            )}

            {/* 4. VIRTUAL / ONLINE CLASS: FLOATING HOLOGRAPHIC REMOTE PARTICIPANT PODIUM */}
            {mode === "virtual" && (
              <group position={[0, -0.05, 0.1]}>
                {/* Translucent Holographic Base Ring */}
                <mesh position={[0, -0.32, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                  <ringGeometry args={[0.18, 0.22, 24]} />
                  <meshBasicMaterial color="#38BDF8" transparent opacity={0.65} side={THREE.DoubleSide} />
                </mesh>

                {/* Vertical Holographic Data Cone / Beam */}
                <mesh position={[0, -0.1, 0]}>
                  <cylinderGeometry args={[0.18, 0.22, 0.44, 16, 1, true]} />
                  <meshBasicMaterial color="#0284C7" transparent opacity={0.12} side={THREE.DoubleSide} />
                </mesh>

                {/* Floating Student Laptop / Tablet Station */}
                <group position={[0, 0.12, 0.04]} rotation={[-0.2, 0, 0]}>
                  {/* Laptop Base */}
                  <mesh>
                    <boxGeometry args={[0.22, 0.012, 0.15]} />
                    <meshStandardMaterial color="#1E293B" metalness={0.8} />
                  </mesh>
                  {/* Laptop Screen */}
                  <mesh position={[0, 0.08, -0.07]} rotation={[-0.35, 0, 0]}>
                    <boxGeometry args={[0.22, 0.14, 0.01]} />
                    <meshStandardMaterial color="#0F172A" />
                  </mesh>
                  {/* Glowing Video Stream on Screen */}
                  <mesh position={[0, 0.08, -0.063]} rotation={[-0.35, 0, 0]}>
                    <planeGeometry args={[0.2, 0.12]} />
                    <meshBasicMaterial color="#38BDF8" />
                  </mesh>
                </group>

                {/* Participant Connectivity Status Ring (Green = 4G/Wifi, Orange = Low Bandwidth) */}
                <mesh position={[0, 0.45, 0]}>
                  <torusGeometry args={[0.16, 0.008, 8, 24]} />
                  <meshBasicMaterial color={index % 5 === 0 ? "#F59E0B" : "#10B981"} />
                </mesh>

                {/* Floating Chat / Mic Pill Indicator */}
                <Html position={[0, 0.62, 0]} center distanceFactor={12}>
                  <div
                    style={{
                      backgroundColor: "rgba(15, 23, 42, 0.85)",
                      backdropFilter: "blur(4px)",
                      color: "#38BDF8",
                      fontSize: "8px",
                      fontWeight: 700,
                      padding: "1px 5px",
                      borderRadius: "6px",
                      border: "1px solid rgba(56, 189, 248, 0.4)",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {index % 4 === 0 ? "💬 Chat Active" : index % 5 === 0 ? "📶 4G Mobile" : "🎤 Muted"}
                  </div>
                </Html>
              </group>
            )}

            {/* 5. HIGH-TECH 1:1 SMART WORKSTATION */}
            {mode === "hightech" && (
              <group position={[0, 0.05, 0.16]}>
                <mesh position={[0, 0, 0]}>
                  <boxGeometry args={[0.34, 0.03, 0.22]} />
                  <meshStandardMaterial color="#FFFFFF" metalness={0.2} roughness={0.1} />
                </mesh>
                <mesh position={[0, 0.02, 0]}>
                  <boxGeometry args={[0.18, 0.015, 0.12]} />
                  <meshStandardMaterial
                    color="#0284C7"
                    emissive="#0284C7"
                    emissiveIntensity={0.8}
                  />
                </mesh>
                <mesh position={[0, -0.16, -0.16]}>
                  <cylinderGeometry args={[0.12, 0.12, 0.03, 16]} />
                  <meshStandardMaterial color="#1E293B" />
                </mesh>
              </group>
            )}
          </group>
        );
      })}
    </group>
  );
};
