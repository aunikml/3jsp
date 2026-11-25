import { devSceneSheet } from "./theatreProject";

export interface SequenceOptions {
  range?: [number, number];
  iterationCount?: number;
  rate?: number;
  direction?: "normal" | "reverse" | "alternate" | "alternateReverse";
}

/**
 * Programmatically play an animation sequence on the Theatre.js sheet.
 */
export async function playSceneSequence(options: SequenceOptions = {}) {
  const { range = [0, 3], iterationCount = 1, rate = 1, direction = "normal" } = options;
  return devSceneSheet.sequence.play({
    range,
    iterationCount,
    rate,
    direction,
  });
}

/**
 * Programmatically pause the active animation sequence.
 */
export function pauseSceneSequence() {
  devSceneSheet.sequence.pause();
}

/**
 * Scrub the animation sequence timeline to a specific position (in seconds).
 */
export function setSequencePosition(seconds: number) {
  devSceneSheet.sequence.position = seconds;
}

/**
 * Retrieve current timeline position.
 */
export function getSequencePosition(): number {
  return devSceneSheet.sequence.position;
}
