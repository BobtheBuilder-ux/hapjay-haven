
import { useState } from "react";
import { Inquiry } from "@/types/admin";
import { getSampleInquiries, updateInquiryStatus } from "@/services/inquiryService";
import { useToast } from "@/hooks/use-toast";

export const useInquiries = () => {
  const { toast } = useToast();
  const [inquiries, setInquiries] = useState<Inquiry[]>(getSampleInquiries());

  const handleReplyInquiry = (id: number) => {
    toast({
      title: "Reply Sent",
      description: `Response to inquiry #${id} has been sent.`,
    });
  };

  const handleMarkResolved = (id: number) => {
    setInquiries(updateInquiryStatus(inquiries, id, "Resolved"));
    
    toast({
      title: "Inquiry Resolved",
      description: "The inquiry has been marked as resolved.",
    });
  };

  return {
    inquiries,
    handleReplyInquiry,
    handleMarkResolved
  };
};
