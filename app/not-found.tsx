import Link from 'next/link';
import { Calendar, ArrowLeft, Clock, Sparkles, Calculator, Briefcase, Home } from 'lucide-react';

export default function NotFound() {
  const POPULAR_TOOLS = [
    {
      title: 'Date Difference Calculator',
      href: '/date-difference-calculator',
      desc: 'Calculate years, months, and days between two dates.',
      icon: Calendar,
      color: 'blue',
    },
    {
      title: 'Days Between Dates',
      href: '/days-between-dates',
      desc: 'Count total calendar days and business days.',
      icon: Clock,
      color: 'emerald',
    },
    {
      title: 'Exact Age Calculator',
      href: '/age-calculator',
      desc: 'Calculate exact age down to days and birthday countdown.',
      icon: Sparkles,
      color: 'purple',
    },
    {
      title: 'Business Days Calculator',
      href: '/business-days-calculator',
      desc: 'Calculate working days excluding weekends and holidays.',
      icon: Briefcase,
      color: 'cyan',
    },
  ];

  return (
    <div className="max-w-3xl mx-auto py-12 sm:py-16 text-center space-y-8">
      {/* 404 Badge */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-red-50 dark:bg-red-950/60 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 text-xs font-bold tracking-wider uppercase">
        <span>404 Error • Page Not Found</span>
      </div>

      <div className="space-y-3">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-slate-900 dark:text-white">
          Lost in Time?
        </h1>
        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          The page or date calculator you are looking for doesn't exist, was moved, or has an invalid URL.
        </p>
      </div>

      {/* Return Home Button */}
      <div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-sm shadow-md shadow-blue-500/20 active:scale-95 transition-all"
        >
          <Home className="w-4 h-4" />
          <span>Back to Home Calculator</span>
        </Link>
      </div>

      {/* Recommended Calculators */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 text-left space-y-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400 text-center">
          Popular Date & Time Calculators
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {POPULAR_TOOLS.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700/60 shadow-sm hover:shadow transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {tool.desc}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

