import { Card, CardContent } from "@/components/ui/card";

const testimonial1 = {
  quote: "The counseling sessions have transformed my approach to parenting. I now have a much better relationship with my teenager.",
  author: "Priya S., Parent",
};
const testimonial2 = {
  quote: "Dr. Priyanka's guidance helped me navigate a difficult career transition with confidence and clarity.",
  author: "Rahul M., IT Professional",
};
const testimonial3 = {
  quote: "The stress management techniques I learned have been life-changing. I feel more in control and balanced.",
  author: "Anita K., Teacher",
};

const testimonials = [testimonial1, testimonial2, testimonial3];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-3">What Our Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Hear from individuals who have experienced positive transformations through our counseling services.
          </p>
        </div>

        <div className="relative flex overflow-x-hidden group">
          <div className="py-12 animate-marquee group-hover:paused flex">
            {[...testimonials, ...testimonials].map((testimonial, index) => (
              <div key={index} className="mx-4" style={{ minWidth: '320px' }}>
                <Card className="h-full">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="flex-grow">
                      <svg className="h-8 w-8 text-intell-purple mb-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                      </svg>
                      <p className="text-gray-700 mb-4 italic">{testimonial.quote}</p>
                    </div>
                    <p className="text-right font-medium text-intell-blue">{testimonial.author}</p>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
