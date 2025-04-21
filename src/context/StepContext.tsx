"use client";
import React, {
  createContext,
  ReactNode,
  ComponentType,
  useContext,
  useState,
} from "react";
import Content from "@/components/layouts/Content";
import Research from "@/components/layouts/Research";
import Library from "@/components/layouts/Library";
import Advert from "@/components/layouts/Advert";


interface Topic {
  mode: "type" | "select";
  value: string;
}

interface StepData {
  socialMediaAccount: {
    name: string;
    userName: string;
    profilePicture: string;
  };
  currentStep: number;
  typeTopics: Topic[];
  selectTopics: Topic[];
  minFrequency: number;
  maxFrequency: number;
  duration: number;
  postStyle: string;
  commentStyle: string;
  active: string;
  samplePost: string;
  activeComponent?: ComponentType<any>;
  campaignGoal: string;
  selectedGender: string;
  ageRange: { min: number; max: number };
  selectedBids: string[];
  targetCost: string;
  showFirstScreen: boolean;
}

interface StepContextType {
  stepData: StepData;
  updateStepData: (newData: Partial<StepData>) => void;
}

const StepContext = createContext<StepContextType | undefined>(undefined);

export const StepProvider = ({ children }: { children: ReactNode }) => {
  const [stepData, setStepData] = useState<StepData>({
    showFirstScreen: true,
    socialMediaAccount: {
      name: "",
      userName: "",
      profilePicture: "",
    },
    typeTopics: [
      {
        mode: "type",
        value: "",
      },
    ],
    selectTopics: [],  
    minFrequency: 0,
    maxFrequency: 0,
    duration: 0,
    postStyle: "",
    commentStyle: "",
    active: "Research",
    samplePost: "",
    currentStep: 1,
    activeComponent: Research,
    campaignGoal: "",
    selectedGender: "",
    selectedBids: [],
    targetCost: "",
    ageRange: { min: 0, max: 0 },
  });

  const componentMap: Record<string, ComponentType<any>> = {
    Research,
    Content,
    Library,
    Advert,
  };

  const updateStepData = (newData: Partial<StepData>) => {
    setStepData((prevData) => ({
      ...prevData,
      ...newData,
      activeComponent: newData.active
        ? componentMap[newData.active]
        : prevData.activeComponent,
    }));
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
