/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Expand, Heart, ShoppingCart, Star } from "lucide-react";
import { groq } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { client } from "../sanity/lib/client";
import { productQueries } from "../sanity/lib/queries";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface Product {
  _id: string;
  productId: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews?: number;
  image: string;
  colors?: string[];
  sizes?: string[];
  category?: string;
  stock: number;
}

const FlashSales = () => {
  const [timer, setTimer] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56
  });
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Fetch products on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      const query = groq`*[_type == "product"] {
        _id,
        productId,
        name,
        price,
        originalPrice,
        discount,
        rating,
        stock,
        "image": image.asset->url
      }`;

      try {
        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (product: Product) => {
    try {
      const verify = product._id || product.productId;
      if (!verify) {
        throw new Error("Product ID is missing");
      }

      const cartQuery = groq`*[_type == "cart"][0]`;
      const cart = await client.fetch(cartQuery);

      const cartDocument = cart || await client.create({ _type: "cart", items: [] });

      const existingItemIndex = cartDocument.items?.findIndex(
        (item: any) => item.product._ref === product._id
      );

      const updatedItems = existingItemIndex >= 0
        ? cartDocument.items.map((item: any, index: number) =>
            index === existingItemIndex
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [
            ...(cartDocument.items || []),
            {
              _type: "cartItem",
              quantity: 1,
              product: { _type: "reference", _ref: product._id }
            }
          ];

      await client
        .patch(cartDocument._id)
        .set({ items: updatedItems })
        .commit();

      toast.success(`${product.name} added to cart`);
      router.push("/Cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart");
    }
  };

  // Timer logic
  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimer((prev) => {
        let { days, hours, minutes, seconds } = prev;

        if (--seconds < 0) {
          seconds = 59;
          if (--minutes < 0) {
            minutes = 59;
            if (--hours < 0) {
              hours = 23;
              days = Math.max(--days, 0);
            }
          }
        }

        return {
          days: Math.max(days, 0),
          hours: Math.max(hours, 0),
          minutes: Math.max(minutes, 0),
          seconds
        };
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = filter === "All"
    ? products
    : products.filter((product) => product.category === filter);

  return (
    <div className="container mx-auto p-4 mt-0 md:mt-20">
      {/* Header Section */}
      <motion.div
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        className="flex flex-col md:flex-row justify-between items-center"
      >
        <div className="flex gap-3 items-center mb-5 md:mb-14">
          <span className="bg-red-600 w-3 h-7"></span>
          <h3 className="text-xl font-bold text-red-700">
            Today is Flash Sales
          </h3>
        </div>

        <div className="flex space-x-2 mb-10">
          {Object.entries(timer).map(([key, value]) => (
            <motion.div
              key={key}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center"
            >
              <span className="text-2xl font-bold text-red-600">{value}</span>
              <span className="text-xs uppercase">{key}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="flex  space-x-4 mb-8 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <AnimatePresence>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product.productId || product._id || index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative group flex-shrink-0 w-64"
            >
              <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  -{product.discount}%
                </div>

                {/* Stock Indicator */}
                <div
                  className={`absolute top-3 right-3 z-10 text-xs px-2 py-1 rounded ${
                    product.stock > 10
                      ? "bg-green-500 text-white"
                      : product.stock > 0
                        ? "bg-yellow-500 text-black"
                        : "bg-red-500 text-white"
                  }`}
                >
                  {product.stock > 10
                    ? "In Stock"
                    : product.stock > 0
                      ? `Low Stock (${product.stock})`
                      : "Out of Stock"}
                </div>

                {/* Product Image with Zoom on Click */}
                <div
                  onClick={() => handleProductClick(product)}
                  className="relative h-64 w-full cursor-pointer overflow-hidden"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    layout="fill"
                    objectFit="cover"
                    className="group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                    <Expand className="text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>

                {/* Product Details */}
                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">
                    {product.name}
                  </h3>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500 font-bold">
                        ${product.price}
                      </span>
                      <span className="line-through text-gray-500 text-sm">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="ml-1 text-sm">{product.rating}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-between mt-4 space-x-2">
                    <button
                      onClick={() => addToCart(product)}
                      className="flex-1 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center">
                      <ShoppingCart size={20} className="mr-2" />{" "}
                      Add to Cart
                    </button>

                    <button className="flex items-center justify-center bg-gray-200 text-gray-700 p-2 rounded-md hover:bg-gray-300 transition-colors">
                      <Heart size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={closeModal}
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.9 }}
            className="bg-white rounded-lg max-w-4xl w-full mx-4 p-6 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-96 w-full">
                <Image
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-4">
                  {selectedProduct.name}
                </h2>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-500 mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        fill={
                          i < selectedProduct.rating ? "currentColor" : "none"
                        }
                        stroke="currentColor"
                      />
                    ))}
                  </div>
                  <span>({selectedProduct.reviews} reviews)</span>
                </div>
                <div className="flex items-center mb-4">
                  <span className="text-2xl text-red-500 font-bold mr-4">
                    ${selectedProduct.price}
                  </span>
                  <span className="line-through text-gray-500">
                    ${selectedProduct.originalPrice}
                  </span>
                  <span className="ml-4 bg-red-500 text-white px-2 py-1 rounded text-sm">
                    {selectedProduct.discount}% OFF
                  </span>
                </div>
                {selectedProduct.colors && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Available Colors:</h3>
                    <div className="flex space-x-2">
                      {selectedProduct.colors.map((color) => (
                        <div
                          key={color}
                          className="w-8 h-8 rounded-full border"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                  </div>
                )}
                {selectedProduct.sizes && (
                  <div className="mb-4">
                    <h3 className="font-semibold mb-2">Available Sizes:</h3>
                    <div className="flex space-x-2">
                      {selectedProduct.sizes.map((size) => (
                        <button
                          key={size}
                          className="border px-3 py-1 rounded hover:bg-gray-100"
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex space-x-4">
                  <button className="flex-1 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center">
                    <ShoppingCart size={20} className="mr-2" />{" "}
                    <Link href="/Cart">Add to Cart</Link>
                  </button>
                  <button className="flex-1 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center">
                    <Heart size={20} className="mr-2" />
                    <Link href="/Wishlist"> Add to Wishlist</Link>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default FlashSales;
