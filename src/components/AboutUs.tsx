import { Building, Award, Users, Shield, Clock, CheckCircle, Target } from "lucide-react";

const AboutUs = () => {
  return (
    <div className="bg-realestate-silver">
      {/* About Us Hero */}
      <section className="relative h-[50vh] min-h-[400px] w-full overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80')",
            filter: "brightness(0.8)"
          }}
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-realestate-navy/80 to-realestate-navy/40" />
        
        {/* Content */}
        <div className="container-custom relative z-10 flex h-full flex-col items-center justify-center text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
            About Hapjay Real Estate
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
            A unique Real Estate and Property Consulting Company offering quality services and advisory to clients focused on achieving high returns on their investments.
          </p>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Company Overview</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  We are a unique Real Estate and Property Consulting Company offering quality real estate services and advisory services to clients focused on investing and achieving high returns on their investments. We are also involved in the development of residential, commercial, and recreational projects.
                </p>
                <p className="text-gray-600">
                  At Hapjay Realty Solutions, we don't just find properties—we create opportunities. Step into a world where your real estate dreams come to life, guided by experts who truly care. Let's make your property journey seamless and exciting!
                </p>
                <p className="text-gray-600">
                  We believe every property has a story—and yours is waiting to be written. Explore our exclusive listings and experience a new standard in real estate. Let's build your future together!
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2273&q=80"
                alt="Hapjay Real Estate Team"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute -bottom-6 -right-6 bg-realestate-navy text-white p-4 rounded-lg shadow-lg md:max-w-[200px]">
                <p className="font-semibold">Where We Build</p>
                <p className="text-sm">Your Visions</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-realestate-silver">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission & Vision</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We are guided by clear principles that shape everything we do at Hapjay Real Estate.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-realestate-navy text-white">
                <Target className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Our Mission</h3>
              <p className="text-gray-600">
                Our Mission is to maximize our clients' real estate investment values and minimize risk by providing verified properties at convenient costs and superior advisory services. We will always pursue our business with a steadfast focus on high ethical standards and build continued relationships with our clients based on respect, confidentiality, and property security.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-realestate-navy text-white">
                <Award className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-center">Our Vision</h3>
              <p className="text-gray-600">
                Our Vision is to be the key trusted Real Estate Service Provider with solutions to housing problems for all income categories and to build a conducive living environment centered on aesthetic excellence with sustainable development principles.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CEO's Message */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">CEO's Message</h2>
          </div>
          
          <div className="max-w-3xl mx-auto bg-realestate-silver p-8 rounded-lg relative">
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2">
              <div className="h-20 w-20 rounded-full bg-white p-1">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Happy Leonard - CEO"
                  className="h-full w-full object-cover rounded-full"
                />
              </div>
            </div>
            
            <div className="pt-12">
              <p className="italic text-gray-600 mb-6">
                "Dear Valued Clients,
              </p>
              <p className="text-gray-600 mb-4">
                It is with great pleasure and a deep sense of purpose that I welcome you to Hapjay Realty Solutions. As the CEO, I, Happy Leonard, am truly honored to lead a team that is committed to redefining real estate excellence in Abuja and beyond.
              </p>
              <p className="text-gray-600 mb-4">
                Real estate is more than just buying and selling—it's about creating value and forging relationships built on trust, transparency, and reliability. Our team of dedicated professionals brings unparalleled expertise and a client-first approach to every interaction.
              </p>
              <p className="text-gray-600 mb-6">
                Thank you for choosing Hapjay Realty Solutions as your trusted partner. Your dreams are our inspiration, and we are here to help you bring them to life.
              </p>
              <p className="font-semibold text-right">
                Warm regards,<br />
                Happy Leonard<br />
                CEO, Hapjay Realty Solutions
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Meet Our Team */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our team of experienced professionals is dedicated to helping you achieve your real estate goals.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Team Member 1 */}
            <div className="bg-realestate-silver p-6 rounded-lg shadow-md">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src="https://randomuser.me/api/portraits/men/42.jpg"
                  alt="Michael Hapjay"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Happy Leonard</h3>
              <p className="text-realestate-navy font-medium mb-3">Founder & CEO</p>
              <p className="text-gray-600 mb-4">
                With over 20 years of experience in real estate, Happy Leonard founded Hapjay Real Estate to transform the client experience.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-500 hover:text-realestate-navy">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-realestate-navy">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="bg-realestate-silver p-6 rounded-lg shadow-md">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Jessica Parker"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Jessica Parker</h3>
              <p className="text-realestate-navy font-medium mb-3">Luxury Property Specialist</p>
              <p className="text-gray-600 mb-4">
                Jessica specializes in high-end properties and has been recognized as a top-performing agent for five consecutive years.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-500 hover:text-realestate-navy">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-realestate-navy">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="bg-realestate-silver p-6 rounded-lg shadow-md">
              <div className="mb-4 overflow-hidden rounded-lg">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Robert Johnson"
                  className="w-full aspect-square object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1">Robert Johnson</h3>
              <p className="text-realestate-navy font-medium mb-3">Commercial Property Expert</p>
              <p className="text-gray-600 mb-4">
                Robert has extensive experience in commercial real estate, helping businesses find the perfect spaces for their operations.
              </p>
              <div className="flex space-x-3">
                <a href="#" className="text-gray-500 hover:text-realestate-navy">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
                <a href="#" className="text-gray-500 hover:text-realestate-navy">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Achievements Section */}
      <section className="py-16 bg-realestate-navy text-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Achievements</h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              We're proud of our record of success and the recognition we've received for our commitment to excellence.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-realestate-gold mb-2">1,500+</div>
              <p className="text-lg">Properties Sold</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-realestate-gold mb-2">98%</div>
              <p className="text-lg">Client Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-realestate-gold mb-2">15+</div>
              <p className="text-lg">Industry Awards</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-realestate-gold mb-2">$500M+</div>
              <p className="text-lg">In Sales Volume</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;
