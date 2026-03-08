import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// ── Types ─────────────────────────────────────────────────────────────────

export interface CustomMeasurements {
    chest: string;
    length: string;
    sleeves: string;
}

export interface CartItemCustomization {
    sizeType: 'age' | 'standard' | 'custom';
    ageSize?: string;
    standardSize?: string;
    customMeasurements?: CustomMeasurements;
    color: string;
    fabric: string;
    sleeveStyle: string;
    embroidery: string;
    embroideryNote?: string;
    specialInstructions?: string;
}

export interface CartItem {
    id: string;            // unique cart entry ID (productId + customization hash)
    productId: string;     // product slug
    name_en: string;
    name_ar: string;
    price: number;
    quantity: number;
    image: string;
    isCustom: boolean;
    customization?: CartItemCustomization;
}

interface CartStore {
    items: CartItem[];
    isOpen: boolean;

    // Actions
    addItem: (item: Omit<CartItem, 'id'>) => void;
    removeItem: (id: string) => void;
    updateQuantity: (id: string, quantity: number) => void;
    clearCart: () => void;
    openCart: () => void;
    closeCart: () => void;
    toggleCart: () => void;

    // Computed (derived)
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

// ── Helper ───────────────────────────────────────────────────────────────

function generateCartId(productId: string, customization?: CartItemCustomization): string {
    if (!customization) return productId;
    return `${productId}__${JSON.stringify(customization)}`;
}

// ── Store ─────────────────────────────────────────────────────────────────

export const useCartStore = create<CartStore>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (newItem) => {
                const id = generateCartId(newItem.productId, newItem.customization);
                set(state => {
                    const existing = state.items.find(i => i.id === id);
                    if (existing) {
                        return {
                            items: state.items.map(i =>
                                i.id === id ? { ...i, quantity: i.quantity + newItem.quantity } : i
                            ),
                            isOpen: true,
                        };
                    }
                    return {
                        items: [...state.items, { ...newItem, id }],
                        isOpen: true,
                    };
                });
            },

            removeItem: (id) => {
                set(state => ({ items: state.items.filter(i => i.id !== id) }));
            },

            updateQuantity: (id, quantity) => {
                if (quantity < 1) {
                    get().removeItem(id);
                    return;
                }
                set(state => ({
                    items: state.items.map(i => i.id === id ? { ...i, quantity } : i),
                }));
            },

            clearCart: () => set({ items: [] }),

            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
            toggleCart: () => set(state => ({ isOpen: !state.isOpen })),

            getTotalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),
            getTotalPrice: () => get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        }),
        {
            name: 'tailor-shop-cart',
            partialize: (state) => ({ items: state.items }),
        }
    )
);
