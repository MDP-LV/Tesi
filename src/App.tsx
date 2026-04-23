import { useEffect } from 'react';
import { SettingsPanel } from './components/SettingsPanel';
import { GannVisualization } from './components/GannVisualization';
import { PriceCalculator } from './components/PriceCalculator';
import { TimeCalculator } from './components/TimeCalculator';
import { ConfluencePanel } from './components/ConfluencePanel';
import { ExportPanel } from './components/ExportPanel';
import { SquareOfNineGrid } from './components/SquareOfNineGrid';
import { useGannStore } from './store/useGannStore';

export function App() {
  const { settings } = useGannStore();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', settings.theme === 'dark');
  }, [settings.theme]);

  return (
    <div className="grid min-h-screen grid-cols-[300px_1fr_360px] gap-2 bg-slate-950 text-slate-100">
      <div className="border-r border-slate-800">
        <SettingsPanel />
      </div>

      <main className="space-y-2 p-2">
        <h1 className="text-xl font-semibold">Gann Square of 9 Calculator</h1>
        <p className="text-xs text-slate-400">Active convention: {settings.timeModel}, spiral {settings.spiralDirection}, 0° orientation configurable, scale factor {settings.scaleFactor}.</p>
        <GannVisualization />
        <SquareOfNineGrid />
      </main>

      <aside className="space-y-3 border-l border-slate-800 p-3">
        <PriceCalculator />
        <TimeCalculator />
        <ConfluencePanel />
        <ExportPanel />
      </aside>
    </div>
  );
}
