const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export interface DateRingTick {
  label: string;
  dayIndex: number;
  angle: number;
  type: 'month' | 'day';
}

export function generateDateRingTicks(mode: 360 | 365 | 366): DateRingTick[] {
  const ticks: DateRingTick[] = [];

  if (mode === 360) {
    for (let d = 0; d < 360; d += 1) {
      ticks.push({ label: `${d + 1}`, dayIndex: d, angle: (d / 360) * 360, type: d % 30 === 0 ? 'month' : 'day' });
    }
    return ticks;
  }

  const monthLengths = mode === 366
    ? [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    : [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const totalDays = monthLengths.reduce((acc, item) => acc + item, 0);
  let dayCounter = 0;

  monthLengths.forEach((length, monthIndex) => {
    ticks.push({
      label: monthNames[monthIndex],
      dayIndex: dayCounter,
      angle: (dayCounter / totalDays) * 360,
      type: 'month'
    });
    for (let day = 1; day <= length; day += 1) {
      if (day % 7 === 0) {
        ticks.push({
          label: String(day),
          dayIndex: dayCounter,
          angle: (dayCounter / totalDays) * 360,
          type: 'day'
        });
      }
      dayCounter += 1;
    }
  });

  return ticks;
}
