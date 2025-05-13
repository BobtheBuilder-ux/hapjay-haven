import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Property } from "@/types/property";
import { Inquiry, Appointment } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import PropertyForm from "./admin/PropertyForm";
import AdminStats from "./admin/AdminStats";
import OverviewTab from "./admin/OverviewTab";
import PropertiesTab from "./admin/PropertiesTab";
import InquiriesTab from "./admin/InquiriesTab";
import CalendarTab from "./admin/CalendarTab";
import { 
  getProperties, 
  addProperty as firebaseAddProperty, 
  updateProperty as firebaseUpdateProperty,
  deleteProperty as firebaseDeleteProperty 
} from "@/services/propertyService";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [editingProperty, setEditingProperty] = useState<Property | undefined>(undefined);
  const [properties, setProperties] = useState<Property[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  // Sample inquiries data
  const [inquiries, setInquiries] = useState<Inquiry[]>([
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

  // Sample appointments data
  const appointments: Appointment[] = [
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

  // Load properties from Firebase
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const fetchedProperties = await getProperties();
        setProperties(fetchedProperties);
      } catch (error) {
        console.error('Error fetching properties:', error);
        toast({
          title: "Error",
          description: "Failed to load properties. Please try again.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [toast]);

  // Functions to handle button actions
  const handleAddProperty = () => {
    setEditingProperty(undefined);
    setFormOpen(true);
  };

  const handleSaveProperty = async (property: Property) => {
    setLoading(true);
    
    try {
      if (editingProperty) {
        // Updating existing property in Firebase
        await firebaseUpdateProperty(property);
        
        // Update local state
        setProperties(properties.map(p => 
          p.id === property.id ? property : p
        ));
        
        toast({
          title: "Property Updated",
          description: `The property '${property.title}' has been updated.`,
        });
      } else {
        // Adding new property to Firebase
        // Generate temporary ID
        const tempId = Date.now();
        property.id = tempId;
        
        // Add to Firebase and get the updated property with Firebase ID
        const addedProperty = await firebaseAddProperty(property);
        
        // Update local state
        setProperties([...properties, addedProperty]);
        
        toast({
          title: "Property Added",
          description: `New property '${property.title}' has been added.`,
        });
      }
      
      // Close form
      setFormOpen(false);
      // Switch to properties tab to show the new/updated property
      setActiveTab("properties");
    } catch (error) {
      console.error("Error saving property:", error);
      toast({
        title: "Error",
        description: "Failed to save the property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCancelPropertyForm = () => {
    setFormOpen(false);
  };

  const handleEditProperty = (id: number) => {
    const property = properties.find(p => p.id === id);
    if (property) {
      setEditingProperty(property);
      setFormOpen(true);
    }
  };

  const handleDeleteProperty = async (id: number) => {
    setLoading(true);
    try {
      // Delete from Firebase
      await firebaseDeleteProperty(id);
      
      // Update local state
      const updatedProperties = properties.filter(property => property.id !== id);
      setProperties(updatedProperties);
      
      toast({
        title: "Property Deleted",
        description: "The property has been removed from the system.",
      });
    } catch (error) {
      console.error("Error deleting property:", error);
      toast({
        title: "Error",
        description: "Failed to delete the property. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
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
        <AdminStats properties={properties} />
        
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
            <OverviewTab 
              properties={properties} 
              inquiries={inquiries} 
              appointments={appointments} 
              onAddProperty={handleAddProperty} 
              onViewCalendar={() => setActiveTab("calendar")} 
            />
          </TabsContent>
          
          {/* Properties Tab */}
          <TabsContent value="properties">
            <PropertiesTab 
              properties={properties} 
              onAddProperty={handleAddProperty}
              onEditProperty={handleEditProperty}
              onDeleteProperty={handleDeleteProperty}
              loading={loading}
            />
          </TabsContent>
          
          {/* Inquiries Tab */}
          <TabsContent value="inquiries">
            <InquiriesTab 
              inquiries={inquiries} 
              onReplyInquiry={handleReplyInquiry} 
              onMarkResolved={handleMarkResolved} 
            />
          </TabsContent>
          
          {/* Calendar Tab */}
          <TabsContent value="calendar">
            <CalendarTab 
              appointments={appointments} 
              onScheduleAppointment={handleScheduleAppointment} 
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Property Form Dialog */}
      <Dialog open={formOpen} onOpenChange={setFormOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingProperty ? "Edit Property" : "Add New Property"}
            </DialogTitle>
          </DialogHeader>
          <PropertyForm 
            onSubmit={handleSaveProperty} 
            onCancel={handleCancelPropertyForm}
            initialData={editingProperty}
            isSubmitting={loading}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
