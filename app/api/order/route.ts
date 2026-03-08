import { type NextRequest, NextResponse } from 'next/server';
import { resend, FROM_EMAIL, OWNER_EMAIL } from '@/lib/email/resend';
import { OwnerOrderEmail } from '@/lib/email/templates/ownerOrderEmail';
import { CustomerConfirmEmail } from '@/lib/email/templates/customerConfirmEmail';
import { generalSettings } from '@/lib/settings';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json() as {
            items: unknown[];
            formData: { fullName: string; email?: string; phone: string };
            total: number;
            deliveryLabel: string;
        };

        const { items, formData, total, deliveryLabel } = body;
        const shopName = generalSettings.shop_name_en;

        // 1. Notify owner
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

        // 2. Send customer confirmation (only if email provided)
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
