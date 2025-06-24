import { motion } from "framer-motion";
import { Check } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.8 },
  },
};

const values = [
    { name: "Compassion", text: "Approaching each individual with genuine care and understanding." },
    { name: "Integrity", text: "Upholding the highest ethical standards in all our practices." },
    { name: "Inclusivity", text: "Creating a welcoming environment for people of all backgrounds." },
    { name: "Excellence", text: "Continuously improving our services through education and feedback." },
];

const About = () => {
  return (
    <div className="bg-white font-sans">
      {/* Main About Section */}
      <motion.section 
        className="py-20 md:py-28"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 text-center">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-[#343A40] mb-4"
            variants={itemVariants}
          >
            About Intell Counselling
          </motion.h2>
          <motion.p 
            className="max-w-3xl mx-auto text-lg md:text-xl text-[#343A40] font-light"
            variants={itemVariants}
          >
            Learn about our mission, values, and the passionate team dedicated to your mental well-being.
          </motion.p>
        </div>
      </motion.section>

      {/* Mission and Values Section */}
      <motion.section 
        className="pb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            
            {/* Mission Column */}
            <motion.div variants={itemVariants}>
              <h3 className="text-3xl font-bold text-[#4285F4] mb-6">
                Our Mission
              </h3>
              <div className="space-y-4 text-lg text-[#343A40] font-light leading-relaxed">
                <p>
                  At Intell Counselling, our mission is to provide accessible, compassionate, and effective mental health services that empower individuals to overcome challenges and achieve emotional well-being.
                </p>
                <p>
                  We believe in creating a safe, non-judgmental space where every person feels valued, understood, and supported on their journey toward personal growth and healing.
                </p>
              </div>
            </motion.div>

            {/* Values Column */}
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.01, transition: { duration: 0.3 } }}
              className="bg-gradient-to-br from-[#F0E6FF] to-[#EEE0FF] p-8 md:p-10 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <h3 className="text-3xl font-bold text-[#8A2BE2] mb-8">
                Our Values
              </h3>
              <ul className="space-y-5">
                {values.map((value, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-start gap-4"
                    custom={index}
                    variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: (i) => ({
                          opacity: 1,
                          x: 0,
                          transition: { delay: i * 0.15 + 0.5, duration: 0.5 },
                        }),
                    }}
                  >
                    <div className="flex-shrink-0 w-7 h-7 bg-[#8A2BE2] text-white rounded-full flex items-center justify-center mt-1 shadow-md">
                      <Check size={18} />
                    </div>
                    <div>
                        <strong className="font-semibold text-[#343A40]">{value.name}:</strong>
                        <span className="text-[#343A40] font-light"> {value.text}</span>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

          </div>
        </div>
      </motion.section>

      {/* Founder Profile - Carried over from original page */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Meet Our Founder</h2>
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <img 
                    src="https://via.placeholder.com/300x400?text=Dr.+P.+Priyanka" 
                    alt="Dr. P. Priyanka" 
                    className="rounded-lg w-full h-auto object-cover shadow-lg"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-semibold text-[#4285F4] mb-4">Dr. P. Priyanka</h3>
                  <div className="space-y-4 text-gray-700 font-light">
                    <p>
                      Hello, I'm P. Priyanka, the heart behind Intell Counselling. As a dedicated and seasoned counsellor, I bring a wealth of experience and a genuine passion for guiding individuals through life's challenges, fostering mental and emotional well-being.
                    </p>
                    <p>
                      With a strong educational foundation, I earned my BSc in Psychology from Women's Christian College, followed by an MSc in Psychology from Madras University. Additionally, I hold a Diploma in Counseling Services and certifications in career guidance and memory enhancement. My commitment to continuous learning ensures that I stay at the forefront of counseling practices.
                    </p>
                    <p>
                      Over the years, I have made a meaningful impact, having worked in more than five schools as a school counsellor. Currently, I am proud to serve as a student counsellor at Rajalakshmi Engineering College. My journey has been focused on empowering minds and transforming lives.
                    </p>
                    <p>
                      At Intell Counselling, I am dedicated to providing compassionate and effective counseling services, helping individuals navigate life's complexities and achieve lasting positive change. I look forward to being a supportive guide on your journey to well-being.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
