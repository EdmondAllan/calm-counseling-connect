
import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  return (
    <div>
      {/* About Hero */}
      <section className="bg-intell-lightblue py-16 px-4">
        <div className="container mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-4">About Intell Counselling</h1>
          <p className="text-xl text-center text-gray-700 max-w-3xl mx-auto">
            Learn about our mission, values, and the passionate team dedicated to your mental well-being.
          </p>
        </div>
      </section>
      
      {/* Mission and Values */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-intell-blue mb-6">Our Mission</h2>
              <p className="text-gray-700 mb-4">
                At Intell Counselling, our mission is to provide accessible, compassionate, and effective mental health services that empower individuals to overcome challenges and achieve emotional well-being.
              </p>
              <p className="text-gray-700 mb-4">
                We believe in creating a safe, non-judgmental space where every person feels valued, understood, and supported on their journey toward personal growth and healing.
              </p>
            </div>
            <div>
              <Card className="bg-intell-lightpurple border-none h-full">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-semibold text-intell-purple mb-4">Our Values</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <span className="bg-intell-purple text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">✓</span>
                      <span className="text-gray-700"><strong>Compassion:</strong> Approaching each individual with genuine care and understanding.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-intell-purple text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">✓</span>
                      <span className="text-gray-700"><strong>Integrity:</strong> Upholding the highest ethical standards in all our practices.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-intell-purple text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">✓</span>
                      <span className="text-gray-700"><strong>Inclusivity:</strong> Creating a welcoming environment for people of all backgrounds.</span>
                    </li>
                    <li className="flex items-start">
                      <span className="bg-intell-purple text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 flex-shrink-0 mt-1">✓</span>
                      <span className="text-gray-700"><strong>Excellence:</strong> Continuously improving our services through education and feedback.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      {/* Founder Profile */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Meet Our Founder</h2>
          <Card className="max-w-5xl mx-auto">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3">
                  <img 
                    src="https://via.placeholder.com/300x400?text=Dr.+P.+Priyanka" 
                    alt="Dr. P. Priyanka" 
                    className="rounded-lg w-full h-auto"
                  />
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-2xl font-semibold text-intell-blue mb-4">Dr. P. Priyanka</h3>
                  <p className="text-gray-700 mb-4">
                    Hello, I'm P. Priyanka, the heart behind Intell Counselling. As a dedicated and seasoned counsellor, I bring a wealth of experience and a genuine passion for guiding individuals through life's challenges, fostering mental and emotional well-being.
                  </p>
                  <p className="text-gray-700 mb-4">
                    With a strong educational foundation, I earned my BSc in Psychology from Women's Christian College, followed by an MSc in Psychology from Madras University. Additionally, I hold a Diploma in Counseling Services and certifications in career guidance and memory enhancement. My commitment to continuous learning ensures that I stay at the forefront of counseling practices.
                  </p>
                  <p className="text-gray-700 mb-4">
                    Over the years, I have made a meaningful impact, having worked in more than five schools as a school counsellor. Currently, I am proud to serve as a student counsellor at Rajalakshmi Engineering College. My journey has been focused on empowering minds and transforming lives.
                  </p>
                  <p className="text-gray-700">
                    At Intell Counselling, I am dedicated to providing compassionate and effective counseling services, helping individuals navigate life's complexities and achieve lasting positive change. I look forward to being a supportive guide on your journey to well-being.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default About;
