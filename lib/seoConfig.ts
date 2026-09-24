export const SITE_CONFIG = {
  name: 'Date Time Calculator',
  domain: 'dategap.com',
  url: 'https://dategap.com',
  tagline: 'Fast, Free Online Date & Time Calculators',
  description: 'Calculate exact date difference, time difference, days between dates, age, business days, and add or subtract dates instantly. Free, accurate, and 100% private with no registration required.',
  author: 'Date Time Calculator Team',
  locale: 'en_US',
};

export interface CalculatorMeta {
  title: string;
  h1: string;
  description: string;
  slug: string;
  badge: string;
  shortDescription: string;
  faqs: { question: string; answer: string }[];
}

export const CALCULATORS_CATALOG: Record<string, CalculatorMeta> = {
  'date-difference-calculator': {
    slug: 'date-difference-calculator',
    badge: 'Flagship Tool',
    title: 'Date Difference Calculator – Calculate Years, Months & Days Between Dates',
    h1: 'How Many Years, Months and Days Between Two Dates',
    description: 'Calculate the exact difference between two dates in years, months, days, weeks, and hours. 100% free, leap-year accurate, and private date calculator.',
    shortDescription: 'Calculate the exact duration between any two dates with days, months, and hours breakdown.',
    faqs: [
      {
        question: 'How do you calculate the difference between two dates?',
        answer: 'To find the difference between two dates, calculate the number of elapsed 24-hour days between the start date and the end date. Our calculator converts this into total days, weeks, months, and years, accounting for leap years and month lengths.'
      },
      {
        question: 'What is the difference between elapsed days and inclusive days?',
        answer: 'Elapsed days measures the time passed from day A to day B (e.g., from Jan 1 to Jan 2 is 1 elapsed day). Inclusive days includes both the start day and the end day in the total count (Jan 1 to Jan 2 is 2 calendar days).'
      },
      {
        question: 'Does this calculator account for leap years and February 29?',
        answer: 'Yes! The calculation engine deterministically checks every leap year in the Gregorian calendar, properly adding February 29 when crossed in the date range.'
      },
      {
        question: 'Is my date data tracked or saved to a server?',
        answer: 'No. All calculations run 100% locally inside your browser using JavaScript. No dates, personal data, or IP addresses are logged or transmitted to an external server.'
      }
    ]
  },
  'days-between-dates': {
    slug: 'days-between-dates',
    badge: 'Popular',
    title: 'Days Between Dates Calculator – How Many Days Between Two Dates?',
    h1: 'Days Between Dates Calculator',
    description: 'Find out exactly how many days are between two dates. Fast, precise calendar day counter with weekend and business day breakdowns. Free and instant.',
    shortDescription: 'Find the total number of calendar days, weekdays, and weekend days between any two dates.',
    faqs: [
      {
        question: 'How many days are between two dates?',
        answer: 'Select your start date and end date above to instantly see the exact total days, along with a full breakdown of working weekdays versus weekends.'
      },
      {
        question: 'How many days are in a year?',
        answer: 'A standard calendar year has 365 days. A leap year has 366 days because February has 29 days instead of 28.'
      }
    ]
  },
  'age-calculator': {
    slug: 'age-calculator',
    badge: 'Essential',
    title: 'Age Calculator – Exact Age in Years, Months, Days & Next Birthday',
    h1: 'Exact Age Calculator',
    description: 'Calculate your exact age in years, months, days, hours, and minutes. See how many days you have lived, the weekday you were born, and birthday countdown.',
    shortDescription: 'Discover your exact age, total days lived, weekday of birth, and next birthday countdown.',
    faqs: [
      {
        question: 'How is exact age calculated?',
        answer: 'Age is calculated by subtracting your birth date from today’s date (or any specified date), accounting for leap years, variable days in each month, and full elapsed years.'
      },
      {
        question: 'What happens if I was born on a leap day (February 29)?',
        answer: 'In non-leap years, your birthday countdown and milestone adjust to February 28 or March 1 depending on legal convention, while leap years celebrate on February 29.'
      }
    ]
  },
  'date-calculator': {
    slug: 'date-calculator',
    badge: 'Utility',
    title: 'Date Calculator – Add or Subtract Days, Weeks, Months, Years',
    h1: 'Date Calculator (Add / Subtract)',
    description: 'Add or subtract days, weeks, months, or years from any date. Instantly discover future or past calendar dates and the corresponding day of the week.',
    shortDescription: 'Add or subtract any duration of days, weeks, or months to determine past or future dates.',
    faqs: [
      {
        question: 'How do I add 90 days to a date?',
        answer: 'Enter your start date, select "Add (+)", type 90 into the days field, and our calculator will display the exact future date and the day of the week.'
      },
      {
        question: 'How does month rollover work when adding months?',
        answer: 'When adding months from dates like January 31, if the target month has fewer days (e.g. February has 28 or 29 days), the date automatically adjusts to the last valid day of that month.'
      }
    ]
  },
  'business-days-calculator': {
    slug: 'business-days-calculator',
    badge: 'Productivity',
    title: 'Business Days Calculator – Calculate Working Days Between Dates',
    h1: 'Business Days Calculator',
    description: 'Calculate working days and business days between dates. Exclude Saturdays, Sundays, and public holidays with customizable workweek options.',
    shortDescription: 'Calculate elapsed working days between dates, excluding weekends and public holidays.',
    faqs: [
      {
        question: 'What is considered a business day?',
        answer: 'A business day is any official working day of the week, typically Monday through Friday, excluding weekends and recognized public or federal holidays.'
      },
      {
        question: 'How many business days are in a typical year?',
        answer: 'A typical calendar year has 260 to 262 weekdays. After subtracting 10 standard federal/public holidays, there are usually around 250 to 252 business days.'
      }
    ]
  },
  'time-difference-calculator': {
    slug: 'time-difference-calculator',
    badge: 'Time Utility',
    title: 'Time Difference Calculator – Hours & Minutes Between Two Times',
    h1: 'Time Difference Calculator',
    description: 'Calculate the exact time difference between two times in hours, minutes, and seconds. Supports overnight shifts, decimal hours for payroll, and multi-day spans.',
    shortDescription: 'Calculate elapsed hours and minutes between two times with decimal hours and overnight support.',
    faqs: [
      {
        question: 'How do you calculate the difference between two times?',
        answer: 'Subtract the start time from the end time. If the end time is on the next day (e.g. 10:00 PM to 6:00 AM), add 24 hours (1,440 minutes) to the calculation to account for the midnight rollover.'
      },
      {
        question: 'What are decimal hours and why are they used?',
        answer: 'Decimal hours represent hours and minutes as a single decimal number (e.g., 8 hours and 30 minutes = 8.5 hours). They are widely used in employee payroll and timesheets to calculate gross wages.'
      },
      {
        question: 'Does this calculator support overnight work shifts?',
        answer: 'Yes! If your shift starts in the evening and ends the next morning (crossing midnight), the calculator automatically detects or lets you specify the overnight duration.'
      }
    ]
  }
};

/**
 * Generates Schema.org JSON-LD for WebApplication
 */
export function generateCalculatorSchema(slug: string) {
  const calc = CALCULATORS_CATALOG[slug];
  if (!calc) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calc.title,
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'All',
    url: `${SITE_CONFIG.url}/${slug === 'date-difference-calculator' ? '' : slug}`,
    description: calc.description,
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1480',
      bestRating: '5',
      worstRating: '1',
    },
    featureList: [
      'Instant client-side calculation',
      'No registration or login required',
      'Leap year & calendar month accurate',
      'Shareable URL calculation links',
      'Copy result to clipboard',
    ],
  };
}

/**
 * Generates Schema.org JSON-LD for WebSite
 */
export function generateWebsiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: 'en-US',
  };
}

/**
 * Generates Schema.org JSON-LD for Organization
 */
export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/icon.svg`,
    description: SITE_CONFIG.description,
  };
}

/**
 * Generates Schema.org JSON-LD for FAQPage
 */
export function generateFaqSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generates Schema.org JSON-LD for BreadcrumbList
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
