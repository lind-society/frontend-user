import { FaUmbrellaBeach } from 'react-icons/fa';
import { LuCoffee, LuSunrise, LuWaves } from 'react-icons/lu';
import { MdSpa } from 'react-icons/md';
import { RiRouteFill } from 'react-icons/ri';
import { TbBeach, TbMountain } from 'react-icons/tb';

// Categories for filtering
export const activityCategories = [
  {
    id: 'wellness',
    name: 'Wellness',
    icon: <MdSpa size={22} />,
  },
  {
    id: 'adventure',
    name: 'Adventure',
    icon: <TbMountain size={22} />,
  },
  {
    id: 'cultural',
    name: 'Cultural',
    icon: <RiRouteFill size={22} />,
  },
  {
    id: 'beach',
    name: 'Beach',
    icon: <FaUmbrellaBeach size={22} />,
  },
  {
    id: 'diving',
    name: 'Diving',
    icon: <TbBeach size={22} />,
  },
  {
    id: 'sunset',
    name: 'Sunset',
    icon: <LuSunrise size={22} />,
  },
  {
    id: 'surfing',
    name: 'Surfing',
    icon: <LuWaves size={22} />,
  },
  {
    id: 'culinary',
    name: 'Culinary',
    icon: <LuCoffee size={22} />,
  },
];

// Sample locations
export const activityLocations = [
  'Bali',
  'Lombok',
  'Ubud',
  'Canggu',
  'Seminyak',
  'Nusa Penida',
  'Gili Islands',
  'Kuta',
];

// Activity data
export interface TouristActivity {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  currency: string;
  priceUnit: string;
  rating: number;
  reviews: number;
  category: string;
  tags: string[];
  images: string[];
  duration: string;
  groupSize: string;
  popularity: number; // 1-100 for popularity sorting
  featured: boolean;
}

// Sample tourism activities
export const touristActivities: TouristActivity[] = [
  {
    id: 'wellness-spa-1',
    name: 'Jungle Detox & Wellness Spa',
    location: 'Ubud, Bali - Indonesia',
    description:
      'Immerse yourself in a peaceful sanctuary surrounded by lush jungle. Our signature detox program includes massage, body scrub, aromatherapy and a relaxing flower bath ritual.',
    price: 1500000,
    currency: 'IDR',
    priceUnit: 'session',
    rating: 4.8,
    reviews: 126,
    category: 'wellness',
    tags: ['spa', 'massage', 'detox', 'traditional'],
    images: ['/images/activity-1.jpeg'],
    duration: '3 hours',
    groupSize: 'Individual',
    popularity: 92,
    featured: true,
  },
  {
    id: 'wellness-yoga-1',
    name: 'Sunrise Yoga & Meditation Retreat',
    location: 'Ubud, Bali - Indonesia',
    description:
      'Start your day with energizing yoga overlooking the rice terraces at sunrise, followed by guided meditation and a nutritious organic breakfast.',
    price: 850000,
    currency: 'IDR',
    priceUnit: 'session',
    rating: 4.9,
    reviews: 84,
    category: 'wellness',
    tags: ['yoga', 'meditation', 'breakfast', 'morning'],
    images: ['/images/activity-2.jpeg'],
    duration: '2.5 hours',
    groupSize: 'Max 8 people',
    popularity: 88,
    featured: true,
  },
  {
    id: 'adventure-trek-1',
    name: 'Mount Batur Sunrise Trek',
    location: 'Kintamani, Bali - Indonesia',
    description:
      'Embark on an early morning trek to the summit of Mount Batur to witness a breathtaking sunrise over the volcanic landscape and Lake Batur below.',
    price: 950000,
    currency: 'IDR',
    priceUnit: 'person',
    rating: 4.7,
    reviews: 213,
    category: 'adventure',
    tags: ['hiking', 'volcano', 'sunrise', 'guided'],
    images: ['/images/activity-3.jpeg'],
    duration: '7 hours',
    groupSize: 'Small group',
    popularity: 95,
    featured: false,
  },
  {
    id: 'diving-nusa-1',
    name: 'Nusa Penida Snorkeling Adventure',
    location: 'Nusa Penida, Bali - Indonesia',
    description:
      'Discover the underwater paradise of Nusa Penida with this full-day snorkeling trip to Crystal Bay, Manta Point, and Gamat Bay.',
    price: 1250000,
    currency: 'IDR',
    priceUnit: 'person',
    rating: 4.6,
    reviews: 158,
    category: 'diving',
    tags: ['snorkeling', 'boat', 'marine-life', 'island'],
    images: ['/images/activity-4.jpeg'],
    duration: 'Full day',
    groupSize: '6-12 people',
    popularity: 91,
    featured: true,
  },
  {
    id: 'cultural-temple-1',
    name: 'Bali Temple & Cultural Tour',
    location: 'Various Locations, Bali - Indonesia',
    description:
      "Visit Bali's most sacred temples and learn about local traditions with a knowledgeable guide. Includes visits to Besakih, Uluwatu, and a traditional Kecak dance performance.",
    price: 1100000,
    currency: 'IDR',
    priceUnit: 'person',
    rating: 4.5,
    reviews: 97,
    category: 'cultural',
    tags: ['temple', 'history', 'guided', 'traditional-dance'],
    images: ['/images/activity-5.jpeg'],
    duration: '8 hours',
    groupSize: 'Max 10 people',
    popularity: 85,
    featured: false,
  },
  {
    id: 'wellness-massage-1',
    name: 'Traditional Balinese Massage',
    location: 'Seminyak, Bali - Indonesia',
    description:
      'Experience authentic Balinese healing through a full-body massage using traditional techniques passed down through generations, with natural aromatic oils.',
    price: 650000,
    currency: 'IDR',
    priceUnit: 'person',
    rating: 4.9,
    reviews: 246,
    category: 'wellness',
    tags: ['massage', 'relaxation', 'balinese', 'traditional'],
    images: ['/images/activity-6.jpeg'],
    duration: '90 minutes',
    groupSize: 'Individual',
    popularity: 94,
    featured: true,
  },
];
