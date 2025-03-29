
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
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
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-realestate-navy/90 to-realestate-navy/40" />
      
      {/* Content */}
      <div className="container-custom relative z-10 flex h-full flex-col items-start justify-center">
        <div className="max-w-2xl animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Find Your Dream Property
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8">
            Hapjay Real Estate Solutions offers a personalized approach to help you find the perfect property that meets all your needs.
          </p>
          
          {/* Search Bar Placeholder */}
          <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Location" 
                className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-realestate-navy"
              />
              <select className="px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-realestate-navy">
                <option value="">Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="commercial">Commercial</option>
              </select>
              <Button className="bg-realestate-navy hover:bg-realestate-navy/90">
                Search
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild size="lg" className="bg-realestate-gold hover:bg-realestate-gold/90 text-realestate-navy font-medium">
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
