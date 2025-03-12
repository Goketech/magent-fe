import React, { useState } from "react";
import Image from "next/image";
import { useStepContext } from "@/context/StepContext";
import { Loading } from "../ui/loading";

function Advert() {
  const [showFirstScreen, setShowFirstScreen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isGenerateCompleted, setIsGenerateCompleted] = useState(false);
  const { stepData, updateStepData } = useStepContext();

  const handleTwitterLogin = async () => {
    try {
      const response = await fetch("/api/auth/twitter/login", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Unable to authenticate with Twitter");
      }

      const data = await response.json();
      localStorage.setItem("twitter_oauth_state", data.state);
      localStorage.setItem("twitter_code_verifier", data.codeVerifier);
      window.location.href = data.url;
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  const handleStartClick = () => {
    setShowFirstScreen(false);
  };

  const handleNext = () => {
    if (!isStepCompleted(stepData.currentStep)) return;
    if (stepData.currentStep < 5)
      updateStepData({ currentStep: stepData.currentStep + 1 });
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
    if (stepData.currentStep > 1)
      updateStepData({ currentStep: stepData.currentStep - 1 });
  };

  const handleTryAgain = () => {
    setIsLoading(true);

    setTimeout(() => {
      updateStepData({
        socialMediaAccount: {
          name: "",
          userName: "",
          profilePicture: "",
        },
        topic: "",
        minFrequency: 0,
        maxFrequency: 0,
        duration: 0,
        postStyle: "",
        commentStyle: "",
        samplePost: "",
        currentStep: 1,
      });

      setShowFirstScreen(false);
      setButtonClicked(false);
      isStepCompleted(1);
      setIsLoading(false);
    }, 1000);
  };

  const allStepsCompleted = () => {
    return [1, 2, 3, 4, 5].every(isStepCompleted);
  };

  const handleGenerateClick = async () => {
    setButtonClicked(true);
    if (loading) return;
    if (!allStepsCompleted()) return;
    setLoading(true);
    setIsGenerateCompleted(true);
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex flex-col justify-center items-start gap-5 w-[450px]">
        <h1 className="text-[24px] font-medium text-[#212221] leading-[120%]">
          Advert
        </h1>
        <p className="text-base text-[#6A6B6A] leading-[150%]">
          Create compelling ads to boost engagement and reach your audience
          effectively with our agent
        </p>
      </div>
      <div>
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
          <div className="border-[#F6F6F6] w-[450px] rounded-[12px] border-2 flex flex-col justify-between p-5">
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
                        stepData.currentStep === step
                          ? "border border-[#330065] text-[#330065] bg-white"
                          : stepData.currentStep > step
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
                          stepData.currentStep > step
                            ? "bg-[#330065]"
                            : "bg-[#ECECEC]"
                        }`}
                      ></span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* content */}
            <div className="mt-6 w-full">
              {/* content 1 */}
              {stepData.currentStep === 1 && (
                <div>
                  <h2 className="text-[20px] font-semibold">
                    Connect your social media account
                  </h2>
                  <div className="border p-4 flex justify-between items-center mt-4 bg-[#F6F6F6] rounded-[4px]">
                    {stepData.socialMediaAccount.name ? (
                      <>
                        <div className="flex gap-3 items-center">
                          <Image
                            src={stepData.socialMediaAccount.profilePicture}
                            alt="twitter"
                            width={40}
                            height={40}
                          />
                          <div>
                            <p className="text-[#212221] text-base font-medium">
                              {stepData.socialMediaAccount.name}
                            </p>
                            <p className="text-[#6A6B6A] text-sm">
                              @{stepData.socialMediaAccount.userName}
                            </p>
                          </div>
                        </div>
                        <button
                          className="text-red-500 hover:text-red-600 transition"
                          onClick={() =>
                            updateStepData({
                              socialMediaAccount: {
                                name: "",
                                userName: "",
                                profilePicture: "",
                              },
                            })
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
                          onClick={handleTwitterLogin}
                        >
                          Connect
                        </button>
                      </>
                    )}
                  </div>
                </div>
              )}

              {/* content 2 */}
              {stepData.currentStep === 2 && (
                <div>
                  <h2 className="text-[20px] font-semibold">
                    What is your campaign goal
                  </h2>
                  <select
                    className="border-[0.5px] border-[#D7D7D7] p-3 rounded-[8px] w-full mt-4 text-sm text-[#6A6B6A] bg-white focus:outline-none focus:border-[#330065]"
                    value={stepData.campaignGoal}
                    onChange={(e) => {
                      updateStepData({ topic: e.target.value });
                    }}
                  >
                    <option value="">Select a campaign goal</option>
                    <option value="Reach">Reach</option>
                    <option value="Engagement">Engagement</option>
                  </select>
                </div>
              )}
            </div>

            {/* buttons */}
            <div className="flex justify-between items-center mt-24">
              {/* Try Again Button */}
              {stepData.currentStep > 1 ? (
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
                {stepData.currentStep > 1 && (
                  <button
                    onClick={handlePrevious}
                    className="border border-[#330065] px-4 py-2 rounded-[32px] text-sm font-semibold text-[#330065] hover:bg-[#330065] hover:text-white transition"
                  >
                    Previous
                  </button>
                )}

                {/* Conditional Next or Generate Button */}
                {stepData.currentStep === 5 ? (
                  <button
                    onClick={handleGenerateClick}
                    disabled={
                      !allStepsCompleted() || loading || isGenerateCompleted
                    }
                    className={`rounded-[32px] px-4 py-2 text-sm font-semibold transition ${
                      isStepCompleted(stepData.currentStep) &&
                      !isGenerateCompleted
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
                    disabled={!isStepCompleted(stepData.currentStep)}
                    className={`rounded-[32px] px-4 py-2 text-sm font-semibold transition ${
                      isStepCompleted(stepData.currentStep)
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
    </div>
  );
}

export default Advert;
