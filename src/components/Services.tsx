import { motion } from "framer-motion";

const servicesData = [
  {
    title: "Parental Guidance and Support",
    description: "Navigate the challenges of parenting with expert guidance tailored to your family's unique needs."
  },
  {
    title: "Stress and Anxiety Management",
    description: "Learn effective techniques to manage stress and anxiety for a balanced and peaceful life."
  },
  {
    title: "Relationship Enrichment",
    description: "Strengthen your relationships through improved communication and deeper understanding."
  },
  {
    title: "Self-Esteem and Confidence",
    description: "Develop a stronger sense of self-worth and confidence to embrace life's opportunities."
  },
  {
    title: "Adolescent Well-being Counselling",
    description: "Support teenagers through the unique challenges of adolescence and personal development."
  },
  {
    title: "Guidance for Life Transitions",
    description: "Navigate major life changes with confidence and clarity through professional support."
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const Services = () => {
  return (
    <motion.section 
      id="our-services" 
      className="py-24 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4">
        <motion.h2 
          className="text-3xl md:text-4xl font-bold font-sans text-[#343A40] text-center mb-4"
          variants={itemVariants}
        >
          Our Services
        </motion.h2>
        <motion.p 
          className="text-lg md:text-xl text-[#343A40] text-center max-w-3xl mx-auto mb-16 font-light"
          variants={itemVariants}
        >
          Intell Counseling extends a compassionate hand to guide you through life's journey, offering a spectrum of transformative services.
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
        >
          {servicesData.map((service, index) => (
            <motion.div 
              key={index} 
              className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm hover:shadow-2xl transition-all duration-300 ease-out"
              variants={itemVariants}
              whileHover={{ 
                y: -8, 
                scale: 1.03,
                boxShadow: "0 10px 20px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 }
              }}
            >
              <h3 className="text-xl font-bold text-[#4285F4] mb-3 font-sans">
                {service.title}
              </h3>
              <p className="text-base text-[#343A40] font-light leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Services;
