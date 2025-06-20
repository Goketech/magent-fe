import React, { useRef } from "react";
import { motion, useInView, useMotionValue, useSpring, animate, useTransform } from "framer-motion";
import Image from "next/image";
import Animation from "./Animation";

interface OfferCardData {
  id: string;
  color: string; // Tailwind background color class for the label
  label: string;
  title: string;
  text: string;
}

interface DesignElementProps {
  className?: string; 
}

interface OfferCardProps extends OfferCardData {
  className?: string; 
}

const OfferCard: React.FC<OfferCardProps> = ({
  color,
  label,
  title,
  text,
  className,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });
  
  const isGradientInView = useInView(cardRef, { 
    once: false, 
    margin: "-20px",
    amount: 0.3 
  });

  // Motion value for rotation
  const rotationDegrees = useMotionValue(0);
  const springRotation = useSpring(rotationDegrees, {
    stiffness: 50,
    damping: 20,
    mass: 1
  });

  // Animate rotation when in view
  React.useEffect(() => {
    if (isGradientInView) {
      // Start continuous rotation when in view
      const controls = animate(rotationDegrees, 360, {
        duration: 4,
        ease: "linear",
        repeat: Infinity,
      });
      return controls.stop;
    } else {
      // Stop and reset when out of view
      animate(rotationDegrees, 0, {
        duration: 0.5,
        ease: "easeOut"
      });
    }
  }, [isGradientInView, rotationDegrees]);

  return (
    <motion.div
      ref={cardRef}
      className={`${className} relative bg-gradient-to-b from-[#7B7B7B1A] from-10% via-[#15151580] via-50% to-[#15151580] to-100% rounded-xl shadow-2xl h-[400px] md:h-full overflow-hidden group flex flex-col p-[4px]`}
      // Entrance animation
      initial={{ opacity: 0, y: 50, scale: 0.95 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 50, scale: 0.95 }}
      transition={{ 
        duration: 0.6, 
        ease: [0.25, 0.46, 0.45, 0.94] // Custom easing curve
      }}
      // Hover animation
      whileHover={{ 
        scale: 1.03, 
        y: -5,
        transition: { duration: 0.3, ease: "easeOut" }
      }}
      // Tap animation for mobile
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
 className="absolute inset-[-200%]" 
 style={{
   zIndex: 0,
   background: useTransform(
     springRotation,
     (rotation) =>
       `conic-gradient(from ${rotation}deg at 50% 50%, #C8B6FF, #FFC8DD, #F2E8CF, #BDE0FE, #A8DADC, #C8B6FF)`
   ),
 }}
 // Additional scale animation when gradient is active
 animate={isGradientInView ? { scale: 1 } : { scale: 0.8 }}
 transition={{ duration: 0.5, ease: "easeOut" }}
/>
      <div className="relative z-10 bg-neutral-900 m-[2px] rounded-[10px] flex flex-col flex-grow">
        <div className="bg-gradient-to-b from-[#7B7B7B1A] from-10% via-[#15151580] via-50% to-[#15151580] to-100% flex flex-col flex-grow rounded-[10px] p-6">
          <motion.span
            className={`text-xs font-semibold px-[20px] py-[10px] ${color} text-black rounded-md self-start mb-16`}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            {label}
          </motion.span>
          <motion.h3 
            className="text-lg md:text-2xl font-semibold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            {title}
          </motion.h3>
          <motion.p 
            className="text-[#999999] text-sm leading-relaxed flex-grow"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {text}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

const DesignElement1: React.FC<DesignElementProps> = ({ className }) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={elementRef}
      className={`${className} w-full h-full flex items-center justify-center bg-neutral-800/70 backdrop-blur-sm rounded-xl p-6 min-h-[200px] md:min-h-full`}
      initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
      animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -10 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ scale: 1.05, rotate: 2 }}
    >
      <motion.svg 
        width="80" 
        height="80" 
        viewBox="0 0 100 100" 
        className="opacity-60"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <defs>
          <linearGradient id="gradDesign1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{ stopColor: "#A855F7", stopOpacity: 1 }} />
            <stop
              offset="100%"
              style={{ stopColor: "#6D28D9", stopOpacity: 1 }}
            />
          </linearGradient>
        </defs>
        <path
          d="M20 30 L50 10 L80 30 L50 50 Z"
          fill="url(#gradDesign1)"
          stroke="#C4B5FD"
          strokeWidth="1.5"
        />
        <path
          d="M20 70 L50 50 L80 70 L50 90 Z"
          fill="url(#gradDesign1)"
          stroke="#C4B5FD"
          strokeWidth="1.5"
          opacity="0.7"
        />
        <path
          d="M20 30 L20 70 L50 50 M80 30 L80 70 L50 50"
          stroke="#C4B5FD"
          strokeWidth="1"
          fill="none"
          opacity="0.5"
        />
        <rect x="40" y="40" width="20" height="20" fill="#8B5CF6" opacity="0.4" />
      </motion.svg>
    </motion.div>
  );
};

