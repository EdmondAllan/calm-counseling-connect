
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

type CounselingType = 
  | "parental_guidance"
  | "stress_management"
  | "relationship_enrichment"
  | "self_esteem"
  | "adolescent_wellbeing"
  | "life_transitions"
  | "personal_growth"
  | "indians_abroad";

type BookingMode = "online" | "offline";

interface BookingState {
  counselingType: CounselingType | "";
  mode: BookingMode | "";
  date: Date | undefined;
  time: string;
  name: string;
  email: string;
  phone: string;
}

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", 
  "12:00 PM", "01:00 PM", "02:00 PM", 
  "03:00 PM", "04:00 PM", "05:00 PM"
];

const counselingTypes = [
  { id: "parental_guidance", name: "Parental Guidance and Support" },
  { id: "stress_management", name: "Stress and Anxiety Management" },
  { id: "relationship_enrichment", name: "Relationship Enrichment" },
  { id: "self_esteem", name: "Self-Esteem and Confidence" },
  { id: "adolescent_wellbeing", name: "Adolescent Well-being Counselling" },
  { id: "life_transitions", name: "Guidance for Life Transitions" },
  { id: "personal_growth", name: "Personal Growth and Reflection" },
  { id: "indians_abroad", name: "Counselling for Indians Living Abroad" }
];

const BookingPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [booking, setBooking] = useState<BookingState>({
    counselingType: "",
    mode: "",
    date: undefined,
    time: "",
    name: "",
    email: "",
    phone: "",
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateBooking = (field: keyof BookingState, value: any) => {
    setBooking((prev) => ({ ...prev, [field]: value }));
  };

  const handleNextStep = () => {
    if (currentStep === 1) {
      if (!booking.counselingType || !booking.mode) {
        toast.error("Please select both counseling type and mode");
        return;
      }
    } else if (currentStep === 2) {
      if (!booking.date || !booking.time) {
        toast.error("Please select both date and time");
        return;
      }
    }
    
    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!booking.name || !booking.email || !booking.phone) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate booking submission
    setTimeout(() => {
      toast.success("Booking successful! We'll send you a confirmation soon.");
      setIsSubmitting(false);
      setBooking({
        counselingType: "",
        mode: "",
        date: undefined,
        time: "",
        name: "",
        email: "",
        phone: "",
      });
      setCurrentStep(1);
    }, 1500);
  };

  const getSelectedCounselingTypeName = () => {
    const selectedType = counselingTypes.find(type => type.id === booking.counselingType);
    return selectedType ? selectedType.name : "";
  };

  return (
    <div>
      {/* Booking Hero */}
      <section className="bg-intell-lightblue py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Book Your Session</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Take the first step towards positive change by scheduling a session with our experienced counselor.
          </p>
        </div>
      </section>
      
      {/* Booking Form */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <Card className="max-w-3xl mx-auto">
            <CardHeader>
              <CardTitle className="text-2xl text-intell-blue text-center">Schedule Your Counseling Session</CardTitle>
              <CardDescription className="text-center">
                Complete the form below to book your appointment with Dr. P. Priyanka.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <div className="flex justify-between items-center">
                  <div className={`flex-1 text-center ${currentStep >= 1 ? "text-intell-blue" : "text-gray-400"}`}>
                    <div className={`rounded-full h-8 w-8 flex items-center justify-center mx-auto mb-2 ${currentStep >= 1 ? "bg-intell-blue text-white" : "bg-gray-200"}`}>1</div>
                    <p className="text-sm">Service</p>
                  </div>
                  <div className={`h-1 flex-1 ${currentStep >= 2 ? "bg-intell-blue" : "bg-gray-200"}`}></div>
                  <div className={`flex-1 text-center ${currentStep >= 2 ? "text-intell-blue" : "text-gray-400"}`}>
                    <div className={`rounded-full h-8 w-8 flex items-center justify-center mx-auto mb-2 ${currentStep >= 2 ? "bg-intell-blue text-white" : "bg-gray-200"}`}>2</div>
                    <p className="text-sm">Schedule</p>
                  </div>
                  <div className={`h-1 flex-1 ${currentStep >= 3 ? "bg-intell-blue" : "bg-gray-200"}`}></div>
                  <div className={`flex-1 text-center ${currentStep >= 3 ? "text-intell-blue" : "text-gray-400"}`}>
                    <div className={`rounded-full h-8 w-8 flex items-center justify-center mx-auto mb-2 ${currentStep >= 3 ? "bg-intell-blue text-white" : "bg-gray-200"}`}>3</div>
                    <p className="text-sm">Details</p>
                  </div>
                </div>
              </div>
              
              {/* Step 1: Select Service */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Label>Select Counseling Type</Label>
                    <Select 
                      value={booking.counselingType} 
                      onValueChange={(value) => updateBooking("counselingType", value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {counselingTypes.map((type) => (
                          <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-4">
                    <Label>Select Mode</Label>
                    <RadioGroup 
                      value={booking.mode} 
                      onValueChange={(value) => updateBooking("mode", value as BookingMode)}
                      className="flex space-x-4"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="online" id="online" />
                        <Label htmlFor="online">Online Session</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="offline" id="offline" />
                        <Label htmlFor="offline">In-Person Session</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
              )}
              
              {/* Step 2: Select Date and Time */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <Label>Select Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !booking.date && "text-muted-foreground"
                            )}
                          >
                            {booking.date ? format(booking.date, "PPP") : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={booking.date}
                            onSelect={(date) => updateBooking("date", date)}
                            disabled={(date) => {
                              const today = new Date();
                              today.setHours(0, 0, 0, 0);
                              
                              // Disable dates in the past and more than 30 days in the future
                              const thirtyDaysFromNow = new Date();
                              thirtyDaysFromNow.setDate(today.getDate() + 30);
                              
                              return date < today || date > thirtyDaysFromNow || date.getDay() === 0; // Disable Sundays
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    
                    <div className="space-y-4">
                      <Label>Select Time</Label>
                      <Select 
                        value={booking.time} 
                        onValueChange={(value) => updateBooking("time", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>{slot}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  {booking.date && booking.time && (
                    <div className="bg-intell-lightpurple p-4 rounded-md">
                      <p className="font-medium text-intell-purple">Session Summary:</p>
                      <p className="text-gray-700">
                        {getSelectedCounselingTypeName()} ({booking.mode === "online" ? "Online" : "In-Person"}) on {booking.date && format(booking.date, "EEEE, MMMM d, yyyy")} at {booking.time}
                      </p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Step 3: Personal Details */}
              {currentStep === 3 && (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <Label htmlFor="name">Full Name</Label>
                    <Input 
                      id="name" 
                      value={booking.name} 
                      onChange={(e) => updateBooking("name", e.target.value)} 
                      placeholder="Enter your full name"
                      required
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      value={booking.email} 
                      onChange={(e) => updateBooking("email", e.target.value)} 
                      placeholder="Enter your email address"
                      required
                    />
                  </div>
                  
                  <div className="space-y-4">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input 
                      id="phone" 
                      value={booking.phone} 
                      onChange={(e) => updateBooking("phone", e.target.value)} 
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>
                  
                  <div className="bg-intell-lightpurple p-4 rounded-md">
                    <p className="font-medium text-intell-purple">Booking Summary:</p>
                    <p className="text-gray-700 mb-2">
                      {getSelectedCounselingTypeName()} ({booking.mode === "online" ? "Online" : "In-Person"})
                    </p>
                    <p className="text-gray-700">
                      {booking.date && format(booking.date, "EEEE, MMMM d, yyyy")} at {booking.time}
                    </p>
                  </div>
                </form>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              {currentStep > 1 ? (
                <Button 
                  variant="outline" 
                  onClick={handlePreviousStep}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 3 ? (
                <Button 
                  onClick={handleNextStep}
                  className="bg-intell-blue hover:bg-blue-700"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  type="submit" 
                  onClick={handleSubmit}
                  className="bg-intell-blue hover:bg-blue-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Processing..." : "Confirm Booking"}
                </Button>
              )}
            </CardFooter>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default BookingPage;
