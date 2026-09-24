---
name: date-calculator-engineering
description: Standards, mathematical rules, and technical SEO architecture for developing and maintaining the DateGap global date and time calculator platform.
---

# Date & Time Calculator Engineering Skill

This skill guides the design, mathematical rigor, and SEO architecture for building high-performance, client-side date and time calculators.

## 1. Core Principles

1. **Deterministic Client-Side Execution**:
   - Never use generative AI or external network APIs to compute dates.
   - Always run calculations in the client browser using normalized UTC milliseconds:
     `Date.UTC(year, month - 1, day)`.
   - Prevent Daylight Saving Time (DST) 23/25 hour discrepancies by standardizing on UTC midnights.

2. **No Registration, Zero Friction (Google Utility Quality)**:
   - Zero login forms, zero account requirements, zero mandatory modals before calculations.
   - Instant computation on input change (`useMemo` reactive pipeline).

3. **Core Web Vitals & Performance**:
   - **LCP** < 1.5 seconds (minimal JS bundles, <120kB First Load JS).
   - **CLS** < 0.1 (all ad containers and dynamic components must declare fixed min-heights).
   - **INP** < 100 milliseconds (pure synchronous arithmetic, zero heavy blocking loops).

## 2. Mathematical Edge Cases Checklist

Whenever creating or modifying a date calculator, verify these conditions:
- **Gregorian Leap Year Rules**: Year is leap if `(year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)`.
- **Feb 29 Handling**:
  - Check if Feb 29 was crossed in the date interval.
  - For birthdates on Feb 29, celebrate on Feb 28 in non-leap years.
- **Month Rollover Clamping**: Adding 1 month to `January 31` must clamp to `February 28` (or 29 in leap years), never overflowing into March.
- **Elapsed vs Inclusive**:
  - Elapsed = `d2 - d1` days.
  - Inclusive = `d2 - d1 + 1` calendar days.
- **Reversed Dates**: Always handle chronological reverse cleanly without crashing or displaying negative numbers; indicate the reversed interval.

## 3. Technical SEO & Topical Clustering

1. **1 Intent = 1 Clean URL**:
   - Never spam query-parameter URLs into Google index.
   - Canonical links must strictly point to the root clean path (e.g. `https://dategap.com/date-difference-calculator`).
2. **Schema.org Structured Data**:
   - Always emit `WebApplication`, `FAQPage`, and `BreadcrumbList` on calculator pages.
3. **Internal Topical Linking**:
   - Cross-link related calculators: Date Difference ↔ Days Between Dates ↔ Age Calculator ↔ Date Calculator ↔ Business Days.

