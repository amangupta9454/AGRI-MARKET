// src/pages/About.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaSeedling, FaLeaf, FaHandsHelping, FaChartLine, FaUsers, FaShieldAlt } from 'react-icons/fa';

const About = () => {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-950 via-slate-900 to-gray-900 text-white pt-24 pb-20">
      {/* Hero Section */}
      <section className="relative px-6 md:px-12 lg:px-20 py-16 md:py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20 pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-6xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-6">
            <FaSeedling className="text-4xl md:text-5xl text-green-400" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-linear-to-r from-amber-400 via-yellow-300 to-green-400 bg-clip-text text-transparent tracking-tight">
              Welcome to Farmio
            </h1>
          </div>

          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-10">
            Empowering Indian farmers and consumers with smart, accessible, and sustainable agriculture technology — one click at a time.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            <Link
              to="/crop-diseases"
              className="inline-flex items-center px-8 py-4 bg-linear-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Explore Crop Health Tools
            </Link>
            <Link
              to="/prices"
              className="inline-flex items-center px-8 py-4 bg-linear-to-r from-amber-600 to-orange-700 hover:from-amber-700 hover:to-orange-800 text-white font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Check Live Market Prices
            </Link>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="px-6 md:px-12 lg:px-20 py-20 bg-black/30 border-t border-b border-white/10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-amber-400 to-green-400 bg-clip-text text-transparent">
              Our Mission
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              To bridge the gap between traditional Indian farming and modern technology — making advanced tools, real-time information, and fair market access available to every farmer, big or small, across the country.
            </p>
          </div>

          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
              Our Vision
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">
              A thriving, sustainable, and profitable agricultural ecosystem in India where technology empowers farmers, ensures fair prices for consumers, and protects our environment for future generations.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="px-6 md:px-12 lg:px-20 py-20">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-linear-to-r from-amber-400 via-yellow-300 to-green-400 bg-clip-text text-transparent">
            Everything You Need, In One Place
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Farmio brings powerful, easy-to-use tools designed specifically for Indian agriculture.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: FaLeaf, title: "Crop Disease Detection", desc: "Upload photos and get instant AI-powered diagnosis + treatment advice." },
            { icon: FaChartLine, title: "Live Market Prices", desc: "Real-time mandi rates, trends, and price predictions across states." },
            { icon: FaSeedling, title: "Weather & advisories", desc: "Hyper-local forecasts, alerts, and crop-specific recommendations." },
            { icon: FaHandsHelping, title: "Loan & Finance", desc: "Easy access to government schemes, crop loans, and insurance info." },
            { icon: FaUsers, title: "Equipment & Rentals", desc: "Find, rent or buy modern machinery near you." },
            { icon: FaShieldAlt, title: "Secure & Private", desc: "Your data stays yours — built with trust and transparency." },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-linear-to-br from-gray-800/50 to-slate-900/50 border border-white/10 rounded-2xl p-8 hover:border-green-500/50 transition-all duration-300 group hover:shadow-xl hover:shadow-green-900/20"
            >
              <item.icon className="text-5xl text-green-400 mb-6 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
              <p className="text-gray-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats / Trust */}
      <section className="px-6 md:px-12 lg:px-20 py-20 bg-linear-to-b from-black/40 to-transparent">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
          {[
            { num: "10+", label: "Active Farmers" },
            { num: "25+", label: "Crops Supported" },
            { num: "1 States", label: "Covered" },
            { num: "₹1", label: "Market Insights Delivered" },
          ].map((stat, i) => (
            <div key={i} className="p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-4xl md:text-5xl font-bold bg-linear-to-r from-amber-400 to-green-400 bg-clip-text text-transparent mb-3">
                {stat.num}
              </div>
              <p className="text-gray-400 font-medium">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Footer */}
      <section className="px-6 md:px-12 lg:px-20 py-20 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 bg-linear-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
          Ready to Grow Smarter?
        </h2>
        <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
          Join thousands of farmers and consumers already using Farmio to make better decisions every day.
        </p>
        <Link
          to="/login"
          className="inline-flex items-center px-10 py-5 bg-linear-to-r from-green-600 to-emerald-700 hover:from-green-700 hover:to-emerald-800 text-white text-xl font-bold rounded-xl shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          Get Started Today — It's Free
        </Link>
      </section>
    </div>
  );
};

export default About;