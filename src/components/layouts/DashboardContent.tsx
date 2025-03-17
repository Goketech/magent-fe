"use client";
import Content from "./Content";
import { useStepContext } from "@/context/StepContext";
import Research from "./Research";

const DashboardContent = () => {
  const { stepData } = useStepContext();
  const ActiveComponent = stepData.activeComponent || Research;
  return (
    <div className="flex-1 px-5 py-10 md:px-6 md:py-6 bg-white h-full overflow-auto rounded-[6px] md:rounded-none">
      <ActiveComponent />
    </div>
  );
};

export default DashboardContent;
