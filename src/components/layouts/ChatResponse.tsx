"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { ArrowUp } from "lucide-react";

interface ResponseData {
  title?: string;
  metrics?: {
    iphone: { value: number; trend: number };
    android: { value: number; trend: number };
  };
  content?: {
    overview: string;
    marketOverview?: string[];
  };
  chartData?: Array<{
    name: string;
    iphone: number;
    android: number;
  }>;
  sources?: Array<{
    title: string;
    excerpt: string;
    source: string;
    icon: string;
  }>;
}

interface ChatResponseProps {
  response: ResponseData;
}

const tabs = ["Report", "Insight", "Generate images", "Generate videos"];

const sources = [
  {
    id: 1,
    title: "Inside Nigeria’s used iPhone market",
    description:
      "In a country with over 90 million people facing poverty, being able to afford high-end mobile gadgets is a privilege. iPhones are popular in Nigeria for being a marker of wealth and class, two things that set you ap...",
    source: "techcabal",
  },
  {
    id: 2,
    title: "Inside Nigeria’s used iPhone market",
    description:
      "In a country with over 90 million people facing poverty, being able to afford high-end mobile gadgets is a privilege. iPhones are popular in Nigeria for being a marker of wealth and class, two things that set you ap...",
    source: "techcabal",
  },
  {
    id: 3,
    title: "Inside Nigeria’s used iPhone market",
    description:
      "In a country with over 90 million people facing poverty, being able to afford high-end mobile gadgets is a privilege. iPhones are popular in Nigeria for being a marker of wealth and class, two things that set you ap...",
    source: "techcabal",
  },
];

