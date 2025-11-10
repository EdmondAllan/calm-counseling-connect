import { useState } from "react";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { useAuth } from "../hooks/useAuth";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  const navLinks = [
    { to: "/", text: "Home" },
    { to: "/about", text: "About Us" },
    { to: "/services", text: "Services" },
    { to: "/booking", text: "Book Session" },
    { to: "/contact", text: "Contact" },
  ];

  const mobileMenuVariants: Variants = {
    hidden: {
      opacity: 0,
      y: "-100%",
      transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "tween", duration: 0.3, ease: "easeInOut" },
    },
  };
  
  const linkStyle = "relative text-gray-800 font-medium py-2 transition-colors duration-300 group";
  const activeLinkStyle = "text-blue-600";

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <NavLink to="/" className="flex items-center flex-shrink-0">
            <img
              src="/intellcounsellinglogoforweb.png"
              alt="Intell Counselling Logo"
              className="h-14 w-auto"
            />
          </NavLink>

          <ul className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `${linkStyle} ${isActive ? activeLinkStyle : ""}`
                  }
                >
                  {link.text}
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center"></span>
                </NavLink>
              </li>
            ))}
          </ul>
          
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="z-50 relative w-8 h-8 text-gray-800">
              <span className={`block w-full h-0.5 bg-current transform transition duration-300 ease-in-out ${isOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-current mt-1.5 transform transition duration-300 ease-in-out ${isOpen ? 'opacity-0' : ''}`}></span>
              <span className={`block w-full h-0.5 bg-current mt-1.5 transform transition duration-300 ease-in-out ${isOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="lg:hidden absolute top-0 left-0 w-full bg-white/95 backdrop-blur-sm shadow-lg"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <ul className="flex flex-col items-center justify-center h-screen space-y-8">
              {navLinks.map((link) => (
                <li key={link.to} onClick={() => setIsOpen(false)}>
                  <NavLink
                    to={link.to}
                    className={({ isActive }) =>
                      `text-2xl ${linkStyle} ${isActive ? activeLinkStyle : ""}`
                    }
                  >
                    {link.text}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-center"></span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
