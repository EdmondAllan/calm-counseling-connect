"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  User,
  Calendar as CalendarIcon,
  CreditCard,
  Mail,
  Phone,
  Clock,
  Users,
  Heart,
  Smile,
  Globe,
  Star,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  BookOpen,
  Home,
  ShieldCheck,
  Video,
  Pen,
  Check,
} from "lucide-react"
import { toast } from "sonner"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import Stepper from "@/components/ui/stepper"

declare global {
  interface Window {
    Razorpay: any;
  }
}

// Add CSS animation for fade-out effect
const fadeOutAnimation = `
  @keyframes fadeOut {
    from {
      opacity: 1;
      transform: scale(1);
    }
    to {
      opacity: 0;
      transform: scale(0.95);
    }
  }
`;

// --- TYPES AND CONSTANTS ---
const counselingTypes = [
  { id: "family_therapy", name: "Family Therapy", icon: Users },
  { id: "stress_management", name: "Stress Management", icon: Smile },
  { id: "relationship_enrichment", name: "Relationship Enrichment", icon: Heart },
  { id: "personal_growth", name: "Personal Growth", icon: Star },
  { id: "indians_abroad", name: "Indians Abroad", icon: Globe },
]

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
];

const steps = [
  { id: 1, label: "Personal Info", icon: User },
  { id: 2, label: "Session Details", icon: CalendarIcon },
  { id: 3, label: "Payment", icon: CreditCard },
]

// --- VALIDATION FUNCTIONS ---
const validateName = (name: string) => {
  return name.trim().length >= 2 && /^[a-zA-Z\s]+$/.test(name.trim());
};

const validateEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const validatePhone = (phone: string) => {
  return /^[0-9]{10}$/.test(phone.replace(/\D/g, ''));
};

// --- HELPER UI COMPONENTS ---
const FeatureCard = ({ icon: Icon, text }: { icon: React.ElementType, text: string }) => (
  <div className="flex items-center gap-4 p-4 bg-white/80 backdrop-blur-sm rounded-full shadow-lg">
    <div className="p-2 bg-blue-100 rounded-full">
      <Icon className="w-6 h-6 text-blue-500" />
    </div>
    <span className="font-semibold text-gray-700">{text}</span>
  </div>
)

