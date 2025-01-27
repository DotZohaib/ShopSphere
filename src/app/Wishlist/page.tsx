// /* eslint-disable @typescript-eslint/no-explicit-any */
// "use client";

// import { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import toast, { Toaster } from "react-hot-toast";
// import NProgress from "nprogress";
// import "nprogress/nprogress.css";
// import { client } from "../sanity/lib/client";
// import { groq } from "next-sanity";

// interface Product {
//   _id: string;
//   name: string;
//   description: string;
//   price: number;
//   originalPrice: number;
//   image: string;
//   category: string;
// }

// const Wishlist = () => {
//   const [products, setProducts] = useState<Product[]>([]);
//   const [wishlist, setWishlist] = useState<Product[]>([]);

//   // Fetch products from Sanity
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const query = groq`*[_type == "selling"] {
//           _id,
//           name,
//           description,
//           price,
//           originalPrice,
//           "image": image.asset->url,
//           category
//         }`;

//         const fetchedProducts: Product[] = await client.fetch(query);
//         setProducts(fetchedProducts);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//         toast.error("Failed to load products");
//       }
//     };

//     fetchProducts();
//   }, []);

//   // Simulate loading action
//   const simulateLoading = (callback: () => void, message: string) => {
//     NProgress.start();
//     setTimeout(() => {
//       callback();
//       NProgress.done();
//       toast.success(message);
//     }, 1000);
//   };

//   // Add to wishlist
//   const addToWishlist = (product: Product) => {
//     simulateLoading(() => {
//       if (!wishlist.find((item) => item._id === product._id)) {
//         setWishlist([...wishlist, product]);
//       }
//     }, `${product.name} added to wishlist`);
//   };

//   // Remove from wishlist
//   const removeFromWishlist = (id: string) => {
//     simulateLoading(() => {
//       setWishlist(wishlist.filter((item) => item._id !== id));
//     }, "Removed from wishlist");
//   };

//   // Add to cart (integrate with Sanity cart)
//   const addToCart = async (product: Product) => {
//     try {
//       const cartQuery = groq`*[_type == "cart"][0]`;
//       const cart = await client.fetch(cartQuery);

//       const cartDocument = cart || await client.create({ _type: "cart", items: [] });

//       const existingItemIndex = cartDocument.items.findIndex(
//         (item: any) => item.product._ref === product._id
//       );

//       const updatedItems = existingItemIndex >= 0
//         ? cartDocument.items.map((item: any, index: number) =>
//             index === existingItemIndex
//               ? { ...item, quantity: item.quantity + 1 }
//               : item
//           )
//         : [
//             ...cartDocument.items,
//             {
//               _type: "cartItem",
//               quantity: 1,
//               product: { _type: "reference", _ref: product._id },
//             },
//           ];

//       await client
//         .patch(cartDocument._id)
//         .set({ items: updatedItems })
//         .commit();

//       toast.success(`${product.name} added to cart`);
//     } catch (error) {
//       console.error("Error adding to cart:", error);
//       toast.error("Failed to add to cart");
//     }
//   };

//   return (
//     <div className="container mx-auto p-6 space-y-10">
//       <Toaster position="top-right" reverseOrder={false} />

//       {/* Products Section */}
//       <section>
//         <h1 className="text-3xl font-bold mb-4">Products</h1>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {products.map((product) => (
//             <div key={product._id} className="border rounded-lg p-4 shadow-lg hover:shadow-2xl transition">
//               <Image
//                 src={product.image}
//                 alt={product.name}
//                 width={400}
//                 height={400}
//                 className="w-full h-80 object-cover rounded-md mb-4"
//               />
//               <h3 className="text-xl font-bold">{product.name}</h3>
//               <p className="text-gray-600">{product.description}</p>
//               <div className="flex justify-between items-center mt-2">
//                 <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>
//                 <span className="line-through text-gray-500">${product.originalPrice.toFixed(2)}</span>
//               </div>
//               <div className="flex items-center space-x-2 mt-4">
//                 <button
//                   onClick={() => addToWishlist(product)}
//                   className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
//                 >
//                   Wishlist
//                 </button>
//                 <button
//                   onClick={() => addToCart(product)}
//                   className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
//                 >
//                   Add to Cart
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Wishlist Section */}
//       <section>
//         <h2 className="text-3xl font-bold mb-4">Wishlist</h2>
//         {wishlist.length > 0 ? (
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//             {wishlist.map((product) => (
//               <div key={product._id} className="border rounded-lg p-4 shadow-lg hover:shadow-2xl transition">
//                 <Image
//                   src={product.image}
//                   alt={product.name}
//                   width={400}
//                   height={400}
//                   className="w-full h-80 object-cover rounded-md mb-4"
//                 />
//                 <h3 className="text-xl font-bold">{product.name}</h3>
//                 <p className="text-gray-600">{product.description}</p>
//                 <p className="text-green-600 font-bold mt-2">${product.price.toFixed(2)}</p>
//                 <div className="flex space-x-2 mt-4">
//                   <button
//                     onClick={() => removeFromWishlist(product._id)}
//                     className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                   >
//                     Remove
//                   </button>
//                   <Link href="/Cart" className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
//                     Buy
//                   </Link>
//                 </div>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p className="text-gray-600">Your wishlist is empty.</p>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Wishlist;

import React from 'react'

const Wishlist = () => {
  return (
    <div>Wishlist</div>
  )
}

export default Wishlist
