"use client";
import Content from "./Content";
import { useStepContext } from "@/context/StepContext";


const DashboardContent= () => {
  const { stepData } = useStepContext();
  const ActiveComponent = stepData.activeComponent || Content;
  return (
    <div className="flex-1 p-6 bg-white h-full overflow-auto">
      <ActiveComponent />
    </div>
  );
};

export default DashboardContent;
