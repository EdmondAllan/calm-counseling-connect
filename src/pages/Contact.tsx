import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15, duration: 0.8 },
  },
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const apiUrl = import.meta.env.DEV
      ? '/api/mail/contact' // Using proxy in dev
      : '/api/mail/contact'; // Same for production

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success("Message sent successfully! We'll get back to you soon.");
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        const errorData = await response.json();
        const errorMessage = errorData.message || "Failed to send message. Please try again later.";
        toast.error(errorMessage);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FDFDFD] font-sans">
      <motion.section 
        id="contact-page"
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
            Contact Us Now
          </motion.h2>
          <motion.p 
            className="max-w-3xl mx-auto text-lg md:text-xl text-[#343A40] font-light"
            variants={itemVariants}
          >
            Have questions or ready to start your journey? Reach out to us today.
          </motion.p>
        </div>
      </motion.section>

      <motion.div 
        className="container mx-auto px-4 pb-24"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={containerVariants}
      >
        <div className="contact-cards-container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          
          {/* Contact Form Card */}
          <motion.div 
            className="contact-form-card bg-white p-8 sm:p-10 rounded-2xl shadow-lg transition-all duration-400 ease-out hover:shadow-2xl hover:-translate-y-2"
            variants={itemVariants}
          >
            <h3 className="text-2xl font-bold text-[#4285F4] mb-2">Send us a message</h3>
            <p className="text-[#343A40] font-light mb-8">Fill out the form below and we'll get back to you as soon as possible.</p>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#343A40] mb-2">Full Name</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 outline-none" placeholder="Enter your name" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#343A40] mb-2">Email Address</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 outline-none" placeholder="Enter your email" />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#343A40] mb-2">Phone Number</label>
                <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 outline-none" placeholder="Enter your phone number" />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#343A40] mb-2">Message</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-300 focus:border-blue-500 transition-all duration-300 outline-none resize-none" placeholder="How can we help you?"></textarea>
              </div>
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full px-6 py-4 font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl hover:from-blue-600 hover:to-purple-700 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-in-out disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </motion.div>

          {/* Info & Hours Card */}
          <motion.div 
            className="info-hours-card space-y-8"
            variants={itemVariants}
          >
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg transition-all duration-400 ease-out hover:shadow-2xl hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-[#4285F4] mb-6">Contact Information</h3>
              <ul className="space-y-5 text-[#343A40]">
                <li className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <div>
                    <span className="font-bold">Phone</span>
                    <p className="font-light">+91 9486991505</p>
                  </div>
                </li>
                <li className="flex items-center gap-4">
                  <Mail className="w-6 h-6 text-blue-500 flex-shrink-0" />
                  <div>
                    <span className="font-bold">Email</span>
                    <p className="font-light">info@intellcounselling.com</p>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <MapPin className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                  <div>
                    <span className="font-bold">Address</span>
                    <p className="font-light">
                      Intell Counselling<br />
                      Chennai, Tamil Nadu<br />
                      India
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 sm:p-10 rounded-2xl shadow-lg transition-all duration-400 ease-out hover:shadow-2xl hover:-translate-y-2">
              <h3 className="text-2xl font-bold text-[#4285F4] mb-6">Availability</h3>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-blue-50/40 rounded-lg">
                  <Clock className="w-7 h-7 text-blue-500 mt-1" />
                  <div>
                    <div className="font-bold text-lg text-[#343A40]">Online Sessions</div>
                    <div className="text-sm text-gray-600 mt-1">Monday – Friday</div>
                    <div className="text-sm text-gray-600">10:00 AM – 4:00 PM</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-green-50/40 rounded-lg">
                  <MapPin className="w-7 h-7 text-green-500 mt-1" />
                  <div>
                    <div className="font-bold text-lg text-[#343A40]">In-Person Sessions</div>
                    <div className="text-sm text-gray-600 mt-1">Monday – Saturday</div>
                    <div className="text-sm text-gray-600">5:00 PM – 8:00 PM</div>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
                  <Clock className="w-7 h-7 text-gray-400 mt-1" />
                  <div>
                    <div className="font-bold text-lg text-[#343A40]">Sunday</div>
                    <div className="text-sm text-red-500 font-semibold mt-1">Closed</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
};

export default Contact;
