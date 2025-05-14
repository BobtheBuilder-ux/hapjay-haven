
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
import { getProperties } from "@/services/propertyService";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "./ui/aspect-ratio";

const PropertyCard = ({ property }: { property: Property }) => {
  return (
    <Card className="property-card group h-full">
      <div className="property-card-image">
        <AspectRatio ratio={4/3}>
          <img
            src={property.image || (property.images && property.images[0])}
            alt={property.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        </AspectRatio>
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
  const [allProperties, setAllProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const fetchedProperties = await getProperties();
        setAllProperties(fetchedProperties);
        setFilteredProperties(fetchedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, []);
  
  // Sort properties based on selected option
  const sortedProperties = [...filteredProperties].sort((a, b) => {
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

  const handleFilter = (filtered: Property[]) => {
    setFilteredProperties(filtered);
  };

  return (
    <div className="py-12 bg-realestate-silver">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with search filters */}
          <div className="lg:col-span-1">
            <PropertySearch 
              onFilter={handleFilter}
              allProperties={allProperties} 
            />
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
            <p className="mb-6 text-gray-600">Showing {filteredProperties.length} properties</p>
            
            {/* Loading state */}
            {loading ? (
              <div className={`grid gap-6 ${
                viewType === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {[1, 2, 3, 4, 5, 6].map((i) => (
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
              <div className={`grid gap-6 ${
                viewType === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                  : "grid-cols-1"
              }`}>
                {sortedProperties.length > 0 ? (
                  sortedProperties.map((property) => (
                    <Link key={property.id} to={`/properties/${property.id}`}>
                      <PropertyCard property={property} />
                    </Link>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12">
                    <p className="text-lg text-gray-500">No properties found. Please try a different search.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyListing;
