export type SpiralDirection = 'clockwise' | 'counterclockwise';
export type InitialOrientation = 'right' | 'up' | 'left' | 'down';
export type TimeModel = 'deg1_day1' | 'norm360' | 'norm365' | 'norm366' | 'custom';

export interface GridCell {
  value: number;
  x: number;
  y: number;
  ring: number;
  angleDeg: number;
}

export interface PriceProjectionInput {
  pivotPrice: number;
  scaleFactor: number;
  angles: number[];
  cycles: number;
  decimals: number;
}

export interface PriceProjectionRow {
  angle: number;
  cycle: number;
  targetUp: number;
  targetDown: number;
  distUp: number;
  distDown: number;
}

export interface TimeProjectionInput {
  pivotDate: string;
  angles: number[];
  cycles: number;
  model: TimeModel;
  customCycleLength: number;
}

export interface TimeProjectionRow {
  angle: number;
  cycle: number;
  dayOffset: number;
  forwardDate: string;
  backwardDate: string;
}

export interface AppSettings {
  centerNumber: number;
  gridSize: number;
  spiralDirection: SpiralDirection;
  initialOrientation: InitialOrientation;
  showRadials: boolean;
  wheelLabelsEvery: 15 | 30;
  selectedAngles: number[];
  pivotPrice: number;
  decimals: number;
  scaleFactor: number;
  cycles: number;
  pivotDate: string;
  timeModel: TimeModel;
  customCycleLength: number;
  dateMode: 360 | 365 | 366;
  leapYear: boolean;
  anchorDate: string;
  theme: 'dark' | 'light';
}
