import Link from 'next/link';
import { Calendar, ShieldCheck, Zap, Lock } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/seoConfig';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950/60 transition-colors mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {/* Trust Badges */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-blue-100/80 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Ultra Fast Engine</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Calculations execute instantly in your browser in &lt;2 milliseconds.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-emerald-100/80 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">100% Private & No Login</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Zero tracking, no account required, and dates never leave your computer.</p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-lg bg-purple-100/80 dark:bg-purple-950/80 text-purple-600 dark:text-purple-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white text-sm">Mathematically Rigorous</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Verified across Gregorian leap years, DST changes, and calendar months.</p>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-10">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Calculators</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/date-difference-calculator" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Date Difference Calculator
                </Link>
              </li>
              <li>
                <Link href="/time-difference-calculator" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Time Difference Calculator
                </Link>
              </li>
              <li>
                <Link href="/days-between-dates" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Days Between Dates
                </Link>
              </li>
              <li>
                <Link href="/age-calculator" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Exact Age Calculator
                </Link>
              </li>
              <li>
                <Link href="/date-calculator" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Add / Subtract Days
                </Link>
              </li>
              <li>
                <Link href="/business-days-calculator" className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400">
                  Business Days Calculator
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Popular Tools</h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/date-difference-calculator" className="hover:text-blue-600 dark:hover:text-blue-400">Calendar Days Counter</Link></li>
              <li><Link href="/business-days-calculator" className="hover:text-blue-600 dark:hover:text-blue-400">Working Days in Year</Link></li>
              <li><Link href="/age-calculator" className="hover:text-blue-600 dark:hover:text-blue-400">Next Birthday Countdown</Link></li>
              <li><Link href="/date-calculator" className="hover:text-blue-600 dark:hover:text-blue-400">Add 90 Days to Date</Link></li>
              <li><Link href="/date-calculator" className="hover:text-blue-600 dark:hover:text-blue-400">Subtract Months from Date</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Guides & Resources</h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/date-difference-calculator#guide" className="hover:text-blue-600 dark:hover:text-blue-400">Elapsed vs Inclusive Days</Link></li>
              <li><Link href="/business-days-calculator#guide" className="hover:text-blue-600 dark:hover:text-blue-400">How to Calculate Business Days</Link></li>
              <li><Link href="/age-calculator#guide" className="hover:text-blue-600 dark:hover:text-blue-400">Leap Year Birthday Rules</Link></li>
              <li><Link href="/date-difference-calculator#guide" className="hover:text-blue-600 dark:hover:text-blue-400">Gregorian Calendar Rules</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-4">Trust & Legal</h4>
            <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
              <li><Link href="/about" className="hover:text-blue-600 dark:hover:text-blue-400">About {SITE_CONFIG.name}</Link></li>
              <li><Link href="/contact" className="hover:text-blue-600 dark:hover:text-blue-400">Contact & Support</Link></li>
              <li><Link href="/privacy-policy" className="hover:text-blue-600 dark:hover:text-blue-400">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-blue-600 dark:hover:text-blue-400">Terms of Service</Link></li>
              <li><Link href="/disclaimer" className="hover:text-blue-600 dark:hover:text-blue-400">Mathematical Disclaimer</Link></li>
              <li><Link href="/sitemap" className="hover:text-blue-600 dark:hover:text-blue-400">HTML Sitemap</Link></li>
              <li><Link href="/sitemap.xml" target="_blank" className="hover:text-blue-600 dark:hover:text-blue-400">XML Sitemap</Link></li>
              <li><Link href="/robots.txt" target="_blank" className="hover:text-blue-600 dark:hover:text-blue-400">Robots.txt Directive</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-blue-600 flex items-center justify-center text-white">
              <Calendar className="w-3 h-3" />
            </div>
            <span>© {currentYear} {SITE_CONFIG.name}. Free global utility.</span>
          </div>
          <p>No cookies tracked • No registration • Deterministic JavaScript engine</p>
        </div>
      </div>
    </footer>
  );
}
