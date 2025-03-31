
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import InquiryList from "./InquiryList";

interface Inquiry {
  id: number;
  name: string;
  email: string;
  phone: string;
  property: string;
  date: string;
  status: string;
}

interface InquiriesTabProps {
  inquiries: Inquiry[];
  onReplyInquiry: (id: number) => void;
  onMarkResolved: (id: number) => void;
}

const InquiriesTab = ({ 
  inquiries, 
  onReplyInquiry, 
  onMarkResolved 
}: InquiriesTabProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Client Inquiries</CardTitle>
      </CardHeader>
      <CardContent>
        <InquiryList 
          inquiries={inquiries} 
          onReply={onReplyInquiry} 
          onMarkResolved={onMarkResolved} 
        />
      </CardContent>
    </Card>
  );
};

export default InquiriesTab;
