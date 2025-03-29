
import { Input } from "@/components/ui/input";

interface ContactInfoProps {
  name: string;
  email: string;
  phone: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContactInfo = ({ name, email, phone, handleChange }: ContactInfoProps) => {
  return (
    <>
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">Full Name</label>
        <Input
          id="name"
          name="name"
          value={name}
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
          value={email}
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
          value={phone}
          onChange={handleChange}
          placeholder="(555) 123-4567"
          required
        />
      </div>
    </>
  );
};

export default ContactInfo;
