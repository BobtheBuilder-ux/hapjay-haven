
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Calendar, Plus } from "lucide-react";
import { Property } from "@/types/property";

interface Inquiry {
  id: number;
  name: string;
  property: string;
  date: string;
  status: string;
}

interface Appointment {
  id: number;
  title: string;
  client: string;
  property: string;
  date: string;
  time: string;
}

interface OverviewTabProps {
  properties: Property[];
  inquiries: Inquiry[];
  appointments: Appointment[];
  onAddProperty: () => void;
  onViewCalendar: () => void;
}

const OverviewTab = ({ 
  properties, 
  inquiries, 
  appointments, 
  onAddProperty, 
  onViewCalendar 
}: OverviewTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Recent Properties */}
      <Card className="lg:col-span-2">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Recent Properties</CardTitle>
            <Button size="sm" variant="outline" className="h-8" onClick={onAddProperty}>
              <Plus className="h-4 w-4 mr-1" />
              Add Property
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {properties.slice(0, 4).map((property) => (
              <div key={property.id} className="flex items-center justify-between border-b pb-4">
                <div>
                  <h4 className="font-semibold">{property.title}</h4>
                  <p className="text-sm text-gray-500">{property.location}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{property.price}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    property.status === "For Sale" || property.status === "For Rent"
                      ? "bg-green-100 text-green-800" 
                      : property.status === "Pending" 
                      ? "bg-yellow-100 text-yellow-800" 
                      : "bg-blue-100 text-blue-800"
                  }`}>
                    {property.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Recent Inquiries */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Recent Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {inquiries.slice(0, 3).map((inquiry) => (
              <div key={inquiry.id} className="border-b pb-4">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold">{inquiry.name}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    inquiry.status === "New" 
                      ? "bg-blue-100 text-blue-800" 
                      : inquiry.status === "Contacted" 
                      ? "bg-yellow-100 text-yellow-800" 
                      : inquiry.status === "Resolved"
                      ? "bg-gray-100 text-gray-800"
                      : "bg-green-100 text-green-800"
                  }`}>
                    {inquiry.status}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mb-1">{inquiry.property}</p>
                <p className="text-xs text-gray-400">{inquiry.date}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      {/* Upcoming Appointments */}
      <Card className="lg:col-span-3">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle>Upcoming Appointments</CardTitle>
            <Button size="sm" variant="outline" className="h-8" onClick={onViewCalendar}>
              <Calendar className="h-4 w-4 mr-1" />
              View Calendar
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {appointments.map((appointment) => (
              <Card key={appointment.id} className="border bg-gray-50">
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <Calendar className="h-4 w-4 text-[#4175FC] mr-2" />
                    <span className="text-sm font-medium">{appointment.date} • {appointment.time}</span>
                  </div>
                  <h4 className="font-semibold mb-1">{appointment.title}</h4>
                  <p className="text-sm text-gray-500 mb-1">Client: {appointment.client}</p>
                  <p className="text-sm text-gray-500">{appointment.property}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OverviewTab;
