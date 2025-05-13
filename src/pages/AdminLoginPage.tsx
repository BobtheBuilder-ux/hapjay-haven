
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import AdminLogin from "@/components/AdminLogin";
import Footer from "@/components/Footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const AdminLoginPage = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is already signed in, redirect to dashboard
        navigate("/admin/dashboard");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  return (
    <div>
      <Navbar />
      <AdminLogin />
      <Footer />
    </div>
  );
};

export default AdminLoginPage;
