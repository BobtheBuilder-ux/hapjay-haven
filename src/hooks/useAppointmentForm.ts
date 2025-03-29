
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { format } from "date-fns";

interface FormData {
  name: string;
  email: string;
  phone: string;
  propertyInterest: string;
  message: string;
  timeSlot: string;
}

export const useAppointmentForm = (onClose: () => void) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    propertyInterest: "",
    message: "",
    timeSlot: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.phone || !date || !formData.timeSlot) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Prepare data for webhook
    const webhookData = {
      ...formData,
      date: date ? format(date, "yyyy-MM-dd") : "",
      submittedAt: new Date().toISOString()
    };
    
    try {
      const response = await fetch("https://hook.eu2.make.com/qnmoq9xpt3aud5cavnes1g6sk5o5dy6d", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(webhookData),
      });
      
      if (response.ok || response.status === 200) {
        toast({
          title: "Appointment Scheduled!",
          description: "We will contact you soon to confirm your appointment details.",
        });
        onClose();
      } else {
        console.error("Webhook response:", response.status, response.statusText);
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Submission Error",
        description: "There was a problem scheduling your appointment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    date,
    setDate,
    isSubmitting,
    handleChange,
    handleSelectChange,
    handleSubmit
  };
};
