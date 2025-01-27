/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "../sanity/lib/client";
import { Heart, ShoppingCart, Star, Expand } from "lucide-react";
import { groq } from "next-sanity";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Product {
  _id: string;
  featureId: string;
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

const SellingProduct = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [filter, setFilter] = useState<string>("All");
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const query = groq`*[_type == "feature"] {
          _id,
          featureId,
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

        const data = await client.fetch(query);
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to load products");
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (product: Product) => {
    try {
      const verify = product._id || product.featureId;
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
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setFilter(category)}
            className={`
              px-4 py-2 rounded-full transition-all duration-300
              ${filter === category
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-red-100"
              }
            `}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <div className="border rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 bg-white">
                <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
                  -{product.discount}%
                </div>

                <div className={`
                  absolute top-3 right-3 z-10 text-xs px-2 py-1 rounded
                  ${product.stock > 10
                    ? "bg-green-500 text-white"
                    : product.stock > 0
                    ? "bg-yellow-500 text-black"
                    : "bg-red-500 text-white"
                  }
                `}>
                  {product.stock > 10
                    ? "In Stock"
                    : product.stock > 0
                    ? `Low Stock (${product.stock})`
                    : "Out of Stock"}
                </div>

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

                <div className="p-4">
                  <h3 className="text-lg font-semibold truncate">{product.name}</h3>

                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-red-500 font-bold">${product.price}</span>
                      <span className="line-through text-gray-500 text-sm">
                        ${product.originalPrice}
                      </span>
                    </div>
                    <div className="flex items-center text-yellow-500">
                      <Star size={16} fill="currentColor" />
                      <span className="ml-1 text-sm">{product.rating}</span>
                    </div>
                  </div>

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
            className="bg-white rounded-lg max-w-4xl w-full mx-4 p-6 max-h-[80vh] overflow-y-auto"
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
                <h2 className="text-2xl font-bold mb-4">{selectedProduct.name}</h2>
                <div className="flex items-center mb-4">
                  <div className="flex text-yellow-500 mr-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        fill={i < selectedProduct.rating ? "currentColor" : "none"}
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

               <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
  {/* Add to Cart Button */}
  <button className="flex-1 bg-blue-500 text-white py-3 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center">
    <ShoppingCart size={20} className="mr-2" />
    <Link href="/Cart">Add to Cart</Link>
  </button>
  
  {/* Add to Wishlist Button */}
  <button className="flex-1 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center">
    <Heart size={20} className="mr-2" />
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

export default SellingProduct;
