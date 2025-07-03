"use client";
import { ReactTyped } from "react-typed";
import { AudioLines, MicIcon, MoveUp, X } from "lucide-react";
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
  duration?: number;
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
  const analyserRef = useRef<AnalyserNode | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationRef = useRef<number | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const recordingStartTime = useRef<number>(0);
  const [voiceChatEnabled, setVoiceChatEnabled] = useState(false);

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
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;

      // Record start time for duration calculation
      recordingStartTime.current = Date.now();

      // Use audio/wav for better browser compatibility
      const options = { mimeType: "audio/webm;codecs=opus" };
      let mediaRecorderInstance;

      try {
        mediaRecorderInstance = new MediaRecorder(stream, options);
      } catch (e) {
        // Fallback if webm is not supported
        mediaRecorderInstance = new MediaRecorder(stream);
      }

      mediaRecorder.current = mediaRecorderInstance;
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = async () => {
        // Calculate duration from recording time
        const recordingDuration =
          (Date.now() - recordingStartTime.current) / 1000;

        const audioBlob = new Blob(audioChunks.current, {
          type: mediaRecorder.current?.mimeType || "audio/webm",
        });
        const url = URL.createObjectURL(audioBlob);

        setHasStartChat(true);
        setIsTyping(true);

        // Add user message with audio and calculated duration
        const message: ChatMessage = {
          id: Date.now(),
          text: "",
          sender: "user",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          audioUrl: url,
          duration: recordingDuration, // Use calculated duration
        };
        setMessages((prev) => [...prev, message]);

        // Send to whisper API
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
          // Add error message
          const errorMessage: ChatMessage = {
            id: Date.now() + 1,
            text: "Sorry, I couldn't process your audio. Please try again.",
            sender: "bot",
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
          };
          setMessages((prev) => [...prev, errorMessage]);
        } finally {
          setIsTyping(false);
        }
      };

      audioContextRef.current = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      const source = audioContextRef.current.createMediaStreamSource(stream);

      analyserRef.current.fftSize = 256;
      source.connect(analyserRef.current);

      mediaRecorder.current.start(100); // Collect data every 100ms
      setRecording(true);
    } catch (error) {
      console.error("Error starting recording:", error);
      toast({
        title: "Recording Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
      setRecording(false);

      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      // Stop all tracks to release the mic
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    }
  };

  const visualize = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const analyser = analyserRef.current;

    if (!ctx || !analyser) return;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!recording) return;

      animationRef.current = requestAnimationFrame(draw);

      analyser.getByteFrequencyData(dataArray);

      // Clear canvas with transparent background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = 3;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength && x < canvas.width; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.6;

        ctx.fillStyle = "black";
        ctx.fillRect(x, (canvas.height - barHeight) / 2, barWidth, barHeight);

        x += barWidth + 2;
      }
    };

    draw();
  };

  useEffect(() => {
    if (recording) {
      // Wait a tick to ensure canvas is rendered and sized
      setTimeout(() => {
        visualize();
      }, 0);
    }
  }, [recording]);

  useEffect(() => {
    const updateCanvasSize = () => {
      const canvas = canvasRef.current;
      const textarea = textareaRef.current;

      if (canvas && textarea) {
        // Set canvas size to match textarea dimensions
        canvas.width = textarea.offsetWidth;
        canvas.height = textarea.offsetHeight;
      }
    };

    // Initial sizing
    updateCanvasSize();

    // Update on window resize
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [recording]);

  const handleVoiceChat = () => {
    setVoiceChatEnabled(true);
  };

  const stopVoiceChat = () => {
    setVoiceChatEnabled(false);
  };

  return (
    <div className="flex flex-col gap-10 h-full items-center justify-center w-full m-auto">
      {hasStartChat && (
        <ChatBox
          messages={messages}
          isTyping={isTyping}
          messagesEndRef={messagesEndRef}
          audioUrl={audioUrl}
          duration={duration}
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

        <div className="relative mx-auto lg:mx-0 md:w-[600px] lg:w-[800px]">
          {/* Textarea */}
          <textarea
            style={{ overflowX: "hidden", overflowY: "hidden" }}
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            className={`w-full outline-[#D7D7D7] rounded-[20px]  resize-none p-4 md:p-7 text-[#212221] text-base border-[0.5px] border-[#D7D7D7] bg-[#F6F6F6] max-h-[200px] transition-opacity duration-200 ${
              recording ? "opacity-60 cursor-not-allowed" : ""
            }`}
            placeholder={recording || voiceChatEnabled ? "" : "Ask anything..."}
            disabled={recording || voiceChatEnabled}
          ></textarea>

          {/* Waveform Canvas Overlay */}
          {recording && (
            <div className="absolute left-0 top-0 w-full h-full pointer-events-none flex px-10 items-center justify-center overflow-hidden">
              <canvas
                ref={canvasRef}
                className="w-full h-full"
                style={{
                  display: "block",
                  background: "transparent",
                }}
              />
            </div>
          )}

          {voiceChatEnabled && (
            <div className="absolute left-0 top-0 w-full h-full pointer-events-none flex px-10 items-center justify-center overflow-hidden">
              <p>Voice chat has started</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-3 items-center absolute bottom-5 right-5 z-20">
            <button
              className={`mt-1 w-25 h-25 rounded-full p-2 flex items-center justify-center hover:bg-primary hover:text-white transition bg-white border border-gray-300 shadow-sm ${
                voiceChatEnabled ? "hidden" : ""
              }`}
            >
              {recording ? (
                <X size={22} onClick={stopRecording} />
              ) : (
                <MicIcon size={22} onClick={startRecording} />
              )}
            </button>
            {inputText && !recording && !voiceChatEnabled ? (
              <Button
                onClick={handleSendMessage}
                className={` bg-[#D7D7D7] rounded-full p-[10px] flex items-center font-bold justify-center bg-primary text-white hover:bg-white hover:text-black transition ${
                  voiceChatEnabled ? "hidden" : ""
                }`}
              >
                <MoveUp size={22} />
              </Button>
            ) : (
              <>
                {voiceChatEnabled ? (
                  <button
                    onClick={stopVoiceChat}
                    className={`mt-1 w-25 h-25 rounded-full p-2 flex items-center justify-center hover:bg-primary hover:text-white transition bg-white border border-gray-300 shadow-sm`}
                  >
                    <X size={22} />
                  </button>
                ) : (
                  <Button
                    onClick={handleVoiceChat}
                    className={` bg-[#D7D7D7] rounded-full p-[10px] flex items-center font-bold justify-center bg-primary text-white hover:bg-white hover:text-black transition ${
                      recording ? "hidden" : ""
                    }`}
                  >
                    <AudioLines size={22} />
                  </Button>
                )}
              </>
            )}
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
                  onClick={() => !recording && handleSampleClick(text)}
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
                  onClick={() => !recording && handleSampleClick(text)}
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
