import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Clock, Zap, Shield, HelpCircle, CheckCircle2 } from 'lucide-react';
import TimeDifferenceCalculator from '@/components/calculators/TimeDifferenceCalculator';
import AdPlaceholder from '@/components/AdPlaceholder';
import SeoContentSection from '@/components/SeoContentSection';
import { CALCULATORS_CATALOG, generateCalculatorSchema, generateFaqSchema, generateBreadcrumbSchema, SITE_CONFIG } from '@/lib/seoConfig';

const meta = CALCULATORS_CATALOG['time-difference-calculator'];

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  keywords: [
    'time difference calculator',
    'hours between two times',
    'elapsed time calculator',
    'hours and minutes calculator',
    'decimal hours for payroll',
    'overnight shift calculator',
    'timesheet hours counter',
  ],
  alternates: {
    canonical: `${SITE_CONFIG.url}/time-difference-calculator`,
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${SITE_CONFIG.url}/time-difference-calculator`,
    siteName: SITE_CONFIG.name,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: meta.title,
    description: meta.description,
  },
};

export default function TimeDifferencePage() {
  const webAppSchema = generateCalculatorSchema('time-difference-calculator');
  const faqSchema = generateFaqSchema(meta.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: meta.h1, url: `${SITE_CONFIG.url}/time-difference-calculator` },
  ]);

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
      {breadcrumbSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      )}

      <div className="space-y-8 sm:space-y-10">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50" />
          <span className="text-slate-900 dark:text-slate-200 font-semibold">{meta.h1}</span>
        </nav>

        {/* Hero Section */}
        <div className="text-center max-w-3xl mx-auto space-y-2.5 pt-0 sm:pt-1 pb-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/70 border border-sky-200 dark:border-sky-900/50 text-sky-700 dark:text-sky-300 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Fast, Free & Decimal Hours Ready</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 dark:text-white leading-tight">
            How Many Hours and Minutes <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">Between Two Times</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {meta.description}
          </p>
        </div>

        {/* The Calculator */}
        <div className="max-w-4xl mx-auto">
          <Suspense fallback={<div className="h-96 w-full rounded-3xl bg-slate-100 dark:bg-slate-900 animate-pulse" />}>
            <TimeDifferenceCalculator />
          </Suspense>
        </div>

        {/* Ad Placeholder */}
        <AdPlaceholder slotType="horizontal" adSlotId="time-page-banner" />

        {/* Comprehensive SEO Content & FAQ Section */}
        <SeoContentSection
          toolName={meta.h1}
          faqs={meta.faqs}
          guideTitle="How to Calculate Elapsed Time & Decimal Hours (Formulas & Tables)"
          guideContent={
            <div className="space-y-6">
              <p>
                Calculating the exact time difference between two timestamps is fundamental for employee timesheets, contractor billing, travel durations, and fitness logs. Our <strong>Time Difference Calculator</strong> automatically handles both same-day spans and overnight shifts crossing midnight.
              </p>

              {/* The Overnight Shift Math */}
              <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  How Overnight Shifts (Crossing Midnight) are Calculated
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  When a shift begins in the evening (e.g. 10:00 PM / 22:00) and ends the next morning (e.g. 6:30 AM / 06:30), subtracting directly yields a negative value. The standard mathematical correction adds 24 hours (1,440 minutes) to the end timestamp:
                </p>
                <div className="p-3 rounded-xl bg-white dark:bg-slate-900 font-mono text-xs text-blue-700 dark:text-blue-300">
                  Total Minutes = (End Hours × 60 + End Minutes + 1440) – (Start Hours × 60 + Start Minutes)
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  For 22:00 to 06:30: (6.5 × 60 + 1440) – (22 × 60) = (390 + 1440) – 1320 = 1830 – 1320 = <strong>510 minutes = 8 hours and 30 minutes</strong>.
                </p>
              </div>

              {/* Decimal Hours Reference Table */}
              <div className="space-y-3">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Quick Decimal Hours Conversion Reference (For Payroll & Timesheets)
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  Payroll systems multiply hourly wage by decimal hours rather than hours and minutes. Below is the standard conversion reference:
                </p>
                <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold">
                      <tr>
                        <th className="p-3">Minutes</th>
                        <th className="p-3">Fraction of Hour</th>
                        <th className="p-3">Decimal Hours</th>
                        <th className="p-3">Example: 8 Hours + Minutes</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800 text-slate-600 dark:text-slate-300">
                      <tr>
                        <td className="p-3 font-semibold">15 Minutes</td>
                        <td className="p-3">15 / 60</td>
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">0.25 hrs</td>
                        <td className="p-3">8.25 hrs</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">30 Minutes</td>
                        <td className="p-3">30 / 60</td>
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">0.50 hrs</td>
                        <td className="p-3">8.50 hrs</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">45 Minutes</td>
                        <td className="p-3">45 / 60</td>
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">0.75 hrs</td>
                        <td className="p-3">8.75 hrs</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-semibold">60 Minutes</td>
                        <td className="p-3">60 / 60</td>
                        <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400">1.00 hrs</td>
                        <td className="p-3">9.00 hrs</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Related Tools Links */}
              <div className="pt-2">
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Need to calculate multi-day spans? Switch to our flagship <Link href="/date-difference-calculator" className="text-blue-600 dark:text-blue-400 underline font-semibold">Date Difference Calculator</Link> or count business days with the <Link href="/business-days-calculator" className="text-blue-600 dark:text-blue-400 underline font-semibold">Business Days Calculator</Link>.
                </p>
              </div>
            </div>
          }
        />
      </div>
    </>
  );
}
