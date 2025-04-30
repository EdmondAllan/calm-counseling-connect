
import { Card, CardContent } from "@/components/ui/card";

const FounderProfile = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-intell-purple mb-2">Founder's Profile</h2>
          <div className="w-24 h-1 bg-intell-blue mx-auto"></div>
        </div>
        
        <Card className="max-w-5xl mx-auto bg-white shadow-md">
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/3">
                <div className="rounded-lg overflow-hidden mb-4">
                  <img 
                    src="https://via.placeholder.com/300x400?text=Dr.+P.+Priyanka"
                    alt="Dr. P. Priyanka" 
                    className="w-full h-auto object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold text-intell-blue">Dr. P. Priyanka</h3>
                  <p className="text-gray-600">Founder, Intell Counselling</p>
                </div>
              </div>
              
              <div className="md:w-2/3 space-y-4 text-gray-700">
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
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default FounderProfile;
