import type { Metadata } from 'next';
import { Mail, MessageSquare, Shield } from 'lucide-react';
import ContactForm from '@/components/ContactForm';
import { SITE_CONFIG } from '@/lib/seoConfig';

export const metadata: Metadata = {
  title: `Contact Us – ${SITE_CONFIG.name}`,
  description: `Contact the ${SITE_CONFIG.name} team for feedback, feature requests, mathematical suggestions, or partnership inquiries.`,
  alternates: {
    canonical: `${SITE_CONFIG.url}/contact`,
  },
};

export default function ContactPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-8 py-4">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/70 border border-blue-200 dark:border-blue-900/50 text-blue-700 dark:text-blue-300 text-xs font-semibold">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Support & Inquiries</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-slate-900 dark:text-white tracking-tight">
          Get in Touch
        </h1>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          Have feedback on our calculations, noticed an edge case, or want to suggest a new calculator feature? We would love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Mail className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Email Us Directly</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            For general feedback, press inquiries, and mathematical queries:
          </p>
          <a
            href="mailto:contact@datetimediff.com"
            className="inline-block text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            contact@datetimediff.com
          </a>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Shield className="w-5 h-5" />
          </div>
          <h2 className="text-base font-bold text-slate-900 dark:text-white">Bug & Calculation Reports</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Encountered an unexpected calculation result? Please include start date, end date, and your browser details.
          </p>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">
            Response typically within 24-48 hours
          </span>
        </div>
      </div>

      {/* Interactive Contact Form */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
          Send Us a Note
        </h2>
        <ContactForm />
      </div>
    </div>
  );
}

