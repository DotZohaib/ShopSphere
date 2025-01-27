"use client"
// Import necessary modules and hooks

import { useState } from 'react';
import { FaUserCircle, FaShoppingCart, FaCalendarAlt, FaStar, FaSignOutAlt } from 'react-icons/fa';
import Image from 'next/image';
import Link from 'next/link';
import { CiUser } from "react-icons/ci";

const UserProfilePopover = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block text-left">
      {/* Button to toggle popover */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
        type="button"
        className=""
      >
        <CiUser className='mt-2 text-sm md:text-xl ' />
      </button>

      {/* Popover card */}
      {isOpen && (
        <div
          className="absolute right-0 z-50 mt-2 w-64 bg-white bg-opacity-70 backdrop-blur-md border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:bg-opacity-70 dark:border-gray-600"
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="p-4">
            {/* Profile section */}
            <div className="flex items-center justify-between mb-4">
              <Link href="#">
                <Image
                  className="w-12 h-12 rounded-full border border-gray-300"
                  src="/images/IMG_1292.jpg"
                  alt="ZOHAIB"
                  width={100}
                  height={100}
                />
              </Link>
              <button
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                Follow
              </button>
            </div>

            <p className="text-base font-semibold leading-none text-gray-900 dark:text-white">
              <Link href="#">ZOHAIB ALI</Link>
            </p>

            {/* Links with icons */}
            <ul className="mt-4 space-y-2">
              <li className="flex items-center space-x-2">
                <FaUserCircle className="text-blue-500" />
                <Link href="#" className="text-gray-700 dark:text-gray-300 hover:underline">
                  Manage My Account
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <FaShoppingCart className="text-green-500" />
                <Link href="#" className="text-gray-700 dark:text-gray-300 hover:underline">
                  My Orders
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <FaCalendarAlt className="text-purple-500" />
                <Link href="#" className="text-gray-700 dark:text-gray-300 hover:underline">
                  My Cancellation
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <FaStar className="text-yellow-500" />
                <Link href="#" className="text-gray-700 dark:text-gray-300 hover:underline">
                  My Reviews
                </Link>
              </li>
              <li className="flex items-center space-x-2">
                <FaSignOutAlt className="text-red-500" />
                <Link href="#" className="text-gray-700 dark:text-gray-300 hover:underline">
                  Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfilePopover;