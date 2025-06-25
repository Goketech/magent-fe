import React, { useRef, useState } from "react";
import { motion, useInView, Variants } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

import { apiClient } from "@/utils/apiClient";

// import NewsletterCubes from './NewsletterCubes'; // Import the new component

const ArrowRightIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className={className}
  >
    <path
      fillRule="evenodd"
      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
      clipRule="evenodd"
    />
  </svg>
);

const Newsletter: React.FC = () => {
  const { toast } = useToast();

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email && email.includes("@")) {
      try {
        // Call your API
        await apiClient("/newsletter/register", {
          method: "POST",
          body: { email },
        });

        // Show success toast
        toast({
          variant: "success",
          description: "You have successfully subscribed to the newsletter!",
        });

        // Reset after 3s
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setEmail("");
        }, 3000);
      } catch (error) {
        console.error("Error registering for newsletter:", error);
        toast({
          variant: "destructive",
          description: "Something went wrong. Please try again.",
        });
      }
    } else {
      alert("Please enter a valid email address.");
    }
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", delay: 0.2 },
    },
  };

  const textItemVariants: Variants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const formVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.section
      ref={sectionRef}
      variants={sectionVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 max-w-[1250px] mx-auto bg-contain my-20 bg-center h-[370px] bg-no-repeat overflow-hidden border border-[#D7D7D7] rounded-xl"
      aria-labelledby="newsletter-heading"
      style={{ backgroundImage: "url('/newsletterbg.png')" }}
    >
      <motion.div
        variants={cardVariants}
        className="relative mx-auto rounded-xl md:rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Dot Pattern Background */}

        <div className="relative z-0 p-8 gap-8 md:gap-12">
          <motion.div
            className=""
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={{
              visible: {
                transition: { staggerChildren: 0.2, delayChildren: 0.4 },
              },
            }}
          >
            <motion.p
              variants={textItemVariants}
              className="text-sm font-semibold text-[#095AD3] tracking-wider mb-2 md:mb-3"
            >
              STAY UP TO DATE
            </motion.p>
            <motion.h2
              id="newsletter-heading"
              variants={textItemVariants}
              className="text-3xl sm:text-2xl font-bold text-white mb-6 md:mb-8 leading-tight"
            >
              Get Our Newsletter
            </motion.h2>

            <motion.form
              variants={formVariants}
              onSubmit={handleSubmit}
              className="w-full max-w-md mx-auto md:mx-0"
            >
              {submitted ? (
                <p className="text-green-400">Thanks for subscribing!</p>
              ) : (
                <div className="relative flex items-center">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter email"
                    required
                    className="w-full py-3.5 px-5 pr-12 bg-transparent text-neutral-100 border border-neutral-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none placeholder-neutral-500 transition-all duration-300"
                    aria-label="Email for newsletter"
                  />
                  <button
                    type="submit"
                    className="absolute right-0 top-0 h-full px-4 text-neutral-400 hover:text-blue-400 transition-colors duration-200 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-neutral-800"
                    aria-label="Subscribe to newsletter"
                  >
                    <ArrowRightIcon className="w-5 h-5" />
                  </button>
                </div>
              )}
            </motion.form>
          </motion.div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Newsletter;
