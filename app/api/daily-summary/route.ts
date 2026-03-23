import { type NextRequest, NextResponse } from 'next/server';
import { resend, FROM_EMAIL, OWNER_EMAIL } from '@/lib/email/resend';
import { DailySummaryEmail } from '@/lib/email/templates/dailySummaryEmail';
import { generalSettings } from '@/lib/settings';
import { checkRateLimit, getClientIp, rateLimitResponse } from '@/lib/rateLimit';

// This route is called by Vercel cron at 23:00 UTC every day
// Limit to 1 request per hour to prevent abuse
const RATE_LIMIT = 1;
const RATE_WINDOW_MS = 60 * 60_000; // 1 hour

export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Rate limiting — cron runner IPs are trusted, but still protect the endpoint
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`daily-summary:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.retryAfterMs);
    }

    const date = new Date().toLocaleDateString('en-AE', {
        year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Dubai',
    });

    // In production, you'd pull orders from a DB or KV store here
    // For now, sends an empty summary to confirm the cron is working
    await resend.emails.send({
        from: FROM_EMAIL,
        to: OWNER_EMAIL,
        subject: `📊 Daily Order Summary — ${date}`,
        react: DailySummaryEmail({
            date,
            orders: [],
            grandTotal: 0,
            shopName: generalSettings.shop_name_en,
        }),
    });

    return NextResponse.json({ success: true, date });
}

