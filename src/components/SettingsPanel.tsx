import { useMemo } from 'react';
import { useGannStore } from '../store/useGannStore';

const presets = {
  Classic: [45, 90, 180, 270, 360],
  Harmonic: [30, 60, 120, 144, 240, 288],
  Full: [45, 90, 120, 135, 144, 180, 225, 240, 270, 315, 360]
} as const;

export function SettingsPanel() {
  const { settings, setSetting, regenerateSquare, loadPreset, savePreset } = useGannStore();

  const angleInput = useMemo(() => settings.selectedAngles.join(','), [settings.selectedAngles]);

  return (
    <aside className="space-y-3 p-3 text-sm">
      <h2 className="text-lg font-semibold">Settings</h2>

      <label className="block">
        Pivot Price
        <input className="mt-1 w-full rounded border border-slate-700 bg-slate-900 p-1" type="number" value={settings.pivotPrice} onChange={(e) => setSetting('pivotPrice', Number(e.target.value))} />
      </label>

      <label className="block">
        Anchor Date
        <input className="mt-1 w-full rounded border border-slate-700 bg-slate-900 p-1" type="date" value={settings.anchorDate} onChange={(e) => setSetting('anchorDate', e.target.value)} />
      </label>

      <label className="block">
        Grid Size
        <select className="mt-1 w-full rounded border border-slate-700 bg-slate-900 p-1" value={settings.gridSize} onChange={(e) => { setSetting('gridSize', Number(e.target.value)); regenerateSquare(); }}>
          {[21, 25, 31].map((n) => <option key={n}>{n}</option>)}
        </select>
      </label>

      <label className="block">
        Spiral Direction
        <select className="mt-1 w-full rounded border border-slate-700 bg-slate-900 p-1" value={settings.spiralDirection} onChange={(e) => { setSetting('spiralDirection', e.target.value as 'clockwise' | 'counterclockwise'); regenerateSquare(); }}>
          <option value="clockwise">Clockwise</option>
          <option value="counterclockwise">Counterclockwise</option>
        </select>
      </label>

      <label className="block">
        Angles (comma separated)
        <input
          className="mt-1 w-full rounded border border-slate-700 bg-slate-900 p-1"
          value={angleInput}
          onChange={(e) => {
            const parsed = e.target.value.split(',').map((v) => Number(v.trim())).filter((v) => Number.isFinite(v));
            setSetting('selectedAngles', parsed);
          }}
        />
      </label>

      <label className="block">
        Time model
        <select className="mt-1 w-full rounded border border-slate-700 bg-slate-900 p-1" value={settings.timeModel} onChange={(e) => setSetting('timeModel', e.target.value as typeof settings.timeModel)}>
          <option value="deg1_day1">1° = 1 day</option>
          <option value="norm360">360 normalization</option>
          <option value="norm365">365 normalization</option>
          <option value="norm366">366 normalization</option>
          <option value="custom">Custom cycle</option>
        </select>
      </label>

      <div className="grid grid-cols-2 gap-2">
        {Object.entries(presets).map(([name, angles]) => (
          <button
            key={name}
            className="rounded bg-indigo-700 px-2 py-1 hover:bg-indigo-600"
            onClick={() => setSetting('selectedAngles', [...angles])}
          >
            {name}
          </button>
        ))}
      </div>

      <div className="flex gap-2">
        <button className="rounded bg-emerald-700 px-2 py-1" onClick={savePreset}>Save preset</button>
        <button
          className="rounded bg-slate-700 px-2 py-1"
          onClick={() => {
            const data = localStorage.getItem('gann-preset');
            if (!data) return;
            loadPreset(JSON.parse(data));
          }}
        >
          Load preset
        </button>
      </div>
      <p className="rounded border border-amber-600/50 bg-amber-900/30 p-2 text-xs">
        Disclaimer: this tool is an analytical/visual aid, not financial advice.
      </p>
    </aside>
  );
}
