"use client";
import { useState, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loading } from "@/components/ui/loading";
import { useToast } from "@/hooks/use-toast";

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
    <div className="min-h-screen flex flex-col md:flex-row gap-[60px] md:gap-0 md:justify-between px-[20px] mt-[40px] md:mt-0 md:px-[80px] items-center">
      <div className="max-w-[581px] text-white ">
        <h1 className="text-[30px] md:text-[60px] font-[800] leading-[38.4px] md:leading-[72px]">
          Your AI partner for smarter, faster <br className="md:hidden" /> marketing
        </h1>
        <p className="font-[400] text-[14px] md:text-[18px] leading-[21px] md:leading-[27px] mt-[20px] md:mt-[40px]">
          Our AI Marketing Assistant analyzes data, predicts trends, and crafts
          personalized strategies to help your business thrive. Boost
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
  );
}
