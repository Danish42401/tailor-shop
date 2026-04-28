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
    chest?: string;
    shoulder?: string;
    frockLength?: string;
    armhole?: string;
    sleeveLength?: string;
    waist?: string;
    neckWidth?: string;
    neckDepth?: string;
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
