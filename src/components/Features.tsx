import Image from "next/image";
import { FaTruck, FaHeadset, FaUndo } from "react-icons/fa";
import Link from "next/link";

export default function Features() {
  return (
    <main className="container mx-auto px-6 py-12">
      {/* Featured Section */}
      <section className="text-center mb-16">
      <div className="flex gap-3 md:ml-2">
        <span className="bg-red-600 w-3 h-7"></span>
        <h3 className="text-xl font-bold mb-2 text-red-700">Featured&apos;s</h3>
      </div>

      <div className="flex space-x-2 text-center mb-4">
        <h2 className="text-2xl font-bold  md:ml-6 mb-2">New Arrival</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Large Card */}
          <div className="relative group rounded-lg overflow-hidden">
            <Image
              src="/images/blog-1.jpg" // Replace with the actual image path
              alt="PlayStation 5"
              width={600}
              height={400}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
              <h3 className="text-white text-2xl font-bold">Womens Fall Outfits Fashion</h3>
              <p className="text-gray-300 text-sm mb-4">
              AUTOMET Womens Fall Outfits Fashion Clothes Shackets Flannel Plaid Button Down Long Sleeve Shirts Jackets 2024
              </p>
              <button className="bg-white text-black font-medium px-6 py-2 rounded hover:bg-gray-200">
                <Link href="/Wishlist">Shop Now</Link>
              </button>
            </div>
          </div>

          {/* Right Cards */}
          <div className="grid grid-cols-2 gap-6">
            {/* Card 1 */}
            <div className="relative group rounded-lg overflow-hidden">
              <Image
                src="/images/blog-2.jpg" // Replace with the actual image path
                alt="Women's Collections"
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-semibold">
                NAVISKIN Women is UPF 50+ Sun Protection Long
                </h3>
                <button className="bg-white text-black font-medium px-4 py-1 mt-2 rounded hover:bg-gray-200">
                  <Link href="/Wishlist">Shop Now</Link>
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="relative group rounded-lg overflow-hidden">
              <Image
                src="/images/blog-3.jpg" // Replace with the actual image path
                alt="Speakers"
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-semibold"> Quick Dry Lightweight Hiking Shirts</h3>
                <button className="bg-white text-black font-medium px-4 py-1 mt-2 rounded hover:bg-gray-200">
                  <Link href="/Wishlist">Shop Now</Link>
                </button>
              </div>
            </div>

            {/* Card 3 */}
            <div className="relative group rounded-lg overflow-hidden">
              <Image
                src="/images/blog-4.jpg" // Replace with the actual image path
                alt="Perfume"
                width={300}
                height={200}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                <h3 className="text-white text-lg font-semibold"> Sleeve Shirts Rash Guard Shirts</h3>
                <button className="bg-white text-black font-medium px-4 py-1 mt-2 rounded hover:bg-gray-200">
                  <Link href="/Wishlist">Shop Now</Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
        {/* Feature 1 */}
        <div className="flex flex-col items-center">
          <FaTruck className="text-4xl text-red-500 mb-4" />
          <h3 className="font-bold text-lg">Free and Fast Delivery</h3>
          <p className="text-gray-600 text-sm">
            Free delivery for all orders over $140.
          </p>
        </div>
        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <FaHeadset className="text-4xl text-red-500 mb-4" />
          <h3 className="font-bold text-lg">24/7 Customer Service</h3>
          <p className="text-gray-600 text-sm">
            Friendly 24/7 customer support.
          </p>
        </div>
        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <FaUndo className="text-4xl text-red-500 mb-4" />
          <h3 className="font-bold text-lg">Money Back Guarantee</h3>
          <p className="text-gray-600 text-sm">
            We return money within 30 days.
          </p>
        </div>
      </section>
    </main>
  );
}
