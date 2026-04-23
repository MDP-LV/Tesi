import { useMemo } from 'react';
import { useGannStore } from '../store/useGannStore';
import { generateDateRingTicks } from '../utils/dateRing';

interface Props {
  size: number;
}

export function DateRing({ size }: Props) {
  const { settings } = useGannStore();
  const center = size / 2;
  const radius = size * 0.53;

  const ticks = useMemo(() => generateDateRingTicks(settings.dateMode), [settings.dateMode]);

  return (
    <g>
      <circle cx={center} cy={center} r={radius} fill="none" stroke="#94a3b8" strokeWidth={1.1} />
      {ticks.map((tick) => {
        const rad = (-tick.angle * Math.PI) / 180;
        const x = center + Math.cos(rad) * (radius + (tick.type === 'month' ? 12 : 7));
        const y = center + Math.sin(rad) * (radius + (tick.type === 'month' ? 12 : 7));
        if (tick.type === 'day') {
          return <circle key={`${tick.type}-${tick.dayIndex}`} cx={x} cy={y} r={0.9} fill="#64748b" />;
        }
        return <text key={`${tick.type}-${tick.dayIndex}`} x={x} y={y} fill="#f8fafc" fontSize="9" textAnchor="middle">{tick.label}</text>;
      })}
    </g>
  );
}
