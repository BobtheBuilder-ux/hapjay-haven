
import { Inquiry } from "@/types/admin";
import { useToast } from "@/hooks/use-toast";

// Sample inquiries data
export const getSampleInquiries = (): Inquiry[] => [
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
];

// Update inquiry status
export const updateInquiryStatus = (inquiries: Inquiry[], id: number, status: string): Inquiry[] => {
  return inquiries.map(inquiry => 
    inquiry.id === id ? { ...inquiry, status } : inquiry
  );
};
