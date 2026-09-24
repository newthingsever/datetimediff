import type { Metadata } from 'next';
import Link from 'next/link';
import { Calendar, ShieldCheck, Zap, Lock, Award, Heart, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/seoConfig';

export const metadata: Metadata = {
  title: `About Us – ${SITE_CONFIG.name} Free Calculator Platform`,
  description: `Learn about ${SITE_CONFIG.name}, our mission to provide the world's fastest, 100% private, no-registration date and time calculators built with deterministic math.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/about`,
  },
};

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-4">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
          <span>Our Mission & Standards</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          About <span className="text-blue-600 dark:text-blue-400">{SITE_CONFIG.name}</span>
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          We built {SITE_CONFIG.name} with a simple conviction: modern web utilities should be instant, elegant, accurate, and completely respect user privacy.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Zero Server Latency</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            Every date arithmetic calculation occurs 100% locally in your web browser. No waiting on round-trip API server requests or loading spinners.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Lock className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">No Login & 100% Private</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            You don’t need an account, password, or email subscription to use our calculators. Your entered dates never leave your device.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-2xl bg-purple-50 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400 flex items-center justify-center">
            <Award className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">Deterministic Math</h2>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
            We do not rely on generative AI approximations for calculation. All date intervals strictly follow the international Gregorian calendar and ISO-8601 standards.
          </p>
        </div>
      </div>

      {/* Story & Mathematical Rigor */}
      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-6">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
          Why We Built a Better Calculator
        </h2>
        <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
          <p>
            Traditional date duration calculators on the internet were designed in the early 2000s. They are often cluttered with distracting popups, intrusive surveys, slow page reloads, and clunky user interfaces that are frustrating to navigate on smartphones.
          </p>
          <p>
            {SITE_CONFIG.name} was engineered from scratch using modern web technologies (Next.js, TypeScript, and responsive CSS) to provide a clean, distraction-free experience. When you need to calculate project deadlines, visa stays, loan tenures, or simply find out how many days exist between two dates, you get your answer in milliseconds.
          </p>

          <h3 className="text-lg font-bold text-slate-900 dark:text-white pt-4">
            How We Handle Calendar Edge Cases
          </h3>
          <ul className="space-y-2 list-none pl-0">
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <span><strong>Leap Year Accuracy:</strong> Automatically adjusts for leap years divisible by 4, century non-leap years (1900, 2100), and 400-year leap rules (2000, 2400).</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <span><strong>Daylight Saving & Timezone Neutrality:</strong> All calendar calculations utilize normalized UTC timestamps, preventing 23-hour or 25-hour DST day discrepancies.</span>
            </li>
            <li className="flex items-start gap-2.5">
              <CheckCircle2 className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
              <span><strong>Elapsed vs Inclusive Precision:</strong> Clear distinction between elapsed 24-hour durations and inclusive calendar day counts.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Explore tools call to action */}
      <div className="text-center p-8 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white space-y-4">
        <h3 className="text-xl sm:text-2xl font-black">Ready to calculate?</h3>
        <p className="text-blue-100 text-sm max-w-md mx-auto">
          Explore our suite of free online date and time calculators.
        </p>
        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/date-difference-calculator"
            className="px-5 py-2.5 rounded-xl bg-white text-blue-700 font-bold text-sm shadow-md hover:bg-blue-50 transition-colors"
          >
            Date Difference Calculator
          </Link>
          <Link
            href="/age-calculator"
            className="px-5 py-2.5 rounded-xl bg-white/20 text-white font-bold text-sm hover:bg-white/30 transition-colors"
          >
            Age Calculator
          </Link>
        </div>
      </div>
    </div>
  );
}

