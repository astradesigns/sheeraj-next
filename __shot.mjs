import { chromium } from 'playwright-core';

const EXE = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const URL = 'http://127.0.0.1:3000/about';
const COO = 'Efficient and effective execution';
const AUD = 'independent external auditing';

const browser = await chromium.launch({ executablePath: EXE, headless: true });

async function run(theme, width, height, tag) {
  const ctx = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.addInitScript((t) => {
    try { localStorage.setItem('theme', t); } catch (e) {}
  }, theme);
  await page.goto(URL, { waitUntil: 'networkidle' });
  // ensure html.dark matches intended theme (mirror the app's FOUC script)
  await page.evaluate((t) => {
    document.documentElement.classList.toggle('dark', t === 'dark');
  }, theme);
  await page.waitForTimeout(400);

  const info = await page.evaluate(({ coo, aud }) => {
    const find = (txt) => [...document.querySelectorAll('p')].find(p => p.textContent.includes(txt));
    const read = (el) => {
      if (!el) return null;
      const cs = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      return { color: cs.color, rectTop: Math.round(r.top + window.scrollY), rectH: Math.round(r.height) };
    };
    return {
      htmlClass: document.documentElement.className,
      bodyBg: getComputedStyle(document.body).backgroundColor,
      coo: read(find(coo)),
      aud: read(find(aud)),
    };
  }, { coo: COO, aud: AUD });

  console.log(`\n[${tag}] theme=${theme} ${width}x${height}`);
  console.log('  html.class :', JSON.stringify(info.htmlClass).slice(0, 80));
  console.log('  body bg    :', info.bodyBg);
  console.log('  COO color  :', info.coo?.color, ' (top', info.coo?.rectTop + ')');
  console.log('  AUD color  :', info.aud?.color, ' (top', info.aud?.rectTop + ')');

  // screenshot the COO card vicinity
  if (info.coo) {
    await page.evaluate((y) => window.scrollTo(0, y - 140), info.coo.rectTop);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `shot-${tag}.png` });
  }
  await ctx.close();
}

await run('light', 1366, 900, 'desktop-light');
await run('dark', 1366, 900, 'desktop-dark');
await run('light', 390, 844, 'phone-light');
await run('dark', 390, 844, 'phone-dark');

await browser.close();
console.log('\nDONE');
