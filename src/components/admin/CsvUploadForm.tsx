
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Papa from "papaparse";
import { Property } from "@/types/property";
import { bulkUploadProperties } from "@/services/propertyService";

interface CsvUploadFormProps {
  onUploadComplete: () => void;
}

const CsvUploadForm = ({ onUploadComplete }: CsvUploadFormProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please select a valid CSV file",
        variant: "destructive",
      });
      setFile(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast({
        title: "No file selected",
        description: "Please select a CSV file to upload",
        variant: "destructive",
      });
      return;
    }

    setUploading(true);

    try {
      // Parse CSV file
      Papa.parse(file, {
        header: true,
        complete: async (results) => {
          try {
            // Transform CSV data to Property objects
            const properties = results.data
              .filter((item: any) => item.title && item.price) // Filter out incomplete rows
              .map((item: any) => {
                const property: Property = {
                  id: parseInt(item.id) || Date.now(),
                  title: item.title,
                  description: item.description || "",
                  price: item.price,
                  location: item.location || "",
                  address: item.address || "",
                  images: item.images ? item.images.split(",") : [],
                  image: item.image || "",
                  beds: parseInt(item.beds) || 0,
                  baths: parseInt(item.baths) || 0,
                  sqft: parseInt(item.sqft) || 0,
                  lotSize: item.lotSize || "",
                  yearBuilt: parseInt(item.yearBuilt) || 0,
                  type: item.type || "House",
                  status: item.status || "For Sale",
                  features: item.features ? item.features.split(",") : [],
                  featured: item.featured === "true",
                  agent: item.agentName ? {
                    name: item.agentName,
                    phone: item.agentPhone || "",
                    email: item.agentEmail || "",
                    image: item.agentImage || "",
                  } : undefined
                };
                return property;
              });

            // Upload to Firebase
            await bulkUploadProperties(properties);
            
            toast({
              title: "Upload successful",
              description: `${properties.length} properties uploaded successfully`,
            });
            
            onUploadComplete();
          } catch (error) {
            console.error("Error processing CSV:", error);
            toast({
              title: "Upload failed",
              description: "Error processing the CSV file",
              variant: "destructive",
            });
          } finally {
            setUploading(false);
          }
        },
        error: (error) => {
          console.error("CSV parsing error:", error);
          toast({
            title: "Parsing failed",
            description: "Failed to parse CSV file",
            variant: "destructive",
          });
          setUploading(false);
        }
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload CSV file",
        variant: "destructive",
      });
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-500">
        <p>Upload a CSV file with the following columns:</p>
        <p className="font-mono text-xs mt-1">
          id, title, description, price, location, address, images, image, beds, baths, sqft, lotSize, yearBuilt, type, status, features, featured, agentName, agentPhone, agentEmail, agentImage
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <Input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="flex-1"
        />
        <Button 
          onClick={handleUpload}
          disabled={!file || uploading}
          className="bg-[#4175FC] flex items-center gap-2"
        >
          <Upload className="h-4 w-4" />
          {uploading ? "Uploading..." : "Upload CSV"}
        </Button>
      </div>
      
      {file && (
        <p className="text-sm text-gray-500">Selected file: {file.name}</p>
      )}
    </div>
  );
};

export default CsvUploadForm;
