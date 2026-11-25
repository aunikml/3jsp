import { getProject, types } from "@theatre/core";

// Initialize project and sheet
export const presentationProject = getProject("InteractivePresentation");
export const devSceneSheet = presentationProject.sheet("DevelopmentScene");

// Define editable development object properties with Theatre.js types
export const cubeTheatreObject = devSceneSheet.object("EditableMeshProps", {
  position: types.compound({
    x: types.number(0, { range: [-10, 10] }),
    y: types.number(0.5, { range: [-10, 10] }),
    z: types.number(0, { range: [-10, 10] }),
  }),
  rotation: types.compound({
    x: types.number(0, { range: [-Math.PI, Math.PI] }),
    y: types.number(0, { range: [-Math.PI, Math.PI] }),
    z: types.number(0, { range: [-Math.PI, Math.PI] }),
  }),
  scale: types.number(1.2, { range: [0.1, 5] }),
  accentColor: types.rgba({ r: 0.22, g: 0.74, b: 0.97, a: 1 }),
  wireframe: types.boolean(false),
});

// Theatre.js Studio is disabled to prevent debug overlays appearing over presentations.
