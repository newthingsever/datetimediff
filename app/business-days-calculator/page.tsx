import { Suspense } from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import BusinessDaysCalculator from '@/components/calculators/BusinessDaysCalculator';
import AdPlaceholder from '@/components/AdPlaceholder';
import SeoContentSection from '@/components/SeoContentSection';
import { CALCULATORS_CATALOG, generateCalculatorSchema, generateFaqSchema, generateBreadcrumbSchema, SITE_CONFIG } from '@/lib/seoConfig';

const meta = CALCULATORS_CATALOG['business-days-calculator'];

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: `${SITE_CONFIG.url}/business-days-calculator`,
  },
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: `${SITE_CONFIG.url}/business-days-calculator`,
  },
};

export default function BusinessDaysPage() {
  const webAppSchema = generateCalculatorSchema('business-days-calculator');
  const faqSchema = generateFaqSchema(meta.faqs);
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: SITE_CONFIG.url },
    { name: meta.h1, url: `${SITE_CONFIG.url}/business-days-calculator` },
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

      <div className="space-y-8">
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 overflow-x-auto whitespace-nowrap py-1">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 opacity-50 flex-shrink-0" />
          <span className="text-slate-900 dark:text-slate-200 font-semibold">{meta.h1}</span>
        </nav>

        <div className="text-center max-w-3xl mx-auto space-y-3 px-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {meta.h1}
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400">
            {meta.description}
          </p>
        </div>

        <div className="max-w-4xl mx-auto w-full">
          <Suspense fallback={<div className="h-96 w-full rounded-3xl bg-slate-100 dark:bg-slate-900 animate-pulse" />}>
            <BusinessDaysCalculator />
          </Suspense>
        </div>

        <AdPlaceholder slotType="horizontal" adSlotId="biz-days-banner" />

        <SeoContentSection
          toolName={meta.h1}
          faqs={meta.faqs}
          guideTitle="Calculating Business & Working Days"
        />
      </div>
    </>
  );
}

