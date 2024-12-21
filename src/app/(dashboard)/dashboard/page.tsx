"use client";
import { ReactTyped } from "react-typed";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <p className="text-center mb-[24px] text-[24px] font-[500] leading-[36px] text-white">
          Need help with{" "}
          <span className="text-primary">
            <ReactTyped
              strings={[
                '<span class="text-[#FFC8DD]">reports?</span>',
                '<span class="text-[#CDB4DB]">insights?</span>',
                '<span class="text-[#BDE0FE]">analysis?</span>',
                '<span class="text-[#F2E8CF]">strategy?</span>',
              ]}
              typeSpeed={50}
              backSpeed={30}
              backDelay={1000}
              loop
            />
          </span>
        </p>
        <div className="relative mx-5 md:mx-0  md:w-[600px]">
          <textarea
            cols={70}
            rows={6}
            className="w-full outline-[#D7D7D7] rounded-[6px] resize-none p-2 md:p-5 text-white border-[0.5px] border-[#D7D7D7] bg-[#1D1C1A]"
            placeholder="Ask us..."
          ></textarea>
          <Button className="w-25 h-25 absolute bottom-5 right-5 bg-[#D7D7D7] rounded-full p-2 flex items-center justify-center">
            <MoveRight className="text-white" size={15} />
          </Button>
        </div>
        <p className="mx-5 md:mx-0 mt-[24px] mb-[16px] text-white">
          Try searching for
        </p>
        <div className="mx-5 md:mx-0 flex flex-col md:flex-row text-white gap-[8px] md:gap-[16px]">
          <p className="cursor-pointer px-[10px] py-[8px] border-[0.5px] border-[#D7D7D7] rounded-[32px] hover:bg-primary/90 hover:text-primary-foreground">
            How many Facebook users are in Nigeria
          </p>
          <p className="cursor-pointer px-[10px] py-[8px] border-[0.5px] border-[#D7D7D7] rounded-[32px] hover:bg-primary/90 hover:text-primary-foreground">
            Global inflation
          </p>
          <p className="cursor-pointer px-[10px] py-[8px] border-[0.5px] border-[#D7D7D7] rounded-[32px] hover:bg-primary/90 hover:text-primary-foreground">
            Tiktok users
          </p>
        </div>
        <div className="mt-[16px] mx-5 md:mx-0 flex flex-col md:flex-row text-white gap-[16px]">
          <p className="cursor-pointer px-[10px] py-[8px] border-[0.5px] border-[#D7D7D7] rounded-[32px] hover:bg-primary/90 hover:text-primary-foreground">
            Crypto users in 2024
          </p>
          <p className="cursor-pointer px-[10px] py-[8px] border-[0.5px] border-[#D7D7D7] rounded-[32px] hover:bg-primary/90 hover:text-primary-foreground">
            Superteam members
          </p>
          <p className="cursor-pointer px-[10px] py-[8px] border-[0.5px] border-[#D7D7D7] rounded-[32px] hover:bg-primary/90 hover:text-primary-foreground">
            Crypto users in Nigeria
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
