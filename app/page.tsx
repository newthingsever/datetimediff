import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { Sparkles, Calendar, Clock, Cake, Briefcase, Calculator, ArrowRight, ShieldCheck, Zap, CheckCircle2, HelpCircle } from 'lucide-react';
import DateDifferenceCalculator from '@/components/calculators/DateDifferenceCalculator';
import HomeHero from '@/components/HomeHero';
import AdPlaceholder from '@/components/AdPlaceholder';
import SeoContentSection from '@/components/SeoContentSection';
import { 
  CALCULATORS_CATALOG, 
  generateCalculatorSchema, 
  generateFaqSchema,
  generateWebsiteSchema,
  generateOrganizationSchema,
  SITE_CONFIG 
} from '@/lib/seoConfig';

const meta = CALCULATORS_CATALOG['date-difference-calculator'];

export const metadata: Metadata = {
  title: 'Date Difference Calculator – Calculate Years, Months & Days Between Dates',
  description: 'Calculate the exact difference between two dates in years, months, days, weeks, and hours. 100% free, leap-year accurate, and private date calculator.',
  keywords: [
    'date difference calculator',
    'how many days between two dates',
    'calculate days between dates',
    'years months days between dates',
    'elapsed days calculator',
    'date duration calculator',
    'inclusive dates counter',
  ],
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  openGraph: {
    title: 'Date Difference Calculator – Calculate Years, Months & Days Between Dates',
    description: 'Calculate the exact difference between two dates in years, months, days, weeks, and hours. 100% free, leap-year accurate, and private date calculator.',
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Date Difference Calculator – Calculate Years, Months & Days Between Dates',
    description: 'Calculate the exact difference between two dates in years, months, days, weeks, and hours. 100% free and instant.',
  },
};

export default function HomePage() {
  const webAppSchema = generateCalculatorSchema('date-difference-calculator');
  const faqSchema = generateFaqSchema(meta.faqs);
  const websiteSchema = generateWebsiteSchema();
  const orgSchema = generateOrganizationSchema();

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
      {websiteSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      )}
      {orgSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
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

        {/* SEO Editorial Content & Comprehensive Calculation Guide */}
        <SeoContentSection
          toolName="Date Difference Calculator"
          faqs={meta.faqs}
          guideTitle="How Date Difference Calculations Work (Formulas & Rules)"
          guideContent={
            <div className="space-y-6">
              <p>
                Calculating the exact duration between two dates requires more than simple subtraction. Because calendar months have varying lengths (28, 29, 30, or 31 days) and solar years include periodic leap days, our <strong>Date Difference Calculator</strong> executes deterministic calendar arithmetic in UTC to ensure millisecond-precise, verified results.
              </p>

              {/* Comparative Table: Elapsed vs Inclusive */}
              <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
                    <tr>
                      <th className="p-3.5">Method</th>
                      <th className="p-3.5">Formula</th>
                      <th className="p-3.5">Example (Oct 1 to Oct 5)</th>
                      <th className="p-3.5">Common Industry Use</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                    <tr>
                      <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Elapsed Days (Default)</td>
                      <td className="p-3.5 font-mono text-xs">End Date – Start Date</td>
                      <td className="p-3.5"><strong>4 days</strong> (96 hours passed)</td>
                      <td className="p-3.5">Interest calculations, age, project duration</td>
                    </tr>
                    <tr>
                      <td className="p-3.5 font-semibold text-slate-900 dark:text-white">Inclusive Days (+1 Day)</td>
                      <td className="p-3.5 font-mono text-xs">End Date – Start Date + 1</td>
                      <td className="p-3.5"><strong>5 calendar days</strong> (Oct 1, 2, 3, 4, 5)</td>
                      <td className="p-3.5">Hotel stays, event passes, visa limits, rentals</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Gregorian Calendar Rules */}
              <div className="space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  The Gregorian Leap Year Algorithm
                </h3>
                <p>
                  The modern international calendar (Gregorian) establishes that a year is a leap year (366 days instead of 365) according to three strict mathematical rules:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm">
                  <li><strong>Rule 1:</strong> Any year evenly divisible by 4 is a leap year (e.g., 2024, 2028).</li>
                  <li><strong>Rule 2:</strong> However, if the year is divisible by 100, it is <em>not</em> a leap year (e.g., 1900, 2100).</li>
                  <li><strong>Rule 3:</strong> Unless the year is also evenly divisible by 400, in which case it <em>is</em> a leap year (e.g., 1600, 2000, 2400).</li>
                </ul>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Our calculation engine deterministically applies these rules, correctly incorporating February 29 whenever the selected date range spans a leap day.
                </p>
              </div>

              {/* Real World Applications */}
              <div className="space-y-3 pt-2">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Practical Real-World Use Cases
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Visa & Immigration Limitations</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      International visas like the European Schengen 90/180-day rule count total elapsed days. An inaccurate calculation can lead to overstay penalties.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Employment Notice & Statutory Periods</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Contract terminations, lease agreements, and statutory legal notices typically require exact 30, 60, or 90 calendar day windows.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Working Days & Deadlines</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      When counting delivery time or business SLAs, pair your date difference with our <Link href="/business-days-calculator" className="text-blue-600 dark:text-blue-400 underline font-semibold">Business Days Calculator</Link> to exclude weekends.
                    </p>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                    <h4 className="font-semibold text-slate-900 dark:text-white text-sm">Shift Work & Payroll Hours</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      For hourly shifts and overnight time tracking, use our dedicated <Link href="/time-difference-calculator" className="text-blue-600 dark:text-blue-400 underline font-semibold">Time Difference Calculator</Link> with decimal wage hours.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}
