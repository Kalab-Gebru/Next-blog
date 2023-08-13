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
          className="fixed z-30 flex items-center justify-center w-16 h-16 text-white bg-green-400 rounded-full md:w-12 md:h-12 bottom-24 md:bottom-12 right-12 md:right-32 hover:bg-green-600"
        >
          {/* <span>Top</span> */}
          <AiOutlineArrowUp size={24} className="w-12 h-12 md:w-6 md:h-6" />
        </button>
      )}
    </>
  );
}
