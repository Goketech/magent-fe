import Image from "next/image";
import Link from "next/link";
import React from "react";

function WelcomeBox() {
  return (
    <div className="flex flex-col justify-between bg-cover bg-center bg-no-repeat w-full rounded-[6px] h-[calc(100vh-3rem)] fixed md:max-w-[550px] items-center " style={{backgroundImage: "url('/background.png')"}}>
      {/* <div>
        <Link href="/">
        <Image
          src="/authLogo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="p-6"
        />
        </Link>
      </div> */}
      {/* <div className="px-6">
        <h1 className="text-[#330065] text-[56px] font-bold">
          Marketing made easy with AI
        </h1>
        <p className="text-base text-[#4D4E4D]">
          Simple marketing tool built for startups, creators, and businesses
          that want to move fast and grow faster.
        </p>
      </div> */}
      {/* <div>
        <span className="w-full flex bg-[#C0B0CF] h-[32px]"></span>
        <span className="w-full flex bg-[#A18AB8] h-[32px]"></span>
        <span className="w-full flex bg-[#765498] h-[32px] rounded-b-[6px]"></span>
      </div> */}
      <div className="flex flex-col items-center justify-center h-full px-6">
        <div>
        <Image
          src="/rocket.png"
          alt="Logo"
          width={300}
          height={300}
          className="p-6 z-10"
        />
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
         <Link href="/">
        <Image
          src="/authLogo.svg"
          alt="Logo"
          width={120}
          height={120}
          className=""
        />
        </Link>
        <h3 className="text-[#212221] text-sm font-bold text-center bg-[#FFFFFF66] rounded-[6px] p-1">
          Your AI partner for smarter, faster marketing
        </h3>
        </div>
        </div>
    </div>
  );
}

export default WelcomeBox;
