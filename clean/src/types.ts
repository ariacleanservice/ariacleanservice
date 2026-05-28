export type ServiceType = 'standard' | 'deep';

export type Frequency = 'one-time' | 'weekly' | 'bi-weekly' | 'monthly';

export interface ExtraService {
  id: string;
  name: string;
  price: number;
  description: string;
  iconName: string;
}

export interface BookingDetails {
  bedrooms: number;
  bathrooms: number;
  serviceType: ServiceType;
  frequency: Frequency;
  selectedExtras: string[];
  date: string;
  time: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerAddress: string;
  additionalNotes?: string;
}

export interface PricingResult {
  basePrice: number;
  bedPrice: number;
  bathPrice: number;
  subtotal: number;
  deepCleanMultiplier: number;
  deepCleanPremium: number;
  frequencyDiscountRate: number;
  frequencyDiscount: number;
  extrasTotal: number;
  totalPrice: number;
}
