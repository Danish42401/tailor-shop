import { buildWhatsAppOrderUrl } from '@/lib/whatsapp';
import type { CartItem } from '@/store/cartStore';

describe('WhatsApp Message Builder', () => {
    const mockItems: CartItem[] = [
        {
            id: '1',
            productId: 'test-frock',
            name_en: 'Test Frock',
            name_ar: 'فستان اختبار',
            price: 100,
            quantity: 2,
            image: '/test.jpg',
            isCustom: false,
        }
    ];

    const mockFormData = {
        fullName: 'John Doe',
        phone: '+971501234567',
        city: 'Dubai',
        address: 'Downtown, Burj Khalifa',
        deliveryMethod: 'express',
    };

    test('builds English message correctly', () => {
        const defaultNumber = '971500000000';
        const url = buildWhatsAppOrderUrl(mockItems, mockFormData, 'Express Delivery', 'en', defaultNumber);

        expect(url).toContain('https://wa.me/971500000000');
        expect(url).toContain('text=');

        // Decode URI component to check contents
        const text = decodeURIComponent(url.split('text=')[1]);

        expect(text).toContain('New Order from');
        expect(text).toContain('John Doe');
        expect(text).toContain('Test Frock');
        expect(text).toContain('Total: AED 200.00');
    });

    test('builds Arabic message correctly', () => {
        const defaultNumber = '971500000000';
        const url = buildWhatsAppOrderUrl(mockItems, mockFormData, 'توصيل سريع', 'ar', defaultNumber);

        const text = decodeURIComponent(url.split('text=')[1]);

        expect(text).toContain('طلب جديد من');
        expect(text).toContain('فستان اختبار');
        expect(text).toContain('الإجمالي: AED 200.00');
    });
});
