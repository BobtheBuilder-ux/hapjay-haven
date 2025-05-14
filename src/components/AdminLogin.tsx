
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { signInWithEmailAndPassword, signInWithGoogle } from "@/services/authService";
import { useNavigate } from "react-router-dom";
import { LogIn } from "lucide-react";

// Custom Google icon since it's not available in lucide-react
const GoogleIcon = () => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    width="24" 
    height="24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className="h-4 w-4"
  >
    <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" stroke="none" fill="none" />
    <path d="M19.5 12h-15" fill="none" />
    <path d="M15 8l-5 8" fill="none" />
    <path d="M15 16l-5-8" fill="none" />
    <path d="M9 12c0-4.418 3.5-8 8-8" stroke="none" fill="none" />
    <path
      d="M12 2.252a10 10 0 0 1 8.571 4.615A9.993 9.993 0 0 1 22 12a10 10 0 1 1-17.52-6.623"
      fill="none"
    />
    <path
      d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2m0 0a10 10 0 0 0-2 19.834"
      fill="none"
    />
    <path
      d="M21.806 11H12v2h3.926a4 4 0 1 1-.878-3.850"
      fill="none"
    />
  </svg>
);

const AdminLogin = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signInWithEmailAndPassword(formData.email, formData.password);
      toast({
        title: "Login Successful",
        description: "Welcome back to the admin dashboard.",
        variant: "default",
      });
      navigate("/admin/dashboard");
    } catch (error: any) {
      console.error("Login error:", error);
      toast({
        title: "Login Failed",
        description: error.code === "auth/invalid-credential" 
          ? "Invalid email or password. Please try again." 
          : "An error occurred during login. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInWithGoogle();
      toast({
        title: "Login Successful",
        description: "Welcome back to the admin dashboard.",
        variant: "default",
      });
      navigate("/admin/dashboard");
    } catch (error: any) {
      console.error("Google sign-in error:", error);
      
      // Provide more helpful error message based on error code
      let errorMessage = "There was an error signing in with Google.";
      if (error.code === 'auth/unauthorized-domain') {
        errorMessage = "This domain is not authorized for Google authentication. Try email login instead.";
      } else if (error.code === 'auth/popup-closed-by-user') {
        errorMessage = "Sign-in popup was closed before completion.";
      }
      
      toast({
        title: "Google Login Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-12rem)] flex items-center justify-center bg-realestate-silver py-12">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-realestate-navy text-white p-6 text-center">
          <h2 className="text-2xl font-bold">Hapjay Admin Login</h2>
          <p className="text-white/80 mt-2">
            Access the property management system
          </p>
        </div>
        
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                  Password
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  required
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember"
                    name="remember"
                    type="checkbox"
                    className="h-4 w-4 text-realestate-navy focus:ring-realestate-navy border-gray-300 rounded"
                  />
                  <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                
                <div className="text-sm">
                  <a href="#" className="text-realestate-navy hover:underline">
                    Forgot password?
                  </a>
                </div>
              </div>
              
              <Button
                type="submit"
                className="w-full bg-realestate-navy hover:bg-realestate-navy/90 flex items-center justify-center"
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : (
                  <>
                    <LogIn className="mr-2 h-4 w-4" /> Sign in with Email
                  </>
                )}
              </Button>

              <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
              </div>
              
              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={isGoogleLoading}
                className="w-full flex items-center justify-center"
              >
                {isGoogleLoading ? (
                  "Signing in..."
                ) : (
                  <>
                    <GoogleIcon /> <span className="ml-2">Sign in with Google</span>
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
