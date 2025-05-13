
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-realestate-navy text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">
              <span className="text-realestate-gold">Hapjay</span> Real Estate
            </h3>
            <p className="text-white/80 max-w-xs">
              Where We Build Your Visions. We don't just find properties—we create opportunities for your real estate dreams.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-realestate-gold transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-realestate-gold transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-realestate-gold transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-white hover:text-realestate-gold transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/" className="text-white/80 hover:text-realestate-gold transition-colors">
                Home
              </Link>
              <Link to="/properties" className="text-white/80 hover:text-realestate-gold transition-colors">
                Properties
              </Link>
              <Link to="/about" className="text-white/80 hover:text-realestate-gold transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="text-white/80 hover:text-realestate-gold transition-colors">
                Contact
              </Link>
              <Link to="/admin" className="text-white/80 hover:text-realestate-gold transition-colors">
                Admin
              </Link>
            </nav>
          </div>

          {/* Properties */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Our Services</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/properties?type=residential" className="text-white/80 hover:text-realestate-gold transition-colors">
                Meticulous Planning
              </Link>
              <Link to="/properties?type=commercial" className="text-white/80 hover:text-realestate-gold transition-colors">
                Completion On Time
              </Link>
              <Link to="/properties?type=luxury" className="text-white/80 hover:text-realestate-gold transition-colors">
                Perfect Execution
              </Link>
              <Link to="/properties?type=property-management" className="text-white/80 hover:text-realestate-gold transition-colors">
                Property Management
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-realestate-gold" />
                <span className="text-white/80">Suite C22, Habiba Plaza, Wuse 2, Abuja</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-realestate-gold" />
                <span className="text-white/80">+234 803 8833 068</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-realestate-gold" />
                <span className="text-white/80">info@hapjayrealtysolutions.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/20 text-center text-white/60">
          <p>&copy; {currentYear} Hapjay Real Estate Solutions. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
