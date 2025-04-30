
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <div className="relative bg-intell-lightblue overflow-hidden">
      <div className="container mx-auto px-4 py-12 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Customized Schedule Available
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-intell-blue mb-6">
              Intell Counselling offers holistic mental health assistance
            </h2>
            <p className="text-lg text-gray-700 mb-8">
              Extend a compassionate hand to guide you through life's journey, offering a spectrum of transformative services.
            </p>
            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
              <Button asChild size="lg" className="bg-intell-blue hover:bg-blue-700">
                <Link to="/booking">Book a Session</Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link to="/services">Our Services</Link>
              </Button>
            </div>
          </div>
          <div className="hidden md:block relative">
            <img
              src="/lovable-uploads/b0fc1745-ff26-4b7e-b438-b03ae7d46bd7.png"
              alt="Counselling session"
              className="rounded-lg shadow-xl object-cover w-full h-auto"
              onError={(e) => {
                e.currentTarget.src = "https://via.placeholder.com/600x400?text=Counselling+Session";
              }}
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </div>
  );
};

export default Hero;
