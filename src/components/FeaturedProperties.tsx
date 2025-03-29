
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Square } from "lucide-react";

// Sample data
const properties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    description: "Stunning modern villa with panoramic views and premium finishes",
    price: "$1,250,000",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    location: "Beverly Hills, CA",
    beds: 5,
    baths: 4,
    sqft: 4200,
    type: "Luxury",
    featured: true
  },
  {
    id: 2,
    title: "Downtown Penthouse",
    description: "Elegant penthouse apartment with city skyline views",
    price: "$850,000",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    location: "Los Angeles, CA",
    beds: 3,
    baths: 2,
    sqft: 1800,
    type: "Residential",
    featured: true
  },
  {
    id: 3,
    title: "Waterfront Estate",
    description: "Breathtaking waterfront property with private dock",
    price: "$2,350,000",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
    location: "Malibu, CA",
    beds: 6,
    baths: 5,
    sqft: 5500,
    type: "Luxury",
    featured: true
  }
];

const PropertyCard = ({ property }: { property: typeof properties[0] }) => {
  return (
    <Card className="property-card group">
      <div className="property-card-image">
        <img
          src={property.image}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <Badge className="property-badge bg-realestate-gold text-realestate-navy">
          {property.type}
        </Badge>
      </div>
      <CardContent className="p-4">
        <div className="mb-2 flex items-center text-sm text-gray-500">
          <MapPin className="mr-1 h-4 w-4 text-realestate-navy" />
          {property.location}
        </div>
        <h3 className="mb-1 text-xl font-semibold">{property.title}</h3>
        <p className="mb-3 text-sm text-gray-600 line-clamp-2">
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

const FeaturedProperties = () => {
  return (
    <section className="py-16 bg-realestate-silver">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties, each offering unique features and exceptional value.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <Link key={property.id} to={`/properties/${property.id}`}>
              <PropertyCard property={property} />
            </Link>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Link
            to="/properties"
            className="inline-flex items-center px-6 py-3 border border-realestate-navy rounded-md text-realestate-navy font-medium hover:bg-realestate-navy hover:text-white transition-colors"
          >
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
