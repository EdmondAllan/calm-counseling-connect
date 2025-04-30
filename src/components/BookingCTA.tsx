
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const BookingCTA = () => {
  return (
    <section className="py-16 bg-intell-blue text-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Begin Your Journey to Well-being?</h2>
        <p className="text-xl max-w-2xl mx-auto mb-8">
          Schedule a session with our experienced counselor and take the first step towards a healthier, happier you.
        </p>
        <Button asChild size="lg" className="bg-white text-intell-blue hover:bg-gray-100 px-8">
          <Link to="/booking">Book Your Session Now</Link>
        </Button>
      </div>
    </section>
  );
};

export default BookingCTA;
