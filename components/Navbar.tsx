'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Calendar, Clock, Calculator, Briefcase, Cake, CalendarDays, Menu, X, ChevronRight, HelpCircle } from 'lucide-react';
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
    { key: 'navAgeCalc', name: t('navAgeCalc'), href: '/age-calculator', icon: Cake },
    { key: 'navDaysBetween', name: t('navDaysBetween'), href: '/days-between-dates', icon: CalendarDays },
    { key: 'navAddSubtract', name: t('navAddSubtract'), href: '/date-calculator', icon: Calculator },
    { key: 'navBusinessDays', name: t('navBusinessDays'), href: '/business-days-calculator', icon: Briefcase },
  ];

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 dark:bg-slate-950/90 border-b border-slate-200/80 dark:border-slate-800/80 transition-colors shadow-sm">
      {/* Top Brand & Utility Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo with Brand Hover Highlight */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3 group select-none">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 group-hover:shadow-blue-500/35 transition-all duration-200">
              <div className="relative flex items-center justify-center">
                <Calendar className="w-5 h-5" />
                <Clock className="w-3.5 h-3.5 absolute -bottom-1 -right-1 text-amber-300 drop-shadow-sm" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-base sm:text-xl font-black tracking-tight text-slate-900 dark:text-white flex items-center gap-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {SITE_CONFIG.name}
                <span className="text-blue-600 dark:text-blue-400">.</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 -mt-0.5">
                {t('appTagline')}
              </span>
            </div>
          </Link>

          {/* Right Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            <LanguageSelector />
            <ThemeToggle />

            {/* Quick Mobile / More Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
              aria-label="Toggle navigation menu"
              title="More pages & links"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Prominently Highlighted Top Calculator Header Bar */}
      <div className="border-t border-slate-200/70 dark:border-slate-800/70 bg-slate-50/80 dark:bg-slate-900/75 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          <nav 
            aria-label="Calculator Tools"
            className="flex items-center gap-1.5 sm:gap-2 py-2 overflow-x-auto no-scrollbar scroll-smooth"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href === '/date-difference-calculator' && pathname === '/');
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`group flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 ease-out border shadow-sm ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white border-blue-600 shadow-md shadow-blue-500/25 ring-2 ring-blue-500/30 scale-[1.01]'
                      : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200/90 dark:border-slate-700/80 hover:bg-blue-600 hover:text-white hover:border-blue-600 hover:shadow-lg hover:shadow-blue-500/25 hover:-translate-y-0.5 hover:scale-[1.03] active:scale-95'
                  }`}
                >
                  <span className={`p-1 rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? 'bg-white/20 text-white' 
                      : 'bg-blue-50 dark:bg-slate-700 text-blue-600 dark:text-blue-400 group-hover:bg-white/20 group-hover:text-white'
                  }`}>
                    <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  </span>
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse ml-0.5" />
                  )}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Slide-Down Drawer for Information & Legal Pages */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-4 pb-6 space-y-3 shadow-xl animate-in slide-in-from-top duration-200">
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 px-3">
            {SITE_CONFIG.name} — Quick Directory
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href || (item.href === '/date-difference-calculator' && pathname === '/');
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900 hover:text-blue-600 dark:hover:text-blue-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex flex-wrap gap-4 text-xs font-medium text-slate-500 px-3">
            <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
              About
            </Link>
            <Link href="/sitemap" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
              {t('sitemap')}
            </Link>
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
              Contact
            </Link>
            <Link href="/privacy-policy" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
              Privacy
            </Link>
            <Link href="/terms" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
              Terms
            </Link>
            <Link href="/disclaimer" onClick={() => setMobileMenuOpen(false)} className="hover:text-blue-600 dark:hover:text-blue-400 hover:underline">
              Disclaimer
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
