
import Navbar from "@/components/Navbar";
import PropertyDetail from "@/components/PropertyDetail";
import Footer from "@/components/Footer";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const PropertyDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    document.title = `Property ${id} | Hapjay Real Estate`;
  }, [id]);
  
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
