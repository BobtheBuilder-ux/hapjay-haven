
import React, { useEffect } from "react";
import Home from "./Home";
import { getProperties } from "@/services/propertyService";
import { Property } from "@/types/property";

const Index = () => {
  useEffect(() => {
    // Initialize properties in localStorage if needed
    const fetchAndCacheProperties = async () => {
      try {
        const properties = await getProperties();
        localStorage.setItem('properties', JSON.stringify(properties));
      } catch (error) {
        console.error('Error fetching properties:', error);
      }
    };
    
    fetchAndCacheProperties();
  }, []);
  
  return <Home />;
};

export default Index;
