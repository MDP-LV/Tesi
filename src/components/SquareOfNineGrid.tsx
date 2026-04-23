import { useMemo } from 'react';
import { useGannStore } from '../store/useGannStore';

const highlightAngles = new Set([45, 90, 120, 135, 144, 180, 225, 240, 270, 315, 360]);

export function SquareOfNineGrid() {
  const { square, settings, selectedCell, setSelectedCell, zoom, pan, setZoom, setPan, resetView } = useGannStore();
  const cellSize = 24;
  const half = Math.floor(settings.gridSize / 2);
  const extent = settings.gridSize * cellSize;
  const center = extent / 2;

  const byCoord = useMemo(() => new Map(square.map((c) => [`${c.x},${c.y}`, c])), [square]);

  return (
    <section className="rounded border border-slate-800 bg-slate-950 p-2">
      <div className="mb-2 flex items-center justify-between text-xs">
        <div className="flex gap-2">
          <button className="rounded bg-slate-800 px-2 py-1" onClick={() => setZoom(Math.min(2.5, zoom + 0.1))}>Zoom +</button>
          <button className="rounded bg-slate-800 px-2 py-1" onClick={() => setZoom(Math.max(0.5, zoom - 0.1))}>Zoom -</button>
          <button className="rounded bg-slate-800 px-2 py-1" onClick={() => setPan({ x: pan.x + 20, y: pan.y })}>Pan →</button>
          <button className="rounded bg-slate-800 px-2 py-1" onClick={resetView}>Reset</button>
        </div>
        {selectedCell && <span>Selected #{selectedCell.value} | ring {selectedCell.ring} | {selectedCell.angleDeg.toFixed(1)}°</span>}
      </div>

      <svg viewBox={`0 0 ${extent} ${extent}`} className="h-[680px] w-full rounded bg-slate-900">
        <g transform={`translate(${pan.x + (1 - zoom) * center} ${pan.y + (1 - zoom) * center}) scale(${zoom})`}>
          {Array.from({ length: settings.gridSize }).map((_, idx) => {
            const offset = (idx - half) * cellSize + center;
            const isAxis = idx === half;
            return (
              <g key={`guides-${idx}`}>
                <line x1={offset} y1={0} x2={offset} y2={extent} stroke={isAxis ? '#3b82f6' : '#1f2937'} strokeWidth={isAxis ? 2 : 0.8} />
                <line x1={0} y1={offset} x2={extent} y2={offset} stroke={isAxis ? '#3b82f6' : '#1f2937'} strokeWidth={isAxis ? 2 : 0.8} />
              </g>
            );
          })}

          {square.map((cell) => {
            const x = center + cell.x * cellSize - cellSize / 2;
            const y = center + cell.y * cellSize - cellSize / 2;
            const isSelected = selectedCell?.value === cell.value;
            const rounded = Math.round(cell.angleDeg);
            const isHighlighted = highlightAngles.has(rounded);

            return (
              <g key={cell.value}>
                <rect
                  x={x}
                  y={y}
                  width={cellSize}
                  height={cellSize}
                  fill={isSelected ? '#22c55e' : isHighlighted ? '#334155' : '#0f172a'}
                  stroke="#334155"
                  onClick={() => setSelectedCell(cell)}
                >
                  <title>
                    {`#${cell.value} | (${cell.x}, ${cell.y}) | ring ${cell.ring} | ${cell.angleDeg.toFixed(2)}°`}
                  </title>
                </rect>
                {settings.gridSize <= 25 && (
                  <text x={x + cellSize / 2} y={y + cellSize / 2 + 4} textAnchor="middle" fontSize="9" fill="#e2e8f0">{cell.value}</text>
                )}
              </g>
            );
          })}

          {settings.showRadials && settings.selectedAngles.map((angle) => {
            const rad = (-angle * Math.PI) / 180;
            const radius = extent;
            return (
              <line
                key={`rad-${angle}`}
                x1={center}
                y1={center}
                x2={center + Math.cos(rad) * radius}
                y2={center + Math.sin(rad) * radius}
                stroke="#f43f5e"
                strokeWidth={1.1}
                strokeDasharray="4 4"
              />
            );
          })}

          {byCoord.size === 0 && null}
        </g>
      </svg>
    </section>
  );
}
