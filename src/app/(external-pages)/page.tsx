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

  // const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();

  //   if (!email.trim() && !name.trim()) {
  //     toast({
  //       variant: "destructive",
  //       description: "Please enter full details.",
  //     });
  //     return;
  //   }

  //   if (!validateEmail(email)) {
  //     toast({
  //       variant: "destructive",
  //       description: "Please enter a valid email address.",
  //     });
  //     return;
  //   }

  //   setLoading(true);

  //   try {
  //     const response = await fetch("/api", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, name }),
  //     });

  //     if (response.ok) {
  //       toast({
  //         variant: "success",
  //         description: "Email saved. Thank you for joining the waitlist!",
  //       });
  //       setEmail("");
  //     } else if (response.status === 409 || response.status === 500) {
  //       toast({
  //         variant: "destructive",
  //         description: "Email already exists in the waitlist.",
  //       });
  //     } else {
  //       toast({
  //         variant: "destructive",
  //         description: "Failed to save email. Please try again.",
  //       });
  //     }
  //     /* eslint-disable  @typescript-eslint/no-unused-vars */
  //   } catch (err) {
  //     toast({
  //       variant: "destructive",
  //       description: "Failed to save email. Please try again.",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <div className="max-w-screen-2xl 2xl:mx-auto">
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
