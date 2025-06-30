"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  ArrowRight,
} from "lucide-react";
import Image from "next/image";

const BlogApp = () => {
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  // Sample blog articles
  const articles = [
    {
      id: 1,
      title: `Mobile Intelligence: The Future of Data Interaction Is Here`,
      description: `In a world where data is the new oil, how we interact with that data determines our edge. Welcome to the era of Mobile Intelligence — where smartphones are no longer just tools of communication, but powerful, intelligent portals that merge physical reality with data-driven decision-making.

The future isn’t on your desktop. It’s glowing in your palm.`,
      subtitle: "Revolutionizing how we connect with information",
      date: "22 06 2025",
      readTime: "5 min read",
      image: "/new1.png",
      thumbnail: "/api/placeholder/300/200",
      sections: [
        {
          heading: "The Dawn of Intelligent Interfaces",
          description:
            "In a world where data is the new oil, how we interact with that data determines our edge. Welcome to the era of Mobile Intelligence – where processing power meets intuitive design, creating experiences that bridge the gap between human intent and machine precision. The future isn't on your desktop; it's growing in your palm.",
        },
        {
          heading: "The Rise of Holographic Interfaces",
          description:
            "Picture this: you're reviewing today's mobile experiences are moving beyond the 2D paradigm into immersive holographic dimensions. Floating UI upon your fingertips, suspended in mid-air – dynamically visualizing in real-time, responsive to your gestures, and deeply connective to your consciousness.",
        },
        {
          heading: "Next-Generation Data Visualization",
          description:
            "This is the next-level where minds meets AR and machine learning. Mobile Intelligence is redefining interfaces. Multi-layered data visualization powered by edge AI. Context-based commands reducing touch. Augmented portals for real-world exploration, trade analytics and diagnostics.",
        },
      ],
    },
    {
      id: 2,
      title: "Quantum Computing: Unlocking Infinite Possibilities",
      subtitle: "Breaking the barriers of classical computation",
      date: "20 06 2025",
      readTime: "7 min read",
      image: "/new2.png",
      thumbnail: "/api/placeholder/300/200",
      sections: [
        {
          heading: "Beyond Classical Limitations",
          description:
            "Quantum computing represents a fundamental shift in how we process information. Unlike classical bits that exist in binary states, quantum bits (qubits) can exist in multiple states simultaneously through superposition, enabling exponentially more powerful computations.",
        },
        {
          heading: "Real-World Applications Emerging",
          description:
            "From drug discovery to financial modeling, quantum systems are beginning to solve problems that would take classical computers millennia. Major tech giants are racing to achieve quantum supremacy, with breakthrough applications in cryptography, optimization, and artificial intelligence.",
        },
        {
          heading: "The Quantum Internet Vision",
          description:
            "Imagine a network where information travels instantaneously across vast distances through quantum entanglement. This quantum internet promises unhackable communications and distributed quantum computing power accessible globally.",
        },
      ],
    },
    {
      id: 3,
      title: "Neural Networks: The Mind Behind AI Revolution",
      subtitle: "Understanding the architecture of artificial intelligence",
      date: "18 06 2025",
      readTime: "6 min read",
      image: "/new3.png",
      thumbnail: "/api/placeholder/300/200",
      sections: [
        {
          heading: "Mimicking Human Cognition",
          description:
            "Neural networks draw inspiration from the human brain, creating artificial synapses that learn and adapt. These interconnected nodes process information in ways that mirror biological neural pathways, enabling machines to recognize patterns and make decisions.",
        },
        {
          heading: "Deep Learning Architectures",
          description:
            "Modern deep learning models contain millions or billions of parameters, creating sophisticated hierarchies of feature detection. From convolutional networks for image recognition to transformers for language processing, each architecture serves specific cognitive functions.",
        },
        {
          heading: "The Future of Artificial General Intelligence",
          description:
            "As neural networks become more sophisticated, we edge closer to artificial general intelligence – AI systems that can understand, learn, and apply knowledge across diverse domains just like humans, potentially revolutionizing every aspect of society.",
        },
      ],
    },
    {
      id: 4,
      title: "Blockchain Revolution: Decentralizing Digital Trust",
      subtitle: "Redefining security and transparency in the digital age",
      date: "16 06 2025",
      readTime: "4 min read",
      image: "/new1.png",
      thumbnail: "/api/placeholder/300/200",
      sections: [
        {
          heading: "Distributed Ledger Technology",
          description:
            "Blockchain creates immutable records distributed across networks, eliminating the need for central authorities. Each block contains cryptographic hashes linking to previous blocks, creating an unbreakable chain of verified transactions.",
        },
        {
          heading: "Smart Contracts and Automation",
          description:
            "Self-executing contracts with terms directly written into code are revolutionizing agreements and transactions. These smart contracts automatically enforce rules and execute actions when predetermined conditions are met, reducing need for intermediaries.",
        },
        {
          heading: "Beyond Cryptocurrency Applications",
          description:
            "While Bitcoin introduced blockchain to the world, the technology's applications extend far beyond digital currency. Supply chain tracking, digital identity verification, voting systems, and intellectual property protection are being transformed by blockchain innovation.",
        },
      ],
    },
    {
      id: 5,
      title: "Metaverse Architectures: Building Virtual Worlds",
      subtitle: "Designing immersive digital experiences",
      date: "14 06 2025",
      readTime: "8 min read",
      image: "/new2.png",
      thumbnail: "/api/placeholder/300/200",
      sections: [
        {
          heading: "Spatial Computing Fundamentals",
          description:
            "The metaverse relies on spatial computing to create believable virtual environments. Advanced rendering engines, physics simulations, and haptic feedback systems work together to create immersive experiences that feel tangible and responsive to user interaction.",
        },
        {
          heading: "Social Interactions in Virtual Space",
          description:
            "Virtual worlds enable new forms of social connection through avatars, shared experiences, and collaborative environments. Users can attend virtual concerts, participate in business meetings, or explore fantastical landscapes with friends from around the globe.",
        },
        {
          heading: "Economic Systems and Digital Ownership",
          description:
            "The metaverse introduces new economic models where virtual assets have real value. NFTs enable true digital ownership, virtual real estate commands premium prices, and new job categories emerge for creators, designers, and virtual world architects.",
        },
      ],
    },
  ];

  const currentArticle = articles[currentArticleIndex];
  const otherArticles = articles.filter(
    (_, index) => index !== currentArticleIndex
  );

  const handlePrevious = () => {
    setCurrentArticleIndex((prev) =>
      prev === 0 ? articles.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentArticleIndex((prev) => (prev + 1) % articles.length);
  };

  const handleArticleSelect = (articleIndex: number) => {
    const actualIndex = articles.findIndex(
      (article) => article.id === articleIndex
    );
    setCurrentArticleIndex(actualIndex);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 gap-8">
          {/* Main Article */}
          <div className="lg:col-span-3">
            <article className="space-y-8">
              {/* Article Header */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>Effective Date: {currentArticle.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>Last Updated: {currentArticle.date}</span>
                  </div>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  {currentArticle.title}
                </h1>

                <p className="text-xl text-gray-300 leading-relaxed">
                  {currentArticle.subtitle}
                </p>
              </div>

              {/* Featured Image */}
              <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 h-64 md:h-96">
                {/* Background Image */}
                <Image
                  src={currentArticle.image}
                  alt={currentArticle.title}
                  fill
                  className="object-cover mix-blend-overlay"
                  priority
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 z-10"></div>

                {/* Content over image */}
                <div className="relative z-20 text-white p-6">
                  <h2 className="text-xl font-semibold">
                    {currentArticle.title}
                  </h2>
                  <p className="text-sm opacity-80 mt-2">
                    {currentArticle.title}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
              </div>

              {/* Article Content */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="text-lg text-gray-300 leading-relaxed">
                  <p>{currentArticle.description}</p>
                  {currentArticle.sections.map((section, index) => (
                    <div key={index} className="mb-8 space-y-4">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        {section.heading}
                      </h2>
                      <p className="text-lg text-gray-300 leading-relaxed">
                        {section.description}
                      </p>
                    </div>
                  ))}
                </div>

                {/* <div className="lg:col-span-1 space-y-6"> */}
                <div className=" rounded-2xl">
                  <h3 className="text-lg font-semibold mb-4 text-blue-400">
                    Latest Articles
                  </h3>
                  <div className="space-y-8">
                    {otherArticles.slice(0, 4).map((article) => (
                      <div
                        key={article.id}
                        onClick={() => handleArticleSelect(article.id)}
                        className=" w-[450px] cursor-pointer block hover:bg-gray-700/50 rounded-2xl overflow-hidden  transition-all duration-200 border border-transparent hover:border-purple-500/30"
                      >
                        <div className="flex flex-col items-start ">
                          <Image
                            width={456}
                            height={280}
                            src={article.image}
                            alt={article.title}
                          />
                          <div className="flex-1 w-full m-2 pr-4 ">
                            <h4 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2 mb-1 text-right py-7 ">
                              {article.title}
                            </h4>
                            <div className="flex items-center justify-between text-xs text-gray-400">
                              <span>{article.date}</span>
                              <span>{article.readTime}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                

                {/* CTA Section */}

                {/* </div> */}
              </div>
              <div className="">
                <Image
                  src={currentArticle.image}
                  alt={currentArticle.title}
                //   width={}
                //   height={}
                  className="h-auto w-auto object-cover mix-blend-overlay"
                  priority
                />
            </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-8 border-t border-gray-800">
                <button
                  onClick={handlePrevious}
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors group"
                >
                  <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  <span>Previous Article</span>
                </button>

                <button
                  onClick={handleNext}
                  className="flex items-center space-x-2 text-blue-400 hover:text-blue-300 transition-colors group"
                >
                  <span>Next Article</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </article>
            
          </div>

          {/* Sidebar */}
        </div>
      </div>
    </div>
  );
};

export default BlogApp;
