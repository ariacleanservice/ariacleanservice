import { ExtraService, PricingResult, ServiceType, Frequency } from './types';

export const EXTRA_SERVICES_LIST: ExtraService[] = [
  {
    id: 'fridge',
    name: 'Inside Refrigerator',
    price: 15,
    description: 'Thorough cleaning and organization of refrigerator shelves and drawers.',
    iconName: 'Refrigerator',
  },
  {
    id: 'oven',
    name: 'Interior Oven',
    price: 20,
    description: 'Baking soda extraction or high-heat wipe down of rack grease and carbon build-up.',
    iconName: 'Flame',
  },
  {
    id: 'windows',
    name: 'Interior Windows',
    price: 45,
    description: 'Squeegee cleaning of glass, sills, and tracking from inside.',
    iconName: 'Window',
  },
  {
    id: 'cabinets',
    name: 'Inside Cabinets',
    price: 40,
    description: 'Wipe-out of interior food cupboards and bathroom vanities (must be empty).',
    iconName: 'Archive',
  },
  {
    id: 'laundry',
    name: 'Load of Laundry',
    price: 25,
    description: 'Wash, dry, and clean fold of one standard basket of linens or clothing.',
    iconName: 'Shirt',
  },
];

export const calculatePricing = (
  bedrooms: number,
  bathrooms: number,
  serviceType: ServiceType,
  frequency: Frequency,
  selectedExtras: string[]
): PricingResult => {
  // Base model specified in prompt:
  // Base pricing: $120 for 1-bed/1-bath.
  // Add $25 per additional bedroom, $35 per additional bathroom.
  // Deep clean is 1.4x multiplier.
  const basePrice = 120;
  const bedPrice = Math.max(0, bedrooms - 1) * 25;
  const bathPrice = Math.max(0, bathrooms - 1) * 35;
  const initialSubtotal = basePrice + bedPrice + bathPrice;

  let deepCleanPremium = 0;
  let activeSubtotal = initialSubtotal;

  if (serviceType === 'deep') {
    activeSubtotal = initialSubtotal * 1.4;
    deepCleanPremium = initialSubtotal * 0.4;
  }

  // Calculate extras
  let extrasTotal = 0;
  selectedExtras.forEach((extraId) => {
    const extra = EXTRA_SERVICES_LIST.find((item) => item.id === extraId);
    if (extra) {
      extrasTotal += extra.price;
    }
  });

  const totalBeforeDiscount = activeSubtotal + extrasTotal;

  // Frequencies and discounts:
  // Weekly: 15% off, Bi-weekly: 10% off, Monthly: 5% off, One-time: 0% off
  let frequencyDiscountRate = 0;
  if (frequency === 'weekly') {
    frequencyDiscountRate = 0.15;
  } else if (frequency === 'bi-weekly') {
    frequencyDiscountRate = 0.10;
  } else if (frequency === 'monthly') {
    frequencyDiscountRate = 0.05;
  }

  const frequencyDiscount = totalBeforeDiscount * frequencyDiscountRate;
  const totalPrice = totalBeforeDiscount - frequencyDiscount;

  return {
    basePrice,
    bedPrice,
    bathPrice,
    subtotal: initialSubtotal,
    deepCleanMultiplier: serviceType === 'deep' ? 1.4 : 1.0,
    deepCleanPremium,
    frequencyDiscountRate,
    frequencyDiscount,
    extrasTotal,
    totalPrice,
  };
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(value);
};
