import { useMemo } from 'react';
import { useGannStore } from '../store/useGannStore';
import { projectDates, projectPriceLevels } from '../utils/calculators';

export function ConfluencePanel() {
  const { settings } = useGannStore();
  const rows = useMemo(() => {
    const price = projectPriceLevels({
      pivotPrice: settings.pivotPrice,
      scaleFactor: settings.scaleFactor,
      angles: settings.selectedAngles,
      cycles: settings.cycles,
      decimals: settings.decimals
    });
    const time = projectDates({
      pivotDate: settings.pivotDate,
      angles: settings.selectedAngles,
      cycles: settings.cycles,
      model: settings.timeModel,
      customCycleLength: settings.customCycleLength
    });

    return price.map((p) => {
      const t = time.find((x) => x.angle === p.angle && x.cycle === p.cycle);
      return { ...p, forwardDate: t?.forwardDate ?? '-', backwardDate: t?.backwardDate ?? '-' };
    });
  }, [settings]);

  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold">Confluence Zones</h3>
      <div className="max-h-52 overflow-auto rounded border border-slate-700">
        <table className="w-full text-xs">
          <thead className="bg-slate-800">
            <tr><th>Angle</th><th>Cycle</th><th>Price Up</th><th>Date Fwd</th></tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={`${r.angle}-${r.cycle}`} className="border-t border-slate-800 text-center">
                <td>{r.angle}°</td><td>{r.cycle}</td><td>{r.targetUp}</td><td>{r.forwardDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
