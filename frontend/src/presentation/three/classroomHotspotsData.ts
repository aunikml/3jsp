export type ClassroomMode = "traditional" | "lowtech" | "virtual" | "hightech";

export interface HotspotData {
  id: string;
  pinNumber: number;
  position: [number, number, number];
  title: string;
  category: string;
  description: string;
  pedagogicalRole: string;
  keyFeature: string;
}

export const CLASSROOM_HOTSPOTS: Record<ClassroomMode, HotspotData[]> = {
  traditional: [
    {
      id: "trad-aid",
      pinNumber: 1,
      position: [0, 2.4, -2.8],
      title: "Chalkboard & Chalk",
      category: "Teaching Aid",
      description: "Primary visual anchor for formulas, diagrams, and notes transcribed live by the instructor at the front.",
      pedagogicalRole: "Supports direct, structured teacher demonstration and sequential lecture delivery.",
      keyFeature: "Low cost, resilient, zero power dependence.",
    },
    {
      id: "trad-podium",
      pinNumber: 2,
      position: [-1.2, 1.5, -1.8],
      title: "Teacher Podium & Exam Stacks",
      category: "Classroom Governance",
      description: "Commands the central focal point of the hall, dictating pace, order, and student attention.",
      pedagogicalRole: "Teacher-centered authority model; instructor is the sole distributor of knowledge.",
      keyFeature: "Shows mounting paper exam grading backlog as class size increases.",
    },
    {
      id: "trad-seating",
      pinNumber: 3,
      position: [1.2, 1.2, 0.2],
      title: "Bench Seating Facing Front",
      category: "Student Environment",
      description: "Standardized wooden high-and-low benches oriented frontward towards the blackboard and teacher.",
      pedagogicalRole: "Individual rote learning and paper textbook reading; verbal interaction limited to teacher prompts.",
      keyFeature: "Under scale (40+ students), back rows suffer from blocked sightlines and disengagement.",
    },
    {
      id: "trad-eval",
      pinNumber: 4,
      position: [-1.2, 1.1, 1.2],
      title: "Summative Examination",
      category: "Assessment Model",
      description: "Periodic written examinations administered on paper with standardized questions.",
      pedagogicalRole: "Tests memorization, recall, and formulaic application with uniform rubrics.",
      keyFeature: "High feedback latency (weeks); teacher grading bottleneck under high enrollment.",
    },
  ],

  lowtech: [
    {
      id: "low-ohp",
      pinNumber: 1,
      position: [0, 2.3, -2.5],
      title: "Overhead Projector (OHP)",
      category: "Visual Projection Aid",
      description: "High-luminance optical projector casting layered transparency sheets directly onto the front projection screen.",
      pedagogicalRole: "Allows step-by-step anatomical and diagrammatic overlays while keeping teacher facing the class.",
      keyFeature: "Low cost, highly resilient optical projection with zero computer maintenance.",
    },
    {
      id: "low-seating",
      pinNumber: 2,
      position: [1.1, 1.2, 0.4],
      title: "Front-Facing Group Seating",
      category: "Seating Layout",
      description: "Desks arranged in pairs facing forward towards the front blackboard and OHP screen.",
      pedagogicalRole: "Ensures every student maintains clear sightlines to the projected transparencies and board.",
      keyFeature: "Bridges collaborative peer dialogue with focused frontal teacher instruction.",
    },
    {
      id: "low-manipulatives",
      pinNumber: 3,
      position: [-1.1, 1.2, 0.4],
      title: "Hands-On Manipulatives & Posters",
      category: "Kinesthetic Learning",
      description: "Abacuses, wooden geometric solids, counting sticks, and printed wall charts.",
      pedagogicalRole: "Bridges concrete perception to abstract mathematical and scientific reasoning.",
      keyFeature: "Crucial for foundational cognitive development in resource-constrained schools.",
    },
    {
      id: "low-complab",
      pinNumber: 4,
      position: [-1.6, 1.3, -1.8],
      title: "Shared Computer Lab Shift",
      category: "EdTech Rotation Model",
      description: "Schools periodically shift cohorts into a shared computer lab for digital simulations and IT literacy.",
      pedagogicalRole: "Provides high-value EdTech application on a rotating timetable without needing 1:1 hardware in every room.",
      keyFeature: "High infrastructure efficiency and shared capital utilization.",
    },
  ],

  virtual: [
    {
      id: "virt-teacher",
      pinNumber: 1,
      position: [-2.1, 2.7, 0.2],
      title: "Instructor Live Feed",
      category: "Live Synchronous Delivery",
      description: "Dedicated primary video tile featuring the instructor with active audio metering and lecture delivery.",
      pedagogicalRole: "Direct live instructional broadcast connecting geographically dispersed students into a single virtual room.",
      keyFeature: "Zero physical classroom constraint; unlimited institutional reach.",
    },
    {
      id: "virt-students",
      pinNumber: 2,
      position: [0.2, 2.0, 0.2],
      title: "Student Video Tile Grid",
      category: "Cohort Presence",
      description: "Clean, uniform video conference mosaic where every enrolled student occupies their own clear video tile.",
      pedagogicalRole: "Maintains social presence, mutual visibility, and active participation without physical walls.",
      keyFeature: "Scales fluidly with class size slider (15 to 60+ student video tiles).",
    },
    {
      id: "virt-feedback",
      pinNumber: 3,
      position: [1.2, 0.8, 0.2],
      title: "Interactive Hand-Raises & Reactions",
      category: "Formative Check-ins",
      description: "Non-intrusive digital status indicators: raised hands (✋) and audio mute status.",
      pedagogicalRole: "Enables instant student questions and quick checks for understanding without audio clutter.",
      keyFeature: "Immediate teacher visibility into learner confusion or readiness.",
    },
    {
      id: "virt-cloud",
      pinNumber: 4,
      position: [0, 0.3, 0.2],
      title: "Automated LMS Quiz & Cloud Sync",
      category: "Digital Evaluation",
      description: "Built-in assessment engine returning instantaneous grading and cloud session recording.",
      pedagogicalRole: "Dissolves traditional paper exam grading delays through automated scoring.",
      keyFeature: "Zero grading latency and 24/7 asynchronous session replays.",
    },
  ],

  hightech: [
    {
      id: "high-smartboard",
      pinNumber: 1,
      position: [0, 2.4, -2.8],
      title: "Interactive Smart Display",
      category: "Digital Workspace",
      description: "Touch-enabled 4K multi-media screen with dynamic simulation rendering and cloud LMS connectivity.",
      pedagogicalRole: "Enables interactive 3D simulations, video lectures, and live collaborative whiteboard brainstorming.",
      keyFeature: "Rich multi-modal cognitive stimulation with instantaneous cloud sync.",
    },
    {
      id: "high-devices",
      pinNumber: 2,
      position: [1.1, 1.2, 0.4],
      title: "1:1 Connected Devices",
      category: "Student Hardware",
      description: "Student tablets and laptops connected via high-speed local intranet and cloud repositories.",
      pedagogicalRole: "Empowers personalized learning paths, asynchronous exploration, and digital submission.",
      keyFeature: "Students proceed at their optimal cognitive velocity with adaptive pacing.",
    },
    {
      id: "high-cloud",
      pinNumber: 3,
      position: [-1.1, 1.4, -1.8],
      title: "LMS & AI Copilot Hub",
      category: "Platform Architecture",
      description: "Centralized learning management system integrating AI diagnostic tools and automated grading.",
      pedagogicalRole: "Delivers immediate formative feedback, auto-remediation, and digital collaboration.",
      keyFeature: "24/7 learning continuity bridging physical classroom to home.",
    },
    {
      id: "high-analytics",
      pinNumber: 4,
      position: [-1.1, 1.2, 0.4],
      title: "Real-Time Telemetry & Analytics",
      category: "Learning Analytics",
      description: "Continuous telemetry tracking student engagement, comprehension bottlenecks, and progress benchmarks.",
      pedagogicalRole: "Shifts assessment from delayed summative grading to real-time proactive teacher intervention.",
      keyFeature: "Data-driven instructional adaptation tailored to individual learners.",
    },
  ],
};
