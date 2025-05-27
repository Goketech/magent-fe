import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";

function MobileAuthNav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <div
      className={`flex w-full justify-between items-center z-10 p-4 fixed top-0 left-0 ${
        scrolled ? "bg-white shadow" : "bg-white"
      }`}
    >
      <Image
        src="/authLogo.svg"
        alt="Logo"
        width={70}
        height={70}
        className="cursor-pointer"
      />
      <div className="flex gap-1 items-center justify-center bg-[#F6F6F6] rounded-[32px] px-4 py-3 text-[#330065] text-sm">
        <span>Sign In</span>
        <ChevronRight className="h-4 w-4" />
      </div>
    </div>
  );
}

export default MobileAuthNav;
