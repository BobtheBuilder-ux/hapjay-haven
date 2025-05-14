
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import PropertyListing from "@/components/PropertyListing";
import Footer from "@/components/Footer";

const Properties = () => {
  useEffect(() => {
    document.title = "Properties | Hapjay Real Estate";
  }, []);

  return (
    <div>
      <Navbar />
      <PropertyListing />
      <Footer />
    </div>
  );
};

export default Properties;
