
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { CalendarIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";

const AppointmentForm = ({ onClose }: { onClose: () => void }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [date, setDate] = useState<Date>();
  const [formData, setFormData] = useState({
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
      
      if (response.ok) {
        toast({
          title: "Appointment Scheduled!",
          description: "We will contact you soon to confirm your appointment details.",
        });
        onClose();
      } else {
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

  const timeSlots = [
    "9:00 AM", "10:00 AM", "11:00 AM", "1:00 PM", 
    "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"
  ];

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-[#4175FC] mb-6">Schedule an Appointment</h2>
      <p className="mb-6 text-gray-600">Fill out the form below to schedule a viewing or consultation with our team.</p>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email Address</label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Phone Number</label>
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="(555) 123-4567"
              required
            />
          </div>

          <div>
            <label htmlFor="propertyInterest" className="block text-sm font-medium mb-1">Property Interest</label>
            <Input
              id="propertyInterest"
              name="propertyInterest"
              value={formData.propertyInterest}
              onChange={handleChange}
              placeholder="e.g., Residential, Commercial, Rental"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Preferred Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : "Select a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(date) => {
                    // Disable past dates and weekends
                    return (
                      date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                      date.getDay() === 0 ||
                      date.getDay() === 6
                    );
                  }}
                  className="pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Preferred Time</label>
            <Select onValueChange={(value) => handleSelectChange("timeSlot", value)}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select a time slot" />
              </SelectTrigger>
              <SelectContent>
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>{time}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">Additional Information</label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Let us know about any specific requirements or questions"
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-3">
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#4175FC] hover:bg-[#4175FC]/90"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Schedule Appointment"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AppointmentForm;
