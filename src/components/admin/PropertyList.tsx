
import { Button } from "@/components/ui/button";
import { Property } from "@/types/property";

interface PropertyListProps {
  properties: Property[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const PropertyList = ({ properties, onEdit, onDelete }: PropertyListProps) => {
  return (
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
                  property.status === "For Sale" || property.status === "For Rent"
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
                  onClick={() => onEdit(property.id)}
                >
                  Edit
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2 text-red-500"
                  onClick={() => onDelete(property.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PropertyList;
