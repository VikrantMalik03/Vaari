export const SLOGAN = 'Stay Pure, Stay Hydrated';

export const CONTACT = {
  phone: '9268448510',
  phoneHref: 'tel:+919268448510',
  whatsapp: '8929695631',
  whatsappHref: 'https://wa.me/918929695631',
  email: 'Vaarisatpremsolutions@yahoo.com',
  emailHref: 'mailto:Vaarisatpremsolutions@yahoo.com',
  hours: '9:00 AM - 6:00 PM',
  days: 'Monday to Saturday',
};

export const NAV_LINKS = [
  { name: 'Products', href: '#products' },
  { name: 'About', href: '#about' },
  { name: 'White Label', href: '#white-label' },
  { name: 'Delivery', href: '#delivery' },
  { name: 'Testimonials', href: '#testimonials' },
  { name: 'Contact', href: '#contact' },
  { name: 'Feedback', href: '/feedback' },
];

export const CITIES = ['Faridabad', 'Gurgaon', 'Hodal', 'Palwal',];

export type ProductTheme = 'light' | 'copper' | 'deep';

export interface Product {
  id: string;
  name: string;
  line: 'Classic' | 'Premium' | 'Bulk';
  tab: string;
  size: string;
  numeral: string;
  description: string;
  /** Rendered image in /public. */
  image: string;
  /** Bottle height within the stage, so the sizes read true against each other. */
  heightPct: number;
  background: string;
  foreground: string;
  theme: ProductTheme;
  /** Shown in place of a price while one is not set. */
  priceNote?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: '200ml',
    name: 'Pure Aqua 200ml',
    line: 'Classic',
    tab: '200 ml',
    size: '200 ml',
    numeral: '200',
    description: 'Perfect for daily hydration and on-the-go refreshment',
    image: '/bottles/vaari-classic-200ml.webp',
    heightPct: 66,
    background: '#c9e8f1',
    foreground: '#07263a',
    theme: 'light',
  },
  {
    id: '500ml',
    name: 'Pure Aqua 500ml',
    line: 'Classic',
    tab: '500 ml',
    size: '500 ml',
    numeral: '500',
    description: 'Ideal for home, office, and outdoor activities',
    image: '/bottles/vaari-classic-500ml.webp',
    heightPct: 82,
    background: '#b5dfea',
    foreground: '#07263a',
    theme: 'light',
  },
  {
    id: '1l',
    name: 'Pure Aqua 1L',
    line: 'Classic',
    tab: '1 L',
    size: '1 L',
    numeral: '1L',
    description: 'Family size for shared meals and gatherings',
    image: '/bottles/vaari-classic-1l.webp',
    heightPct: 96,
    background: '#9ed6e5',
    foreground: '#07263a',
    theme: 'light',
  },
  {
    id: '1l-premium',
    name: 'Premium Crystal 1L',
    line: 'Premium',
    tab: '1 L Premium',
    size: '1 L',
    numeral: '1L',
    description: 'Luxury hydration experience for discerning customers',
    image: '/bottles/vaari-premium-1l.webp',
    heightPct: 96,
    background: '#3a1c0d',
    foreground: '#fdf3ea',
    theme: 'copper',
  },
  {
    id: '20l',
    name: 'Pure Aqua 20L',
    line: 'Bulk',
    tab: '20 L',
    size: '20 L',
    numeral: '20L',
    description: 'Our largest size, made for homes, offices, and workplaces that go through a lot of water',
    image: '/bottles/vaari-20l.webp',
    heightPct: 94,
    background: '#0a3350',
    foreground: '#ffffff',
    theme: 'deep',
    priceNote: 'Pricing coming soon',
  },
];

export const STATS = [
  { value: 1000, suffix: '+', label: 'Happy Customers' },
  { value: 50, suffix: '+', label: 'Business Partners' },
  { value: 100, suffix: '%', label: 'Quality Assured' },
  { text: '24/7', label: 'Order Support' },
];
