
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Bed, Bath, Square } from "lucide-react";
import { Property } from "@/types/property";
import { useState, useEffect } from "react";
import { getFeaturedProperties } from "@/services/propertyService";
import { Skeleton } from "@/components/ui/skeleton";

const PropertyCard = ({
  property
}: {
  property: Property;
}) => {
  return (
    <Card className="property-card group">
      <div className="property-card-image">
        <img 
          src={property.image || (property.images && property.images[0])} 
          alt={property.title} 
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" 
        />
        <Badge className="property-badge bg-realestate-gold text-realestate-navy bg-white">
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
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProperties = async () => {
      setLoading(true);
      try {
        const featuredProperties = await getFeaturedProperties();
        setProperties(featuredProperties);
      } catch (error) {
        console.error('Error fetching featured properties:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchFeaturedProperties();
  }, []);

  return (
    <section className="py-16 bg-realestate-silver">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Properties</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties, each offering unique features and exceptional value.
          </p>
        </div>
        
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="h-[400px]">
                <div className="h-[230px]">
                  <Skeleton className="h-full w-full" />
                </div>
                <CardContent className="p-4">
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-3/4 mb-4" />
                  <Skeleton className="h-4 w-1/2 mb-6" />
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                    <Skeleton className="h-4 w-1/4" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.length > 0 ? (
              properties.map(property => (
                <Link key={property.id} to={`/properties/${property.id}`}>
                  <PropertyCard property={property} />
                </Link>
              ))
            ) : (
              <div className="col-span-3 text-center py-8">
                <p className="text-lg text-gray-500">No featured properties found.</p>
              </div>
            )}
          </div>
        )}
        
        <div className="text-center mt-12">
          <Link to="/properties" className="inline-flex items-center px-6 py-3 border border-realestate-navy rounded-md text-realestate-navy font-medium hover:bg-realestate-navy hover:text-white transition-colors">
            View All Properties
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;
