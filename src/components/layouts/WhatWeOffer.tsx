import React, { useRef } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

interface OfferCardData {
  id: string;
  color: string; // Tailwind background color class for the label
  label: string;
  title: string;
  text: string;
}

// Props for OfferCard component are the same as OfferCardData
interface OfferCardProps extends OfferCardData {}

const OfferCard: React.FC<OfferCardProps> = ({ color, label, title, text }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"], // Animate when card is visible in viewport
  });

  // Create a motion value for rotation in degrees
  const rotationDegrees: MotionValue<number> = useTransform(scrollYProgress, [0, 1], [0, 720]);

  // Transform the rotation degrees into a conic-gradient string
  const conicGradientBackground: MotionValue<string> = useTransform(
    rotationDegrees,
    (latestRotation) => `conic-gradient(from ${latestRotation}deg at 50% 50%, #C8B6FF, #FFC8DD, #F2E8CF, #BDE0FE, #A8DADC, #C8B6FF)`
  );

  return (
    // Card container: relative positioning for absolute children, overflow hidden for border effect
    <div ref={cardRef} className="relative bg-neutral-900 rounded-xl shadow-2xl h-full overflow-hidden group flex flex-col">
      {/* Animated gradient border element */}
      <motion.div
        className="absolute inset-[-200%]" // Make it very large to avoid seeing edges of the gradient box itself during rotation
        style={{
          zIndex: 0, // Behind the content
          background: conicGradientBackground, // Use the transformed motion value here
        }}
      />
      {/* Content Container: Sits on top of the animated border, with a margin to reveal the border */}
      <div className="relative z-10 bg-neutral-900 m-[2px] rounded-[10px] p-6 flex flex-col flex-grow">
        <span className={`text-xs font-semibold px-3 py-1 ${color} text-black rounded-full self-start mb-4`}>
          {label}
        </span>
        <h3 className="text-lg md:text-xl font-semibold text-white mb-2">{title}</h3>
        <p className="text-neutral-400 text-sm leading-relaxed flex-grow">{text}</p>
      </div>
    </div>
  );
};

// Placeholder for the first design element (purple cubes)
const DesignElement1: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center bg-neutral-800/70 backdrop-blur-sm rounded-xl p-6 min-h-[200px] md:min-h-full shadow-xl">
    <svg width="80" height="80" viewBox="0 0 100 100" className="opacity-60">
        <defs>
            <linearGradient id="gradDesign1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style={{stopColor: '#A855F7', stopOpacity:1}} />
            <stop offset="100%" style={{stopColor: '#6D28D9', stopOpacity:1}} />
            </linearGradient>
        </defs>
        <path d="M20 30 L50 10 L80 30 L50 50 Z" fill="url(#gradDesign1)" stroke="#C4B5FD" strokeWidth="1.5"/>
        <path d="M20 70 L50 50 L80 70 L50 90 Z" fill="url(#gradDesign1)" stroke="#C4B5FD" strokeWidth="1.5" opacity="0.7"/>
        <path d="M20 30 L20 70 L50 50 M80 30 L80 70 L50 50" stroke="#C4B5FD" strokeWidth="1" fill="none" opacity="0.5"/>
        <rect x="40" y="40" width="20" height="20" fill="#8B5CF6" opacity="0.4"/>
    </svg>
  </div>
);

// Placeholder for the second design element (abstract purple/pink objects)
const DesignElement2: React.FC = () => (
  <div className="w-full h-full flex items-center justify-center bg-neutral-800/70 backdrop-blur-sm rounded-xl p-6 min-h-[200px] md:min-h-full shadow-xl">
     <svg width="100" height="60" viewBox="0 0 120 70" className="opacity-70">
        <defs>
            <radialGradient id="gradDesign2" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                <stop offset="0%" style={{stopColor: '#EC4899', stopOpacity:0.8}} />
                <stop offset="100%" style={{stopColor: '#D946EF', stopOpacity:1}} />
            </radialGradient>
            <linearGradient id="gradDesign3" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor: '#A78BFA', stopOpacity:0.8}} />
                <stop offset="100%" style={{stopColor: '#7C3AED', stopOpacity:1}} />
            </linearGradient>
        </defs>
        <circle cx="25" cy="35" r="15" fill="url(#gradDesign2)" />
        <ellipse cx="60" cy="35" rx="20" ry="12" fill="url(#gradDesign3)" />
        <rect x="85" y="25" width="25" height="25" rx="5" fill="url(#gradDesign2)" transform="rotate(15 97.5 37.5)" />
        <circle cx="40" cy="20" r="8" fill="#C084FC" opacity="0.6"/>
        <circle cx="75" cy="50" r="10" fill="#F472B6" opacity="0.5"/>
    </svg>
  </div>
);

