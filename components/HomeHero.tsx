'use client';

import { Zap } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

export default function HomeHero() {
  const { t } = useLanguage();

  return (
    <div className="text-center max-w-3xl mx-auto space-y-2.5 pt-0 sm:pt-1 pb-1">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold">
        <Zap className="w-3.5 h-3.5" />
        <span>{t('headlineTag')}</span>
      </div>

      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
        {t('h1TitlePart1')}{' '}
        <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {t('h1TitlePart2')}
        </span>
      </h1>

      <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
        {t('heroSub')}
      </p>
    </div>
  );
}

