'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Calendar, Menu, X, Clock, Calculator, Briefcase, Sparkles, ChevronRight } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import LanguageSelector from './LanguageSelector';
import { SITE_CONFIG } from '@/lib/seoConfig';
import { useLanguage } from '@/lib/i18n';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useLanguage();

  const NAV_ITEMS = [
    { key: 'navDateDiff', name: t('navDateDiff'), href: '/date-difference-calculator', icon: Calendar },
    { key: 'navTimeDiff', name: t('navTimeDiff'), href: '/time-difference-calculator', icon: Clock },
    { key: 'navDaysBetween', name: t('navDaysBetween'), href: '/days-between-dates', icon: Clock },
    { key: 'navAgeCalc', name: t('navAgeCalc'), href: '/age-calculator', icon: Sparkles },
    { key: 'navAddSubtract', name: t('navAddSubtract'), href: '/date-calculator', icon: Calculator },
    { key: 'navBusinessDays', name: t('navBusinessDays'), href: '/business-days-calculator', icon: Briefcase },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/85 dark:bg-slate-950/85 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1">
                {SITE_CONFIG.name}
                <span className="text-blue-600 dark:text-blue-400">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 block -mt-1">
                {t('appTagline')}
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href === '/date-difference-calculator' && pathname === '/');
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900'
                  }`}
                >
                  <Icon className="w-4 h-4 opacity-75" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls: Language Selector + Theme Toggle + Mobile Menu */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <LanguageSelector />
            <ThemeToggle />

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-3 pb-6 space-y-2 shadow-lg animate-in slide-in-from-top duration-200">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-3 py-1">
            {t('calculatorsEcosystem')}
          </p>
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href || (item.href === '/date-difference-calculator' && pathname === '/');
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  {item.name}
                </div>
                <ChevronRight className="w-4 h-4 opacity-50" />
              </Link>
            );
          })}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex justify-between text-xs text-slate-500 px-3">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:underline">About</Link>
            <Link href="/sitemap" onClick={() => setMobileMenuOpen(false)} className="hover:underline">{t('sitemap')}</Link>
            <Link href="/privacy-policy" onClick={() => setMobileMenuOpen(false)} className="hover:underline">Privacy</Link>
            <Link href="/terms" onClick={() => setMobileMenuOpen(false)} className="hover:underline">Terms</Link>
          </div>
        </div>
      )}
    </header>
  );
}
