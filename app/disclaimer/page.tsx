import type { Metadata } from 'next';
import { AlertTriangle, Scale, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/seoConfig';

export const metadata: Metadata = {
  title: `Mathematical & Legal Disclaimer – ${SITE_CONFIG.name}`,
  description: `Mathematical and legal disclaimer for date, time, and business day calculations on ${SITE_CONFIG.name}.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/disclaimer`,
  },
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/70 border border-amber-200 dark:border-amber-900/50 text-amber-700 dark:text-amber-300 text-xs font-semibold">
          <AlertTriangle className="w-3.5 h-3.5" />
          <span>Transparency & Limits</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Mathematical Disclaimer
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last Updated: September 2026
        </p>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-6 text-slate-600 dark:text-slate-300">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. General Information Purpose</h2>
          <p>
            The calculations, date intervals, working day estimates, and countdown results provided on {SITE_CONFIG.name} are offered for informational, planning, and educational purposes. While we maintain rigorous automated testing to eliminate mathematical defects, calculations should be independently verified when making critical legal, financial, immigration, or medical decisions.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Calendar System Limitations</h2>
          <p>
            All calculations operate under the internationally recognized <strong>Gregorian Calendar</strong>. If you are calculating historical dates prior to October 15, 1582 (or prior to 1752 in Great Britain and its colonies), note that historical calendar reforms (Julian to Gregorian transition) caused chronological shifts that are not modeled by modern standard date libraries.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Public Holidays & Business Day Conventions</h2>
          <p>
            Our Business Days Calculator accounts for standard statutory public holidays. However, public holidays vary significantly across countries, states, municipal jurisdictions, and specific collective bargaining agreements. Furthermore:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Bank holidays may differ from corporate holidays.</li>
            <li>Government entities may observe substitute holidays on Mondays when a fixed holiday falls on a weekend.</li>
            <li>Local religious or regional bank holidays may not be included in default lists.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Legal & Filing Deadlines</h2>
          <p>
            Courts, patent offices, tax revenue agencies, and immigration authorities frequently enforce specific statutory rules for calculating deadlines (e.g. Rule 6 of the Federal Rules of Civil Procedure in the United States). In many jurisdictions, if a filing deadline lands on a weekend or court holiday, the deadline rolls over to the next business day. Users are advised to review relevant procedural rules or consult qualified counsel for time-sensitive filings.
          </p>
        </section>
      </div>
    </div>
  );
}

