"use client";

import { useRef } from "react";
import { CiMobile3 } from "react-icons/ci";
import { FaLaptopCode, FaCameraRetro, FaHeadphones } from "react-icons/fa";
import { BsSmartwatch } from "react-icons/bs";
import { IoLogoGameControllerB } from "react-icons/io";

interface Product {
  id: number;
  name: string;
  icon: JSX.Element;
}

const Category = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const products: Product[] = [
    {
      id: 1,
      name: "Phones",
      icon: <CiMobile3 className="text-5xl text-red-500 mx-auto" />,
    },
    {
      id: 2,
      name: "Computers",
      icon: <FaLaptopCode className="text-5xl text-blue-500 mx-auto" />,
    },
    {
      id: 3,
      name: "SmartWatch",
      icon: <BsSmartwatch className="text-5xl text-green-500 mx-auto" />,
    },
    {
      id: 4,
      name: "Camera",
      icon: <FaCameraRetro className="text-5xl text-purple-500 mx-auto" />,
    },
    {
      id: 5,
      name: "HeadPhones",
      icon: <FaHeadphones className="text-5xl text-yellow-500 mx-auto" />,
    },
    {
      id: 6,
      name: "Gaming",
      icon: <IoLogoGameControllerB className="text-5xl text-orange-500 mx-auto" />,
    },
  ];

  return (
    <div className="container mx-auto p-4 mt-0 md:mt-20">
      {/* Header Section */}
      <div className="flex items-center gap-3">
        <span className="bg-red-600 w-3 h-7"></span>
        <h3 className="text-xl font-bold mb-2 text-red-700">Today&apos;s</h3>
      </div>

      <div className="flex space-x-2 text-center mb-4">
        <h2 className="text-2xl font-bold md:ml-6 md:mr-14 mb-2">
          Browse By Category
        </h2>
      </div>

      {/* Products Section */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6"
        ref={scrollRef}
      >
        {products.map((product) => (
          <div
            key={product.id}
            className="relative border hover:bg-purple-300 p-4 rounded-md shadow-md hover:shadow-lg transition-shadow group flex-shrink-0"
          >
            {/* Render Icon */}
            <div className="relative h-10 w-full cursor-pointer mb-4 flex justify-center items-center">
              {product.icon}
            </div>

            {/* Product Name */}
            <h3 className="text-lg font-bold cursor-pointer text-center truncate">
              {product.name}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
