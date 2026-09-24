import { DateDifferenceResult, AgeCalculationResult, AddSubtractResult, TimeDifferenceResult } from './types';

export const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export const WEEKDAY_NAMES = [
  'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
];

/**
 * Checks if a given year is a leap year (Gregorian calendar).
 */
export function isLeapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
}

/**
 * Returns the exact number of days in a specific month of a year.
 * month is 1-indexed (1 = Jan, 12 = Dec).
 */
export function getDaysInMonth(year: number, month: number): number {
  const daysMap = [31, isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  return daysMap[month - 1];
}

/**
 * Parses a YYYY-MM-DD string into UTC year, month (1-12), and day.
 */
export function parseDateString(dateStr: string): { year: number; month: number; day: number; utcMs: number } {
  if (!dateStr || !/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
    const now = new Date();
    const y = now.getUTCFullYear();
    const m = now.getUTCMonth() + 1;
    const d = now.getUTCDate();
    return { year: y, month: m, day: d, utcMs: Date.UTC(y, m - 1, d) };
  }

  const parts = dateStr.split('-');
  const year = parseInt(parts[0], 10);
  const month = parseInt(parts[1], 10);
  const day = parseInt(parts[2], 10);
  const utcMs = Date.UTC(year, month - 1, day);

  return { year, month, day, utcMs };
}

/**
 * Formats a Date or UTC ms to YYYY-MM-DD string.
 */
export function toIsoDate(year: number, month: number, day: number): string {
  const y = String(year).padStart(4, '0');
  const m = String(month).padStart(2, '0');
  const d = String(day).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * Formats a YYYY-MM-DD into "September 21, 2026"
 */
export function formatReadableDate(dateStr: string): string {
  const { year, month, day } = parseDateString(dateStr);
  return `${MONTH_NAMES[month - 1]} ${day}, ${year}`;
}

/**
 * Returns weekday name for a date string
 */
export function getWeekdayName(dateStr: string): string {
  const { utcMs } = parseDateString(dateStr);
  const dayIndex = new Date(utcMs).getUTCDay();
  return WEEKDAY_NAMES[dayIndex];
}

/**
 * Core Date Difference Calculator.
 * Calculates exact elapsed and inclusive differences, breakdown, hours, weekdays, and explanation.
 */
export function calculateDateDifference(
  startDateStr: string,
  endDateStr: string,
  includeEndDate: boolean = false
): DateDifferenceResult {
  const start = parseDateString(startDateStr);
  const end = parseDateString(endDateStr);

  const isReversed = start.utcMs > end.utcMs;
  const d1 = isReversed ? end : start;
  const d2 = isReversed ? start : end;

  const msPerDay = 86400000;
  const elapsedDays = Math.round((d2.utcMs - d1.utcMs) / msPerDay);
  const totalDays = includeEndDate ? elapsedDays + 1 : elapsedDays;

  // Breakdown into Years, Months, Days
  let years = d2.year - d1.year;
  let months = d2.month - d1.month;
  let days = d2.day - d1.day;

  if (includeEndDate) {
    // If inclusive, we effectively measure to d2 + 1 day
    const nextUtc = d2.utcMs + msPerDay;
    const nextDate = new Date(nextUtc);
    const ny = nextDate.getUTCFullYear();
    const nm = nextDate.getUTCMonth() + 1;
    const nd = nextDate.getUTCDate();

    years = ny - d1.year;
    months = nm - d1.month;
    days = nd - d1.day;
  }

  if (days < 0) {
    // Borrow days from previous month
    let prevMonth = (includeEndDate ? d2.month : d2.month) - 1;
    let prevYear = d2.year;
    if (prevMonth < 1) {
      prevMonth = 12;
      prevYear -= 1;
    }
    const daysInPrev = getDaysInMonth(prevYear, prevMonth);
    days += daysInPrev;
    months -= 1;
  }

  if (months < 0) {
    months += 12;
    years -= 1;
  }

  // Weeks & remaining days
  const totalWeeks = Math.floor(totalDays / 7);
  const remainingDaysAfterWeeks = totalDays % 7;
  const totalMonths = years * 12 + months;

  // Hours, minutes, seconds
  const totalHours = totalDays * 24;
  const totalMinutes = totalHours * 60;
  const totalSeconds = totalMinutes * 60;

  // Weekdays vs Weekends count
  let weekdayCount = 0;
  let weekendDayCount = 0;
  const endLimitUtc = includeEndDate ? d2.utcMs : d2.utcMs - msPerDay;

  if (elapsedDays > 0 || (includeEndDate && elapsedDays === 0)) {
    for (let currentMs = d1.utcMs; currentMs <= endLimitUtc; currentMs += msPerDay) {
      const dayOfWeek = new Date(currentMs).getUTCDay();
      if (dayOfWeek === 0 || dayOfWeek === 6) {
        weekendDayCount++;
      } else {
        weekdayCount++;
      }
    }
  }

  // Summary Text
  const readableStart = formatReadableDate(startDateStr);
  const readableEnd = formatReadableDate(endDateStr);
  const summaryText = `From ${readableStart} to ${readableEnd} is ${totalDays.toLocaleString()} day${totalDays === 1 ? '' : 's'}${includeEndDate ? ' (inclusive)' : ''}.`;

  // Explain My Result Generator
  let leapYearNote = '';
  const leapYearsEncountered: number[] = [];
  for (let y = d1.year; y <= d2.year; y++) {
    if (isLeapYear(y)) {
      // Check if Feb 29 was crossed
      const leapDayUtc = Date.UTC(y, 1, 29);
      if (leapDayUtc >= d1.utcMs && leapDayUtc <= (includeEndDate ? d2.utcMs : d2.utcMs - msPerDay)) {
        leapYearsEncountered.push(y);
      }
    }
  }
  if (leapYearsEncountered.length > 0) {
    leapYearNote = ` Includes leap day (Feb 29) for ${leapYearsEncountered.join(', ')}.`;
  }

  let explanation = `Between ${readableStart} and ${readableEnd}, there are ${totalDays.toLocaleString()} days. `;
  if (years > 0 || months > 0) {
    explanation += `This is equivalent to ${years > 0 ? `${years} year${years === 1 ? '' : 's'}, ` : ''}${months} month${months === 1 ? '' : 's'}, and ${days} day${days === 1 ? '' : 's'}. `;
  }
  explanation += `Of these ${totalDays} days, ${weekdayCount} are weekdays (working days) and ${weekendDayCount} fall on weekends.${leapYearNote}`;

  if (isReversed) {
    explanation += ` Note: The start date is after the end date; the duration reflects the chronological reverse interval.`;
  }

  return {
    startDate: startDateStr,
    endDate: endDateStr,
    isReversed,
    isInclusive: includeEndDate,
    totalDays,
    totalWeeks,
    remainingDaysAfterWeeks,
    totalMonths,
    years,
    months,
    days,
    totalHours,
    totalMinutes,
    totalSeconds,
    weekdayCount,
    weekendDayCount,
    summaryText,
    explanation,
  };
}

/**
 * Calculates exact age and life milestones
 */
export function calculateAge(birthDateStr: string, asOfDateStr?: string): AgeCalculationResult {
  const birth = parseDateString(birthDateStr);
  const asOf = asOfDateStr ? parseDateString(asOfDateStr) : (() => {
    const n = new Date();
    const y = n.getUTCFullYear();
    const m = n.getUTCMonth() + 1;
    const d = n.getUTCDate();
    return { year: y, month: m, day: d, utcMs: Date.UTC(y, m - 1, d) };
  })();

  const diff = calculateDateDifference(birthDateStr, toIsoDate(asOf.year, asOf.month, asOf.day), false);

  // Next Birthday
  let nextBdayYear = asOf.year;
  let nextBdayMonth = birth.month;
  let nextBdayDay = birth.day;

  // Handle Feb 29 birth
  if (birth.month === 2 && birth.day === 29 && !isLeapYear(nextBdayYear)) {
    nextBdayDay = 28;
  }

  let nextBdayUtc = Date.UTC(nextBdayYear, nextBdayMonth - 1, nextBdayDay);
  if (nextBdayUtc < asOf.utcMs) {
    nextBdayYear += 1;
    if (birth.month === 2 && birth.day === 29 && !isLeapYear(nextBdayYear)) {
      nextBdayDay = 28;
    } else {
      nextBdayDay = birth.day;
    }
    nextBdayUtc = Date.UTC(nextBdayYear, nextBdayMonth - 1, nextBdayDay);
  }

  const daysRemainingToBday = Math.round((nextBdayUtc - asOf.utcMs) / 86400000);
  const nextBdayIso = toIsoDate(nextBdayYear, nextBdayMonth, nextBdayDay);
  const nextBdayWeekday = getWeekdayName(nextBdayIso);

  // Born on weekday
  const dayBorn = getWeekdayName(birthDateStr);

  // Life milestones (10,000 days, 15,000 days, 18 years, 21 years, 50 years)
  const msPerDay = 86400000;
  const milestones = [
    {
      label: '1,000 Days on Earth',
      date: new Date(birth.utcMs + 1000 * msPerDay).toISOString().split('T')[0],
      achieved: diff.totalDays >= 1000
    },
    {
      label: '5,000 Days on Earth',
      date: new Date(birth.utcMs + 5000 * msPerDay).toISOString().split('T')[0],
      achieved: diff.totalDays >= 5000
    },
    {
      label: '10,000 Days on Earth',
      date: new Date(birth.utcMs + 10000 * msPerDay).toISOString().split('T')[0],
      achieved: diff.totalDays >= 10000
    },
    {
      label: '18th Birthday (Adulthood)',
      date: toIsoDate(birth.year + 18, birth.month, birth.day),
      achieved: diff.years >= 18
    },
    {
      label: '20,000 Days on Earth (~54.7 years)',
      date: new Date(birth.utcMs + 20000 * msPerDay).toISOString().split('T')[0],
      achieved: diff.totalDays >= 20000
    }
  ];

  return {
    birthDate: birthDateStr,
    asOfDate: toIsoDate(asOf.year, asOf.month, asOf.day),
    years: diff.years,
    months: diff.months,
    days: diff.days,
    totalDays: diff.totalDays,
    totalWeeks: diff.totalWeeks,
    totalHours: diff.totalHours,
    totalMinutes: diff.totalMinutes,
    totalSeconds: diff.totalSeconds,
    nextBirthday: {
      date: nextBdayIso,
      dayOfWeek: nextBdayWeekday,
      daysRemaining: daysRemainingToBday,
    },
    dayOfWeekBorn: dayBorn,
    milestones,
  };
}

/**
 * Add or subtract days, weeks, months, or years from a date
 */
export function addSubtractDate(
  startDateStr: string,
  operation: 'add' | 'subtract',
  values: { years?: number; months?: number; weeks?: number; days?: number }
): AddSubtractResult {
  const { year, month, day } = parseDateString(startDateStr);
  const factor = operation === 'add' ? 1 : -1;

  const yAdd = (values.years || 0) * factor;
  const mAdd = (values.months || 0) * factor;
  const totalDaysAdd = ((values.weeks || 0) * 7 + (values.days || 0)) * factor;

  // Step 1: Add years & months
  let newYear = year + yAdd;
  let newMonth = month + mAdd;

  while (newMonth > 12) {
    newMonth -= 12;
    newYear += 1;
  }
  while (newMonth < 1) {
    newMonth += 12;
    newYear -= 1;
  }

  // Adjust day if exceeds days in new month (e.g. Jan 31 -> Feb 28)
  const maxDays = getDaysInMonth(newYear, newMonth);
  let newDay = Math.min(day, maxDays);

  // Step 2: Add days in UTC ms
  const baseUtc = Date.UTC(newYear, newMonth - 1, newDay);
  const targetUtc = baseUtc + totalDaysAdd * 86400000;
  const targetDateObj = new Date(targetUtc);

  const tYear = targetDateObj.getUTCFullYear();
  const tMonth = targetDateObj.getUTCMonth() + 1;
  const tDay = targetDateObj.getUTCDate();

  const targetDate = toIsoDate(tYear, tMonth, tDay);
  const targetDayOfWeek = getWeekdayName(targetDate);

  // Total calendar days moved
  const startUtc = Date.UTC(year, month - 1, day);
  const totalCalendarDaysMoved = Math.round(Math.abs(targetUtc - startUtc) / 86400000);

  return {
    startDate: startDateStr,
    operation,
    targetDate,
    targetDayOfWeek,
    years: values.years || 0,
    months: values.months || 0,
    weeks: values.weeks || 0,
    days: values.days || 0,
    totalCalendarDaysMoved,
    isLeapYear: isLeapYear(tYear),
  };
}

/**
 * Calculates the exact difference between two times (and optional dates).
 */
export function calculateTimeDifference(
  startTime: string,
  endTime: string,
  startDate?: string,
  endDate?: string,
  crossesMidnightManual?: boolean
): TimeDifferenceResult {
  const parseTime = (t: string) => {
    if (!t) return { h: 0, m: 0, s: 0, totalSec: 0 };
    const parts = t.split(':').map(Number);
    const h = parts[0] || 0;
    const m = parts[1] || 0;
    const s = parts[2] || 0;
    return { h, m, s, totalSec: h * 3600 + m * 60 + s };
  };

  const startT = parseTime(startTime);
  const endT = parseTime(endTime);

  let diffSeconds = 0;
  let crossesMidnight = false;
  let days = 0;

  if (startDate && endDate) {
    const sDate = parseDateString(startDate);
    const eDate = parseDateString(endDate);
    const startMs = sDate.utcMs + startT.totalSec * 1000;
    const endMs = eDate.utcMs + endT.totalSec * 1000;
    const elapsedMs = Math.max(0, endMs - startMs);
    const netTotalSec = Math.floor(elapsedMs / 1000);
    days = Math.floor(netTotalSec / 86400);
    diffSeconds = netTotalSec % 86400;
    crossesMidnight = days > 0 || (endT.totalSec < startT.totalSec);
  } else {
    if (endT.totalSec >= startT.totalSec && !crossesMidnightManual) {
      diffSeconds = endT.totalSec - startT.totalSec;
      crossesMidnight = false;
    } else {
      diffSeconds = (86400 - startT.totalSec) + endT.totalSec;
      crossesMidnight = true;
    }
  }

  const hours = Math.floor(diffSeconds / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;

  const netSeconds = days * 86400 + diffSeconds;
  const totalHours = parseFloat((netSeconds / 3600).toFixed(2));
  const totalMinutes = Math.floor(netSeconds / 60);
  const totalSeconds = netSeconds;
  const percentOfDay = parseFloat(((diffSeconds / 86400) * 100).toFixed(1));

  const timeStr = `${hours} hour${hours === 1 ? '' : 's'}, ${minutes} minute${minutes === 1 ? '' : 's'}${seconds > 0 ? `, ${seconds} second${seconds === 1 ? '' : 's'}` : ''}`;
  const summaryText = days > 0 
    ? `From ${startDate || ''} ${startTime} to ${endDate || ''} ${endTime} is ${days} day${days === 1 ? '' : 's'}, ${timeStr}.`
    : `From ${startTime} to ${endTime}${crossesMidnight ? ' (next day)' : ''} is ${timeStr} (${totalHours} decimal hours).`;

  const explanation = `Between ${startTime} and ${endTime}${crossesMidnight ? ' (crossing midnight)' : ''}, exactly ${hours} hours, ${minutes} minutes, and ${seconds} seconds elapse. This equals ${totalMinutes.toLocaleString()} minutes, ${totalSeconds.toLocaleString()} seconds, or ${totalHours} decimal hours (${percentOfDay}% of a standard 24-hour day).`;

  return {
    startTime,
    endTime,
    startDate,
    endDate,
    crossesMidnight,
    days,
    hours,
    minutes,
    seconds,
    totalHours,
    totalMinutes,
    totalSeconds,
    percentOfDay,
    summaryText,
    explanation,
  };
}

