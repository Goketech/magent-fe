"use client";

import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Image from "next/image";

const BlogApp = () => {
  const [currentArticleIndex, setCurrentArticleIndex] = useState(0);

  // Sample blog articles
  const articles = [
    {
      id: 1,
      title: `Mobile Intelligence: The Future of Data Interaction Is Here`,
      description: `
  <p>In a world where data is the new oil, how we interact with that data determines our edge. Welcome to the era of Mobile Intelligence — where smartphones are no longer just tools of communication, but powerful, intelligent portals that merge physical reality with data-driven decision-making.</p>
  <p>The future isn’t on your desktop. It’s glowing in your palm.</p>
`,
      subtitle: "Revolutionizing how we connect with information",
      summary: "Mobile devices are transforming into intelligent, immersive portals that merge the digital and physical worlds. This article explores how holographic interfaces, edge AI, and gesture-driven experiences are redefining how we see, feel, and act on data in real time.",
      date: "22 06 2025",
      readTime: "5 min read",
      image: "/new1.png",
      thumbnail: "/api/placeholder/300/200",
      sections: [
        {
          heading: "The Dawn of Intelligent Interfaces",
          description: `
  <p>Forget flat screens. Today’s mobile experiences are leaping beyond the 2D paradigm into a holographic reality.</p>
  <p>Imagine pulling up your financial dashboard or health vitals not as static charts, but as immersive 3D graphs suspended in mid-air — dynamically updating in real-time, responsive to your gestures, and deeply contextual.</p>
  <p>This is not sci-fi — it’s where UI/UX meets AR and machine learning.</p>
  <p>Mobile intelligence is redefining interfaces:</p>
  <ul class="list-disc list-inside">
    <li>Multi-layered data visualization powered by edge AI</li>
    <li>Gesture-based commands replacing touch</li>
    <li>Augmented overlays for real-world navigation, trade analysis, and diagnostics</li>
  </ul>
`,
        },
        {
          heading: "The Rise of Holographic Interfaces",
          description: `
  <ul class="list-disc list-inside space-y-1">
    <li>
      <strong>Finance:</strong> Imagine monitoring multi-chain asset performance via holographic charts, with sentiment analysis overlaid on token trends — all in one interactive 3D dashboard.
    </li>
    <li>
      <strong>Health:</strong> Biofeedback in real time — pulse rate, cortisol levels, sleep score, and workout suggestions rendered with neural precision.
    </li>
    <li>
      <strong>Logistics & Field Ops:</strong> AR-assisted routes, environmental data overlays, predictive maintenance — from the palm of your hand.
    </li>
  </ul>
  <p class="mt-4">Every industry is being reimagined under mobile intelligence.</p>
`,
        },
        {
          heading: "Technologies Making It Possible",
          description: `
    <ul class="list-disc list-inside space-y-1">
      <li>
        <strong>5G & Edge Computing:</strong> Near-zero latency lets holographic data render and refresh instantly.
      </li>
      <li>
        <strong>Neural Engines:</strong> Chipsets like Apple’s Neural Engine or Snapdragon AI accelerate real-time decision-making.
      </li>
      <li>
        <strong>Cross-chain Interoperability:</strong> For Web3 apps, this means data across Ethereum, Solana, or Cosmos chains can be visualized natively.
      </li>
      <li>
        <strong>Security Layered by Design:</strong> Biometric encryption, decentralized IDs, and on-device computation ensure privacy by default.
      </li>
    </ul>
  `,
        },
        {
          heading: "A Future in Your Palm",
          description: `
    <p>We’re not just holding phones anymore — we’re holding intelligent portals. Tools that see, interpret, and predict the world around us in ways unimaginable a decade ago.</p>
    <p><strong>Mobile Intelligence is not a trend.</strong> It’s a technological inevitability. And as it unfolds, those who master it will own the future — one swipe, one scan, one insight at a time.</p>
  `,
        },
      ],
    },
    {
  id: 2,
  title: "Meet the Mind of Tomorrow",
  subtitle: "Inside the synthetic brain shaping our digital world",
  date: "20 06 2025",
  description: `
  <p>Artificial intelligence is no longer confined to code and computation — it's evolving into a thinking partner. This article dives into the rise of synthetic minds that reason, learn, and adapt like us, reshaping everything from daily tasks to strategic decisions.</p>
`,
  summary: "Artificial intelligence is evolving from reactive assistants to proactive minds. This article explores how neural networks are mimicking human cognition, enabling machines to understand, adapt, and collaborate — not just compute.",
  readTime: "6 min read",
  image: "/new2.png",
  thumbnail: "/api/placeholder/300/200",
  sections: [
    {
      heading: "Synthetic Intelligence Comes Alive",
      description: `
        <p>We’ve passed the era of automation. Today’s neural networks are not just processing tasks — they’re modeling thought.</p>
        <ul class="list-disc list-inside">
          <li>GPT models writing articles and debugging code</li>
          <li>Vision transformers decoding MRI scans</li>
          <li>Reinforcement learning driving cars and playing chess</li>
        </ul>
      `,
    },
    {
      heading: "Neuroscience Meets Algorithms",
      description: `
        <p>AI is increasingly built to mirror the brain. Layered architectures and dynamic memory make today’s models more adaptable than ever.</p>
        <p>Tomorrow’s systems will learn faster, forget slower, and reason more like humans.</p>
      `,
    },
    {
      heading: "From Assistants to Advisors",
      description: `
        <p>The shift from passive tools to proactive companions is underway. AI doesn’t just respond — it anticipates.</p>
        <ul class="list-disc list-inside">
          <li>Smart assistants with emotional awareness</li>
          <li>Predictive systems for health and finance</li>
          <li>Autonomous agents that collaborate in teams</li>
        </ul>
      `,
    },
  ],
},

    {
  id: 3,
  title: "Your Data, Supercharged",
  subtitle: "Transforming raw information into real-time intelligence",
  date: "18 06 2025",
  summary: "Data is no longer dormant. It’s alive, streaming, and responsive. Discover how edge computing, real-time visualization, and immersive interfaces are transforming raw information into actionable, intuitive experiences.",
  description: `
  <p>Your data is no longer static — it’s streaming, contextual, and alive. This piece explores how edge computing, real-time pipelines, and immersive interfaces are transforming information into an intuitive, interactive force that powers modern decision-making.</p>
`
,
  readTime: "5 min read",
  image: "/new3.png",
  thumbnail: "/api/placeholder/300/200",
  sections: [
    {
      heading: "From Siloed to Streamlined",
      description: `
        <p>Data used to be passive — locked in spreadsheets and systems. Today, it's dynamic, interconnected, and live.</p>
        <ul class="list-disc list-inside">
          <li>APIs and webhooks stream updates in real time</li>
          <li>Data lakes unify structured and unstructured sources</li>
          <li>Dashboards adapt based on context and behavior</li>
        </ul>
      `,
    },
    {
      heading: "Edge Intelligence at Work",
      description: `
        <p>With edge computing, your phone, watch, or drone isn’t just collecting data — it’s understanding it instantly.</p>
        <p>Contextual processing reduces latency, enhances privacy, and enables smarter decisions — from health insights to environmental monitoring.</p>
      `,
    },
    {
      heading: "Data You Can Feel",
      description: `
        <p>Visualization isn’t just about bar charts anymore.</p>
        <ul class="list-disc list-inside">
          <li>Immersive 3D graphs that respond to gestures</li>
          <li>AR overlays showing live metrics in physical space</li>
          <li>Haptic alerts tied to key changes in trendlines</li>
        </ul>
      `,
    },
  ],
}
,
    {
  id: 4,
  title: "AI‑Driven Analytics",
  subtitle: "Making sense of chaos at machine scale",
  date: "16 06 2025",
  description: `
  <p>Analytics has entered a new era — where AI doesn’t just crunch numbers but uncovers patterns, predicts outcomes, and automates discovery. In this article, we explore how machine learning is turning complex data into clear, actionable intelligence at speed.</p>
`
,
  readTime: "5 min read",
  summary: "From unstructured data to predictive insights, AI is changing the way we analyze and act. Learn how intelligent systems surface patterns, anticipate outcomes, and automate discovery — making analytics smarter than ever.",
  image: "/new1.png",
  thumbnail: "/api/placeholder/300/200",
  sections: [
    {
      heading: "Understanding the Unstructured",
      description: `
        <p>80% of the world’s data is unstructured — text, voice, images. AI makes sense of it.</p>
        <ul class="list-disc list-inside">
          <li>Sentiment analysis across thousands of reviews</li>
          <li>Voice-to-insight for support calls</li>
          <li>Vision AI flagging anomalies in surveillance feeds</li>
        </ul>
      `,
    },
    {
      heading: "Predictive by Default",
      description: `
        <p>AI doesn’t just describe what happened — it predicts what comes next.</p>
        <ul class="list-disc list-inside">
          <li>Forecasting churn, revenue, or demand shifts</li>
          <li>AI-powered alerts for potential downtime or fraud</li>
          <li>Scenario modeling for strategic planning</li>
        </ul>
      `,
    },
    {
      heading: "Analytics Without Asking",
      description: `
        <p>With AI-driven analytics, you don’t have to dig for insights — they surface themselves:</p>
        <ul class="list-disc list-inside">
          <li>Proactive reports delivered at key moments</li>
          <li>Conversational queries in plain language</li>
          <li>Auto-generated charts and narratives</li>
        </ul>
      `,
    },
  ],
}
,
    {
  id: 5,
  title: "Mastering Market Trends",
  subtitle: "Seeing signals others miss with AI foresight",
  date: "14 06 2025",
  description: `
  <p>Markets move fast, and now you can move faster. This article examines how AI-powered insight engines decode signals from noise — giving traders, analysts, and businesses the tools to anticipate shifts, minimize risk, and gain competitive clarity in real time.</p>
`
,
  summary : "Markets don’t wait — and now, neither must you. Dive into how AI tracks signals across noise, translates data into strategy, and empowers investors to stay ahead with real-time, adaptive intelligence.",
  readTime: "6 min read",
  image: "/new3.png",
  thumbnail: "/api/placeholder/300/200",
  sections: [
    {
      heading: "Beyond Human Speed",
      description: `
        <p>Markets move in milliseconds. AI scans news, social chatter, and charts before humans blink.</p>
        <ul class="list-disc list-inside">
          <li>Sentiment tracking on token launches</li>
          <li>Price correlation across exchanges</li>
          <li>Real-time event detection from global feeds</li>
        </ul>
      `,
    },
    {
      heading: "From Noise to Narrative",
      description: `
        <p>AI identifies not just trends, but stories — linking causes to consequences.</p>
        <p>It builds confidence in decisions, reduces bias, and reveals early signals in noisy data.</p>
      `,
    },
    {
      heading: "Traders, Analysts, and AI Allies",
      description: `
        <p>Tomorrow’s investors won’t compete with AI — they’ll co-invest with it.</p>
        <ul class="list-disc list-inside">
          <li>Real-time dashboards that evolve with markets</li>
          <li>Custom watchlists that adapt to your strategy</li>
          <li>Automated alerts when conditions match your edge</li>
        </ul>
      `,
    },
  ],
}
,
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

              {/* Featured Image */}
              <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 h-64 md:h-96">
                {/* Background Image */}
                <Image
                  src={currentArticle.image}
                  alt={currentArticle.title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 z-10"></div>

                {/* Content over image */}
                <div className="relative z-20 text-white p-6 max-w-[300px] flex flex-col justify-center items-end w-full h-auto mt-[150px] ml-10 bg-[#08121DD9]">
                  <h2 className="text-xl font-semibold">
                    {currentArticle.title}
                  </h2>
                  <p className="text-sm opacity-80 mt-2">
                    {currentArticle.subtitle}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent" />
              </div>

              {/* Article Content */}
              <div className="flex flex-col md:flex-row gap-8">
                <div className="text-lg text-gray-300 leading-relaxed">
                  <div
                        className="text-[16px] md:text-[18px]  text-[#999999] leading-8 space-y-2 mb-6"
                        dangerouslySetInnerHTML={{
                          __html: currentArticle.description,
                        }}
                      />
                  {currentArticle.sections.map((section, index) => (
                    <div key={index} className="mb-8 space-y-8">
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        {section.heading}
                      </h2>
                      <div
                        className="text-[16px] md:text-[18px]  text-[#999999] leading-8 space-y-2"
                        dangerouslySetInnerHTML={{
                          __html: section.description,
                        }}
                      />
                    </div>
                  ))}
                </div>

                {/* <div className="lg:col-span-1 space-y-6"> */}
                <div className=" rounded-2xl">
                  <h3 className="text-lg font-semibold mb-4 text-blue-400 text-center ">
                    Latest Articles
                  </h3>
                  <div className="space-y-8">
                    {otherArticles.slice(0, 4).map((article) => (
                      <div
                        key={article.id}
                        onClick={() => handleArticleSelect(article.id)}
                        className=" w-[450px] cursor-pointer block hover:bg-gray-700/50 rounded-2xl overflow-hidden  transition-all duration-200 border border-transparent hover:border-purple-500/30"
                      >
                        <div className="flex flex-col items-start bg-[#130F18]">
                          <Image
                            width={456}
                            height={280}
                            src={article.image}
                            alt={article.title}
                            className="object-cover w-full h-[150px] md:h-[230px] rounded-t-2xl transition-transform duration-200 group-hover:scale-105"
                          />
                          <div className="flex-1 w-full m-2 pr-4 ">
                            <h4 className="text-sm font-medium text-white group-hover:text-blue-400 transition-colors line-clamp-2 mb-1 text-right py-7 ">
                              {article.title}
                            </h4>
                            <div className="flex items-center justify-between text-xs text-gray-400">
                              <p>{article.summary}</p>
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
              <div className="relative rounded-2xl overflow-hidden border border-purple-500/20 h-64 md:h-96">
                {/* Background Image */}
                <Image
                  src={currentArticle.image}
                  alt={currentArticle.title}
                  fill
                  className="object-cover"
                  priority
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-blue-900/20 z-10"></div>

                {/* Content over image */}
                
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
