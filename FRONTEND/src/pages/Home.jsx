import React, { useState, useEffect, useRef, memo } from 'react';
import { 
  FaLeaf, FaHandshake, FaHeart, FaRecycle, FaTruck, FaClock, 
  FaShoppingBasket, FaUsers, FaArrowRight
} from 'react-icons/fa';
import { SiOpenai } from "react-icons/si";

import one   from '../assets/1.jpg';
import two   from '../assets/2.jpg';
import three from '../assets/3.jpg';
import four  from '../assets/4.jpg';
import five  from '../assets/5.jpg';
import six   from '../assets/6.jpg';

const FeatureCard = memo(({ icon, title, description, color = "green" }) => {
  const colorClasses = {
    green: {
      bg: 'from-green-900/40 to-emerald-900/30',
      border: 'border-green-700/40 hover:border-green-600/60',
      icon: 'text-green-400 group-hover:text-green-300',
      title: 'group-hover:text-green-300',
      shadow: 'hover:shadow-green-900/30'
    },
    emerald: {
      bg: 'from-emerald-900/40 to-teal-900/30',
      border: 'border-emerald-700/40 hover:border-emerald-600/60',
      icon: 'text-emerald-400 group-hover:text-emerald-300',
      title: 'group-hover:text-emerald-300',
      shadow: 'hover:shadow-emerald-900/30'
    },
    teal: {
      bg: 'from-teal-900/40 to-cyan-900/30',
      border: 'border-teal-700/40 hover:border-teal-600/60',
      icon: 'text-teal-400 group-hover:text-teal-300',
      title: 'group-hover:text-teal-300',
      shadow: 'hover:shadow-teal-900/30'
    }
  };

  const styles = colorClasses[color] || colorClasses.green;

  return (
    <div className={`
      group relative bg-linear-to-br ${styles.bg}
      backdrop-blur-md border ${styles.border} rounded-2xl 
      overflow-hidden transition-all duration-500 
      hover:scale-[1.02] ${styles.shadow}
      p-8 h-full flex flex-col
    `}>
      <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
      
      <div className="absolute inset-0 opacity-0 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none bg-linear-to-br from-white/5 via-transparent to-transparent" />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className={`${styles.icon} text-5xl mb-6 transform group-hover:scale-125 group-hover:rotate-12 transition-all duration-500`}>
          {icon}
        </div>
        
        <h3 className={`text-2xl font-bold text-white mb-4 ${styles.title} transition-colors duration-300`}>
          {title}
        </h3>
        
        <p className="text-gray-300/85 leading-relaxed text-base grow">
          {description}
        </p>

        <div className="mt-6 flex items-center text-gray-400 group-hover:text-white/80 transition-colors duration-300">
          <div className="w-0 h-0.5 bg-linear-to-r from-transparent to-white/40 group-hover:to-white/60 group-hover:w-12 transition-all duration-500" />
        </div>
      </div>
    </div>
  );
});

const ProductCard = memo(({ img, name, description }) => (
  <div className="
    group relative bg-linear-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-md 
    border border-emerald-700/30 hover:border-emerald-600/50 rounded-3xl 
    overflow-hidden transition-all duration-500 
    hover:scale-[1.02] hover:shadow-2xl hover:shadow-emerald-900/25
    flex flex-col h-full
  ">
    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-linear-to-br from-emerald-400/30 to-transparent transition-opacity duration-500" />

    <div className="relative h-72 overflow-hidden shrink-0">
      <img
        src={img}
        alt={name}
        loading="lazy"
        decoding="async"
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115 brightness-95 group-hover:brightness-105"
      />
      <div className="absolute inset-0 bg-linear-to-t from-gray-950/80 via-gray-950/20 to-transparent" />
      
      
    </div>
    
    <div className="p-8 relative z-10 grow flex flex-col">
      <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors duration-300">
        {name}
      </h3>
      <p className="text-gray-300/85 leading-relaxed text-base grow">
        {description}
      </p>
      
      
    </div>
  </div>
));

