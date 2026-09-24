'use client';

import { useState, useMemo } from 'react';
import { Sparkles, Calendar, Cake, Clock, RotateCcw, Heart, Award } from 'lucide-react';
import { calculateAge, toIsoDate, formatReadableDate } from '@/lib/dateEngine';
import ShareCopyBar from '@/components/ShareCopyBar';

export default function AgeCalculator() {
  const today = new Date();
  const todayIso = toIsoDate(today.getFullYear(), today.getMonth() + 1, today.getDate());

  // Default birthdate: Jan 1, 2000
  const [birthDate, setBirthDate] = useState('2000-01-01');
  const [asOfDate, setAsOfDate] = useState(todayIso);

  const result = useMemo(() => {
    return calculateAge(birthDate, asOfDate);
  }, [birthDate, asOfDate]);

  const copyText = `Age as of ${formatReadableDate(asOfDate)}:
• Exact Age: ${result.years} years, ${result.months} months, ${result.days} days
• Born on: ${result.dayOfWeekBorn}, ${formatReadableDate(birthDate)}
• Total Days Lived: ${result.totalDays.toLocaleString()} days
• Next Birthday: ${result.nextBirthday.daysRemaining} days remaining (${result.nextBirthday.dayOfWeek}, ${formatReadableDate(result.nextBirthday.date)})`;

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all">
      <div className="p-6 sm:p-8 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full mb-2 inline-block">
              Exact Age & Milestones
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Age Calculator
            </h2>
            <p className="text-purple-100 text-xs sm:text-sm mt-1">
              Calculate exact age in years, months, days, hours, and countdown to your next birthday.
            </p>
          </div>
          <button
            onClick={() => {
              setBirthDate('2000-01-01');
              setAsOfDate(todayIso);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="birth-date" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Cake className="w-4 h-4 text-purple-600 dark:text-purple-400" /> Date of Birth
            </label>
            <input
              id="birth-date"
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium text-base focus:ring-2 focus:ring-purple-500 focus:outline-none"
            />
            <p className="text-xs text-slate-500 font-medium">
              Born on a <strong>{result.dayOfWeekBorn}</strong> ({formatReadableDate(birthDate)})
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="age-as-of-date" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-pink-600 dark:text-pink-400" /> Age as of Date
              </label>
              <button
                type="button"
                onClick={() => setAsOfDate(todayIso)}
                className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
              >
                Today
              </button>
            </div>
            <input
              id="age-as-of-date"
              type="date"
              value={asOfDate}
              onChange={(e) => setAsOfDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium text-base focus:ring-2 focus:ring-pink-500 focus:outline-none"
            />
            <p className="text-xs text-slate-500 font-medium">{formatReadableDate(asOfDate)}</p>
          </div>
        </div>

        {/* Age Result Display */}
        <div className="rounded-3xl border border-purple-100 dark:border-purple-900/40 bg-gradient-to-br from-purple-50/40 via-white to-pink-50/30 dark:from-slate-900/90 dark:via-slate-900/40 dark:to-purple-950/20 p-6 sm:p-8 space-y-6">
          <div className="text-center py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-2">
              Exact Age
            </span>
            <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-mono">
              <span className="inline-flex items-baseline gap-1">
                {result.years} <span className="text-sm sm:text-xl font-bold font-sans text-purple-600 dark:text-purple-400">Years</span>
              </span>
              <span className="inline-flex items-baseline gap-1">
                {result.months} <span className="text-sm sm:text-xl font-bold font-sans text-purple-600 dark:text-purple-400">Months</span>
              </span>
              <span className="inline-flex items-baseline gap-1">
                {result.days} <span className="text-sm sm:text-xl font-bold font-sans text-purple-600 dark:text-purple-400">Days</span>
              </span>
            </div>
          </div>

          {/* Next Birthday Banner */}
          <div className="p-4 rounded-2xl bg-purple-100/70 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-900 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-purple-600 text-white">
                <Cake className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-300 block">
                  Next Birthday
                </span>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                  {formatReadableDate(result.nextBirthday.date)} ({result.nextBirthday.dayOfWeek})
                </p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black text-purple-700 dark:text-purple-300 font-mono">
                {result.nextBirthday.daysRemaining}
              </span>
              <span className="text-xs font-medium text-purple-600 dark:text-purple-400 block">
                days left
              </span>
            </div>
          </div>

          {/* Life stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-center">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Total Days</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">{result.totalDays.toLocaleString()}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-center">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Total Weeks</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">{result.totalWeeks.toLocaleString()}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-center">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Total Hours</span>
              <span className="text-lg font-bold text-slate-900 dark:text-white font-mono">{result.totalHours.toLocaleString()}</span>
            </div>
            <div className="p-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-center">
              <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">Heartbeats (est.)</span>
              <span className="text-lg font-bold text-rose-600 dark:text-rose-400 font-mono">{(result.totalMinutes * 75).toLocaleString()}</span>
            </div>
          </div>

          {/* Milestones tracker */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-purple-600" /> Life Milestones
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {result.milestones.map((m, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    m.achieved
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900 text-emerald-800 dark:text-emerald-300'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span className="font-medium">{m.label}</span>
                  <span className="font-mono text-[11px]">{formatReadableDate(m.date)}</span>
                </div>
              ))}
            </div>
          </div>

          <ShareCopyBar formattedResult={copyText} />
        </div>
      </div>
    </div>
  );
}
