import { ClassroomMode } from "./classroomHotspotsData";

export type LowTechSubMode = "standard" | "computer_lab";

export interface StudentAvatarData {
  id: string;
  position: [number, number, number];
  rotationY: number;
  status: "engaged" | "confused" | "collaborating";
  isHandRaised?: boolean;
  shirtColor: string;
}

export interface TelemetryMetrics {
  engagementPercentage: number;
  feedbackLatency: string;
  differentiationModel: string;
  teacherStressLevel: "Low" | "Moderate" | "Overwhelmed" | "Empowered";
  paperStackHeight: number; // visual height in 3D (0.05 to 0.75)
  slide3ProblemsSolved: {
    category: "Instruction" | "Assessment" | "Evaluation";
    problemText: string;
    isResolved: boolean;
    resolutionNote: string;
  }[];
}

const PALETTE_SHIRTS = [
  "#1D4ED8", // Royal Blue
  "#B45309", // Warm Amber
  "#047857", // Deep Green
  "#B91C1C", // Red
  "#6D28D9", // Purple
  "#0369A1", // Cyan
  "#C2410C", // Orange
  "#475569", // Slate
];

export const calculateTelemetry = (
  mode: ClassroomMode,
  classSize: number,
  lowTechSubMode: LowTechSubMode = "standard"
): TelemetryMetrics => {
  if (mode === "traditional") {
    const ratio = Math.min(Math.max((classSize - 20) / 45, 0), 1);
    const engagement = Math.round(72 - ratio * 44); // 72% down to 28%
    const stress =
      classSize > 48
        ? "Overwhelmed"
        : classSize > 32
        ? "Moderate"
        : "Low";
    const latency =
      classSize > 48
        ? "3+ Weeks (Severe Backlog)"
        : classSize > 32
        ? "10–14 Days"
        : "3–5 Days";

    return {
      engagementPercentage: engagement,
      feedbackLatency: latency,
      differentiationModel: "Lockstep / Frontal Lecture",
      teacherStressLevel: stress,
      paperStackHeight: 0.12 + ratio * 0.65,
      slide3ProblemsSolved: [
        {
          category: "Instruction",
          problemText: "Overcrowded classrooms & low student engagement",
          isResolved: false,
          resolutionNote: "Accumulates: Dense bench packing blocks teacher visibility and leaves back rows disengaged.",
        },
        {
          category: "Assessment",
          problemText: "Limited time for providing feedback",
          isResolved: false,
          resolutionNote: "Accumulates: Massive paper exam grading creates weeks of feedback latency.",
        },
        {
          category: "Evaluation",
          problemText: "Difficulty evaluating students fairly & consistently",
          isResolved: false,
          resolutionNote: "Accumulates: Rigid paper testing fails to account for diverse student learning velocities.",
        },
      ],
    };
  }

  if (mode === "lowtech") {
    if (lowTechSubMode === "computer_lab") {
      // Periodic Computer Lab Shift (EdTech rotation)
      const ratio = Math.min(Math.max((classSize - 20) / 45, 0), 1);
      const engagement = Math.round(92 - ratio * 6); // 92% to 86%

      return {
        engagementPercentage: engagement,
        feedbackLatency: "Immediate Software Practice & Lab Mentoring",
        differentiationModel: "Periodic Computer Lab Rotation (Shared Infrastructure)",
        teacherStressLevel: "Empowered",
        paperStackHeight: 0.0,
        slide3ProblemsSolved: [
          {
            category: "Instruction",
            problemText: "Lack of digital EdTech access in low-resource schools",
            isResolved: true,
            resolutionNote: "Solved: Rotating cohorts into a shared school computer lab provides EdTech access without costly 1:1 devices in every room.",
          },
          {
            category: "Instruction",
            problemText: "Differences in student learning levels",
            isResolved: true,
            resolutionNote: "Solved: Self-paced desktop educational software and paired peer learning on PCs.",
          },
          {
            category: "Assessment",
            problemText: "Limited time for providing feedback",
            isResolved: true,
            resolutionNote: "Solved: Computer-assisted practice modules provide immediate verification.",
          },
        ],
      };
    }

    // Standard Low-Tech OHP & Visual Resource Room
    const ratio = Math.min(Math.max((classSize - 20) / 45, 0), 1);
    const engagement = Math.round(85 - ratio * 9); // 85% down to 76%

    return {
      engagementPercentage: engagement,
      feedbackLatency: "Immediate Peer & OHP Mask Check-ins",
      differentiationModel: "Overhead Projector (OHP) & Layered Transparencies",
      teacherStressLevel: "Empowered",
      paperStackHeight: 0.08,
      slide3ProblemsSolved: [
        {
          category: "Instruction",
          problemText: "Overcrowded classrooms & low visual clarity",
          isResolved: true,
          resolutionNote: "Solved: High-luminance Overhead Projector (OHP) projects clear layered transparencies over the entire front wall.",
        },
        {
          category: "Instruction",
          problemText: "Differences in student learning levels",
          isResolved: true,
          resolutionNote: "Solved: Students follow along with printed companion worksheets and tactile manipulatives at their desks.",
        },
        {
          category: "Assessment",
          problemText: "Limited time for providing feedback",
          isResolved: true,
          resolutionNote: "Solved: Teacher slides opaque cards on OHP for instant visual self-correction.",
        },
      ],
    };
  }

  if (mode === "virtual") {
    // Virtual / Online Classes (Broadcast Studio + Remote Hologram Matrix)
    const ratio = Math.min(Math.max((classSize - 20) / 45, 0), 1);
    const engagement = Math.round(76 - ratio * 12); // 76% down to 64% as class size causes digital isolation
    const stress =
      classSize > 48
        ? "Moderate"
        : "Low";

    return {
      engagementPercentage: engagement,
      feedbackLatency: "Automated Digital Quizzes (Instant) / Forum Q&A (24h)",
      differentiationModel: "Synchronous Live Broadcast + Asynchronous LMS Replays",
      teacherStressLevel: stress,
      paperStackHeight: 0.0,
      slide3ProblemsSolved: [
        {
          category: "Instruction",
          problemText: "Geographic distance & physical classroom crowding",
          isResolved: true,
          resolutionNote: "Solved: Live web conferencing dissolves room capacity limits and eliminates student travel barriers.",
        },
        {
          category: "Assessment",
          problemText: "Limited time for providing feedback",
          isResolved: true,
          resolutionNote: "Solved: Embedded LMS formative polling and automated multiple-choice scoring return instant grades.",
        },
        {
          category: "Evaluation",
          problemText: "Lack of access to specialized instructors",
          isResolved: true,
          resolutionNote: "Solved: Cloud broadcasting connects high-caliber educators with rural and urban students simultaneously.",
        },
      ],
    };
  }

  // High-Tech
  const ratio = Math.min(Math.max((classSize - 20) / 45, 0), 1);
  const engagement = Math.round(96 - ratio * 4); // 96% down to 92%

  return {
    engagementPercentage: engagement,
    feedbackLatency: "Instantaneous (0.2s Formative AI Loop)",
    differentiationModel: "Adaptive Branching & Personalized Pacing",
    teacherStressLevel: "Empowered",
    paperStackHeight: 0.0,
    slide3ProblemsSolved: [
      {
        category: "Instruction",
        problemText: "Differences in student learning levels",
        isResolved: true,
        resolutionNote: "Solved: Software adaptively calibrates pacing and practice modules to each student's mastery.",
      },
      {
        category: "Assessment",
        problemText: "Difficulty tracking student progress consistently",
        isResolved: true,
        resolutionNote: "Solved: Automated telemetry streams continuous progress telemetry to the teacher's smart dashboard.",
      },
      {
        category: "Evaluation",
        problemText: "Lack of up-to-date learning materials",
        isResolved: true,
        resolutionNote: "Solved: Cloud-connected interactive simulations and digital libraries maintain constant currency.",
      },
    ],
  };
};

