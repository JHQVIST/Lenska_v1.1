import { MerchantOffer, PricePoint, ProductSpecification } from '@/types/product';

const MERCHANTS = [
  { id: 'fotosidan', name: 'Fotosidan', logo: '📷', rating: 4.5, reviews: 1250 },
  { id: 'rajala', name: 'Rajala', logo: '🎯', rating: 4.7, reviews: 890 },
  { id: 'kamera-express', name: 'Kamera-Express', logo: '📸', rating: 4.3, reviews: 2100 },
  { id: 'scandinavian', name: 'Scandinavian Photo', logo: '🌟', rating: 4.6, reviews: 1500 },
  { id: 'inet', name: 'Inet', logo: '💻', rating: 4.4, reviews: 3200 },
];

export function generateMockOffers(basePrice: number): MerchantOffer[] {
  return MERCHANTS.map((merchant, index) => {
    const priceVariation = (Math.random() * 0.15 - 0.05) * basePrice; // ±5-10%
    const price = Math.round(basePrice + priceVariation);
    const shipping = index === 0 ? 0 : Math.round(Math.random() * 100);
    
    return {
      merchantId: merchant.id,
      merchantName: merchant.name,
      merchantLogo: merchant.logo,
      price,
      currency: 'SEK',
      shipping,
      shippingInfo: shipping === 0 ? 'Free shipping' : `${shipping} SEK`,
      availability: 'in stock', // Simplified - all products in stock
      deliveryTime: `${1 + Math.floor(Math.random() * 3)} - ${2 + Math.floor(Math.random() * 4)} days`,
      rating: merchant.rating,
      reviewCount: merchant.reviews,
      url: `https://${merchant.id}.se/product/example`,
      lastUpdated: new Date().toISOString(),
    };
  }).sort((a, b) => (a.price + a.shipping) - (b.price + b.shipping));
}

export function generatePriceHistory(basePrice: number): PricePoint[] {
  const history: PricePoint[] = [];
  const days = 90;
  const today = new Date();
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    
    const variation = Math.sin(i / 10) * basePrice * 0.1;
    const price = Math.round(basePrice + variation);
    
    history.push({
      date: date.toISOString().split('T')[0],
      price,
      merchant: MERCHANTS[Math.floor(Math.random() * MERCHANTS.length)].name,
    });
  }
  
  return history;
}

export function generateSpecifications(productTitle: string): ProductSpecification[] {
  const isCamera = productTitle.toLowerCase().includes('camera') || 
                   productTitle.toLowerCase().includes('body');
  const isLens = productTitle.toLowerCase().includes('lens') || 
                 productTitle.toLowerCase().includes('mm');
  
  if (isCamera) {
    return [
      { name: 'Sensor Type', value: 'Full-frame CMOS', category: 'Image Sensor' },
      { name: 'Resolution', value: '24.2 Megapixels', category: 'Image Sensor' },
      { name: 'ISO Range', value: '100-51200 (expandable to 102400)', category: 'Image Sensor' },
      { name: 'Autofocus Points', value: '693 Phase-detection', category: 'Autofocus' },
      { name: 'Continuous Shooting', value: '10 fps', category: 'Performance' },
      { name: 'Video Recording', value: '4K UHD at 30fps', category: 'Video' },
      { name: 'LCD Screen', value: '3.0" Tilting Touchscreen', category: 'Display' },
      { name: 'Viewfinder', value: 'OLED Electronic', category: 'Display' },
      { name: 'Battery Life', value: 'Approx. 610 shots', category: 'Battery' },
      { name: 'Weight', value: '650g (body only)', category: 'Physical' },
      { name: 'Dimensions', value: '126 x 96 x 74 mm', category: 'Physical' },
      { name: 'Memory Card', value: 'SD, SDHC, SDXC (UHS-II)', category: 'Storage' },
    ];
  } else if (isLens) {
    return [
      { name: 'Focal Length', value: '50mm', category: 'Optical' },
      { name: 'Maximum Aperture', value: 'f/1.2', category: 'Optical' },
      { name: 'Minimum Aperture', value: 'f/16', category: 'Optical' },
      { name: 'Lens Construction', value: '15 elements in 12 groups', category: 'Construction' },
      { name: 'Angle of View', value: '46° (full-frame)', category: 'Optical' },
      { name: 'Minimum Focus', value: '0.4m', category: 'Focus' },
      { name: 'Maximum Magnification', value: '0.19x', category: 'Focus' },
      { name: 'Filter Thread', value: '77mm', category: 'Physical' },
      { name: 'Weight', value: '950g', category: 'Physical' },
      { name: 'Dimensions', value: '89.8 x 108mm', category: 'Physical' },
      { name: 'Weather Sealing', value: 'Yes', category: 'Build Quality' },
    ];
  }
  
  return [
    { name: 'Brand', value: 'Professional', category: 'General' },
    { name: 'Warranty', value: '2 years', category: 'General' },
    { name: 'Country of Origin', value: 'Japan', category: 'General' },
  ];
}
