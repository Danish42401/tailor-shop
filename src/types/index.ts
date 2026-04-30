export type Category = 'all' | 'mom-daughter' | 'frocks' | 'abaya' | 'accessories';
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'Custom';

export interface Product {
  id: string;
  name: string;
  price: number; // Keeping it in type for internal logic, but we'll hide it in UI
  category: Category;
  description: string;
  icon: string; 
  imageUrl?: string;
  rating: number;
  isPair: boolean;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  availableSizes?: Size[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize?: Size;
}

export interface Measurements {
  fullLength?: string;
  chestWidth?: string;
  waistWidth?: string;
  hipWidth?: string;
  shoulderWidth?: string;
  sleeveLength?: string;
  armOpening?: string;
  neckCollar?: string;
  neckDepthFront?: string;
  neckDepthBack?: string;
  other?: string;
  [key: string]: string | undefined;
}

export interface FormData {
  customerName: string;
  phoneNumber?: string;
  unit: "inch" | "cm";
  measurements: Measurements;
  notes: string;
}

export interface CustomOrderRequest {
  customerName: string;
  phoneNumber?: string;
  notes: string;
  measurements: Measurements;
}

export interface SiteSettings {
  whatsappNumber: string;
  shopAddress: string;
  heroTitle: string;
  heroSubtitle: string;
}
