"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  const pathname = usePathname();
  const isSignUpPage = pathname === "/signup";
  const isSignInPage = pathname === "/login";
  const linkHref = isSignUpPage ? "/login" : "/signup";
  const linkText = isSignUpPage ? "Sign in" : "Sign up";

  return (
    <div
      className={`flex w-full justify-between items-center z-10 p-4 fixed top-0 left-0 ${
        scrolled ? "bg-white shadow" : "bg-white"
      }`}
    >
      <Link href="/">
      <Image
        src="/authLogo.svg"
        alt="Logo"
        width={70}
        height={70}
        className="cursor-pointer"
      />
      </Link>
      <div className="flex gap-1 items-center justify-center bg-[#F6F6F6] rounded-[32px] px-4 py-3 text-[#330065] text-sm">
        <Link href={linkHref} className="flex items-center gap-1">
        <span>{linkText}</span>
        <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

export default MobileAuthNav;
