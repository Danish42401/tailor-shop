import { useCartStore } from '@/store/cartStore';

// Mock zustand persist for tests
beforeEach(() => {
    useCartStore.setState({ items: [], isOpen: false });
});

describe('Cart Store', () => {
    const mockItem = {
        productId: 'test-item',
        name_en: 'Test Item',
        name_ar: 'عنصر اختبار',
        price: 50,
        quantity: 1,
        image: '/test.jpg',
        isCustom: false,
    };

    test('adds item to cart', () => {
        useCartStore.getState().addItem(mockItem);
        const state = useCartStore.getState();

        expect(state.items).toHaveLength(1);
        expect(state.items[0].productId).toBe('test-item');
        expect(state.isOpen).toBe(true); // Should open drawer
    });

    test('increments quantity if item exists', () => {
        useCartStore.getState().addItem(mockItem);
        useCartStore.getState().addItem(mockItem);

        const state = useCartStore.getState();
        expect(state.items).toHaveLength(1);
        expect(state.items[0].quantity).toBe(2);
    });

    test('adds distinct items if customized differently', () => {
        // Add base
        useCartStore.getState().addItem(mockItem);

        // Add customized
        useCartStore.getState().addItem({
            ...mockItem,
            isCustom: true,
            customization: {
                sizeType: 'age',
                ageSize: '3Y',
                color: 'Pink',
                fabric: 'Cotton',
                sleeveStyle: 'Short',
                embroidery: 'None'
            },
        });

        const state = useCartStore.getState();
        expect(state.items).toHaveLength(2); // Should be distinct records
    });
});
