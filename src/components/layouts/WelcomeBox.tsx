import Image from "next/image";
import Link from "next/link";
import React from "react";

function WelcomeBox() {
  return (
    <div
      className="
        flex flex-col justify-between
        w-full h-auto lg:h-[calc(100vh-3rem)]
        bg-cover bg-center bg-no-repeat
        rounded-[6px] relative
        items-center px-6 py-6
        max-w-full sm:max-w-xl md:max-w-[450px] lg:max-w-[550px] xl:max-w-[600px] 2xl:max-w-[650px]
        mx-auto lg:mx-0
        lg:fixed
      "
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="flex flex-col items-center justify-center h-full gap-4">
        <div>
          <Image
            src="/rocket.png"
            alt="Rocket"
            width={280}
            height={280}
            className="p-4 sm:p-6"
          />
        </div>
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <Link href="/">
            <Image
              src="/authLogo.svg"
              alt="Logo"
              width={100}
              height={100}
              className="mx-auto"
            />
          </Link>
          <h3 className="text-[#212221] text-sm sm:text-base font-bold bg-white/40 rounded-[6px] px-2 py-1">
            Your AI partner for smarter, faster marketing
          </h3>
        </div>
      </div>
    </div>
  );
}

export default WelcomeBox;
