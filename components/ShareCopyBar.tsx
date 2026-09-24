'use client';

import { useState } from 'react';
import { Copy, Check, Share2 } from 'lucide-react';
import { useLanguage } from '@/lib/i18n';

interface ShareCopyBarProps {
  formattedResult: string;
  shareUrl?: string;
}

export default function ShareCopyBar({ formattedResult, shareUrl }: ShareCopyBarProps) {
  const [copiedResult, setCopiedResult] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const { t } = useLanguage();

  const handleCopyResult = async () => {
    try {
      await navigator.clipboard.writeText(formattedResult);
      setCopiedResult(true);
      setTimeout(() => setCopiedResult(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleShareLink = async () => {
    const url = shareUrl || (typeof window !== 'undefined' ? window.location.href : '');
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Date Calculation Result',
          text: formattedResult,
          url,
        });
      } else {
        await navigator.clipboard.writeText(url);
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
      }
    } catch {
      // User cancelled share
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
      <button
        onClick={handleCopyResult}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-transparent dark:border-slate-750 cursor-pointer"
        title="Copy full calculation breakdown to clipboard"
      >
        {copiedResult ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-500" />
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">{t('copied')}</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>{t('copyResult')}</span>
          </>
        )}
      </button>

      <button
        onClick={handleShareLink}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-transparent dark:border-slate-750 cursor-pointer"
        title="Share link with prefilled calculation"
      >
        {copiedLink ? (
          <>
            <Check className="w-3.5 h-3.5 text-blue-500" />
            <span className="text-blue-600 dark:text-blue-400 font-semibold">{t('linkCopied')}</span>
          </>
        ) : (
          <>
            <Share2 className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
            <span>{t('shareLink')}</span>
          </>
        )}
      </button>
    </div>
  );
}
