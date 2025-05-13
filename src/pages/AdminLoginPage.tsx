
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AdminLogin from "@/components/AdminLogin";
import Footer from "@/components/Footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is already signed in, redirect to dashboard
        toast({
          title: "Already logged in",
          description: "Redirecting to dashboard...",
        });
        navigate("/admin/dashboard");
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center bg-realestate-silver">
          <p className="text-lg">Checking authentication status...</p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <AdminLogin />
      <Footer />
    </div>
  );
};

export default AdminLoginPage;
