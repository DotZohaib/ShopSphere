import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-10">
      <div className="container mx-auto px-5 lg:px-16   flex flex-wrap gap-10">
        {/* Exclusive Section */}
        <div>
          <h3 className="text-lg font-bold mb-6">ZenZone</h3>
          <p className="">Subscribe</p>
          <p className="mb-6">Get 10% off your first order</p>
          <div className="flex items-center border border-gray-400 rounded-md overflow-hidden">
            <input
              type="email"
              placeholder="Enter your email"
              className="bg-transparent px-4 py-3 flex-grow outline-none text-white"
            />
            <button className="bg-white text-black px-4 py-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.25 6.75L20.25 12M20.25 12L14.25 17.25M20.25 12H3.75"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-lg font-bold mb-6">Support</h3>
          <p className="">
            111 Bijoy Sarani, Dhaka, <br /> DH 1515, Bangladesh
          </p>
          <p className="">exclusive@gmail.com</p>
          <p>+88015-88888-9999</p>
        </div>

        {/* Account Section */}
        <div>
          <h3 className="text-lg font-bold mb-6">Account</h3>
          <ul className="">
            <li>My Account</li>
            <li>Login / Register</li>
            <li>Cart</li>
            <li>Wishlist</li>
            <li>Shop</li>
          </ul>
        </div>

        {/* Quick Link Section */}
        <div>
          <h3 className="text-lg font-bold mb-6">Quick Link</h3>
          <ul className="">
            <li>Privacy Policy</li>
            <li>Terms Of Use</li>
            <li>FAQ</li>
            <li>Contact</li>
          </ul>
        </div>

        {/* Download App Section */}
        <div>
          <h3 className="text-lg font-bold mb-6">Download App</h3>
          <p className="">Save $3 with App </p>
          <p className="">New User Only</p>
          <div className="flex items-center space-x-6 mb-6">
            <Image
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/220px-QR_code_for_mobile_English_Wikipedia.svg.png"
              alt="QR Code"
              width={80}
              height={80}
              className="invert"
            />
            <div>
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/2560px-Google_Play_Store_badge_EN.svg.png"
                alt="Google Play"
                width={100}
                height={40}
                className="mb-4"
              />
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Download_on_the_App_Store_RGB_blk.svg/1024px-Download_on_the_App_Store_RGB_blk.svg.png"
                alt="App Store"
                width={100}
                height={40}
              />
            </div>
          </div>

          {/* Social Media Icons */}
        </div>
      </div>
          <div className="flex items-center justify-center space-x-6 text-2xl">
            <FaFacebookF />
            <FaTwitter />
            <FaInstagram />
            <FaLinkedin />
          </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-700 mt-10 pt-6 text-center">
        <p className="text-base text-gray-400">
          © Copyright ZenZone 2022. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
