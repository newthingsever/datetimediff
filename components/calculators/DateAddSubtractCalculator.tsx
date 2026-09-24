'use client';

import { useState, useMemo } from 'react';
import { Calendar, Plus, Minus, RotateCcw, ArrowRight } from 'lucide-react';
import { addSubtractDate, toIsoDate, formatReadableDate } from '@/lib/dateEngine';
import ShareCopyBar from '@/components/ShareCopyBar';

export default function DateAddSubtractCalculator() {
  const today = new Date();
  const todayIso = toIsoDate(today.getFullYear(), today.getMonth() + 1, today.getDate());

  const [startDate, setStartDate] = useState(todayIso);
  const [operation, setOperation] = useState<'add' | 'subtract'>('add');
  const [years, setYears] = useState(0);
  const [months, setMonths] = useState(0);
  const [weeks, setWeeks] = useState(0);
  const [days, setDays] = useState(30);

  const result = useMemo(() => {
    return addSubtractDate(startDate, operation, { years, months, weeks, days });
  }, [startDate, operation, years, months, weeks, days]);

  const copyText = `${operation === 'add' ? 'Added to' : 'Subtracted from'} ${formatReadableDate(startDate)}:
• Amount: ${years > 0 ? `${years}y ` : ''}${months > 0 ? `${months}m ` : ''}${weeks > 0 ? `${weeks}w ` : ''}${days}d
• Resulting Date: ${result.targetDayOfWeek}, ${formatReadableDate(result.targetDate)}
• Total Calendar Days Moved: ${result.totalCalendarDaysMoved} days`;

  const applyPreset = (op: 'add' | 'subtract', d: number, m: number = 0, y: number = 0) => {
    setOperation(op);
    setYears(y);
    setMonths(m);
    setWeeks(0);
    setDays(d);
  };

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden transition-all">
      <div className="p-6 sm:p-8 bg-gradient-to-r from-amber-600 to-orange-600 text-white">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider bg-white/20 px-3 py-1 rounded-full mb-2 inline-block">
              Date Math Engine
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Add or Subtract Days from Date
            </h2>
            <p className="text-amber-100 text-xs sm:text-sm mt-1">
              Add or subtract days, weeks, months, or years to find any future or past date.
            </p>
          </div>
          <button
            onClick={() => {
              setStartDate(todayIso);
              setOperation('add');
              setYears(0);
              setMonths(0);
              setWeeks(0);
              setDays(30);
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-medium text-white transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-6">
        {/* Start Date & Operation */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="add-sub-start" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-amber-600 dark:text-amber-400" /> Start Date
              </label>
              <button
                type="button"
                onClick={() => setStartDate(todayIso)}
                className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:underline"
              >
                Today
              </button>
            </div>
            <input
              id="add-sub-start"
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-white font-medium text-base focus:ring-2 focus:ring-amber-500 focus:outline-none"
            />
            <p className="text-xs text-slate-500 font-medium">{formatReadableDate(startDate)}</p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
              Operation
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setOperation('add')}
                className={`flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all border ${
                  operation === 'add'
                    ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Plus className="w-4 h-4" /> Add (+)
              </button>
              <button
                type="button"
                onClick={() => setOperation('subtract')}
                className={`flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm transition-all border ${
                  operation === 'subtract'
                    ? 'bg-amber-500 text-white border-amber-600 shadow-md shadow-amber-500/20'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                }`}
              >
                <Minus className="w-4 h-4" /> Subtract (-)
              </button>
            </div>
          </div>
        </div>

        {/* Units to Add/Subtract */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 block">
            Time to {operation === 'add' ? 'Add' : 'Subtract'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">Years</span>
              <input
                type="number"
                min="0"
                value={years || ''}
                placeholder="0"
                onChange={(e) => setYears(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-center text-base sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">Months</span>
              <input
                type="number"
                min="0"
                value={months || ''}
                placeholder="0"
                onChange={(e) => setMonths(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-center text-base sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">Weeks</span>
              <input
                type="number"
                min="0"
                value={weeks || ''}
                placeholder="0"
                onChange={(e) => setWeeks(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-center text-base sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block mb-1">Days</span>
              <input
                type="number"
                min="0"
                value={days || ''}
                placeholder="0"
                onChange={(e) => setDays(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-center text-base sm:text-sm focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400 pt-1">
          <span className="font-semibold text-slate-400">Presets:</span>
          <button onClick={() => applyPreset('add', 7)} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/80 transition-colors">+1 Week</button>
          <button onClick={() => applyPreset('add', 30)} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/80 transition-colors">+30 Days</button>
          <button onClick={() => applyPreset('add', 90)} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/80 transition-colors">+90 Days</button>
          <button onClick={() => applyPreset('add', 180)} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/80 transition-colors">+180 Days</button>
          <button onClick={() => applyPreset('subtract', 30)} className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/80 transition-colors">-30 Days</button>
        </div>

        {/* Result Card */}
        <div className="rounded-3xl border border-amber-100 dark:border-amber-900/40 bg-gradient-to-br from-amber-50/40 via-white to-orange-50/20 dark:from-slate-900/90 dark:via-slate-900/40 dark:to-amber-950/20 p-6 sm:p-8 space-y-6">
          <div className="text-center py-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 block mb-1">
              Resulting Target Date
            </span>
            <div className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono">
              {formatReadableDate(result.targetDate)}
            </div>
            <p className="text-base sm:text-lg font-bold text-amber-600 dark:text-amber-400 mt-2">
              {result.targetDayOfWeek}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 text-xs sm:text-sm text-amber-900 dark:text-amber-200 font-medium flex items-center gap-2">
            <ArrowRight className="w-4 h-4 flex-shrink-0 text-amber-600 dark:text-amber-400" />
            <span>
              {operation === 'add' ? 'Moving forward' : 'Moving backward'} by{' '}
              <strong>{result.totalCalendarDaysMoved.toLocaleString()} calendar days</strong> from{' '}
              {formatReadableDate(startDate)}.
            </span>
          </div>

          <ShareCopyBar formattedResult={copyText} />
        </div>
      </div>
    </div>
  );
}
