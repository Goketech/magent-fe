import Image from "next/image";
import React from "react";

function WelcomeBox() {
  return (
    <div className="flex flex-col justify-between bg-[#F9F9F9] w-full rounded-[6px] h-[calc(100vh-3rem)] fixed md:max-w-[550px]">
      <div>
        <Image
          src="/authLogo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="p-6"
        />
      </div>
      <div className="px-6">
        <h1 className="text-[#330065] text-[56px] font-bold">
          Marketing made easy with AI
        </h1>
        <p className="text-base text-[#4D4E4D]">
          Simple marketing tool built for startups, creators, and businesses
          that want to move fast and grow faster.
        </p>
      </div>
      <div>
        <span className="w-full flex bg-[#C0B0CF] h-[32px]"></span>
        <span className="w-full flex bg-[#A18AB8] h-[32px]"></span>
        <span className="w-full flex bg-[#765498] h-[32px] rounded-b-[6px]"></span>
      </div>
    </div>
  );
}

export default WelcomeBox;