const DesignElement2: React.FC<DesignElementProps> = ({className}) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(elementRef, { once: true, margin: "-50px" });

  return (
    <motion.div 
      ref={elementRef}
      className={`${className} hidden w- h-full md:flex items-center justify-center min-h-[200px] md:min-h-full`}
      initial={{ opacity: 0, x: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, x: 0, scale: 1 } : { opacity: 0, x: 50, scale: 0.9 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src="/whatweoffer.png"
          alt="whatweoffer Design"
          width={448}
          height={336}
          className="w-full h-auto rounded-xl"
        />
      </motion.div>
    </motion.div>
  );
};

const allOfferCards: OfferCardData[] = [
  {
    id: "research",
    color: "bg-[#C8B6FF]",
    label: "Research",
    title: "Intelligent research made simple with AI",
    text: "We simplify market research by aggregating data from diverse sources, saving organizations valuable time and effort. We helps define clear marketing objectives, identify market size and potential, uncover industry trends, discover ideal customers and competitors.",
  },
  {
    id: "reports",
    color: "bg-[#F2E8CF]",
    label: "Reports",
    title: "Effortless reports, powerful results",
    text: "Simplify your reporting process with AI-generated reports that are clear, concise, and actionable. From performance summaries to in-depth analytics, our platform delivers the insights you need to showcase results and make data-driven decisions with confidence.",
  },
  {
    id: "insights",
    color: "bg-[#FFC8DD]",
    label: "Insights",
    title: "Actionable insights at your fingertips",
    text: "Gain a deeper understanding of your audience and market with AI-powered insights that turn data into action. From performance analytics to customer behavior trends, our platform delivers the clarity you need to make smarter, faster decisions that drive real results.",
  },
  {
    id: "strategy",
    color: "bg-[#BDE0FE]",
    label: "Strategy",
    title: "Smart strategy, seamless execution",
    text: "Magent will help with marketing campaign ideas, media channel selection, strategic architecture, execution approach from market research and Insights, and step-by-step guide to achieve marketing objectives.",
  },
  {
    id: "ownership",
    color: "bg-[#FFAFCC]",
    label: "Own-to-earn",
    title: "Ownership that pays off",
    text: "We will help businesses access data and data owners will receive cryptocurrency rewards for sharing their data. This will also help us to provide real-time data update.",
  },
  {
    id: "analysis",
    color: "bg-[#A8DADC]",
    label: "Analysis",
    title: "Precise analysis for smarter decisions",
    text: "Our platform breaks down complex information into easy-to-understand visuals and trends, helping you make informed decisions that drive growth and optimize performance.",
  },
  {
    id: "executive",
    color: "bg-[#A7C957]",
    label: "Executive assistant",
    title: "Simplified executive support",
    text: "With text and voice prompt, the platform can help plan and organize your busy schedule, send voice reminder notifications and help you prioritize important tasks based on your available time frames.",
  },
  {
    id: "integration",
    color: "bg-[#DDA15E]",
    label: "Platform integration",
    title: "Connect and integrate with ease",
    text: "The platform can be connected to different social media and marketing platforms for analysis, insights generation, report generation and campaign deployment.",
  },
  {
    id: "automation",
    color: "bg-[#A2D2FF]",
    label: "Automation",
    title: "Automate your marketing, amplify your impact",
    text: "You can plug-in all your marketing platforms and allow our platform to automate your marketing activities like email marketing, social media posting, digital campaign deployment and reporting.",
  },
  {
    id: "management",
    color: "bg-[#FDF0D5]",
    label: "Platform management",
    title: "Effortless platform management",
    text: "Why switch across multiple tabs, when you can integrate, execute, view, optimize and manage every digital marketing activities all in one place.",
  },
];

const WhatWeOffer: React.FC = () => {
  return (
    <div className="pt-16 md:py-12 px-4 sm:px-6 lg:px-8 my-[20px] md:my-[40px]">
      <motion.h2 
        className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12 md:mb-20"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        What we offer
      </motion.h2>
      <div className="max-w-7xl mx-auto">
        <div className="whatweoffer_grid_container md:gap-x-16 md:gap-y-16">
          <OfferCard {...allOfferCards[0]} className="item2" />
          <OfferCard {...allOfferCards[1]} className="item1" />
          <OfferCard {...allOfferCards[2]} className="item3" />
          <OfferCard {...allOfferCards[3]} className="item4" />
          <OfferCard {...allOfferCards[4]} className="item5 md:-mt-16" />
          <OfferCard {...allOfferCards[5]} className="item6 " />
          <Animation className="designelement1" />
          <Animation className="designelement2 -mt-12" />
          <OfferCard {...allOfferCards[6]} className="item7 md:-my-16" />
          <OfferCard {...allOfferCards[7]} className="item8 md:-my-16" />
          <OfferCard {...allOfferCards[8]} className="item9 md:-my-16" />
          <OfferCard {...allOfferCards[9]} className="item10 md:-my-16" />
          <DesignElement2 className="item11"/>
        </div>
      </div>
    </div>
  );
};

export default WhatWeOffer;