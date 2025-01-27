/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useEffect, useCallback } from "react";
import { client } from "../../sanity/lib/client";
import { groq } from "next-sanity";
import toast, { Toaster } from "react-hot-toast";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CheckCircle,
  CreditCard,
  ShoppingCart,
  Info,
  Tag,
  Truck,
  Lock,
  MapPin,
} from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  discount?: number;
  image: string;
  description: string;
  category: string;
  stockQuantity: number;
}

interface CartItem {
  product: Product;
  quantity: number;
}

const Checkout: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    cardType: "",
    cardHolderName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCartItems = async () => {
      const cartQuery = groq`
        *[_type == "cart"][0] {
          items[] {
            quantity,
            "product": product->{
              _id,
              name,
              price,
              discount,
              description,
              category,
              stock,
              "image": image.asset->url
            }
          }
        }
      `;

      try {
        const cartData = await client.fetch(cartQuery);
        setCartItems(cartData?.items || []);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
        toast.error("Failed to load cart items");
      }
    };

    fetchCartItems();
  }, []);

  const calculateDiscountedPrice = (price: number, discount?: number) => {
    return discount ? price - (price * discount) / 100 : price;
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

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Validate all required fields
    Object.entries(formData).forEach(([key, value]) => {
      if (!value.trim()) {
        errors[key] =
          `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
      }
    });

    // Additional specific validations
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Invalid email address";
    }

    // Credit card validations
    const cardNumberRegex = /^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
    if (!cardNumberRegex.test(formData.cardNumber)) {
      errors.cardNumber = "Invalid card number (Format: XXXX XXXX XXXX XXXX)";
    }

    if (!/^\d{3}$/.test(formData.cvv)) {
      errors.cvv = "Invalid CVV (3 digits)";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    // Format card number with spaces
    if (name === "cardNumber") {
      const formattedValue = value
        .replace(/\s/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ");

      setFormData((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    // Clear individual field errors
    if (formErrors[name]) {
      const newErrors = { ...formErrors };
      delete newErrors[name];
      setFormErrors(newErrors);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please correct the errors in the form");
      return;
    }

    setIsLoading(true);

    try {
      const orderData = {
        ...formData,
        items: cartItems,
        total: calculateTotal(),
        createdAt: new Date(),
      };

      await client.create({
        _type: "order",
        ...orderData,
      });

      setIsOrderPlaced(true);
      toast.success("Order placed successfully!");
    } catch (error) {
      console.error("Order submission failed:", error);
      toast.error("Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  const renderCartItems = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <ShoppingCart className="mr-2" /> Order Details
      </h2>
      {cartItems.map((item) => (
        <div
          key={item.product._id}
          className="border rounded-lg p-4 mb-4 shadow-sm flex"
        >
          <Image
            src={item.product.image}
            alt={item.product.name}
            width={100}
            height={100}
            className="mr-4 rounded"
          />
          <div className="flex-grow">
            <h3 className="font-bold text-lg">{item.product.name}</h3>
            <p className="text-gray-600">
              Quantity: {item.quantity} | Price: $
              {(
                calculateDiscountedPrice(
                  item.product.price,
                  item.product.discount
                ) * item.quantity
              ).toFixed(2)}
              {item.product.discount && (
                <span className="ml-2 text-green-600">
                  ({item.product.discount}% OFF)
                </span>
              )}
            </p>
          </div>
        </div>
      ))}
      <div className="mt-4 text-right font-bold text-xl">
        Total: ${calculateTotal().toFixed(2)}
      </div>
    </div>
  );

  const renderCheckoutForm = () => (
    <div>
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <CreditCard className="mr-2" /> Checkout
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Personal Information */}
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleInputChange}
              required
              className={`w-full border p-2 rounded ${formErrors.firstName ? "border-red-500" : ""}`}
            />
            {formErrors.firstName && (
              <p className="text-red-500 text-sm">{formErrors.firstName}</p>
            )}
          </div>
          <div>
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleInputChange}
              required
              className={`w-full border p-2 rounded ${formErrors.lastName ? "border-red-500" : ""}`}
            />
            {formErrors.lastName && (
              <p className="text-red-500 text-sm">{formErrors.lastName}</p>
            )}
          </div>
        </div>

        {/* Contact & Address */}
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleInputChange}
            required
            className={`w-full border p-2 rounded ${formErrors.email ? "border-red-500" : ""}`}
          />
          {formErrors.email && (
            <p className="text-red-500 text-sm">{formErrors.email}</p>
          )}
        </div>

        {/* Payment Details */}
        <div className="grid md:grid-cols-2 gap-4">
          <select
            name="cardType"
            value={formData.cardType}
            onChange={handleInputChange}
            // required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Card Type</option>
            <option value="visa">Visa</option>
            <option value="mastercard">Mastercard</option>
            <option value="amex">American Express</option>
          </select>
          <input
            type="text"
            name="cardHolderName"
            placeholder="Cardholder Name"
            value={formData.cardHolderName}
            onChange={handleInputChange}
            // required
            className="w-full border p-2 rounded"
          />
        </div>

        {/* Card Number */}
        <div>
          <input
            type="text"
            name="cardNumber"
            placeholder="Card Number (XXXX XXXX XXXX XXXX)"
            // value={formData.cardNumber}
            onChange={handleInputChange}
            // required
            maxLength={19}
            className={`w-full border p-2 rounded ${formErrors.cardNumber ? "border-red-500" : ""}`}
          />
          {formErrors.cardNumber && (
            <p className="text-red-500 text-sm">{formErrors.cardNumber}</p>
          )}
        </div>

        {/* Expiry & CVV */}
        <div className="grid md:grid-cols-3 gap-4">
          <select
            name="expiryMonth"
            // value={formData.expiryMonth}
            onChange={handleInputChange}
            // required
            className="w-full border p-2 rounded"
          >
            <option value="">Month</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                {String(i + 1).padStart(2, "0")}
              </option>
            ))}
          </select>
          <select
            name="expiryYear"
            // value={formData.expiryYear}
            onChange={handleInputChange}
            // required
            className="w-full border p-2 rounded"
          >
            <option value="">Year</option>
            {Array.from({ length: 10 }, (_, i) => {
              const year = new Date().getFullYear() + i;
              return (
                <option key={year} value={year}>
                  {year}
                </option>
              );
            })}
          </select>
          <input
            type="text"
            name="cvv"
            placeholder="CVV"
            // value={formData.cvv}
            onChange={handleInputChange}
            maxLength={3}
            // required
            className={`w-full border p-2 rounded ${formErrors.cvv ? "border-red-500" : ""}`}
          />
          {formErrors.cvv && (
            <p className="text-red-500 text-sm">{formErrors.cvv}</p>
          )}
        </div>

        <div className="flex items-center text-sm text-gray-600">
          <Lock className="mr-2 text-blue-500" size={16} />
          Secure checkout with SSL encryption
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 text-white p-3 rounded hover:bg-blue-600 flex items-center justify-center"
        >
          {isLoading ? "Processing..." : "Complete Order"}
        </button>
      </form>
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <Toaster position="top-right" />
      <div className="grid md:grid-cols-2 gap-8">
        {renderCartItems()}
        {renderCheckoutForm()}
      </div>
    </div>
  );
};

export default Checkout;
