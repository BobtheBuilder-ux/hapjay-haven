
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Calendar, Plus } from "lucide-react";
import AppointmentList from "./AppointmentList";

interface Appointment {
  id: number;
  title: string;
  client: string;
  property: string;
  date: string;
  time: string;
}

interface CalendarTabProps {
  appointments: Appointment[];
  onScheduleAppointment: () => void;
}

const CalendarTab = ({ appointments, onScheduleAppointment }: CalendarTabProps) => {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Appointment Calendar</CardTitle>
          <Button size="sm" className="bg-[#4175FC]" onClick={onScheduleAppointment}>
            <Plus className="h-4 w-4 mr-1" />
            Schedule Appointment
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-center p-12 border rounded-md bg-gray-50">
          <Calendar className="h-16 w-16 mx-auto text-gray-400 mb-4" />
          <h3 className="text-lg font-medium mb-2">Calendar Integration Coming Soon</h3>
          <p className="text-gray-500 mb-4">
            The full calendar feature is currently under development.
          </p>
          <AppointmentList appointments={appointments} />
        </div>
      </CardContent>
    </Card>
  );
};

export default CalendarTab;
