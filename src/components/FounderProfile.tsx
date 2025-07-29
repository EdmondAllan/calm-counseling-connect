
import { Card, CardContent } from "@/components/ui/card";

const FounderProfile = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">
            Meet Your <span className="text-[#25D366]">Counseling Expert</span>
          </h2>
          <div className="w-24 h-1 bg-[#25D366] mx-auto"></div>
        </div>
        <Card className="max-w-5xl mx-auto bg-white shadow-xl rounded-3xl overflow-visible">
          <CardContent className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center gap-12">
              {/* Left Section: Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">Priyanka R</h3>
                <p className="text-lg text-gray-600 mb-2 font-medium">Founder, IntellCounselling</p>
                <div className="flex items-center gap-2 text-[#25D366] font-medium mb-4">
                  <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#25D366" opacity="0.15"/><path d="M8 13l2.5 2.5L16 10" stroke="#25D366" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Licensed Clinical Psychologist · 6+ Years Experience 
                </div>
                <p className="text-gray-700 mb-6">
                  Transforming lives through compassionate counseling and evidence-based therapeutic approaches. Specializing in anxiety, depression, relationship issues, and personal growth.
                </p>
                <div className="bg-[#F6FFF9] border border-[#25D366]/20 rounded-xl p-5 mb-6 shadow-sm">
                  <span className="block text-gray-700 italic text-lg font-medium">
                    "My mission is to create a safe space where healing begins and personal transformation flourishes."
                  </span>
                </div>
                <div className="flex flex-wrap gap-8 mb-6">
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-extrabold text-[#25D366]">500+</div>
                    <div className="text-gray-500 text-sm font-medium mt-1">Clients Helped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-extrabold text-[#25D366]">6+</div>
                    <div className="text-gray-500 text-sm font-medium mt-1">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl md:text-3xl font-extrabold text-[#25D366]">95%</div>
                    <div className="text-gray-500 text-sm font-medium mt-1">Success Rate</div>
                  </div>
                </div>
                <div className="flex flex-col gap-2 text-gray-700 text-base">
                </div>
              </div>
              {/* Right Section: Image */}
              <div className="flex-1 flex justify-center items-center min-w-[320px]">
                <div className="relative">
                  <div className="w-80 h-80 md:w-96 md:h-96 rounded-full bg-[#DFFBEA] flex items-center justify-center shadow-lg overflow-hidden">
                    <img
                      src="/foundersprofile.png"
                      alt="Dr. Priyanka Sharma"
                      className="w-full h-full object-contain rounded-full border-4 border-white shadow-xl p-4"
                      style={{objectPosition: 'center top'}}
                    />
                  </div>
                  <div className="absolute bottom-4 right-4 bg-white rounded-xl shadow px-4 py-2 flex items-center gap-2 border border-[#25D366]/30">
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="#25D366"/></svg>
                    <span className="text-sm font-medium text-gray-700">Trusted by 500+ Clients</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FounderProfile;
