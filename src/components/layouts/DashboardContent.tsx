"use client";
import { useStepContext } from "@/context/StepContext";
import Research from "./Research";

const DashboardContent = () => {
  const { stepData } = useStepContext();
  const ActiveComponent = stepData.activeComponent || Research;
  return (
      <div className="flex-1 px-5 py-10 md:px-6 md:py-6 h-full rounded-[6px] md:rounded-none ml-0 md:ml-[201px] flex mt-[20px] md:mt-[60px] justify-center mb-4 md:mb-0 mr-4 md:mr-0 bg-white">
      <ActiveComponent />
    </div>
  );
};

export default DashboardContent;
