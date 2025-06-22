import React, { useRef } from "react";
import { motion, useInView, Variants } from "framer-motion";

// SVG Icons
const CheckIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5 text-green-400",
}) => (
  <svg
    className={className}
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
    strokeWidth="2"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path d="M5 13l4 4L19 7"></path>
  </svg>
);

const MusicNoteIcon: React.FC<{ className?: string }> = ({
  className = "w-5 h-5",
}) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path d="M18 3a1 1 0 00-1.447-.894L6.447 6.44A1 1 0 006 7.327V15a3 3 0 102 2.829V9.414l9-4.5A1 1 0 0018 3z"></path>
  </svg>
);

interface PricingPlan {
  id: string;
  name: string;
  features: string[];
  buttonText: string;
  isBestDeal?: boolean;
  discount?: string;
  priceSubtitle?: string; // e.g. "For individuals and small teams"
}

const pricingPlansData: PricingPlan[] = [
  {
    id: "free",
    name: "Free plan",
    features: [
      "Market research",
      "Predictive analysis",
      "Marketing insights",
      "Marketing strategies",
      "Marketing reports",
    ],
    buttonText: "Try now",
  },
  {
    id: "premium",
    name: "Premium plan",
    features: [
      "Market research",
      "Predictive analysis",
      "Marketing insights",
      "Marketing strategies",
      "Marketing reports",
      "Real-time data update",
      "Marketing executive assistant",
    ],
    buttonText: "Try now",
    isBestDeal: true,
    discount: "60% off",
  },
  {
    id: "premium_plus",
    name: "Premium + plan",
    features: [
      "Market research",
      "Predictive analysis",
      "Marketing insights",
      "Marketing strategies",
      "Marketing reports",
      "Real-time data update",
      "Marketing executive assistant",
      "Marketing platform integration",
      "Marketing automation",
      "All-in-one platform management",
    ],
    buttonText: "Try now",
  },
];

interface PricingCardProps extends PricingPlan {
  animationDelay: number;
}

const PricingCard: React.FC<PricingCardProps> = ({
  name,
  features,
  buttonText,
  isBestDeal = false,
  discount,
  animationDelay,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut", delay: animationDelay },
    },
  };

  const bestDealShineVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: [0, 0.5, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut",
        delay: animationDelay + 0.5, // Start after card appears
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`flex flex-col justify-center shadow-2xl overflow-hidden max-w-[400px]
        ${
          isBestDeal
            ? "border-[6px] border-[#AAA1FF] transform md:scale-105 rounded-3xl"
            : "border border-neutral-700 rounded-xl"
        }
        ${isBestDeal ? "bg-[#AAA1FF]" : ''}`}
    >
      {isBestDeal && (
        <div className="max-w-[410px] h-[54px] ">
          <motion.div
            style={{
              background: `radial-gradient(ellipse at center, rgba(168, 85, 247, 0.25) 0%, rgba(168, 85, 247, 0) 70%)`,
            }}
            variants={bestDealShineVariants}
          />
          <div className="text-white px-6 py-3 text-center font-semibold flex items-center justify-center text-2xl h-full">
            <MusicNoteIcon className="w-5 h-5 mr-2" />
            Best Deal
          </div>
        </div>
      )}

      <div
        className={`relative z-10 p-6 md:p-8 flex flex-col h-[570px] w-[395px] ${
          isBestDeal ? "rounded-xl bg-[#171B21]" : "rounded-xl bg-gradient-to-b from-[#7B7B7B1A] from-10% via-[#15151580] via-50% to-[#15151580] to-100%"
        }`}
        
      >
        <div className="flex justify-between items-center mb-1">
          <h3
            className={`text-2xl font-semibold ${
              isBestDeal ? "text-purple-300" : "text-white"
            }`}
          >
            {name}
          </h3>
          {isBestDeal && discount && (
            <span className="bg-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              {discount}
            </span>
          )}
        </div>
        <ul className="space-y-3 my-6 md:my-8 flex-grow">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckIcon
                className={`w-5 h-5 mr-3 mt-1 flex-shrink-0 ${
                  isBestDeal ? "text-purple-400" : "text-green-400"
                }`}
              />
              <span className="text-neutral-300">{feature}</span>
            </li>
          ))}
        </ul>

        <button
          className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-neutral-800
            ${
              isBestDeal
                ? "bg-[#AAA1FF] hover:bg-purple-600 text-white focus:ring-purple-400"
                : "bg-neutral-700 hover:bg-neutral-600 text-neutral-200 focus:ring-neutral-500"
            }`}
        >
          {buttonText}
        </button>
      </div>
    </motion.div>
  );
};

const Pricing: React.FC = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const subtitleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
    },
  };

  return (
    <div
      ref={sectionRef}
      className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          className="text-3xl md:text-5xl font-bold text-white text-center mb-4"
          aria-label="Pricing Plans"
        >
          Pricing
        </motion.h2>
        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          className=" md:text-5xl text-neutral-300 text-center mb-16 md:mb-20 max-w-5xl mx-auto font-medium text-4xl"
        >
          Security. Privacy. Freedom. For Everyone
        </motion.p>
<div className="flex justify-center">

        <div className="grid grid-cols-1 content-center lg:grid-cols-3 gap-8 md:gap-6 lg:gap-8 items-end">
          {pricingPlansData.map((plan, index) => (
            <div
              key={plan.id}
              className={`
                ${plan.id === "premium" ? "md:col-span-1 lg:col-span-1" : ""}
                ${plan.id === "free" ? "lg:justify-self-end" : ""}
                ${
                  plan.id === "premium_plus"
                    ? "lg:justify-self-start md:col-span-2 lg:col-span-1"
                    : ""
                } 
              `}
            >
              <PricingCard {...plan} animationDelay={index * 0.15 + 0.4} />
            </div>
          ))}
        </div>
</div>
      </div>
    </div>
  );
};

export default Pricing;