const GradientButton = ({ children, onClick, fullWidth = false, disabled = false, type = "button" }: {
  children: React.ReactNode;
  onClick: () => void;
  fullWidth?: boolean;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={`
      relative overflow-hidden px-8 py-3 font-semibold text-white rounded-lg
      bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700
      transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl
      disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
      ${fullWidth ? 'w-full' : ''}
    `}
  >
    <div className="flex items-center justify-center gap-2">
      {children}
    </div>
  </button>
)

const CustomInput = ({ icon: Icon, name, value, onChange, validation, isValid, ...props }: {
  icon: React.ElementType;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  validation: boolean;
  isValid: boolean;
  [x: string]: any;
}) => (
  <div className="relative">
    <Icon className="absolute w-5 h-5 text-gray-400 top-1/2 left-4 -translate-y-1/2" />
    <input
      {...props}
      name={name}
      value={value}
      onChange={onChange}
      className={`
        w-full pl-12 pr-12 py-3 bg-gray-50 border rounded-lg 
        focus:ring-2 focus:outline-none transition-all duration-200
        ${isValid && value 
          ? 'border-green-500 focus:ring-green-400 focus:border-green-400' 
          : 'border-gray-200 focus:ring-blue-400 focus:border-blue-400'
        }
        ${validation && value && !isValid 
          ? 'border-red-500 focus:ring-red-400 focus:border-red-400' 
          : ''
        }
      `}
    />
    {isValid && value && (
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <Check className="w-5 h-5 text-green-500" />
      </motion.div>
    )}
  </div>
)

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1)
  const [booking, setBooking] = useState({
    name: "",
    email: "",
    phone: "",
    counselingType: "",
    date: undefined as Date | undefined,
    time: "",
    sessionMode: "in-person",
    sessionFee: "3",
    paymentMethod: "credit_card",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validation, setValidation] = useState({
    name: false,
    email: false,
    phone: false,
  })
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setBooking(prev => ({ ...prev, [name]: value }))
    
    // Update validation state
    if (name === 'name') {
      setValidation(prev => ({ ...prev, name: validateName(value) }))
    } else if (name === 'email') {
      setValidation(prev => ({ ...prev, email: validateEmail(value) }))
    } else if (name === 'phone') {
      setValidation(prev => ({ ...prev, phone: validatePhone(value) }))
    }
  }

  const handleSelectChange = (name: string, value: string) => {
    setBooking(prev => ({ ...prev, [name]: value }))
  }

  const handleDateSelect = (date: Date | undefined) => {
    handleSelectChange("date", date ? format(date, "yyyy-MM-dd") : "")
    setBooking(prev => ({ ...prev, date: date }))
    // Close the date picker with a slight delay for smooth animation
    setTimeout(() => {
      setIsDatePickerOpen(false)
    }, 150)
  }
  
  const handleNext = () => {
    // Validate current step before proceeding
    if (currentStep === 1) {
      const isNameValid = validateName(booking.name);
      const isEmailValid = validateEmail(booking.email);
      const isPhoneValid = validatePhone(booking.phone);
      
      if (!isNameValid || !isEmailValid || !isPhoneValid) {
        toast.error("Please fill in all required fields correctly");
        return;
      }
    }
    
    setCurrentStep(prev => prev + 1)
  }
  
  const handleBack = () => setCurrentStep(prev => prev - 1)

  const handleFinalSubmit = async (paymentDetails: any) => {
    const bookingData = {
      name: booking.name,
      email: booking.email,
      phone: booking.phone,
      counselingType: counselingTypes.find(c => c.id === booking.counselingType)?.name || booking.counselingType,
      mode: booking.sessionMode,
      date: booking.date ? format(booking.date, "yyyy-MM-dd") : "",
      time: booking.time,
      amount: parseFloat(booking.sessionFee),
      paymentMethod: "Razorpay",
      notes: booking.notes,
      paymentDetails,
    };

    try {
      const response = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      if (!response.ok) throw new Error("Booking failed. Please try again.");

      const result = await response.json();
      toast.success("Session booked successfully!", {
        description: `Your booking ID is ${result.bookingId}. A confirmation has been sent to your email.`,
      });
      setCurrentStep(4); // Or a success step
    } catch (error: any) {
      toast.error("Booking Failed", {
        description: error.message || "Could not save your booking. Please contact support.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) return;
    setIsSubmitting(true);
    toast.info("Processing payment...");

    try {
      // 1. Create Order
      const orderResponse = await fetch('/api/payment/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: parseFloat(booking.sessionFee),
          receipt: `receipt_for_${booking.email}_${Date.now()}`,
        }),
      });
      
      if (!orderResponse.ok) throw new Error('Failed to create payment order.');
      
      const order = await orderResponse.json();

      // 2. Open Razorpay Checkout
      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Key ID
        amount: order.amount,
        currency: order.currency,
        name: 'Intell Counselling',
        description: 'Session Booking',
        order_id: order.id,
        handler: async function (response: any) {
          // 3. Verify Signature
          try {
            const verificationResponse = await fetch('/api/payment/verify-signature', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                order_id: order.id,
                payment_id: response.razorpay_payment_id,
                signature: response.razorpay_signature,
              }),
            });

            const verificationResult = await verificationResponse.json();

            if (verificationResult.status === 'success') {
              toast.success("Payment successful!");
              await handleFinalSubmit({
                orderId: order.id,
                paymentId: response.razorpay_payment_id,
              });
            } else {
              throw new Error('Payment verification failed. Please contact support.');
            }
          } catch (error: any) {
            toast.error("Payment Error", {
              description: error.message || "An error occurred during payment verification.",
            });
            setIsSubmitting(false);
          }
        },
        prefill: {
          name: booking.name,
          email: booking.email,
          contact: booking.phone,
        },
        theme: {
          color: '#4285F4',
        },
        modal: {
          ondismiss: function() {
            toast.warning("Payment cancelled", { description: "You have cancelled the payment process." });
            setIsSubmitting(false);
          }
        }
      };
      
      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (error: any) {
      toast.error("Payment Initialization Failed", {
        description: error.message || "Could not connect to the payment gateway. Please try again.",
      });
      setIsSubmitting(false);
    }
  };

  const variants = {
    hidden: { opacity: 0, x: 200 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -200 },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <style>{fadeOutAnimation}</style>
      <div className="container mx-auto px-4 py-8">
        <main className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Book Your Session</h1>
            <p className="text-gray-600">Take the first step towards better mental health</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
            <Stepper steps={steps} currentStep={currentStep} />
            
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
              <FeatureCard icon={ShieldCheck} text="Secure & Confidential" />
              <FeatureCard icon={Clock} text="Flexible Scheduling" />
              <FeatureCard icon={Video} text="Online & In-Person" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                variants={variants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ duration: 0.3 }}
              >
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-3xl font-bold text-center text-gray-800">Personal Information</h2>
                    <p className="text-center text-gray-500 mt-2 mb-8">Let's get to know you</p>
                    <div className="space-y-6">
                      <CustomInput 
                        icon={User} 
                        name="name" 
                        type="text" 
                        placeholder="Full Name *" 
                        value={booking.name} 
                        onChange={handleChange}
                        validation={validation.name}
                        isValid={validateName(booking.name)}
                      />
                      <CustomInput 
                        icon={Mail} 
                        name="email" 
                        type="email" 
                        placeholder="Email Address *" 
                        value={booking.email} 
                        onChange={handleChange}
                        validation={validation.email}
                        isValid={validateEmail(booking.email)}
                      />
                      <CustomInput 
                        icon={Phone} 
                        name="phone" 
                        type="tel" 
                        placeholder="Phone Number *" 
                        value={booking.phone} 
                        onChange={handleChange}
                        validation={validation.phone}
                        isValid={validatePhone(booking.phone)}
                      />
                    </div>
                    <div className="mt-10">
                      <GradientButton onClick={handleNext} fullWidth>
                        Continue <ArrowRight />
                      </GradientButton>
                    </div>
                  </div>
                )}

                {currentStep === 2 && (
                  <div>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mt-8">Session Details</h2>
                    <p className="text-center text-gray-500 mt-2 mb-8">Let's schedule your counseling session</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <Select onValueChange={value => handleSelectChange("counselingType", value)} value={booking.counselingType}>
                        <SelectTrigger className="w-full pl-4 pr-4 py-3 h-auto bg-gray-50 border-gray-200 rounded-lg text-base">
                          <SelectValue placeholder="Type of Counseling *" />
                        </SelectTrigger>
                        <SelectContent>
                          {counselingTypes.map(item => (
                            <SelectItem key={item.id} value={item.id}>
                              <div className="flex items-center gap-2">
                                <item.icon className="w-4 h-4" /> {item.name}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                        <PopoverTrigger asChild>
                          <button className="w-full h-auto text-left flex items-center gap-2 pl-4 pr-3 py-3 bg-gray-50 border border-gray-200 rounded-lg text-base">
                            <CalendarIcon className="w-4 h-4 mr-2" />
                            {booking.date ? format(booking.date, "PPP") : <span>Pick a date *</span>}
                          </button>
                        </PopoverTrigger>
                        <PopoverContent 
                          className="w-auto p-0" 
                          align="start"
                          style={{
                            animation: `fadeOut ${isDatePickerOpen ? 0 : 0.2}s ease-out forwards`
                          }}
                        >
                          <Calendar
                            mode="single"
                            selected={booking.date}
                            onSelect={handleDateSelect}
                            initialFocus
                            disabled={{ before: new Date() }}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="mt-6">
                      <p className="font-semibold mb-3 text-center">Select a time slot *</p>
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                        {timeSlots.map(time => (
                          <button
                            key={time}
                            onClick={() => handleSelectChange("time", time)}
                            className={`p-2 rounded-lg text-center transition-all duration-200 ${booking.time === time ? 'bg-blue-600 text-white shadow-lg' : 'bg-gray-100 hover:bg-blue-100'}`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6">
                      <CustomInput 
                        icon={Pen} 
                        name="notes"
                        placeholder="Additional Notes (optional)"
                        value={booking.notes}
                        onChange={handleChange}
                        validation={false}
                        isValid={true}
                      />
                    </div>
                    <div className="mt-10 flex gap-4">
                      <GradientButton onClick={handleBack} fullWidth>
                        <ArrowLeft /> Back
                      </GradientButton>
                      <GradientButton onClick={handleNext} fullWidth>
                        Continue <ArrowRight />
                      </GradientButton>
                    </div>
                  </div>
                )}
                
                {currentStep === 3 && (
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mt-8">Payment Details</h2>
                    <p className="text-center text-gray-500 mt-2 mb-8">Confirm your booking details and proceed to payment.</p>
                    <div className="mt-10 flex gap-4">
                      <GradientButton onClick={handleBack} fullWidth>
                        <ArrowLeft /> Back
                      </GradientButton>
                      <GradientButton onClick={() => {}} type="submit" fullWidth disabled={isSubmitting}>
                        {isSubmitting ? "Processing..." : "Confirm & Pay"}
                      </GradientButton>
                    </div>
                  </form>
                )}

                {currentStep === 4 && (
                  <div className="text-center">
                    <motion.div
                      initial={{ scale: 0, rotate: -30 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 260, damping: 20 }}
                      className="w-24 h-24 bg-gradient-to-br from-green-400 to-teal-500 rounded-full mx-auto flex items-center justify-center shadow-lg"
                    >
                      <CheckCircle2 className="w-16 h-16 text-white" />
                    </motion.div>
                    <h2 className="text-3xl font-bold text-gray-800 mt-6">Booking Confirmed!</h2>
                    <div className="mt-4 p-4 bg-green-50/70 border border-green-200 rounded-lg">
                      <p className="text-green-800">
                        ✨ Your counseling session has been successfully booked! We'll send you a confirmation email shortly with session details and meeting information.
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-left mt-8">
                      <div className="p-4 bg-blue-50 rounded-lg">
                        <h3 className="font-bold flex items-center gap-2"><BookOpen className="w-5 h-5 text-blue-500"/> Next Steps</h3>
                        <p className="text-sm text-gray-600 mt-1">Check your email for session details.</p>
                      </div>
                      <div className="p-4 bg-purple-50 rounded-lg">
                        <h3 className="font-bold flex items-center gap-2"><Home className="w-5 h-5 text-purple-500"/> Preparation</h3>
                        <p className="text-sm text-gray-600 mt-1">Find a quiet, comfortable space.</p>
                      </div>
                    </div>
                    
                    
                    <GradientButton onClick={() => setCurrentStep(1)} fullWidth>
                      Book Another Session
                    </GradientButton>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}

export default BookingPage
