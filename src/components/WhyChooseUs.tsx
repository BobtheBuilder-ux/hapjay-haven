
import { Home, Search, Shield, Users, CheckCircle } from "lucide-react";

const features = [
  {
    title: "Unmatched Local Expertise",
    description: "Years of experience in Abuja's dynamic real estate market.",
    icon: Home
  },
  {
    title: "Premium Listings",
    description: "Wide range of premium properties from luxurious homes to commercial spaces.",
    icon: Search
  },
  {
    title: "Client-Centered Approach",
    description: "Your satisfaction is our priority in every transaction.",
    icon: Users
  },
  {
    title: "Transparency and Trust",
    description: "Committed to ethical practices and building lasting relationships.",
    icon: Shield
  },
  {
    title: "Comprehensive Services",
    description: "End-to-end real estate services including property management.",
    icon: CheckCircle
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Hapjay</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We're dedicated to providing exceptional service and making your real estate experience seamless and successful.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-realestate-lightblue p-6 rounded-lg text-center transition-transform hover:-translate-y-2"
            >
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-realestate-navy text-white">
                <feature.icon className="h-8 w-8" />
              </div>
              <h3 className="mb-3 text-xl font-semibold">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
