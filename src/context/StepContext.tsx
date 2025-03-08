"use client";
import React, { createContext, ReactNode, ComponentType, useContext, useState } from "react";
import Content from "@/components/layouts/Content";

interface StepData {
  socialMediaAccount: {
    name: string;
    userName: string;
    profilePicture: string;
  };
  topic: string;
  minFrequency: string;
  maxFrequency: string;
  duration: string;
  postStyle: string;
  commentStyle: string;
  active: string;
  samplePost: string;
  activeComponent?: ComponentType<any>;
}

interface StepContextType {
  stepData: StepData;
  updateStepData: (newData: Partial<StepData>) => void;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

export const StepProvider = ({ children }: { children: ReactNode }) => {
  const [stepData, setStepData] = useState<StepData>({
    socialMediaAccount: {
      name: "",
      userName: "",
      profilePicture: "",
    },
    topic: "",
    minFrequency: "",
    maxFrequency: "",
    duration: "",
    postStyle: "",
    commentStyle: "",
    active: "Content",
    samplePost: "",

    activeComponent: Content 
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
