export interface DateComponents {
  year: number;
  month: number; // 1 - 12
  day: number;   // 1 - 31
}

export interface DateDifferenceResult {
  startDate: string;
  endDate: string;
  isReversed: boolean;
  isInclusive: boolean;
  totalDays: number;
  totalWeeks: number;
  remainingDaysAfterWeeks: number;
  totalMonths: number;
  years: number;
  months: number;
  days: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  weekdayCount: number;
  weekendDayCount: number;
  summaryText: string;
  explanation: string;
}

export interface AgeCalculationResult {
  birthDate: string;
  asOfDate: string;
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  nextBirthday: {
    date: string;
    dayOfWeek: string;
    daysRemaining: number;
  };
  dayOfWeekBorn: string;
  milestones: {
    label: string;
    date: string;
    achieved: boolean;
  }[];
}

export interface BusinessDaysResult {
  startDate: string;
  endDate: string;
  isInclusive: boolean;
  businessDays: number;
  weekendDays: number;
  holidayDays: number;
  totalCalendarDays: number;
  weekendType: 'sat-sun' | 'fri-sat' | 'sun-only';
  holidaysList: { date: string; name: string }[];
}

export interface AddSubtractResult {
  startDate: string;
  operation: 'add' | 'subtract';
  targetDate: string;
  targetDayOfWeek: string;
  years: number;
  months: number;
  weeks: number;
  days: number;
  totalCalendarDaysMoved: number;
  isLeapYear: boolean;
}

export interface TimeDifferenceResult {
  startTime: string;
  endTime: string;
  startDate?: string;
  endDate?: string;
  crossesMidnight: boolean;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
  percentOfDay: number;
  summaryText: string;
  explanation: string;
}
