"use client";
import { useState, FormEvent } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
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
    <div className="bg-background flex flex-col justify-center items-center py-10 md:py-[80px] min-h-screen">
      <div className="flex flex-col max-w-full md:max-w-[766px] items-center text-center">
        <h1 className="font-bold text-3xl md:text-6xl md:leading-[90px] text-foreground mb-4 md:mb-0">
          Your AI partner for smarter, faster marketing
        </h1>
        <p className="text-primary-foreground text-center font-normal text-base md:text-lg leading-relaxed md:leading-7 max-w-full md:max-w-[732px] px-2 md:px-[21.5px] my-4 md:my-5">
          Our AI Marketing Assistant analyzes data, predicts trends, and crafts
          personalized strategies to help your business thrive. Boost
          engagement, save time, and drive results—all with the power of AI at
          your fingertips.
        </p>
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-full md:max-w-[605px] px-4 md:px-0"
        >
          <div className="relative flex flex-col md:block items-center space-y-2 md:space-y-0 md:space-x-0">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full md:flex-grow bg-white h-[50px] md:h-[61px] border-0 outline-primary px-4"
            />
            <Button
              className="w-full md:w-auto md:absolute md:right-2 md:top-1/2 md:-translate-y-1/2 text-white font-semibold"
              size="lg"
              type="submit"
            >
              {loading ? (
                <Loading width="20" height="40" />
              ) : (
                "Join our waitlist"
              )}
            </Button>
          </div>
        </form>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-[20px] mt-10 md:mt-[80px] w-full max-w-[1200px] px-4">
        {[
          {
            src: "/image0.webp",
            alt: "Reports",
            icon: "/report.svg",
            label: "Reports",
            bgColor: "bg-[#E0EEC6]",
            textColor: "text-[#5E6453]",
          },
          {
            src: "/image1.webp",
            alt: "Analytics",
            icon: "/analytics.svg",
            label: "Analytics",
            bgColor: "bg-[#A5FFD6]",
            textColor: "text-[#456B5A]",
          },
          {
            src: "/image2.webp",
            alt: "AI Assistant",
            icon: "/ai.svg",
            label: "AI Assistant",
            bgColor: "bg-[#B5E2FA]",
            textColor: "text-[#095AD3]",
          },
        ].map((item, index) => (
          <div key={index} className="relative rounded-lg overflow-hidden">
            {/* Label div */}
            <div
              className={`absolute top-2 right-2 bg-white p-2 flex items-center gap-2 rounded-md shadow-sm ${item.bgColor} ${item.textColor}`}
            >
              <Image src={item.icon} alt={item.label} width={18} height={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </div>
            {/* Image */}
            <Image
              src={item.src}
              alt={item.alt}
              width={359}
              height={294}
              className="w-full h-[200px] md:h-[300px] object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
