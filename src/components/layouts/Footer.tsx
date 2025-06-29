"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView, Variants } from "framer-motion";
import { BsTwitterX } from "react-icons/bs";
import { FaGithub } from "react-icons/fa6";
import { SiDiscord } from "react-icons/si";
import { FaTelegramPlane, FaInstagram, FaLinkedin } from "react-icons/fa";

const socialLinks = [
  { href: "https://x.com/magenthq", label: "X", Icon: BsTwitterX },
  { href: "https://www.linkedin.com/company/magenthq", label: "LinkedIn", Icon: FaLinkedin },
  { href: "https://discord.com/invite/r42PDfh2Xc", label: "Discord", Icon: SiDiscord },
  { href: "https://t.me/hellomagent_bot", label: "Telegram", Icon: FaTelegramPlane },
  { href: "https://www.instagram.com/magenthq", label: "Instagram", Icon: FaInstagram },
];

const footerLinkSections = [
  {
    title: "Product",
    links: [
      "Connect",
      "Marketing",
      "AI Powered Sales",
      "Platform Integration",
      "Own-to-Earn",
      "Research",
      "Reports",
    ],
  },
  {
    title: "Resources",
    links: [
      "Connect",
      "Marketing",
      "AI Powered Sales",
      "Platform Integration",
      "Own-to-Earn",
      "Research",
      "Reports",
    ],
  },
  {
    title: "Company",
    links: [
      "Connect",
      "Marketing",
      "AI Powered Sales",
      "Platform Integration",
      "Own-to-Earn",
      "Research",
      "Reports",
    ],
  },
  {
    title: "Legal",
    links: [
      "Privacy Policy",
    ],
  },
];

const Footer: React.FC = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
        when: "beforeChildren", // Ensure container animation completes before children start
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  const linkColumnVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
        staggerChildren: 0.05, // Stagger links within the column
      },
    },
  };

  return (
    <motion.footer
      ref={sectionRef}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="bg-[#08121D] text-neutral-300 py-12 md:py-12 px-4 sm:px-6 lg:px-8 mt-16"
      aria-labelledby="footer-heading"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-center mb-10 md:mb-12"
        >
          <motion.div variants={itemVariants} className="mb-6 md:mb-0">
            <Link href="/" className="z-50">
              <Image
                src="/magentlogo.svg"
                alt="Logo"
                width={141}
                height={41}
                priority
              />
            </Link>
          </motion.div>
          <motion.div variants={itemVariants} className="flex gap-[40px]">
            {socialLinks.map(({ href, label, Icon }) => (
              <motion.a
                key={label}
                target="_blank"
                href={href}
                aria-label={label}
                className="text-neutral-400 hover:text-purple-400 transition-colors"
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <Icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">
          {footerLinkSections.map((section, index) => (
            <motion.div
              key={section.title}
              variants={linkColumnVariants}
              // Custom prop to pass delay for staggered animation of columns
              custom={index}
              initial="hidden" // Ensure children also use initial hidden
              animate={isInView ? "visible" : "hidden"}
              // Individual column delay based on index
              transition={{ delay: index * 0.1 + 0.2 }} // Stagger columns after initial footer anim
            >
              <h3 className="text-lg font-semibold text-white mb-4">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <motion.li key={link} variants={itemVariants}>
                    <a
                      href="/privacy_and_policy"
                      className="text-neutral-400 hover:text-purple-300 transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom section: Divider and Copyright */}
        <motion.div
          variants={itemVariants}
          className="border-t border-neutral-700 pt-8 mt-8"
        >
          <p className="text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} - Magent. All rights reserved.
          </p>
        </motion.div>
      </div>
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
    </motion.footer>
  );
};

export default Footer;
