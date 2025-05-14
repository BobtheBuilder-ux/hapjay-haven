
import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useToast } from "@/hooks/use-toast";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const { toast } = useToast();
  const location = useLocation();
  
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        toast({
          title: "Authentication Required",
          description: "Please log in to access this page",
          variant: "destructive",
        });
      }
    });
    
    return () => unsubscribe();
  }, [toast]);

  if (isAuthenticated === null) {
    // Loading state while checking authentication
    return (
      <div className="min-h-screen flex items-center justify-center bg-realestate-silver">
        <p className="text-lg">Checking authentication...</p>
      </div>
    );
  }

  if (isAuthenticated === false) {
    // Redirect to login if not authenticated
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
