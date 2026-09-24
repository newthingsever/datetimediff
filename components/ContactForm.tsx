'use client';

import { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
        <div className="w-10 h-10 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-slate-900 dark:text-white text-base">Thank you for your message!</h3>
        <p className="text-xs text-slate-600 dark:text-slate-300">
          Our team reviews calculations and feedback daily. We appreciate your contribution to making Date and Time Gap better.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label htmlFor="contact-name" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Your Name
          </label>
          <input
            id="contact-name"
            type="text"
            required
            placeholder="Alex Morgan"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-base sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <div className="space-y-1.5">
          <label htmlFor="contact-email" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
            Email Address
          </label>
          <input
            id="contact-email"
            type="email"
            required
            placeholder="alex@example.com"
            className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-base sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-subject" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Topic
        </label>
        <select
          id="contact-subject"
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-base sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="feedback">General Feedback</option>
          <option value="bug">Report Calculation Bug / Discrepancy</option>
          <option value="feature">Suggest New Calculator</option>
          <option value="other">Other Inquiry</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label htmlFor="contact-message" className="text-xs font-semibold text-slate-700 dark:text-slate-300">
          Message
        </label>
        <textarea
          id="contact-message"
          rows={4}
          required
          placeholder="Tell us what you'd like to see or report..."
          className="w-full px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-base sm:text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <button
        type="submit"
        className="w-full sm:w-auto px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-colors shadow-md shadow-blue-500/20 inline-flex items-center justify-center gap-2"
      >
        <Send className="w-4 h-4" />
        <span>Submit Message</span>
      </button>
    </form>
  );
}

