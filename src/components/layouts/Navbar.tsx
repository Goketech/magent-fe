"use client";
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  const toggleMenu = (title: string) => {
    setOpenMenu(openMenu === title ? null : title);
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

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

  // Animation variants
  const dropdownVariants = {
    hidden: {
      opacity: 0,
      y: -15,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 1, 1]
      }
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0, 0, 0.2, 1],
        staggerChildren: 0.05
      }
    },
    exit: {
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 1, 1]
      }
    }
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -10,
      transition: {
        duration: 0.15
      }
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0, 0, 0.2, 1]
      }
    }
  };

  const chevronVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  const mobileMenuVariants = {
    hidden: {
      opacity: 0,
      scale: 0.95,
      transition: {
        duration: 0.5
      }
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0, 0, 0.2, 1]
      }
    }
  };

  return (
    <nav className="relative" ref={navRef}>
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
  <div 
    key={menu.title} 
    className="relative"
    onMouseEnter={() => setOpenMenu(menu.title)}
    onMouseLeave={() => setOpenMenu(null)}
  >
    <motion.button
      className="px-[12px] py-[8px] text-white font-[500] text-xl leading-[21px] flex items-center gap-1 rounded-md transition-colors duration-200"
      whileHover={{ 
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        scale: 1.02
      }}
      whileTap={{ scale: 0.98 }}
    >
      {menu.title}
      <motion.svg
        className="w-4 h-4"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        variants={chevronVariants}
        animate={openMenu === menu.title ? "open" : "closed"}
        transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M19 9l-7 7-7-7"
        />
      </motion.svg>
    </motion.button>

    <AnimatePresence>
      {openMenu === menu.title && (
        <motion.div
          className="absolute top-[110%] mt-2 w-44 bg-[#1a1a1a] rounded-md shadow-lg border border-white/10 z-50 overflow-hidden"
          variants={dropdownVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ originY: 0 }}
          onMouseEnter={() => setOpenMenu(menu.title)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          {menu.items.map((item) => (
            <motion.div key={item.name} variants={itemVariants}>
              <Link
                href={item.href}
                className="block px-4 py-3 text-sm text-white"
                onClick={() => setOpenMenu(null)}
              >
                <motion.div
                  whileHover={{ 
                    backgroundColor: "#333",
                    x: 4,
                    transition: { duration: 0.2 }
                  }}
                  className="rounded px-2 py-1 -mx-2 -my-1"
                >
                  {item.name}
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
))}
          </div>
          
          {/* Desktop Contact Button */}
          <div className="hidden md:block">
            <Link href="/login">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-white px-[3rem] py-[10px] rounded-md text-[#010101] font-[500] text-[14px] leading-[21px] border border-white">
                  Login
                </Button>
              </motion.div>
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu Toggle */}
        <div className="md:hidden z-50">
          <motion.button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait">
              {isMenuOpen ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-6 w-6 text-primary" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-6 w-6 text-primary" />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 bg-background z-40 md:hidden"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              {/* Home Link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <Link
                  href="/"
                  className="text-2xl font-bold text-primary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
              </motion.div>

              {menuData.map((menu, index) => (
                <motion.div
                  key={menu.title}
                  className="flex flex-col items-center space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (index + 1) * 0.1 }}
                >
                  {/* Menu Title */}
                  <h3 className="text-xl font-semibold text-gray-500">
                    {menu.title}
                  </h3>
                  
                  {/* Menu Items */}
                  <div className="flex flex-col items-center space-y-2">
                    {menu.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-white hover:text-primary transition-colors duration-200 text-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              ))}

              {/* Auth Buttons */}
              <motion.div
                className="flex flex-col items-center space-y-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + (menuData.length + 3) * 0.1 }}
              >
                <Link href="/login">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button className="bg-white px-[3rem] py-[10px] rounded-md text-[#010101] font-[500] text-[14px] leading-[21px] border border-white">
                  Login
                </Button>
              </motion.div>
            </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;