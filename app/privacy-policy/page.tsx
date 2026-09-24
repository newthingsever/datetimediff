import type { Metadata } from 'next';
import { Lock, Shield, EyeOff, ServerOff, FileCheck } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/seoConfig';

export const metadata: Metadata = {
  title: `Privacy Policy – ${SITE_CONFIG.name}`,
  description: `Privacy Policy for ${SITE_CONFIG.name}. Learn why our calculators are 100% private, require no account, and perform all date calculations directly in your browser.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/privacy-policy`,
  },
};

export default function PrivacyPolicyPage() {
  const lastUpdated = 'September 2026';

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-4">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/70 border border-emerald-200 dark:border-emerald-900/50 text-emerald-700 dark:text-emerald-300 text-xs font-semibold">
          <Lock className="w-3.5 h-3.5" />
          <span>Privacy by Design</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Last Updated: {lastUpdated} • Effective Immediately
        </p>
      </div>

      <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50/50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/50 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="p-3 rounded-2xl bg-emerald-600 text-white flex-shrink-0">
          <ServerOff className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-base font-bold text-emerald-950 dark:text-emerald-200">
            Our Core Privacy Commitment: Zero Server Data Processing
          </h2>
          <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300 mt-1">
            When you enter your dates of birth, project milestones, or personal dates into {SITE_CONFIG.name}, they are processed entirely in your web browser memory using client-side JavaScript. No dates are sent to, stored on, or analyzed by our web servers.
          </p>
        </div>
      </div>

      <div className="p-8 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 prose dark:prose-invert max-w-none text-sm sm:text-base leading-relaxed space-y-6 text-slate-600 dark:text-slate-300">
        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">1. Information We Do NOT Collect</h2>
          <p>Unlike many online tools, {SITE_CONFIG.name} is designed as a zero-login, registration-free utility. Consequently, we do not collect:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Your name, email address, physical address, or phone number.</li>
            <li>User account credentials or login passwords.</li>
            <li>The specific calendar dates you choose to calculate (birthdays, anniversary dates, contracts).</li>
            <li>Calculation outcomes or personal notes.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">2. Technical & Aggregate Analytics</h2>
          <p>
            To understand global website performance, monitor server load, and detect browser rendering errors, we may collect standard anonymous web traffic telemetry. This includes:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Browser type and operating system version (e.g. Chrome on Windows, Safari on iOS).</li>
            <li>Screen resolution and device category (Mobile, Tablet, Desktop) to optimize UI touch targets.</li>
            <li>Referring webpage and country-level geographic region.</li>
            <li>Time spent on site and total daily pageviews.</li>
          </ul>
          <p>This diagnostic information is processed solely in aggregate and cannot be used to personally identify you.</p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">3. Cookies and Local Storage</h2>
          <p>
            {SITE_CONFIG.name} does not use tracking cookies to follow your activity across the internet. We may utilize your browser’s standard <code>localStorage</code> purely to remember your theme preference (Light Mode vs Dark Mode).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">4. Advertising & Third-Party Services</h2>
          <p>
            To sustain free access to our tools without subscriptions, we may display unobtrusive third-party banner advertisements (such as Google AdSense). These third-party advertising partners may use non-personalized cookies or web beacons to measure ad effectiveness in accordance with their respective privacy disclosures.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">5. GDPR & CCPA Compliance</h2>
          <p>
            Because we do not store, process, or sell personal identifiers or user databases, {SITE_CONFIG.name} intrinsically respects data minimization principles outlined in the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">6. Changes to this Policy</h2>
          <p>
            Any future revisions to our privacy practices will be posted directly to this page with an updated modification timestamp.
          </p>
        </section>
      </div>
    </div>
  );
}

