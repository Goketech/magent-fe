"use client";
import React, { useState } from "react";
import Preview from "./Preview";
import Image from "next/image";
import { useStepContext } from "@/context/StepContext";
import { Loading } from "../ui/loading";
import PopUp from "./PopUp";

function Content() {
  const [showFirstScreen, setShowFirstScreen] = useState(true);
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isGenerateCompleted, setIsGenerateCompleted] = useState(false);
  const { stepData, updateStepData } = useStepContext();

  const handleStartClick = () => {
    setShowFirstScreen(false);
  };

  const handleNext = () => {
    if (!isStepCompleted(currentStep)) return;
    if (currentStep < 5) setCurrentStep((prev) => prev + 1);
  };

  const isStepCompleted = (step: number) => {
    switch (step) {
      case 1:
        return !!stepData.socialMediaAccount;
      case 2:
        return !!stepData.topic;
      case 3:
        return !!stepData.minFrequency && !!stepData.maxFrequency;
      case 4:
        return !!stepData.duration;
      case 5:
        return !!stepData.postStyle && !!stepData.commentStyle;
      default:
        return true;
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleTryAgain = () => {
    setIsLoading(true);

    setTimeout(() => {
      updateStepData({
        socialMediaAccount: "",
        topic: "",
        minFrequency: "",
        maxFrequency: "",
        duration: "",
        postStyle: "",
        commentStyle: "",
      });

      setCurrentStep(1);
      setShowFirstScreen(false);
      setButtonClicked(false);
      isStepCompleted(1);
      setIsLoading(false);
      setShowSuccessPopup(false);
    }, 1000);
  };

  const allStepsCompleted = () => {
    return [1, 2, 3, 4, 5].every(isStepCompleted);
  };

  const handleGenerateClick = () => {
    setButtonClicked(true);
    if (loading) return; 
    if (!allStepsCompleted()) return;
    setLoading(true);
    setTimeout(() => {
      setIsGenerateCompleted(true);
      setLoading(false);
    }, 2000);
  };

  const handlePublish = () => {
    setShowSuccessPopup(true);
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="relative">
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <div className="flex justify-between gap-6 items-center h-full w-full">
        <div className="flex flex-col gap-5">
          <div>
            <h2 className="text-[20px] font-medium mb-4">Content</h2>
            <p className="text-base">
              Effortlessly create tailored, high-quality content with our AI
              agent in seconds.
            </p>
          </div>
          {showFirstScreen ? (
            <div className="border-[#F6F6F6] w-[450px] rounded-[12px] text-center border-2 flex flex-col gap-5 justify-center items-center p-8">
              <Image
                src="/start image.svg"
                alt="content"
                width={50}
                height={48}
              />
              <h2 className="text-base text-[#212221] font-medium">
                Our agent is ready
              </h2>
              <p className="text-sm text-[#6A6B6A]">
                Effortlessly create tailored, high-quality content with our AI
                agent in seconds.
              </p>
              <button
                onClick={handleStartClick}
                className="rounded-[32px] px-4 py-2 bg-[#330065] text-white text-sm font-semibold flex items-center justify-center hover:opacity-90 transition"
              >
                Start agent
              </button>
            </div>
          ) : (
            <div className="border-[#F6F6F6] w-full rounded-[12px] border-2 flex flex-col justify-between p-5">
              {/* Progress Bar */}
              <div className="flex justify-between w-full">
                <p className="bg-[#EBE6F0] rounded-[8px] px-2 py-1 text-[#330065] text-xs">
                  Social Media Accout
                </p>
                <div className="flex items-center justify-center">
                  {[1, 2, 3, 4, 5].map((step) => (
                    <div key={step} className="flex items-center">
                      {/* Step Circle */}
                      <span
                        className={`w-[28px] h-[18px] flex items-center p-1 justify-center border rounded-[20px] ${
                          currentStep === step
                            ? "border border-[#330065] text-[#330065] bg-white"
                            : currentStep > step
                            ? "bg-[#EBE6F0] border-[#330065] text-[#330065]"
                            : "border-[#ECECEC] text-[#ECECEC]"
                        }`}
                      >
                        {step}
                      </span>

                      {/* Step Connector Line */}
                      {step !== 5 && (
                        <span
                          className={`w-6 h-[2px] ${
                            currentStep > step ? "bg-[#330065]" : "bg-[#ECECEC]"
                          }`}
                        ></span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-6 w-full">
                {/* content 1 */}
                {currentStep === 1 && (
                  <div>
                    <h2 className="text-[20px] font-semibold">
                      Connect your social media account
                    </h2>
                    <div className="border p-4 flex justify-between items-center mt-4 bg-[#F6F6F6] rounded-[4px]">
                      {stepData.socialMediaAccount ? (
                        <>
                          <div className="flex gap-3 items-center">
                            <Image
                              src="/profile.svg"
                              alt="twitter"
                              width={40}
                              height={40}
                            />
                            <div>
                              <p className="text-[#212221] text-base font-medium">
                                naeche
                              </p>
                              <p className="text-[#6A6B6A] text-sm">@22naee</p>
                            </div>
                          </div>
                          <button
                            className="text-red-500 hover:text-red-600 transition"
                            onClick={() =>
                              updateStepData({ socialMediaAccount: "" })
                            }
                          >
                            Disconnect
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="text-[#212221] text-sm flex gap-3 items-center">
                            {" "}
                            <Image
                              src="/x.svg"
                              alt="twitter"
                              width={16}
                              height={14}
                            />{" "}
                            Connect your account
                          </span>
                          <button
                            className="text-[#330065] text-sm hover:text-[#220044] transition"
                            onClick={() => {
                              updateStepData({ socialMediaAccount: "twitter" });
                            }}
                          >
                            Connect
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* content 2 */}
                {currentStep === 2 && (
                  <div>
                    <h2 className="text-[20px] font-semibold">
                      Choose a topic for your content
                    </h2>
                    <select
                      className="border-[0.5px] border-[#D7D7D7] p-3 rounded-[8px] w-full mt-4 text-sm text-[#6A6B6A] bg-white focus:outline-none focus:border-[#330065]"
                      value={stepData.topic}
                      onChange={(e) => {
                        updateStepData({ topic: e.target.value });
                      }}
                    >
                      <option value="">Select a topic</option>
                      <option value="Market research">Market research</option>
                      <option value="Consumer psychology">
                        Consumer psychology
                      </option>
                      <option value="Digital marketing">
                        Digital marketing
                      </option>
                      <option value="Brand strategy">Brand strategy</option>
                      <option value="Data analytics">Data analytics</option>
                      <option value="Growth hacking">Growth hacking</option>
                    </select>
                  </div>
                )}

                {/* content 3 */}
                {currentStep === 3 && (
                  <div>
                    <h2 className="text-[20px] font-semibold">
                      Choose the minimum frequency and the maximum frequency for
                      your content
                    </h2>
                    <select
                      className="border-[0.5px] border-[#D7D7D7] p-3 rounded-[8px] w-full mt-4 text-sm text-[#6A6B6A] bg-white focus:outline-none focus:border-[#330065]"
                      value={stepData.minFrequency}
                      onChange={(e) => {
                        updateStepData({ minFrequency: e.target.value });
                      }}
                    >
                      <option value="">Select minimum frequency</option>
                      <option value="0 - 10 hours">0 - 10 hours</option>
                      <option value="10 - 20 hours">10 - 20 hours</option>
                      <option value="20 - 30 hours">20 - 30 hours</option>
                      <option value="30 - 40 hours">30 - 40 hours</option>
                      <option value="40 - 50 hours">40 - 50 hours</option>
                      <option value="50 - 60 hours">50 - 60 hours</option>
                    </select>
                    <select
                      className="border-[0.5px] border-[#D7D7D7] p-3 rounded-[8px] w-full mt-4 text-sm text-[#6A6B6A] bg-white focus:outline-none focus:border-[#330065]"
                      value={stepData.maxFrequency}
                      onChange={(e) => {
                        updateStepData({ maxFrequency: e.target.value });
                      }}
                    >
                      <option value="">Select maximum frequency</option>
                      <option value="0 - 10 hours">0 - 10 hours</option>
                      <option value="10 - 20 hours">10 - 20 hours</option>
                      <option value="20 - 30 hours">20 - 30 hours</option>
                      <option value="30 - 40 hours">30 - 40 hours</option>
                      <option value="40 - 50 hours">40 - 50 hours</option>
                      <option value="50 - 60 hours">50 - 60 hours</option>
                    </select>
                  </div>
                )}

                {/* content 4 */}
                {currentStep === 4 && (
                  <div>
                    <h2 className="text-[20px] font-semibold">
                      How long do you want me to run your content
                    </h2>
                    <select
                      value={stepData.duration}
                      className="border-[0.5px] border-[#D7D7D7] p-3 rounded-[8px] w-full mt-4 text-sm text-[#6A6B6A] bg-white focus:outline-none focus:border-[#330065]"
                      onChange={(e) => {
                        updateStepData({ duration: e.target.value });
                      }}
                    >
                      <option value="">Select duration</option>
                      <option value="0 - 10 hours">0 - 10 hours</option>
                      <option value="10 - 20 hours">10 - 20 hours</option>
                      <option value="20 - 30 hours">20 - 30 hours</option>
                      <option value="30 - 40 hours">30 - 40 hours</option>
                      <option value="40 - 50 hours">40 - 50 hours</option>
                      <option value="50 - 60 hours">50 - 60 hours</option>
                    </select>
                  </div>
                )}

                {/* content 5 */}
                {currentStep === 5 && (
                  <div>
                    <h2 className="text-[20px] font-semibold">
                      How do you want me to post your content and how do you
                      want me to comment
                    </h2>
                    <select
                      value={stepData.postStyle}
                      className="border-[0.5px] border-[#D7D7D7] p-3 rounded-[8px] w-full mt-4 text-sm text-[#6A6B6A] bg-white focus:outline-none focus:border-[#330065]"
                      onChange={(e) => {
                        updateStepData({ postStyle: e.target.value });
                      }}
                    >
                      <option value="">Select post style</option>
                      <option value="Sharp, concise observation">
                        Sharp, concise observation
                      </option>
                      <option value="Data-backed statements">
                        Data-backed statements
                      </option>
                      <option value="Forward-looking perspectives">
                        Forward-looking perspectives
                      </option>
                      <option value="Professional yet provocative">
                        Professional yet provocative
                      </option>
                    </select>
                    <select
                      className="border-[0.5px] border-[#D7D7D7] p-3 rounded-[8px] w-full mt-4 text-sm text-[#6A6B6A] bg-white focus:outline-none focus:border-[#330065]"
                      value={stepData.commentStyle}
                      onChange={(e) => {
                        updateStepData({ commentStyle: e.target.value });
                      }}
                    >
                      <option value="">Select comment style</option>
                      <option value="Clarity and complexity">
                        Clarity and complexity
                      </option>
                    </select>
                  </div>
                )}
              </div>

              {/*  Buttons */}
              <div className="flex justify-between items-center mt-24">
                {/* Try Again Button */}
                {currentStep > 1 ? (
                  <button
                    onClick={handleTryAgain}
                    className="border-none bg-transparent text-sm font-semibold text-[#330065] flex gap-2 items-center mt-2 hover:text-[#220044] transition"
                  >
                    {isLoading ? (
                      <>
                        <Image
                          src="/replay.png"
                          alt="restart"
                          width={20}
                          height={20}
                          className="animate-spin"
                        />
                        Restart agent
                      </>
                    ) : (
                      <>
                        <Image
                          src="/replay.png"
                          alt="restart"
                          width={20}
                          height={20}
                        />
                        Restart agent
                      </>
                    )}
                  </button>
                ) : (
                  <span />
                )}

                {/* next/generate Buttons */}
                <div className="flex gap-3">
                  {/* Previous Button (Hidden on Step 1) */}
                  {currentStep > 1 && (
                    <button
                      onClick={handlePrevious}
                      className="border border-[#330065] px-4 py-2 rounded-[32px] text-sm font-semibold text-[#330065] hover:bg-[#330065] hover:text-white transition"
                    >
                      Previous
                    </button>
                  )}

                  {/* Conditional Next or Generate Button */}
                  {currentStep === 5 ? (
                    <button
                      onClick={handleGenerateClick}
                      disabled={!allStepsCompleted() || loading || isGenerateCompleted}
                      className={`rounded-[32px] px-4 py-2 text-sm font-semibold transition ${
                        isStepCompleted(currentStep) && !isGenerateCompleted
                          ? "bg-[#330065] text-white hover:opacity-90"
                          : "bg-[#D7D7D7] text-white cursor-not-allowed"
                      }`}
                    >
                      {loading ? (
                        <div className="flex items-center gap-2">
                          <p>Generating</p>
                          <Loading height="20" width="20" color="#FFF" />
                        </div>
                      ) : (
                        <p>Generate</p>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={handleNext}
                      disabled={!isStepCompleted(currentStep)}
                      className={`rounded-[32px] px-4 py-2 text-sm font-semibold transition ${
                        isStepCompleted(currentStep)
                          ? "bg-[#330065] text-white hover:opacity-90"
                          : "bg-[#D7D7D7] text-white cursor-not-allowed"
                      }`}
                    >
                      Next
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <Preview
          isStepCompleted={isStepCompleted}
          loading={loading}
          buttonClicked={buttonClicked}
          handlePublish={handlePublish}
        />
        {showSuccessPopup && <PopUp closePopup={closePopup} handleTryAgain={handleTryAgain} />}
      </div>
    </div>
  );
}

export default Content;
