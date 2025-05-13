
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Property } from "@/types/property";
import { 
  addProperty as firebaseAddProperty, 
  updateProperty as firebaseUpdateProperty,
  deleteProperty as firebaseDeleteProperty 
} from "@/services/propertyService";

export const usePropertyForm = (properties: Property[], setProperties: React.Dispatch<React.SetStateAction<Property[]>>) => {
  const { toast } = useToast();
  const [editingProperty, setEditingProperty] = useState<Property | undefined>(undefined);
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(false);

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

  return {
    editingProperty,
    formOpen,
    loading,
    setFormOpen,
    handleAddProperty,
    handleSaveProperty,
    handleCancelPropertyForm,
    handleEditProperty,
    handleDeleteProperty
  };
};
