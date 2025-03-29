
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface PropertyDetailsProps {
  propertyInterest: string;
  message: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const PropertyDetails = ({ propertyInterest, message, handleChange }: PropertyDetailsProps) => {
  return (
    <>
      <div>
        <label htmlFor="propertyInterest" className="block text-sm font-medium mb-1">Property Interest</label>
        <Input
          id="propertyInterest"
          name="propertyInterest"
          value={propertyInterest}
          onChange={handleChange}
          placeholder="e.g., Residential, Commercial, Rental"
        />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">Additional Information</label>
        <Textarea
          id="message"
          name="message"
          value={message}
          onChange={handleChange}
          placeholder="Let us know about any specific requirements or questions"
          rows={3}
        />
      </div>
    </>
  );
};

export default PropertyDetails;
