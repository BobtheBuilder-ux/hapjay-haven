
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Property } from "@/types/property";
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
import { getProperties } from "@/services/propertyService";
import { usePropertyForm } from "@/hooks/usePropertyForm";
import { useInquiries } from "@/hooks/useInquiries";
import { useAppointments } from "@/hooks/useAppointments";

const AdminDashboard = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("overview");
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  // Use custom hooks
  const { 
    inquiries, 
    handleReplyInquiry, 
    handleMarkResolved 
  } = useInquiries();

  const { 
    appointments, 
    handleScheduleAppointment 
  } = useAppointments();

  const {
    editingProperty,
    formOpen,
    loading: propertyLoading,
    setFormOpen,
    handleAddProperty,
    handleSaveProperty,
    handleCancelPropertyForm,
    handleEditProperty,
    handleDeleteProperty
  } = usePropertyForm(properties, setProperties);

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
              loading={loading || propertyLoading}
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
            isSubmitting={propertyLoading}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminDashboard;
