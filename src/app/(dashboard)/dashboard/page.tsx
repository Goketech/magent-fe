"use client";
import { ReactTyped } from "react-typed";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  user: "user" | "magent";
  text: string;
  action: "NONE" | "SEARCH" | "LINK";
}

const Page = () => {
  const { toast } = useToast();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  /* eslint-disable  @typescript-eslint/no-unused-vars */
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!inputText.trim()) return;

    const token = localStorage.getItem("access_token");
    if (!token) {
      toast({
        variant: "destructive",
        description: "Please sign in.",
      });
      return;
    }

    // Add user message
    const userMessage: Message = {
      user: "user",
      text: inputText,
      action: "NONE",
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    setInputText("");

    try {
      /* eslint-disable  @typescript-eslint/no-explicit-any */
      const response: any = await fetch(
        "https://www.api.hellomagent.com/api/ai/query",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ input: inputText }),
        }
      );

      console.log(response);

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let result = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        // Decode chunk and process it
        const chunk = decoder.decode(value, { stream: true });
        result += chunk;

        try {
          // Parse chunk as JSON
          const parsedChunk = JSON.parse(chunk);

          // Update UI with intermediate agent response
          setMessages((prev) => [...prev, ...parsedChunk]);
          /* eslint-disable  @typescript-eslint/no-unused-vars */
        } catch (e) {
          // Handle case where the chunk is not complete JSON
          console.warn("Chunk not yet complete:", chunk);
        }
      }

      // Final data processing if needed
      console.log("Final response:", result);
      // Add agent response
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        variant: "destructive",
        description: "Failed to send message. Please try again.",
      });
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

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div>
        <p className="text-center mb-[24px] text-[24px] font-[500] leading-[36px] text-white">
          Need help with{" "}
          <span className="text-primary">
            <ReactTyped
              strings={[
                '<span class="text-[#FFC8DD]">reports?</span>',
                '<span class="text-[#CDB4DB]">insights?</span>',
                '<span class="text-[#BDE0FE]">analysis?</span>',
                '<span class="text-[#F2E8CF]">strategy?</span>',
              ]}
              typeSpeed={50}
              backSpeed={30}
              backDelay={1000}
              loop
            />
          </span>
        </p>

        {messages.length > 0 && (
          <div className="mx-5 md:mx-0 mb-4 max-h-[300px] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-3 rounded-lg ${
                  message.user === "user"
                    ? "bg-primary/10 ml-auto max-w-[80%]"
                    : "bg-[#1D1C1A] max-w-[80%]"
                }`}
              >
                <p className="text-white">{message.text}</p>
              </div>
            ))}
          </div>
        )}

        <div className="relative mx-auto lg:mx-0  md:w-[600px] lg:w-[800px]">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            cols={70}
            rows={6}
            className="w-full outline-[#D7D7D7] rounded-[6px] resize-none p-2 md:p-5 text-white border-[0.5px] border-[#D7D7D7] bg-[#1D1C1A]"
            placeholder="Ask us..."
          ></textarea>
          <Button onClick={handleSubmit} className="w-25 h-25 absolute bottom-5 right-5 bg-[#D7D7D7] rounded-full p-2 flex items-center justify-center">
            <MoveRight className="text-white" size={15} />
          </Button>
        </div>
        <p className="mx-auto lg:mx-0 mt-[24px] mb-[16px] text-white">
          Try searching for
        </p>
        <div className="mx-auto lg:mx-0 flex flex-col lg:flex-row text-white gap-[8px] md:gap-[16px]">
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
        <div className="mt-[16px] mx-auto lg:mx-0 flex flex-col lg:flex-row text-white gap-[16px]">
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
      </div>
    </div>
  );
};

export default Page;
