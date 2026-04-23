import { useGannStore } from '../store/useGannStore';

interface Props {
  size: number;
}

export function AngleWheel({ size }: Props) {
  const { settings } = useGannStore();
  const center = size / 2;
  const radius = size * 0.47;

  return (
    <g>
      <circle cx={center} cy={center} r={radius} fill="none" stroke="#64748b" strokeWidth={1.2} />
      {Array.from({ length: 360 }).map((_, angle) => {
        const major = angle % settings.wheelLabelsEvery === 0;
        const outer = radius;
        const inner = major ? radius - 14 : radius - 7;
        const rad = (-angle * Math.PI) / 180;
        const x1 = center + Math.cos(rad) * inner;
        const y1 = center + Math.sin(rad) * inner;
        const x2 = center + Math.cos(rad) * outer;
        const y2 = center + Math.sin(rad) * outer;
        return <line key={angle} x1={x1} y1={y1} x2={x2} y2={y2} stroke={major ? '#cbd5e1' : '#475569'} strokeWidth={major ? 1.2 : 0.6} />;
      })}
      {Array.from({ length: 360 / settings.wheelLabelsEvery }).map((_, idx) => {
        const angle = idx * settings.wheelLabelsEvery;
        const rad = (-angle * Math.PI) / 180;
        const x = center + Math.cos(rad) * (radius + 16);
        const y = center + Math.sin(rad) * (radius + 16);
        return <text key={angle} x={x} y={y} fill="#e2e8f0" fontSize="10" textAnchor="middle">{angle}°</text>;
      })}
    </g>
  );
}
