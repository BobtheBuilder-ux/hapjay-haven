
import { Building, Home, User, DollarSign } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Property } from "@/types/property";

interface StatsProps {
  properties: Property[];
}

const AdminStats = ({ properties }: StatsProps) => {
  // Sample stats data for the dashboard
  const stats = [
    {
      title: "Total Properties",
      value: properties.length,
      change: "+5%",
      icon: Building,
      color: "text-purple-500"
    },
    {
      title: "Active Listings",
      value: properties.filter(p => p.status === "For Sale" || p.status === "For Rent").length,
      change: "+2%",
      icon: Home,
      color: "text-blue-500"
    },
    {
      title: "Client Inquiries",
      value: 122,
      change: "+18%",
      icon: User,
      color: "text-green-500"
    },
    {
      title: "Monthly Revenue",
      value: "$42,500",
      change: "+12%",
      icon: DollarSign,
      color: "text-yellow-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-3xl font-bold">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.title}</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdminStats;
