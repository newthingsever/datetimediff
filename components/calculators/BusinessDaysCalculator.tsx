'use client';

import { useState, useMemo } from 'react';
import { Briefcase, Calendar, RotateCcw, ArrowRight, CheckSquare } from 'lucide-react';
import { calculateBusinessDays } from '@/lib/businessDaysEngine';
import { toIsoDate, formatReadableDate } from '@/lib/dateEngine';
import ShareCopyBar from '@/components/ShareCopyBar';

export default function BusinessDaysCalculator() {
  const today = new Date();
  const todayIso = toIsoDate(today.getFullYear(), today.getMonth() + 1, today.getDate());

  const future = new Date(today.getTime() + 90 * 86400000);
  const futureIso = toIsoDate(future.getFullYear(), future.getMonth() + 1, future.getDate());

  const [startDate, setStartDate] = useState(todayIso);
  const [endDate, setEndDate] = useState(futureIso);
  const [includeEndDate, setIncludeEndDate] = useState(false);
  const [weekendType, setWeekendType] = useState<'sat-sun' | 'fri-sat' | 'sun-only'>('sat-sun');
  const [excludeHolidays, setExcludeHolidays] = useState(true);

  const result = useMemo(() => {
    return calculateBusinessDays(startDate, endDate, includeEndDate, weekendType, excludeHolidays);
  }, [startDate, endDate, includeEndDate, weekendType, excludeHolidays]);

  const copyText = `Business Days Calculation:
• Range: ${formatReadableDate(startDate)} to ${formatReadableDate(endDate)}
• Working Days: ${result.businessDays.toLocaleString()} days
• Weekend Days: ${result.weekendDays.toLocaleString()} days
• Holidays Excluded: ${result.holidayDays}
• Total Calendar Days: ${result.totalCalendarDays.toLocaleString()}`;

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all">
      <div className="p-4 sm:p-8 bg-gradient-to-r from-cyan-600 to-blue-600 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full mb-2 inline-block">
              Work & Productivity
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Business Days Calculator
            </h2>
            <p className="text-cyan-100 text-xs sm:text-sm mt-1">
              Calculate working days between dates, excluding weekends and official public holidays.
            </p>
          </div>
          <button
            onClick={() => {
              setStartDate(todayIso);
              setEndDate(futureIso);
              setIncludeEndDate(false);
              setWeekendType('sat-sun');
              setExcludeHolidays(true);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      <div className="p-4 sm:p-8 space-y-5 sm:space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="biz-start" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-cyan-600 dark:text-cyan-400" /> Start Date
              </label>
              <button
                type="button"
                onClick={() => setStartDate(todayIso)}
                className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                Today
              </button>
            </div>
            <input
              id="biz-start"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium text-base focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            />
            <p className="text-xs text-slate-500 font-medium">{formatReadableDate(startDate)}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="biz-end" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" /> End Date
              </label>
              <button
                type="button"
                onClick={() => setEndDate(todayIso)}
                className="text-xs font-semibold text-cyan-600 dark:text-cyan-400 hover:underline"
              >
                Today
              </button>
            </div>
            <input
              id="biz-end"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium text-base focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <p className="text-xs text-slate-500 font-medium">{formatReadableDate(endDate)}</p>
          </div>
        </div>

        {/* Options Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block mb-1.5">
              Weekend Days
            </label>
            <select
              value={weekendType}
              onChange={(e) => setWeekendType(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm font-medium focus:ring-2 focus:ring-cyan-500 focus:outline-none"
            >
              <option value="sat-sun">Saturday & Sunday (Standard Western)</option>
              <option value="fri-sat">Friday & Saturday (Middle East)</option>
              <option value="sun-only">Sunday Only (6-day workweek)</option>
            </select>
          </div>

          <div className="flex flex-col justify-end space-y-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 select-none">
              <input
                type="checkbox"
                checked={excludeHolidays}
                onChange={(e) => setExcludeHolidays(e.target.checked)}
                className="w-4 h-4 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
              />
              <span>Exclude Standard Public Holidays</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 select-none">
              <input
                type="checkbox"
                checked={includeEndDate}
                onChange={(e) => setIncludeEndDate(e.target.checked)}
                className="w-4 h-4 text-cyan-600 rounded border-slate-300 focus:ring-cyan-500"
              />
              <span>Include End Date (+1 day if business day)</span>
            </label>
          </div>
        </div>

        {/* Result Card */}
        <div className="rounded-3xl border border-cyan-100 dark:border-cyan-900/40 bg-gradient-to-br from-cyan-50/40 via-white to-blue-50/20 dark:from-slate-900/90 dark:via-slate-900/40 dark:to-cyan-950/20 p-6 sm:p-8 space-y-6">
          <div className="text-center py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 block mb-1">
              Working Days
            </span>
            <div className="text-5xl sm:text-6xl font-black text-cyan-700 dark:text-cyan-300 font-mono">
              {result.businessDays.toLocaleString()}
              <span className="text-2xl sm:text-3xl font-bold ml-2 font-sans text-slate-900 dark:text-white">
                Business Days
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Out of {result.totalCalendarDays.toLocaleString()} total calendar days
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Workdays
              </span>
              <span className="text-xl font-bold text-slate-900 dark:text-white font-mono">
                {result.businessDays}
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Weekends
              </span>
              <span className="text-xl font-bold text-slate-900 dark:text-white font-mono">
                {result.weekendDays}
              </span>
            </div>
            <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-center">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                Holidays
              </span>
              <span className="text-xl font-bold text-slate-900 dark:text-white font-mono">
                {result.holidayDays}
              </span>
            </div>
          </div>

          {result.holidaysList.length > 0 && (
            <div className="p-4 rounded-2xl bg-cyan-50/60 dark:bg-cyan-950/40 text-xs text-slate-600 dark:text-slate-300 space-y-1">
              <span className="font-semibold text-slate-900 dark:text-white block">
                Holidays observed during this period:
              </span>
              {result.holidaysList.map((h, i) => (
                <div key={i} className="flex justify-between">
                  <span>{h.name}</span>
                  <span className="font-mono text-slate-500">{formatReadableDate(h.date)}</span>
                </div>
              ))}
            </div>
          )}

          <ShareCopyBar formattedResult={copyText} />
        </div>
      </div>
    </div>
  );
}
