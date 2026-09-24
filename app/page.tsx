import { Suspense } from 'react';
import Link from 'next/link';
import { Sparkles, Calendar, Clock, Cake, Briefcase, Calculator, ArrowRight, ShieldCheck, Zap } from 'lucide-react';
import DateDifferenceCalculator from '@/components/calculators/DateDifferenceCalculator';
import HomeHero from '@/components/HomeHero';
import AdPlaceholder from '@/components/AdPlaceholder';
import SeoContentSection from '@/components/SeoContentSection';
import { CALCULATORS_CATALOG, generateCalculatorSchema, generateFaqSchema } from '@/lib/seoConfig';

const meta = CALCULATORS_CATALOG['date-difference-calculator'];

export default function HomePage() {
  const webAppSchema = generateCalculatorSchema('date-difference-calculator');
  const faqSchema = generateFaqSchema(meta.faqs);

  const OTHER_TOOLS = [
    {
      title: 'Time Difference',
      slug: '/time-difference-calculator',
      desc: 'Calculate exact elapsed hours, minutes, and decimal work hours.',
      icon: Clock,
      color: 'sky',
      badge: 'New',
    },
    {
      title: 'Days Between Dates',
      slug: '/days-between-dates',
      desc: 'Count total calendar days, working days, and weekends.',
      icon: Clock,
      color: 'emerald',
      badge: 'Popular',
    },
    {
      title: 'Exact Age Calculator',
      slug: '/age-calculator',
      desc: 'Calculate exact age in years, months, and days with birthday countdown.',
      icon: Cake,
      color: 'purple',
      badge: 'Essential',
    },
    {
      title: 'Add / Subtract Days',
      slug: '/date-calculator',
      desc: 'Add or subtract days, weeks, months, or years from any date.',
      icon: Calculator,
      color: 'amber',
      badge: 'Utility',
    },
    {
      title: 'Business Days Calculator',
      slug: '/business-days-calculator',
      desc: 'Calculate working business days, excluding weekends and holidays.',
      icon: Briefcase,
      color: 'cyan',
      badge: 'Work',
    },
  ];

  return (
    <>
      {webAppSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
        />
      )}
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="space-y-8 sm:space-y-10">
        {/* Hero Headline */}
        <HomeHero />

        {/* The Flagship Calculator */}
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<div className="h-96 w-full rounded-3xl bg-slate-100 dark:bg-slate-900 animate-pulse" />}>
            <DateDifferenceCalculator />
          </Suspense>
        </div>

        {/* CLS-safe AdSense Container */}
        <AdPlaceholder slotType="horizontal" adSlotId="home-leaderboard" />

        {/* Other Calculators Directory */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Calculator Ecosystem
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
                More Date & Time Calculators
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Specialized tools for every date calculation scenario
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {OTHER_TOOLS.map((tool) => {
              const Icon = tool.icon;
              return (
                <Link
                  key={tool.slug}
                  href={tool.slug}
                  className="group relative p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700/60 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="p-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500">
                        {tool.badge}
                      </span>
                    </div>

                    <h3 className="font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {tool.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <span>Open Calculator</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* SEO Editorial Content & FAQ Section */}
        <SeoContentSection
          toolName="Date Difference Calculator"
          faqs={meta.faqs}
          guideTitle="How Date Difference Calculations Work"
        />
      </div>
    </>
  );
}
