const routes = [
  { path: '/', expected: 200, name: 'Home Page (Flagship Date Difference)' },
  { path: '/date-difference-calculator', expected: 200, name: 'Date Difference Calculator' },
  { path: '/time-difference-calculator', expected: 200, name: 'Time Difference Calculator' },
  { path: '/days-between-dates', expected: 200, name: 'Days Between Dates Calculator' },
  { path: '/age-calculator', expected: 200, name: 'Age Calculator' },
  { path: '/date-calculator', expected: 200, name: 'Add/Subtract Date Calculator' },
  { path: '/business-days-calculator', expected: 200, name: 'Business Days Calculator' },
  { path: '/sitemap', expected: 200, name: 'HTML Sitemap Page' },
  { path: '/sitemap.xml', expected: 200, name: 'XML Sitemap Feed' },
  { path: '/robots.txt', expected: 200, name: 'Robots.txt Directive' },
  { path: '/about', expected: 200, name: 'About Page' },
  { path: '/contact', expected: 200, name: 'Contact Page' },
  { path: '/privacy-policy', expected: 200, name: 'Privacy Policy' },
  { path: '/terms', expected: 200, name: 'Terms of Service' },
  { path: '/disclaimer', expected: 200, name: 'Disclaimer' },
  { path: '/favicon.ico', expected: 200, name: 'Favicon ICO' },
  { path: '/favicon.svg', expected: 200, name: 'Favicon SVG' },
  { path: '/icon.svg', expected: 200, name: 'Next.js App Icon SVG' },
  { path: '/manifest.webmanifest', expected: 200, name: 'PWA Web App Manifest' },
  { path: '/opengraph-image', expected: 200, name: 'Dynamic OpenGraph Social Card' },
  { path: '/non-existent-route-for-testing-404', expected: 404, name: 'Custom 404 Page' },
];

async function runAudit() {
  console.log('====================================================');
  console.log('  Date and Time Gap Automated Pre-Deployment Site Audit');
  console.log('====================================================\n');

  let passed = 0;
  let failed = 0;

  for (const r of routes) {
    try {
      const res = await fetch(`http://localhost:3000${r.path}`);
      const isExpected = res.status === r.expected;
      const contentType = res.headers.get('content-type') || '';

      if (isExpected) {
        passed++;
        console.log(`✔ [${res.status}] ${r.path} -> ${r.name}`);
        if (contentType.includes('text/html')) {
          const html = await res.text();
          const hasTitle = /<title[^>]*>([^<]+)<\/title>/i.test(html);
          const hasFavicon = html.includes('rel="icon"') || html.includes('rel="shortcut icon"');
          const hasDesc = html.includes('name="description"');
          if (!hasTitle || !hasFavicon || !hasDesc) {
            console.log(`   ⚠ SEO Warning: Title: ${hasTitle}, Favicon: ${hasFavicon}, Description: ${hasDesc}`);
          }
        }
      } else {
        failed++;
        console.error(`✖ FAILED [${res.status}, expected ${r.expected}] ${r.path} -> ${r.name}`);
      }
    } catch (err) {
      failed++;
      console.error(`✖ ERROR fetching ${r.path}:`, err.message);
    }
  }

  console.log('\n====================================================');
  console.log(`Audit Complete: ${passed} Passed, ${failed} Failed`);
  console.log('====================================================');

  if (failed > 0) process.exit(1);
}

runAudit().catch(err => {
  console.error(err);
  process.exit(1);
});
