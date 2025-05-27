"use client";
import React, { useState, useEffect } from "react";
import Preview from "./Preview";
import Image from "next/image";
import { useStepContext } from "@/context/StepContext";
import { Loading } from "../ui/loading";
import PopUp from "./PopUp";
import { useAuth } from "@/context/AuthProvider";
import { useToast } from "@/hooks/use-toast";
import {
  transferCoin,
  developerPublicKey,
  confirmTransaction,
} from "@/utils/transferCoin";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";

interface TwitterProfile {
  profile_image_url: string;
  name: string;
  username: string;
}

function Content() {
  const { toast } = useToast();
  const { jwt, connected, authenticate } = useAuth();
  const { publicKey, sendTransaction } = useWallet();
  const { connection } = useConnection();
  // const [showFirstScreen, setShowFirstScreen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isGenerateCompleted, setIsGenerateCompleted] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showPreviewPopup, setShowPreviewPopup] = useState(false);
  const [inputMode, setInputMode] = useState<"type" | "select">("type");
  // const [isRegenerating, setIsRegenerating] = useState(false);
  const maxTopics = 2;
  const { stepData, updateStepData } = useStepContext();

  const currentTopics =
    inputMode === "type" ? stepData.typeTopics : stepData.selectTopics;

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await fetchTwitterProfile();
      updateStepData({
        socialMediaAccount: {
          name: profile!.name,
          userName: profile!.username,
          profilePicture: profile!.profile_image_url,
        },
      });
    };

    fetchProfile();
  }, []);

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

  const handleDisconnectTwitter = async () => {
    try {
      // const accessToken = localStorage.getItem("twitter_access_token");

      // if (!accessToken) {
      //   throw new Error("No access token found");
      // }

      // const response = await fetch("/api/auth/twitter/logout", {
      //   method: "POST",
      //   headers: {
      //     Authorization: `Bearer ${accessToken}`,
      //   },
      // });

      // if (!response.ok) {
      //   throw new Error("Failed to disconnect Twitter");
      // }

      localStorage.removeItem("twitter_access_token");
      updateStepData({
        socialMediaAccount: {
          name: "",
          userName: "",
          profilePicture: "",
        },
      });
    } catch (error) {
      console.error("Error disconnecting Twitter:", error);
    }
  };

  async function fetchTwitterProfile(): Promise<TwitterProfile | null> {
    try {
      const accessToken = localStorage.getItem("twitter_access_token");

      if (!accessToken) {
        throw new Error("No access token found");
      }

      const response = await fetch("/api/auth/twitter/me", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user profile");
      }

      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error("Error fetching Twitter profile:", error);
      return null;
    }
  }

  const generateSampleTweet = async () => {
    setIsPublishing(false);
    if (!jwt) {
      // authenticate();
      toast({
        variant: "destructive",
        description: "Please connect your wallet",
      });
      return;
    }

    try {
      const response = await fetch(
        "https://www.api.hellomagent.com/twitter/sample-post",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic:
              inputMode === "type"
                ? stepData.typeTopics
                : stepData.selectTopics,
            firstStyle: stepData.postStyle,
            secondStyle: stepData.commentStyle,
          }),
        }
      );

      if (!response.ok) {
        toast({
          variant: "destructive",
          description: "Failed to generate sample post. Please try again.",
        });
        return;
      }

      const data = await response.json();
      updateStepData({ samplePost: data[0].text });
      toast({
        variant: "success",
        description: "Sample post generated successfully",
      });
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to schedule tweets. Please try again.",
      });
      console.error("Error fetching data:", error);
    }
  };

  const scheduleTweet = async () => {
    if (!jwt) {
      toast({
        variant: "destructive",
        description: "Please connect your wallet",
      });
      setIsPublishing(false);
      return;
    }
    setIsPublishing(true);

    if (!publicKey) {
      toast({
        variant: "destructive",
        description: "Please connect your wallet",
      });
      setIsPublishing(false);
      return;
    }

    const dailyPrice = 0.125;
    const days = stepData.duration;
    const amountToSend = Number((days * dailyPrice).toFixed(3));

    const transactionResponse = await fetch(
      "https://www.api.hellomagent.com/transactions/create-transaction",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          feature: "sample_tweet",
          reference: `sample_${Date.now()}`,
          amount: amountToSend,
        }),
      }
    );

    if (!transactionResponse.ok) {
      toast({
        variant: "destructive",
        description: "Failed to initiate transaction. Please try again.",
      });
      setIsPublishing(false);
      return;
    }

    const transactionData = await transactionResponse.json();
    const transactionId = transactionData.transactionId;
    let signature = "";

    try {
      signature = await transferCoin(
        connection,
        publicKey!,
        developerPublicKey,
        amountToSend,
        sendTransaction
      );

      if (!signature) {
        toast({
          variant: "destructive",
          description: "Failed to verify transaction. Please try again.",
        });
        setIsPublishing(false);
        return;
      }
      const blockHash = await connection.getLatestBlockhash();

      const transaction = await confirmTransaction(connection, {
        signature,
        ...blockHash,
      });

      if (transaction.value.err !== null) {
        toast({
          variant: "destructive",
          description: "Failed to verify transaction. Please try again.",
        });
        setIsPublishing(false);
        return;
      }
    } catch (error) {
      console.error("Transaction Error:", error);
      toast({
        variant: "destructive",
        description:
          error instanceof Error
            ? error.message
            : "Failed to complete transaction. Please try again.",
      });
      setIsPublishing(false);
      return;
    }
    const updateResponse = await fetch(
      "https://www.api.hellomagent.com/transactions/update-transaction-status",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          transactionId,
          status: "success",
          signature,
        }),
      }
    );

    if (!updateResponse.ok) {
      toast({
        variant: "destructive",
        description: "Failed to verify transaction. Please try again.",
      });
      setIsPublishing(false);
      return;
    }

    const token = localStorage.getItem("twitter_access_token");
    if (!token || !stepData.socialMediaAccount.name) {
      toast({
        variant: "destructive",
        description: "Please connect your twitter account",
      });
      setIsPublishing(false);
      return;
    }

    try {
      const instantResponse = await fetch("/api/auth/twitter/post-tweet", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${jwt}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, text: stepData.samplePost }),
      });

      if (!instantResponse.ok) {
        toast({
          variant: "destructive",
          description: "Failed to schedule tweets. Please try again.",
        });
        setIsPublishing(false);
        return;
      }

      const response = await fetch(
        "https://www.api.hellomagent.com/twitter/schedule-post",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            topic:
              inputMode === "type"
                ? stepData.typeTopics
                : stepData.selectTopics,
            minInterval: stepData.minFrequency,
            maxInterval: stepData.maxFrequency,
            duration: stepData.duration,
            firstStyle: stepData.postStyle,
            secondStyle: stepData.commentStyle,
            accessToken: token,
            transactionId,
          }),
        }
      );

      if (!response.ok) {
        toast({
          variant: "destructive",
          description: "Failed to schedule tweets. Please try again.",
        });
        setIsPublishing(false);
        return;
      }

      const data = await response.json();
      toast({
        variant: "success",
        description: "Tweet Scheduled successfully",
      });

      setShowSuccessPopup(true);
      setIsPublishing(false);
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Failed to schedule tweets. Please try again.",
      });
      setIsPublishing(false);
      console.error("Error fetching data:", error);
    }
  };

  const handleStartClick = () => {
    updateStepData({
      showFirstScreen: false,
    });
  };

  const handleNext = () => {
    if (!isStepCompleted(stepData.currentStep)) return;
    if (stepData.currentStep < 5)
      updateStepData({ currentStep: stepData.currentStep + 1 });
  };

  const isStepCompleted = (step: number) => {
    switch (step) {
      case 1:
        return !!stepData.socialMediaAccount.name;
      case 2:
        const topics =
          inputMode === "type" ? stepData.typeTopics : stepData.selectTopics;
        if (topics.length === 1) {
          return topics[0].value.trim() !== "";
        }
        if (topics.length === 2) {
          return topics.every((topic) => topic.value.trim() !== "");
        }
        return false;
      case 3:
        return !!stepData.minFrequency && !!stepData.maxFrequency;
      case 4:
        return !!stepData.duration;
      case 5:
        return !!stepData.postStyle && !!stepData.commentStyle;
      default:
        return false;
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
        samplePost: "",
        currentStep: 1,
        showFirstScreen: false,
      });

      // setShowFirstScreen(false);
      setButtonClicked(false);
      isStepCompleted(1);
      setIsLoading(false);
      setShowSuccessPopup(false);
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
    await generateSampleTweet();
    setIsGenerateCompleted(true);
    setLoading(false);
    if (window.innerWidth <= 768) {
      setShowPreviewPopup(true);
    }
  };

  const handlePublish = async () => {
    await scheduleTweet();
  };

  const closePopup = () => {
    setShowSuccessPopup(false);
  };

  const togglePreviewPopup = () => {
    setShowPreviewPopup((prev) => !prev);
  };

  const handleTopicChange = (value: string, index: number) => {
    const updatedTopics = [...currentTopics];
    updatedTopics[index].value = value;

    if (inputMode === "type") {
      updateStepData({ typeTopics: updatedTopics });
    } else {
      updateStepData({ selectTopics: updatedTopics });
    }
  };

  const handleAddTopic = () => {
    if (currentTopics.length < maxTopics) {
      const updatedTopics = [...currentTopics, { mode: inputMode, value: "" }];

      if (inputMode === "type") {
        updateStepData({ typeTopics: updatedTopics });
      } else {
        updateStepData({ selectTopics: updatedTopics });
      }
    }
  };

  return (
    <div className="relative">
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}
      <div className="flex flex-col md:flex-row justify-between gap-6 h-full w-full">
        <div className="flex flex-col gap-5 w-full h-full">
          <div>
            <h2 className="text-sm md:text-[20px] font-medium mb-4">
              Social media management
            </h2>
            <p className="text-base">
              Effortlessly create tailored, high-quality content with our AI
              agent in seconds.
            </p>
          </div>
          {stepData.showFirstScreen ? (
            <div className="border-[#F6F6F6] w-full md:w-[450px] overflow-x-hidden rounded-[12px] text-center border-2 flex flex-col gap-5 justify-center items-center p-6 md:p-8">
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
            <div className="border-[#F6F6F6] bg-white w-full h-full rounded-[12px] border-2 flex flex-col justify-between p-5">
              {/* Progress Bar */}
              <div className="flex flex-row xs:flex-col xs:gap-5 justify-between w-full">
                <p className="bg-[#EBE6F0] rounded-[8px] px-2 py-1 text-[#330065] text-xs whitespace-nowrap mr-2 md:mr-0">
                  {(stepData.currentStep === 1 && (
                    <span>Social Media Account</span>
                  )) ||
                    (stepData.currentStep === 2 && (
                      <span>Content topic</span>
                    )) ||
                    (stepData.currentStep === 3 && (
                      <span>Post frequency</span>
                    )) ||
                    (stepData.currentStep === 4 && <span>Duration</span>) ||
                    (stepData.currentStep === 5 && <span>Content style</span>)}
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
                            onClick={handleDisconnectTwitter}
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
                      Choose topics for your content
                    </h2>
                    <div className="flex items-center gap-4 mb-4">
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="mode"
                          value="type"
                          checked={inputMode === "type"}
                          onChange={() => {
                            setInputMode("type");
                            if (stepData.typeTopics.length === 0) {
                              updateStepData({
                                typeTopics: [{ mode: "type", value: "" }],
                              });
                            }
                          }}
                          className="accent-[#330065] text-[#212221] text-sm"
                        />
                        Type
                      </label>
                      <label className="flex items-center gap-1">
                        <input
                          type="radio"
                          name="mode"
                          value="select"
                          checked={inputMode === "select"}
                          onChange={() => {
                            setInputMode("select");
                            if (stepData.selectTopics.length === 0) {
                              updateStepData({
                                selectTopics: [{ mode: "select", value: "" }],
                              });
                            }
                          }}
                          className="accent-[#330065] text-[#212221] text-sm"
                        />
                        Select
                      </label>
                    </div>

                    {currentTopics.map((topic, index) => (
                      <div key={index}>
                        {inputMode === "type" ? (
                          <input
                            type="text"
                            placeholder="Enter topic"
                            value={topic.value}
                            onChange={(e) =>
                              handleTopicChange(e.target.value, index)
                            }
                            className="border-[0.5px] border-[#D7D7D7] p-3 rounded-[8px] w-full mt-4 text-sm text-[#6A6B6A] bg-white focus:outline-none focus:border-[#330065]"
                          />
                        ) : (
                          <select
                            value={topic.value}
                            onChange={(e) =>
                              handleTopicChange(e.target.value, index)
                            }
                            className="border-[0.5px] border-[#D7D7D7] p-3 rounded-[8px] w-full mt-4 text-sm text-[#6A6B6A] bg-white focus:outline-none focus:border-[#330065]"
                          >
                            <option value="">Select a topic</option>
                            <option value="Market research">
                              Market research
                            </option>
                            <option value="Consumer psychology">
                              Consumer psychology
                            </option>
                            <option value="Digital marketing">
                              Digital marketing
                            </option>
                            <option value="Brand strategy">
                              Brand strategy
                            </option>
                            <option value="Data analytics">
                              Data analytics
                            </option>
                            <option value="Growth hacking">
                              Growth hacking
                            </option>
                            <option value="Crypto Trends">Crypto Trends</option>
                            <option value="Solana">Solana</option>
                            <option value="DeFI">DeFI</option>
                            <option value="Superteam Nigeria">
                              Superteam Nigeria
                            </option>
                            <option value="Web3 Community">
                              Web3 Community
                            </option>
                            <option value="Seamless Crypto Transaction">
                              Seamless Crypto Transaction
                            </option>
                            <option value="Digital and Utility Payments with Crypto">
                              Digital and Utility Payments with Crypto
                            </option>
                            <option value="Earn Your Crypto don't Buy it">
                              Earn Your Crypto don't Buy it
                            </option>
                            <option value="Fiat to Crypto routing">
                              Fiat to Crypto routing
                            </option>
                            <option value="Crypto to Fiat routing">
                              Crypto to Fiat routing
                            </option>
                            <option value="Secure Solana Onboarding">
                              Secure Solana Onboarding
                            </option>
                            <option value="Web3 Marketing">
                              Web3 Marketing
                            </option>
                            <option value="Solana RPCs">Solana RPCs</option>
                          </select>
                        )}
                      </div>
                    ))}

                    {currentTopics.length < maxTopics && (
                      <button
                        onClick={handleAddTopic}
                        className="text-[#330065] text-sm mt-6"
                      >
                        Add another topic
                      </button>
                    )}
                  </div>
                )}

                {/* content 3 */}
                {stepData.currentStep === 3 && (
                  <div>
                    <h2 className="text-[20px] font-semibold">
                      Choose the minimum frequency and the maximum frequency for
                      your content
                    </h2>
                    <select
                      className="border-[0.5px] border-[#D7D7D7] p-3 rounded-[8px] w-full mt-4 text-sm text-[#6A6B6A] bg-white focus:outline-none focus:border-[#330065]"
                      value={stepData.minFrequency}
                      onChange={(e) => {
                        e.target.style.color = "black";
                        updateStepData({
                          minFrequency: Number(e.target.value),
                        });
                      }}
                    >
                      <option value="">Select minimum frequency</option>
                      <option value={1}>0 - 10 hour</option>
                      <option value={2}>10 - 20 hours</option>
                      <option value={3}>20 - 30 hours</option>
                      <option value={4}>30 - 40 hours</option>
                      <option value={5}>40 - 50 hours</option>
                      <option value={6}>50 - 60 hours</option>
                    </select>
                    <select
                      className="border-[0.5px] border-[#D7D7D7] p-3 rounded-[8px] w-full mt-4 text-sm text-[#6A6B6A] bg-white focus:outline-none focus:border-[#330065]"
                      value={stepData.maxFrequency}
                      onChange={(e) => {
                        e.target.style.color = "black";
                        updateStepData({
                          maxFrequency: Number(e.target.value),
                        });
                      }}
                    >
                      <option value="">Select maximum frequency</option>
                      <option value={1}>0 - 10 hour</option>
                      <option value={2}>10 - 20 hours</option>
                      <option value={3}>20 - 30 hours</option>
                      <option value={4}>30 - 40 hours</option>
                      <option value={5}>40 - 50 hours</option>
                      <option value={6}>50 - 60 hours</option>
                    </select>
                  </div>
                )}

                {/* content 4 */}
                {stepData.currentStep === 4 && (
                  <div>
                    <h2 className="text-[20px] font-semibold">
                      How long do you want me to run your content
                    </h2>
                    <select
                      value={stepData.duration}
                      className="border-[0.5px] border-[#D7D7D7] p-3 rounded-[8px] w-full mt-4 text-sm text-[#6A6B6A] bg-white focus:outline-none focus:border-[#330065]"
                      onChange={(e) => {
                        e.target.style.color = "black";
                        updateStepData({ duration: Number(e.target.value) });
                      }}
                    >
                      <option value="">Select duration</option>
                      <option value="1">1 day - $0.125</option>
                      <option value="2">2 days - $0.25</option>
                      <option value="3">3 days - $0.375</option>
                    </select>
                  </div>
                )}

                {/* content 5 */}
                {stepData.currentStep === 5 && (
                  <div>
                    <h2 className="text-[20px] font-semibold">
                      How do you want me to post your content and how do you
                      want me to comment
                    </h2>
                    <select
                      value={stepData.postStyle}
                      className="border-[0.5px] border-[#D7D7D7] p-3 rounded-[8px] w-full mt-4 text-sm text-[#6A6B6A] bg-white focus:outline-none focus:border-[#330065]"
                      onChange={(e) => {
                        e.target.style.color = "black";
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
                      <option value="Visual & interactive">
                        Visual & interactive
                      </option>
                      <option value="Conversational & relatable">
                        Conversational & relatable
                      </option>
                      <option value="Insightful threads">
                        Insightful threads
                      </option>
                      <option value="Timely & Trending">
                        Timely & Trending
                      </option>
                      <option value="Call-to-Action (CTA) focused">
                        Call-to-Action (CTA) focused
                      </option>
                      <option value="Highlight specific features and use cases">
                        Highlight specific features and use cases
                      </option>
                      <option value="Storytelling-infused, clear & concise">
                        Storytelling-infused, clear & concise
                      </option>
                      <option value="Motivational & inspirational">
                        Motivational & inspirational
                      </option>
                      <option value="Factual & credible">
                        Factual & credible
                      </option>
                      <option value="Conversational & personalized">
                        Conversational & personalized
                      </option>
                    </select>
                    <select
                      className="border-[0.5px] border-[#D7D7D7] p-3 rounded-[8px] w-full mt-4 text-sm text-[#6A6B6A] bg-white focus:outline-none focus:border-[#330065]"
                      value={stepData.commentStyle}
                      onChange={(e) => {
                        e.target.style.color = "black";
                        updateStepData({ commentStyle: e.target.value });
                      }}
                    >
                      <option value="">Select comment style</option>
                      <option value="Clarity and complexity">
                        Clarity and complexity
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
                      <option value="Visual & interactive">
                        Visual & interactive
                      </option>
                      <option value="Conversational & relatable">
                        Conversational & relatable
                      </option>
                      <option value="Insightful threads">
                        Insightful threads
                      </option>
                      <option value="Timely & Trending">
                        Timely & Trending
                      </option>
                      <option value="Call-to-Action (CTA) focused">
                        Call-to-Action (CTA) focused
                      </option>
                      <option value="Highlight specific features and use cases">
                        Highlight specific features and use cases
                      </option>
                      <option value="Storytelling-infused, clear & concise">
                        Storytelling-infused, clear & concise
                      </option>
                      <option value="Motivational & inspirational">
                        Motivational & inspirational
                      </option>
                      <option value="Factual & credible">
                        Factual & credible
                      </option>
                      <option value="Conversational & personalized">
                        Conversational & personalized
                      </option>
                    </select>
                  </div>
                )}
              </div>

              {/*  Buttons */}
              <div className="flex flex-col-reverse md:flex-row justify-between gap-4 md:gap-0 items-center mt-24">
                {/* Try Again Button */}
                {stepData.currentStep > 1 ? (
                  <button
                    onClick={handleTryAgain}
                    className="border-none bg-transparent text-sm font-semibold w-full text-[#330065] flex justify-center md:justify-normal  gap-2 items-center mt-2 hover:text-[#220044] transition"
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

                {/* Next/Generate Buttons */}
                <div className="flex flex-col md:flex-row gap-4 md:gap-3 w-full justify-normal md:justify-end">
                  {/* Previous Button (Hidden on Step 1) */}
                  {stepData.currentStep > 1 && (
                    <button
                      onClick={handlePrevious}
                      className="border border-[#330065] w-full md:w-auto flex justify-center px-4 py-2 rounded-[32px] text-sm font-semibold text-[#330065] hover:bg-[#330065] hover:text-white transition"
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
                      className={`rounded-[32px] w-full md:w-auto flex justify-center px-4 py-2 text-sm font-semibold transition ${
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
                      className={`rounded-[32px] w-full md:w-auto flex justify-center px-4 py-2 text-sm font-semibold transition ${
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

        <div className="hidden md:block">
          <Preview
            handleRegenerate={handleGenerateClick}
            isStepCompleted={isStepCompleted}
            loading={loading}
            buttonClicked={buttonClicked}
            isPublishing={isPublishing}
            handlePublish={handlePublish}
          />
        </div>

        <p
          className="md:hidden text-[#330065] text-left text-sm font-semibold cursor-pointer"
          onClick={togglePreviewPopup}
        >
          Tap to show preview
        </p>

        {showPreviewPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="relative bg-white p-4 rounded-lg w-full max-w-[400px] h-[80vh] overflow-auto">
              <button
                onClick={togglePreviewPopup}
                className="absolute top-4 right-4 text-xl text-gray-700"
              >
                ✕
              </button>
              <Preview
                handleRegenerate={handleGenerateClick}
                isStepCompleted={isStepCompleted}
                loading={loading}
                buttonClicked={buttonClicked}
                isPublishing={isPublishing}
                handlePublish={handlePublish}
              />
            </div>
          </div>
        )}

        {showSuccessPopup && (
          <PopUp closePopup={closePopup} handleTryAgain={handleTryAgain} />
        )}
      </div>
    </div>
  );
}

export default Content;
