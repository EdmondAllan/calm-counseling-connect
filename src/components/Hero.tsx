import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";

const Hero = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-16 md:py-24">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="text-center md:text-left">
            <motion.h1
              className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 leading-tight"
              variants={itemVariants}
            >
              Customized Schedule Available
            </motion.h1>
            <motion.h2
              className="text-2xl md:text-3xl font-semibold text-gray-800 mb-6"
              variants={itemVariants}
            >
              Intel Counselling offers holistic mental health assistance
            </motion.h2>
            <motion.p
              className="text-lg text-gray-600 mb-8 leading-relaxed"
              variants={itemVariants}
            >
              Extend a compassionate hand to guide you through life's journey,
              offering a spectrum of transformative services.
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row justify-center md:justify-start gap-4"
              variants={itemVariants}
            >
              <Link
                to="/booking"
                className="px-8 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Book a Session
              </Link>
              <Link
                to="/services"
                className="px-8 py-3 font-semibold text-blue-600 bg-transparent border-2 border-blue-500 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Our Services
              </Link>
            </motion.div>
          </div>
          <motion.div className="hidden md:block" variants={itemVariants}>
            {/* You can re-add an image here if you have one, e.g:
            <img src="/path-to-your-image.png" alt="Counselling illustration" className="rounded-lg shadow-2xl"/>
            */}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
