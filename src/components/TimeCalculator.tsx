import { useMemo } from 'react';
import { useGannStore } from '../store/useGannStore';
import { projectDates } from '../utils/calculators';

export function TimeCalculator() {
  const { settings } = useGannStore();

  const rows = useMemo(() => projectDates({
    pivotDate: settings.pivotDate,
    angles: settings.selectedAngles,
    cycles: settings.cycles,
    model: settings.timeModel,
    customCycleLength: settings.customCycleLength
  }), [settings]);

  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">Time Projections</h3>
      <div className="max-h-64 overflow-auto rounded border border-slate-700">
        <table className="w-full text-xs">
          <thead className="bg-slate-800">
            <tr>
              <th>Angle</th><th>Cycle</th><th>Days</th><th>Forward</th><th>Backward</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.angle}-${row.cycle}`} className="border-t border-slate-800 text-center">
                <td>{row.angle}°</td><td>{row.cycle}</td><td>{row.dayOffset}</td><td>{row.forwardDate}</td><td>{row.backwardDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
