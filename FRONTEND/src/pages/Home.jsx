import React, { useState, useEffect, useRef, memo } from 'react';
import { Link } from 'react-router-dom';
import {
  FaLeaf, FaShoppingCart, FaUsers, FaTruck, FaCheck,
  FaArrowRight, FaStar, FaPhone, FaMapMarkerAlt, FaEnvelope,
  FaBarcode, FaThermometerHalf, FaShieldAlt , FaSeedling
} from 'react-icons/fa';
import { GiPlantSeed } from "react-icons/gi";

import { Bot} from 'lucide-react';
import hero from '/hero.png';

import one from '../assets/1.jpg';
import two from '../assets/2.jpg';
import three from '../assets/3.jpg';
import four from '../assets/4.jpg';
import five from '../assets/5.jpg';
import six from '../assets/6.jpg';

const StatCard = memo(({ number, label, icon: Icon }) => (
  <div className="group p-6 sm:p-8 rounded-xl bg-white/5 border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:bg-white/10">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-4xl sm:text-5xl font-bold text-white mb-2">{number}</p>
        <p className="text-gray-400 text-sm sm:text-base">{label}</p>
      </div>
      <Icon className="text-green-500 text-3xl opacity-50 group-hover:opacity-100 transition-opacity" />
    </div>
  </div>
));

const FeatureCard = memo(({ icon: Icon, title, description }) => (
  <div className="group p-8 rounded-xl bg-gradient-to-br from-white/5 to-white/0 border border-white/10 hover:border-green-500/30 transition-all duration-300">
    <div className="mb-4 inline-block p-3 rounded-lg bg-green-600/20 group-hover:bg-green-600/30 transition-colors">
      <Icon className="text-green-500 text-2xl" />
    </div>
    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">{title}</h3>
    <p className="text-gray-400 leading-relaxed text-sm">{description}</p>
  </div>
));

const ProductCard = memo(({ img, name, description, price = null, badge = null }) => (
  <div className="group rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:bg-white/10 flex flex-col h-full">
    <div className="relative h-64 overflow-hidden bg-gray-800">
      {badge && (
        <div className="absolute top-4 right-4 z-10 px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
          {badge}
        </div>
      )}
      <img
        src={img}
        alt={name}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    <div className="p-6 flex flex-col flex-grow">
      <h3 className="text-lg font-bold text-white mb-2 group-hover:text-green-400 transition-colors">{name}</h3>
      <p className="text-gray-400 text-sm leading-relaxed mb-4 flex-grow">{description}</p>

      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="text-green-500 text-xs" />
          ))}
        </div>
        {price && <span className="text-green-400 font-bold text-sm">{price}</span>}
      </div>
    </div>
  </div>
));

