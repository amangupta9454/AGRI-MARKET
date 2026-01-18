import React, { useState, useEffect, useRef } from 'react';
import { FaLeaf, FaHandshake, FaHeart, FaRecycle, FaTruck, FaClock } from 'react-icons/fa';
import { SiOpenai } from "react-icons/si";

// Keep images for cards (they contrast nicely on dark bg)
import one from '../assets/1.jpg';
import two from '../assets/2.jpg';
import three from '../assets/3.jpg';
import four from '../assets/4.jpg';
import five from '../assets/5.jpg';
import six from '../assets/6.jpg';

const FeatureCard = ({ img, title, description, icon }) => {
  return (
    <div className="bg-gray-900/70 backdrop-blur-sm border border-green-800/30 rounded-2xl overflow-hidden 
                    transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-green-900/30 group">
      <div className="relative">
        <img src={img} alt={title} className="w-full h-60 object-cover brightness-90 group-hover:brightness-110 transition-all" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-4">
          <div className="text-green-400 text-3xl transition-transform group-hover:scale-110">{icon}</div>
          <h3 className="text-2xl font-semibold text-white group-hover:text-green-300 transition-colors">{title}</h3>
        </div>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

const ProductCard = ({ img, name, description }) => {
  return (
    <div className="bg-gray-900/70 backdrop-blur-sm border border-green-800/30 rounded-2xl overflow-hidden 
                    transition-all duration-500 hover:scale-[1.03] hover:shadow-2xl hover:shadow-green-900/30 group">
      <div className="relative">
        <img src={img} alt={name} className="w-full h-56 object-cover brightness-90 group-hover:brightness-110 transition-all" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-white mb-3 group-hover:text-green-300 transition-colors">{name}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </div>
  );
};

const Home = () => {
  const [showFeatures, setShowFeatures] = useState(false);
  const [showProducts, setShowProducts] = useState(false);
  const featuresRef = useRef(null);
  const productsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === featuresRef.current) setShowFeatures(true);
            if (entry.target === productsRef.current) setShowProducts(true);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (featuresRef.current) observer.observe(featuresRef.current);
    if (productsRef.current) observer.observe(productsRef.current);

    return () => observer.disconnect();
  }, []);

  const handleGrokClick = () => console.log('Grok clicked!');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-green-950/70 to-gray-950 text-white relative overflow-x-hidden">
      {/* Animated background particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(34,197,94,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 animate-pulse-slow bg-[radial-gradient(circle_at_80%_70%,rgba(34,197,94,0.06)_0%,transparent_60%)]" />
        {/* Floating subtle particles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute w-1 h-1 bg-green-400/40 rounded-full animate-float-1 top-10 left-20" />
          <div className="absolute w-2 h-2 bg-emerald-300/30 rounded-full animate-float-2 top-1/3 right-32 delay-1000" />
          <div className="absolute w-1.5 h-1.5 bg-green-500/20 rounded-full animate-float-3 bottom-20 left-1/4 delay-2000" />
          <div className="absolute w-1 h-1 bg-teal-400/30 rounded-full animate-float-4 top-2/3 right-20 delay-3000" />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 z-10">
        <div className="text-center max-w-5xl">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 animate-gradient">
            FARMIO
          </h1>
          <p className="text-2xl md:text-3xl font-light mb-10 text-gray-200">
            Local Roots, Fresh Routes
          </p>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-12">
            Discover farm-fresh, organic produce delivered from local growers straight to your table.
          </p>
          <a
            href="#products"
            className="inline-block px-10 py-5 bg-green-600 hover:bg-green-500 text-white font-bold text-lg rounded-full shadow-2xl shadow-green-900/40 transition-all hover:scale-105 hover:shadow-green-700/50"
          >
            Explore Fresh Produce
          </a>
        </div>
      </section>

      {/* Features */}
      <section ref={featuresRef} className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-400">
            Why Farmio?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: one, title: 'Farm Fresh Daily', desc: 'Picked at peak ripeness and delivered fast', icon: <FaLeaf /> },
              { img: two, title: 'Support Local Growers', desc: 'Empowering farmers in your community', icon: <FaHandshake /> },
              { img: three, title: 'Certified Organic', desc: 'No chemicals, just pure nature', icon: <FaHeart /> },
              { img: four, title: 'Sustainable Farming', desc: 'Eco-conscious practices for tomorrow', icon: <FaRecycle /> },
              { img: five, title: 'Hassle-Free Delivery', desc: 'Straight to your doorstep', icon: <FaTruck /> },
              { img: six, title: 'Peak Freshness Guaranteed', desc: 'From soil to table in record time', icon: <FaClock /> },
            ].map((item, i) => (
              <div
                key={i}
                className={`transition-all duration-1000 ${
                  showFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <FeatureCard {...item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" ref={productsRef} className="py-24 relative z-10 bg-black/20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-teal-400">
            Our Harvest
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { img: one, name: 'Organic Tomatoes', desc: 'Sun-ripened, bursting with flavor' },
              { img: two, name: 'Fresh Spinach', desc: 'Crisp, nutrient-dense leaves' },
              { img: three, name: 'Golden Carrots', desc: 'Naturally sweet & vibrant' },
              { img: four, name: 'Farm Apples', desc: 'Crisp, juicy, hand-picked' },
              { img: five, name: 'Organic Cucumbers', desc: 'Refreshing and hydrating' },
              { img: six, name: 'Red Bell Peppers', desc: 'Sweet, colorful & crunchy' },
            ].map((item, i) => (
              <div
                key={i}
                className={`transition-all duration-1000 ${
                  showProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
                }`}
                style={{ transitionDelay: `${i * 120}ms` }}
              >
                <ProductCard {...item} />
              </div>
            ))}
          </div>
        </div>

        {/* Collaboration CTA */}
        <div className="mt-32 max-w-4xl mx-auto px-6 text-center">
          <div className="bg-gradient-to-br from-green-900/80 to-teal-950/80 backdrop-blur-lg p-12 rounded-3xl border border-green-700/30 shadow-2xl">
            <h2 className="text-4xl font-bold mb-6">Ready to Grow Together?</h2>
            <p className="text-xl text-gray-200 mb-10">
              Farmers, shops, restaurants — let's build a stronger local food future.
            </p>
            <a
              href="tel:+919560472926"
              className="inline-block px-12 py-6 bg-green-600 hover:bg-green-500 text-white font-bold text-xl rounded-full shadow-xl transition-all hover:scale-105"
            >
              📞 Connect Now
            </a>
          </div>
        </div>

        {/* Grok Link */}
        <div className="flex justify-center mt-20 mb-16">
          <a
            href="https://grok.com/?referrer=website"
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleGrokClick}
            className="group flex items-center gap-4 px-10 py-5 bg-gradient-to-r from-green-700 to-emerald-800 hover:from-green-600 hover:to-emerald-700 rounded-full shadow-2xl transition-all hover:scale-105 hover:shadow-green-900/50"
          >
            <SiOpenai className="text-4xl group-hover:rotate-12 transition-transform" />
            <span className="font-bold text-xl">Ask Grok for Farming Tips</span>
          </a>
        </div>
      </section>

      {/* Add to your global CSS or tailwind.config (recommended) */}
      {/*
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50%      { transform: translate(30px, -40px); }
        }
        @keyframes gradient {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-float-1 { animation: float 18s infinite ease-in-out; }
        .animate-float-2 { animation: float 22s infinite ease-in-out; }
        .animate-float-3 { animation: float 25s infinite ease-in-out; }
        .animate-float-4 { animation: float 30s infinite ease-in-out; }
        .animate-gradient  { background-size: 200% 200%; animation: gradient 12s ease infinite; }
        .animate-pulse-slow { animation: pulse 18s infinite ease-in-out; }
      */}
    </div>
  );
};

export default Home;