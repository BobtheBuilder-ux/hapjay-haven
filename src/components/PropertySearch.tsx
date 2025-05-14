
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Property } from "@/types/property";

interface PropertySearchProps {
  onFilter: (filteredProperties: Property[]) => void;
  allProperties: Property[];
}

const PropertySearch = ({ onFilter, allProperties }: PropertySearchProps) => {
  const { toast } = useToast();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("any");
  const [status, setStatus] = useState("any");
  const [beds, setBeds] = useState("any");
  const [baths, setBaths] = useState("any");
  const [sqft, setSqft] = useState("any");
  const [priceRange, setPriceRange] = useState([0, 2000000]);
  const [formattedPriceRange, setFormattedPriceRange] = useState(["₦0", "₦2,000,000"]);

  const handlePriceChange = (values: number[]) => {
    setPriceRange(values);
    setFormattedPriceRange([
      `₦${values[0].toLocaleString()}`,
      `₦${values[1].toLocaleString()}`
    ]);
  };

  const handleSearch = () => {
    const filtered = allProperties.filter(property => {
      // Filter by location (case insensitive)
      if (location && 
          !property.location.toLowerCase().includes(location.toLowerCase()) && 
          !property.address?.toLowerCase().includes(location.toLowerCase())) {
        return false;
      }

      // Filter by property type
      if (propertyType !== "any" && property.type !== propertyType) {
        return false;
      }

      // Filter by status
      if (status !== "any" && property.status !== status) {
        return false;
      }

      // Filter by beds
      if (beds !== "any") {
        const minBeds = parseInt(beds);
        if (property.beds < minBeds) return false;
      }

      // Filter by baths
      if (baths !== "any") {
        const minBaths = parseInt(baths);
        if (property.baths < minBaths) return false;
      }

      // Filter by sqft
      if (sqft !== "any") {
        const minSqft = parseInt(sqft);
        if (property.sqft < minSqft) return false;
      }

      // Filter by price range
      const propertyPrice = parseFloat(property.price.replace(/[^0-9.-]+/g, ""));
      if (propertyPrice < priceRange[0] || propertyPrice > priceRange[1]) {
        return false;
      }

      return true;
    });

    // Apply the filter
    onFilter(filtered);
    
    if (filtered.length === 0) {
      toast({
        title: "No properties found",
        description: "Try adjusting your search criteria",
      });
    } else {
      toast({
        title: "Search results",
        description: `Found ${filtered.length} properties`,
      });
    }
  };

  // Set max price range based on the most expensive property
  useEffect(() => {
    if (allProperties.length > 0) {
      const prices = allProperties.map(p => 
        parseFloat(p.price.replace(/[^0-9.-]+/g, ""))
      );
      const maxPrice = Math.max(...prices);
      setPriceRange([0, maxPrice]);
      setFormattedPriceRange([`₦0`, `₦${maxPrice.toLocaleString()}`]);
    }
  }, [allProperties]);

  const handleReset = () => {
    setLocation("");
    setPropertyType("any");
    setStatus("any");
    setBeds("any");
    setBaths("any");
    setSqft("any");
    
    // Reset price range to max from all properties
    if (allProperties.length > 0) {
      const prices = allProperties.map(p => 
        parseFloat(p.price.replace(/[^0-9.-]+/g, ""))
      );
      const maxPrice = Math.max(...prices);
      setPriceRange([0, maxPrice]);
      setFormattedPriceRange([`₦0`, `₦${maxPrice.toLocaleString()}`]);
    } else {
      setPriceRange([0, 2000000]);
      setFormattedPriceRange(["₦0", "₦2,000,000"]);
    }
    
    // Reset to show all properties
    onFilter(allProperties);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Find Your Perfect Property</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <Input 
            placeholder="City, neighborhood, or address" 
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
            <Select value={propertyType} onValueChange={setPropertyType}>
              <SelectTrigger>
                <SelectValue placeholder="Select type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="House">House</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="Condo">Condo</SelectItem>
                <SelectItem value="Townhouse">Townhouse</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="For Sale">For Sale</SelectItem>
                <SelectItem value="For Rent">For Rent</SelectItem>
                <SelectItem value="New Construction">New Construction</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Beds</label>
            <Select value={beds} onValueChange={setBeds}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
                <SelectItem value="5">5+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Baths</label>
            <Select value={baths} onValueChange={setBaths}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Square Feet</label>
            <Select value={sqft} onValueChange={setSqft}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="1000">1,000+</SelectItem>
                <SelectItem value="1500">1,500+</SelectItem>
                <SelectItem value="2000">2,000+</SelectItem>
                <SelectItem value="2500">2,500+</SelectItem>
                <SelectItem value="3000">3,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-sm font-medium text-gray-700">Price Range</label>
            <span className="text-sm text-gray-500">
              {formattedPriceRange[0]} - {formattedPriceRange[1]}
            </span>
          </div>
          <Slider
            value={priceRange}
            max={priceRange[1] > 0 ? priceRange[1] : 5000000}
            step={50000}
            onValueChange={handlePriceChange}
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            className="flex-1 bg-realestate-navy hover:bg-realestate-navy/90"
            onClick={handleSearch}
          >
            Search Properties
          </Button>
          <Button 
            variant="outline" 
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertySearch;
