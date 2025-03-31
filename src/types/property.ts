
export interface Property {
  id: number;
  title: string;
  description: string;
  price: string;
  images: string[];
  image?: string; // For backward compatibility
  location: string;
  address?: string;
  beds: number;
  baths: number;
  sqft: number;
  lotSize?: string;
  yearBuilt?: number;
  type: string;
  status: string;
  features?: string[];
  agent?: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
  featured: boolean;
}
