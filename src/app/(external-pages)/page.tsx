"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LandingHero from "@/components/layouts/LandingHero";
import WhatWeOffer from "@/components/layouts/WhatWeOffer";
import WhyMagent from "@/components/layouts/WhyMagent";
// import Pricing from "@/components/layouts/Pricing";
import CustomerMarket from "@/components/layouts/CustomerMarket";
import Newsletter from "@/components/layouts/Newsletter";
import News from "@/components/layouts/News";

export default function Home() {


  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  return (
    <div className="max-w-screen-2xl 2xl:mx-auto ">
      <div className="min-h-screen gap-[60px] px-[20px] mt-[40px] space-y-[30px] md:space-y-[50px]">
        <LandingHero />
        <WhatWeOffer/>
        <WhyMagent/>
        {/* <Pricing/> */}
        <CustomerMarket/>
        <News/>
        <Newsletter/>
      </div>
    </div>
  );
}
