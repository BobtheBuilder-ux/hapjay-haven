import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Bed, 
  Bath, 
  Square, 
  Calendar, 
  Home, 
  Phone, 
  Mail, 
  Share, 
  Heart,
  HeartOff,
  Printer,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ContactSection from "./ContactSection";
import { fetchPropertyById, Property } from "@/services/api";

const fallbackProperties = [
  {
    id: 1,
    title: "Modern Luxury Villa",
    description: "This stunning modern villa offers panoramic views and premium finishes throughout. Featuring an open floor plan with floor-to-ceiling windows, gourmet kitchen with top-of-the-line appliances, and a private pool with outdoor entertaining area. The primary suite includes a spa-like bathroom and walk-in closet. Additional features include smart home technology, a three-car garage, and beautifully landscaped grounds.",
    price: "$1,250,000",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    location: "Beverly Hills, CA",
    address: "123 Luxury Lane, Beverly Hills, CA 90210",
    beds: 5,
    baths: 4,
    sqft: 4200,
    lotSize: "0.5 acres",
    yearBuilt: 2020,
    type: "Luxury",
    status: "For Sale",
    features: [
      "Private Pool",
      "Smart Home Technology",
      "Gourmet Kitchen",
      "Walk-in Closets",
      "Home Office",
      "Home Theater",
      "Wine Cellar",
      "Three-Car Garage",
      "Outdoor Kitchen",
      "Fireplace"
    ],
    agent: {
      name: "Jessica Parker",
      phone: "(555) 123-4567",
      email: "jessica@hapjayrealestate.com",
      image: "https://randomuser.me/api/portraits/women/44.jpg"
    }
  },
  {
    id: 2,
    title: "Downtown Penthouse",
    description: "Elegant penthouse apartment with city skyline views. This luxury penthouse features an open concept living area, chef's kitchen with premium appliances, and a large private terrace perfect for entertaining. The primary bedroom includes a custom walk-in closet and en-suite bathroom with soaking tub. Building amenities include 24-hour concierge, fitness center, pool, and secure parking.",
    price: "$850,000",
    images: [
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    location: "Los Angeles, CA",
    address: "789 High Rise Blvd, Los Angeles, CA 90017",
    beds: 3,
    baths: 2,
    sqft: 1800,
    lotSize: "N/A",
    yearBuilt: 2018,
    type: "Residential",
    status: "For Sale",
    features: [
      "City Views",
      "Private Terrace",
      "24-hour Concierge",
      "Fitness Center",
      "Pool",
      "Secure Parking",
      "Walk-in Closet",
      "Soaking Tub",
      "High Ceilings",
      "Premium Appliances"
    ],
    agent: {
      name: "Michael Torres",
      phone: "(555) 987-6543",
      email: "michael@hapjayrealestate.com",
      image: "https://randomuser.me/api/portraits/men/32.jpg"
    }
  },
  {
    id: 3,
    title: "Waterfront Estate",
    description: "Breathtaking waterfront property with private dock. This exceptional estate offers luxury living with panoramic water views from nearly every room. The gourmet kitchen features custom cabinetry, top-of-the-line appliances, and a large island. The spacious primary suite includes a sitting area, dual walk-in closets, and a spa-like bathroom. Additional highlights include a home theater, wine cellar, infinity pool, and beautifully landscaped grounds leading to a private dock.",
    price: "$2,350,000",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
    ],
    location: "Malibu, CA",
    address: "456 Oceanfront Drive, Malibu, CA 90265",
    beds: 6,
    baths: 5,
    sqft: 5500,
    lotSize: "1.2 acres",
    yearBuilt: 2015,
    type: "Luxury",
    status: "For Sale",
    features: [
      "Waterfront",
      "Private Dock",
      "Infinity Pool",
      "Home Theater",
      "Wine Cellar",
      "Gourmet Kitchen",
      "Dual Walk-in Closets",
      "Spa Bathroom",
      "Smart Home Technology",
      "Outdoor Entertainment Area"
    ],
    agent: {
      name: "Robert Johnson",
      phone: "(555) 456-7890",
      email: "robert@hapjayrealestate.com",
      image: "https://randomuser.me/api/portraits/men/68.jpg"
    }
  }
];

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const propertyId = parseInt(id || "1");
  const [property, setProperty] = useState<Property | null>(null);
  const [similarProperties, setSimilarProperties] = useState<Property[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setActiveImage(0);
    setIsLoading(true);
    setError(null);
    
    const loadPropertyData = async () => {
      try {
        const propertyData = await fetchPropertyById(propertyId);
        
        if (propertyData) {
          setProperty(propertyData);
          setSimilarProperties(
            fallbackProperties.filter(p => p.id !== propertyId).slice(0, 2)
          );
        } else {
          const fallbackProperty = fallbackProperties.find(p => p.id === propertyId);
          if (fallbackProperty) {
            setProperty(fallbackProperty);
            setSimilarProperties(
              fallbackProperties.filter(p => p.id !== propertyId).slice(0, 2)
            );
          } else {
            setError("Property not found");
          }
        }
      } catch (err) {
        console.error("Error loading property:", err);
        setError("Failed to load property data");
        
        const fallbackProperty = fallbackProperties.find(p => p.id === propertyId);
        if (fallbackProperty) {
          setProperty(fallbackProperty);
          setSimilarProperties(
            fallbackProperties.filter(p => p.id !== propertyId).slice(0, 2)
          );
        }
      } finally {
        setIsLoading(false);
      }
    };
    
    window.scrollTo(0, 0);
    
    loadPropertyData();
  }, [propertyId]);

  if (isLoading) {
    return (
      <div className="py-12 bg-realestate-silver min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#4175FC] mb-4" />
          <p className="text-xl font-medium">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
        <p className="mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="bg-[#4175FC] hover:bg-[#4175FC]/90">
          <a href="/properties">Back to Properties</a>
        </Button>
      </div>
    );
  }

  const handleFavoriteToggle = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      description: isFavorite ? "Property removed from your saved listings" : "Property saved to your favorites",
    });
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast({
      title: "Link copied to clipboard",
      description: "You can now share this property with others",
    });
  };

  const handlePrint = () => {
    window.print();
  };

  const handleContactAgent = () => {
    toast({
      title: "Contact request sent",
      description: `Your request to contact ${property.agent.name} has been received.`,
    });
  };

  const handleScheduleViewing = () => {
    toast({
      title: "Viewing request sent",
      description: "We'll contact you soon to confirm your viewing time.",
    });
  };

  return (
    <div className="py-12 bg-realestate-silver">
      <div className="container-custom">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-0">{property.title}</h1>
            <div className="flex flex-col md:flex-row md:items-center">
              <Badge className="mb-2 md:mb-0 md:mr-3 bg-realestate-navy text-white">{property.status}</Badge>
              <span className="text-2xl font-bold text-realestate-navy">{property.price}</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-5 w-5 mr-1 text-[#4175FC]" />
            <span>{property.address}</span>
          </div>

          <div className="flex flex-wrap gap-2 mb-4">
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 border-realestate-navy text-realestate-navy hover:bg-realestate-navy/10"
              onClick={handleFavoriteToggle}
            >
              {isFavorite ? <HeartOff size={16} /> : <Heart size={16} />}
              {isFavorite ? "Remove Favorite" : "Save"}
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 border-realestate-navy text-realestate-navy hover:bg-realestate-navy/10"
              onClick={handleShare}
            >
              <Share size={16} />
              Share
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="flex items-center gap-1 border-realestate-navy text-realestate-navy hover:bg-realestate-navy/10"
              onClick={handlePrint}
            >
              <Printer size={16} />
              Print
            </Button>
          </div>
        </div>
        
        <div className="mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <img
                      src={image}
                      alt={`${property.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="border-realestate-navy text-realestate-navy hover:bg-realestate-navy/10" />
            <CarouselNext className="border-realestate-navy text-realestate-navy hover:bg-realestate-navy/10" />
          </Carousel>
          
          <div className="grid grid-cols-4 gap-2 mt-2">
            {property.images.map((image, index) => (
              <div
                key={index}
                className={`aspect-video cursor-pointer rounded-md overflow-hidden border-2 ${
                  activeImage === index ? "border-realestate-navy" : "border-transparent"
                }`}
                onClick={() => setActiveImage(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Tabs defaultValue="overview">
              <TabsList className="mb-4 bg-realestate-silver">
                <TabsTrigger 
                  value="overview" 
                  className="data-[state=active]:bg-realestate-navy data-[state=active]:text-white"
                >
                  Overview
                </TabsTrigger>
                <TabsTrigger 
                  value="features"
                  className="data-[state=active]:bg-realestate-navy data-[state=active]:text-white"
                >
                  Features
                </TabsTrigger>
                <TabsTrigger 
                  value="details"
                  className="data-[state=active]:bg-realestate-navy data-[state=active]:text-white"
                >
                  Details
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Property Overview</h2>
                <p className="text-gray-600 mb-6">{property.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex flex-col items-center p-3 bg-realestate-lightblue rounded-lg">
                    <Bed className="h-6 w-6 text-realestate-navy mb-2" />
                    <span className="text-lg font-semibold">{property.beds}</span>
                    <span className="text-sm text-gray-500">Bedrooms</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-realestate-lightblue rounded-lg">
                    <Bath className="h-6 w-6 text-realestate-navy mb-2" />
                    <span className="text-lg font-semibold">{property.baths}</span>
                    <span className="text-sm text-gray-500">Bathrooms</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-realestate-lightblue rounded-lg">
                    <Square className="h-6 w-6 text-realestate-navy mb-2" />
                    <span className="text-lg font-semibold">{property.sqft.toLocaleString()}</span>
                    <span className="text-sm text-gray-500">Square Feet</span>
                  </div>
                  <div className="flex flex-col items-center p-3 bg-realestate-lightblue rounded-lg">
                    <Home className="h-6 w-6 text-realestate-navy mb-2" />
                    <span className="text-lg font-semibold">{property.lotSize}</span>
                    <span className="text-sm text-gray-500">Lot Size</span>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t">
                  <h3 className="text-xl font-semibold mb-4">Similar Properties You Might Like</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {similarProperties.map(similarProperty => (
                      <div 
                        key={similarProperty.id} 
                        className="flex gap-3 p-3 rounded-lg bg-realestate-lightblue cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => navigate(`/properties/${similarProperty.id}`)}
                      >
                        <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                          <img 
                            src={similarProperty.images[0]} 
                            alt={similarProperty.title}
                            className="w-full h-full object-cover" 
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm line-clamp-1">{similarProperty.title}</h4>
                          <p className="text-realestate-navy font-semibold text-sm">{similarProperty.price}</p>
                          <div className="flex items-center text-xs text-gray-600">
                            <Bed className="h-3 w-3 mr-1" />
                            <span>{similarProperty.beds}</span>
                            <span className="mx-1">•</span>
                            <Bath className="h-3 w-3 mr-1" />
                            <span>{similarProperty.baths}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="features" className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Property Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-[#4175FC] mr-2"></div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="details" className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Property Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Property Type:</span>
                      <span>{property.type}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Year Built:</span>
                      <span>{property.yearBuilt}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Square Footage:</span>
                      <span>{property.sqft.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Lot Size:</span>
                      <span>{property.lotSize}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Bedrooms:</span>
                      <span>{property.beds}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Bathrooms:</span>
                      <span>{property.baths}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Status:</span>
                      <span>{property.status}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Location:</span>
                      <span>{property.location}</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-4">Property Agent</h3>
              <div className="flex items-center mb-4">
                <img 
                  src={property.agent.image} 
                  alt={property.agent.name}
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{property.agent.name}</h4>
                  <p className="text-sm text-gray-500">Hapjay Real Estate</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-realestate-navy mr-2" />
                  <span>{property.agent.phone}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-realestate-navy mr-2" />
                  <span>{property.agent.email}</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <Button 
                  className="w-full bg-[#4175FC] hover:bg-[#4175FC]/90"
                  onClick={handleScheduleViewing}
                >
                  Schedule Viewing
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-realestate-navy text-realestate-navy hover:bg-realestate-navy/10"
                  onClick={handleContactAgent}
                >
                  Contact Agent
                </Button>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Mortgage Calculator</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Home Price</label>
                  <input 
                    type="text" 
                    value={property.price}
                    readOnly
                    className="w-full p-2 border rounded-md bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Down Payment (20%)</label>
                  <input 
                    type="text" 
                    value={`$${(parseInt(property.price.replace(/[^0-9]/g, '')) * 0.2).toLocaleString()}`}
                    readOnly
                    className="w-full p-2 border rounded-md bg-gray-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Loan Term</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>30 years</option>
                    <option>15 years</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Interest Rate</label>
                  <select className="w-full p-2 border rounded-md">
                    <option>5.5%</option>
                    <option>6.0%</option>
                    <option>6.5%</option>
                  </select>
                </div>
                <Button className="w-full bg-[#4175FC] hover:bg-[#4175FC]/90">
                  Calculate
                </Button>
                <div className="mt-4 p-4 bg-realestate-lightblue rounded-md text-center">
                  <p className="text-sm text-gray-600">Estimated monthly payment</p>
                  <p className="text-xl font-bold text-realestate-navy">$5,675</p>
                  <p className="text-xs text-gray-500">Principal and interest only</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
