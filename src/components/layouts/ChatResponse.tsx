"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from "recharts";

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

export default function ChatResponse({ response }: ChatResponseProps) {
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
    <div className="container mx-auto p-4 max-w-6xl">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <span>Home</span>
        <span className="mx-2">/</span>
        <span>{response?.title ?? "Chat Response"}</span>
      </div>

      {/* Title */}
      <h1 className="text-3xl font-bold mb-8">
        {response?.title ?? "Loading..."}
      </h1>

      {/* Tabs */}
      <Tabs defaultValue="report" className="mb-8">
        <TabsList>
          <TabsTrigger value="report">Report</TabsTrigger>
          <TabsTrigger value="insight">Insight</TabsTrigger>
          <TabsTrigger value="generate-images">Generate images</TabsTrigger>
          <TabsTrigger value="generate-videos">Generate videos</TabsTrigger>
        </TabsList>

        <TabsContent value="report" className="space-y-6">
          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">iPhone users</p>
                    <p className="text-2xl font-bold">
                      {formatMetricValue(metrics.iphone.value)}
                    </p>
                  </div>
                  {metrics.iphone.trend > 0 && (
                    <span className="text-green-500 text-sm">
                      ↑ {metrics.iphone.trend}%
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-sm text-gray-500">Android users</p>
                    <p className="text-2xl font-bold">
                      {formatMetricValue(metrics.android.value)}
                    </p>
                  </div>
                  {metrics.android.trend > 0 && (
                    <span className="text-green-500 text-sm">
                      ↑ {metrics.android.trend}%
                    </span>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          {response?.content && (
            <div className="prose max-w-none">
              <p className="text-gray-600 mb-6">{response.content.overview}</p>

              {response.content.marketOverview && (
                <>
                  <h2 className="text-xl font-bold mb-4">
                    Smartphone market overview
                  </h2>
                  <ul className="space-y-4">
                    {response.content.marketOverview.map((item, index) => (
                      <li key={index} className="flex gap-2">
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {/* Chart */}
          {response?.chartData && (
            <div className="h-64 mt-8">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={response.chartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Line
                    type="monotone"
                    dataKey="iphone"
                    stroke="#8884d8"
                    name="iPhone users"
                  />
                  <Line
                    type="monotone"
                    dataKey="android"
                    stroke="#82ca9d"
                    name="Android users"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Sources */}
      {response?.sources && (
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
      )}
    </div>
  );
};
