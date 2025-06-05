"use client";
import { ReactTyped } from "react-typed";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import ChatModal from "@/components/layouts/ChatModal";
import { Message } from "@/app/(dashboard)/try/page";
import { Loading } from "../ui/loading";
import ChatResponse from "./ChatResponse";

const Research = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    const token = localStorage.getItem("access_token");
    // if (!token) {
    //   toast({
    //     variant: "destructive",
    //     description: "Please sign in.",
    //   });
    //   return;
    // }

    setIsModalOpen(true);

    // Add user message
    const userMessage: Message = {
      user: "user",
      text: inputText,
      action: "NONE",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setHasSubmitted(true);
    setInputText("");

    try {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      //   const response: any = await fetch(
      //     "https://www.api.hellomagent.com/api/ai/query",
      //     {
      //       method: "POST",

      //       headers: {
      //         "Content-Type": "application/json",
      //         Authorization: `Bearer ${token}`,
      //       },
      //       body: JSON.stringify({ input: inputText }),
      //     }
      //   );

      //   if (response.status === 401) {
      //     toast({
      //       variant: "destructive",
      //       description: "Please sign in.",
      //     });
      //     setHasSubmitted(false);
      //     localStorage.removeItem("access_token");
      //     return;
      //   }

      //   console.log(response);

      //   const reader = response.body.getReader();
      //   const decoder = new TextDecoder("utf-8");
      let result = "";

      //   while (true) {
      //     const { done, value } = await reader.read();
      //     if (done) break;

      //     // Decode chunk and process it
      //     const chunk = decoder.decode(value, { stream: true });
      //     result += chunk;

      //     try {
      //       // Parse chunk as JSON
      //       const parsedChunk = JSON.parse(chunk);

      //       // Update UI with intermediate agent response
      //       setMessages((prev) => [...prev, ...parsedChunk]);
      //       /* eslint-disable  @typescript-eslint/no-unused-vars */
      //     } catch (e) {
      //       // Handle case where the chunk is not complete JSON
      //       console.warn("Chunk not yet complete:", chunk);
      //     }
      //   }

      // Final data processing if needed
      console.log("Final response:", result);
      // Add agent response
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        description: "Failed to send message. Please try again.",
      });
      setHasSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };

  /* eslint-disable  @typescript-eslint/no-explicit-any */
  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleSampleClick = (text: string) => {
    setInputText(text);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMessages([]);
  };

  return (
    <div className="flex items-center justify-center w-full m-auto">
      {!hasSubmitted ? (
        <div>
          <p className="text-center mb-[24px] text-xl md:text-[24px] font-[500] leading-[36px] text-[#212221] whitespace-nowrap">
            Need help with{" "}
            <span className="font-normal">
              <ReactTyped
                strings={[
                  '<span class="bg-[#FFC8DD] p-1 rounded-[6px]">reports?</span>',
                  '<span class="bg-[#CDB4DB] p-1 rounded-[6px]">insights?</span>',
                  '<span class="bg-[#BDE0FE] p-1 rounded-[6px]">analysis?</span>',
                  '<span class="bg-[#F2E8CF] p-1 rounded-[6px]">strategy?</span>',
                ]}
                typeSpeed={50}
                backSpeed={30}
                backDelay={1000}
                loop
              />
            </span>
          </p>

          <div className="relative mx-auto lg:mx-0  md:w-[600px] lg:w-[800px]">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              cols={70}
              rows={6}
              className="w-full outline-[#D7D7D7] rounded-[6px] resize-none p-2 md:p-5 text-[#212221] text-base border-[0.5px] border-[#D7D7D7] bg-[#F6F6F6]"
              placeholder="Ask us..."
            ></textarea>
            <Button
              onClick={handleSubmit}
              className="w-25 h-25 absolute bottom-5 right-5 bg-[#D7D7D7] rounded-full p-2 flex items-center justify-center hover:bg-primary transition"
            >
              <MoveRight className="text-white" size={15} />
            </Button>
          </div>
          <p className="mx-auto lg:mx-0 mt-[24px] mb-[16px] text-[#6A6B6A]">
            Try searching for
          </p>
          <div className="mx-auto lg:mx-0 flex text-sm md:text-base flex-col lg:flex-row text-[#212221] gap-[8px] md:gap-[16px]">
            {[
              "Number of Facebook users in 2024",
              "How to increase Instagram followers",
              "Top 10 marketing strategies",
            ].map((text, index) => (
              <p
                key={index}
                onClick={() => handleSampleClick(text)}
                className="cursor-pointer px-[10px] py-[8px] border-[0.5px] border-[#D7D7D7] rounded-[32px] hover:bg-primary/90 hover:text-primary-foreground"
              >
                {text}
              </p>
            ))}
          </div>
          <div className="mt-[16px] mx-auto lg:mx-0 text-sm md:text-base  flex flex-col lg:flex-row text-[#212221] gap-[16px]">
            {[
              "Solana adoption rate in 2024",
              "How to increase Twitter engagement",
              "Online Community building strategies",
            ].map((text, index) => (
              <p
                key={index}
                onClick={() => handleSampleClick(text)}
                className="cursor-pointer px-[10px] py-[8px] border-[0.5px] border-[#D7D7D7] rounded-[32px] hover:bg-primary/90 hover:text-primary-foreground"
              >
                {text}
              </p>
            ))}
          </div>
          {/* <ChatModal
                  isOpen={isModalOpen}
                  onClose={handleCloseModal}
                  messages={messages}
                  isLoading={isLoading}
                /> */}
        </div>
      ) : isLoading ? (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="flex items-center gap-5  text-xl font-semibold text-[#212221]">
            <p>Loading</p>
            <Loading height="40" width="40" color="#000" />
          </div>
        </div>
      ) : (
        // <ChatResponse messages={messages} />
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-5  text-xl font-semibold text-[#212221]">
            <p>Chat response</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Research;
