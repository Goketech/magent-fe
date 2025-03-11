"use client";
import Content from "./Content";
import { useStepContext } from "@/context/StepContext";
import Research from "./Research";

const DashboardContent = () => {
  const { stepData } = useStepContext();
  const ActiveComponent = stepData.activeComponent || Research;
  return (
    <div className="flex-1 p-6 bg-white h-full overflow-auto">
      <ActiveComponent />
    </div>
  );
};

export default DashboardContent;
