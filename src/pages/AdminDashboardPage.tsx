
import { useEffect } from "react";
import AdminDashboard from "@/components/AdminDashboard";

const AdminDashboardPage = () => {
  useEffect(() => {
    document.title = "Admin Dashboard | Hapjay Real Estate";
  }, []);

  return (
    <AdminDashboard />
  );
};

export default AdminDashboardPage;
