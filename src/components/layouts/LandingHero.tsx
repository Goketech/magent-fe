const LandingHero = () => {
  return (
    <div className="flex items-center justify-between gap-[20px] md:gap-0 px-[20px] md:px-[80px] my-[40px] md:my-[99px] mb-[60px] md:mb-[100px]">
      <div className="hidden md:block w-[243px] h-[203px] bg-blue-400"></div>
      <div className="max-w-[801px] text-white text-center px-2">
          <h1 className="text-[30px] md:text-[48px] font-[700] leading-[38.4px] md:leading-[50px]">
            Your AI partner for smarter, faster <br className="md:hidden" />{" "}
            marketing
          </h1>
          <p className="font-[400] text-[14px] md:text-[18px] leading-[21px] md:leading-[27px] mt-[10px] md:mt-[25px]">
            Our AI Marketing Assistant analyzes data, predicts trends, and
            crafts personalized strategies to help your business thrive. Boost
            engagement, save time, and drive results—all with the power of AI at
            your fingertips.
          </p>
        </div>
      <div className="hidden md:block  w-[243px] h-[203px] bg-slate-600"></div>
    </div>
  );
};

export default LandingHero;