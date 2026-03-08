import generalData from '@/content/settings/general.json';
import contactData from '@/content/settings/contact.json';
import themeData from '@/content/settings/theme.json';
import announcementData from '@/content/settings/announcement.json';
import homepageData from '@/content/settings/homepage.json';
import shopData from '@/content/settings/shop.json';
import sizeGuideData from '@/content/settings/size-guide.json';
import legalData from '@/content/settings/legal.json';

export const generalSettings = generalData as GeneralSettings;
export const contactSettings = contactData as ContactSettings;
export const themeSettings = themeData as ThemeSettings;
export const announcementSettings = announcementData as AnnouncementSettings;
export const homepageSettings = homepageData as HomepageSettings;
export const shopSettings = shopData as ShopSettings;
export const sizeGuideSettings = sizeGuideData as SizeGuideSettings;
export const legalSettings = legalData as LegalSettings;

// ── Types ─────────────────────────────────────────────────────────────────

export interface GeneralSettings {
    shop_name_en: string;
    shop_name_ar: string;
    tagline_en: string;
    tagline_ar: string;
    logo: string;
    favicon: string;
    currency: string;
    default_locale: 'en' | 'ar';
}

export interface ContactSettings {
    whatsapp_number: string;
    email: string;
    phone: string;
    address_en: string;
    address_ar: string;
    city: string;
    social_links: {
        instagram: string;
        facebook: string;
        tiktok: string;
        pinterest?: string;
    };
}

export interface ThemeSettings {
    theme_color: string;
    primary_color: string;
    accent_color: string;
    background_light: string;
    surface_light: string;
    text_light: string;
    background_dark: string;
    surface_dark: string;
    text_dark: string;
    custom_css: string;
}

export interface AnnouncementSettings {
    enabled: boolean;
    text_en: string;
    text_ar: string;
    linkText_en: string;
    linkText_ar: string;
    linkUrl: string;
    backgroundColor: string;
    textColor: string;
}

export interface HeroSection {
    enabled: boolean;
    heading_en: string;
    heading_ar: string;
    subheading_en: string;
    subheading_ar: string;
    cta_en: string;
    cta_ar: string;
    cta_link: string;
    image: string;
}

export interface HomepageSection {
    enabled: boolean;
    title_en: string;
    title_ar: string;
    limit?: number;
}

export interface HomepageSettings {
    hero: HeroSection;
    new_arrivals: HomepageSection;
    best_sellers: HomepageSection;
    sale: HomepageSection;
    categories_grid: HomepageSection;
    how_to_order: HomepageSection;
    testimonials: HomepageSection;
    faq_preview: { enabled: boolean; limit: number };
}

export interface DeliveryMethod {
    value: string;
    label_en: string;
    label_ar: string;
    enabled: boolean;
}

export interface LocalizedOption {
    label_en: string;
    label_ar: string;
    value: string;
}

export interface ShopSettings {
    delivery_methods: DeliveryMethod[];
    age_sizes: Array<{ size: string }>;
    standard_sizes: Array<{ size: string }>;
    fabrics: LocalizedOption[];
    sleeve_styles: LocalizedOption[];
    embroidery_options?: LocalizedOption[];
}

export interface SizeChartRow {
    age?: string;
    size?: string;
    chest: string;
    length: string;
    sleeves?: string;
    waist?: string;
}

export interface SizeGuideSettings {
    age_chart: SizeChartRow[];
    standard_chart: SizeChartRow[];
    note_en: string;
    note_ar: string;
}

export interface LegalSettings {
    privacy_en: string;
    privacy_ar: string;
    terms_en: string;
    terms_ar: string;
    last_updated: string;
}

// ── CSS Variable injection helper ──────────────────────────────────────────

export function generateThemeCSSVars(theme: ThemeSettings): string {
    return `
    --color-primary: ${theme.primary_color};
    --color-primary-hover: ${theme.primary_color};
    --color-accent: ${theme.accent_color};
    --color-background: ${theme.background_light};
    --color-surface: ${theme.surface_light};
    --color-text: ${theme.text_light};
    --color-background-dark: ${theme.background_dark};
    --color-surface-dark: ${theme.surface_dark};
    --color-text-dark: ${theme.text_dark};
  `.trim();
}
