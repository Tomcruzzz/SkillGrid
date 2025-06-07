import { User, Service, Product, Vehicle, Category } from '../types';

// Mock Users
export const users: User[] = [
  {
    id: '1',
    name: 'Alex Morgan',
    email: 'alex@example.com',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Professional web developer with 5+ years of experience',
    location: 'San Francisco, CA',
    skills: ['React', 'Node.js', 'TypeScript'],
    isVerified: true,
    joinedDate: new Date('2023-01-15')
  },
  {
    id: '2',
    name: 'Jessica Chen',
    email: 'jessica@example.com',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Freelance graphic designer specializing in branding',
    location: 'New York, NY',
    skills: ['Photoshop', 'Illustrator', 'Branding'],
    isVerified: true,
    joinedDate: new Date('2023-02-20')
  },
  {
    id: '3',
    name: 'Marcus Johnson',
    email: 'marcus@example.com',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Experienced video editor and filmmaker',
    location: 'Los Angeles, CA',
    skills: ['Premiere Pro', 'After Effects', 'Storytelling'],
    isVerified: true,
    joinedDate: new Date('2023-03-10')
  },
  {
    id: '4',
    name: 'Sophia Williams',
    email: 'sophia@example.com',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Professional chef with focus on international cuisine',
    location: 'Chicago, IL',
    skills: ['Culinary Arts', 'Menu Planning', 'Catering'],
    isVerified: true,
    joinedDate: new Date('2023-02-05')
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david@example.com',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=600',
    bio: 'Marketing specialist with experience in digital campaigns',
    location: 'Seattle, WA',
    skills: ['SEO', 'Content Marketing', 'Social Media'],
    isVerified: false,
    joinedDate: new Date('2023-04-15')
  }
];

// Mock Services
export const services: Service[] = [
  {
    id: '1',
    title: 'Professional Web Development',
    description: 'Custom web applications built with React and Node.js. Specializing in responsive, performant applications with modern UX.',
    category: 'programming',
    price: 75,
    priceType: 'hourly',
    location: 'San Francisco, CA',
    images: ['https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600'],
    providerId: '1',
    rating: 4.8,
    reviewCount: 24,
    createdAt: new Date('2023-05-10')
  },
  {
    id: '2',
    title: 'Brand Identity Design',
    description: 'Complete branding packages including logo design, color palette, typography, and brand guidelines.',
    category: 'design',
    price: 1200,
    priceType: 'fixed',
    location: 'New York, NY',
    images: ['https://images.pexels.com/photos/6224/hands-people-woman-working.jpg?auto=compress&cs=tinysrgb&w=600'],
    providerId: '2',
    rating: 4.9,
    reviewCount: 18,
    createdAt: new Date('2023-04-22')
  },
  {
    id: '3',
    title: 'Video Editing & Production',
    description: 'Professional video editing for social media, YouTube, and promotional content. Quick turnaround times.',
    category: 'video',
    price: 60,
    priceType: 'hourly',
    location: 'Los Angeles, CA',
    images: ['https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg?auto=compress&cs=tinysrgb&w=600'],
    providerId: '3',
    rating: 4.7,
    reviewCount: 31,
    createdAt: new Date('2023-05-05')
  },
  {
    id: '4',
    title: 'Private Cooking Lessons',
    description: 'Learn to cook international cuisine from a professional chef. Individual or group sessions available.',
    category: 'cooking',
    price: 90,
    priceType: 'hourly',
    location: 'Chicago, IL',
    images: ['https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=600'],
    providerId: '4',
    rating: 4.9,
    reviewCount: 15,
    createdAt: new Date('2023-04-15')
  },
  {
    id: '5',
    title: 'SEO & Content Marketing',
    description: 'Boost your online presence with targeted SEO and content strategies. Includes keyword research and content planning.',
    category: 'marketing',
    price: 850,
    priceType: 'fixed',
    location: 'Seattle, WA',
    images: ['https://images.pexels.com/photos/905163/pexels-photo-905163.jpeg?auto=compress&cs=tinysrgb&w=600'],
    providerId: '5',
    rating: 4.6,
    reviewCount: 9,
    createdAt: new Date('2023-05-18')
  },
  {
    id: '6',
    title: 'Mobile App Development',
    description: 'Native iOS and Android app development. From concept to launch with ongoing support.',
    category: 'programming',
    price: 85,
    priceType: 'hourly',
    location: 'San Francisco, CA',
    images: ['https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600'],
    providerId: '1',
    rating: 4.9,
    reviewCount: 16,
    createdAt: new Date('2023-04-28')
  }
];

