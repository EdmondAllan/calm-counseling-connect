
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-intell-lightblue py-4">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <img
              src="/logo.svg"
              alt="Intell Counselling Logo"
              className="h-10 w-auto"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/160x50?text=Intell+Counselling";
              }}
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-800 hover:text-intell-blue transition-colors">Home</Link>
            <Link to="/about" className="text-gray-800 hover:text-intell-blue transition-colors">About Us</Link>
            <Link to="/services" className="text-gray-800 hover:text-intell-blue transition-colors">Services</Link>
            <Link to="/booking" className="text-gray-800 hover:text-intell-blue transition-colors">Book Session</Link>
            <Link to="/contact" className="text-gray-800 hover:text-intell-blue transition-colors">Contact</Link>
          </div>
          
          <div className="md:hidden">
            <Button variant="ghost" onClick={toggleMenu} aria-label="Menu">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>
        
        {isOpen && (
          <div className="md:hidden mt-4 space-y-2 animate-fade-in">
            <Link
              to="/"
              className="block py-2 px-4 text-gray-800 hover:bg-intell-blue hover:text-white rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="block py-2 px-4 text-gray-800 hover:bg-intell-blue hover:text-white rounded-md"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/services"
              className="block py-2 px-4 text-gray-800 hover:bg-intell-blue hover:text-white rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Services
            </Link>
            <Link
              to="/booking"
              className="block py-2 px-4 text-gray-800 hover:bg-intell-blue hover:text-white rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Book Session
            </Link>
            <Link
              to="/contact"
              className="block py-2 px-4 text-gray-800 hover:bg-intell-blue hover:text-white rounded-md"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
        
        <div className="hidden md:block text-right text-sm text-gray-600 mt-2">
          <span>Phone No.: +91 9486991505</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
