
// API endpoints and fetching functions
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.example.com';

export interface Property {
  id: number;
  title: string;
  description: string;
  price: string;
  images: string[];
  location: string;
  address: string;
  beds: number;
  baths: number;
  sqft: number;
  lotSize: string;
  yearBuilt: number;
  type: string;
  status: string;
  features: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
}

// Get all properties
export const fetchProperties = async (): Promise<Property[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties`);
    if (!response.ok) {
      throw new Error('Failed to fetch properties');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching properties:', error);
    return [];
  }
};

// Get a single property by ID
export const fetchPropertyById = async (id: number): Promise<Property | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch property with ID ${id}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching property ${id}:`, error);
    return null;
  }
};

// Create a new property
export const createProperty = async (propertyData: Omit<Property, 'id'>): Promise<Property | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to create property');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error creating property:', error);
    return null;
  }
};

// Update an existing property
export const updateProperty = async (id: number, propertyData: Partial<Property>): Promise<Property | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propertyData),
    });
    
    if (!response.ok) {
      throw new Error(`Failed to update property with ID ${id}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`Error updating property ${id}:`, error);
    return null;
  }
};

// Delete a property
export const deleteProperty = async (id: number): Promise<boolean> => {
  try {
    const response = await fetch(`${API_BASE_URL}/properties/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Failed to delete property with ID ${id}`);
    }
    
    return true;
  } catch (error) {
    console.error(`Error deleting property ${id}:`, error);
    return false;
  }
};

// Upload an image and get back the URL
export const uploadImage = async (file: File): Promise<string | null> => {
  try {
    const formData = new FormData();
    formData.append('image', file);
    
    const response = await fetch(`${API_BASE_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    
    if (!response.ok) {
      throw new Error('Failed to upload image');
    }
    
    const data = await response.json();
    return data.imageUrl;
  } catch (error) {
    console.error('Error uploading image:', error);
    return null;
  }
};
