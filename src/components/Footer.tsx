"use client"
import React, { useState } from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, ArrowRight, Heart, Star, Clock, Shield } from 'lucide-react';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isHoveredSection, setIsHoveredSection] = useState(null);

  const features = [
    { icon: Clock, title: '24/7 Support', description: 'Round the clock assistance' },
    { icon: Shield, title: 'Secure Shopping', description: 'Protected transactions' },
    { icon: Heart, title: 'Loyalty Rewards', description: 'Earn points on purchases' },
    { icon: Star, title: 'Quality Promise', description: 'Satisfaction guaranteed' }
  ];

  return (
    <footer className="relative bg-gradient-to-b from-gray-900/95 to-gray-900/98 text-gray-200 backdrop-blur-md">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -inset-x-2 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent animate-pulse" />
        <div className="absolute w-32 h-32 bg-blue-500/10 rounded-full -top-16 -left-16 blur-xl animate-blob" />
        <div className="absolute w-32 h-32 bg-purple-500/10 rounded-full -top-16 -right-16 blur-xl animate-blob animation-delay-2000" />
      </div>

      {/* Features Section */}
      <div className="relative border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map(({ icon: Icon, title, description }, index) => (
              <div
                key={index}
                className="group flex items-center gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-white/5 backdrop-blur-lg transform hover:-translate-y-1"
              >
                <div className="p-3 rounded-lg bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors">
                  <Icon className="h-6 w-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="font-semibold text-white">{title}</h4>
                  <p className="text-sm text-gray-400">{description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div
            className="space-y-4 transform transition-all duration-300 hover:-translate-y-1"
            onMouseEnter={() => setIsHoveredSection('company')}
            onMouseLeave={() => setIsHoveredSection(null)}
          >
            <h3 className="text-2xl font-bold text-white">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
                ZenZone
              </span>
            </h3>
            <p className="text-gray-400">Your destination for mindful shopping and conscious living.</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <MapPin className="h-5 w-5 text-gray-400" />
                <span>123 Serenity Street, Mindful City</span>
              </div>
              <div className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Phone className="h-5 w-5 text-gray-400" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                <Mail className="h-5 w-5 text-gray-400" />
                <span>support@zenzone.com</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div
            className="space-y-4 transform transition-all duration-300 hover:-translate-y-1"
            onMouseEnter={() => setIsHoveredSection('quick')}
            onMouseLeave={() => setIsHoveredSection(null)}
          >
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Our Products', 'Special Offers', 'Customer Reviews', 'Contact Us'].map((item) => (
                <li key={item} className="group flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-blue-400" />
                  <a href="#" className="hover:text-blue-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div
            className="space-y-4 transform transition-all duration-300 hover:-translate-y-1"
            onMouseEnter={() => setIsHoveredSection('service')}
            onMouseLeave={() => setIsHoveredSection(null)}
          >
            <h4 className="text-lg font-semibold text-white">Customer Service</h4>
            <ul className="space-y-2">
              {['Shipping Policy', 'Returns & Exchanges', 'FAQ', 'Track Order', 'Privacy Policy'].map((item) => (
                <li key={item} className="group flex items-center gap-2">
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1 text-blue-400" />
                  <a href="#" className="hover:text-blue-400 transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div
            className="space-y-4 transform transition-all duration-300 hover:-translate-y-1"
            onMouseEnter={() => setIsHoveredSection('newsletter')}
            onMouseLeave={() => setIsHoveredSection(null)}
          >
            <h4 className="text-lg font-semibold text-white">Stay Connected</h4>
            <p className="text-gray-400">Subscribe to our newsletter for updates and exclusive offers.</p>
            <div className="flex flex-col gap-2">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsEmailFocused(true)}
                  onBlur={() => setIsEmailFocused(false)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-2 rounded-lg bg-white/5 border border-gray-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all backdrop-blur-lg"
                />
                <div className={`absolute inset-0 rounded-lg bg-blue-500/5 transition-opacity duration-300 pointer-events-none ${isEmailFocused ? 'opacity-100' : 'opacity-0'}`} />
              </div>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/20">
                Subscribe
              </button>
            </div>
            {/* Social Media */}
            <div className="flex gap-4 mt-4">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="p-2 rounded-lg hover:bg-white/5 transition-colors group"
                >
                  <Icon className="h-6 w-6 text-gray-400 group-hover:text-blue-400 transition-colors" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-800/50">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm text-center md:text-left">
              © {new Date().getFullYear()} ZenZone. All rights reserved.
            </p>
            <div className="flex gap-4">
              {['Terms of Service', 'Privacy Policy', 'Cookie Policy'].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-gray-400 hover:text-blue-400 text-sm transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </footer>
  );
};

export default Footer;
