import { z } from 'zod';

// ── Cart Item Schema ────────────────────────────────────────────────────────

export const cartItemCustomizationSchema = z.object({
    sizeType: z.enum(['age', 'standard', 'custom']),
    ageSize: z.string().optional(),
    standardSize: z.string().optional(),
    customMeasurements: z.object({
        chest: z.string(),
        length: z.string(),
        sleeves: z.string(),
    }).optional(),
    color: z.string(),
    fabric: z.string(),
    sleeveStyle: z.string(),
    embroidery: z.string(),
    embroideryNote: z.string().optional(),
    specialInstructions: z.string().max(500).optional(),
});

export const cartItemSchema = z.object({
    id: z.string(),
    productId: z.string().min(1),
    name_en: z.string().min(1),
    name_ar: z.string().min(1),
    price: z.number().positive(),
    quantity: z.number().int().positive().max(99),
    image: z.string(),
    isCustom: z.boolean(),
    customization: cartItemCustomizationSchema.optional(),
});

// ── Checkout Form Schema ────────────────────────────────────────────────────

export const checkoutFormSchema = z.object({
    fullName: z.string().min(2, 'Name must be at least 2 characters').max(100),
    /**
     * Supports international phone formats:
     *  - UAE:           +9715XXXXXXXX
     *  - Pakistan:      +923XXXXXXXXX
     *  - Generic intl:  +[1-3 country code digits][6-14 digits]
     * Also accepts local formats without + (8-15 digits)
     */
    phone: z
        .string()
        .min(8, 'Phone number too short')
        .max(20, 'Phone number too long')
        .regex(
            /^(\+?[1-9]\d{1,3}[\s\-]?)?[\d\s\-]{6,14}\d$/,
            'Please enter a valid phone number (e.g. +971501234567)'
        ),
    email: z.string().email('Invalid email address').optional().or(z.literal('')),
    city: z.string().min(2, 'City is required').max(100),
    address: z.string().min(5, 'Address must be at least 5 characters').max(500),
    deliveryMethod: z.string().min(1, 'Please select a delivery method'),
    notes: z.string().max(300).optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutFormSchema>;

// ── Order API Request Schema ────────────────────────────────────────────────

export const orderRequestSchema = z.object({
    items: z.array(cartItemSchema).min(1, 'Cart cannot be empty').max(50),
    formData: checkoutFormSchema,
    total: z.number().positive(),
    deliveryLabel: z.string().min(1).max(200),
});

export type OrderRequest = z.infer<typeof orderRequestSchema>;