export const generateStudentLayout = (
  mode: ClassroomMode,
  classSize: number,
  lowTechSubMode: LowTechSubMode = "standard"
): StudentAvatarData[] => {
  const students: StudentAvatarData[] = [];

  if (mode === "traditional") {
    // Bangladeshi Classroom Seating:
    // Long wooden benches in two columns (Left and Right) with a central aisle.
    // All students sit facing FORWARD towards the blackboard (facing -Z, rotationY = Math.PI).
    const numRows = classSize <= 24 ? 4 : classSize <= 42 ? 5 : 6;
    const benchesCount = numRows * 2;
    const studentsPerBench = Math.ceil(classSize / benchesCount);

    const startZ = -1.35;
    const rowSpacing = (2.1 - startZ) / (numRows - 1 || 1);

    let currentStudent = 0;
    for (let row = 0; row < numRows && currentStudent < classSize; row++) {
      const posZ = startZ + row * rowSpacing;

      for (let col = 0; col < 2 && currentStudent < classSize; col++) {
        const colCenter = col === 0 ? -1.25 : 1.25;
        const countOnBench = Math.min(studentsPerBench, classSize - currentStudent);
        const benchWidth = 1.45;

        for (let s = 0; s < countOnBench; s++) {
          const offset = countOnBench > 1
            ? ((s / (countOnBench - 1)) - 0.5) * (benchWidth * 0.85)
            : 0;
          const posX = colCenter + offset;

          const isHandRaised = (row === 0 && col === 0 && s === 0) || (row === 1 && col === 1 && s === 1);
          const isConfused = row >= 3 && classSize > 35;
          const status = isConfused ? "confused" : "engaged";

          students.push({
            id: `trad-std-${currentStudent}`,
            position: [posX, 0.42, posZ],
            rotationY: Math.PI, // Facing forward towards blackboard (-Z)
            status,
            isHandRaised: isHandRaised && !isConfused,
            shirtColor: PALETTE_SHIRTS[currentStudent % PALETTE_SHIRTS.length],
          });
          currentStudent++;
        }
      }
    }
  } else if (mode === "lowtech") {
    if (lowTechSubMode === "computer_lab") {
      // COMPUTER LAB MORPH:
      // Rows of computer workstation desks with PC monitors facing forward towards front lab board.
      // 2 columns (Left & Right) with central aisle.
      const numRows = classSize <= 24 ? 3 : classSize <= 44 ? 4 : 5;
      const desksCount = numRows * 2;
      const studentsPerDesk = Math.ceil(classSize / desksCount);

      const startZ = -1.2;
      const rowSpacing = (2.1 - startZ) / (numRows - 1 || 1);

      let currentStudent = 0;
      for (let row = 0; row < numRows && currentStudent < classSize; row++) {
        const posZ = startZ + row * rowSpacing;

        for (let col = 0; col < 2 && currentStudent < classSize; col++) {
          const colCenter = col === 0 ? -1.25 : 1.25;
          const countOnDesk = Math.min(studentsPerDesk, classSize - currentStudent);
          const deskWidth = 1.4;

          for (let s = 0; s < countOnDesk; s++) {
            const offset = countOnDesk > 1
              ? ((s / (countOnDesk - 1)) - 0.5) * (deskWidth * 0.85)
              : 0;
            const posX = colCenter + offset;

            students.push({
              id: `lab-std-${currentStudent}`,
              position: [posX, 0.42, posZ],
              rotationY: Math.PI, // Facing forward towards PC monitor & front screen
              status: "engaged",
              isHandRaised: currentStudent === 2,
              shirtColor: PALETTE_SHIRTS[currentStudent % PALETTE_SHIRTS.length],
            });
            currentStudent++;
          }
        }
      }
    } else {
      // STANDARD LOW-TECH CLASSROOM (OHP + TRANSPARENCIES):
      // Students sit at tables FACING FORWARD TOWARDS THE FRONT BOARD & OHP SCREEN!
      // Two columns of shared group tables angled slightly (10 deg) towards center projection screen.
      const numRows = classSize <= 24 ? 4 : classSize <= 42 ? 5 : 6;
      const tablesCount = numRows * 2;
      const studentsPerTable = Math.ceil(classSize / tablesCount);

      const startZ = -1.35;
      const rowSpacing = (2.1 - startZ) / (numRows - 1 || 1);

      let currentStudent = 0;
      for (let row = 0; row < numRows && currentStudent < classSize; row++) {
        const posZ = startZ + row * rowSpacing;

        for (let col = 0; col < 2 && currentStudent < classSize; col++) {
          const colCenter = col === 0 ? -1.25 : 1.25;
          const countOnTable = Math.min(studentsPerTable, classSize - currentStudent);
          const tableWidth = 1.45;

          for (let s = 0; s < countOnTable; s++) {
            const offset = countOnTable > 1
              ? ((s / (countOnTable - 1)) - 0.5) * (tableWidth * 0.85)
              : 0;
            const posX = colCenter + offset;

            // All students face the front board & OHP projection screen!
            // Slight angle inwards to see both board and table partner
            const facingAngle = col === 0 ? Math.PI - 0.08 : Math.PI + 0.08;

            students.push({
              id: `low-std-${currentStudent}`,
              position: [posX, 0.42, posZ],
              rotationY: facingAngle, // Facing forward towards front board & OHP
              status: "collaborating",
              isHandRaised: currentStudent === 0,
              shirtColor: PALETTE_SHIRTS[currentStudent % PALETTE_SHIRTS.length],
            });
            currentStudent++;
          }
        }
      }
    }
  } else if (mode === "virtual") {
    // PURE VIRTUAL / ONLINE CLASS:
    // NO PHYSICAL CLASSROOM!
    // All students exist strictly inside the digital video conference screen matrix!
    // Positions are placed directly on the giant virtual screen plane at [X, Y, Z] with Z ~ -0.4 to 0.4
    // We return empty for the physical room floor layer since they are rendered inside the virtual screen matrix.
    return [];
  } else {
    // High-tech: Modular workstation clusters facing front smartboard
    const numPods = classSize <= 25 ? 4 : 6;
    const studentsPerPod = Math.ceil(classSize / numPods);

    const podCenters: [number, number][] = [
      [-1.2, -0.9],
      [1.2, -0.9],
      [-1.2, 0.4],
      [1.2, 0.4],
      [-1.2, 1.6],
      [1.2, 1.6],
    ];

    let currentStudent = 0;
    for (let p = 0; p < numPods && currentStudent < classSize; p++) {
      const center = podCenters[p];
      const podSize = Math.min(studentsPerPod, classSize - currentStudent);

      for (let s = 0; s < podSize; s++) {
        const offset = (s - (podSize - 1) / 2) * 0.42;
        const posX = center[0] + offset;
        const posZ = center[1];

        students.push({
          id: `high-std-${currentStudent}`,
          position: [posX, 0.42, posZ],
          rotationY: Math.PI, // Facing forward towards smartboard (-Z)
          status: "engaged",
          isHandRaised: false,
          shirtColor: PALETTE_SHIRTS[currentStudent % PALETTE_SHIRTS.length],
        });
        currentStudent++;
      }
    }
  }

  return students;
};
