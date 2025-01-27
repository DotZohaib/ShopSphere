/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useState } from "react";
import {
  FaSearch,
  FaHeart,
  FaShoppingCart,
  FaBars,
  FaTimes,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";
import {
  ClerkProvider,
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Link from "next/link";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="sticky top-0 z-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-4 md:px-8 py-3 bg-white bg-opacity-70 backdrop-blur-lg shadow-md border-b">
        {/* Brand Name */}
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-bold text-gray-800">ZenZone</h2>
        </div>

        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-full max-w-md">
          <input
            type="text"
            placeholder="Search for products..."
            className="bg-transparent outline-none flex-grow text-gray-700 text-sm md:text-base"
          />
          <FaSearch className="text-gray-500 text-lg cursor-pointer hover:text-purple-700 transition-transform transform hover:scale-110" />
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-4">
          <FaHeart className="text-gray-700 text-lg hidden md:block cursor-pointer hover:text-purple-700 transition-transform transform hover:scale-110" />
          <FaShoppingCart className="text-gray-700 text-lg hidden md:block cursor-pointer hover:text-purple-700 transition-transform transform hover:scale-110" />
          <SignedOut>
            <SignInButton>
              <button className="px-4 py-2 bg-purple-600 text-white rounded-full text-sm md:text-base hover:bg-purple-700 transition">
                Sign In
              </button>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <button
            className="text-gray-800 block text-2xl md:hidden focus:outline-none"
            onClick={toggleSidebar}
          >
            <FaBars />
          </button>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-3/4 bg-white bg-opacity-90 backdrop-blur-lg shadow-lg transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 z-50`}
      >
        <div className="flex flex-col h-full p-4">
          {/* Close Button */}
          <button
            className="self-end text-gray-800 text-lg focus:outline-none"
            onClick={toggleSidebar}
          >
            <FaTimes />
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-4 my-4">
            <SignedIn/>
            <SignedOut>
              <p className="text-gray-600">Sign in to access your profile</p>
            </SignedOut>
          </div>

          {/* Sidebar Links */}
          <div className="flex flex-col gap-4 text-gray-700">
            <Link
              href="/"
              className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-md hover:bg-purple-100"
              onClick={toggleSidebar}
            >
              <FaUserCircle className="text-lg" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/products"
              className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-md hover:bg-purple-100"
              onClick={toggleSidebar}
            >
              <FaShoppingCart className="text-lg" />
              <span>Products</span>
            </Link>
            <Link
              href="/wishlist"
              className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-md hover:bg-purple-100"
              onClick={toggleSidebar}
            >
              <FaHeart className="text-lg" />
              <span>Wishlist</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 px-4 py-2 bg-gray-100 rounded-md hover:bg-purple-100"
              onClick={toggleSidebar}
            >
              <FaSignOutAlt className="text-lg" />
              <span>Settings</span>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
};

export default Navbar;
