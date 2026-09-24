# Date Time Calculator — Universal Precision Date & Time Platform

[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61dafb?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8?logo=tailwindcss)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**Date Time Calculator** is a high-performance, privacy-first, zero-login global date and time calculator platform. Built with Next.js 15 App Router, React 19, and Tailwind CSS, all calculations are executed deterministically on the client with zero latency, zero tracking, and millisecond precision.

---

## 🌟 Core Features

- **Flagship Date Difference Calculator**: Calculate exact years, months, days, weeks, total days, hours, and minutes between any two dates. Supports leap years, Gregorian calendar edge cases, and optional end-date inclusion (+1 day).
- **Time Difference Calculator**: Precise elapsed hours, minutes, seconds, decimal hours (for payroll/timesheets), and automatic overnight/midnight shift detection with an interactive 24-hour visual bar.
- **Days Between Dates**: Quick-count total days and elapsed duration without month decomposition.
- **Age Calculator**: Exact biological age with weekday born, next birthday countdown, and lifetime milestones.
- **Add / Subtract Dates**: Compute target dates by adding or subtracting calendar days, business days, weeks, months, or years.
- **Business Days Calculator**: Working days calculation excluding weekends and international observed holidays.
- **Multi-Language (i18n)**: Instant switching between English (US), Spanish, Hindi, French, German, and Portuguese.
- **Dark Mode**: High-contrast, accessibility-tested dark mode with auto-detection and manual toggle.
- **SEO & Search Standards**: Semantic HTML, JSON-LD Schema markup (`SoftwareApplication`, `FAQPage`), XML Sitemap, HTML Sitemap directory, and custom 404 recovery.

---

## 🚀 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/datecalc.git
cd datecalc

# Install dependencies
npm install
```

### 2. Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build & Test

```bash
# Run unit tests
npm test

# Run full site audit (19/19 routes & assets)
npm run audit

# Build for production
npm run build

# Start production server
npm start
```

---

## 🚢 Deployment Guide

DateGap is optimized for zero-configuration, instant deployment on modern cloud platforms.

### Option 1: Vercel (Recommended — 1 Click)

1. Push your repository to GitHub:
   ```bash
   git remote add origin https://github.com/<your-username>/datecalc.git
   git branch -M main
   git push -u origin main
   ```
2. Go to [Vercel](https://vercel.com/new).
3. Import your GitHub repository (`datecalc`).
4. Keep all default build settings (Framework Preset: **Next.js**).
5. Click **Deploy**. Your site will be live with free global CDN and SSL in under 60 seconds!

Alternatively, deploy directly from CLI:
```bash
npx vercel
```

### Option 2: Netlify

1. Push to GitHub.
2. Go to [Netlify](https://app.netlify.com/start).
3. Connect your repository.
4. Build command: `npm run build` | Publish directory: `.next`
5. Click **Deploy Site**.

### Option 3: Docker / VPS Self-Hosted

```bash
# Build production bundle
npm run build

# Run with PM2 or systemd
pm2 start npm --name "dategap" -- start
```

---

## 🧪 Testing & Verification

DateGap comes with a built-in automated test and audit suite:

- `npm test`: Verifies leap years, day rollovers, age logic, business days, and time differences.
- `npm run audit`: Audits all 15 public routes, XML/HTML sitemaps, robots.txt, custom 404 recovery, and SVG/ICO favicon assets.

---

## 📄 License

MIT License. Free for personal and commercial use.

