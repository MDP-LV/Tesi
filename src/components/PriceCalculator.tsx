import { useMemo } from 'react';
import { useGannStore } from '../store/useGannStore';
import { projectPriceLevels } from '../utils/calculators';

export function PriceCalculator() {
  const { settings } = useGannStore();
  const rows = useMemo(() => projectPriceLevels({
    pivotPrice: settings.pivotPrice,
    scaleFactor: settings.scaleFactor,
    angles: settings.selectedAngles,
    cycles: settings.cycles,
    decimals: settings.decimals
  }), [settings]);

  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">Price Targets</h3>
      <div className="max-h-64 overflow-auto rounded border border-slate-700">
        <table className="w-full text-xs">
          <thead className="bg-slate-800">
            <tr>
              <th>Angle</th><th>Cycle</th><th>Up</th><th>Down</th><th>ΔUp</th><th>ΔDown</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={`${row.angle}-${row.cycle}`} className="border-t border-slate-800 text-center">
                <td>{row.angle}°</td><td>{row.cycle}</td><td>{row.targetUp}</td><td>{row.targetDown}</td><td>{row.distUp}</td><td>{row.distDown}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
