export type Category = 'all' | 'mom-daughter' | 'frocks' | 'abaya' | 'accessories';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  description: string;
  icon: string; // Used as placeholder for images
  imageUrl?: string;
  rating: number;
  isPair: boolean;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CustomOrderRequest {
  customerName: string;
  phoneNumber: string;
  measurements: {
    length?: string;
    chest?: string;
    waist?: string;
    shoulder?: string;
    shoulderToWaist?: string;
    armhole?: string;
    sleeveLength?: string;
    neckWidth?: string;
    neckDepth?: string;
    hemWidth?: string;
    [key: string]: string | undefined;
  };
  notes: string;
  preferredFabric?: string;
}

export interface SiteSettings {
  whatsappNumber: string;
  shopAddress: string;
  heroTitle: string;
  heroSubtitle: string;
}
