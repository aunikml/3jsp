import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Float,
  Html,
  Sphere,
  Icosahedron,
  Torus,
} from "@react-three/drei";
import * as THREE from "three";
import { WebGLErrorBoundary } from "../../components/three/WebGLErrorBoundary";
import { brandColors } from "../../theme/theme";
import { TECH_NODES, TechNodeData } from "./techNodesData";

interface NodeMeshProps {
  node: TechNodeData;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

const NodeMesh: React.FC<NodeMeshProps> = ({ node, isSelected, onSelect }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8;
      meshRef.current.rotation.x += delta * 0.4;
    }
  });

  const scale = isSelected ? 1.35 : hovered ? 1.2 : 1.0;

  return (
    <group position={node.position}>
      {/* Connecting line to center origin */}
      <line>
        <bufferGeometry
          attach="geometry"
          onUpdate={(geo) => {
            geo.setFromPoints([
              new THREE.Vector3(0, 0, 0),
              new THREE.Vector3(
                -node.position[0],
                -node.position[1],
                -node.position[2]
              ),
            ]);
          }}
        />
        <lineBasicMaterial
          attach="material"
          color={node.color}
          transparent
          opacity={isSelected ? 0.65 : 0.25}
          linewidth={isSelected ? 2 : 1}
        />
      </line>

      {/* Orbiting Tech Node Sphere */}
      <Float speed={2.5} rotationIntensity={0.6} floatIntensity={0.8}>
        <mesh
          ref={meshRef}
          scale={scale}
          onClick={(e) => {
            e.stopPropagation();
            onSelect(node.id);
          }}
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
            document.body.style.cursor = "pointer";
          }}
          onPointerOut={() => {
            setHovered(false);
            document.body.style.cursor = "auto";
          }}
        >
          <sphereGeometry args={[0.42, 32, 32]} />
          <meshStandardMaterial
            color={node.color}
            emissive={node.color}
            emissiveIntensity={isSelected ? 0.6 : hovered ? 0.4 : 0.15}
            roughness={0.2}
            metalness={0.3}
          />
        </mesh>

        {/* Orbit Ring around node */}
        <Torus
          args={[0.62, 0.02, 16, 48]}
          rotation={[Math.PI / 3, Math.PI / 4, 0]}
        >
          <meshBasicMaterial
            color={node.color}
            transparent
            opacity={isSelected ? 0.8 : hovered ? 0.5 : 0.3}
          />
        </Torus>

        {/* 2D HTML Label Attached to 3D Node */}
        <Html
          position={[0, 0.75, 0]}
          center
          distanceFactor={10}
          style={{
            pointerEvents: "none",
            userSelect: "none",
            whiteSpace: "nowrap",
          }}
        >
          <div
            style={{
              padding: "4px 10px",
              backgroundColor: isSelected
                ? node.color
                : hovered
                ? "#455560"
                : "rgba(255, 255, 255, 0.95)",
              color: isSelected || hovered ? "#FFFFFF" : "#455560",
              borderRadius: "16px",
              fontSize: "11px",
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
              boxShadow: isSelected
                ? `0 6px 18px ${node.color}55`
                : "0 2px 8px rgba(0,0,0,0.12)",
              border: `1.5px solid ${node.color}`,
              transition: "all 0.25s ease",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                backgroundColor: isSelected || hovered ? "#FFFFFF" : node.color,
              }}
            />
            {node.shortLabel}
          </div>
        </Html>
      </Float>
    </group>
  );
};

