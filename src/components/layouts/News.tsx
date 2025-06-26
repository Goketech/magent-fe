import React, { useRef } from 'react';
import { motion, useInView, Variants } from 'framer-motion';
import Slider from 'react-slick';
import Image from "next/image"

// Placeholder component for images
const NewsImagePlaceholder: React.FC<{ text: string; className?: string }> = ({ text, className = "" }) => (
  <div
    className={`w-full h-48 bg-neutral-700/80 backdrop-blur-sm rounded-t-xl flex items-center justify-center p-4 shadow-lg ${className}`}
  >
    <span className="text-neutral-400 text-center text-xs">{text}</span>
  </div>
);

interface NewsArticle {
  id: string;
  imageText: string;
  imageUrl: string;
  category: string;
  categoryColor: string;
  title: string;
  description: string;
}

const newsArticlesData: NewsArticle[] = [
  {
    id: 'news1',
    imageText: 'Image: Smartphone displaying holographic financial data, glowing pink/purple.',
    imageUrl: '/new1.png',
    category: 'Mobile Intelligence',
    categoryColor: 'bg-pink-500',
    title: 'Data Levitates: Immersive UX in Your Palm',
    description: 'Where data isn’t just displayed — it levitates. Real-time analytics, immersive UX, and holographic precision in the palm of your hand.',
  },
  {
    id: 'news2',
    imageText: 'Image: Stylized human head with glowing neural circuits inside, futuristic interface elements around it.',
    imageUrl: '/new2.png',
    category: 'Meet the Mind of Tomorrow',
    categoryColor: 'bg-purple-500',
    title: 'AI is Here: Decoding the Future, One Stream at a Time',
    description: 'AI isn’t coming — it’s here, glowing in neural circuits and decoding the future one data stream at a time.',
  },
  {
    id: 'news3',
    imageText: 'Image: Laptop screen with complex data visualizations and graphs, glowing blue.',
    imageUrl: '/new3.png',
    category: 'Your Digital Edge',
    categoryColor: 'bg-indigo-500',
    title: 'Next-Gen Metrics: Visualize & Optimize',
    description: 'From raw metrics to real-time insights, visualize, optimize, and master the digital realm with next-gen analytics.',
  },
  {
    id: 'news4',
    imageText: 'Image: Abstract representation of interconnected data nodes, glowing green.',
    imageUrl: '/new1.png',
    category: 'Decentralized Insights',
    categoryColor: 'bg-green-500',
    title: 'The Future of Data: Transparent & Secure',
    description: 'Exploring how blockchain technology is revolutionizing data transparency and security across industries.',
  },
  {
    id: 'news5',
    imageText: 'Image: Collaborative workspace with futuristic AR displays, glowing orange.',
    imageUrl: '/new2.png',
    category: 'Web3 Collaboration',
    categoryColor: 'bg-orange-500',
    title: 'Building Together: The New Era of Teamwork',
    description: 'Web3 tools are fostering unprecedented levels of collaboration and innovation in project development.',
  },
  {
    id: 'news6',
    imageText: 'Image: Artistic render of a secure data vault with digital locks, glowing teal.',
    imageUrl: '/new3.png',
    category: 'Privacy in Web3',
    categoryColor: 'bg-teal-500',
    title: 'Own Your Data: The Sovereignty Shift',
    description: 'Understanding the shift towards user-owned data and enhanced privacy in the evolving Web3 landscape.',
  },
];

interface NewsCardProps extends NewsArticle {}

const NewsCard: React.FC<NewsCardProps> = ({ imageText, category, categoryColor, title, description, imageUrl }) => {
  return (
    <div className="bg-[#130F18] rounded-xl shadow-xl overflow-hidden h-full flex flex-col mx-2 md:mx-3" role="article" aria-labelledby={`news-title-${title.replace(/\s+/g, '-').toLowerCase()}`}>
      <Image
        src={imageUrl}
        alt={imageText}
        className="w-full h-48 object-cover rounded-t-xl"
        width={600}
        height={600}
      />
      <div className="p-5 md:p-6 flex flex-col flex-grow">
        {/* <span className={`text-xs font-semibold px-3 py-1 ${categoryColor} text-white rounded-full self-start mb-3`}>
          {category} */}
        {/* </span> */}
        <h3 id={`news-title-${title.replace(/\s+/g, '-').toLowerCase()}`} className="text-lg md:text-xl font-semibold text-[#DE3AF7] mb-2">{title}</h3>
        <p className="text-neutral-400 text-sm leading-relaxed flex-grow">{description}</p>
      </div>
    </div>
  );
};

const News: React.FC = () => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const titleVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  const carouselVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut', delay: 0.3 } },
  };
  
  const sliderSettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
    appendDots: (dots: React.ReactNode) => (
      <div style={{ bottom: "-40px" }}>
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-2.5 h-2.5 bg-neutral-600 rounded-full transition-colors duration-300 hover:bg-neutral-400 slick-active:bg-purple-500">
      </div>
    )
  };

  return (
    <div ref={sectionRef} className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          variants={titleVariants}
          initial="hidden"
          animate={isSectionInView ? 'visible' : 'hidden'}
          className="text-4xl sm:text-5xl md:text-[52px] font-bold text-white text-center mb-12 md:mb-16"
          aria-label="In The News"
        >
          In The News
        </motion.h2>

        <motion.div
          variants={carouselVariants}
          initial="hidden"
          animate={isSectionInView ? 'visible' : 'hidden'}
          className="pb-10" // Padding bottom to accommodate dots
        >
          {newsArticlesData.length > 0 ? (
             <Slider {...sliderSettings}>
                {newsArticlesData.map((article) => (
                <NewsCard key={article.id} {...article} />
                ))}
            </Slider>
          ) : (
            <p className="text-neutral-400 text-center">No news articles to display.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default News;