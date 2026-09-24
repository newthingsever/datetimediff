import { BusinessDaysResult } from './types';
import { parseDateString, toIsoDate } from './dateEngine';

// Standard international holidays (Fixed dates)
export const DEFAULT_HOLIDAYS: { month: number; day: number; name: string }[] = [
  { month: 1, day: 1, name: "New Year's Day" },
  { month: 7, day: 4, name: "Independence Day" },
  { month: 11, day: 11, name: "Veterans Day" },
  { month: 12, day: 25, name: "Christmas Day" },
];

/**
 * Calculates business days between two dates with custom weekend configs and holidays.
 */
export function calculateBusinessDays(
  startDateStr: string,
  endDateStr: string,
  includeEndDate: boolean = false,
  weekendType: 'sat-sun' | 'fri-sat' | 'sun-only' = 'sat-sun',
  excludeHolidays: boolean = true
): BusinessDaysResult {
  const start = parseDateString(startDateStr);
  const end = parseDateString(endDateStr);

  const isReversed = start.utcMs > end.utcMs;
  const d1 = isReversed ? end : start;
  const d2 = isReversed ? start : end;

  const msPerDay = 86400000;
  const endLimitUtc = includeEndDate ? d2.utcMs : d2.utcMs - msPerDay;

  let businessDays = 0;
  let weekendDays = 0;
  let holidayDays = 0;
  let totalCalendarDays = 0;
  const holidaysFound: { date: string; name: string }[] = [];

  const isWeekend = (dayOfWeek: number): boolean => {
    // 0 = Sun, 1 = Mon, ..., 6 = Sat
    if (weekendType === 'sat-sun') return dayOfWeek === 0 || dayOfWeek === 6;
    if (weekendType === 'fri-sat') return dayOfWeek === 5 || dayOfWeek === 6;
    if (weekendType === 'sun-only') return dayOfWeek === 0;
    return false;
  };

  for (let currentMs = d1.utcMs; currentMs <= endLimitUtc; currentMs += msPerDay) {
    totalCalendarDays++;
    const dateObj = new Date(currentMs);
    const dayOfWeek = dateObj.getUTCDay();
    const curYear = dateObj.getUTCFullYear();
    const curMonth = dateObj.getUTCMonth() + 1;
    const curDay = dateObj.getUTCDate();
    const curIso = toIsoDate(curYear, curMonth, curDay);

    if (isWeekend(dayOfWeek)) {
      weekendDays++;
      continue;
    }

    // Check holiday on weekdays
    let matchedHoliday = false;
    if (excludeHolidays) {
      const found = DEFAULT_HOLIDAYS.find(h => h.month === curMonth && h.day === curDay);
      if (found) {
        matchedHoliday = true;
        holidayDays++;
        holidaysFound.push({ date: curIso, name: found.name });
      }
    }

    if (!matchedHoliday) {
      businessDays++;
    }
  }

  return {
    startDate: startDateStr,
    endDate: endDateStr,
    isInclusive: includeEndDate,
    businessDays,
    weekendDays,
    holidayDays,
    totalCalendarDays,
    weekendType,
    holidaysList: holidaysFound,
  };
}
