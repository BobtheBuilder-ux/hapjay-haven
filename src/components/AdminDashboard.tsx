import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Home, User, DollarSign, Building, Calendar, Plus, List, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import AdminPropertyForm from "./AdminPropertyForm";
import { 
  fetchProperties, 
  createProperty, 
  updateProperty, 
  deleteProperty,
  Property 
} from "@/services/api";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [showPropertyForm, setShowPropertyForm] = useState(false);
  const [editingProperty, setEditingProperty] = useState<Property | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [properties, setProperties] = useState<Property[]>([]);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Sample stats data for the dashboard
  const stats = [
    {
      title: "Total Properties",
      value: 47,
      change: "+5%",
      icon: Building,
      color: "text-purple-500"
    },
    {
      title: "Active Listings",
      value: 28,
      change: "+2%",
      icon: Home,
      color: "text-blue-500"
    },
    {
      title: "Client Inquiries",
      value: 122,
      change: "+18%",
      icon: User,
      color: "text-green-500"
    },
    {
      title: "Monthly Revenue",
      value: "$42,500",
      change: "+12%",
      icon: DollarSign,
      color: "text-yellow-500"
    }
  ];

  // Sample recent inquiries for the inquiries tab
  const [inquiries, setInquiries] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "(555) 123-4567",
      property: "Modern Luxury Villa",
      date: "2023-06-15",
      status: "New"
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      phone: "(555) 987-6543",
      property: "Downtown Penthouse",
      date: "2023-06-14",
      status: "Contacted"
    },
    {
      id: 3,
      name: "Michael Johnson",
      email: "michael.j@example.com",
      phone: "(555) 456-7890",
      property: "Waterfront Estate",
      date: "2023-06-13",
      status: "Scheduled"
    },
    {
      id: 4,
      name: "Emily Williams",
      email: "emily.w@example.com",
      phone: "(555) 789-0123",
      property: "Contemporary Townhouse",
      date: "2023-06-12",
      status: "Contacted"
    }
  ]);

  // Sample upcoming appointments for the calendar tab
  const appointments = [
    {
      id: 1,
      title: "Property Viewing",
      client: "John Doe",
      property: "Modern Luxury Villa",
      date: "2023-06-18",
      time: "10:00 AM"
    },
    {
      id: 2,
      title: "Contract Signing",
      client: "Jane Smith",
      property: "Downtown Penthouse",
      date: "2023-06-19",
      time: "2:30 PM"
    },
    {
      id: 3,
      title: "Property Inspection",
      client: "Michael Johnson",
      property: "Waterfront Estate",
      date: "2023-06-20",
      time: "11:00 AM"
    }
  ];

  // Load property data
  useEffect(() => {
    const loadProperties = async () => {
      setIsLoading(true);
      try {
        const data = await fetchProperties();
        if (data && data.length > 0) {
          setProperties(data);
        } else {
          // If no data from API, keep existing sample data
          // This is just for demo purposes - in a real app you'd handle empty data differently
        }
      } catch (error) {
        console.error("Error loading properties:", error);
        toast({
          title: "Error",
          description: "Failed to load property data. Using sample data instead.",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadProperties();
  }, [refreshTrigger, toast]);

  // Functions to handle button actions
  const handleAddProperty = () => {
    setEditingProperty(null);
    setShowPropertyForm(true);
    setActiveTab("properties");
  };

  const handleEditProperty = (property: Property) => {
    setEditingProperty(property);
    setShowPropertyForm(true);
    setActiveTab("properties");
  };

  const handleDeleteProperty = async (id: number) => {
    // Confirm before deletion
    if (!confirm("Are you sure you want to delete this property?")) {
      return;
    }

    try {
      const success = await deleteProperty(id);
      
      if (success) {
        // Update local state
        setProperties(properties.filter(property => property.id !== id));
        
        toast({
          title: "Property Deleted",
          description: "The property has been removed from the system.",
        });
      } else {
        throw new Error("Failed to delete property");
      }
    } catch (error) {
      console.error("Error deleting property:", error);
      toast({
        title: "Delete Failed",
        description: "There was an error deleting the property. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePropertyFormSubmit = async (propertyData: any) => {
    try {
      if (editingProperty) {
        // Update existing property
        const updatedProperty = await updateProperty(editingProperty.id, propertyData);
        
        if (updatedProperty) {
          // Update local state
          setProperties(properties.map(p => 
            p.id === editingProperty.id ? updatedProperty : p
          ));
          
          toast({
            title: "Property Updated",
            description: `${updatedProperty.title} has been updated successfully.`,
          });
        } else {
          throw new Error("Failed to update property");
        }
      } else {
        // Create new property
        const newProperty = await createProperty(propertyData);
        
        if (newProperty) {
          // Add to local state
          setProperties([...properties, newProperty]);
          
          toast({
            title: "Property Added",
            description: `${newProperty.title} has been added successfully.`,
          });
        } else {
          throw new Error("Failed to create property");
        }
      }
      
      // Reset form state
      setShowPropertyForm(false);
      setEditingProperty(null);
      
      // Trigger a refresh of property data
      setRefreshTrigger(prev => prev + 1);
    } catch (error) {
      console.error("Error saving property:", error);
      toast({
        title: "Save Failed",
        description: "There was an error saving the property. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCancelPropertyForm = () => {
    setShowPropertyForm(false);
    setEditingProperty(null);
  };

  const handleReplyInquiry = (id: number) => {
    toast({
      title: "Reply Sent",
      description: `Response to inquiry #${id} has been sent.`,
    });
  };

  const handleMarkResolved = (id: number) => {
    setInquiries(inquiries.map(inquiry => 
      inquiry.id === id ? { ...inquiry, status: "Resolved" } : inquiry
    ));
    
    toast({
      title: "Inquiry Resolved",
      description: "The inquiry has been marked as resolved.",
    });
  };

  const handleScheduleAppointment = () => {
    toast({
      title: "Schedule Appointment",
      description: "The appointment scheduling form would open here.",
    });
    // In a real app, this would open an appointment scheduling form/modal
  };

  return (
    <div className="bg-realestate-silver min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  <span className="text-sm font-medium text-green-600">{stat.change}</span>
                </div>
                <div className="space-y-1">
                  <h3 className="text-3xl font-bold">{stat.value}</h3>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="bg-white p-1 rounded-lg">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="properties">Properties</TabsTrigger>
            <TabsTrigger value="inquiries">Inquiries</TabsTrigger>
            <TabsTrigger value="calendar">Calendar</TabsTrigger>
          </TabsList>
          
          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Properties */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Recent Properties</CardTitle>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="h-8" 
                      onClick={handleAddProperty}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add Property
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-8">
                      <Loader2 className="h-8 w-8 animate-spin text-[#4175FC]" />
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {properties.slice(0, 4).map((property) => (
                        <div key={property.id} className="flex items-center justify-between border-b pb-4">
                          <div>
                            <h4 className="font-semibold">{property.title}</h4>
                            <p className="text-sm text-gray-500">{property.location}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{property.price}</p>
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              property.status === "For Sale" || property.status === "Active"
                                ? "bg-green-100 text-green-800" 
                                : property.status === "Pending" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : "bg-blue-100 text-blue-800"
                            }`}>
                              {property.status}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Recent Inquiries */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Recent Inquiries</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {inquiries.slice(0, 3).map((inquiry) => (
                      <div key={inquiry.id} className="border-b pb-4">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-semibold">{inquiry.name}</h4>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            inquiry.status === "New" 
                              ? "bg-blue-100 text-blue-800" 
                              : inquiry.status === "Contacted" 
                              ? "bg-yellow-100 text-yellow-800" 
                              : inquiry.status === "Resolved"
                              ? "bg-gray-100 text-gray-800"
                              : "bg-green-100 text-green-800"
                          }`}>
                            {inquiry.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-1">{inquiry.property}</p>
                        <p className="text-xs text-gray-400">{inquiry.date}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Upcoming Appointments */}
              <Card className="lg:col-span-3">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Upcoming Appointments</CardTitle>
                    <Button size="sm" variant="outline" className="h-8" onClick={() => setActiveTab("calendar")}>
                      <Calendar className="h-4 w-4 mr-1" />
                      View Calendar
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {appointments.map((appointment) => (
                      <Card key={appointment.id} className="border bg-gray-50">
                        <CardContent className="p-4">
                          <div className="flex items-center mb-2">
                            <Calendar className="h-4 w-4 text-[#4175FC] mr-2" />
                            <span className="text-sm font-medium">{appointment.date} • {appointment.time}</span>
                          </div>
                          <h4 className="font-semibold mb-1">{appointment.title}</h4>
                          <p className="text-sm text-gray-500 mb-1">Client: {appointment.client}</p>
                          <p className="text-sm text-gray-500">{appointment.property}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          {/* Properties Tab */}
          <TabsContent value="properties">
            {showPropertyForm ? (
              <AdminPropertyForm 
                initialData={editingProperty || undefined}
                onSubmit={handlePropertyFormSubmit}
                onCancel={handleCancelPropertyForm}
                isEdit={!!editingProperty}
              />
            ) : (
              <Card>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle>Property Management</CardTitle>
                    <Button 
                      size="sm" 
                      className="bg-[#4175FC] hover:bg-[#4175FC]/90" 
                      onClick={handleAddProperty}
                    >
                      <Plus className="h-4 w-4 mr-1" />
                      Add New Property
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="flex justify-center py-12">
                      <Loader2 className="h-12 w-12 animate-spin text-[#4175FC]" />
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-4">ID</th>
                            <th className="text-left py-3 px-4">Property</th>
                            <th className="text-left py-3 px-4">Location</th>
                            <th className="text-left py-3 px-4">Price</th>
                            <th className="text-left py-3 px-4">Type</th>
                            <th className="text-left py-3 px-4">Status</th>
                            <th className="text-right py-3 px-4">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {properties.map((property) => (
                            <tr key={property.id} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4">{property.id}</td>
                              <td className="py-3 px-4 font-medium">{property.title}</td>
                              <td className="py-3 px-4">{property.location}</td>
                              <td className="py-3 px-4">{property.price}</td>
                              <td className="py-3 px-4">{property.type}</td>
                              <td className="py-3 px-4">
                                <span className={`text-xs px-2 py-1 rounded-full ${
                                  property.status === "For Sale" || property.status === "Active"
                                    ? "bg-green-100 text-green-800" 
                                    : property.status === "Pending" 
                                    ? "bg-yellow-100 text-yellow-800" 
                                    : property.status === "Draft"
                                    ? "bg-gray-100 text-gray-800"
                                    : "bg-blue-100 text-blue-800"
                                }`}>
                                  {property.status}
                                </span>
                              </td>
                              <td className="py-3 px-4 text-right">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 px-2"
                                  onClick={() => handleEditProperty(property)}
                                >
                                  Edit
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-8 px-2 text-red-500"
                                  onClick={() => handleDeleteProperty(property.id)}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </TabsContent>
          
          {/* Inquiries Tab */}
          <TabsContent value="inquiries">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle>Client Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4">ID</th>
                        <th className="text-left py-3 px-4">Name</th>
                        <th className="text-left py-3 px-4">Contact</th>
                        <th className="text-left py-3 px-4">Property</th>
                        <th className="text-left py-3 px-4">Date</th>
                        <th className="text-left py-3 px-4">Status</th>
                        <th className="text-right py-3 px-4">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {inquiries.map((inquiry) => (
                        <tr key={inquiry.id} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">{inquiry.id}</td>
                          <td className="py-3 px-4 font-medium">{inquiry.name}</td>
                          <td className="py-3 px-4">
                            <div>{inquiry.email}</div>
                            <div className="text-sm text-gray-500">{inquiry.phone}</div>
                          </td>
                          <td className="py-3 px-4">{inquiry.property}</td>
                          <td className="py-3 px-4">{inquiry.date}</td>
                          <td className="py-3 px-4">
                            <span className={`text-xs px-2 py-1 rounded-full ${
                              inquiry.status === "New" 
                                ? "bg-blue-100 text-blue-800" 
                                : inquiry.status === "Contacted" 
                                ? "bg-yellow-100 text-yellow-800" 
                                : inquiry.status === "Resolved"
                                ? "bg-gray-100 text-gray-800"
                                : "bg-green-100 text-green-800"
                            }`}>
                              {inquiry.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 px-2"
                              onClick={() => handleReplyInquiry(inquiry.id)}
                            >
                              Reply
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="h-8 px-2"
                              onClick={() => handleMarkResolved(inquiry.id)}
                              disabled={inquiry.status === "Resolved"}
                            >
                              Mark Resolved
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle>Appointment Calendar</CardTitle>
                  <Button size="sm" className="bg-[#4175FC] hover:bg-[#4175FC]/90" onClick={handleScheduleAppointment}>
                    <Plus className="h-4 w-4 mr-1" />
                    Schedule Appointment
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-center p-12 border rounded-md bg-gray-50">
                  <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium mb-2">Calendar Integration Coming Soon</h3>
                  <p className="text-gray-500 mb-4">
                    The full calendar feature is currently under development.
                  </p>
                  <div className="space-y-4 max-w-md mx-auto">
                    <h4 className="font-medium">Upcoming Appointments:</h4>
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="bg-white p-4 rounded-md shadow-sm border flex items-center">
                        <div className="bg-[#4175FC] text-white rounded-md p-2 mr-4">
                          <Calendar className="h-6 w-6" />
                        </div>
                        <div className="text-left">
                          <p className="font-medium">{appointment.title}</p>
                          <p className="text-sm text-gray-500">
                            {appointment.date} at {appointment.time} - {appointment.client}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
