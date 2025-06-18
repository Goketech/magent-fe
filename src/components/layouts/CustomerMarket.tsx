import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';

interface StatisticCardProps {
  value: string;
  description: string;
  animationDelay: number;
}

const StatisticCard: React.FC<StatisticCardProps> = ({ value, description, animationDelay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 40, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5, ease: 'easeOut', delay: animationDelay },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      className="bg-[#130F18] p-6 md:p-8 rounded-xl text-center flex flex-col items-center justify-center h-full "
      aria-label={`${description}: ${value}`}
    >
      <p className="text-4xl md:text-5xl font-bold text-[#095AD3] mb-3 pt-8">{value}</p>
      <p className="text-[#999999] text-sm md:text-[20px] leading-relaxed pb-8">{description}</p>
    </motion.div>
  );
};

const customerMarketData = [
  {
    id: 'total-market',
    value: '$90BN+',
    description: 'The Total market of digital advertising',
  },
  {
    id: 'ad-fraud',
    value: '$81MN',
    description: 'Businesses losing money from marketing ad fraud',
  },
  {
    id: 'web3-startups',
    value: '$3MN',
    description: 'Web3 Startups in pre-seed and early stage',
  },
];

const CustomerMarket: React.FC = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div ref={sectionRef} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className=" mx-auto">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          animate={isSectionInView ? 'visible' : 'hidden'}
          className="text-4xl sm:text-5xl md:text-[52px] font-bold text-white text-center mb-12 md:mb-16"
          aria-label="Customer Market Statistics"
        >
          Customer Market
        </motion.h2>
<div className=''>

        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-[30px] md:gap-[50px]">
          {customerMarketData.map((stat, index) => (
            <StatisticCard
              key={stat.id}
              value={stat.value}
              description={stat.description}
              animationDelay={index * 0.15 + 0.2} 
            />
          ))}
        </div>
</div>
      </div>
    </div>
  );
};

export default CustomerMarket;