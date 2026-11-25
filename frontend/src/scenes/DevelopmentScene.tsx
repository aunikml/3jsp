import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Grid } from "@react-three/drei";
import { SheetProvider, editable as e } from "@theatre/r3f";
import { devSceneSheet } from "../animation/theatreProject";
import { SceneLighting } from "../components/three/SceneLighting";
import { EditableBox } from "../components/three/EditableBox";
import { WebGLErrorBoundary } from "../components/three/WebGLErrorBoundary";
import { Typography } from "@mui/material";

interface DevelopmentSceneProps {
  onObjectClick?: (objectId: string) => void;
}

export const DevelopmentScene: React.FC<DevelopmentSceneProps> = ({ onObjectClick }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        backgroundColor: "#060911",
      }}
    >
      <WebGLErrorBoundary>
        <Canvas
          shadows
          camera={{ position: [0, 2.5, 6], fov: 45 }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
            preserveDrawingBuffer: true,
          }}
          style={{ width: "100%", height: "100%" }}
        >
          <SheetProvider sheet={devSceneSheet}>
            <e.perspectiveCamera
              theatreKey="DevelopmentCamera"
              position={[0, 2.5, 6]}
              fov={45}
            />

            <OrbitControls
              makeDefault
              enableDamping
              dampingFactor={0.05}
              maxPolarAngle={Math.PI / 2 + 0.1}
            />

            <SceneLighting />

            <Suspense fallback={null}>
              <EditableBox onInteract={onObjectClick} />

              <Grid
                renderOrder={-1}
                position={[0, -0.01, 0]}
                infiniteGrid
                cellSize={1}
                cellThickness={0.8}
                cellColor="#1e293b"
                sectionSize={5}
                sectionThickness={1.5}
                sectionColor="#334155"
                fadeDistance={30}
              />
            </Suspense>
          </SheetProvider>
        </Canvas>
      </WebGLErrorBoundary>

      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 16,
          backgroundColor: "rgba(15, 23, 42, 0.75)",
          backdropFilter: "blur(8px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: 8,
          padding: "8px 16px",
          pointerEvents: "none",
        }}
      >
        <Typography variant="caption" sx={{ color: "text.secondary" }}>
          Left Click + Drag: Orbit Camera • Scroll: Zoom • Click Cube: Inspect Node
        </Typography>
      </div>
    </div>
  );
};
