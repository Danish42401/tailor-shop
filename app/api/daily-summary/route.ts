import { type NextRequest, NextResponse } from 'next/server';
import { resend, FROM_EMAIL, OWNER_EMAIL } from '@/lib/email/resend';
import { DailySummaryEmail } from '@/lib/email/templates/dailySummaryEmail';
import { generalSettings } from '@/lib/settings';

// This route is called by Vercel cron at 23:00 UTC every day
// Add `CRON_SECRET` to env and validate it here in production
export async function GET(request: NextRequest) {
    const authHeader = request.headers.get('authorization');
    if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
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
