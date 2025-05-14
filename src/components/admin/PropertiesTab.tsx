
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Plus, FileUp } from "lucide-react";
import { useState } from "react";
import { Property } from "@/types/property";
import PropertyList from "./PropertyList";
import CsvUploadForm from "./CsvUploadForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface PropertiesTabProps {
  properties: Property[];
  onAddProperty: () => void;
  onEditProperty: (id: number) => void;
  onDeleteProperty: (id: number) => void;
  loading?: boolean;
  onRefresh: () => void;
}

const PropertiesTab = ({ 
  properties, 
  onAddProperty, 
  onEditProperty, 
  onDeleteProperty,
  loading = false,
  onRefresh
}: PropertiesTabProps) => {
  const [csvDialogOpen, setCsvDialogOpen] = useState(false);

  const handleUploadComplete = () => {
    setCsvDialogOpen(false);
    onRefresh();
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <CardTitle>Property Management</CardTitle>
            <div className="flex items-center gap-2">
              <Button 
                size="sm" 
                variant="outline" 
                className="flex items-center gap-1"
                onClick={() => setCsvDialogOpen(true)}
                disabled={loading}
              >
                <FileUp className="h-4 w-4" />
                Bulk Upload
              </Button>
              <Button size="sm" className="bg-[#4175FC]" onClick={onAddProperty} disabled={loading}>
                <Plus className="h-4 w-4 mr-1" />
                Add New Property
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <PropertyList 
            properties={properties} 
            onEdit={onEditProperty} 
            onDelete={onDeleteProperty} 
            loading={loading}
          />
        </CardContent>
      </Card>

      <Dialog open={csvDialogOpen} onOpenChange={setCsvDialogOpen}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Bulk Upload Properties</DialogTitle>
          </DialogHeader>
          <CsvUploadForm onUploadComplete={handleUploadComplete} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PropertiesTab;
