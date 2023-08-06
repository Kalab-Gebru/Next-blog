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
          className="flex items-center justify-center z-30 fixed bottom-12 right-32 rounded-full w-12 h-12 bg-green-400 hover:bg-green-600 text-white"
        >
          {/* <span>Top</span> */}
          <AiOutlineArrowUp size={24} />
        </button>
      )}
    </>
  );
}
