'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, BookOpen, Lightbulb } from 'lucide-react';

interface SeoContentSectionProps {
  toolName: string;
  faqs: { question: string; answer: string }[];
  guideTitle?: string;
  guideContent?: React.ReactNode;
}

export default function SeoContentSection({
  toolName,
  faqs,
  guideTitle,
  guideContent,
}: SeoContentSectionProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div id="guide" className="mt-16 space-y-12">
      {/* Editorial Guide / Article Section */}
      <section className="bg-white dark:bg-slate-900/60 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 mb-4">
          <BookOpen className="w-5 h-5" />
          <span className="text-xs uppercase tracking-wider font-bold">User Guide & Reference</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-6">
          {guideTitle || `How to Use the ${toolName}`}
        </h2>

        {guideContent ? (
          <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
            {guideContent}
          </div>
        ) : (
          <div className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
            <p>
              Calculating the precise time between two dates is essential for project management, legal contracts, visa stay limitations, financial billing cycles, and personal countdowns.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-500" /> Elapsed Days (Standard)
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Measures elapsed 24-hour periods. From Monday to Tuesday counts as <strong>1 elapsed day</strong>. Use this for age, interest rates, and durations.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
                <h4 className="font-semibold text-slate-900 dark:text-white text-sm mb-1 flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-blue-500" /> Inclusive Calendar Days
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Includes both starting and ending days. From Monday to Tuesday counts as <strong>2 calendar days</strong>. Ideal for hotel bookings, rentals, and event passes.
                </p>
              </div>
            </div>
            <p>
              Our engine uses UTC midnight timestamps to ensure that Daylight Saving Time (DST) switches (such as 23-hour spring-forward or 25-hour fall-back days) never introduce off-by-one errors.
            </p>
          </div>
        )}
      </section>

      {/* Frequently Asked Questions */}
      <section className="bg-slate-50 dark:bg-slate-900/40 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800">
        <div className="flex items-center gap-2.5 text-blue-600 dark:text-blue-400 mb-3">
          <HelpCircle className="w-5 h-5" />
          <span className="text-xs uppercase tracking-wider font-bold">Frequently Asked Questions</span>
        </div>

        <h3 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mb-6">
          Common Questions About {toolName}
        </h3>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span className="font-semibold text-sm sm:text-base text-slate-900 dark:text-white pr-4">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-full text-slate-400 flex-shrink-0">
                    {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-4 pb-5 sm:px-5 sm:pb-5 pt-1 text-sm text-slate-600 dark:text-slate-300 border-t border-slate-100 dark:border-slate-800 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