const Home = () => {
  const [visibleFeatures, setVisibleFeatures] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(false);
  const featuresRef = useRef(null);
  const productsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            if (entry.target === featuresRef.current) setVisibleFeatures(true);
            if (entry.target === productsRef.current) setVisibleProducts(true);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
    );

    if (featuresRef.current) observer.observe(featuresRef.current);
    if (productsRef.current) observer.observe(productsRef.current);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <FaLeaf />,
      title: "Farm Fresh Daily",
      description: "Harvested at peak ripeness and delivered within hours for maximum flavor and nutrition.",
      color: "green"
    },
    {
      icon: <FaHandshake />,
      title: "Support Local Farmers",
      description: "Direct partnerships with small-scale growers in your region — fair prices, strong communities.",
      color: "emerald"
    },
    {
      icon: <FaHeart />,
      title: "100% Certified Organic",
      description: "No synthetic pesticides, fertilizers or GMOs — just clean, honest food from nature.",
      color: "teal"
    },
    {
      icon: <FaRecycle />,
      title: "Sustainable Practices",
      description: "Regenerative farming, water conservation, biodiversity protection — farming for tomorrow.",
      color: "green"
    },
    {
      icon: <FaTruck />,
      title: "Lightning-Fast Delivery",
      description: "Same-day or next-day delivery in covered areas — freshness preserved from soil to table.",
      color: "emerald"
    },
    {
      icon: <FaClock />,
      title: "Peak Freshness Guarantee",
      description: "Cold-chain logistics and quality checks ensure every item arrives in perfect condition.",
      color: "teal"
    },
  ];

  const products = [
    { img: one,   name: "Organic Tomatoes",     description: "Deep red, vine-ripened, intensely flavorful — perfect for salads, sauces & snacking" },
    { img: two,   name: "Baby Spinach",         description: "Tender, nutrient-packed leaves — ideal for smoothies, salads and quick sautés" },
    { img: three, name: "Heritage Carrots",     description: "Sweet, colorful mix — rich in beta-carotene, beautiful raw or roasted" },
    { img: four,  name: "Himalayan Apples",     description: "Crisp, juicy, naturally sweet — grown in high-altitude orchards" },
    { img: five,  name: "English Cucumbers",    description: "Thin-skinned, seedless, refreshing — excellent for hydration & crunch" },
    { img: six,   name: "Bell Pepper Medley",   description: "Vibrant red, yellow & green — sweet, crunchy, full of vitamin C" },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-linear-to-b from-gray-950 via-gray-900 to-gray-950 text-white">

      {/* ─── Background ──────────────────────────────────────────────── */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.06)_0%,transparent_60%)] animate-pulse" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(6,182,212,0.04)_0%,transparent_70%)]" />

        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              radial-gradient(circle at 2px 2px, rgba(52,211,153,0.12) 1.5px, transparent 1.5px)
            `,
            backgroundSize: '50px 50px'
          }}
        />

        <div 
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'n\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\'/%3E%3CfeColorMatrix type=\'matrix\' values=\'0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.08 0\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23n)\'/%3E%3C/svg%3E")',
            mixBlendMode: 'overlay'
          }}
        />

        <div className="absolute inset-0">
          <div className="absolute w-2 h-2 bg-emerald-400/25 rounded-full blur-sm animate-pulse top-[12%] left-[15%]" style={{ animationDuration: '4s' }} />
          <div className="absolute w-1.5 h-1.5 bg-teal-400/20 rounded-full blur-sm animate-pulse top-[45%] right-[18%]" style={{ animationDuration: '5s' }} />
          <div className="absolute w-2.5 h-2.5 bg-green-400/18 rounded-full blur-sm animate-pulse bottom-[18%] left-[28%]" style={{ animationDuration: '6s' }} />
          <div className="absolute w-2 h-2 bg-cyan-400/22 rounded-full blur-sm animate-pulse top-[72%] right-[12%]" style={{ animationDuration: '4.5s' }} />
        </div>
      </div>

      {/* ─── Hero ────────────────────────────────────────────────────── */}
      <section className="relative min-h-[95vh] flex items-center justify-center px-5 sm:px-8 py-20 md:py-0 z-10">
        <div className="text-center max-w-5xl">
          <div className="mb-8 inline-block pt-24">
            <div className="px-5 py-2.5 bg-linear-to-r from-green-600/20 to-emerald-600/20 border border-green-600/40 rounded-full backdrop-blur-sm">
              <p className="text-sm lg:text-base font-semibold bg-clip-text text-transparent bg-linear-to-r from-green-300 to-emerald-300">
                Welcome to sustainable farming
              </p>
            </div>
          </div>

          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-8xl font-extrabold tracking-tighter mb-8 bg-clip-text text-transparent bg-linear-to-r from-green-300 via-emerald-300 to-teal-300 pb-2">
            FARMIO
          </h1>

          <p className="text-2xl sm:text-3xl md:text-4xl font-medium mb-6 text-gray-100 leading-tight">
            Local Roots, Fresh Routes
          </p>

          <p className="text-base sm:text-lg md:text-xl text-gray-400/95 max-w-3xl mx-auto mb-12 md:mb-16 leading-relaxed">
            Connecting conscious consumers with the finest organic produce — grown locally, delivered fresh, every single time.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
            <a
              href="#products"
              className="group relative inline-flex items-center px-10 py-5 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold text-lg rounded-full shadow-2xl shadow-green-900/40 transition-all duration-400 hover:scale-105 hover:shadow-green-700/50 active:scale-95 overflow-hidden"
            >
              <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <FaShoppingBasket className="mr-3 text-xl relative z-10" />
              <span className="relative z-10">Explore Fresh Harvest</span>
            </a>

            <button className="group relative inline-flex items-center px-8 py-5 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white font-bold text-lg rounded-full transition-all duration-400 hover:scale-105 active:scale-95 backdrop-blur-sm">
              <span className="relative z-10">Learn More</span>
              <FaArrowRight className="ml-3 text-lg relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </section>

      {/* ─── Features ────────────────────────────────────────────────── */}
      <section ref={featuresRef} className="py-24 md:py-32 relative z-10">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="mb-20 md:mb-28">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-center mb-6 bg-clip-text text-transparent bg-linear-to-r from-green-300 via-emerald-300 to-teal-300">
              Why Families Choose Farmio
            </h2>
            <p className="text-center text-gray-400/90 text-lg md:text-xl max-w-2xl mx-auto">
              Experience the difference of truly fresh, sustainably-grown produce
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {features.map((feature, i) => (
              <div
                key={i}
                className={`transition-all duration-1000 ease-out ${
                  visibleFeatures ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <FeatureCard {...feature} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Products ────────────────────────────────────────────────── */}
      <section id="products" ref={productsRef} className="py-24 md:py-32 relative z-10">
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-transparent via-emerald-950/10 to-transparent" />

        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="mb-20 md:mb-28">
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-bold text-center mb-6 bg-clip-text text-transparent bg-linear-to-r from-emerald-300 via-teal-300 to-cyan-300">
              This Season's Finest
            </h2>
            <p className="text-center text-gray-400/90 text-lg md:text-xl max-w-2xl mx-auto">
              Handpicked fresh produce sourced directly from local organic farms
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {products.map((product, i) => (
              <div
                key={i}
                className={`transition-all duration-1000 ease-out ${
                  visibleProducts ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>

        {/* CTA Block */}
        <div className="mt-28 md:mt-36 max-w-4xl mx-auto px-5 sm:px-8 text-center">
          <div className="relative group">
            <div className="absolute inset-0 bg-linear-to-r from-green-600/30 to-emerald-600/30 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-linear-to-br from-green-950/60 via-teal-950/50 to-green-950/60 backdrop-blur-xl p-12 md:p-16 rounded-3xl border border-emerald-700/40 hover:border-emerald-600/60 transition-all duration-500 shadow-2xl">
              <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Ready to Join the Farmio Family?
              </h2>
              <p className="text-lg md:text-xl text-gray-300/90 mb-12 max-w-2xl mx-auto leading-relaxed">
                Whether you're a farmer, a shop, a restaurant or a passionate home cook — let's grow a better food system together.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <a
                  href="tel:+919560472926"
                  className="group/btn relative inline-flex items-center px-10 py-5 bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold text-lg rounded-full shadow-xl transition-all duration-400 hover:scale-105 hover:shadow-green-700/50 active:scale-95 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-linear-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-400" />
                  <FaUsers className="mr-3 text-2xl relative z-10" />
                  <span className="relative z-10">Connect With Us</span>
                </a>

                <button className="inline-flex items-center px-8 py-5 bg-white/10 hover:bg-white/15 border border-white/20 hover:border-white/30 text-white font-semibold text-base rounded-full transition-all duration-400 hover:scale-105 active:scale-95 backdrop-blur-sm">
                  Browse Catalog
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grok CTA */}
        <div className="flex justify-center mt-24 md:mt-32 pb-12">
          <a
            href="https://grok.com/?referrer=website"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex items-center gap-4 px-10 py-6 bg-linear-to-r from-emerald-700/80 to-teal-700/80 hover:from-emerald-600 hover:to-teal-600 rounded-full shadow-2xl shadow-emerald-900/30 transition-all duration-400 hover:scale-105 hover:shadow-emerald-700/50 active:scale-95 border border-emerald-600/40 hover:border-emerald-500/60 overflow-hidden"
          >
            <div className="absolute inset-0 bg-linear-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            
            <SiOpenai className="text-4xl group-hover:rotate-12 transition-transform duration-500 relative z-10" />
            <span className="font-bold text-lg relative z-10">Ask Grok Anything About Farming</span>
            <FaArrowRight className="text-base relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
          </a>
        </div>
      </section>

    </div>
  );
};

export default Home;
