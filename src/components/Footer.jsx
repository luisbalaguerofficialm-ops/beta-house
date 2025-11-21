import React from "react";

import logo from "../assets/logo.png";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-[#035A33] text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
        {/* Logo + About */}
        <div className=" text-left">
          <div className="flex items-center gap-4 mb-4">
            <img src={logo} alt="" />
          </div>

          <p className="text-sm leading-relaxed text-gray-200">
            Discover, rent, and find your ideal home hassle-free with BetaHouse.
            Take control of your rental journey today!
          </p>

          <div className="mt-6 space-y-3 text-sm">
            <p className="flex items-center gap-2">
              <MapPin size={16} /> 95 Tinubu Estate, Lekki, Lagos
            </p>
            <p className="flex items-center gap-2">
              <Phone size={16} /> +234 675 8935 675
            </p>
            <p className="flex items-center gap-2">
              <Mail size={16} /> support@rentbetahouse.com
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="text-left">
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-3 text-meduim  text-gray-200">
            <li>Home</li>
            <li>Properties</li>
            <li>About</li>
            <li>Contact us</li>
            <li>Blog</li>
          </ul>
        </div>

        {/* More */}
        <div className=" text-left">
          <h3 className="text-lg font-semibold mb-4">More</h3>
          <ul className="space-y-3 text-medium text-gray-200">
            <li>Agents</li>
            <li>Affordable Houses</li>
            <li>FAQ’s</li>
          </ul>
        </div>

        {/* Popular Search */}
        <div className=" text-left">
          <h3 className="text-lg font-semibold mb-4">Popular Search</h3>
          <ul className="space-y-3 text-medium text-gray-200">
            <li>Apartment for sale</li>
            <li>Apartment for rent</li>
            <li>3 bedroom flat</li>
            <li>Bungalow</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-white/20 mt-10 pt-6 text-center md:text-left">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-gray-200">
          <p>Copyright 2023 Betahouse | Designed by Michael.fig</p>
          <p className="mt-2 md:mt-0 cursor-pointer hover:underline">
            Privacy Policy
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
