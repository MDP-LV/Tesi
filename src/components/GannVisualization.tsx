import { AngleWheel } from './AngleWheel';
import { DateRing } from './DateRing';
import { useGannStore } from '../store/useGannStore';

export function GannVisualization() {
  const { square, settings, selectedCell, setSelectedCell } = useGannStore();
  const size = 1200;
  const center = size / 2;
  const cellSize = Math.floor((size * 0.55) / settings.gridSize);

  return (
    <div className="rounded border border-slate-700 bg-slate-900 p-2">
      <svg id="main-gann-svg" viewBox={`0 0 ${size} ${size}`} className="h-[680px] w-full">
        <AngleWheel size={size} />
        <DateRing size={size} />

        <g>
          {square.map((cell) => {
            const x = center + cell.x * cellSize - cellSize / 2;
            const y = center + cell.y * cellSize - cellSize / 2;
            const active = selectedCell?.value === cell.value;
            return (
              <g key={cell.value}>
                <rect
                  x={x}
                  y={y}
                  width={cellSize}
                  height={cellSize}
                  fill={active ? '#22c55e' : '#0f172a'}
                  stroke="#334155"
                  strokeWidth={0.8}
                  onClick={() => setSelectedCell(cell)}
                >
                  <title>{`Value ${cell.value} | ring ${cell.ring} | ${cell.angleDeg.toFixed(2)}°`}</title>
                </rect>
                {settings.gridSize <= 25 && (
                  <text x={x + cellSize / 2} y={y + cellSize / 2 + 3} textAnchor="middle" fontSize={8} fill="#e2e8f0">{cell.value}</text>
                )}
              </g>
            );
          })}
        </g>

        {settings.showRadials && settings.selectedAngles.map((angle) => {
          const rad = (-angle * Math.PI) / 180;
          return (
            <line
              key={angle}
              x1={center}
              y1={center}
              x2={center + Math.cos(rad) * size * 0.56}
              y2={center + Math.sin(rad) * size * 0.56}
              stroke="#f43f5e"
              strokeDasharray="6 4"
            />
          );
        })}
      </svg>
    </div>
  );
}
