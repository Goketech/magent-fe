"use client";
import { useStepContext } from "@/context/StepContext";
import Research from "./Research";

const DashboardContent = () => {
  const { stepData } = useStepContext();
  const ActiveComponent = stepData.activeComponent || Research;
  return (
      <div className="flex flex-1 items-center px-5 py-10 md:px-8 md:py-8 h-full rounded-[6px] md:rounded-none justify-center md:mt-[60px] bg-white">
      <ActiveComponent />
    </div>
  );
};

export default DashboardContent;
