const { chromium } = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true, ...(process.env.CHROME_EXECUTABLE ? { executablePath: process.env.CHROME_EXECUTABLE } : {}) });
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html><head><style>
    *{box-sizing:border-box}body{margin:0;width:1200px;height:630px;overflow:hidden;font-family:Arial,sans-serif;color:white;background:radial-gradient(circle at 87% 17%,#1e526b,transparent 37%),linear-gradient(120deg,#0b1b33,#102b47)}
    .line{height:11px;background:linear-gradient(90deg,#00c6e8,#d6ad3d)}main{padding:52px 70px;display:flex;justify-content:space-between;gap:40px}.brand{display:flex;align-items:center;gap:14px;font-size:27px;font-weight:800}.brand img{width:64px;height:64px;object-fit:contain}.tag{color:#5edcef;letter-spacing:4px;font-size:19px;font-weight:800;margin:72px 0 20px}h1{font-size:66px;line-height:1.04;letter-spacing:-3px;margin:0;max-width:770px}p{font-size:25px;color:#bfd0e1;margin-top:25px}.badge{width:300px;height:420px;border:1px solid #4a7189;border-radius:26px;background:#ffffff12;margin-top:45px;padding:28px;display:flex;flex-direction:column;justify-content:space-between}.badge span{letter-spacing:2px;color:#74e0ed;font-size:14px;font-weight:800}.badge strong{font-size:168px;letter-spacing:-12px;line-height:.8}.badge em{font-size:20px;font-style:normal;color:#e3bd51;font-weight:800}.bottom{position:absolute;left:70px;bottom:38px;color:#90b1c6;font-size:17px;font-weight:800;letter-spacing:2px}
  </style></head><body><div class="line"></div><main><section><div class="brand"><img src="http://localhost:3117/truststack-home-logo.png" alt=""><span>TrustStack Academy</span></div><div class="tag">FREE • SELF-PACED • NIGERIA</div><h1>CDPO Study<br>Programme</h1><p>30 complete lessons on the Nigeria Data Protection Act</p></section><aside class="badge"><span>OPEN LEARNING PATH</span><strong>30</strong><em>DAYS OF PRACTICAL STUDY</em></aside></main><div class="bottom">LESSONS · SCENARIOS · MODEL ANSWERS · MOCK EXAM</div></body></html>`);
  await page.locator('.brand img').evaluate((img) => img.decode());
  await page.screenshot({ path: path.join(__dirname, '..', 'public', 'cdpo-og.png') });
  await browser.close();
})().catch((error) => { console.error(error); process.exit(1); });
