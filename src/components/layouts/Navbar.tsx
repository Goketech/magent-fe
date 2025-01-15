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
      <div className="flex justify-between items-center px-4 md:px-[80px] py-[24.5px]">
        {/* Logo */}
        <Link href="/" className="z-50">
          <h5 className="font-bold text-2xl text-primary bg-gradient-border bg-clip-text text-transparent">
            magent
          </h5>
        </Link>

        <div className="hidden md:flex gap-[16px] text-white">
          <Link href="https://discord.gg/5yzAZgaJ">
            <Button className="bg-[#242424] px-[12px] py-[8px] rounded-[32px]  text-white font-[500] text-[14px] leading-[21px]">
              <span>Discord</span>
            </Button>
          </Link>
          <Link href="https://x.com/magenthq">
            <Button className="bg-[#242424] px-[12px] py-[8px] rounded-[32px]  text-white font-[500] text-[14px] leading-[21px]">
              <span>X</span>
            </Button>
          </Link>
          <Link href="https://t.me/hellomagent_bot">
            <Button className="bg-[#242424] px-[12px] py-[8px] rounded-[32px] text-white font-[500] text-[14px] leading-[21px]">
              <span>Telegram</span>
            </Button>
          </Link>
        </div>

        {/* Desktop Contact Button */}
        <div className="hidden md:block">
          <Link href="mailto:modupe775@gmail.com">
            <Button className="bg-[#242424] px-[16px] py-[12px] rounded-[32px] text-white font-[500] text-[14px] leading-[21px] border border-white">
              Contact Sales
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

            <div className="flex gap-0.5">
              <Link href="https://discord.gg/5yzAZgaJ">
                <Button className="bg-[#242424] px-[12px] py-[8px] rounded-[32px]  text-white font-[500] text-[14px] leading-[21px]">
                  <span>Discord</span>
                </Button>
              </Link>
              <Link href="https://x.com/magenthq">
                <Button className="bg-[#242424] px-[12px] py-[8px] rounded-[32px]  text-white font-[500] text-[14px] leading-[21px]">
                  <span>X</span>
                </Button>
              </Link>
              <Link href="https://t.me/hellomagent_bot">
                <Button className="bg-[#242424] px-[12px] py-[8px] rounded-[32px] text-white font-[500] text-[14px] leading-[21px]">
                  <span>Telegram</span>
                </Button>
              </Link>
            </div>

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
