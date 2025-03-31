
import { Button } from "@/components/ui/button";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  property: string;
  date: string;
  status: string;
}

interface InquiryListProps {
  inquiries: Inquiry[];
  onReply: (id: number) => void;
  onMarkResolved: (id: number) => void;
}

const InquiryList = ({ inquiries, onReply, onMarkResolved }: InquiryListProps) => {
  return (
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
                  onClick={() => onReply(inquiry.id)}
                >
                  Reply
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 px-2"
                  onClick={() => onMarkResolved(inquiry.id)}
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
  );
};

export default InquiryList;