// Mock Products
export const products: Product[] = [
  {
    id: '1',
    title: 'Professional DSLR Camera',
    description: 'Canon EOS 5D Mark IV in excellent condition. Includes 2 lenses, carrying case, and extra battery.',
    category: 'other',
    price: 1800,
    condition: 'good',
    location: 'Los Angeles, CA',
    images: ['https://images.pexels.com/photos/51383/photo-camera-subject-photographer-51383.jpeg?auto=compress&cs=tinysrgb&w=600'],
    sellerId: '3',
    createdAt: new Date('2023-05-12')
  },
  {
    id: '2',
    title: 'Professional Cookware Set',
    description: 'Complete set of premium stainless steel cookware. Barely used, in perfect condition.',
    category: 'cooking',
    price: 450,
    condition: 'like-new',
    location: 'Chicago, IL',
    images: ['https://images.pexels.com/photos/1359293/pexels-photo-1359293.jpeg?auto=compress&cs=tinysrgb&w=600'],
    sellerId: '4',
    createdAt: new Date('2023-05-08')
  }
];

// Mock Vehicles
export const vehicles: Vehicle[] = [
  {
    id: '1',
    type: 'car',
    make: 'Tesla',
    model: 'Model 3',
    year: 2022,
    price: 75,
    priceType: 'daily',
    location: 'San Francisco, CA',
    images: ['https://images.pexels.com/photos/12272200/pexels-photo-12272200.jpeg?auto=compress&cs=tinysrgb&w=600'],
    ownerId: '1',
    createdAt: new Date('2023-04-20')
  },
  {
    id: '2',
    type: 'bike',
    make: 'Trek',
    model: 'FX 3',
    year: 2023,
    price: 25,
    priceType: 'daily',
    location: 'New York, NY',
    images: ['https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=600'],
    ownerId: '2',
    createdAt: new Date('2023-05-14')
  }
];

// Helper function to get user by ID
export const getUserById = (id: string): User | undefined => {
  return users.find(user => user.id === id);
};

// Helper to get services with provider details
export const getServicesWithProviders = (): Service[] => {
  return services.map(service => ({
    ...service,
    provider: getUserById(service.providerId)
  }));
};

// Helper to get products with seller details
export const getProductsWithSellers = (): Product[] => {
  return products.map(product => ({
    ...product,
    seller: getUserById(product.sellerId)
  }));
};

// Helper to get vehicles with owner details
export const getVehiclesWithOwners = (): Vehicle[] => {
  return vehicles.map(vehicle => ({
    ...vehicle,
    owner: getUserById(vehicle.ownerId)
  }));
};

// Helper to get all categories
export const getCategories = (): { id: Category; label: string }[] => {
  return [
    { id: 'programming', label: 'Programming & Development' },
    { id: 'design', label: 'Design & Creative' },
    { id: 'writing', label: 'Writing & Translation' },
    { id: 'marketing', label: 'Marketing & Sales' },
    { id: 'video', label: 'Video & Animation' },
    { id: 'audio', label: 'Audio & Music' },
    { id: 'cooking', label: 'Cooking & Culinary' },
    { id: 'teaching', label: 'Teaching & Tutoring' },
    { id: 'salon', label: 'Salon & Beauty Services' },
    { id: 'cleaning', label: 'Cleaning & Pest Control' },
    { id: 'appliance', label: 'Appliance Repair & Services' },
    { id: 'classes', label: 'Online & Offline Classes' },
    { id: 'music', label: 'Music Services' },
    { id: 'photography', label: 'Photography' },
    { id: 'painting', label: 'Painting & Art' },
    { id: 'plumbing', label: 'Plumbing Services' },
    { id: 'electrician', label: 'Electrician Services' },
    { id: 'auto', label: 'Auto Services' },
    { id: 'hotels', label: 'Hotels & Accommodation' },
    { id: 'comedy', label: 'Comedy Shows' },
    { id: 'entertainment', label: 'Entertainment Services' },
    { id: 'vehicle', label: 'Vehicle Rental' },
    { id: 'property', label: 'Property Rental' },
    { id: 'other', label: 'Other Services' }
  ];
};