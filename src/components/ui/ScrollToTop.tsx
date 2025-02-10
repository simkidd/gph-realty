"use client"
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { ChevronUpIcon } from "lucide-react";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  const toggleShow = () => {
    if (scrollY > 1000) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleShow);
    return () => window.removeEventListener("scroll", toggleShow);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Button
      size={"icon"}
      className={`${
        showButton && "show-button"
      } scroll-top fixed right-3 bottom-8 w-10 h-10 flex items-center justify-center text-lg hover:-translate-y-1  z-10`}
      onClick={scrollToTop}
    >
      <ChevronUpIcon />
    </Button>
  );
};

export default ScrollToTop;
