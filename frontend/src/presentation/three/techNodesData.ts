import { brandColors } from "../../theme/theme";

export interface TechNodeData {
  id: string;
  title: string;
  shortLabel: string;
  color: string;
  position: [number, number, number];
  description: string;
  metric: string;
}

export const TECH_NODES: TechNodeData[] = [
  {
    id: "scaffolding",
    title: "Adaptive Digital Scaffolding",
    shortLabel: "Scaffolding",
    color: brandColors.pantoneOrange, // #FF5100
    position: [2.5, 0.8, 0.5],
    description: "Dynamic instructional stepping stones tuned to student cognitive load.",
    metric: "94% Completion Rate",
  },
  {
    id: "simulation",
    title: "Interactive Cognitive Simulations",
    shortLabel: "Simulation 3D",
    color: brandColors.teachingLearning, // #6D68AF
    position: [-2.4, 1.2, -0.4],
    description: "Immersive procedural virtual labs allowing safe, risk-free experimentation.",
    metric: "3.2x Retention",
  },
  {
    id: "feedback",
    title: "Continuous Real-Time Feedback",
    shortLabel: "Live Feedback",
    color: brandColors.climateChange, // #44C8F5
    position: [0.6, -1.8, 1.8],
    description: "Automated formative checkpoints guiding mastery in real time.",
    metric: "<2s Response Cycle",
  },
  {
    id: "collaboration",
    title: "Collaborative Learning Networks",
    shortLabel: "Collaboration",
    color: brandColors.mentalHealth, // #8DC63F
    position: [-1.2, -1.4, -1.6],
    description: "Peer-to-peer co-creation tools and social constructive workspaces.",
    metric: "88% Peer Interaction",
  },
];
