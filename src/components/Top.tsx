"use client";
// import { useState } from "react";

const Top = () => {

  return (
    <>
      <header className="sticky items-center justify-center flex top-0 z-50 bg-gradient-to-r from-black/50 to-black/30 backdrop-blur-md">
        <div className="flex items-center justify-between px-6 py-2">
          {/* Sale Announcement */}
          <div className="flex items-center justify-center w-full md:w-auto text-center">
            <p className="text-white text-[8px] md:text-sm font-medium">
              🚨 Summer Sale: Up to{" "}
              <span className="font-bold text-yellow-400">50% OFF</span> on
              Swimwear! Free Express Delivery Available!{" "}
              <a
                href="#"
                className="underline text-yellow-400 hover:text-yellow-500 ml-2 transition-colors duration-200"
              >
                Shop Now →
              </a>
            </p>
          </div>


        </div>
      </header>
    </>
  );
};

export default Top;
