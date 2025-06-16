"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const toggleMenu = (title: string) => {
    setOpenMenu(openMenu === title ? null : title);
  };
  const menuData = [
    {
      title: "Learn",
      items: [
        { name: "Blog", href: "/blog" },
        { name: "Docs", href: "/docs" },
      ],
    },
    {
      title: "Product",
      items: [
        { name: "Features", href: "/features" },
        { name: "Pricing", href: "/pricing" },
      ],
    },
    {
      title: "Community",
      items: [
        { name: "Forum", href: "/forum" },
        { name: "Events", href: "/events" },
      ],
    },
  ];

  return (
    <nav className="relative">
      <div className="flex justify-between items-center px-4 md:px-[80px] py-[24.5px]">
        {/* Logo */}
        <div className="flex items-center justify-between w-full">  
          <div className="">
          <Link href="/" className="z-50">
          <Image
            src="/magentlogo.svg"
            alt="Logo"
            width={72}
            height={21}
            priority
          />
        </Link>
        </div>
        <div className="hidden md:flex gap-8 text-white relative md:justify-center w-full">
          {menuData.map((menu) => (
            <div key={menu.title} className="relative">
              <button
                onClick={() => toggleMenu(menu.title)}
                className=" px-[12px] py-[8px]  text-white font-[500] text-xl leading-[21px] flex items-center gap-1"
              >
                {menu.title}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openMenu === menu.title && (
                <div className="absolute top-[110%] mt-2 w-44 bg-[#1a1a1a] rounded-md shadow-md z-50">
                  {menu.items.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="block px-4 py-2 text-sm text-white hover:bg-[#333]"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
        ;
        {/* Desktop Contact Button */}
        <div className="hidden md:block bg-purple-400">
          
          <Link href="/login">
            <Button className="bg-white px-[3rem] py-[10px] rounded-md text-[#010101] font-[500] text-[14px] leading-[21px] border border-white">
              Login
            </Button>
          </Link>
          
        </div>
        </div>
        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
          <button
            // onClick={toggleMenu}
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
              // onClick={toggleMenu}
            >
              Home
            </Link>

            <div className="flex gap-0.5">
              <Link href="https://discord.gg/r42PDfh2Xc">
                <Button className="bg-[#242424] px-[12px] py-[8px] rounded-[32px]  text-white font-[500] text-[14px] leading-[21px]">
                  <span>Discord</span>
                </Button>
              </Link>
              <Link href="https://x.com/magenthq">
                <Button className="bg-[#242424] px-[12px] py-[8px] rounded-[32px]  text-white font-[500] text-[14px] leading-[21px]">
                  <span>X</span>
                </Button>
              </Link>
              {/* <Link href="https://t.me/hellomagent_bot">
                <Button className="bg-[#242424] px-[12px] py-[8px] rounded-[32px] text-white font-[500] text-[14px] leading-[21px]">
                  <span>Telegram</span>
                </Button>
              </Link> */}
              <Link href="https://www.instagram.com/magenthq/">
                <Button className="bg-[#242424] px-[12px] py-[8px] rounded-[32px] text-white font-[500] text-[14px] leading-[21px]">
                  <span>Instagram</span>
                </Button>
              </Link>
              <Link href="https://www.linkedin.com/company/magenthq">
                <Button className="bg-[#242424] px-[12px] py-[8px] rounded-[32px] text-white font-[500] text-[14px] leading-[21px]">
                  <span>Linkedin</span>
                </Button>
              </Link>
            </div>

            <Link
              href="mailto:hellomagent@gmail.com"
              className="text-2xl font-bold text-primary"
              // onClick={toggleMenu}
            >
              Contact Sales
            </Link>
            <Link href="/login">
              <Button className="bg-[#242424] px-[16px] py-[12px] rounded-[32px] text-white font-[500] text-[14px] leading-[21px] border border-white">
                Login
              </Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-[#242424] px-[16px] py-[12px] rounded-[32px] text-white font-[500] text-[14px] leading-[21px] border border-white">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
