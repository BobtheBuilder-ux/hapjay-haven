
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Menu } from "lucide-react";
import AppointmentForm from "./AppointmentForm";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  // Add scroll event listener
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    });
  }

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <h1 className="text-xl md:text-2xl font-bold text-realestate-navy">
            <span className="text-realestate-gold">Hapjay</span> Real Estate
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <Link to="/" className="font-medium hover:text-realestate-gold transition-colors">
            Home
          </Link>
          <Link to="/properties" className="font-medium hover:text-realestate-gold transition-colors">
            Properties
          </Link>
          <Link to="/about" className="font-medium hover:text-realestate-gold transition-colors">
            About
          </Link>
          <Link to="/contact" className="font-medium hover:text-realestate-gold transition-colors">
            Contact
          </Link>
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="bg-realestate-navy hover:bg-realestate-navy/90">
                Get in Touch Now
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <AppointmentForm onClose={() => setDialogOpen(false)} />
            </DialogContent>
          </Dialog>
        </nav>

        {/* Mobile Navigation */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-8">
              <Link to="/" className="font-medium hover:text-realestate-gold transition-colors">
                Home
              </Link>
              <Link to="/properties" className="font-medium hover:text-realestate-gold transition-colors">
                Properties
              </Link>
              <Link to="/about" className="font-medium hover:text-realestate-gold transition-colors">
                About
              </Link>
              <Link to="/contact" className="font-medium hover:text-realestate-gold transition-colors">
                Contact
              </Link>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-realestate-navy hover:bg-realestate-navy/90 w-full">
                    Get in Touch Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[500px]">
                  <AppointmentForm onClose={() => setDialogOpen(false)} />
                </DialogContent>
              </Dialog>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default Navbar;
