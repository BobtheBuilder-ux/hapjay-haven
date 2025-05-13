
import { PlaneIcon, AlarmClock, Target, LayoutGrid, Compass, PenTool, Building, Home, Palmtree } from "lucide-react";

const services = [
  {
    id: "01",
    title: "Meticulous Planning",
    points: [
      "Focus on high profile and medium profile Luxury Property",
      "Introduction of urbanized living and Real Estate development",
      "Creation of master planned urban communities",
      "Resolution of core issues in demand and supply"
    ],
    icon: PlaneIcon
  },
  {
    id: "02",
    title: "Completion On Time",
    points: [
      "Driven to keep promises",
      "Adapt new modernized innovative housing/construction strategies",
      "Increase land bank and expand client base",
      "Meet and exceed client expectations"
    ],
    icon: AlarmClock
  },
  {
    id: "03",
    title: "Perfect Execution",
    points: [
      "Solutions for Luxury and affordable housing",
      "Network of professionals for property identification",
      "Property development, management, renting, and leasing"
    ],
    icon: Target
  }
];

const specializations = [
  {
    title: "Architecture",
    icon: Building
  },
  {
    title: "Exterior Design",
    icon: Home
  },
  {
    title: "Landscape Design",
    icon: Palmtree
  },
  {
    title: "Site Planning",
    icon: LayoutGrid
  },
  {
    title: "Furniture Design",
    icon: Compass
  },
  {
    title: "Interior Design",
    icon: PenTool
  }
];

const Services = () => {
  return (
    <div className="bg-realestate-silver">
      {/* Services Hero */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1613553507747-5f8d62ad5904?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')",
            filter: "brightness(0.8)"
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-realestate-navy/80 to-realestate-navy/40" />
        
        {/* Content */}
        <div className="container-custom relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            Comprehensive real estate solutions tailored to meet your unique needs and exceed your expectations.
          </p>
        </div>
      </section>
      
      {/* Services List */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">What We Offer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              At Hapjay Real Estate, we provide comprehensive services to meet all your real estate needs. Our experienced team ensures exceptional results at every step.
            </p>
          </div>
          
          <div className="space-y-12">
            {services.map((service, index) => (
              <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                <div className={`md:col-span-4 ${index % 2 === 1 ? 'md:order-2' : ''}`}>
                  <div className="bg-realestate-silver p-8 rounded-lg h-full flex flex-col justify-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-realestate-navy text-white">
                      <service.icon className="h-10 w-10" />
                    </div>
                    <h3 className="text-2xl font-semibold mb-2 text-center">{service.id}. {service.title}</h3>
                  </div>
                </div>
                
                <div className={`md:col-span-8 ${index % 2 === 1 ? 'md:order-1' : ''}`}>
                  <ul className="space-y-4">
                    {service.points.map((point, pointIndex) => (
                      <li key={pointIndex} className="flex items-start">
                        <div className="bg-realestate-navy text-white rounded-full h-6 w-6 flex items-center justify-center mr-3 mt-0.5">
                          <span className="text-xs">{pointIndex + 1}</span>
                        </div>
                        <p className="text-gray-700">{point}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Specialization */}
      <section className="py-16 bg-realestate-silver">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Specialization</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We offer expertise in multiple areas of real estate development and design, ensuring comprehensive solutions for all your needs.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {specializations.map((spec, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md text-center hover:bg-realestate-navy hover:text-white transition-colors group">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-realestate-silver text-realestate-navy group-hover:bg-white">
                  <spec.icon className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-semibold">{spec.title}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-realestate-navy text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Contact us today to learn more about our services and how we can help you achieve your real estate goals.
          </p>
          <a href="/contact" className="inline-block bg-white text-realestate-navy px-8 py-3 rounded-lg font-medium hover:bg-realestate-gold hover:text-white transition-colors">
            Contact Us
          </a>
        </div>
      </section>
    </div>
  );
};

export default Services;
