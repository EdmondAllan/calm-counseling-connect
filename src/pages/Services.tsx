import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, BrainCircuit, HeartHandshake, Star, UserRound, Waypoints, Leaf, Globe } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      duration: 0.8,
    },
  },
};

const servicesData = [
  {
    id: 1,
    title: "Parental Guidance and Support",
    description: "Navigate the challenges of parenting with expert guidance tailored to your family's unique needs.",
    details: "Our parental guidance services help you develop effective communication strategies, understand developmental stages, manage behavioral issues, and create a nurturing home environment. We provide practical tools and emotional support to help you become more confident and effective in your parenting journey.",
    Icon: Users,
    gradient: "from-blue-400 to-blue-600",
  },
  {
    id: 2,
    title: "Stress and Anxiety Management",
    description: "Learn effective techniques to manage stress and anxiety for a balanced and peaceful life.",
    details: "Our stress management program combines cognitive behavioral techniques, mindfulness practices, relaxation training, and practical lifestyle adjustments to help you identify stressors, change negative thought patterns, and develop healthy coping mechanisms for long-term resilience.",
    Icon: BrainCircuit,
    gradient: "from-purple-400 to-purple-600",
  },
  {
    id: 3,
    title: "Relationship Enrichment and Family Harmony",
    description: "Strengthen your relationships through improved communication and deeper understanding.",
    details: "Our relationship counseling helps couples and family members improve communication, resolve conflicts, rebuild trust, and deepen emotional connections. We create a safe space to address underlying issues and develop new patterns of interaction that foster harmony and mutual respect.",
    Icon: HeartHandshake,
    gradient: "from-pink-400 to-pink-600",
  },
  {
    id: 4,
    title: "Self-Esteem and Confidence Building",
    description: "Develop a stronger sense of self-worth and confidence to embrace life's opportunities.",
    details: "Our confidence building program helps you identify and challenge negative self-perceptions, recognize your strengths, set meaningful goals, practice self-compassion, and develop the resilience to face challenges with a positive mindset.",
    Icon: Star,
    gradient: "from-yellow-400 to-yellow-600",
  },
  {
    id: 5,
    title: "Adolescent Well-being Counselling",
    description: "Support teenagers through the unique challenges of adolescence and personal development.",
    details: "Our adolescent counseling provides a confidential space for teenagers to express themselves, develop emotional regulation skills, navigate peer relationships, build identity and self-esteem, and address specific challenges such as academic pressure, social media, and family dynamics.",
    Icon: UserRound,
    gradient: "from-teal-400 to-teal-600",
  },
  {
    id: 6,
    title: "Guidance for Life Transitions",
    description: "Navigate major life changes with confidence and clarity through professional support.",
    details: "Our life transition counseling helps you adapt to significant changes such as career shifts, relocation, relationship changes, becoming a parent, or retirement. We provide emotional support and practical strategies to help you embrace new beginnings with confidence and resilience.",
    Icon: Waypoints,
    gradient: "from-cyan-400 to-cyan-600",
  },
  {
    id: 7,
    title: "Personal Growth and Reflection",
    description: "Discover your potential and achieve personal growth through guided self-reflection.",
    details: "Our personal development counseling helps you clarify your values and goals, overcome limiting beliefs, develop self-awareness, and create meaningful change in your life. We provide tools for continuous growth and self-improvement aligned with your authentic self.",
    Icon: Leaf,
    gradient: "from-green-400 to-green-600",
  },
  {
    id: 8,
    title: "Counselling for Indians Living Abroad",
    description: "Specialized support for cultural adjustment and identity challenges faced by expatriates.",
    details: "Our cross-cultural counseling addresses the unique challenges faced by Indians living abroad, including cultural adjustment, identity issues, parenting across cultures, managing family expectations, and building community in a new environment while maintaining cultural connections.",
    Icon: Globe,
    gradient: "from-indigo-400 to-indigo-600",
  },
];

const Services = () => {
  return (
    <div className="bg-[#FDFDFD] font-sans">
      {/* Services Hero */}
      <motion.section
        className="py-20 md:py-28 text-center"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4">
          <motion.h1 className="text-3xl md:text-4xl font-bold text-[#343A40] mb-4" variants={itemVariants}>
            Our Counselling Services
          </motion.h1>
          <motion.p className="max-w-3xl mx-auto text-lg md:text-xl text-[#343A40] font-light" variants={itemVariants}>
            Intell Counseling extends a compassionate hand to guide you through life's journey, offering a spectrum of transformative services.
          </motion.p>
        </div>
      </motion.section>

      {/* Services List */}
      <motion.section
        id="counselling-services-page"
        className="py-16 px-4"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={containerVariants}
      >
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {servicesData.map((service) => (
              <motion.div
                key={service.id}
                variants={itemVariants}
                className="service-card group bg-white rounded-2xl p-8 h-full flex flex-col shadow-lg border-2 border-transparent hover:border-blue-500 hover:shadow-2xl transition-all duration-300 ease-in-out"
              >
                <div className={`service-icon-wrapper p-4 rounded-full self-start mb-6 bg-gradient-to-br ${service.gradient} shadow-md transform group-hover:scale-110 transition-transform duration-300`}>
                  <service.Icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-[#4285F4] mb-3">{service.title}</h3>
                <p className="text-gray-600 font-light mb-4">{service.description}</p>
                <p className="text-[#343A40] font-light text-sm leading-relaxed flex-grow">{service.details}</p>
                
                <div className="mt-6">
                  <Link
                    to="/booking"
                    className="inline-block px-8 py-3 font-semibold text-white rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
                  >
                    Book Session
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default Services;
