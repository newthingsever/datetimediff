'use client';

import { useState, useMemo } from 'react';
import { Clock, Calendar, ArrowRight, RotateCcw } from 'lucide-react';
import { calculateDateDifference, toIsoDate, formatReadableDate } from '@/lib/dateEngine';
import ShareCopyBar from '@/components/ShareCopyBar';

export default function DaysBetweenCalculator() {
  const today = new Date();
  const y = today.getFullYear();
  const m = today.getMonth() + 1;
  const d = today.getDate();
  const todayIso = toIsoDate(y, m, d);

  const future = new Date(today.getTime() + 60 * 86400000);
  const futureIso = toIsoDate(future.getFullYear(), future.getMonth() + 1, future.getDate());

  const [startDate, setStartDate] = useState(todayIso);
  const [endDate, setEndDate] = useState(futureIso);
  const [includeEndDate, setIncludeEndDate] = useState(false);

  const result = useMemo(() => {
    return calculateDateDifference(startDate, endDate, includeEndDate);
  }, [startDate, endDate, includeEndDate]);

  const copyText = `Days Between ${formatReadableDate(startDate)} and ${formatReadableDate(endDate)}:
• Total Days: ${result.totalDays.toLocaleString()} days ${includeEndDate ? '(inclusive)' : ''}
• Weekdays: ${result.weekdayCount}
• Weekend Days: ${result.weekendDayCount}
• Total Weeks: ${result.totalWeeks} weeks and ${result.remainingDaysAfterWeeks} days`;

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all">
      <div className="p-4 sm:p-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full mb-2 inline-block">
              Days Counter
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Days Between Dates
            </h2>
            <p className="text-emerald-100 text-xs sm:text-sm mt-1">
              Exact number of calendar days, working days, and weekends between two dates.
            </p>
          </div>
          <button
            onClick={() => {
              setStartDate(todayIso);
              setEndDate(futureIso);
              setIncludeEndDate(false);
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
              <label htmlFor="days-calc-start" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Start Date
              </label>
              <button
                type="button"
                onClick={() => setStartDate(todayIso)}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Today
              </button>
            </div>
            <input
              id="days-calc-start"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium text-base focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
            <p className="text-xs text-slate-500 font-medium">{formatReadableDate(startDate)}</p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="days-calc-end" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-teal-600 dark:text-teal-400" /> End Date
              </label>
              <button
                type="button"
                onClick={() => setEndDate(todayIso)}
                className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Today
              </button>
            </div>
            <input
              id="days-calc-end"
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium text-base focus:ring-2 focus:ring-teal-500 focus:outline-none"
            />
            <p className="text-xs text-slate-500 font-medium">{formatReadableDate(endDate)}</p>
          </div>
        </div>

        <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300 select-none">
          <input
            type="checkbox"
            checked={includeEndDate}
            onChange={(e) => setIncludeEndDate(e.target.checked)}
            className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
          />
          <span>Include end date (+1 calendar day)</span>
        </label>

        {/* Days Result Display */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/60 p-6 sm:p-8 space-y-6">
          <div className="text-center py-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
              Exact Difference
            </span>
            <div className="text-6xl sm:text-7xl font-black text-emerald-600 dark:text-emerald-400 font-mono">
              {result.totalDays.toLocaleString()}
            </div>
            <span className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1 block">
              Total Days
            </span>
            <p className="text-xs text-slate-500 mt-2">
              Equivalent to {result.totalWeeks.toLocaleString()} full weeks + {result.remainingDaysAfterWeeks} days
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Working Days (Mon - Fri)
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-mono mt-1 block">
                {result.weekdayCount.toLocaleString()}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-center">
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                Weekend Days (Sat - Sun)
              </span>
              <span className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white font-mono mt-1 block">
                {result.weekendDayCount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 text-xs sm:text-sm text-emerald-900 dark:text-emerald-200 font-medium flex items-center gap-2">
            <ArrowRight className="w-4 h-4 flex-shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{result.summaryText}</span>
          </div>

          <ShareCopyBar formattedResult={copyText} />
        </div>
      </div>
    </div>
  );
}