// Data for all offer cards
const allOfferCards: OfferCardData[] = [
  { id: 'research', color: 'bg-[#C8B6FF]', label: 'Research', title: 'Intelligent research made simple with AI', text: 'We simplify market research by aggregating data from diverse sources, saving organizations valuable time and effort. We helps define clear marketing objectives, identify market size and potential, uncover industry trends, discover ideal customers and competitors.' },
  { id: 'reports', color: 'bg-[#F2E8CF]', label: 'Reports', title: 'Effortless reports, powerful results', text: 'Simplify your reporting process with AI-generated reports that are clear, concise, and actionable. From performance summaries to in-depth analytics, our platform delivers the insights you need to showcase results and make data-driven decisions with confidence.' },
  { id: 'insights', color: 'bg-[#FFC8DD]', label: 'Insights', title: 'Actionable insights at your fingertips', text: 'Gain a deeper understanding of your audience and market with AI-powered insights that turn data into action. From performance analytics to customer behavior trends, our platform delivers the clarity you need to make smarter, faster decisions that drive real results.' },
  { id: 'strategy', color: 'bg-[#BDE0FE]', label: 'Strategy', title: 'Smart strategy, seamless execution', text: 'Magent will help with marketing campaign ideas, media channel selection, strategic architecture, execution approach from market research and Insights, and step-by-step guide to achieve marketing objectives.' },
  { id: 'ownership', color: 'bg-[#FFAFCC]', label: 'Own-to-earn', title: 'Ownership that pays off', text: 'We will help businesses access data and data owners will receive cryptocurrency rewards for sharing their data. This will also help us to provide real-time data update.' },
  { id: 'analysis', color: 'bg-[#A8DADC]', label: 'Analysis', title: 'Precise analysis for smarter decisions', text: 'Our platform breaks down complex information into easy-to-understand visuals and trends, helping you make informed decisions that drive growth and optimize performance.' },
  { id: 'executive', color: 'bg-[#A7C957]', label: 'Executive assistant', title: 'Simplified executive support', text: 'With text and voice prompt, the platform can help plan and organize your busy schedule, send voice reminder notifications and help you prioritize important tasks based on your available time frames.' },
  { id: 'integration', color: 'bg-[#DDA15E]', label: 'Platform integration', title: 'Connect and integrate with ease', text: 'The platform can be connected to different social media and marketing platforms for analysis, insights generation, report generation and campaign deployment.' },
  { id: 'automation', color: 'bg-[#A2D2FF]', label: 'Automation', title: 'Automate your marketing, amplify your impact', text: 'You can plug-in all your marketing platforms and allow our platform to automate your marketing activities like email marketing, social media posting, digital campaign deployment and reporting.' },
  { id: 'management', color: 'bg-[#FDF0D5]', label: 'Platform management', title: 'Effortless platform management', text: 'Why switch across multiple tabs, when you can integrate, execute, view, optimize and manage every digital marketing activities all in one place.' },
];

// Helper function to retrieve card data by ID
const getCard = (id: string): OfferCardData => {
  const card = allOfferCards.find(c => c.id === id);
  if (!card) throw new Error(`Card with id ${id} not found.`);
  return card;
};

// Define the type for items that can be rendered in the grid
type GridItem = 
  | { type: 'card'; data: OfferCardData } 
  | { type: 'design'; element: React.ReactNode; id: string } 
  | { type: 'empty'; id: string }; // For creating empty spaces in the desktop grid

const WhatWeOffer: React.FC = () => {
  // Define the sequence of items to render, including placeholders for layout control
  const itemsToRender: GridItem[] = [
    { type: 'card', data: getCard('research') },    // Row 1, Col 1
    { type: 'card', data: getCard('reports') },     // Row 1, Col 2
    { type: 'card', data: getCard('insights') },    // Row 1, Col 3
  
    { type: 'card', data: getCard('strategy') },    // Row 2, Col 1
    { type: 'design', element: <DesignElement1 />, id: 'design1' }, // Row 2, Col 2
    { type: 'card', data: getCard('ownership') },   // Row 2, Col 3
  
    { type: 'empty', id: 'empty_row3_col1' },       // Row 3, Col 1 (desktop only)
    { type: 'card', data: getCard('analysis') },    // Row 3, Col 2
    { type: 'empty', id: 'empty_row3_col3' },       // Row 3, Col 3 (desktop only)
  
    { type: 'card', data: getCard('executive') },   // Row 4, Col 1
    { type: 'design', element: <DesignElement2 />, id: 'design2' }, // Row 4, Col 2
    { type: 'card', data: getCard('integration') }, // Row 4, Col 3
  
    { type: 'card', data: getCard('automation') },  // Row 5, Col 1
    { type: 'empty', id: 'empty_row5_col2' },       // Row 5, Col 2 (desktop only)
    { type: 'card', data: getCard('management') },  // Row 5, Col 3
  ];

  return (
    <div className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 my-[30px] md:my-[70px]"> {/* Added bg-neutral-950 for overall section background */}
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white text-center mb-12 md:mb-20">
        What we offer
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-7xl mx-auto">
        {itemsToRender.map((item) => {
          if (item.type === 'card') {
            return <OfferCard key={item.data.id} {...item.data} />;
          }
          if (item.type === 'design') {
            // Ensure design elements also respect h-full for consistent row heights
            return <div key={item.id} className="h-full">{item.element}</div>;
          }
          if (item.type === 'empty') {
            // Empty divs take space in the desktop grid but are hidden on mobile
            return <div key={item.id} className="hidden md:block"></div>;
          }
          return null; // Should not be reached with a well-defined itemsToRender array
        })}
      </div>
    </div>
  );
};

export default WhatWeOffer;