// Center 3D Pedagogical Core
const CentralLearningCore: React.FC<{ selectedNodeId: string | null }> = ({
  selectedNodeId,
}) => {
  const coreRef = useRef<THREE.Group>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRingRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.35;
    }
    if (innerRef.current) {
      innerRef.current.rotation.x += delta * 0.25;
      innerRef.current.rotation.z -= delta * 0.2;
    }
    if (outerRingRef.current) {
      outerRingRef.current.rotation.z += delta * 0.15;
    }
  });

  const activeNode = TECH_NODES.find((n) => n.id === selectedNodeId);
  const coreColor = activeNode ? activeNode.color : brandColors.teachingLearning;

  return (
    <group ref={coreRef}>
      {/* Central Solid Icosahedron */}
      <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
        <Icosahedron ref={innerRef} args={[0.95, 1]}>
          <meshStandardMaterial
            color={coreColor}
            emissive={coreColor}
            emissiveIntensity={0.35}
            roughness={0.15}
            metalness={0.4}
            wireframe={false}
          />
        </Icosahedron>

        {/* Outer Wireframe Halo Sphere */}
        <Sphere args={[1.3, 20, 20]}>
          <meshBasicMaterial
            color={brandColors.pantoneOrange}
            wireframe
            transparent
            opacity={0.35}
          />
        </Sphere>

        {/* Equatorial Orbit Ring */}
        <Torus
          ref={outerRingRef}
          args={[1.7, 0.025, 16, 64]}
          rotation={[Math.PI / 2.3, 0, 0]}
        >
          <meshBasicMaterial
            color={brandColors.teachingLearning}
            transparent
            opacity={0.45}
          />
        </Torus>

        {/* Core Billboard Title */}
        <Html
          position={[0, -1.4, 0]}
          center
          distanceFactor={10}
          style={{ pointerEvents: "none", userSelect: "none" }}
        >
          <div
            style={{
              padding: "4px 12px",
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              border: `1.5px solid ${brandColors.teachingLearning}`,
              borderRadius: "20px",
              color: brandColors.pantone432,
              fontFamily: "'Quicksand', sans-serif",
              fontWeight: 700,
              fontSize: "12px",
              letterSpacing: "0.5px",
              boxShadow: "0 4px 12px rgba(109, 104, 175, 0.18)",
              textAlign: "center",
              whiteSpace: "nowrap",
            }}
          >
            Learning Technology Core
          </div>
        </Html>
      </Float>
    </group>
  );
};

interface InstructionalTech3DSceneProps {
  selectedNodeId: string | null;
  onSelectNode: (id: string) => void;
  autoRotate?: boolean;
}

export const InstructionalTech3DScene: React.FC<InstructionalTech3DSceneProps> = ({
  selectedNodeId,
  onSelectNode,
  autoRotate = true,
}) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        borderRadius: "16px",
        overflow: "hidden",
        backgroundColor: "#FFFFFF",
      }}
    >
      <WebGLErrorBoundary>
        <Canvas
          shadows
          camera={{ position: [0, 1.8, 6.2], fov: 46 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            alpha: true,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          {/* Studio Clean Light Setup */}
          <ambientLight intensity={0.85} />
          <directionalLight
            position={[5, 8, 5]}
            intensity={1.2}
            color="#FFFFFF"
            castShadow
          />
          <directionalLight
            position={[-5, -4, -4]}
            intensity={0.6}
            color="#E0E7FF"
          />
          <pointLight
            position={[0, 0, 3]}
            intensity={0.7}
            color={brandColors.pantoneOrange}
          />

          {/* Central Interactive Pedagogical Core */}
          <CentralLearningCore selectedNodeId={selectedNodeId} />

          {/* Orbiting Pedagogical 3D Nodes */}
          {TECH_NODES.map((node) => (
            <NodeMesh
              key={node.id}
              node={node}
              isSelected={selectedNodeId === node.id}
              onSelect={onSelectNode}
            />
          ))}

          {/* User Camera Orbit & Damping Controls */}
          <OrbitControls
            enableDamping
            dampingFactor={0.06}
            minDistance={3.5}
            maxDistance={10}
            maxPolarAngle={Math.PI / 1.7}
            minPolarAngle={Math.PI / 6}
            autoRotate={autoRotate}
            autoRotateSpeed={0.8}
          />
        </Canvas>
      </WebGLErrorBoundary>
    </div>
  );
};
