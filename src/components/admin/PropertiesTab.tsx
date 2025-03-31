
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Property } from "@/types/property";
import PropertyList from "./PropertyList";

interface PropertiesTabProps {
  properties: Property[];
  onAddProperty: () => void;
  onEditProperty: (id: number) => void;
  onDeleteProperty: (id: number) => void;
}

const PropertiesTab = ({ 
  properties, 
  onAddProperty, 
  onEditProperty, 
  onDeleteProperty 
}: PropertiesTabProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Property Management</CardTitle>
          <Button size="sm" className="bg-[#4175FC]" onClick={onAddProperty}>
            <Plus className="h-4 w-4 mr-1" />
            Add New Property
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <PropertyList 
          properties={properties} 
          onEdit={onEditProperty} 
          onDelete={onDeleteProperty} 
        />
      </CardContent>
    </Card>
  );
};

export default PropertiesTab;
