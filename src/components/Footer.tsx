
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";

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
              Your trusted partner in finding the perfect property, offering exceptional service and expertise.
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
            <h4 className="text-lg font-semibold">Property Types</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/properties?type=residential" className="text-white/80 hover:text-realestate-gold transition-colors">
                Residential
              </Link>
              <Link to="/properties?type=commercial" className="text-white/80 hover:text-realestate-gold transition-colors">
                Commercial
              </Link>
              <Link to="/properties?type=luxury" className="text-white/80 hover:text-realestate-gold transition-colors">
                Luxury Homes
              </Link>
              <Link to="/properties?type=rental" className="text-white/80 hover:text-realestate-gold transition-colors">
                Rentals
              </Link>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Us</h4>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-realestate-gold" />
                <span className="text-white/80">123 Main Street, City, State</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-realestate-gold" />
                <span className="text-white/80">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-realestate-gold" />
                <span className="text-white/80">info@hapjayrealestate.com</span>
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
