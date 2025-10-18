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
// COMMENTED OUT: Problematic imports causing Vercel build failure
// import { toast } from "sonner"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
// import Stepper from "@/components/ui/stepper"
import PaymentGateway from "@/components/PaymentGateway.tsx"

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
    sessionFee: "1000", // Changed from "3" to "1000"
    paymentMethod: "credit_card",
    notes: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validation, setValidation] = useState({
    name: false,
    email: false,
    phone: false,
  })
  const [error, setError] = useState<string | null>(null)

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
    // If the counseling type is being changed, set the session fee to 1000 for all types
    if (name === 'counselingType') {
      setBooking(prev => ({ ...prev, counselingType: value, sessionFee: '1000' }));
    } else {
      setBooking(prev => ({ ...prev, [name]: value }));
    }
  }

  const handleDateSelect = (date: Date | undefined) => {
    setBooking(prev => ({ ...prev, date: date }))
  }
  
  const handleNext = () => {
    try {
      setError(null);
      
      // Validate current step before proceeding
      if (currentStep === 1) {
        const isNameValid = validateName(booking.name);
        const isEmailValid = validateEmail(booking.email);
        const isPhoneValid = validatePhone(booking.phone);
        
        if (!isNameValid || !isEmailValid || !isPhoneValid) {
          // toast.error("Please fill in all required fields correctly");
          return;
        }
      }
      if (currentStep === 2) {
        if (!booking.counselingType || !booking.date || !booking.time) {
          // toast.error("Please select type of counseling, date, and time to continue.");
          return;
        }
      }
      
      console.log('Moving to step:', currentStep + 1);
      console.log('Current booking data:', booking);
      
      setCurrentStep(prev => prev + 1)
    } catch (error: any) {
      console.error('Error in handleNext:', error);
      setError(error.message);
    }
  }
  
  const handleBack = () => {
    try {
      setError(null);
      setCurrentStep(prev => prev - 1)
    } catch (error: any) {
      console.error('Error in handleBack:', error);
      setError(error.message);
    }
  }

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
      // toast.success("Session booked successfully!", {
      //   description: `Your booking ID is ${result.bookingId}. A confirmation has been sent to your email.`,
      // });
      setCurrentStep(4); // Or a success step
    } catch (error: any) {
      // toast.error("Booking Failed", {
      //   description: error.message || "Could not save your booking. Please contact support.",
      // });
    } finally {
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
          {error && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800">Error: {error}</p>
            </div>
          )}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Book Your Session</h1>
            <p className="text-gray-600">Take the first step towards better mental health</p>
          </div>

          <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg mb-8">
            {/* <Stepper steps={steps} currentStep={currentStep} /> */}
            
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
                      {/* Custom Counseling Type Dropdown */}
                      <div className="relative">
                        <select
                          value={booking.counselingType}
                          onChange={(e) => handleSelectChange("counselingType", e.target.value)}
                          className={`w-full pl-4 pr-10 py-3 bg-gray-50 border rounded-lg text-base focus:ring-2 focus:outline-none appearance-none transition-all duration-200 ${
                            booking.counselingType 
                              ? 'border-green-500 focus:ring-green-400 focus:border-green-400' 
                              : 'border-gray-200 focus:ring-blue-400 focus:border-blue-400'
                          }`}
                        >
                          <option value="">Type of Counseling *</option>
                          {counselingTypes.map(item => (
                            <option key={item.id} value={item.id}>
                              {item.name}
                            </option>
                          ))}
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                          {booking.counselingType ? (
                            <Check className="w-5 h-5 text-green-500" />
                          ) : (
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                          )}
                        </div>
                      </div>

                      {/* Custom Date Picker */}
                      <div className="relative">
                        <input
                          type="date"
                          value={booking.date ? (typeof booking.date === 'string' ? booking.date : format(booking.date, "yyyy-MM-dd")) : ''}
                          onChange={(e) => {
                            const selectedDate = e.target.value ? new Date(e.target.value) : undefined;
                            handleDateSelect(selectedDate);
                          }}
                          min={format(new Date(), "yyyy-MM-dd")}
                          placeholder="Pick a date *"
                          className={`w-full pl-12 pr-10 py-3 bg-gray-50 border rounded-lg text-base focus:ring-2 focus:outline-none transition-all duration-200 ${
                            booking.date 
                              ? 'border-green-500 focus:ring-green-400 focus:border-green-400' 
                              : 'border-gray-200 focus:ring-blue-400 focus:border-blue-400'
                          }`}
                        />
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <CalendarIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        {booking.date && (
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <Check className="w-5 h-5 text-green-500" />
                          </div>
                        )}
                      </div>
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
                  <div>
                    <h2 className="text-3xl font-bold text-center text-gray-800 mt-8">Payment Details</h2>
                    <p className="text-center text-gray-500 mt-2 mb-8">Confirm your booking details and proceed to payment.</p>
                    <div className="max-w-xl mx-auto mb-8">
                      <div className="bg-white rounded-xl shadow-md border border-gray-200 p-0 overflow-hidden">
                        <div className="h-1 bg-blue-500 w-full" />
                        <div className="p-8">
                          <h3 className="text-2xl font-bold text-center text-gray-900 mb-2">Booking Summary</h3>
                          <p className="text-center text-gray-500 mb-6">Your appointment details</p>
                          {/* Client Info */}
                          <div className="flex flex-col sm:flex-row justify-between items-center mb-4 gap-4">
                            <div className="flex items-center gap-2">
                              <User className="w-5 h-5 text-gray-400" />
                              <span className="text-xs text-gray-500">Client Name</span>
                              <span className="font-semibold text-lg text-gray-900 ml-2">{booking.name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Phone className="w-5 h-5 text-gray-400" />
                              <span className="text-xs text-gray-500">Phone Number</span>
                              <span className="font-semibold text-lg text-gray-900 ml-2">{booking.phone}</span>
                            </div>
                          </div>
                          <hr className="my-4" />
                          {/* Service Details */}
                          <div>
                            <span className="text-xs font-semibold text-blue-700 flex items-center gap-2 mb-1"><span className="w-2 h-2 rounded-full bg-blue-500 inline-block" /> SERVICE DETAILS</span>
                            <div className="bg-blue-50 rounded-lg p-4 mt-2 mb-6">
                              <div className="font-semibold text-lg text-gray-800 mb-1">{counselingTypes.find(c => c.id === booking.counselingType)?.name || booking.counselingType}</div>
                              <span className="inline-block px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-semibold">Counseling Session</span>
                            </div>
                          </div>
                          {/* Session Details */}
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className="flex items-center gap-3">
                              <CalendarIcon className="w-6 h-6 text-green-400" />
                              <div>
                                <div className="text-xs text-gray-500">Date</div>
                                <div className="font-semibold text-gray-800">{booking.date ? (typeof booking.date === 'string' ? booking.date : format(booking.date, 'PPP')) : ''}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Globe className="w-6 h-6 text-purple-400" />
                              <div>
                                <div className="text-xs text-gray-500">Session Mode</div>
                                <div className="font-semibold text-gray-800">{booking.sessionMode === 'in-person' ? 'In-Person' : 'Online'}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Clock className="w-6 h-6 text-orange-400" />
                              <div>
                                <div className="text-xs text-gray-500">Time</div>
                                <div className="font-semibold text-gray-800">{booking.time}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-3">
                              <Star className="w-6 h-6 text-blue-400" />
                              <div>
                                <div className="text-xs text-gray-500">Duration</div>
                                <div className="font-semibold text-gray-800">45 minutes</div>
                              </div>
                            </div>
                          </div>
                          {/* Session Fee */}
                          <div className="bg-green-50 rounded-lg p-4 flex items-center justify-between mt-2 mb-2">
                            <div className="flex items-center gap-2">
                              <CreditCard className="w-6 h-6 text-green-500" />
                              <span className="text-gray-700 font-semibold">Session Fee</span>
                              <span className="text-2xl font-bold text-gray-900 ml-2">₹{booking.sessionFee}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-center text-xs text-gray-500 pb-4">Please arrive 10 minutes early for your appointment</div>
                      </div>
                    </div>
                                         <div className="mt-10 flex gap-4">
                       <GradientButton onClick={handleBack} fullWidth>
                         <ArrowLeft /> Back
                       </GradientButton>
                       <div className="flex-1">
                         {(() => {
                           try {
                             const bookingData = {
                               clientName: booking.name,
                               phoneNumber: booking.phone,
                               serviceName: counselingTypes.find(c => c.id === booking.counselingType)?.name || booking.counselingType,
                               serviceType: "Counseling Session",
                               date: booking.date ? (typeof booking.date === 'string' ? booking.date : format(booking.date, 'yyyy-MM-dd')) : '',
                               time: booking.time,
                               mode: booking.sessionMode === 'in-person' ? 'In-Person' : 'Online',
                               duration: '45 minutes',
                               fee: parseFloat(booking.sessionFee),
                             };
                             
                             console.log('PaymentGateway bookingData:', bookingData);
                             
                             return <PaymentGateway bookingData={bookingData} />;
                           } catch (error: any) {
                             console.error('Error rendering PaymentGateway:', error);
                             return (
                               <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                                 <p className="text-red-800">Error loading payment gateway: {error.message}</p>
                                 <button
                                   onClick={() => window.location.reload()}
                                   className="mt-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                                 >
                                   Reload Page
                                 </button>
                               </div>
                             );
                           }
                         })()}
                       </div>
                     </div>
                    <p className="flex flex-col items-center justify-center mt-6">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-100 via-blue-50 to-purple-100 border border-blue-200 shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z" /></svg>
                        <span className="text-base font-semibold text-blue-800">
                          Please Note: <span className="font-bold text-blue-900">Once a counseling session is booked, it is confirmed and <u>non-refundable</u>.</span>
                        </span>
                      </span>
                      <span className="text-xs text-gray-500 mt-1">We appreciate your understanding and commitment to your well-being!</span>
                    </p>
                  </div>
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
