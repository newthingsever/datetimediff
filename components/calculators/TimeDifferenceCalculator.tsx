'use client';

import { useState, useMemo } from 'react';
import { Clock, RotateCcw, Sparkles, Zap, ArrowRight, Calendar, ArrowLeftRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { calculateTimeDifference, toIsoDate, formatReadableDate } from '@/lib/dateEngine';
import ShareCopyBar from '@/components/ShareCopyBar';
import ExplainResult from '@/components/ExplainResult';
import { useLanguage } from '@/lib/i18n';

export default function TimeDifferenceCalculator() {
  const { t } = useLanguage();

  const [mode, setMode] = useState<'time' | 'datetime'>('time');
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('17:30');

  const today = useMemo(() => {
    const d = new Date();
    return toIsoDate(d.getFullYear(), d.getMonth() + 1, d.getDate());
  }, []);

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [crossesMidnight, setCrossesMidnight] = useState(false);
  const [showResult, setShowResult] = useState(false);

  // Automatic midnight detection when in time-only mode
  const isAutoOvernight = useMemo(() => {
    if (mode === 'datetime') return false;
    const [sh, sm] = startTime.split(':').map(Number);
    const [eh, em] = endTime.split(':').map(Number);
    return (eh * 60 + em) < (sh * 60 + sm);
  }, [mode, startTime, endTime]);

  const effectiveOvernight = crossesMidnight || isAutoOvernight;

  // Client-side computation
  const result = useMemo(() => {
    if (mode === 'datetime') {
      return calculateTimeDifference(startTime, endTime, startDate, endDate);
    }
    return calculateTimeDifference(startTime, endTime, undefined, undefined, effectiveOvernight);
  }, [mode, startTime, endTime, startDate, endDate, effectiveOvernight]);

  const handleSetNowStart = () => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    setStartTime(`${h}:${m}`);
  };

  const handleSetNowEnd = () => {
    const now = new Date();
    const h = String(now.getHours()).padStart(2, '0');
    const m = String(now.getMinutes()).padStart(2, '0');
    setEndTime(`${h}:${m}`);
  };

  const handleSwap = () => {
    const tempTime = startTime;
    setStartTime(endTime);
    setEndTime(tempTime);
    if (mode === 'datetime') {
      const tempDate = startDate;
      setStartDate(endDate);
      setEndDate(tempDate);
    }
  };

  const handleAddHoursToEnd = (hoursToAdd: number) => {
    const [sh, sm] = startTime.split(':').map(Number);
    const totalMinutes = (sh * 60 + sm) + Math.round(hoursToAdd * 60);
    const newH = Math.floor(totalMinutes / 60) % 24;
    const newM = totalMinutes % 60;
    setEndTime(`${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`);
    if (totalMinutes >= 1440) {
      setCrossesMidnight(true);
    }
  };

  const handleReset = () => {
    setMode('time');
    setStartTime('09:00');
    setEndTime('17:30');
    setStartDate(today);
    setEndDate(today);
    setCrossesMidnight(false);
    setShowResult(false);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.75 },
        colors: ['#0284c7', '#2563eb', '#7c3aed', '#10b981'],
      });
    } catch {
      // fallback
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

  const shareText = `Time Difference between ${startTime} and ${endTime}${effectiveOvernight ? ' (next day)' : ''}:
• Duration: ${result.hours}h ${result.minutes}m ${result.seconds}s
• Decimal Hours: ${result.totalHours} hrs
• Total Minutes: ${result.totalMinutes.toLocaleString()} min
• Portion of Day: ${result.percentOfDay}%`;

  return (
    <div className="w-full bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none overflow-hidden transition-all">
      {/* Top Status Bar */}
      <div className="px-5 py-3 sm:px-7 sm:py-3.5 bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-sky-100">
            {t('instantEngine')}
          </span>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 text-xs font-medium text-white transition-colors cursor-pointer"
          title="Reset"
        >
          <RotateCcw className="w-3 h-3" /> {t('reset')}
        </button>
      </div>

      <div className="p-5 sm:p-7 space-y-4 sm:space-y-5">
        {/* Mode Selector Tabs */}
        <div className="flex rounded-xl p-1 bg-slate-100 dark:bg-slate-800 max-w-xs mx-auto border border-slate-200/60 dark:border-slate-700/60">
          <button
            type="button"
            onClick={() => setMode('time')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              mode === 'time'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t('timeOnly')}
          </button>
          <button
            type="button"
            onClick={() => setMode('datetime')}
            className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-semibold transition-all ${
              mode === 'datetime'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t('dateTime')}
          </button>
        </div>

        {/* Inputs Grid - Front & Center Above the Fold */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 relative">
          {/* Start Time Card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="start-time" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                {t('startTime')}
              </label>
              <button
                type="button"
                onClick={handleSetNowStart}
                className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
              >
                {t('setNow')}
              </button>
            </div>

            {mode === 'datetime' && (
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full mb-2 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
              />
            )}

            <div className="relative">
              <input
                id="start-time"
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-base focus:ring-2 focus:ring-sky-500 focus:outline-none transition-all shadow-inner font-mono"
              />
            </div>
          </div>

          {/* End Time Card */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="end-time" className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                {t('endTime')}
              </label>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="text-xs text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white cursor-pointer"
                  title="Swap"
                >
                  {t('swap')}
                </button>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <button
                  type="button"
                  onClick={handleSetNowEnd}
                  className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {t('setNow')}
                </button>
              </div>
            </div>

            {mode === 'datetime' && (
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full mb-2 px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm"
              />
            )}

            <div className="relative">
              <input
                id="end-time"
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium text-base focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all shadow-inner font-mono"
              />
            </div>
          </div>
        </div>

        {/* Options & Quick Presets */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
          {mode === 'time' && (
            <label className="flex items-center gap-2.5 cursor-pointer text-sm font-medium text-slate-700 dark:text-slate-300 select-none">
              <input
                type="checkbox"
                checked={crossesMidnight || isAutoOvernight}
                onChange={(e) => setCrossesMidnight(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded border-slate-300 dark:border-slate-700 dark:bg-slate-800 focus:ring-blue-500 cursor-pointer"
              />
              <span>
                {t('crossesMidnight')} {isAutoOvernight && !crossesMidnight ? '(Auto-detected)' : ''}
              </span>
            </label>
          )}

          {/* Quick hour presets */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
            <span className="font-semibold text-slate-400 dark:text-slate-500">{t('presets')}</span>
            <button
              onClick={() => handleAddHoursToEnd(1)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-100 hover:text-sky-700 dark:hover:bg-sky-950 dark:hover:text-sky-300 transition-colors font-medium cursor-pointer border border-transparent dark:border-slate-750"
            >
              {t('plus1Hour')}
            </button>
            <button
              onClick={() => handleAddHoursToEnd(4)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-100 hover:text-sky-700 dark:hover:bg-sky-950 dark:hover:text-sky-300 transition-colors font-medium cursor-pointer border border-transparent dark:border-slate-750"
            >
              {t('plus4Hours')}
            </button>
            <button
              onClick={() => handleAddHoursToEnd(8)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-100 hover:text-sky-700 dark:hover:bg-sky-950 dark:hover:text-sky-300 transition-colors font-medium cursor-pointer border border-transparent dark:border-slate-750"
            >
              {t('plus8Hours')}
            </button>
            <button
              onClick={() => handleAddHoursToEnd(8.5)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-sky-100 hover:text-sky-700 dark:hover:bg-sky-950 dark:hover:text-sky-300 transition-colors font-medium cursor-pointer border border-transparent dark:border-slate-750"
            >
              {t('plus8Point5Hours')}
            </button>
          </div>
        </div>

        {/* Primary Action Button */}
        <button
          type="button"
          onClick={handleCalculateClick}
          className="w-full py-3.5 sm:py-4 rounded-2xl bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 hover:from-sky-700 hover:via-blue-700 hover:to-indigo-700 text-white font-extrabold text-base sm:text-lg shadow-lg shadow-blue-500/25 active:scale-[0.99] transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
        >
          <Zap className="w-5 h-5 text-amber-300 group-hover:scale-110 transition-transform" />
          <span>{t('calculateTimeDifference')}</span>
          <Sparkles className="w-4 h-4 text-sky-200" />
        </button>

        {/* Result Showcase Card - Shown only on Calculate click */}
        {showResult && (
          <div
            id="result-section"
            className="scroll-mt-6 rounded-3xl border border-slate-200 dark:border-slate-750 bg-gradient-to-br from-slate-50 via-white to-sky-50/30 dark:from-slate-900 dark:via-slate-900 dark:to-slate-850 p-5 sm:p-8 space-y-6 shadow-sm animate-in fade-in slide-in-from-top-4 duration-300"
          >
            {/* Header info */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-600 dark:text-sky-400" />
                {t('calculatedResult')}
              </span>
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700">
                {effectiveOvernight ? t('overnightNextDay') : t('elapsedDuration')}
              </span>
            </div>

            {/* Primary Highlight */}
            <div className="text-center py-2 space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-sky-600 dark:text-sky-400 block">
                {t('howManyHoursMinutes')}
              </span>

              {/* Prominent Hours & Minutes */}
              <div className="flex flex-wrap items-baseline justify-center gap-x-3 gap-y-1 text-3xl sm:text-5xl font-black text-slate-900 dark:text-white font-mono">
                {result.days > 0 && (
                  <span className="inline-flex items-baseline gap-1">
                    {result.days} <span className="text-base sm:text-2xl font-bold font-sans text-sky-600 dark:text-sky-400">{t('days')}</span>
                  </span>
                )}
                <span className="inline-flex items-baseline gap-1">
                  {result.hours} <span className="text-base sm:text-2xl font-bold font-sans text-blue-600 dark:text-blue-400">{t('hours')}</span>
                </span>
                <span className="inline-flex items-baseline gap-1">
                  {result.minutes} <span className="text-base sm:text-2xl font-bold font-sans text-indigo-600 dark:text-indigo-400">{t('minutes')}</span>
                </span>
                {result.seconds > 0 && (
                  <span className="inline-flex items-baseline gap-1">
                    {result.seconds} <span className="text-base sm:text-2xl font-bold font-sans text-purple-600 dark:text-purple-400">{t('seconds')}</span>
                  </span>
                )}
              </div>

              {/* Secondary Badge: Decimal Hours & Total Minutes */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/80 border border-sky-200/80 dark:border-sky-900 text-sky-700 dark:text-sky-300 text-xs sm:text-sm font-bold font-mono">
                <span>{result.totalHours} {t('decimalHours')}</span>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <span>{result.totalMinutes.toLocaleString()} {t('minutes')}</span>
              </div>
            </div>

            {/* Granular Units Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-750 text-center shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  {t('decimalHours')}
                </span>
                <span className="text-base sm:text-xl font-bold text-slate-900 dark:text-sky-300 font-mono">
                  {result.totalHours}
                </span>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-750 text-center shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  {t('minutes')}
                </span>
                <span className="text-base sm:text-xl font-bold text-slate-900 dark:text-blue-300 font-mono">
                  {result.totalMinutes.toLocaleString()}
                </span>
              </div>

              <div className="p-3 sm:p-4 rounded-2xl bg-white dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-750 text-center shadow-sm">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  {t('seconds')}
                </span>
                <span className="text-base sm:text-xl font-bold text-slate-900 dark:text-indigo-300 font-mono">
                  {result.totalSeconds.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Friendly Sentence */}
            <div className="p-4 rounded-2xl bg-sky-50/80 dark:bg-sky-950/50 border border-sky-100 dark:border-sky-900/50 text-xs sm:text-sm text-sky-950 dark:text-sky-200 font-medium flex items-center gap-2">
              <ArrowRight className="w-4 h-4 flex-shrink-0 text-sky-600 dark:text-sky-400" />
              <span>{result.summaryText}</span>
            </div>

            {/* Visual Timeline Bar: portion of 24h day */}
            <div className="p-5 rounded-2xl bg-white/90 dark:bg-slate-800/90 border border-slate-200/90 dark:border-slate-750 space-y-3 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-slate-700 dark:text-slate-200">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  <span>24-Hour Day Representation</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-700 dark:text-sky-300 text-[11px] font-mono border border-sky-200/50 dark:border-sky-900">
                  {result.percentOfDay}% {t('portionOfDay')}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-3.5 rounded-full bg-slate-100 dark:bg-slate-900 overflow-hidden flex shadow-inner">
                <div
                  style={{ width: `${Math.min(100, result.percentOfDay)}%` }}
                  className="h-full bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 transition-all duration-700"
                  title={`${result.totalHours} hrs`}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-0.5">
                <span>00:00 (Midnight)</span>
                <span>12:00 (Noon)</span>
                <span>24:00 (End of Day)</span>
              </div>
            </div>

            {/* Copy and Share */}
            <ShareCopyBar formattedResult={shareText} />
          </div>
        )}
      </div>
    </div>
  );
}

