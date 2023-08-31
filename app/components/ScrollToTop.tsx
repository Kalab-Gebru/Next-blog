"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";
export default function ScrollToTop() {
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 400) {
        setShowTopBtn(true);
      } else {
        setShowTopBtn(false);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <>
      {showTopBtn && (
        <button
          onClick={goToTop}
          className="fixed z-30 flex items-center justify-center w-8 h-8 text-white bg-green-600 rounded-full md:w-12 md:h-12 bottom-16 lg:bottom-28 right-8 lg:right-12 hover:bg-green-700"
        >
          {/* <span>Top</span> */}
          <AiOutlineArrowUp size={24} className="w-6 h-6" />
        </button>
      )}
    </>
  );
}
