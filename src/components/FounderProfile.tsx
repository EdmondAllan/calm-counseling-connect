
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
                  Priyanka R., Founder of Intell Counselling, is a Counseling Psychologist with 5+ years of experience in emotional and behavioral wellness. She currently serves as Senior Student Counselor at Rajalakshmi Engineering College, where she supports students and faculty through academic, emotional, and life challenges.
                </p>
                <p className="italic text-intell-blue">
                  “She has guided individuals from pre-teens finding their identity to adults healing from emotional trauma.”
                </p>
                <p>
                  Her counseling spans academic stress, anxiety, depression, suicidal thoughts, addiction, healthcare-related trauma, and relationship conflicts across all age groups.
                </p>
                <p className="italic text-intell-blue">
                  “What sets her apart is her ability to turn insight into action — and emotion into clarity.”
                </p>
                <p>
                  She has led numerous workshops on emotional intelligence, digital discipline, stress management, and more — making mental health approachable and actionable.
                </p>
                <p className="italic text-intell-blue">
                  “Her mission is simple — to help people feel lighter, think clearer, and live fuller.”
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
