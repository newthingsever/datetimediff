import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight, Clock, Zap, Shield, HelpCircle } from 'lucide-react';
import TimeDifferenceCalculator from '@/components/calculators/TimeDifferenceCalculator';
import AdPlaceholder from '@/components/AdPlaceholder';
import SeoContentSection from '@/components/SeoContentSection';
import { CALCULATORS_CATALOG, generateCalculatorSchema, generateFaqSchema, generateBreadcrumbSchema, SITE_CONFIG } from '@/lib/seoConfig';

const meta = CALCULATORS_CATALOG['time-difference-calculator'];

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: `${SITE_CONFIG.url}/time-difference-calculator`,
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${SITE_CONFIG.url}/time-difference-calculator`,
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
          guideTitle="How to Calculate Time Differences and Decimal Hours"
        />
      </div>
    </>
  );
}

