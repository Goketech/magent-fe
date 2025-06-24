"use client";
import { ReactTyped } from "react-typed";
import { MicIcon, MoveUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Loading } from "../ui/loading";
import ChatBox from "./ChatBox";

type ChatMessage = {
  id: number;
  text: string;
  sender: string;
  timestamp: string;
  audioUrl?: string | null;
};

const Research = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasStartChat, setHasStartChat] = useState(false);
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState("");
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audioChunks = useRef<Blob[]>([]);

  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // const handleSubmit = async () => {
  //   if (!inputText.trim()) return;

  //   const token = localStorage.getItem("access_token");
  //   // if (!token) {
  //   //   toast({
  //   //     variant: "destructive",
  //   //     description: "Please sign in.",
  //   //   });
  //   //   return;
  //   // }

  //   setIsModalOpen(true);

  //   // Add user message
  //   const userMessage: Message = {
  //     user: "user",
  //     text: inputText,
  //     action: "NONE",
  //   };

  //   // setMessages((prev) => [...prev, userMessage]);
  //   setIsLoading(true);
  //   setHasSubmitted(true);
  //   setInputText("");

  //   try {
  //     /* eslint-disable  @typescript-eslint/no-explicit-any */
  //     //   const response: any = await fetch(
  //     //     "https://www.api.hellomagent.com/api/ai/query",
  //     //     {
  //     //       method: "POST",

  //     //       headers: {
  //     //         "Content-Type": "application/json",
  //     //         Authorization: `Bearer ${token}`,
  //     //       },
  //     //       body: JSON.stringify({ input: inputText }),
  //     //     }
  //     //   );

  //     //   if (response.status === 401) {
  //     //     toast({
  //     //       variant: "destructive",
  //     //       description: "Please sign in.",
  //     //     });
  //     //     setHasSubmitted(false);
  //     //     localStorage.removeItem("access_token");
  //     //     return;
  //     //   }

  //     //   console.log(response);

  //     //   const reader = response.body.getReader();
  //     //   const decoder = new TextDecoder("utf-8");
  //     let result = "";

  //     //   while (true) {
  //     //     const { done, value } = await reader.read();
  //     //     if (done) break;

  //     //     // Decode chunk and process it
  //     //     const chunk = decoder.decode(value, { stream: true });
  //     //     result += chunk;

  //     //     try {
  //     //       // Parse chunk as JSON
  //     //       const parsedChunk = JSON.parse(chunk);

  //     //       // Update UI with intermediate agent response
  //     //       setMessages((prev) => [...prev, ...parsedChunk]);
  //     //       /* eslint-disable  @typescript-eslint/no-unused-vars */
  //     //     } catch (e) {
  //     //       // Handle case where the chunk is not complete JSON
  //     //       console.warn("Chunk not yet complete:", chunk);
  //     //     }
  //     //   }

  //     // Final data processing if needed
  //     console.log("Final response:", result);
  //     // Add agent response
  //   } catch (error) {
  //     console.error("Error sending message:", error);
  //     toast({
  //       variant: "destructive",
  //       description: "Failed to send message. Please try again.",
  //     });
  //     setHasSubmitted(false);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  const handleKeyPress = (e: any) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        textareaRef.current.scrollHeight + "px";
    }
  }, [inputText]);

  const handleSendMessage = () => {
    setHasStartChat(true);
    if (inputText.trim()) {
      const message = {
        id: inputText.length + 1,
        text: inputText,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
      };
      setMessages([...messages, message]);
      setInputText("");

      // Simulate bot typing
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const responses = [
          "I understand your concern. Let me help you with that.",
          "That's a great question! Here's what I can tell you...",
          "Thanks for providing that information. I'll assist you right away.",
          "I'm here to help! Let me look into that for you.",
          "Perfect! I can definitely help you with this request.",
        ];
        const response = {
          id: messages.length + 2,
          text: responses[Math.floor(Math.random() * responses.length)],
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, response]);
      }, 2000);
    }
  };

  const handleSampleClick = (text: string) => {
    setInputText(text);
  };

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    mediaRecorder.current = new MediaRecorder(stream);
    audioChunks.current = [];

    mediaRecorder.current.ondataavailable = (event) => {
      audioChunks.current.push(event.data);
    };

    mediaRecorder.current.onstop = async () => {
      const audioBlob = new Blob(audioChunks.current, { type: "audio/webm" });
      const url = URL.createObjectURL(audioBlob);

      setHasStartChat(true);
      setIsTyping(true);

      // Add user message with audio immediately
      const message: ChatMessage = {
        id: Date.now(),
        text: "",
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        audioUrl: url,
      };
      setMessages((prev) => [...prev, message]);

      // Then send to Whisper API
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.webm");

      try {
        const response = await fetch("/api/whisper", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log(data.text);
        const botMessage: ChatMessage = {
          id: Date.now() + 1,
          text: data.text,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setMessages((prev) => [...prev, botMessage]);
      } catch (error) {
        console.error("Whisper API error:", error);
      } finally {
        setIsTyping(false);
      }
    };

    mediaRecorder.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorder.current) {
      mediaRecorder.current.stop();
    }
    setRecording(false);
  };

  return (
    <div className="flex flex-col gap-10 h-full items-center justify-center w-full m-auto">
      {hasStartChat && (
        <ChatBox
          messages={messages}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
          audioUrl={audioUrl}
        />
      )}
      <div>
        {!hasStartChat && (
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
        )}

        <div className="relative mx-auto lg:mx-0  md:w-[600px] lg:w-[800px]">
          <textarea
            style={{ overflowX: "hidden", overflowY: "hidden" }}
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            className="w-full outline-[#D7D7D7] rounded-[20px] resize-none p-4 md:p-7 text-[#212221] text-base border-[0.5px] border-[#D7D7D7] bg-[#F6F6F6] max-h-[200px]"
            placeholder="Ask anything..."
          ></textarea>
          <div className="flex gap-3 items-center absolute bottom-5 right-5">
            <button className="mt-1 w-25 h-25 rounded-full p-2 flex items-center justify-center hover:bg-primary hover:text-white transition">
              {recording ? (
                <button onClick={stopRecording}>Stop</button>
              ) : (
                <MicIcon size={22} onClick={startRecording} />
              )}
            </button>
            <Button
              onClick={handleSendMessage}
              disabled={!inputText}
              className="w-25 h-25 bg-[#D7D7D7] rounded-full p-2 flex items-center justify-center bg-primary disabled:cursor-not-allowed hover:bg-primary transition"
            >
              <MoveUp className="text-white" size={100} />
            </Button>
          </div>
        </div>
        {!hasStartChat && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default Research;
