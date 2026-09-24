import assert from 'node:assert';
import test from 'node:test';
import {
  isLeapYear,
  getDaysInMonth,
  calculateDateDifference,
  calculateAge,
  addSubtractDate
} from '../lib/dateEngine.ts';
import { calculateBusinessDays } from '../lib/businessDaysEngine.ts';

test('isLeapYear handles standard and edge-case Gregorian years correctly', () => {
  assert.strictEqual(isLeapYear(2024), true, '2024 is divisible by 4, should be leap');
  assert.strictEqual(isLeapYear(2025), false, '2025 is not leap');
  assert.strictEqual(isLeapYear(2000), true, '2000 is divisible by 400, should be leap');
  assert.strictEqual(isLeapYear(1900), false, '1900 is divisible by 100 but not 400, should NOT be leap');
  assert.strictEqual(isLeapYear(2100), false, '2100 is divisible by 100 but not 400, should NOT be leap');
});

test('getDaysInMonth returns correct days for leap and non-leap Februaries', () => {
  assert.strictEqual(getDaysInMonth(2024, 2), 29, 'Feb 2024 must have 29 days');
  assert.strictEqual(getDaysInMonth(2025, 2), 28, 'Feb 2025 must have 28 days');
  assert.strictEqual(getDaysInMonth(2026, 1), 31, 'Jan has 31 days');
  assert.strictEqual(getDaysInMonth(2026, 4), 30, 'Apr has 30 days');
});

test('calculateDateDifference handles same date (0 elapsed, 1 inclusive)', () => {
  const elapsed = calculateDateDifference('2026-05-10', '2026-05-10', false);
  assert.strictEqual(elapsed.totalDays, 0, 'Same date elapsed duration must be 0');
  assert.strictEqual(elapsed.years, 0);
  assert.strictEqual(elapsed.months, 0);
  assert.strictEqual(elapsed.days, 0);

  const inclusive = calculateDateDifference('2026-05-10', '2026-05-10', true);
  assert.strictEqual(inclusive.totalDays, 1, 'Same date inclusive duration must be 1 day');
});

test('calculateDateDifference handles leap day crossing accurately', () => {
  // Leap year 2024: Feb 28 to Mar 1 = 2 days elapsed (Feb 28 -> Feb 29 -> Mar 1)
  const leapDiff = calculateDateDifference('2024-02-28', '2024-03-01', false);
  assert.strictEqual(leapDiff.totalDays, 2, 'Feb 28 to Mar 1 in 2024 must be 2 elapsed days');

  // Non-leap year 2025: Feb 28 to Mar 1 = 1 day elapsed
  const nonLeapDiff = calculateDateDifference('2025-02-28', '2025-03-01', false);
  assert.strictEqual(nonLeapDiff.totalDays, 1, 'Feb 28 to Mar 1 in 2025 must be 1 elapsed day');
});

test('calculateDateDifference handles reversed dates gracefully', () => {
  const reversed = calculateDateDifference('2026-12-31', '2026-01-01', false);
  assert.strictEqual(reversed.isReversed, true);
  assert.strictEqual(reversed.totalDays, 364);
});

test('calculateAge computes exact age, weekday born, and next birthday', () => {
  const age = calculateAge('2000-01-01', '2026-01-01');
  assert.strictEqual(age.years, 26);
  assert.strictEqual(age.months, 0);
  assert.strictEqual(age.days, 0);
  assert.strictEqual(age.dayOfWeekBorn, 'Saturday');
});

test('addSubtractDate handles month-end rollover and day additions', () => {
  // Adding 30 days to Jan 1, 2026 -> Jan 31, 2026
  const add30 = addSubtractDate('2026-01-01', 'add', { days: 30 });
  assert.strictEqual(add30.targetDate, '2026-01-31');

  // Adding 1 month to Jan 31 in non-leap year clamps to Feb 28
  const add1Month = addSubtractDate('2025-01-31', 'add', { months: 1 });
  assert.strictEqual(add1Month.targetDate, '2025-02-28');

  // Adding 1 month to Jan 31 in leap year 2024 clamps to Feb 29
  const add1MonthLeap = addSubtractDate('2024-01-31', 'add', { months: 1 });
  assert.strictEqual(add1MonthLeap.targetDate, '2024-02-29');

  // Subtracting 15 days from Feb 1, 2026 -> Jan 17, 2026
  const sub15 = addSubtractDate('2026-02-01', 'subtract', { days: 15 });
  assert.strictEqual(sub15.targetDate, '2026-01-17');
});

test('calculateBusinessDays correctly excludes weekends and holidays', () => {
  // 2026-01-05 (Monday) to 2026-01-09 (Friday) = 4 elapsed days, all weekdays
  const bizWeek = calculateBusinessDays('2026-01-05', '2026-01-09', true, 'sat-sun', false);
  assert.strictEqual(bizWeek.businessDays, 5, 'Mon-Fri inclusive is 5 business days');
  assert.strictEqual(bizWeek.weekendDays, 0);

  // Over a weekend: 2026-01-09 (Fri) to 2026-01-12 (Mon) inclusive = 2 business days (Fri, Mon) + 2 weekend days (Sat, Sun)
  const overWeekend = calculateBusinessDays('2026-01-09', '2026-01-12', true, 'sat-sun', false);
  assert.strictEqual(overWeekend.businessDays, 2);
  assert.strictEqual(overWeekend.weekendDays, 2);
});
