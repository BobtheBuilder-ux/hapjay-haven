
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { Property, createProperty, updateProperty, uploadImage } from "@/services/api";
import { X, Upload, Loader2 } from "lucide-react";

interface PropertyFormProps {
  initialData?: Partial<Property>;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  isEdit?: boolean;
}

const AdminPropertyForm = ({ initialData, onSubmit, onCancel, isEdit = false }: PropertyFormProps) => {
  const { toast } = useToast();
  const [images, setImages] = useState<string[]>(initialData?.images || []);
  const [isUploading, setIsUploading] = useState(false);
  
  const form = useForm({
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      price: initialData?.price || "",
      location: initialData?.location || "",
      address: initialData?.address || "",
      beds: initialData?.beds || 0,
      baths: initialData?.baths || 0,
      sqft: initialData?.sqft || 0,
      lotSize: initialData?.lotSize || "",
      yearBuilt: initialData?.yearBuilt || new Date().getFullYear(),
      type: initialData?.type || "Residential",
      status: initialData?.status || "For Sale",
      features: initialData?.features?.join(", ") || "",
      agent: {
        name: initialData?.agent?.name || "",
        phone: initialData?.agent?.phone || "",
        email: initialData?.agent?.email || "",
        image: initialData?.agent?.image || "https://randomuser.me/api/portraits/men/32.jpg"
      }
    }
  });
  
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setIsUploading(true);
    
    try {
      // In a real implementation, this would upload to your server
      // For now, we'll simulate by using the local file and setTimeout
      
      // Mock upload function - in a real app this would use the uploadImage function
      const mockUpload = (file: File): Promise<string> => {
        return new Promise((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setTimeout(() => {
              resolve(reader.result as string);
            }, 1000); // Simulate network delay
          };
          reader.readAsDataURL(file);
        });
      };
      
      const newImages = [...images];
      
      for (let i = 0; i < files.length; i++) {
        // In real implementation: const imageUrl = await uploadImage(files[i]);
        const imageUrl = await mockUpload(files[i]);
        if (imageUrl) {
          newImages.push(imageUrl);
        }
      }
      
      setImages(newImages);
      toast({
        title: "Images uploaded",
        description: `${files.length} image(s) uploaded successfully.`,
      });
    } catch (error) {
      console.error("Error uploading images:", error);
      toast({
        title: "Upload failed",
        description: "There was an error uploading your images.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  const handleRemoveImage = (index: number) => {
    const newImages = [...images];
    newImages.splice(index, 1);
    setImages(newImages);
  };
  
  const handleFormSubmit = (data: any) => {
    // Parse features from comma-separated string to array
    const featuresArray = data.features
      .split(",")
      .map((feature: string) => feature.trim())
      .filter((feature: string) => feature !== "");
    
    // Construct the complete property data
    const propertyData = {
      ...data,
      features: featuresArray,
      images: images
    };
    
    onSubmit(propertyData);
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">{isEdit ? "Edit Property" : "Add New Property"}</h2>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Basic Information</h3>
            
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Property Title*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter property title" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description*</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Enter property description" 
                      className="min-h-32" 
                      {...field} 
                      required 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price*</FormLabel>
                    <FormControl>
                      <Input placeholder="$500,000" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status*</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="For Sale">For Sale</SelectItem>
                        <SelectItem value="For Rent">For Rent</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Sold">Sold</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Property Type*</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Residential">Residential</SelectItem>
                        <SelectItem value="Luxury">Luxury</SelectItem>
                        <SelectItem value="Commercial">Commercial</SelectItem>
                        <SelectItem value="Rental">Rental</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="yearBuilt"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Year Built</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="2020" 
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          
          {/* Location Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Location</h3>
            
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City/Area*</FormLabel>
                  <FormControl>
                    <Input placeholder="Los Angeles, CA" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Address*</FormLabel>
                  <FormControl>
                    <Input placeholder="123 Main St, Los Angeles, CA 90001" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Property Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Property Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField
                control={form.control}
                name="beds"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bedrooms*</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="3" 
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))} 
                        required 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="baths"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bathrooms*</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="2" 
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))} 
                        required 
                        step="0.5" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="sqft"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Square Feet*</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="1500" 
                        {...field}
                        onChange={e => field.onChange(Number(e.target.value))} 
                        required 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="lotSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lot Size</FormLabel>
                  <FormControl>
                    <Input placeholder="0.25 acres" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="features"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Features (comma separated)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Swimming Pool, Fireplace, Garage, Home Office" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Agent Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Agent Information</h3>
            
            <FormField
              control={form.control}
              name="agent.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent Name*</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} required />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="agent.phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Phone*</FormLabel>
                    <FormControl>
                      <Input placeholder="(555) 123-4567" {...field} required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="agent.email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Agent Email*</FormLabel>
                    <FormControl>
                      <Input placeholder="agent@example.com" {...field} type="email" required />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <FormField
              control={form.control}
              name="agent.image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Agent Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/agent.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* Property Images */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium border-b pb-2">Property Images</h3>
            
            <div className="mb-4">
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById("image-upload")?.click()}
                  disabled={isUploading}
                  className="border-[#4175FC] text-[#4175FC] hover:bg-[#4175FC]/10"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Images
                    </>
                  )}
                </Button>
                <input
                  id="image-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                <span className="text-sm text-gray-500">
                  {images.length} image(s) uploaded
                </span>
              </div>
              
              {images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
                  {images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Property image ${index + 1}`}
                        className="h-24 w-full object-cover rounded-md"
                      />
                      <button
                        type="button"
                        className="absolute top-1 right-1 bg-red-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              {images.length === 0 && (
                <div className="mt-4 p-8 border-2 border-dashed rounded-md text-center text-gray-500">
                  No images uploaded yet. Please upload at least one image.
                </div>
              )}
            </div>
          </div>
          
          {/* Submission */}
          <div className="flex justify-end gap-3 pt-4 mt-8 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUploading || images.length === 0}
              className="bg-[#4175FC] hover:bg-[#4175FC]/90"
            >
              {isEdit ? "Update Property" : "Add Property"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AdminPropertyForm;