export default function ChatResponse({ response }: ChatResponseProps) {
  const [activeTab, setActiveTab] = useState("Report");

  // Safely access nested data with optional chaining
  const metrics = {
    iphone: response?.metrics?.iphone ?? { value: 0, trend: 0 },
    android: response?.metrics?.android ?? { value: 0, trend: 0 },
  };

  const formatMetricValue = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toString();
  };

  return (
    <div className="container mx-auto flex gap-10 items-center flex-col md:flex-row">
      {/* Breadcrumb */}
      <div>
        <div className="text-sm mb-6">
          <span className="text-[#6A6B6A]">Home</span>
          <span className="mx-2 text-[#6A6B6A]">/</span>
          <span className="bg-[#F2F2F2] px-[8px] py-[2px] text-[#212221] rounded-[6px]">
            {response?.title ?? "Chat Response"}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-[32px] font-semibold mb-8">
          {response?.title ?? "Loading..."}
        </h1>

        {/* Tabs */}
        <div className="flex flex-col items-start w-full">
          <div className="flex border-[0.5px] border-[#D7D7D7] rounded-[32px] overflow-hidden w-max">
            {tabs.map((tab, index) => (
              <div key={tab} className="flex items-center">
                <button
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 text-[#6A6B6A] text-sm transition ${
                    activeTab === tab
                      ? "bg-[#EBE6F0] text-[#330065] font-medium"
                      : "hover:hover:opacity-90"
                  }`}
                >
                  {tab}
                </button>
                {index !== tabs.length - 1 && (
                  <div className="w-[1px] bg-[#D7D7D7] h-full"></div>
                )}
              </div>
            ))}
          </div>
          {/* Tab Content */}
          <div className="mt-8 w-full">
            {activeTab === "Report" && (
              <div className="flex w-full flex-col md:flex-row items-center gap-10">
                {/* card & description */}
                <div className="w-full">
                  {/* Top Section - Cards */}
                  <div className="grid grid-cols-2 gap-[10px] mb-8 bg-[#F9F9F9] p-3 rounded-[6px]">
                    {/* iPhone Users */}
                    <div className="p-5 flex flex-col gap-4 border border-[#ECECEC] rounded-lg bg-white">
                      <p className="text-[#4D4E4D] text-sm">IPhone users</p>
                      <div className="flex items-center justify-between">
                        <p className="text-[28] text-[#212221] font-semibold">
                          39.7k
                        </p>
                        <span className="bg-[#E7F5EC] py-[2px] text-[#085322] px-2 rounded-[32px] flex items-center gap-1 text-sm">
                          <ArrowUp size={12} /> 10%
                        </span>
                      </div>
                    </div>

                    {/* Android Users */}
                    <div className="p-5 flex flex-col gap-4 border border-[#ECECEC] rounded-lg bg-white">
                      <p className="text-[#4D4E4D] text-sm">Android users</p>
                      <div className="flex items-center justify-between">
                        <p className="text-[28] text-[#212221] font-semibold">
                          2.4k
                        </p>
                        <span className="bg-[#E7F5EC] py-[2px] text-[#085322] px-2 rounded-[32px] flex items-center gap-1 text-sm">
                          <ArrowUp size={12} /> 10%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text Content */}
                  <p className="text-[#4D4E4D] text-base leading-[150%]">
                    The number of iPhone users in Nigeria is relatively small
                    compared to the overall smartphone market. Recent reports
                    indicate that approximately 13% of smartphone users in
                    Nigeria utilize iOS devices, which translates to around
                    10-13 million users given the estimated total number of
                    smartphone users in the country.
                  </p>

                  {/* Smartphone Market Overview */}
                  <div className="mt-4">
                    <h3 className="font-medium text-[#000000] text-[17px] leading-[150%]">
                      Smartphone market overview
                    </h3>
                    <ul className="mt-2 pl-2 space-y-2 text-base text-[#4D4E4D]">
                      <li>
                        <span className="font-semibold">
                          • Android Dominance:
                        </span>{" "}
                        Android users account for about 86% of the smartphone
                        market in Nigeria, making it the predominant operating
                        system.
                      </li>
                      <li>
                        <span className="font-semibold">
                          • iOS Market Share:
                        </span>{" "}
                        iOS has a market share of approximately 9.26% as of late
                        2024, indicating a slight decline from earlier
                        estimates. This aligns with reports suggesting that
                        between 10-13% of smartphone users are on iOS.
                      </li>
                    </ul>
                  </div>

                  {/* Chart Legend */}
                  <div className="mt-6 flex justify-end items-center gap-6 text-xs text-[#667185]">
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-[#2E005C] rounded-full"></span>{" "}
                      iPhone users
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-[#5C3384] rounded-full"></span>{" "}
                      Android users
                    </div>
                  </div>
                </div>
                {/*new source */}
                <div className="w-[442px] h-[100vh] flex-shrink-0 flex flex-col gap-[10px] rounded-[6px] border-[0.5px] border-[#D7D7D7]">
                  {/* Section Title */}
                  <h3 className="text-[#212221] text-xl font-semibold p-5">
                    Sources
                  </h3>
                  <hr className="w-full" />

                  {/* Sources List */}
                  <div className="space-y-4 overflow-y-auto p-5">
                    {sources.map((item) => (
                      <div
                        key={item.id}
                        className="bg-[#F6F6F6] rounded-[6px] p-5 flex flex-col gap-5"
                      >
                        <span className=" w-[80] text-sm text-[#4D4E4D] bg-white px-2 py-[2px] rounded-[12px] whitespace-nowrap">
                          Source {item.id}
                        </span>
                        <div>
                          <h4 className="mb-3 font-medium text-[18px] text-[#212221]">
                            {item.title}
                          </h4>
                          {item.description && (
                            <p className="text-sm text-[#6A6B6A]">
                              {item.description}
                            </p>
                          )}
                        </div>
                        {item.source && (
                          <div className="flex items-center gap-2 mt-3 text-sm text-[#4D4E4D]">
                            <img
                              src="/techcabal-icon.png"
                              alt="TechCabal"
                              className="w-4 h-4"
                            />
                            {item.source}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeTab === "Insight" && <div>💡 Insight Content</div>}
            {activeTab === "Generate images" && (
              <div>🖼️ Generate Images Content</div>
            )}
            {activeTab === "Generate videos" && (
              <div>🎥 Generate Videos Content</div>
            )}
          </div>
        </div>
      </div>

      {/* dump Sources */}
      <div>
        {/* {response?.sources && (
          <div className="mt-8">
            <h2 className="text-xl font-bold mb-4">Sources</h2>
            <div className="space-y-4">
              {response.sources.map((source, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold mb-2">Source {index + 1}</h3>
                    <h4 className="font-medium mb-2">{source.title}</h4>
                    <p className="text-gray-600 mb-4">{source.excerpt}</p>
                    <div className="flex items-center text-sm text-gray-500">
                      <Image
                        src={source.icon}
                        alt={source.source}
                        className="w-4 h-4 mr-2"
                      />
                      <span>{source.source}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )} */}

      </div>
    </div>
  );
}
