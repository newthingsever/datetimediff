import Link from 'next/link';
import { Metadata } from 'next';
import { Calendar, Clock, Sparkles, Calculator, Briefcase, FileText, Shield, HelpCircle, Code } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/seoConfig';

export const metadata: Metadata = {
  title: 'Sitemap – DateGap Calculators Directory',
  description: 'Complete directory of all free date, days, age, and business calculators on DateGap.',
  alternates: {
    canonical: `${SITE_CONFIG.url}/sitemap`,
  },
};

export default function SitemapPage() {
  const CALCULATOR_PAGES = [
    {
      name: 'Date Difference Calculator',
      href: '/date-difference-calculator',
      desc: 'Calculate exact years, months, days, weeks, and hours between two dates.',
      icon: Calendar,
      priority: '1.0',
    },
    {
      name: 'Time Difference Calculator',
      href: '/time-difference-calculator',
      desc: 'Calculate exact hours, minutes, seconds, and decimal work hours between two times.',
      icon: Clock,
      priority: '0.9',
    },
    {
      name: 'Days Between Dates',
      href: '/days-between-dates',
      desc: 'Count total calendar days, working days, and weekends between two dates.',
      icon: Clock,
      priority: '0.9',
    },
    {
      name: 'Exact Age Calculator',
      href: '/age-calculator',
      desc: 'Calculate precise age in years, months, and days with next birthday countdown.',
      icon: Sparkles,
      priority: '0.8',
    },
    {
      name: 'Date Add / Subtract Calculator',
      href: '/date-calculator',
      desc: 'Add or subtract days, weeks, months, or years from any date.',
      icon: Calculator,
      priority: '0.8',
    },
    {
      name: 'Business Days Calculator',
      href: '/business-days-calculator',
      desc: 'Calculate workdays between dates excluding weekends and public holidays.',
      icon: Briefcase,
      priority: '0.8',
    },
  ];

  const LEGAL_PAGES = [
    { name: 'About DateGap', href: '/about', desc: 'Our mission, architecture, and engineering principles.', icon: HelpCircle },
    { name: 'Contact & Support', href: '/contact', desc: 'Get in touch for questions, bug reports, and suggestions.', icon: FileText },
    { name: 'Privacy Policy', href: '/privacy-policy', desc: '100% private, client-side only calculation policy.', icon: Shield },
    { name: 'Terms of Service', href: '/terms', desc: 'Terms governing the use of DateGap web utilities.', icon: FileText },
    { name: 'Disclaimer', href: '/disclaimer', desc: 'Legal and mathematical calculation disclaimers.', icon: FileText },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-10 py-4">
      <div className="space-y-3 border-b border-slate-200 dark:border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <span>Website Directory</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900 dark:text-white">
          DateGap HTML Sitemap
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
          A comprehensive directory of all online date, time, and calendar calculation tools available on DateGap.
        </p>
        <div className="pt-2">
          <Link
            href="/sitemap.xml"
            target="_blank"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <Code className="w-3.5 h-3.5" />
            <span>View Machine-Readable XML Sitemap (/sitemap.xml)</span>
          </Link>
        </div>
      </div>

      {/* Calculators Group */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <span>Calculators & Tools</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {CALCULATOR_PAGES.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-blue-300 dark:hover:border-blue-700/60 shadow-sm hover:shadow transition-all group"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.name}
                      </h3>
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {item.priority}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Trust & Legal Group */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          <span>About & Legal</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {LEGAL_PAGES.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}

