"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="relative">
      <div className="flex justify-between items-center bg-white px-4 md:px-[80px] py-[24.5px]">
        {/* Logo */}
        <Link href="/" className="z-50">
          <h5 className="font-bold text-2xl text-primary">magent</h5>
        </Link>

        {/* Desktop Contact Button */}
        <div className="hidden md:block">
          <Link href="mailto:modupe775@gmail.com">
            <Button className="text-white">Contact Sales</Button>
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

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 md:hidden">
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
              Contact Sales
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;