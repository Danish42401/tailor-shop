import { type NextRequest, NextResponse } from 'next/server';

// ── In-memory sliding window rate limiter ──────────────────────────────────
//
// NOTE: In a multi-instance environment (Vercel production), each serverless
// function instance has its own in-memory store, so this provides a
// per-instance limit rather than a global one. For production at scale,
// replace with @upstash/ratelimit + @upstash/redis.

interface RateLimitEntry {
    count: number;
    windowStart: number;
}

const store = new Map<string, RateLimitEntry>();

/**
 * Check if a request is within the rate limit.
 *
 * @param key       - Unique identifier (e.g. IP address)
 * @param limit     - Maximum number of requests allowed per window
 * @param windowMs  - Time window in milliseconds
 * @returns `{ allowed: true }` or `{ allowed: false, retryAfterMs: number }`
 */
export function checkRateLimit(
    key: string,
    limit: number,
    windowMs: number
): { allowed: true } | { allowed: false; retryAfterMs: number } {
    const now = Date.now();
    const entry = store.get(key);

    if (!entry || now - entry.windowStart > windowMs) {
        // New window
        store.set(key, { count: 1, windowStart: now });
        return { allowed: true };
    }

    if (entry.count < limit) {
        entry.count++;
        return { allowed: true };
    }

    const retryAfterMs = windowMs - (now - entry.windowStart);
    return { allowed: false, retryAfterMs };
}

/**
 * Helper: get the real client IP from Next.js request headers.
 */
export function getClientIp(request: NextRequest): string {
    return (
        request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
        request.headers.get('x-real-ip') ??
        'unknown'
    );
}

/**
 * Helper: return a 429 Too Many Requests response with Retry-After header.
 */
export function rateLimitResponse(retryAfterMs: number): NextResponse {
    const retryAfterSec = Math.ceil(retryAfterMs / 1000);
    return NextResponse.json(
        {
            success: false,
            error: 'Too many requests. Please try again later.',
            retryAfter: retryAfterSec,
        },
        {
            status: 429,
            headers: {
                'Retry-After': String(retryAfterSec),
                'X-RateLimit-Reset': String(Date.now() + retryAfterMs),
            },
        }
    );
}
