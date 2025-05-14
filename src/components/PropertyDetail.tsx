
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
  Printer
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import ContactSection from "./ContactSection";
import { Property } from "@/types/property";
import { getProperties } from "@/services/propertyService";
import { Skeleton } from "@/components/ui/skeleton";

const PropertyDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const propertyId = parseInt(id || "1");
  const [property, setProperty] = useState<Property | null>(null);
  const [relatedProperties, setRelatedProperties] = useState<Property[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset active image when property changes
    setActiveImage(0);
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    const fetchPropertyData = async () => {
      setLoading(true);
      try {
        const allProperties = await getProperties();
        
        // Find the current property
        const currentProperty = allProperties.find(p => p.id === propertyId);
        setProperty(currentProperty || null);
        
        // Find related properties (same type or location)
        if (currentProperty) {
          const related = allProperties
            .filter(p => 
              p.id !== propertyId && 
              (p.type === currentProperty.type || p.location === currentProperty.location)
            )
            .slice(0, 2);
          setRelatedProperties(related);
        }
      } catch (error) {
        console.error('Error fetching property:', error);
        toast({
          title: "Error",
          description: "Failed to load property details",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchPropertyData();
  }, [propertyId, toast]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="py-12 bg-realestate-silver">
        <div className="container-custom">
          <div className="mb-8">
            <Skeleton className="h-10 w-3/4 mb-2" />
            <Skeleton className="h-5 w-1/2 mb-4" />
          </div>
          <div className="mb-8">
            <Skeleton className="h-[400px] w-full rounded-lg" />
            <div className="grid grid-cols-4 gap-2 mt-2">
              {[1, 2, 3, 4].map(i => (
                <Skeleton key={i} className="h-20 w-full rounded-md" />
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <Skeleton className="h-[500px] w-full rounded-lg" />
            </div>
            <div>
              <Skeleton className="h-[300px] w-full rounded-lg mb-6" />
              <Skeleton className="h-[300px] w-full rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  // If property not found
  if (!property) {
    return (
      <div className="container-custom py-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Property Not Found</h2>
        <p className="mb-6">The property you're looking for doesn't exist or has been removed.</p>
        <Button asChild className="bg-realestate-navy hover:bg-realestate-navy/90">
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
    // In a real app, this would open a share dialog
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
      description: `Your request to contact the agent has been received.`,
    });
  };

  const handleScheduleViewing = () => {
    // In a real app, this would open a scheduling form or redirect to a scheduling page
    toast({
      title: "Viewing request sent",
      description: "We'll contact you soon to confirm your viewing time.",
    });
  };

  return (
    <div className="py-12 bg-realestate-silver">
      <div className="container-custom">
        {/* Property Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-4">
            <h1 className="text-3xl md:text-4xl font-bold mb-2 md:mb-0">{property.title}</h1>
            <div className="flex flex-col md:flex-row md:items-center">
              <Badge className="mb-2 md:mb-0 md:mr-3 bg-realestate-navy text-white">{property.status}</Badge>
              <span className="text-2xl font-bold text-realestate-navy">{property.price}</span>
            </div>
          </div>
          
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="h-5 w-5 mr-1 text-realestate-blue" />
            <span>{property.location}</span>
          </div>

          {/* Action buttons */}
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
        
        {/* Property Images */}
        <div className="mb-8">
          <Carousel className="w-full">
            <CarouselContent>
              {(property.images || [property.image]).map((image, index) => (
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
          
          {/* Thumbnail Gallery */}
          <div className="grid grid-cols-4 gap-2 mt-2">
            {(property.images || [property.image]).map((image, index) => (
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
        
        {/* Property Details */}
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
                    <span className="text-lg font-semibold">{property.lotSize || 'N/A'}</span>
                    <span className="text-sm text-gray-500">Lot Size</span>
                  </div>
                </div>

                {/* Similar properties suggestion */}
                {relatedProperties.length > 0 && (
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-xl font-semibold mb-4">Similar Properties You Might Like</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {relatedProperties.map(similarProperty => (
                        <div 
                          key={similarProperty.id} 
                          className="flex gap-3 p-3 rounded-lg bg-realestate-lightblue cursor-pointer hover:shadow-md transition-shadow"
                          onClick={() => navigate(`/properties/${similarProperty.id}`)}
                        >
                          <div className="w-20 h-20 flex-shrink-0 rounded-md overflow-hidden">
                            <img 
                              src={similarProperty.image || (similarProperty.images && similarProperty.images[0])} 
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
                )}
              </TabsContent>
              
              <TabsContent value="features" className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Property Features</h2>
                {property.features && property.features.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {property.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-realestate-blue mr-2"></div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No features listed for this property.</p>
                )}
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
                      <span>{property.yearBuilt || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Square Footage:</span>
                      <span>{property.sqft?.toLocaleString() || 'N/A'}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="font-medium">Lot Size:</span>
                      <span>{property.lotSize || 'N/A'}</span>
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
          
          {/* Agent Information */}
          <div>
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h3 className="text-xl font-semibold mb-4">Property Agent</h3>
              <div className="flex items-center mb-4">
                <img 
                  src={property.agent?.image || "https://randomuser.me/api/portraits/lego/1.jpg"} 
                  alt="Agent"
                  className="w-16 h-16 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{property.agent?.name || "Agent Information"}</h4>
                  <p className="text-sm text-gray-500">Hapjay Real Estate</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-realestate-navy mr-2" />
                  <span>{property.agent?.phone || "(555) 123-4567"}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-realestate-navy mr-2" />
                  <span>{property.agent?.email || "agent@hapjayrealestate.com"}</span>
                </div>
              </div>
              <div className="mt-6 space-y-3">
                <Button 
                  className="w-full bg-realestate-navy hover:bg-realestate-navy/90"
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
            
            {/* Mortgage Calculator Placeholder */}
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
                    value={`$${Math.floor(parseInt(property.price.replace(/[^0-9]/g, '')) * 0.2).toLocaleString()}`}
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
                <Button className="w-full bg-realestate-blue hover:bg-realestate-blue/90">
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
