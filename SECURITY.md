# Security Policy

## Supported Versions

| Version | Supported |
|---------|-----------|
| Latest  | ✅ Yes    |

## Reporting a Vulnerability

If you discover a security vulnerability, please **do NOT open a public GitHub issue**.

Contact the maintainer directly:
- Email: the address defined in `OWNER_EMAIL` environment variable
- Response time: within 48 hours

Please include:
- A description of the vulnerability and potential impact
- Steps to reproduce
- Any suggested fix (optional)

---

## Environment Variables & Secrets

All sensitive values must be stored in environment variables. **Never commit real secrets to the repository.**

| Variable | Required | Description |
|---|---|---|
| `RESEND_API_KEY` | ✅ | Resend email service API key — obtain from [resend.com](https://resend.com) |
| `OWNER_EMAIL` | ✅ | Email address to receive order notifications |
| `FROM_EMAIL` | Optional | Sender address — defaults to `onboarding@resend.dev` for sandbox |
| `DAILY_SUMMARY_SECRET` | Recommended | Bearer token to protect the cron endpoint |
| `CRON_SECRET` | Recommended | Same as above — ensure it's a long random string |
| `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` | ✅ | Cloudinary account name |

**The `.env.example` file contains only placeholder values.** Copy it to `.env.local` and fill in your real values.

```bash
cp .env.example .env.local
```

---

## Security Measures in This Codebase

### XSS Prevention
- All HTML content rendered with `dangerouslySetInnerHTML` is first sanitized via `lib/sanitize.ts` using **DOMPurify** (`isomorphic-dompurify`).
- The `SafeHtml` component (`components/ui/SafeHtml.tsx`) wraps all such renders.

### Input Validation
- All API endpoints validate incoming data using **Zod** schemas defined in `lib/validation.ts`.
- Invalid payloads receive a `400 Bad Request` response with field-level error details.

### Rate Limiting
- The `/api/order` endpoint is rate-limited to **5 requests per minute per IP**.
- The `/api/daily-summary` endpoint is rate-limited to **1 request per hour per IP**.
- Implementation is in `lib/rateLimit.ts` using an in-memory sliding window.

> **Note:** The in-memory rate limiter is per-serverless-instance. For production at scale, replace with [@upstash/ratelimit](https://github.com/upstash/ratelimit) + Redis.

### Email Hardcoding
- No personal emails or API keys are hardcoded. Missing required env vars throw a startup error.

### Dependency Security
```bash
# Check for known vulnerabilities in dependencies
npm audit

# Fix automatically where possible
npm audit fix
```

---

## Content Security Policy (CSP)

Consider adding CSP headers in `next.config.mjs` for production:

```js
// Example headers for next.config.mjs
headers: async () => [{
  source: '/(.*)',
  headers: [{
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  }, {
    key: 'X-Frame-Options',
    value: 'DENY',
  }, {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  }],
}]
```
