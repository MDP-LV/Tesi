import { useMemo } from 'react';
import { useGannStore } from '../store/useGannStore';
import { projectDates, projectPriceLevels } from '../utils/calculators';

export function ExportPanel() {
  const { settings } = useGannStore();

  const csv = useMemo(() => {
    const prices = projectPriceLevels({
      pivotPrice: settings.pivotPrice,
      scaleFactor: settings.scaleFactor,
      angles: settings.selectedAngles,
      cycles: settings.cycles,
      decimals: settings.decimals
    });
    const dates = projectDates({
      pivotDate: settings.pivotDate,
      angles: settings.selectedAngles,
      cycles: settings.cycles,
      model: settings.timeModel,
      customCycleLength: settings.customCycleLength
    });

    const header = 'angle,cycle,targetUp,targetDown,forwardDate,backwardDate';
    const rows = prices.map((p) => {
      const t = dates.find((d) => d.angle === p.angle && d.cycle === p.cycle);
      return [p.angle, p.cycle, p.targetUp, p.targetDown, t?.forwardDate ?? '', t?.backwardDate ?? ''].join(',');
    });
    return [header, ...rows].join('\n');
  }, [settings]);

  const exportCsv = () => {
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'gann-results.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const exportPng = async () => {
    const svg = document.getElementById('main-gann-svg') as SVGSVGElement | null;
    if (!svg) return;
    const serializer = new XMLSerializer();
    const source = serializer.serializeToString(svg);
    const image = new Image();
    image.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source)}`;
    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 1200;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'gann-view.png';
    link.click();
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-semibold">Export</h3>
      <div className="flex gap-2">
        <button className="rounded bg-indigo-700 px-2 py-1 text-xs" onClick={exportPng}>Export PNG</button>
        <button className="rounded bg-indigo-700 px-2 py-1 text-xs" onClick={exportCsv}>Export CSV</button>
      </div>
    </div>
  );
}
