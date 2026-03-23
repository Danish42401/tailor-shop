'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useTranslations } from 'next-intl';
import { shopSettings } from '@/lib/settings';

const checkoutSchema = z.object({
    fullName: z.string().min(2),
    phone: z
        .string()
        .min(8, 'Phone number too short')
        .max(20, 'Phone number too long')
        .regex(
            /^(\+?[1-9]\d{1,3}[\s\-]?)?[\d\s\-]{6,14}\d$/,
            'Please enter a valid phone number (e.g. +971501234567 or +923001234567)'
        ),
    email: z.string().email().optional().or(z.literal('')),
    city: z.string().min(2),
    address: z.string().min(5),
    deliveryMethod: z.string().min(1),
    notes: z.string().max(300).optional(),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

interface CheckoutFormProps {
    locale: 'en' | 'ar';
    onSubmit: (data: CheckoutFormValues) => void;
}

export function CheckoutForm({ locale, onSubmit }: CheckoutFormProps) {
    const t = useTranslations('checkout');
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutFormValues>({
        resolver: zodResolver(checkoutSchema),
    });

    const deliveryMethods = shopSettings.delivery_methods.filter(m => m.enabled);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Full Name */}
            <div>
                <label className="block text-sm font-medium text-foreground dark:text-foreground-dark mb-1.5">
                    {t('full_name')} <span className="text-red-500">*</span>
                </label>
                <input
                    {...register('fullName')}
                    type="text"
                    placeholder={t('full_name_placeholder')}
                    className="w-full px-4 py-3 rounded-xl border border-purple-200 dark:border-purple-800
                     bg-white dark:bg-surface-dark text-foreground dark:text-foreground-dark
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                     focus:border-primary transition-colors"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{t('validation.name_required')}</p>}
            </div>

            {/* Phone */}
            <div>
                <label htmlFor="checkout-phone" className="block text-sm font-medium text-foreground dark:text-foreground-dark mb-1.5">
                    {t('phone')} <span className="text-red-500" aria-hidden>*</span>
                </label>
                <input
                    {...register('phone')}
                    id="checkout-phone"
                    type="tel"
                    placeholder={t('phone_placeholder')}
                    dir="ltr"
                    aria-describedby="checkout-phone-hint"
                    className="w-full px-4 py-3 rounded-xl border border-purple-200 dark:border-purple-800
                     bg-white dark:bg-surface-dark text-foreground dark:text-foreground-dark
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                     focus:border-primary transition-colors"
                />
                <p id="checkout-phone-hint" className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    e.g. +971501234567 or +923001234567
                </p>
                {errors.phone && <p className="text-red-500 text-xs mt-1" role="alert">{t('validation.phone_required')}</p>}
            </div>

            {/* Email (optional) */}
            <div>
                <label className="block text-sm font-medium text-foreground dark:text-foreground-dark mb-1.5">
                    {t('email')}
                </label>
                <input
                    {...register('email')}
                    type="email"
                    placeholder={t('email_placeholder')}
                    dir="ltr"
                    className="w-full px-4 py-3 rounded-xl border border-purple-200 dark:border-purple-800
                     bg-white dark:bg-surface-dark text-foreground dark:text-foreground-dark
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                     focus:border-primary transition-colors"
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{t('validation.email_invalid')}</p>}
            </div>

            {/* City */}
            <div>
                <label className="block text-sm font-medium text-foreground dark:text-foreground-dark mb-1.5">
                    {t('city')} <span className="text-red-500">*</span>
                </label>
                <input
                    {...register('city')}
                    type="text"
                    placeholder={t('city_placeholder')}
                    className="w-full px-4 py-3 rounded-xl border border-purple-200 dark:border-purple-800
                     bg-white dark:bg-surface-dark text-foreground dark:text-foreground-dark
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                     focus:border-primary transition-colors"
                />
                {errors.city && <p className="text-red-500 text-xs mt-1">{t('validation.city_required')}</p>}
            </div>

            {/* Address */}
            <div>
                <label className="block text-sm font-medium text-foreground dark:text-foreground-dark mb-1.5">
                    {t('address')} <span className="text-red-500">*</span>
                </label>
                <textarea
                    {...register('address')}
                    rows={3}
                    placeholder={t('address_placeholder')}
                    className="w-full px-4 py-3 rounded-xl border border-purple-200 dark:border-purple-800
                     bg-white dark:bg-surface-dark text-foreground dark:text-foreground-dark
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                     focus:border-primary transition-colors resize-none"
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{t('validation.address_required')}</p>}
            </div>

            {/* Delivery Method */}
            <div>
                <label className="block text-sm font-medium text-foreground dark:text-foreground-dark mb-2">
                    {t('delivery_method')} <span className="text-red-500">*</span>
                </label>
                <div className="space-y-2">
                    {deliveryMethods.map(method => (
                        <label
                            key={method.value}
                            className="flex items-center gap-3 p-3 rounded-xl border border-purple-100 dark:border-purple-800 cursor-pointer hover:border-primary transition-colors"
                        >
                            <input
                                {...register('deliveryMethod')}
                                type="radio"
                                value={method.value}
                                className="accent-primary"
                            />
                            <span className="text-sm text-foreground dark:text-foreground-dark">
                                {locale === 'ar' ? method.label_ar : method.label_en}
                            </span>
                        </label>
                    ))}
                </div>
                {errors.deliveryMethod && <p className="text-red-500 text-xs mt-1">{t('validation.delivery_required')}</p>}
            </div>

            {/* Notes */}
            <div>
                <label className="block text-sm font-medium text-foreground dark:text-foreground-dark mb-1.5">
                    {t('notes')}
                </label>
                <textarea
                    {...register('notes')}
                    rows={3}
                    placeholder={t('notes_placeholder')}
                    className="w-full px-4 py-3 rounded-xl border border-purple-200 dark:border-purple-800
                     bg-white dark:bg-surface-dark text-foreground dark:text-foreground-dark
                     placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/50
                     focus:border-primary transition-colors resize-none"
                />
            </div>

            {/* Submit — handled by parent via WhatsApp button */}
            <input type="submit" id="checkout-submit" className="sr-only" aria-hidden />
        </form>
    );
}
