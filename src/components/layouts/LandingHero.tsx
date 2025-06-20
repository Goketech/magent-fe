import { motion } from "framer-motion";
import Animation from "./Animation";

const LandingHero = () => {
  return (
    <motion.div 
      className="flex items-center justify-between gap-[20px] md:gap-0 px-[20px] md:px-[80px] my-[40px] md:my-[99px] mb-[60px] md:mb-[100px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Left Animation */}
      <motion.div 
        className="hidden md:block w-[243px] h-[203px]"
        initial={{ opacity: 0, x: -100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ 
          duration: 1,
          delay: 0.2,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
      >
        <Animation />
      </motion.div>

      {/* Center Content */}
      <motion.div 
        className="max-w-[801px] text-white text-center px-2"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ 
          duration: 0.8,
          delay: 0.4,
          ease: "easeOut"
        }}
      >
        <motion.h1 
          className="text-[30px] md:text-[48px] font-[700] leading-[38.4px] md:leading-[50px]"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 0.6,
            ease: "easeOut"
          }}
        >
          Your AI partner for smarter, faster <br className="md:hidden" />{" "}
          marketing
        </motion.h1>
        
        <motion.p 
          className="font-[400] text-[14px] md:text-[18px] leading-[21px] md:leading-[27px] mt-[10px] md:mt-[25px]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.8,
            delay: 0.8,
            ease: "easeOut"
          }}
        >
          Our AI Marketing Assistant analyzes data, predicts trends, and
          crafts personalized strategies to help your business thrive. Boost
          engagement, save time, and drive results—all with the power of AI at
          your fingertips.
        </motion.p>
      </motion.div>

      {/* Right Element */}
      <motion.div 
        className="hidden md:block w-[243px] h-[203px] "
        initial={{ opacity: 0, x: 100, scale: 0.8 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ 
          duration: 1,
          delay: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.3 }
        }}
      >
        <Animation />
      </motion.div>
    </motion.div>
  );
};

export default LandingHero;