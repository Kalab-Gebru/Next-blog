"use client";
import React, { useState, useEffect } from "react";
import { AiOutlineArrowDown } from "react-icons/ai";
export default function ScrollToBottom() {
  const [showTopBtn, setShowBottomBtn] = useState(true);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > document.body.scrollHeight - 2000) {
        setShowBottomBtn(false);
      } else {
        setShowBottomBtn(true);
      }
    });
  }, []);

  const goToTop = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: "smooth",
    });
  };
  return (
    <>
      {showTopBtn && (
        <button
          onClick={goToTop}
          className="fixed z-30 flex items-center justify-center w-16 h-16 text-white bg-green-400 rounded-full md:w-12 md:h-12 bottom-12 lg:bottom-12 right-12 lg:right-32 hover:bg-green-600"
        >
          {/* <span>Top</span> */}
          <AiOutlineArrowDown size={24} className="w-12 h-12 md:w-6 md:h-6" />
        </button>
      )}
    </>
  );
}
