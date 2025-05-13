
import { useToast } from "@/hooks/use-toast";
import { getSampleAppointments } from "@/services/appointmentService";

export const useAppointments = () => {
  const { toast } = useToast();
  const appointments = getSampleAppointments();

  const handleScheduleAppointment = () => {
    toast({
      title: "Schedule Appointment",
      description: "The appointment scheduling form would open here.",
    });
    // In a real app, this would open an appointment scheduling form/modal
  };

  return {
    appointments,
    handleScheduleAppointment
  };
};
