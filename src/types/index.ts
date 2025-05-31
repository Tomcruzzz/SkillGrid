// Type definitions for the application

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  location?: string;
  skills?: string[];
  isVerified: boolean;
  joinedDate: Date;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  priceType: 'hourly' | 'fixed' | 'daily';
  location?: string;
  images: string[];
  providerId: string;
  provider?: User;
  rating?: number;
  reviewCount?: number;
  createdAt: Date;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  category: Category;
  price: number;
  condition?: 'new' | 'like-new' | 'good' | 'fair' | 'poor';
  location?: string;
  images: string[];
  sellerId: string;
  seller?: User;
  createdAt: Date;
}

export interface Vehicle {
  id: string;
  type: 'car' | 'bike' | 'scooter' | 'taxi';
  make: string;
  model: string;
  year: number;
  price: number;
  priceType: 'hourly' | 'daily';
  location: string;
  images: string[];
  ownerId: string;
  owner?: User;
  availableFrom?: Date;
  availableTo?: Date;
  createdAt: Date;
}

export interface Review {
  id: string;
  rating: number;
  comment: string;
  authorId: string;
  author?: User;
  serviceId?: string;
  productId?: string;
  vehicleId?: string;
  createdAt: Date;
}

export interface Message {
  id: string;
  content: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
  read: boolean;
}

export interface Booking {
  id: string;
  serviceId?: string;
  vehicleId?: string;
  userId: string;
  providerId: string;
  startDate: Date;
  endDate?: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  totalPrice: number;
  createdAt: Date;
}

export type Category =
  | 'programming'
  | 'design'
  | 'writing'
  | 'marketing'
  | 'video'
  | 'audio'
  | 'cooking'
  | 'teaching'
  | 'vehicle'
  | 'property'
  | 'other';