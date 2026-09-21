# Truststack Academy

Next.js Pages Router application adapted from the supplied Truststack handoff. Run `npm ci`, `npm run build`, and `npm start`. Deploy with Vercel using Node 24.x, framework Next.js, and repository root `./`.

## Configuration
Set server-only GITHUB_TOKEN (repository Contents read/write), GITHUB_REPO=youngdestinya/truststack-academy, ADMIN_KEY (a strong unique value), PAYSTACK_SECRET_KEY, and NEXT_PUBLIC_BASE_URL to the deployed origin. The native article publisher stores sanitized articles in public/articles.json and featured media in public/article-images. Never commit credentials. See .env.example.

GitHub stores public certificate records in public/certs.json. Writes commit through the GitHub API with conflict retries. When configured, verification reads the latest GitHub registry. Otherwise it reads bundled sample records. Payment checkout remains unavailable until both Paystack and GitHub credentials are configured. Checkout uses Paystack redirect and verifies success, NGN currency and 2500000 kobo before saving; a digest of the payment reference prevents duplicate issuance.

## Differences from the handoff
- Next.js 15.5.25 and Node 24 replace obsolete versions; PostCSS is patched through an override.
- No runtime writes to Vercel's read-only filesystem.
- Admin APIs require a server-side key; no embedded default password.
- Verification reports only checks actually performed. Blockchain anchoring and signatures are not implemented; sample hashes are supplied demo data, not proof of authenticity.
- Real QR code on verification; certificate generator is a preview and does not issue records.
- Dashboard is the supplied demonstration UI, without student accounts, persisted progress or actual hosted labs.

## Smoke checks
The two supplied IDs 2026-9E43903F and 2026-F5E8A071 should return valid file registry records; unknown IDs return 404. Unauthenticated issuance must return 401. Missing payment configuration must return 503, never simulated success.

Configure Vercel's Git integration for automatic redeployment on changes to main. Live payment verification and GitHub writes require credentials and separate end-to-end validation.
