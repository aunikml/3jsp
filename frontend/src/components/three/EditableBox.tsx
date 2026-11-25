import React, { useRef, useState, useEffect } from "react";
import * as THREE from "three";
import { ThreeEvent } from "@react-three/fiber";
import { editable as e } from "@theatre/r3f";
import { cubeTheatreObject } from "../../animation/theatreProject";
import { usePresentationStore } from "../../presentation/presentationStore";

interface EditableBoxProps {
  onInteract?: (name: string) => void;
}

export const EditableBox: React.FC<EditableBoxProps> = ({ onInteract }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const [color, setColor] = useState("#38bdf8");
  const navigateToNode = usePresentationStore((state) => state.navigateToNode);

  useEffect(() => {
    const unsubscribe = cubeTheatreObject.onValuesChange((values) => {
      if (meshRef.current) {
        meshRef.current.position.set(values.position.x, values.position.y, values.position.z);
        meshRef.current.rotation.set(values.rotation.x, values.rotation.y, values.rotation.z);
        meshRef.current.scale.setScalar(values.scale);
        const { r, g, b } = values.accentColor;
        setColor(new THREE.Color(r, g, b).getHexString());
      }
    });
    return () => unsubscribe();
  }, []);

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation();
    setActive(!active);
    navigateToNode("object-inspection");
    if (onInteract) onInteract("EditableCube");
  };

  return (
    <e.mesh
      theatreKey="EditableCube"
      ref={meshRef}
      position={[0, 0.5, 0]}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
      <boxGeometry args={[1.5, 1.5, 1.5]} />
      <meshStandardMaterial
        color={hovered ? "#f43f5e" : active ? "#a855f7" : `#${color}`}
        roughness={0.3}
        metalness={0.7}
      />
    </e.mesh>
  );
};
