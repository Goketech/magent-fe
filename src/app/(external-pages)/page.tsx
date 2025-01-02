"use client";
import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import OfferCard from "@/components/layouts/OfferCard";
import { useToast } from "@/hooks/use-toast";
import { Check } from "lucide-react";

export default function Home() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.trim() && !name.trim()) {
      toast({
        variant: "destructive",
        description: "Please enter full details.",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        variant: "destructive",
        description: "Please enter a valid email address.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, name }),
      });

      if (response.ok) {
        toast({
          variant: "success",
          description: "Email saved. Thank you for joining the waitlist!",
        });
        setEmail("");
      } else if (response.status === 409 || response.status === 500) {
        toast({
          variant: "destructive",
          description: "Email already exists in the waitlist.",
        });
      } else {
        toast({
          variant: "destructive",
          description: "Failed to save email. Please try again.",
        });
      }
      /* eslint-disable  @typescript-eslint/no-unused-vars */
    } catch (err) {
      toast({
        variant: "destructive",
        description: "Failed to save email. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-screen-2xl 2xl:mx-auto">
      <div className="min-h-screen flex flex-col md:flex-row gap-[60px] md:gap-0 md:justify-between px-[20px] mt-[40px] md:mt-0 md:px-[80px] items-center">
        <div className="max-w-[581px] text-white ">
          <h1 className="text-[30px] md:text-[60px] font-[800] leading-[38.4px] md:leading-[72px]">
            Your AI partner for smarter, faster <br className="md:hidden" />{" "}
            marketing
          </h1>
          <p className="font-[400] text-[14px] md:text-[18px] leading-[21px] md:leading-[27px] mt-[20px] md:mt-[40px]">
            Our AI Marketing Assistant analyzes data, predicts trends, and
            crafts personalized strategies to help your business thrive. Boost
            engagement, save time, and drive results—all with the power of AI at
            your fingertips.
          </p>
        </div>
        <div className="w-full md:w-[464px] relative p-[0.5px] rounded-[12px] bg-gradient-border shadow-2xl shadow-[#AEDDFF]">
          <form
            className="rounded-[12px] text-white bg-background px-[20px] py-[24px]"
            onSubmit={handleSubmit}
          >
            <h2 className="mb-[32px] font-[700] text[24px] leading-[36px]">
              Get early access
            </h2>
            <div className="flex flex-col gap-[16px] mb-[20px]">
              <label htmlFor="name">Full Name</label>
              <Input
                name="name"
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter full name"
                className="bg-[#1D1C1A] rounded-[6px] p-[16px] border-0"
              />
            </div>
            <div className="flex flex-col gap-[16px]">
              <label htmlFor="email">Email Address</label>
              <Input
                name="email"
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email address"
                className="bg-[#1D1C1A] rounded-[6px] p-[16px] border-0"
              />
            </div>
            <Button
              className="mt-[32px] w-full rounded-[32px] text-white text-[14px] font-[700]"
              type="submit"
              disabled={loading}
            >
              {loading ? <Loading width="20" height="40" /> : "Join Waitlist"}
            </Button>
          </form>
        </div>
      </div>
      <div className="px-[20px] md:px-[80px] mb-[160px]">
        <span className="text-[13px] font-[600] leading-19.5px] px-[12px] py-[2px] bg-[#FFFFFF] rounded-[32px]">
          What we offer
        </span>
        <h2 className="font-[600] text-[20px] md:text-[40px] leading-[28.4px] md:leading-[60px] mb-[32px] mt-[20px] md:mt-[40px] text-white">
          Built for marketing, made for all
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-x-[20px] gap-y-[20px]">
          <OfferCard
            color="bg-[#C8B6FF]"
            label="Research"
            title="Intelligent research made simple with AI"
            text="We simplify market research by aggregating data from diverse sources, saving organizations valuable time and effort. We helps define clear marketing objectives, identify market size and potential, uncover industry trends, discover ideal customers and competitors."
          />

          <OfferCard
            color="bg-[#FFC8DD]"
            label="Insights"
            title="Actionable insights at your fingertips"
            text="Gain a deeper understanding of your audience and market with AI-powered insights that turn data into action. From performance analytics to customer behavior trends, our platform delivers the clarity you need to make smarter, faster decisions that drive real results"
          />

          <OfferCard
            color="bg-[#F2E8CF]"
            label="Reports"
            title="Effortless reports, powerful results"
            text="Simplify your reporting process with AI-generated reports that are clear, concise, and actionable. From performance summaries to in-depth analytics, our platform delivers the insights you need to showcase results and make data-driven decisions with confidence"
          />

          <OfferCard
            color="bg-[#BDE0FE]"
            label="Strategy"
            title="Smart strategy, seamless execution"
            text="Magent will help with marketing campaign ideas, media channel selection, strategic architecture, execution approach from market research and Insights, and step-by-step guide to achieve marketing objectives"
          />

          <OfferCard
            color="bg-[#A8DADC]"
            label="Analysis"
            title="Precise analysis for smarter decisions"
            text="Our platform breaks down complex information into easy-to-understand visuals and trends, helping you make informed decisions that drive growth and optimize performance."
          />

          <OfferCard
            color="bg-[#FFAFCC]"
            label="Own-to-earn"
            title="Ownership that pays off"
            text="We will help businesses access data and data owners will receive cryptocurrency rewards for sharing their data. This will also help us to provide real-time data update."
          />

          <OfferCard
            color="bg-[#A7C957]"
            label="Executive assistant"
            title="Simplified executive support"
            text="With text and voice prompt, the platform can help plan and organize your busy schedule, send voice reminder notifications and help you prioritize important tasks based on your available time frames."
          />

          <OfferCard
            color="bg-[#DDA15E]"
            label="Platform integration"
            title="Connect and integrate with ease"
            text="The platform can be connected to different social media and marketing platforms for analysis, insights generation, report generation and campaign deployment."
          />

          <OfferCard
            color="bg-[#A2D2FF]"
            label="Automation"
            title="Automate your marketing, amplify your impact"
            text="You can plug-in all your marketing platforms and allow our platform to automate your marketing activities like email marketing, social media posting, digital campaign deployment and reporting."
          />

          <OfferCard
            color="bg-[#FDF0D5]"
            label="Platform management"
            title="Effortless platform management"
            text="Why switch across multiple tabs, when you can integrate, execute, view, optimize and manage every digital marketing activities all in one place."
          />
        </div>
      </div>
      <div className="px-[20px] md:px-[80px] mb-[80px]">
        <span className="text-[13px] font-[600] leading-19.5px] px-[12px] py-[2px] bg-[#FFFFFF] rounded-[32px]">
          Our Pricing
        </span>
        <h2 className="font-[600] text-[20px] md:text-[40px] leading-[28.4px] md:leading-[60px] mb-[32px] mt-[20px] md:mt-[40px] text-white">
          Plans tailored to your needs
        </h2>
        <div className="flex flex-col md:flex-row gap-[20px] w-full">
          <div className="w-full rounded-[6px] border border-[#2D2D2D] px-[20px] py-[32px] text-white">
            <p className="pb-[32px] mb-[32px] border-b border-[#2D2D2D] font-[600] text-[24px] leading-[36px] text-white">
              Free Plan
            </p>
            <div className="flex flex-col gap-[13.5px]">
              <div className="flex gap-[8px] items-center font-[600] text-[14px]">
                <span>
                  <Check />
                </span>
                <span>Market research</span>
              </div>
              <div className="flex gap-[8px] items-center font-[600] text-[14px]">
                <span>
                  <Check />
                </span>
                <span>Predictive analysis</span>
              </div>
              <div className="flex gap-[8px] items-center font-[600] text-[14px]">
                <span>
                  <Check />
                </span>
                <span>Marketing insights</span>
              </div>
              <div className="flex gap-[8px] items-center font-[600] text-[14px]">
                <span>
                  <Check />
                </span>
                <span>Marketing strategies</span>
              </div>
              <div className="flex gap-[8px] items-center font-[600] text-[14px]">
                <span>
                  <Check />
                </span>
                <span>Marketing reports</span>
              </div>
            </div>
          </div>

          <div className="w-full rounded-[6px] border border-[#2D2D2D] px-[20px] py-[32px] text-white">
            <div className="flex items-center justify-between pb-[32px] mb-[32px] border-b border-[#2D2D2D] ">
              <p className="font-[600] text-[24px] leading-[36px] text-white">
                Pro Plan
              </p>
              <span className="bg-[#A8DADC] rounded-[32px] px-[12px] py-[2px] text-black text-[13px] font-[500] leading-[19.5px]">
                Coming soon
              </span>
            </div>
            <div className="flex flex-col gap-[13.5px]">
              <div className="flex gap-[8px] items-center font-[600] text-[14px]">
                <span>
                  <Check />
                </span>
                <span>Market research</span>
              </div>
              <div className="flex gap-[8px] items-center font-[600] text-[14px]">
                <span>
                  <Check />
                </span>
                <span>Predictive analysis</span>
              </div>
              <div className="flex gap-[8px] items-center font-[600] text-[14px]">
                <span>
                  <Check />
                </span>
                <span>Marketing insights</span>
              </div>
              <div className="flex gap-[8px] items-center font-[600] text-[14px]">
                <span>
                  <Check />
                </span>
                <span>Marketing strategies</span>
              </div>
              <div className="flex gap-[8px] items-center font-[600] text-[14px]">
                <span>
                  <Check />
                </span>
                <span>Marketing reports</span>
              </div>
              <div className="flex gap-[8px] items-center font-[600] text-[14px]">
                <span>
                  <Check />
                </span>
                <span>Real-time data update</span>
              </div>
              <div className="flex gap-[8px] items-center font-[600] text-[14px]">
                <span>
                  <Check />
                </span>
                <span>Marketing executive assistant</span>
              </div>
              <div className="flex gap-[8px] items-center font-[600] text-[14px]">
                <span>
                  <Check />
                </span>
                <span>Marketing platform integration</span>
              </div>
              <div className="flex gap-[8px] items-center font-[600] text-[14px]">
                <span>
                  <Check />
                </span>
                <span>Marketing automation</span>
              </div>
              <div className="flex gap-[8px] items-center font-[600] text-[14px]">
                <span>
                  <Check />
                </span>
                <span>All-in-one platform management</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
