import { describe, expect, it } from 'vitest';
import { projectDates, projectPriceLevels } from './calculators';

describe('projectPriceLevels', () => {
  it('computes deterministic targets from classic formula', () => {
    const rows = projectPriceLevels({
      pivotPrice: 100,
      scaleFactor: 1,
      angles: [90],
      cycles: 1,
      decimals: 2
    });

    expect(rows[0].targetUp).toBe(110.25);
    expect(rows[0].targetDown).toBe(90.25);
    expect(rows[1].targetUp).toBe(156.25);
  });
});

describe('projectDates', () => {
  it('maps angles into dates with 1deg=1day', () => {
    const rows = projectDates({
      pivotDate: '2026-01-01',
      angles: [45],
      cycles: 0,
      model: 'deg1_day1',
      customCycleLength: 365
    });

    expect(rows[0].forwardDate).toBe('2026-02-15');
    expect(rows[0].backwardDate).toBe('2025-11-17');
  });
});