const Home = () => {
  const [visibleStats, setVisibleStats] = useState(false);
  const [visibleFeatures, setVisibleFeatures] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(false);
  const statsRef = useRef(null);
  const featuresRef = useRef(null);
  const productsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === statsRef.current) setVisibleStats(true);
            if (entry.target === featuresRef.current) setVisibleFeatures(true);
            if (entry.target === productsRef.current) setVisibleProducts(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) observer.observe(statsRef.current);
    if (featuresRef.current) observer.observe(featuresRef.current);
    if (productsRef.current) observer.observe(productsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 text-white overflow-x-hidden">

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-600/10 rounded-full blur-[128px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-green-600/5 rounded-full blur-[128px]" />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center px-5 sm:px-8 pt-20">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Left Content */}
            <div className="space-y-8 pt-16">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600/20 border border-green-600/40 mb-6 hover:border-green-600/60 transition-colors">
                  <FaLeaf className="text-green-400 text-sm" />
                  <span className="text-green-300 text-sm font-semibold">100% Organic & Fresh</span>
                </div>
                <div>
                 <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-linear-to-r from-amber-400 via-yellow-300 to-green-400 bg-clip-text text-transparent tracking-wide">
  
  <span className="flex items-center gap-4">
    <GiPlantSeed className="text-green-400 text-4xl sm:text-5xl lg:text-6xl" />
    FARMIO
  </span>

  <span className="inline-block text-green-400">
  HAR KISSAN KA DIGITAL SAATHI
</span>

</h1>

                </div>
                

                <p className="text-lg text-gray-300 max-w-xl leading-relaxed">
                  Discover the finest organic produce directly from local farmers. Every item is handpicked for quality, freshness, and nutrition. Supporting sustainable agriculture, one delivery at a time.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to='/product'
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all duration-300 hover:gap-3"
                >
                  <FaShoppingCart className="text-lg" />
                  <span>Shop Now</span>
                  <FaArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity" />
                </Link>

                <a
                  href="tel:+919560472926"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-lg border border-white/20 hover:border-white/30 transition-all duration-300"
                >
                  <FaPhone className="text-lg" />
                  <span>Call Us</span>
                </a>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap gap-4 pt-4 pb-4">
                <div className="flex items-center gap-2">
                  <FaCheck className="text-green-400" />
                  <span className="text-sm text-gray-300">Same-day Delivery</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-green-400" />
                  <span className="text-sm text-gray-300">Quality Guaranteed</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheck className="text-green-400" />
                  <span className="text-sm text-gray-300">Certified Organic</span>
                </div>
              </div>
            </div>

            {/* Right Logo/Image */}
            <div className="flex items-center justify-center lg:justify-end">
              <div className="relative w-96 h-96">
              
                <div className="relative   p-8 flex items-center justify-center h-full">
                  <img
                    src={hero}
                    alt="Farmio Logo"
                    className="w-full h-full "
                    style={{ animationDuration: '3s' }}
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="relative z-10 py-16 sm:py-24 px-5 sm:px-8 bg-white/5 border-y border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { number: '50+', label: 'Happy Customers', icon: FaUsers },
              { number: '5+', label: 'Local Farms', icon: FaLeaf },
              { number: '100+', label: 'Products', icon: FaShoppingCart },
              { number: '24/7', label: 'Fresh Guarantee', icon: FaTruck },
            ].map((stat, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${
                  visibleStats ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <StatCard {...stat} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={featuresRef} className="relative z-10 py-20 sm:py-28 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Why Choose <span className="text-green-400">Farmio?</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              We are committed to bringing you the freshest organic produce with complete transparency and quality assurance.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: FaLeaf,
                title: 'Farm Fresh Daily',
                description: 'Harvested at peak ripeness and delivered within 24 hours for maximum freshness and nutrition.'
              },
              {
                icon: FaUsers,
                title: 'Support Local Farmers',
                description: 'Direct partnerships with small-scale growers. Fair prices, strong communities, sustainable practices.'
              },
              {
                icon: FaShieldAlt,
                title: 'Quality Assured',
                description: 'Every product undergoes rigorous quality checks before reaching your doorstep.'
              },
              {
                icon: FaTruck,
                title: 'Fast Delivery',
                description: 'Same-day or next-day delivery in covered areas with temperature-controlled logistics.'
              },
              {
                icon: FaBarcode,
                title: 'Traceable Origin',
                description: 'Know exactly which farm your food comes from with complete transparency and farm details.'
              },
              {
                icon: FaThermometerHalf,
                title: 'Cold Chain Maintained',
                description: 'Advanced logistics ensure freshness from harvest to your kitchen in perfect condition.'
              },
            ].map((feature, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${
                  visibleFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" ref={productsRef} className="relative z-10 py-20 sm:py-28 px-5 sm:px-8 bg-white/5 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Featured <span className="text-green-400">Produce</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl">
              This week's handpicked selection of the freshest organic produce from our network of trusted local farms.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { img: one, name: 'Organic Tomatoes', description: 'Deep red, vine-ripened, intensely flavorful. Perfect for fresh salads and cooking.', price: '₹80/kg', badge: 'Fresh' },
              { img: two, name: 'Baby Spinach', description: 'Tender, nutrient-packed leaves. Ideal for smoothies, salads and quick sautés.', price: '₹60/kg', badge: 'New' },
              { img: three, name: 'Heritage Carrots', description: 'Sweet, colorful mix rich in beta-carotene. Beautiful raw or roasted.', price: '₹50/kg', badge: 'Fresh' },
              { img: four, name: 'Himalayan Apples', description: 'Crisp, juicy, naturally sweet. Grown in high-altitude orchards with care.', price: '₹120/kg', badge: null },
              { img: five, name: 'English Cucumbers', description: 'Thin-skinned, seedless, refreshing. Excellent for hydration and crunch.', price: '₹40/kg', badge: 'Fresh' },
              { img: six, name: 'Bell Pepper Medley', description: 'Vibrant red, yellow and green. Sweet, crunchy, full of vitamin C.', price: '₹90/kg', badge: null },
            ].map((product, i) => (
              <div
                key={i}
                className={`transition-all duration-700 ${
                  visibleProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link to='/product' className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all duration-300 hover:gap-3">
              <span>View All Products</span>
              <FaArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="relative z-10 py-20 sm:py-28 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">

            <div>
              <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-white">
                How <span className="text-green-400">Farmio</span> Works
              </h2>
              <div className="space-y-6">
                {[
                  { step: '1', title: 'Browse & Select', desc: 'Explore our fresh produce catalog with detailed farm information and quality ratings.' },
                  { step: '2', title: 'Place Order', desc: 'Easy checkout process with multiple payment options and delivery scheduling.' },
                  { step: '3', title: 'Fresh Harvest', desc: 'Orders trigger farm-fresh harvesting to ensure maximum freshness and quality.' },
                  { step: '4', title: 'Swift Delivery', desc: 'Temperature-controlled delivery ensures your produce arrives in perfect condition.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-green-600/20 border border-green-600/40 flex items-center justify-center font-bold text-green-400">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                      <p className="text-gray-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-2xl p-8 space-y-6">
              <h3 className="text-2xl font-bold text-white mb-6">Get In Touch</h3>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center flex-shrink-0">
                    <FaPhone className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Call us</p>
                    <a href="tel:+919560472926" className="text-white font-semibold hover:text-green-400 transition-colors">+91 9560 472926</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center flex-shrink-0">
                    <FaEnvelope className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email us</p>
                    <a href="mailto:info@farmio.com" className="text-white font-semibold hover:text-green-400 transition-colors">info@farmio.com</a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center flex-shrink-0">
                    <FaMapMarkerAlt className="text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Location</p>
                    <p className="text-white font-semibold">Across India</p>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400 mb-4">Operating Hours</p>
                <p className="text-white font-semibold">Monday - Sunday: 6:00 AM - 10:00 PM</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative z-10 py-16 px-5 sm:px-8 bg-gradient-to-r from-green-600/20 to-green-600/10 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
            Ready to Experience Farm Fresh?
          </h2>
          <p className="text-gray-300 mb-8 text-lg">
            Join thousands of happy customers enjoying the freshest organic produce delivered to their doorstep.
          </p>
          <a
            href="#products"
            className="inline-flex items-center gap-2 px-10 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all duration-300 text-lg"
          >
            <span>Order Now</span>
            <FaArrowRight />
          </a>
        </div>
        
      </section>
      {/* the chatbot is hardly visible on the home page */}

       <div className="fixed bottom-8 right-8 z-50">
  <Link
    to="https://anadata-ai.netlify.app/"
    target="_blank"
    rel="noopener noreferrer"
    className="bg-black/90 backdrop-blur-md shadow-2xl rounded-full p-4 
               group flex items-center justify-center 
               transition-all duration-300 hover:scale-110 hover:bg-black"
    aria-label="Open AI Career Coach Chatbot"
  >
    <Bot
      className="w-16 h-16 text-green-500 group-hover:text-green-300 
                 transition-colors duration-300"
    />
  </Link>
</div>

        

    </div>
  );
};

export default Home;
