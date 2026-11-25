import React from "react";

export const SceneLighting: React.FC = () => {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[10, 15, 10]}
        intensity={1.2}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <pointLight position={[-10, -5, -10]} intensity={0.4} color="#38bdf8" />
    </>
  );
};
