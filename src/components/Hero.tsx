
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Hero = () => {
  const { toast } = useToast();
  const [location, setLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!location) {
      toast({
        title: "Please enter a location",
        description: "Location is required to search for properties",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Search Initiated",
      description: `Searching for ${propertyType || "all properties"} in ${location}`,
    });
    
    // In a real application, you would redirect to search results page with query params
    // For this demo, we'll redirect to the properties page
    window.location.href = `/properties?location=${encodeURIComponent(location)}${propertyType ? `&type=${encodeURIComponent(propertyType)}` : ''}`;
  };

  return (
    <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')",
          filter: "brightness(0.8)"
        }}
      />
      
      {/* Overlay - Updated with Hapjay colors */}
      <div className="absolute inset-0 bg-gradient-to-r from-realestate-navy/90 to-realestate-blue/60" />
      
      {/* Content */}
      <div className="container-custom relative z-10 flex h-full flex-col items-start justify-center">
        <div className="max-w-2xl animate-fade-in">
          <div className="mb-6">
            <img 
              src="/lovable-uploads/5ef637cc-6eee-4bc5-937b-4a0087f633db.png" 
              alt="Hapjay Real Estate" 
              className="h-16 md:h-20"
            />
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Experience Real Estate Done Right
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Your journey to finding the perfect property starts here. Whether it's a dream home, a prime office space, or an investment opportunity, we're dedicated to turning your vision into reality.
          </p>
          
          {/* Search Bar */}
          <form onSubmit={handleSearch} className="bg-white p-4 rounded-lg shadow-lg mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Location" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-realestate-navy"
                required
              />
              <select 
                className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-realestate-navy"
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
              >
                <option value="">Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="commercial">Commercial</option>
              </select>
              <Button type="submit" className="bg-realestate-navy hover:bg-realestate-navy/90 text-white">
                Search
              </Button>
            </div>
          </form>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-realestate-blue hover:bg-realestate-blue/90 text-white font-medium">
              <Link to="/properties">Explore Properties</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <Link to="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
