import { type CartItem } from '@/store/cartStore';
import { type CheckoutFormValues } from '@/components/checkout/CheckoutForm';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tailor-shop.vercel.app';
const CURRENCY = 'AED';

function formatPrice(price: number): string {
    return `${CURRENCY} ${price.toFixed(2)}`;
}

function buildItemLine(item: CartItem, locale: 'en' | 'ar'): string {
    const name = locale === 'ar' ? item.name_ar : item.name_en;
    const qty = locale === 'ar' ? `الكمية: ${item.quantity}` : `Qty: ${item.quantity}`;
    const price = locale === 'ar'
        ? `السعر: ${formatPrice(item.price * item.quantity)}`
        : `Price: ${formatPrice(item.price * item.quantity)}`;

    let customBlock = '';
    if (item.customization) {
        const c = item.customization;
        if (locale === 'ar') {
            customBlock = `   ✂️ التخصيص:\n` +
                (c.ageSize ? `   • المقاس (عمر): ${c.ageSize}\n` : '') +
                (c.standardSize ? `   • المقاس: ${c.standardSize}\n` : '') +
                (c.customMeasurements
                    ? `   • الصدر: ${c.customMeasurements.chest} سم | الطول: ${c.customMeasurements.length} سم | الأكمام: ${c.customMeasurements.sleeves} سم\n`
                    : '') +
                (c.color ? `   • اللون: ${c.color}\n` : '') +
                (c.fabric ? `   • القماش: ${c.fabric}\n` : '') +
                (c.sleeveStyle ? `   • طراز الكم: ${c.sleeveStyle}\n` : '') +
                (c.embroidery ? `   • التطريز: ${c.embroidery}\n` : '') +
                (c.embroideryNote ? `   • ملاحظة التطريز: ${c.embroideryNote}\n` : '') +
                (c.specialInstructions ? `   • تعليمات خاصة: ${c.specialInstructions}\n` : '');
        } else {
            customBlock = `   ✂️ Customization:\n` +
                (c.ageSize ? `   • Size (Age): ${c.ageSize}\n` : '') +
                (c.standardSize ? `   • Size: ${c.standardSize}\n` : '') +
                (c.customMeasurements
                    ? `   • Chest: ${c.customMeasurements.chest}cm | Length: ${c.customMeasurements.length}cm | Sleeves: ${c.customMeasurements.sleeves}cm\n`
                    : '') +
                (c.color ? `   • Color: ${c.color}\n` : '') +
                (c.fabric ? `   • Fabric: ${c.fabric}\n` : '') +
                (c.sleeveStyle ? `   • Sleeves: ${c.sleeveStyle}\n` : '') +
                (c.embroidery ? `   • Embroidery: ${c.embroidery}\n` : '') +
                (c.embroideryNote ? `   • Embroidery Note: ${c.embroideryNote}\n` : '') +
                (c.specialInstructions ? `   • Special Notes: ${c.specialInstructions}\n` : '');
        }
    }

    return `• ${name}\n   ${qty} | ${price}\n${customBlock}`;
}

export function buildWhatsAppMessage(
    cartItems: CartItem[],
    formData: CheckoutFormValues,
    deliveryLabel: string,
    locale: 'en' | 'ar'
): string {
    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    if (locale === 'ar') {
        const itemsBlock = cartItems.map(item => buildItemLine(item, 'ar')).join('\n');
        return encodeURIComponent(
            `🛍️ *طلب جديد من بوتيك نور*\n\n` +
            `📋 *معلومات العميل*\n` +
            `• الاسم: ${formData.fullName}\n` +
            `• الهاتف: ${formData.phone}\n` +
            (formData.email ? `• البريد: ${formData.email}\n` : '') +
            `• المدينة: ${formData.city}\n` +
            `• العنوان: ${formData.address}\n\n` +
            `🛒 *عناصر الطلب*\n${itemsBlock}\n` +
            `🚚 *طريقة التوصيل:* ${deliveryLabel}\n\n` +
            `💰 *الإجمالي: ${formatPrice(total)}*\n` +
            (formData.notes ? `📝 *ملاحظات:* ${formData.notes}\n\n` : '\n') +
            `الطلب من: ${SITE_URL}/ar`
        );
    }

    const itemsBlock = cartItems.map(item => buildItemLine(item, 'en')).join('\n');
    return encodeURIComponent(
        `🛍️ *New Order from Noor Boutique*\n\n` +
        `📋 *Customer Information*\n` +
        `• Name: ${formData.fullName}\n` +
        `• Phone: ${formData.phone}\n` +
        (formData.email ? `• Email: ${formData.email}\n` : '') +
        `• City: ${formData.city}\n` +
        `• Address: ${formData.address}\n\n` +
        `🛒 *Order Items*\n${itemsBlock}\n` +
        `🚚 *Delivery Method:* ${deliveryLabel}\n\n` +
        `💰 *Total: ${formatPrice(total)}*\n` +
        (formData.notes ? `📝 *Notes:* ${formData.notes}\n\n` : '\n') +
        `Order from: ${SITE_URL}/en`
    );
}

export function buildWhatsAppOrderUrl(
    cartItems: CartItem[],
    formData: CheckoutFormValues,
    deliveryLabel: string,
    locale: 'en' | 'ar',
    whatsappNumber: string
): string {
    const message = buildWhatsAppMessage(cartItems, formData, deliveryLabel, locale);
    return `https://wa.me/${whatsappNumber}?text=${message}`;
}

export function buildNotifyMeUrl(
    productName: string,
    whatsappNumber: string,
    locale: 'en' | 'ar'
): string {
    const msg = locale === 'ar'
        ? `مرحباً، أنا مهتمة بـ "${productName}" وأودّ إخطاري عند عودته للمخزون.`
        : `Hi, I'm interested in "${productName}" and would like to be notified when it's back in stock.`;
    return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

export function buildShareMessage(
    productName: string,
    productUrl: string,
    price: number,
    shopName: string,
    locale: 'en' | 'ar'
): string {
    if (locale === 'ar') {
        return encodeURIComponent(
            `👗 شاهدي هذا المنتج من ${shopName}:\n${productName}\n💰 السعر: ${formatPrice(price)}\n${productUrl}`
        );
    }
    return encodeURIComponent(
        `👗 Check out this product from ${shopName}:\n${productName}\n💰 Price: ${formatPrice(price)}\n${productUrl}`
    );
}
