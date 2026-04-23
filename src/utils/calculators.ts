import type {
  PriceProjectionInput,
  PriceProjectionRow,
  TimeModel,
  TimeProjectionInput,
  TimeProjectionRow
} from '../types/gann';

export function projectPriceLevels(input: PriceProjectionInput): PriceProjectionRow[] {
  const root = Math.sqrt(input.pivotPrice * input.scaleFactor);
  const rows: PriceProjectionRow[] = [];

  input.angles.forEach((angle) => {
    const deltaAngle = angle / 180;
    for (let cycle = 0; cycle <= input.cycles; cycle += 1) {
      const up = ((root + deltaAngle + 2 * cycle) ** 2) / input.scaleFactor;
      const down = ((root - deltaAngle - 2 * cycle) ** 2) / input.scaleFactor;
      rows.push({
        angle,
        cycle,
        targetUp: round(up, input.decimals),
        targetDown: round(Math.max(0, down), input.decimals),
        distUp: round(up - input.pivotPrice, input.decimals),
        distDown: round(input.pivotPrice - down, input.decimals)
      });
    }
  });

  return rows;
}

function daysForModel(angle: number, cycle: number, model: TimeModel, customCycleLength: number): number {
  const base = angle + cycle * 360;
  switch (model) {
    case 'deg1_day1':
      return base;
    case 'norm360':
      return base;
    case 'norm365':
      return (base / 360) * 365;
    case 'norm366':
      return (base / 360) * 366;
    case 'custom':
      return (base / 360) * customCycleLength;
    default:
      return base;
  }
}

export function projectDates(input: TimeProjectionInput): TimeProjectionRow[] {
  const pivot = new Date(`${input.pivotDate}T00:00:00Z`);
  const rows: TimeProjectionRow[] = [];

  input.angles.forEach((angle) => {
    for (let cycle = 0; cycle <= input.cycles; cycle += 1) {
      const dayOffset = Math.round(daysForModel(angle, cycle, input.model, input.customCycleLength));
      const fwd = addDaysUtc(pivot, dayOffset);
      const bwd = addDaysUtc(pivot, -dayOffset);
      rows.push({
        angle,
        cycle,
        dayOffset,
        forwardDate: formatDate(fwd),
        backwardDate: formatDate(bwd)
      });
    }
  });
  return rows;
}

function addDaysUtc(date: Date, days: number): Date {
  const copy = new Date(date);
  copy.setUTCDate(copy.getUTCDate() + days);
  return copy;
}

function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function round(value: number, decimals: number): number {
  const factor = 10 ** decimals;
  return Math.round(value * factor) / factor;
}
