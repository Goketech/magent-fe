"use client";
import React, { createContext, ReactNode, useContext, useState } from "react";

interface StepData {
    socialMediaAccount: string;
    topic: string;
    minFrequency: string;
  maxFrequency: string;
  duration: string;
  postStyle: string;
  commentStyle: string;
}

interface StepContextType {
    stepData: StepData;
    updateStepData: (newData: Partial<StepData>) => void;
  }

const StepContext = createContext<StepContextType | undefined>(undefined);

  export const StepProvider = ({ children }: { children: ReactNode }) => {
    const [stepData, setStepData] = useState<StepData>({
        socialMediaAccount: "",
        topic: "",
        minFrequency: "",
        maxFrequency: "",
        duration: "",
        postStyle: "",
        commentStyle: "",
    });

    const updateStepData = (newData: Partial<StepData>) => {
        setStepData({ ...stepData, ...newData });
    };

    return (
         <StepContext.Provider value={{ stepData, updateStepData }}>
            {children}
        </StepContext.Provider>
    );
};

export const useStepContext = () => {
  const context = useContext(StepContext);
  if (!context) {
    throw new Error("useStepContext must be used within a StepProvider");
  }
  return context;
};
