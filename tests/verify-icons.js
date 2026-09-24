async function verify() {
  const [s1, s2, s3, homeHtml, timeHtml] = await Promise.all([
    fetch('http://localhost:3000/icon.svg').then(r => ({ status: r.status, type: r.headers.get('content-type') })),
    fetch('http://localhost:3000/favicon.ico').then(r => ({ status: r.status, type: r.headers.get('content-type') })),
    fetch('http://localhost:3000/favicon.svg').then(r => ({ status: r.status, type: r.headers.get('content-type') })),
    fetch('http://localhost:3000/').then(r => r.text()),
    fetch('http://localhost:3000/time-difference-calculator').then(r => r.text())
  ]);

  console.log('GET /icon.svg:', s1);
  console.log('GET /favicon.ico:', s2);
  console.log('GET /favicon.svg:', s3);

  const homeLinks = Array.from(homeHtml.matchAll(/<link[^>]*rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]*>/gi)).map(m => m[0]);
  const timeLinks = Array.from(timeHtml.matchAll(/<link[^>]*rel=["'](?:icon|shortcut icon|apple-touch-icon)["'][^>]*>/gi)).map(m => m[0]);

  console.log('Home Page Favicon Links:', homeLinks);
  console.log('Time Page Favicon Links:', timeLinks);
}

verify().catch(console.error);

