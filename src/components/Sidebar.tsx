/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useState, useEffect } from "react";
import {
  FaChevronRight, FaChevronLeft, FaCaretDown,
  FaSearch, FaFilter, FaTags, FaHeart,
  FaShoppingCart, FaPercentage
} from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const [categories, setCategories] = useState([
    {
      name: "Woman's Fashion",
      icon: "👗",
      subCategories: ["Dresses", "Tops", "Accessories"],
      trending: ["Summer Collection", "New Arrivals"]
    },
    {
      name: "Men's Fashion",
      icon: "👔",
      subCategories: ["Shirts", "Pants", "Jackets"],
      trending: ["Casual Wear", "Formal Suits"]
    },
    {
      name: "Electronics",
      icon: "🖥️",
      subCategories: ["Phones", "Laptops", "Accessories"],
      trending: ["Latest Gadgets", "Smart Home"]
    },
    {
      name: "Home & Lifestyle",
      icon: "🏠",
      subCategories: ["Furniture", "Decor", "Kitchen"],
      trending: ["Home Office", "Minimalist Design"]
    },
    {
      name: "Medicine",
      icon: "💊",
      subCategories: ["Prescription", "OTC", "Wellness"],
      trending: ["Immunity Boosters", "Wellness Kits"]
    },
    {
      name: "Sports & Outdoor",
      icon: "⚽",
      subCategories: ["Equipment", "Apparel", "Footwear"],
      trending: ["Fitness Gear", "Outdoor Adventure"]
    },
    {
      name: "Baby's & Toys",
      icon: "🧸",
      subCategories: ["Clothing", "Toys", "Gear"],
      trending: ["Educational Toys", "Baby Essentials"]
    },
    {
      name: "Groceries & Pets",
      icon: "🛒",
      subCategories: ["Food", "Supplies", "Treats"],
      trending: ["Organic Products", "Pet Care"]
    },
    {
      name: "Health & Beauty",
      icon: "💄",
      subCategories: ["Skincare", "Makeup", "Wellness"],
      trending: ["Natural Cosmetics", "Self-Care"]
    }
  ]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [quickActions, setQuickActions] = useState([
    {
      icon: <FaHeart className="text-red-500" />,
      title: "Wishlist",
      action: () => window.location.href = "/wishlist"
    },
    {
      icon: <FaShoppingCart className="text-blue-500" />,
      title: "Cart",
      action: () => window.location.href = "/cart"
    },
    {
      icon: <FaPercentage className="text-green-500" />,
      title: "Deals",
      action: () => window.location.href = "/deals"
    }
  ]);

  const slides = [
    {
      id: 1,
      Brand: "Trending item",
      image: "/images/banner-1.jpg",
      title: "Women's latest fashion sale",
      tag: "starting at $ 20.00",
    },
    {
      id: 2,
      Brand: "Trending accessories",
      image: "/images/banner-2.jpg",
      title: "Modern sunglasses",
      tag: "starting at $ 15.00",
    },
    {
      id: 3,
      Brand: "Sale Offer",
      image: "/images/banner-3.jpg",
      title: "New fashion summer sale",
      tag: "starting at $ 29.00",
    },
  ];

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const categoryVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.2 } }
  };

  return (
    <div className="flex flex-col md:flex-row h-[75vh] bg-gray-100">
      {/* Sidebar Section */}
      <aside className="w-full md:w-1/4 bg-white border-r shadow-lg p-4 md:p-6 relative">
        {/* Mobile Toggle */}
        <div
          className="md:hidden flex justify-center text-3xl mt-2 items-center cursor-pointer px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 transition"
          onClick={() => setIsCategoryOpen(!isCategoryOpen)}
        >
          <FaCaretDown
            className={`transition-transform duration-300 ${
              isCategoryOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </div>

        {/* Categories List */}
        <AnimatePresence>
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`mt-4 md:mt-0 space-y-4 transition-all duration-500 overflow-hidden ${
              isCategoryOpen ? "max-h-screen" : "max-h-0"
            } md:max-h-screen`}
          >
            {filteredCategories.map((category, index) => (
              <motion.li
                key={index}
                variants={categoryVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="relative group"
              >
                <div
                  className="flex justify-between items-center text-gray-700 font-medium text-sm md:text-base hover:text-purple-600 transition cursor-pointer"
                  onClick={() =>
                    setActiveCategory(
                      activeCategory === category.name ? null : category.name
                    )
                  }
                >
                  <div className="flex items-center">
                    <span className="mr-2">{category.icon}</span>
                    <Link href="/Wishlist">{category.name}</Link>
                  </div>
                  <FaChevronRight
                    className={`text-gray-400 ml-4 group-hover:text-purple-600 transition-transform ${
                      activeCategory === category.name
                        ? "rotate-90"
                        : "rotate-0"
                    }`}
                  />
                </div>

                {/* Subcategories */}
                <AnimatePresence>
                  {activeCategory === category.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="pl-6 mt-2 space-y-2 text-sm text-gray-600"
                    >
                      <div>
                        <h4 className="font-semibold text-gray-700 mb-1">
                          Subcategories
                        </h4>
                        {category.subCategories.map((sub, subIndex) => (
                          <motion.li
                            key={subIndex}
                            whileHover={{ x: 10 }}
                            className="hover:text-purple-600 transition cursor-pointer"
                          >
                            <Link href="/Wishlist">{sub}</Link>
                          </motion.li>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </aside>
      {/* Slider Section */}
        <main className="w-full md:w-3/4 flex items-center justify-center bg-white relative">
        <div className="w-full z-20 h-[60vh] md:h-[70vh] relative overflow-hidden">
          {/* Slides */}
          {slides.map((slide, index) => (
            <div
              key={slide.id}
              className={`absolute inset-0 w-full h-full transition-transform duration-700 ease-in-out ${
                index === currentSlide ? "translate-x-0" : "translate-x-full"
              }`}
              style={{
                transform: `translateX(${100 * (index - currentSlide)}%)`,
              }}
            >
              {/* Full Image Display with Right-Side Focus */}
              <Image
                src={slide.image}
                alt={slide.title}
                layout="fill"
                objectFit="cover"
                objectPosition="90% center"
                className="md:object-center" // Adjust object position for mobile
              />

              {/* Text Overlay */}
              <div className="absolute inset-x-0 bottom-4 md:bottom-1/4 flex flex-col justify-center items-center md:items-start text-center md:text-left px-4 md:px-16 bg-gradient-to-r  to-transparent">
                <h2 className="text-pink-600 font-bold text-sm md:text-lg uppercase tracking-widest mb-2 animate-fadeIn">
                  {slide.Brand}
                </h2>
                <h1 className="text-white font-extrabold text-3xl md:text-5xl leading-tight mb-4 drop-shadow-md">
                  <span className="block">
                    {slide.title.split(" ").slice(0, 2).join(" ")}
                  </span>
                  <span className="block">
                    {slide.title.split(" ").slice(2).join(" ")}
                  </span>
                </h1>
                <h2 className="text-gray-200 font-semibold text-xl md:text-2xl mb-6 animate-fadeIn">
                  <strong className="text-yellow-400 text-2xl md:text-3xl">
                    ${slide.tag.split(" ")[3]}
                  </strong>
                </h2>
                <button className="px-4 py-2 text-xs md:text-base bg-pink-500 text-white rounded-full shadow-md transition transform hover:bg-pink-700 hover:scale-105 hover:shadow-lg animate-bounce">
                  <Link href="/Wishlist"> Shop Now →</Link>
                </button>
              </div>
            </div>
          ))}

          {/* Slider Controls */}
          <button
            onClick={handlePrevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-200 transition z-10"
            aria-label="Previous Slide"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={handleNextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white text-gray-700 p-2 rounded-full shadow-md hover:bg-gray-200 transition z-10"
            aria-label="Next Slide"
          >
            <FaChevronRight />
          </button>

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer transition ${
                  currentSlide === index ? "bg-purple-600" : "bg-gray-400"
                }`}
                onClick={() => setCurrentSlide(index)}
              ></div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Sidebar;
