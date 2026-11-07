/*
 * Postbuild step: bakes fully-rendered HTML into build/*.html so
 * non-JS-executing crawlers (AI search bots included) see real content
 * instead of the empty CRA #root shell.
 */
const path = require('path');
const fs = require('fs');
const express = require('express');
const puppeteer = require('puppeteer');

const buildDir = path.join(__dirname, '..', 'build');
const PORT = 45123;

const routeMeta = {
  '/': {
    title: 'Phoenix Athletics e.V. - Functional Fitness in Neu-Ulm & Ulm',
    description:
      'Phoenix Athletics e.V. - Dein gemeinnütziger Sportverein für Functional Fitness in Neu-Ulm & Ulm. Training für jedes Level, Coaches, Kursplan und FAQ.',
  },
  '/imprint': {
    title: 'Impressum - Phoenix Athletics e.V.',
    description: 'Impressum und rechtliche Angaben zu Phoenix Athletics e.V., Neu-Ulm.',
  },
};

function patchHead(html, route) {
  const meta = routeMeta[route];
  if (!meta) return html;

  let out = html;
  out = out.replace(/<title>.*?<\/title>/s, `<title>${meta.title}</title>`);
  out = out.replace(
    /(<meta\s+name="description"\s+content=")(.*?)(")/s,
    `$1${meta.description}$3`
  );

  const canonicalHref = `https://phoenix-athletics.de${route}`;
  if (/<link\s+rel="canonical"/.test(out)) {
    out = out.replace(
      /(<link\s+rel="canonical"\s+href=")(.*?)(")/,
      `$1${canonicalHref}$3`
    );
  }

  return out;
}

async function waitForRender(page) {
  await page.waitForFunction(
    () => {
      const root = document.getElementById('root');
      return !!root && root.children.length > 0;
    },
    { timeout: 15000 }
  );
}

async function main() {
  if (!fs.existsSync(buildDir)) {
    throw new Error(`Build directory not found: ${buildDir}. Run "npm run build" first.`);
  }

  const app = express();
  app.use(express.static(buildDir));
  app.get('*', (req, res) => {
    res.sendFile(path.join(buildDir, 'index.html'));
  });
  const server = await new Promise((resolve, reject) => {
    const s = app.listen(PORT, () => resolve(s));
    s.on('error', reject);
  });

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const routes = Object.keys(routeMeta);
    for (const route of routes) {
      const page = await browser.newPage();
      await page.goto(`http://127.0.0.1:${PORT}${route}`, { waitUntil: 'networkidle0' });
      await waitForRender(page);

      // Third-party widgets (Booklyfit schedule embed) inject an iframe and a
      // "mounted" flag into a React-owned container. Baking that into the
      // snapshot breaks hydration and stops the embed from re-mounting, so
      // reset those containers and drop the injected script tags.
      await page.evaluate(() => {
        document.querySelectorAll('[data-booklyfit-schedule]').forEach((el) => {
          el.removeAttribute('data-booklyfit-mounted');
          el.innerHTML = '';
        });
        document.querySelectorAll('script[data-booklyfit-embed]').forEach((s) => s.remove());
        // The hero picks its video source per device (orientation, reduced
        // motion, Save-Data) at runtime. Ship it source-less and hidden so the
        // poster shows until the client decides.
        document.querySelectorAll('#home video').forEach((v) => {
          v.removeAttribute('src');
          v.className = v.className.replace('opacity-100', 'opacity-0');
        });
      });

      const html = await page.content();
      const patched = patchHead(html, route);

      const outPath =
        route === '/'
          ? path.join(buildDir, 'index.html')
          : path.join(buildDir, route.replace(/^\//, ''), 'index.html');

      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.writeFileSync(outPath, patched);
      console.log(`Prerendered ${route} -> ${path.relative(buildDir, outPath)}`);

      await page.close();
    }
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((err) => {
  console.error('Prerender failed:', err);
  process.exit(1);
});
