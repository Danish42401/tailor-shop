'use client';

import { useEffect, useRef, useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/uiStore';
import { searchProducts } from '@/lib/search';

import { ProductCard } from '@/components/product/ProductCard';
import { type Product } from '@/lib/productUtils';

interface SearchModalProps {
    locale: 'en' | 'ar';
    products: Product[];
}

export function SearchModal({ locale, products }: SearchModalProps) {
    const t = useTranslations();
    const { isSearchOpen, searchQuery, setSearchQuery, closeSearch } = useUIStore();
    const inputRef = useRef<HTMLInputElement>(null);
    const focusTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Debounced query — only updates 300ms after the user stops typing
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

    const handleSearchChange = (value: string) => {
        setSearchQuery(value);
        if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = setTimeout(() => setDebouncedQuery(value), 300);
    };

    // Memoised results — only recompute when debounced query, locale, or products change
    const results = useMemo(() => {
        if (debouncedQuery.length < 2) return [];
        return searchProducts(debouncedQuery, products, locale).slice(0, 6);
    }, [debouncedQuery, products, locale]);

    // Focus input when modal opens — store timer ref for cleanup
    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            focusTimerRef.current = setTimeout(() => inputRef.current?.focus(), 100);
        }
        return () => {
            if (focusTimerRef.current) {
                clearTimeout(focusTimerRef.current);
                focusTimerRef.current = null;
            }
        };
    }, [isSearchOpen]);

    // Keyboard: close on Escape
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape') closeSearch();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [closeSearch]);

    // Cleanup debounce timer on unmount
    useEffect(() => {
        return () => {
            if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
        };
    }, []);

    return (
        <AnimatePresence>
            {isSearchOpen && (
                <motion.div
                    key="search-modal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex flex-col"
                    onClick={(e) => { if (e.target === e.currentTarget) closeSearch(); }}
                >
                    <motion.div
                        initial={{ y: -20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        className="bg-white dark:bg-surface-dark p-4 shadow-luxury-lg"
                    >
                        <div className="container mx-auto flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 dark:text-gray-600 shrink-0">
                                <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
                            </svg>
                            <input
                                ref={inputRef}
                                type="search"
                                value={searchQuery}
                                onChange={e => handleSearchChange(e.target.value)}
                                placeholder={t('search.placeholder')}
                                className="flex-1 bg-transparent text-foreground dark:text-foreground-dark placeholder-gray-400 focus:outline-none text-lg"
                            />
                            <button
                                onClick={closeSearch}
                                className="shrink-0 text-gray-400 dark:text-gray-600 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
                                aria-label={t('common.close')}
                            >
                                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    </motion.div>

                    {/* Results */}
                    {searchQuery.length >= 2 && (
                        <div className="flex-1 overflow-y-auto">
                            <div className="container mx-auto py-6">
                                {results.length > 0 ? (
                                    <>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                            {t('search.see_all_results', { count: results.length })}
                                        </p>
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                                            {results.map(product => (
                                                <div key={product.slug} onClick={closeSearch}>
                                                    <ProductCard product={product} locale={locale} />
                                                </div>
                                            ))}
                                        </div>
                                    </>
                                ) : (
                                    <div className="text-center py-12">
                                        <p className="text-gray-500 dark:text-gray-400">
                                            {t('search.no_results', { query: searchQuery })}
                                        </p>
                                        <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                                            {t('search.no_results_hint')}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </motion.div>
            )}
        </AnimatePresence>
    );
}
