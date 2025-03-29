
import { useState } from "react";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "Home Buyer",
    quote: "Hapjay Real Estate made our home buying process incredibly smooth. Their team was professional, responsive, and truly cared about finding us the perfect home for our family.",
    avatarUrl: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    name: "Michael Chen",
    position: "Property Investor",
    quote: "I've worked with many real estate companies over the years, but Hapjay stands out for their market knowledge and personalized approach. They helped me find investment properties that perfectly aligned with my financial goals.",
    avatarUrl: "https://randomuser.me/api/portraits/men/54.jpg",
  },
  {
    name: "Emma Rodriguez",
    position: "First-time Homeowner",
    quote: "As a first-time homebuyer, I was nervous about the process, but the team at Hapjay guided me every step of the way. They found me a beautiful starter home within my budget and made sure everything went smoothly.",
    avatarUrl: "https://randomuser.me/api/portraits/women/33.jpg",
  },
  {
    name: "David Thompson",
    position: "Luxury Home Seller",
    quote: "When it came time to sell our luxury home, Hapjay's marketing strategy was exceptional. They brought in qualified buyers and negotiated a sale price that exceeded our expectations.",
    avatarUrl: "https://randomuser.me/api/portraits/men/41.jpg",
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Clients Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied clients have to say about their experience with Hapjay Real Estate.
          </p>
        </div>
        
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {testimonials.map((testimonial, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4">
                <Card className="h-full border-none shadow-md">
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className="mb-4 text-realestate-gold">
                      {/* Star Rating */}
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className="w-5 h-5 fill-current"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <blockquote className="flex-1 mb-6 italic text-gray-600">
                      "{testimonial.quote}"
                    </blockquote>
                    <div className="flex items-center">
                      <Avatar className="h-12 w-12 border-2 border-realestate-navy">
                        <AvatarImage src={testimonial.avatarUrl} alt={testimonial.name} />
                        <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="ml-4">
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-gray-500">{testimonial.position}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden md:flex" />
          <CarouselNext className="hidden md:flex" />
        </Carousel>
      </div>
    </section>
  );
};

export default Testimonials;
