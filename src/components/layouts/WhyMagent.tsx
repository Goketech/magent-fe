import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Image from 'next/image';

// Placeholder component for images (remains unchanged)
const PlaceholderImage: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => (
  <div
    className={`w-full h-64 sm:h-80 md:h-full bg-neutral-800/70 backdrop-blur-sm rounded-xl flex items-center justify-center p-6 md:p-8 shadow-2xl min-h-[250px] md:min-h-[400px] ${className}`}
  >
    <span className="text-neutral-400 text-center text-sm md:text-base">{text}</span>
  </div>
);

interface FeatureBlockProps {
  imagePlaceholder: string;
  title: React.ReactNode; 
  imagepath: string; // Optional image path if not using placeholder
  subtitle: string;
  paragraphs: string[];
  tagline?: string;
  imagePosition?: 'left' | 'right';
}

const FeatureBlock: React.FC<FeatureBlockProps> = ({
  imagePlaceholder,
  imagepath , // Default to empty string if no image path provided
  title,
  subtitle,
  paragraphs,
  tagline,
  imagePosition = 'left'
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 }); // Trigger when 20% visible

  const blockVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6, ease: "easeOut" } 
    }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, x: imagePosition === 'left' ? -40 : 40 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.5, ease: "easeOut", delay: 0.2 } // Delay after block appears
    }
  };
  
  const textContainerVariants: Variants = {
    hidden: {}, // No initial animation for the container itself, children will handle it
    visible: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.35 // Delay after image appears
      }
    }
  };

  const textItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      ref={ref}
      className={`flex flex-col md:flex-row items-start gap-8 md:gap-12 lg:gap-16`}
      variants={blockVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      <motion.div 
        className={`w-full md:w-1/2 ${imagePosition === 'right' ? 'md:order-last' : ''}`}
        variants={imageVariants}
        // initial="hidden" // Handled by parent's animate state
        // animate={isInView ? "visible" : "hidden"}
      >
        <Image
          src={imagepath} // Placeholder image path
          alt={imagePlaceholder}
          width={600}
          height={400}
          className="w-full h-auto rounded-xl shadow-2xl"
          />
      </motion.div>
      <motion.div 
        className={`w-full md:w-1/2 ${imagePosition === 'right' ? 'md:order-first' : ''}`}
        variants={textContainerVariants}
        // initial="hidden" // Handled by parent's animate state
        // animate={isInView ? "visible" : "hidden"}
      >
        <motion.h3 
          variants={textItemVariants}
          className="text-3xl md:text-[32px] lg:text-[40px] font-bold text-white mb-3 md:mb-4 leading-tight"
        >
          {title}
        </motion.h3>
        <motion.p 
          variants={textItemVariants}
          className=" mb-4 text-[#999999] text-base leading-relaxed"
        >
          {subtitle}
        </motion.p>
        <div className="space-y-4 text-[#999999] text-base leading-relaxed">
          {paragraphs.map((p, index) => (
            <motion.p variants={textItemVariants} key={index}>{p}</motion.p>
          ))}
        </div>
        {tagline && (
          <motion.p 
            variants={textItemVariants}
            className="mt-4 text-[#999999] text-base leading-relaxed"
          >
            {tagline}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};


const WhyMagent: React.FC = () => {
  const titleRef = useRef(null);
  // useInView for title is not strictly necessary if we animate on mount, but good for consistency or if it could be off-screen.
  // For simplicity, we can animate the title on component load without useInView.
  // const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });


  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-neutral-950 overflow-hidden"> {/* Added overflow-hidden to contain animations */}
      <div className="max-w-7xl mx-auto">
        <motion.h2
          ref={titleRef}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-white text-center mb-16 md:mb-24 leading-tight"
        >
          Why Magent?
        </motion.h2>

        <div className="space-y-16 md:space-y-24">
          {/* Feature Block 1: Crypto-native Ads Exchange */}
          <FeatureBlock
            imagePlaceholder="Image: Hand interacting with a futuristic financial graph, vibrant teal and magenta lines on dark background."
            title={<>Crypto-native<br />Ads Exchange</>}
            imagepath='/why1.png'
            subtitle="Onchain attention meets programmable incentives."
            paragraphs={[
              "Here at Magent, We’re building the first permissionless ad exchange designed for Web3 — where impressions, targeting, and rewards are fully transparent, composable, and verifiable onchain.",
              "No cookies. No centralized intermediaries. Just wallet-native engagement, zk-based identity, and real-time performance. Ads as contracts. Attention as blockspace.",
              "Welcome to the future of advertising — built for crypto."
            ]}
            imagePosition="left"
          />

          {/* Feature Block 2: AI Powered Sales/KOL Campaign manager */}
          <FeatureBlock
            imagePlaceholder="Image: Laptop displaying code, with a glowing, stylized brain emerging from the screen, set against a dark, techy background."
            title={<>AI Powered Sales/KOL<br />Campaign manager</>}
            imagepath='/why2.png'
            subtitle="Scale growth with precision. Automate chaos."
            paragraphs={[
              "Leverage AI to identify top-performing KOLs, coordinate outreach, manage deliverables, and track onchain impact — all from one dashboard.",
              "No spreadsheets. No guesswork. Just smart coordination, real-time analytics, and campaign flows that adapt as fast as crypto moves."
            ]}
            tagline="Built for Web3 teams. Powered by data. Tuned for virality."
            imagePosition="right" 
          />

          {/* Feature Block 3: AI Powered Marketing Assistant */}
          <FeatureBlock
            imagePlaceholder="Image: Hand reaching towards a cloud of glowing, abstract digital icons and data points, in shades of pink and purple."
            title={<>AI Powered<br />Marketing Assistant</>}
            imagepath='/why3.png'
            subtitle="At Magent, we help Your 24/7 growth brain — optimized for Web3."
            paragraphs={[
              "From campaign strategy to copywriting, content planning to performance tracking — let AI handle the heavy lifting so you can focus on shipping.",
              "Trained on crypto-native trends. Integrated with your stack. Aligned with your tone."
            ]}
            tagline="Smarter marketing. Zero overhead. Onchain-ready."
            imagePosition="left"
          />
        </div>
      </div>
    </div>
  );
};

export default WhyMagent;