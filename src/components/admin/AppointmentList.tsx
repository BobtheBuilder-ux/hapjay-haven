
import { Calendar } from "lucide-react";

interface Appointment {
  id: number;
  title: string;
  client: string;
  property: string;
  date: string;
  time: string;
}

interface AppointmentListProps {
  appointments: Appointment[];
}

const AppointmentList = ({ appointments }: AppointmentListProps) => {
  return (
    <div className="space-y-4 max-w-md mx-auto">
      <h4 className="font-medium">Upcoming Appointments:</h4>
      {appointments.map((appointment) => (
        <div key={appointment.id} className="bg-white p-4 rounded-md shadow-sm border flex items-center">
          <div className="bg-[#4175FC] text-white rounded-md p-2 mr-4">
            <Calendar className="h-6 w-6" />
          </div>
          <div className="text-left">
            <p className="font-medium">{appointment.title}</p>
            <p className="text-sm text-gray-500">
              {appointment.date} at {appointment.time} - {appointment.client}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;
