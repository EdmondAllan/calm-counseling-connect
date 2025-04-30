
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const servicesData = [
  {
    title: "Parental Guidance and Support",
    description: "Navigate the challenges of parenting with expert guidance tailored to your family's unique needs."
  },
  {
    title: "Stress and Anxiety Management",
    description: "Learn effective techniques to manage stress and anxiety for a balanced and peaceful life."
  },
  {
    title: "Relationship Enrichment",
    description: "Strengthen your relationships through improved communication and deeper understanding."
  },
  {
    title: "Self-Esteem and Confidence",
    description: "Develop a stronger sense of self-worth and confidence to embrace life's opportunities."
  },
  {
    title: "Adolescent Well-being Counselling",
    description: "Support teenagers through the unique challenges of adolescence and personal development."
  },
  {
    title: "Guidance for Life Transitions",
    description: "Navigate major life changes with confidence and clarity through professional support."
  }
];

const Services = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Our Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Intell Counseling extends a compassionate hand to guide you through life's journey, offering a spectrum of transformative services.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <Card key={index} className="transition-all duration-300 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-intell-blue">{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base text-gray-700">{service.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
