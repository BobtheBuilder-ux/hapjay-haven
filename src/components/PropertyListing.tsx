
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import PropertySearch from "./PropertySearch";
import { Property } from "@/types/property";

// Sample property data for initial load
const initialProperties: Property[] = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    description: "Stunning modern villa with panoramic views and premium finishes",
    price: "$1,250,000",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    images: ["https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"],
    location: "Beverly Hills, CA",
    beds: 5,
    baths: 4,
    sqft: 4200,
    lotSize: "0.5 acres",
    yearBuilt: 2020,
    type: "Luxury",
    status: "For Sale",
    featured: true
  },
  {
    id: 2,
    title: "Downtown Penthouse",
    description: "Elegant penthouse apartment with city skyline views",
    price: "$850,000",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    images: ["https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"],
    location: "Los Angeles, CA",
    beds: 3,
    baths: 2,
    sqft: 1800,
    lotSize: "N/A",
    yearBuilt: 2018,
    type: "Residential",
    status: "For Sale",
    featured: true
  },
  {
    id: 3,
    title: "Waterfront Estate",
    description: "Breathtaking waterfront property with private dock",
    price: "$2,350,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    images: ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"],
    location: "Malibu, CA",
    beds: 6,
    baths: 5,
    sqft: 5500,
    lotSize: "1.2 acres",
    yearBuilt: 2015,
    type: "Luxury",
    status: "For Sale",
    featured: true
  },
  {
    id: 4,
    title: "Contemporary Townhouse",
    description: "Modern townhouse with rooftop terrace in prime location",
    price: "$720,000",
    image: "https://images.unsplash.com/photo-1600566753051-f0b4f1d62bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    images: ["https://images.unsplash.com/photo-1600566753051-f0b4f1d62bd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"],
    location: "Venice, CA",
    beds: 3,
    baths: 2.5,
    sqft: 1950,
    lotSize: "0.1 acres",
    yearBuilt: 2019,
    type: "Residential",
    status: "For Sale",
    featured: false
  },
  {
    id: 5,
    title: "Urban Loft Apartment",
    description: "Industrial-style loft with high ceilings and exposed brick",
    price: "$3,500/mo",
    image: "https://images.unsplash.com/photo-1559599189-fe84dea4eb79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    images: ["https://images.unsplash.com/photo-1559599189-fe84dea4eb79?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"],
    location: "Downtown LA, CA",
    beds: 2,
    baths: 2,
    sqft: 1200,
    lotSize: "N/A",
    yearBuilt: 2017,
    type: "Rental",
    status: "For Rent",
    featured: false
  },
  {
    id: 6,
    title: "Mountain Retreat",
    description: "Secluded cabin with stunning mountain views and modern amenities",
    price: "$950,000",
    image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    images: ["https://images.unsplash.com/photo-1542718610-a1d656d1884c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"],
    location: "Big Bear, CA",
    beds: 4,
    baths: 3,
    sqft: 2800,
    lotSize: "0.8 acres",
    yearBuilt: 2016,
    type: "Residential",
    status: "For Sale",
    featured: false
  }
];

const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <Card className="property-card group h-full">
      <div className="property-card-image">
        <img
          src={property.image || (property.images && property.images[0])}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="property-badge bg-realestate-gold text-realestate-navy">
          {property.type}
        </Badge>
      </div>
      <CardContent className="p-4 flex flex-col h-[calc(100%-9rem)]">
        <div className="mb-2 flex items-center text-sm text-gray-500">
          <MapPin className="mr-1 h-4 w-4 text-realestate-navy" />
          {property.location}
        </div>
        <h3 className="mb-1 text-xl font-semibold">{property.title}</h3>
        <p className="mb-3 text-sm text-gray-600 line-clamp-2 flex-grow">
          {property.description}
        </p>
        <div className="mb-4 text-xl font-bold text-realestate-navy">
          {property.price}
        </div>
        <div className="flex justify-between border-t pt-3">
          <div className="flex items-center text-sm text-gray-600">
            <Bed className="mr-1 h-4 w-4" />
            {property.beds} Beds
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Bath className="mr-1 h-4 w-4" />
            {property.baths} Baths
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Square className="mr-1 h-4 w-4" />
            {property.sqft} sqft
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

const PropertyListing = () => {
  const [sortBy, setSortBy] = useState("featured");
  const [viewType, setViewType] = useState("grid");
  const [properties, setProperties] = useState<Property[]>(initialProperties);
  
  useEffect(() => {
    // Load properties from localStorage if available
    const storedProperties = localStorage.getItem('properties');
    if (storedProperties) {
      try {
        const parsedProperties = JSON.parse(storedProperties);
        if (parsedProperties.length > 0) {
          setProperties(parsedProperties);
        }
      } catch (error) {
        console.error('Error parsing properties:', error);
      }
    }
  }, []);
  
  // Sort properties based on selected option
  const sortedProperties = [...properties].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      case "price-high":
        return parseFloat(b.price.replace(/[^0-9.-]+/g, "")) - parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
      case "price-low":
        return parseFloat(a.price.replace(/[^0-9.-]+/g, "")) - parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return (
    <div className="py-12 bg-realestate-silver">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with search filters */}
          <div className="lg:col-span-1">
            <PropertySearch />
          </div>
          
          {/* Property listing */}
          <div className="lg:col-span-3">
            <div className="bg-white p-4 rounded-lg shadow-md mb-6 flex flex-col md:flex-row justify-between items-center">
              <h2 className="text-2xl font-bold mb-4 md:mb-0">Properties</h2>
              
              <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <label className="text-sm whitespace-nowrap">Sort by:</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-full md:w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="featured">Featured</SelectItem>
                      <SelectItem value="price-high">Price (High-Low)</SelectItem>
                      <SelectItem value="price-low">Price (Low-High)</SelectItem>
                      <SelectItem value="newest">Newest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center space-x-2 w-full md:w-auto">
                  <label className="text-sm whitespace-nowrap">View:</label>
                  <Select value={viewType} onValueChange={setViewType}>
                    <SelectTrigger className="w-full md:w-[120px]">
                      <SelectValue placeholder="View" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grid">Grid</SelectItem>
                      <SelectItem value="list">List</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            
            {/* Results count */}
            <p className="mb-6 text-gray-600">Showing {properties.length} properties</p>
            
            {/* Property grid */}
            <div className={`grid gap-6 ${
              viewType === "grid" 
                ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {sortedProperties.map((property) => (
                <Link key={property.id} to={`/properties/${property.id}`}>
                  <PropertyCard property={property} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;
