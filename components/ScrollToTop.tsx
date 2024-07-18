"use client";
import { Button } from "@/components/ui/button";
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
        <Button
          onClick={goToTop}
          variant={"secondary"}
          className="fixed z-30 flex items-center justify-center w-8 h-8 rounded-full text-foreground md:w-12 md:h-12 bottom-16 lg:bottom-28 right-8 lg:right-12"
        >
          {/* <span>Top</span> */}
          <AiOutlineArrowUp size={24} className="w-6 h-6" />
        </Button>
      )}
    </>
  );
}
