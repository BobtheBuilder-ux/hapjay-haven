
import Navbar from "@/components/Navbar";
import PropertyDetail from "@/components/PropertyDetail";
import Footer from "@/components/Footer";
import { useEffect } from "react";

const PropertyDetailsPage = () => {
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <PropertyDetail />
      </div>
      <Footer />
    </div>
  );
};

export default PropertyDetailsPage;
