import type { DisplayFrame, SetPixels, CreateCanvas } from "./helpers";
import type { A, M, Z } from "./constants";

type Frame0 = CreateCanvas<8, 10, A>;

type Frame1 = SetPixels<[
  [1, 2, Z], [1, 3, Z], [1, 5, Z], [1, 6, Z],
  [2, 1, Z], [2, 4, Z], [2, 7, Z],
  [3, 1, Z], [3, 7, Z],
  [4, 2, Z], [4, 6, Z],
  [5, 3, Z], [5, 5, Z],
  [6, 4, Z],

  [2, 2, M], [2, 3, M], [2, 5, M], [2, 6, M],
  [3, 2, M], [3, 3, M], [3, 4, M], [3, 5, M], [3, 6, M],
  [4, 3, M], [4, 4, M], [4, 5, M],
  [5, 4, M],
], Frame0>;

type DisplayFrame0 = DisplayFrame<Frame0, "Frame 0">;
type DisplayFrame1 = DisplayFrame<Frame1, "Frame 1">;

/////////////
// For another example: here's a hardcoded frame

type HardcodedFrame = {
  "00": `${A}${A}${A}${A}${A}${A}${A}${A}${A}`
  "01": `${A}${A}${Z}${Z}${A}${Z}${Z}${A}${A}`,
  "02": `${A}${Z}${M}${M}${Z}${M}${M}${Z}${A}`,
  "03": `${A}${Z}${M}${M}${M}${M}${M}${Z}${A}`,
  "04": `${A}${A}${Z}${M}${M}${M}${Z}${A}${A}`,
  "05": `${A}${A}${A}${Z}${M}${Z}${A}${A}${A}`,
  "06": `${A}${A}${A}${A}${Z}${A}${A}${A}${A}`,
  "07": `${A}${A}${A}${A}${A}${A}${A}${A}${A}`
};

type HardcodedDisplay = DisplayFrame<HardcodedFrame, "Hardcoded Frame">;