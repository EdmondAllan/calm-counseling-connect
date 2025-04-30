
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BookingCTA from "@/components/BookingCTA";

const servicesData = [
  {
    id: 1,
    title: "Parental Guidance and Support",
    description: "Navigate the challenges of parenting with expert guidance tailored to your family's unique needs.",
    details: "Our parental guidance services help you develop effective communication strategies, understand developmental stages, manage behavioral issues, and create a nurturing home environment. We provide practical tools and emotional support to help you become more confident and effective in your parenting journey.",
    icon: "👪",
  },
  {
    id: 2,
    title: "Stress and Anxiety Management",
    description: "Learn effective techniques to manage stress and anxiety for a balanced and peaceful life.",
    details: "Our stress management program combines cognitive behavioral techniques, mindfulness practices, relaxation training, and practical lifestyle adjustments to help you identify stressors, change negative thought patterns, and develop healthy coping mechanisms for long-term resilience.",
    icon: "🧘",
  },
  {
    id: 3,
    title: "Relationship Enrichment and Family Harmony",
    description: "Strengthen your relationships through improved communication and deeper understanding.",
    details: "Our relationship counseling helps couples and family members improve communication, resolve conflicts, rebuild trust, and deepen emotional connections. We create a safe space to address underlying issues and develop new patterns of interaction that foster harmony and mutual respect.",
    icon: "❤️",
  },
  {
    id: 4,
    title: "Self-Esteem and Confidence Building",
    description: "Develop a stronger sense of self-worth and confidence to embrace life's opportunities.",
    details: "Our confidence building program helps you identify and challenge negative self-perceptions, recognize your strengths, set meaningful goals, practice self-compassion, and develop the resilience to face challenges with a positive mindset.",
    icon: "🌟",
  },
  {
    id: 5,
    title: "Adolescent Well-being Counselling",
    description: "Support teenagers through the unique challenges of adolescence and personal development.",
    details: "Our adolescent counseling provides a confidential space for teenagers to express themselves, develop emotional regulation skills, navigate peer relationships, build identity and self-esteem, and address specific challenges such as academic pressure, social media, and family dynamics.",
    icon: "👦👧",
  },
  {
    id: 6,
    title: "Guidance for Life Transitions",
    description: "Navigate major life changes with confidence and clarity through professional support.",
    details: "Our life transition counseling helps you adapt to significant changes such as career shifts, relocation, relationship changes, becoming a parent, or retirement. We provide emotional support and practical strategies to help you embrace new beginnings with confidence and resilience.",
    icon: "🔄",
  },
  {
    id: 7,
    title: "Personal Growth and Reflection",
    description: "Discover your potential and achieve personal growth through guided self-reflection.",
    details: "Our personal development counseling helps you clarify your values and goals, overcome limiting beliefs, develop self-awareness, and create meaningful change in your life. We provide tools for continuous growth and self-improvement aligned with your authentic self.",
    icon: "🌱",
  },
  {
    id: 8,
    title: "Counselling for Indians Living Abroad",
    description: "Specialized support for cultural adjustment and identity challenges faced by expatriates.",
    details: "Our cross-cultural counseling addresses the unique challenges faced by Indians living abroad, including cultural adjustment, identity issues, parenting across cultures, managing family expectations, and building community in a new environment while maintaining cultural connections.",
    icon: "🌍",
  },
];

const Services = () => {
  return (
    <div>
      {/* Services Hero */}
      <section className="bg-intell-lightblue py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Our Counselling Services</h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Intell Counseling extends a compassionate hand to guide you through life's journey, offering a spectrum of transformative services.
          </p>
        </div>
      </section>
      
      {/* Services List */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {servicesData.map((service) => (
              <Card key={service.id} className="h-full transition-all duration-300 hover:shadow-lg">
                <CardHeader>
                  <div className="text-4xl mb-4">{service.icon}</div>
                  <CardTitle className="text-xl text-intell-blue">{service.title}</CardTitle>
                  <CardDescription className="text-base text-gray-700">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{service.details}</p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-intell-blue hover:bg-blue-700">
                    <Link to="/booking">Book Session</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <BookingCTA />
    </div>
  );
};

export default Services;
