
import { Appointment } from "@/types/admin";

// Sample appointments data
export const getSampleAppointments = (): Appointment[] => [
  {
    id: 1,
    title: "Property Viewing",
    client: "John Doe",
    property: "Modern Luxury Villa",
    date: "2023-06-18",
    time: "10:00 AM"
  },
  {
    id: 2,
    title: "Contract Signing",
    client: "Jane Smith",
    property: "Downtown Penthouse",
    date: "2023-06-19",
    time: "2:30 PM"
  },
  {
    id: 3,
    title: "Property Inspection",
    client: "Michael Johnson",
    property: "Waterfront Estate",
    date: "2023-06-20",
    time: "11:00 AM"
  }
];
