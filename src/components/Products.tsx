/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "../sanity/lib/client";
import { sellingQueries } from "../sanity/lib/queries";
import {
  Heart,
  ShoppingCart,
  Star,
  Expand
} from "lucide-react";
import { groq } from "next-sanity";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { productQueries } from "../sanity/lib/queries";

interface Product {
  _id: string;
  sellingId: string;
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  rating: number;
  reviews: number;
  image: string;
  colors?: string[];
  sizes?: string[];
  category: string;
  stock: number;
}

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const scrollRef = useRef<HTMLDivElement>(null);




  const router = useRouter();

 useEffect(() => {
   const fetchProducts = async () => {
     try {
       const query = groq`*[_type == "selling"] {
          _id,
          sellingId,
          name,
          price,
          originalPrice,
          discount,
          rating,
          reviews,
          stock,
          category,
          "image": image.asset->url,
          colors,
          sizes
        }`;

       const data: Product[] = await client.fetch(query);
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
      const verify = product._id || product.sellingId;
      if (!verify) {
        throw new Error("Product ID (_id) is missing.");
      }

      const cartQuery = groq`*[_type == "cart"][0]`;
      const cart = await client.fetch(cartQuery);

      const cartDocument =
        cart || (await client.create({ _type: "cart", items: [] }));

      console.log("Existing cart document:", cartDocument); // Debug log

      const existingItemIndex = cartDocument.items.findIndex(
        (item: any) => item.product._ref === product._id
      );

      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = cartDocument.items.map((item: any, index: number) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        updatedItems = [
          ...cartDocument.items,
          {
            _type: "cartItem",
            quantity: 1,
            product: { _type: "reference", _ref: product._id },
          },
        ];
      }

      console.log("Updated cart items:", updatedItems); // Debug log

      await client
        .patch(cartDocument._id)
        .set({ items: updatedItems })
        .commit();

      console.log("Cart updated successfully in Sanity."); // Debug log
      toast.success(`${product.name} added to cart.`);
      router.push("/Cart"); // Redirect to cart page
    } catch (error) {
      console.error("Error in addToCart:", error);
      toast.error("Failed to add item to cart.");
    }
  };


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data: Product[] = await client.fetch(sellingQueries.getAll);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = filter === "All"
    ? products
    : products.filter(product => product.category === filter);

  const categories = ["All", ...new Set(products.map(p => p.category))];



  return (
    <div className="container mx-auto p-4 mt-0 md:mt-20">
      {/* Category Filter */}
      <div className="flex overflow-x-auto mb-6 space-x-4">
        {categories.map((category, index) => (
          <button
            key={`${category}-${index}`}
            onClick={() => setFilter(category)}
            className={`
              px-4 py-2 rounded-full transition-all duration-300
              ${
                filter === category
                  ? "bg-red-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-red-100"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredProducts.map((product, index) => (
            <motion.div
              key={product._id || product.sellingId || index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
                {/* Discount Badge */}
                <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  -{product.discount}%
                </div>

                {/* Stock Indicator */}
                <div
                  className={`
                  absolute top-3 right-3 z-10 text-xs px-2 py-1 rounded
                  ${
                    product.stock > 10
                      ? "bg-green-500 text-white"
                      : product.stock > 0
                        ? "bg-yellow-500 text-black"
                        : "bg-red-500 text-white"
                  }
                `}
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
                      className="flex-1 flex items-center justify-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      <ShoppingCart size={16} className="mr-2" />
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
                    <ShoppingCart size={20} className="mr-2" />
                    <Link href="/Cart">Add to Cart</Link>
                  </button>
                  <button className="flex-1 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center">
                    <Heart size={20} className="mr-2" />{" "}
                    <Link href="/Wishlist">Add to Wishlist</Link>
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

export default Product;
