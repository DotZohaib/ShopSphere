"use client"
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { client } from "../../sanity/lib/client";
import { groq } from "next-sanity";
import toast from "react-hot-toast";

interface Product {
  _id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
  stock: number;
  category: string;
}

interface CartItem {
  _id: string;
  product: Product;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [cartDocumentId, setCartDocumentId] = useState<string | null>(null);

 useEffect(() => {
   const fetchCart = async () => {
     const cartQuery = groq`
      *[_type == "cart"][0] {
        _id,
        items[]{
          quantity,
          "product": product->{
            _id,
            name,
            price,
            originalPrice,
            discount,
            "image": coalesce(image.asset->url, "https://via.placeholder.com/300"),
            stock,
            category
          }
        }
      }
    `;

     try {
       const cartData = await client.fetch(cartQuery);

       if (cartData && cartData.items) {
         console.log("Cart data:", cartData);
         setCartDocumentId(cartData._id);
         setCartItems(cartData.items.filter((item) => item.product));
       } else {
         // Create a new cart if none exists
         const newCart = await client.create({
           _type: "cart",
           items: [],
         });
         setCartDocumentId(newCart._id);
         setCartItems([]);
       }
     } catch (error) {
       console.error("Failed to fetch/create cart:", error);
       toast.error("Failed to load cart");
     }
   };

   fetchCart();
 }, []);

  // In your component (FlashSales.tsx or Cart.tsx)
const safeImageUrl = (imageUrl?: string) =>
  imageUrl || "https://via.placeholder.com/300";

  const calculateDiscountedPrice = (price: number, discount?: number) => {
    return discount ? price - (price * discount) / 100 : price;
  };

  const updateCartQuantity = async (
    productId: string,
    newQuantity: number,
    productStock: number
  ) => {
    if (newQuantity < 1 || newQuantity > productStock) {
      toast.error(`Quantity must be between 1 and ${productStock}`);
      return;
    }

    const updatedItems = cartItems.map((item) =>
      item.product._id === productId ? { ...item, quantity: newQuantity } : item
    );

    try {
      await client
        .patch(cartDocumentId!)
        .set({
          items: updatedItems.map((item) => ({
            _type: "cartItem",
            quantity: item.quantity,
            product: {
              _type: "reference",
              _ref: item.product._id,
            },
          })),
        })
        .commit();

      setCartItems(updatedItems);
      toast.success("Cart updated");
    } catch (error) {
      console.error("Failed to update cart:", error);
      toast.error("Failed to update cart");
    }
  };

  const removeFromCart = async (productId: string) => {
    const updatedItems = cartItems.filter(
      (item) => item.product._id !== productId
    );

    try {
      await client
        .patch(cartDocumentId!)
        .set({
          items: updatedItems.map((item) => ({
            _type: "cartItem",
            quantity: item.quantity,
            product: {
              _type: "reference",
              _ref: item.product._id,
            },
          })),
        })
        .commit();

      setCartItems(updatedItems);
      toast.success("Item removed from cart");
    } catch (error) {
      console.error("Failed to remove item:", error);
      toast.error("Failed to remove item");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) =>
        total +
        calculateDiscountedPrice(item.product.price, item.product.discount) *
          item.quantity,
      0
    );
  };



  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cartItems.map((item) => (
          <div
            key={item.product._id}
            className="flex items-center mb-4 border-b pb-4"
          >
            <Image
              src={safeImageUrl(item.product.image)}
              alt={item.product.name}
              width={100}
              height={100}
              className="mr-4"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item.product.name}</h3>
              <p className="text-gray-600">
                $
                {calculateDiscountedPrice(
                  item.product.price,
                  item.product.discount
                ).toFixed(2)}{" "}
                {item.product.discount && (
                  <span className="line-through text-sm ml-2">
                    ${item.product.price.toFixed(2)}
                  </span>
                )}
              </p>
              <div className="flex items-center mt-2">
                <button
                  onClick={() =>
                    updateCartQuantity(
                      item.product._id,
                      item.quantity - 1,
                      item.product.stock
                    )
                  }
                  className="px-2 bg-gray-200"
                >
                  -
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() =>
                    updateCartQuantity(
                      item.product._id,
                      item.quantity + 1,
                      item.product.stock
                    )
                  }
                  className="px-2 bg-gray-200"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.product._id)}
                  className="ml-4 text-red-500"
                >
                  Remove
                </button>
              </div>
            </div>
            <div className="font-bold">
              $
              {(
                calculateDiscountedPrice(
                  item.product.price,
                  item.product.discount
                ) * item.quantity
              ).toFixed(2)}
            </div>
          </div>
        ))
      )}

      {cartItems.length > 0 && (
        <div className="mt-6 text-right">
          <h3 className="text-xl font-bold">
            Total: ${calculateTotal().toFixed(2)}
          </h3>
          <Link href="/Checkout">
            <button className="mt-4 bg-blue-500 text-white px-6 py-2 rounded">
              Proceed to Checkout
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
