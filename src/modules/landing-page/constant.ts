import { BlogPost } from '@/components/ui/card/blog';

// Sample data for villas
export interface Villa {
  id: number;
  name: string;
  location: string;
  price: string;
  description: string;
  bedrooms: number;
  bathrooms: number;
  maxGuests: number;
  rating: number;
  images: string[];
  isFavorite: boolean;
}

export const villas: Villa[] = [
  {
    id: 1,
    name: 'Grasshopper Villa',
    location: 'Jimbaran, Bali',
    price: 'IDR 4,750,000',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    bedrooms: 8,
    bathrooms: 4,
    maxGuests: 8,
    rating: 4.5,
    images: [
      '/images/explore-1.png',
      '/images/explore-2.png',
      '/images/explore-2.png',
    ],
    isFavorite: false,
  },
  {
    id: 2,
    name: 'Sunset Beach Villa',
    location: 'Kuta, Bali',
    price: 'IDR 5,250,000',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    bedrooms: 6,
    bathrooms: 3,
    maxGuests: 6,
    rating: 4.7,
    images: [
      '/images/explore-2.png',
      '/images/explore-1.png',
      '/images/explore-3.png',
    ],
    isFavorite: true,
  },
  {
    id: 3,
    name: 'Ubud Retreat',
    location: 'Ubud, Bali',
    price: 'IDR 3,950,000',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
    bedrooms: 4,
    bathrooms: 2,
    maxGuests: 4,
    rating: 4.3,
    images: [
      '/images/explore-3.png',
      '/images/explore-2.png',
      '/images/explore-1.png',
    ],
    isFavorite: false,
  },
];

export interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
}
// Sample data
export const destinations: Destination[] = [
  {
    id: 1,
    name: 'Pantai Kuta',
    location: 'Bali, Indonesia',
    image: '/images/iconic-1.png',
  },
  {
    id: 2,
    name: 'Mount Bromo',
    location: 'East Java, Indonesia',
    image: '/images/iconic-2.png',
  },
  {
    id: 3,
    name: 'Borobudur Temple',
    location: 'Yogyakarta, Indonesia',
    image: '/images/iconic-3.png',
  },
  {
    id: 4,
    name: 'Komodo Island',
    location: 'East Nusa Tenggara, Indonesia',
    image: '/images/iconic-1.png',
  },
  {
    id: 5,
    name: 'Raja Ampat',
    location: 'Papua, Indonesia',
    image: '/images/iconic-2.png',
  },
];

// Sample blog posts data
export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: '5 Tips for a Successful Property Investment',
    date: 'January 20, 2025',
    excerpt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: '/images/blog-1.png',
    slug: 'successful-property-investment',
  },
  {
    id: 2,
    title: 'The Ultimate Guide to Bali Villas',
    date: 'January 15, 2025',
    excerpt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: '/images/blog-2.jpeg',
    slug: 'bali-villas-guide',
  },
  {
    id: 3,
    title: 'How to Choose the Perfect Vacation Rental',
    date: 'January 10, 2025',
    excerpt:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    image: '/images/blog-3.jpeg',
    slug: 'perfect-vacation-rental',
  },
];
