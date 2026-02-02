import React, { useState } from 'react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaWhatsapp, FaArrowRight } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    gender: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="relative min-h-screen w-full text-white bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 overflow-x-hidden">
      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(34,197,94,0.08)_0%,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(16,185,129,0.06)_0%,transparent_60%)]" />
        
        <div className="absolute w-96 h-96 bg-emerald-600/10 rounded-full blur-3xl -top-40 -right-40" />
        <div className="absolute w-96 h-96 bg-teal-600/10 rounded-full blur-3xl -bottom-40 -left-40" />
      </div>

      <div className="relative z-10 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="max-w-6xl mx-auto mb-16 md:mb-24">
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <div className="px-6 py-2.5 bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-600/40 rounded-full backdrop-blur-sm hover:border-green-600/60 transition-all duration-300">
                <p className="text-sm lg:text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-emerald-300">
                  Get in Touch
                </p>
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-green-300 via-emerald-300 to-teal-300">
              Let's Connect
            </h1>

            <p className="text-lg sm:text-xl text-gray-400/95 max-w-2xl mx-auto leading-relaxed">
              Have questions about our fresh produce or partnership opportunities? We'd love to hear from you. Reach out today!
            </p>
          </div>

          {/* Quick Contact Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
            {/* Email Card */}
            <a href="mailto:ag0567688@gmail.com" className="group relative bg-gradient-to-br from-green-900/40 to-emerald-900/30 backdrop-blur-md border border-green-700/40 hover:border-green-600/60 rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-green-900/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-4xl text-green-400 mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <FaEnvelope />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-green-300 transition-colors">Email</h3>
                <p className="text-gray-300/90 break-all text-sm font-semibold group-hover:text-green-200 transition-colors">ag0567688@gmail.com</p>
              </div>
            </a>

            {/* Phone Card */}
            <a href="tel:+919560472926" className="group relative bg-gradient-to-br from-emerald-900/40 to-teal-900/30 backdrop-blur-md border border-emerald-700/40 hover:border-emerald-600/60 rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-emerald-900/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-4xl text-emerald-400 mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <FaPhone />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-300 transition-colors">Phone</h3>
                <p className="text-gray-300/90 text-sm font-semibold group-hover:text-emerald-200 transition-colors">+91 9560472926</p>
              </div>
            </a>

            {/* WhatsApp Card */}
            <a href="https://wa.me/919560472926" target="_blank" rel="noopener noreferrer" className="group relative bg-gradient-to-br from-teal-900/40 to-cyan-900/30 backdrop-blur-md border border-teal-700/40 hover:border-teal-600/60 rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-teal-900/30 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 group-hover:opacity-60 transition-opacity duration-500" />
              <div className="relative z-10">
                <div className="text-4xl text-teal-400 mb-4 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                  <FaWhatsapp />
                </div>
                <h3 className="text-xl font-bold mb-2 group-hover:text-teal-300 transition-colors">WhatsApp</h3>
                <p className="text-gray-300/90 text-sm font-semibold group-hover:text-teal-200 transition-colors">+91 9560472926</p>
              </div>
            </a>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Contact Form */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-green-700/30 hover:border-green-600/50 rounded-3xl p-10 md:p-12 transition-all duration-500 shadow-2xl">
              <h2 className="text-3xl font-bold mb-2 text-white">Send us a Message</h2>
              <p className="text-gray-400/90 mb-8">Fill out the form below and we'll get back to you shortly.</p>

              <form action="https://getform.io/f/amddkgwb" method="POST" onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div className="group/field">
                  <label className="block text-sm font-semibold text-gray-200 mb-3">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="John Doe"
                    className="w-full px-5 py-3.5 bg-gray-800/50 border border-gray-700/50 hover:border-green-700/50 focus:border-green-600 rounded-xl text-white placeholder-gray-500/70 focus:outline-none focus:ring-2 focus:ring-green-600/50 transition-all duration-300 group-hover/field:bg-gray-800/70"
                  />
                </div>

                {/* Email Input */}
                <div className="group/field">
                  <label className="block text-sm font-semibold text-gray-200 mb-3">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full px-5 py-3.5 bg-gray-800/50 border border-gray-700/50 hover:border-green-700/50 focus:border-green-600 rounded-xl text-white placeholder-gray-500/70 focus:outline-none focus:ring-2 focus:ring-green-600/50 transition-all duration-300 group-hover/field:bg-gray-800/70"
                  />
                </div>

                {/* Mobile Input */}
                <div className="group/field">
                  <label className="block text-sm font-semibold text-gray-200 mb-3">Mobile Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    required
                    placeholder="Your mobile number"
                    pattern="^[7-9][0-9]{9}$"
                    title="Enter a valid Indian mobile number starting with 7, 8, or 9"
                    className="w-full px-5 py-3.5 bg-gray-800/50 border border-gray-700/50 hover:border-green-700/50 focus:border-green-600 rounded-xl text-white placeholder-gray-500/70 focus:outline-none focus:ring-2 focus:ring-green-600/50 transition-all duration-300 group-hover/field:bg-gray-800/70"
                  />
                </div>

                {/* Gender Select */}
                <div className="group/field">
                  <label className="block text-sm font-semibold text-gray-200 mb-3">Gender</label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 bg-gray-800/50 border border-gray-700/50 hover:border-green-700/50 focus:border-green-600 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-600/50 transition-all duration-300 group-hover/field:bg-gray-800/70 appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23888' d='M6 9L1 4h10z'/%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      paddingRight: '2.5rem'
                    }}
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div className="group/field">
                  <label className="block text-sm font-semibold text-gray-200 mb-3">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    placeholder="Tell us about your inquiry..."
                    rows="5"
                    className="w-full px-5 py-3.5 bg-gray-800/50 border border-gray-700/50 hover:border-green-700/50 focus:border-green-600 rounded-xl text-white placeholder-gray-500/70 focus:outline-none focus:ring-2 focus:ring-green-600/50 transition-all duration-300 group-hover/field:bg-gray-800/70 resize-none"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 px-6 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-green-900/40 transition-all duration-400 hover:scale-105 hover:shadow-green-700/50 active:scale-95 flex items-center justify-center gap-2 group/btn overflow-hidden relative mt-2"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover/btn:opacity-100 transition-opacity duration-400" />
                  <span className="relative z-10">Send Message</span>
                  <FaArrowRight className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300" />
                </button>

                {/* Success Message */}
                {submitted && (
                  <div className="p-4 bg-green-900/40 border border-green-700/60 rounded-xl text-green-300 text-center font-semibold animate-pulse">
                    Message sent successfully! We'll be in touch soon.
                  </div>
                )}
              </form>
            </div>
          </div>

          {/* Location & Map */}
          <div className="space-y-8">
            {/* Address Card */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-teal-600/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-xl border border-emerald-700/30 hover:border-emerald-600/50 rounded-3xl p-10 md:p-12 transition-all duration-500 shadow-2xl">
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-4 bg-gradient-to-br from-emerald-600/30 to-teal-600/20 rounded-xl">
                    <FaMapMarkerAlt className="text-3xl text-emerald-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">Our Location</h3>
                    <p className="text-gray-400/90 text-sm">Visit us at our headquarters</p>
                  </div>
                </div>

                <p className="text-lg text-gray-200/95 leading-relaxed font-semibold">
                  Plot No. 766, 26th KM Milestone, NH-9,
                  <br />
                  Ghaziabad, Uttar Pradesh – 201015
                </p>

                <div className="mt-8 pt-8 border-t border-white/10">
                  <p className="text-sm text-gray-400/80 mb-4">Business Hours</p>
                  <ul className="space-y-2 text-gray-300/90">
                    <li className="flex justify-between"><span>Monday - Friday</span> <span className="font-semibold">9:00 AM - 6:00 PM</span></li>
                    <li className="flex justify-between"><span>Saturday</span> <span className="font-semibold">10:00 AM - 4:00 PM</span></li>
                    <li className="flex justify-between"><span>Sunday</span> <span className="font-semibold">Closed</span></li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl border border-teal-700/30 hover:border-teal-600/50 transition-all duration-500 hover:shadow-teal-900/30">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-gradient-to-br from-teal-400 to-transparent transition-opacity duration-500 z-20 pointer-events-none rounded-3xl" />
              
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3500.545251972305!2d77.49128877566565!3d28.673331882226368!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf2c4cac27f99%3A0xd9961659aee6d5b2!2sHi-Tech%20Institute%20of%20Engineering%20%26%20Technology!5e0!3m2!1sen!2sin!4v1739723721387!5m2!1sen!2sin"
                width="100%"
                height="450"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full rounded-3xl"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
