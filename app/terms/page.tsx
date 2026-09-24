import type { Metadata } from 'next';
import { FileText, CheckCircle2 } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/seoConfig';

export const metadata: Metadata = {
  title: `Terms of Service – ${SITE_CONFIG.name}`,
  description: `Terms of Service for using ${SITE_CONFIG.name} calculators and web utilities.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/terms`,
  },
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <FileText className="w-3.5 h-3.5" />
          <span>Legal Agreement</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Terms of Service
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last Updated: September 2026
        </p>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-6 text-slate-600 dark:text-slate-300">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing or using {SITE_CONFIG.name} ({SITE_CONFIG.url}), you agree to be bound by these Terms of Service. If you do not agree to these terms, please discontinue use of the website immediately.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Permitted Use</h2>
          <p>
            {SITE_CONFIG.name} provides free date, time, and calendar calculation tools for personal, educational, professional, and commercial reference. You are granted a non-exclusive, revocable license to access and calculate dates through our web interface.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Prohibited Activities</h2>
          <p>When using our site, you agree not to:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Attempt to disrupt, overload, or attack our hosting infrastructure via denial-of-service (DoS) or automated scrapers.</li>
            <li>Misrepresent calculation results for fraudulent, unlawful, or deceptive practices.</li>
            <li>Frame or hotlink portions of the application without attribution.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Intellectual Property</h2>
          <p>
            The branding, design, visual elements, graphics, layout, and calculation implementation code are the intellectual property of {SITE_CONFIG.name} and are protected under international copyright laws.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. Disclaimer of Warranties</h2>
          <p>
            The service is provided &ldquo;as is&rdquo; and &ldquo;as available&rdquo; without warranties of any kind, whether express or implied. Please review our <a href="/disclaimer" className="text-blue-600 dark:text-blue-400 hover:underline">Mathematical Disclaimer</a> for detailed information regarding official deadlines and legal durations.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">6. Contact Information</h2>
          <p>
            If you have questions regarding these terms, you may contact us at <a href="mailto:legal@datetimediff.com" className="text-blue-600 dark:text-blue-400 hover:underline">legal@datetimediff.com</a>.
          </p>
        </section>
      </div>
    </div>
  );
}

