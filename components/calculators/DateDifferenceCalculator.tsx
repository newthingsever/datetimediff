'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import { Calendar, ArrowRight, RotateCcw, Clock, Sparkles, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { calculateDateDifference, toIsoDate, formatReadableDate } from '@/lib/dateEngine';
import ShareCopyBar from '@/components/ShareCopyBar';
import ExplainResult from '@/components/ExplainResult';
import { useLanguage } from '@/lib/i18n';

export default function DateDifferenceCalculator() {
  const searchParams = useSearchParams();
  const { t } = useLanguage();

  // Initial values: today and 90 days later
  const defaultDates = useMemo(() => {
    const today = new Date();
    const y = today.getFullYear();
    const m = today.getMonth() + 1;
    const d = today.getDate();
    const startIso = toIsoDate(y, m, d);

    // Default end date: ~3 months (90 days) from now
    const future = new Date(today.getTime() + 90 * 86400000);
    const endIso = toIsoDate(future.getFullYear(), future.getMonth() + 1, future.getDate());

    return { startIso, endIso };
  }, []);

  const [startDate, setStartDate] = useState(defaultDates.startIso);
  const [endDate, setEndDate] = useState(defaultDates.endIso);
  const [includeEndDate, setIncludeEndDate] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Sync from URL search params if present
  useEffect(() => {
    const s = searchParams.get('start');
    const e = searchParams.get('end');
    const inc = searchParams.get('inclusive');
    if (s && /^\d{4}-\d{2}-\d{2}$/.test(s)) setStartDate(s);
    if (e && /^\d{4}-\d{2}-\d{2}$/.test(e)) setEndDate(e);
    if (inc === 'true') setIncludeEndDate(true);
  }, [searchParams]);

  // Client-side instant calculation engine
  const result = useMemo(() => {
    return calculateDateDifference(startDate, endDate, includeEndDate);
  }, [startDate, endDate, includeEndDate]);

  // Handlers
  const handleSetTodayStart = () => {
    const now = new Date();
    setStartDate(toIsoDate(now.getFullYear(), now.getMonth() + 1, now.getDate()));
  };

  const handleSetTodayEnd = () => {
    const now = new Date();
    setEndDate(toIsoDate(now.getFullYear(), now.getMonth() + 1, now.getDate()));
  };

  const handleAddDaysToEnd = (daysToAdd: number) => {
    const parts = startDate.split('-').map(Number);
    const base = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
    const future = new Date(base.getTime() + daysToAdd * 86400000);
    setEndDate(toIsoDate(future.getUTCFullYear(), future.getUTCMonth() + 1, future.getUTCDate()));
  };

  const handleSetEndOfYear = () => {
    const parts = startDate.split('-').map(Number);
    setEndDate(`${parts[0]}-12-31`);
  };

  const handleSwapDates = () => {
    const temp = startDate;
    setStartDate(endDate);
    setEndDate(temp);
  };

  const handleReset = () => {
    setStartDate(defaultDates.startIso);
    setEndDate(defaultDates.endIso);
    setIncludeEndDate(false);
    setShowResult(false);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#2563eb', '#4f46e5', '#7c3aed', '#10b981'],
      });
    } catch {
      // safe fallback
    }
  };

  const handleCalculateClick = () => {
    setShowResult(true);
    triggerConfetti();
    setTimeout(() => {
      const resultElement = document.getElementById('result-section');
      if (resultElement) {
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }, 80);
  };

  const shareUrl = typeof window !== 'undefined'
    ? `${window.location.origin}${window.location.pathname}?start=${startDate}&end=${endDate}${includeEndDate ? '&inclusive=true' : ''}`
    : '';

  const copyText = `${formatReadableDate(startDate)} to ${formatReadableDate(endDate)}:
• ${t('totalDays')}: ${result.totalDays.toLocaleString()} ${t('days')} ${includeEndDate ? '(inclusive)' : ''}
• ${t('yearsMonthsDays')}: ${result.years > 0 ? `${result.years} ${t('years')}, ` : ''}${result.months} ${t('months')}, ${result.days} ${t('days')}
• ${t('weeks')}: ${result.totalWeeks.toLocaleString()} ${t('weeks')}, ${result.remainingDaysAfterWeeks} ${t('days')}
• ${t('hours')}: ${result.totalHours.toLocaleString()} ${t('hours')}
• ${t('weekdays')}: ${result.weekdayCount} | ${t('weekendDays')}: ${result.weekendDayCount}`;

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden transition-all">
      {/* Compact Top Status Bar */}
      <div className="px-5 py-3 sm:px-7 sm:py-3.5 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-100">
            {t('instantEngine')}
          </span>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-xs font-medium text-white transition-colors cursor-pointer"
          title="Reset to default dates"
        >
          <RotateCcw className="w-3 h-3" /> {t('reset')}
        </button>
      </div>

      <div className="p-5 sm:p-7 space-y-4 sm:space-y-5">
        {/* Date Inputs Grid - Front & Center Above the Fold */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative">
          {/* Start Date Card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="start-date" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                {t('startDate')}
              </label>
              <button
                type="button"
                onClick={handleSetTodayStart}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {t('setToday')}
              </button>
            </div>
            <div className="relative">
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-base focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all shadow-inner"
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {formatReadableDate(startDate)}
            </p>
          </div>

          {/* End Date Card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="end-date" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                {t('endDate')}
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSwapDates}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                  title="Swap start and end dates"
                >
                  {t('swap')}
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={handleSetTodayEnd}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {t('setToday')}
                </button>
              </div>
            </div>
            <div className="relative">
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-base focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all shadow-inner"
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {formatReadableDate(endDate)}
            </p>
          </div>
        </div>

        {/* Quick Presets & Options */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          {/* Checkbox: Include End Date */}
          <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300 select-none">
            <input
              type="checkbox"
              checked={includeEndDate}
              onChange={(e) => setIncludeEndDate(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-blue-500 cursor-pointer"
            />
            <span>{t('includeEndDate')}</span>
          </label>

          {/* Quick presets */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-400 dark:text-slate-500">{t('presets')}</span>
            <button
              onClick={() => handleAddDaysToEnd(7)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-950 dark:hover:text-blue-300 transition-colors font-medium cursor-pointer border border-transparent dark:border-slate-750"
            >
              {t('plus7Days')}
            </button>
            <button
              onClick={() => handleAddDaysToEnd(30)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-950 dark:hover:text-blue-300 transition-colors font-medium cursor-pointer border border-transparent dark:border-slate-750"
            >
              {t('plus30Days')}
            </button>
            <button
              onClick={() => handleAddDaysToEnd(90)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-950 dark:hover:text-blue-300 transition-colors font-medium cursor-pointer border border-transparent dark:border-slate-750"
            >
              {t('plus90Days')}
            </button>
            <button
              onClick={() => handleAddDaysToEnd(180)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-950 dark:hover:text-blue-300 transition-colors font-medium cursor-pointer border border-transparent dark:border-slate-750"
            >
              {t('plus180Days')}
            </button>
            <button
              onClick={handleSetEndOfYear}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-950 dark:hover:text-blue-300 transition-colors font-medium cursor-pointer border border-transparent dark:border-slate-750"
            >
              {t('endOfYear')}
            </button>
          </div>
        </div>

        {/* Primary Action: Calculate Result Button with Glow */}
        <button
          type="button"
          onClick={handleCalculateClick}
          className="w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white font-extrabold text-base sm:text-lg shadow-lg shadow-indigo-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
        >
          <Zap className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
          <span>{t('calculateResult')}</span>
          <Sparkles className="w-4 h-4 text-blue-200" />
        </button>

        {/* Result Showcase Card - Shown only when user clicks 'Calculate Result' */}
        {showResult && (
          <div
            id="result-section"
            className="scroll-mt-6 rounded-3xl border border-slate-200 dark:border-slate-750 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-850 p-5 sm:p-8 space-y-6 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300"
          >
            {/* Header info bar */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                {t('calculatedResult')}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                {includeEndDate ? t('inclusiveDuration') : t('elapsedDuration')}
              </span>
            </div>

            {/* Primary Highlight: Years, Months, and Days */}
            <div className="text-center py-2 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400 block">
                {t('yearsMonthsDays')}
              </span>

              {/* Prominent Years, Months, Days Breakdown */}
              <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white font-mono">
                {result.years > 0 && (
                  <span className="inline-flex items-baseline gap-1">
                    {result.years}{' '}
                    <span className="text-sm sm:text-xl font-bold font-sans text-blue-600 dark:text-blue-400">
                      {result.years === 1 ? t('year') : t('years')}
                    </span>
                  </span>
                )}
                <span className="inline-flex items-baseline gap-1">
                  {result.months}{' '}
                  <span className="text-sm sm:text-xl font-bold font-sans text-indigo-600 dark:text-indigo-400">
                    {result.months === 1 ? t('month') : t('months')}
                  </span>
                </span>
                <span className="inline-flex items-baseline gap-1">
                  {result.days}{' '}
                  <span className="text-sm sm:text-xl font-bold font-sans text-purple-600 dark:text-purple-400">
                    {result.days === 1 ? t('day') : t('days')}
                  </span>
                </span>
              </div>

              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mt-2">
                {result.years > 0 ? `${result.years} ${result.years === 1 ? t('year') : t('years')} · ` : ''}
                {result.months} {result.months === 1 ? t('month') : t('months')} · {result.days} {result.days === 1 ? t('day') : t('days')}
              </p>

              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {t('or')} {result.totalWeeks.toLocaleString()} {t('weeks')} · {result.remainingDaysAfterWeeks} {t('days')}
              </p>

              {/* Secondary Badge: Total Days & Weeks */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/80 border border-blue-200/80 dark:border-blue-900 text-blue-700 dark:text-blue-300 text-xs sm:text-sm font-bold font-mono">
                <span>{result.totalDays.toLocaleString()} {t('totalDays')}</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span>{result.totalWeeks.toLocaleString()} {t('weeks')} + {result.remainingDaysAfterWeeks} {t('days')}</span>
              </div>
            </div>

            {/* Granular Units Grid - Crisp High Contrast in Dark Mode */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-750 text-center shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  {t('hours')}
                </span>
                <span className="text-base sm:text-xl font-bold text-slate-900 dark:text-blue-200 font-mono">
                  {result.totalHours.toLocaleString()}
                </span>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-750 text-center shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  {t('minutes')}
                </span>
                <span className="text-base sm:text-xl font-bold text-slate-900 dark:text-indigo-200 font-mono">
                  {result.totalMinutes.toLocaleString()}
                </span>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-750 text-center shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  {t('seconds')}
                </span>
                <span className="text-base sm:text-xl font-bold text-slate-900 dark:text-purple-200 font-mono">
                  {result.totalSeconds.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Friendly Sentence */}
            <div className="p-4 rounded-2xl bg-blue-50/80 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/50 text-xs sm:text-sm text-blue-950 dark:text-blue-200 font-medium flex items-center gap-2">
              <ArrowRight className="w-4 h-4 flex-shrink-0 text-blue-600 dark:text-blue-400" />
              <span>{result.summaryText}</span>
            </div>

            {/* Visual Timeline & Ratio Bar - High Contrast Dark Mode */}
            <div className="p-5 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-750 space-y-3 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span>{t('calendarBreakdown')}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 text-[11px] font-mono border border-blue-200/50 dark:border-blue-900">
                  {((result.totalDays / 365.25) * 100).toFixed(1)}% {t('ofStandardYear')}
                </span>
              </div>

              {/* Segmented Gradient Bar */}
              <div className="w-full h-3.5 rounded-full bg-slate-100 dark:bg-slate-900 overflow-hidden flex shadow-inner">
                <div
                  style={{ width: `${result.totalDays > 0 ? (result.weekdayCount / result.totalDays) * 100 : 0}%` }}
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-700"
                  title={`${t('weekdays')}: ${result.weekdayCount}`}
                />
                <div
                  style={{ width: `${result.totalDays > 0 ? (result.weekendDayCount / result.totalDays) * 100 : 0}%` }}
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-700"
                  title={`${t('weekendDays')}: ${result.weekendDayCount}`}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block shadow-sm shadow-blue-500/50" />
                  <strong className="text-slate-800 dark:text-white font-bold">{result.weekdayCount.toLocaleString()}</strong> <span className="text-slate-600 dark:text-slate-300">{t('weekdays')}</span> ({result.totalDays > 0 ? Math.round((result.weekdayCount / result.totalDays) * 100) : 0}%)
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block shadow-sm shadow-purple-500/50" />
                  <strong className="text-slate-800 dark:text-white font-bold">{result.weekendDayCount.toLocaleString()}</strong> <span className="text-slate-600 dark:text-slate-300">{t('weekendDays')}</span> ({result.totalDays > 0 ? 100 - Math.round((result.weekdayCount / result.totalDays) * 100) : 0}%)
                </span>
              </div>
            </div>

            {/* Copy and Share */}
            <ShareCopyBar formattedResult={copyText} shareUrl={shareUrl} />

            {/* Killer Feature: Explain My Result */}
            <ExplainResult
              explanation={result.explanation}
              weekdayCount={result.weekdayCount}
              weekendDayCount={result.weekendDayCount}
              totalDays={result.totalDays}
              years={result.years}
              months={result.months}
              days={result.days}
            />
          </div>
        )}
      </div>
    </div>
  );
}
