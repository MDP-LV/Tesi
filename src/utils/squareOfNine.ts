import type { GridCell, InitialOrientation, SpiralDirection } from '../types/gann';

const orientationVectors: Record<InitialOrientation, [number, number]> = {
  right: [1, 0],
  up: [0, -1],
  left: [-1, 0],
  down: [0, 1]
};

function rotate([dx, dy]: [number, number], direction: SpiralDirection): [number, number] {
  return direction === 'clockwise' ? [dy, -dx] : [-dy, dx];
}

export function computeRing(x: number, y: number): number {
  return Math.max(Math.abs(x), Math.abs(y));
}

export function normalizeAngle(angle: number): number {
  const normalized = angle % 360;
  return normalized < 0 ? normalized + 360 : normalized;
}

export function computeCellAngle(x: number, y: number): number {
  const rad = Math.atan2(-y, x);
  return normalizeAngle((rad * 180) / Math.PI);
}

export function generateSquareOfNine(
  gridSize: number,
  startNumber: number,
  spiralDirection: SpiralDirection,
  initialOrientation: InitialOrientation
): GridCell[] {
  const total = gridSize * gridSize;
  const cells: GridCell[] = [];

  let value = startNumber;
  let x = 0;
  let y = 0;

  let direction: [number, number] = orientationVectors[initialOrientation];
  let stepLength = 1;

  cells.push({ value, x, y, ring: 0, angleDeg: 0 });

  while (cells.length < total) {
    for (let segment = 0; segment < 2; segment += 1) {
      for (let step = 0; step < stepLength; step += 1) {
        if (cells.length >= total) break;
        x += direction[0];
        y += direction[1];
        value += 1;
        cells.push({ value, x, y, ring: computeRing(x, y), angleDeg: computeCellAngle(x, y) });
      }
      direction = rotate(direction, spiralDirection);
    }
    stepLength += 1;
  }

  return cells;
}

export function toGridMap(cells: GridCell[]): Map<string, GridCell> {
  return new Map(cells.map((cell) => [`${cell.x},${cell.y}`, cell]));
}
