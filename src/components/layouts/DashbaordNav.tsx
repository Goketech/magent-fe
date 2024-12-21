"use client";
import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, House, Bookmark } from "lucide-react";

const DashbaordNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [active, setActive] = useState("home");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative">
      <div className="flex justify-between items-center px-4 md:px-[80px] py-[24.5px]">
        {/* Logo */}
        <Link href="/" className="z-50">
          <h5 className="font-bold text-2xl text-primary bg-gradient-border bg-clip-text text-transparent">
            magent
          </h5>
        </Link>

        {/* Desktop Contact Button */}
        <div className="hidden md:block">
          <Link href="mailto:modupe775@gmail.com">
            <Button className="bg-[#242424] px-[16px] py-[12px] rounded-[32px] text-white font-[500] text-[14px] leading-[21px] border border-white">
              Connect Wallet
            </Button>
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
          <button
            onClick={toggleMenu}
            className="focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-primary" />
            )}
          </button>
        </div>
      </div>
      <div className="hidden md:block px-[80px] py-[20px] border-t">
        <div className="inline-flex gap-[12px] p-[4px] rounded-[32px] border border-[#ECECEC]">
            <Button onClick={()=> setActive('home')} className={`flex gap-[4px] px-[8px] py-[4px] rounded-[32px] bg-transparent ${active === 'home' ? 'text-[#095AD3] bg-[#E6EFFB]' : 'text-[#999999]'}`}>
                <House className="h-6 w-6" />
                <span>Home</span>
            </Button>
            <Button onClick={()=> setActive('library')} className={`flex gap-[4px] px-[8px] py-[4px] rounded-[32px] bg-transparent ${active === 'library' ? 'text-[#095AD3] bg-[#E6EFFB]' : 'text-[#999999]'}`}>
                <Bookmark className="h-6 w-6" />
                <span>Library</span>
            </Button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-background z-40 md:hidden">
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <Link
              href="/"
              className="text-2xl font-bold text-primary"
              onClick={toggleMenu}
            >
              Home
            </Link>

            <Link
              href="mailto:hellomagent@gmail.com"
              className="text-2xl font-bold text-primary"
              onClick={toggleMenu}
            >
              Connect Wallet
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default DashbaordNav;
