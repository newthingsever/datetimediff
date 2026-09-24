'use client';

import { useState } from 'react';
import { Sparkles, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface ExplainResultProps {
  explanation: string;
  weekdayCount: number;
  weekendDayCount: number;
  totalDays: number;
  years: number;
  months: number;
  days: number;
}

export default function ExplainResult({
  explanation,
  weekdayCount,
  weekendDayCount,
  totalDays,
  years,
  months,
  days,
}: ExplainResultProps) {
  const [isOpen, setIsOpen] = useState(true);
  const { t } = useLanguage();

  const weekdayPercent = totalDays > 0 ? Math.round((weekdayCount / totalDays) * 100) : 0;
  const weekendPercent = totalDays > 0 ? 100 - weekdayPercent : 0;

  return (
    <div className="mt-5 rounded-2xl border border-blue-100 dark:border-slate-750 bg-gradient-to-b from-blue-50/50 to-indigo-50/30 dark:from-slate-900 dark:to-slate-850 overflow-hidden transition-all shadow-sm">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-blue-100/40 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-600 text-white shadow-sm">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-semibold text-sm text-slate-900 dark:text-white block">
              {t('explainMyResult')}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {t('explainSub')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs text-blue-600 dark:text-blue-400 font-medium">
          <span>{isOpen ? t('collapse') : t('expand')}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-4 pb-4 pt-1 space-y-4 border-t border-blue-100/60 dark:border-slate-750">
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            {explanation}
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-750 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {t('workdays')}
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {weekdayCount.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{weekdayPercent}% {t('ofPeriod')}</span>
            </div>

            <div className="p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-750 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {t('weekends')}
              </span>
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                {weekendDayCount.toLocaleString()}
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">{weekendPercent}% {t('ofPeriod')}</span>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-white dark:bg-slate-800/90 border border-slate-200/80 dark:border-slate-750 shadow-sm">
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">
                {t('calendarFit')}
              </span>
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                {years > 0 ? `${years}${t('year').slice(0, 1).toLowerCase()} ` : ''}{months}{t('month').slice(0, 1).toLowerCase()} {days}{t('day').slice(0, 1).toLowerCase()}
              </span>
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5 font-medium">
                <CheckCircle2 className="w-3 h-3" /> {t('exactGregorian')}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
