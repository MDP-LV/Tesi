import { create } from 'zustand';
import type { AppSettings, GridCell } from '../types/gann';
import { generateSquareOfNine } from '../utils/squareOfNine';

interface GannState {
  settings: AppSettings;
  selectedCell: GridCell | null;
  zoom: number;
  pan: { x: number; y: number };
  setSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]) => void;
  setSelectedCell: (cell: GridCell | null) => void;
  setZoom: (zoom: number) => void;
  setPan: (pan: { x: number; y: number }) => void;
  resetView: () => void;
  loadPreset: (preset: Partial<AppSettings>) => void;
  savePreset: () => void;
  square: GridCell[];
  regenerateSquare: () => void;
}

const defaultAngles = [45, 90, 120, 135, 144, 180, 225, 240, 270, 315, 360];

const initialSettings: AppSettings = {
  centerNumber: 1,
  gridSize: 21,
  spiralDirection: 'clockwise',
  initialOrientation: 'right',
  showRadials: true,
  wheelLabelsEvery: 15,
  selectedAngles: defaultAngles,
  pivotPrice: 100,
  decimals: 2,
  scaleFactor: 1,
  cycles: 2,
  pivotDate: '2026-01-01',
  timeModel: 'norm365',
  customCycleLength: 365,
  dateMode: 365,
  leapYear: false,
  anchorDate: '2026-01-01',
  theme: 'dark'
};

const initialSquare = generateSquareOfNine(
  initialSettings.gridSize,
  initialSettings.centerNumber,
  initialSettings.spiralDirection,
  initialSettings.initialOrientation
);

export const useGannStore = create<GannState>((set, get) => ({
  settings: initialSettings,
  selectedCell: null,
  zoom: 1,
  pan: { x: 0, y: 0 },
  square: initialSquare,
  setSetting: (key, value) => {
    set((state) => ({ settings: { ...state.settings, [key]: value } }));
  },
  setSelectedCell: (selectedCell) => set({ selectedCell }),
  setZoom: (zoom) => set({ zoom }),
  setPan: (pan) => set({ pan }),
  resetView: () => set({ zoom: 1, pan: { x: 0, y: 0 }, selectedCell: null }),
  loadPreset: (preset) => {
    set((state) => ({ settings: { ...state.settings, ...preset } }));
    get().regenerateSquare();
  },
  savePreset: () => {
    localStorage.setItem('gann-preset', JSON.stringify(get().settings));
  },
  regenerateSquare: () => {
    const s = get().settings;
    const square = generateSquareOfNine(s.gridSize, s.centerNumber, s.spiralDirection, s.initialOrientation);
    set({ square });
  }
}));
