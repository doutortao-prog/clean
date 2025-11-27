export interface User {
  name: string;
  phone: string;
  email: string;
  company: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export enum Brand {
  UNGER = 'UNGER',
  EL_CASTOR = 'EL_CASTOR',
  NONE = 'NONE'
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
  brand: Brand;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}