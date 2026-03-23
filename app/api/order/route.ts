import { type NextRequest, NextResponse } from 'next/server';
import { resend, FROM_EMAIL, OWNER_EMAIL } from '@/lib/email/resend';
import { OwnerOrderEmail } from '@/lib/email/templates/ownerOrderEmail';
import { CustomerConfirmEmail } from '@/lib/email/templates/customerConfirmEmail';
import { generalSettings } from '@/lib/settings';
import { orderRequestSchema } from '@/lib/validation';
import { checkRateLimit, getClientIp, rateLimitResponse } from '@/lib/rateLimit';

// 5 orders per minute per IP
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 60_000;

export async function POST(request: NextRequest) {
    // ── Rate limiting ──────────────────────────────────────────────────
    const ip = getClientIp(request);
    const rateCheck = checkRateLimit(`order:${ip}`, RATE_LIMIT, RATE_WINDOW_MS);
    if (!rateCheck.allowed) {
        return rateLimitResponse(rateCheck.retryAfterMs);
    }

    try {
        // ── Input validation ───────────────────────────────────────────
        const rawBody = await request.json();
        const parsed = orderRequestSchema.safeParse(rawBody);

        if (!parsed.success) {
            const errors = parsed.error.flatten();
            console.warn('[/api/order] Validation failed:', errors);
            return NextResponse.json(
                { success: false, error: 'Invalid request data', details: errors.fieldErrors },
                { status: 400 }
            );
        }

        const { items, formData, total, deliveryLabel } = parsed.data;
        const shopName = generalSettings.shop_name_en;

        // ── Notify owner ───────────────────────────────────────────────
        await resend.emails.send({
            from: FROM_EMAIL,
            to: OWNER_EMAIL,
            subject: `🛍️ New Order — AED ${total.toFixed(2)} — ${formData.fullName}`,
            react: OwnerOrderEmail({
                cartItems: items as Parameters<typeof OwnerOrderEmail>[0]['cartItems'],
                formData: formData as Parameters<typeof OwnerOrderEmail>[0]['formData'],
                deliveryLabel,
                total,
            }),
        });

        // ── Customer confirmation (only if email provided) ──────────────
        if (formData.email) {
            await resend.emails.send({
                from: FROM_EMAIL,
                to: formData.email,
                subject: `${shopName} — Order Confirmation`,
                react: CustomerConfirmEmail({
                    customerName: formData.fullName,
                    cartItems: items as Parameters<typeof CustomerConfirmEmail>[0]['cartItems'],
                    total,
                    shopName,
                    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '',
                }),
            });
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('[/api/order]', error);
        return NextResponse.json({ success: false, error: 'Email failed' }, { status: 500 });
    }
}

