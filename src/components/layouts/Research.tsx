"use client";
import { ReactTyped } from "react-typed";
import { AudioLines, MicIcon, MoveUp, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect, useCallback } from "react";
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
  const [isVoiceChatActive, setIsVoiceChatActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceChatMessages, setVoiceChatMessages] = useState<ChatMessage[]>([]);
  const [silenceTimer, setSilenceTimer] = useState<NodeJS.Timeout | null>(null);
  const audioPlaybackRef = useRef<HTMLAudioElement | null>(null);
  const vadIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const speechSynthesisRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

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
  }, [messages, voiceChatMessages]);

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
        id: Date.now(),
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
          id: Date.now() + 1,
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
    if (!recording && !voiceChatEnabled) {
      setInputText(text);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100,
        }
      });
      streamRef.current = stream;

      recordingStartTime.current = Date.now();

      const options = { mimeType: "audio/webm;codecs=opus" };
      let mediaRecorderInstance;

      try {
        mediaRecorderInstance = new MediaRecorder(stream, options);
      } catch (e) {
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
        const recordingDuration = (Date.now() - recordingStartTime.current) / 1000;
        const audioBlob = new Blob(audioChunks.current, {
          type: mediaRecorder.current?.mimeType || "audio/webm",
        });
        const url = URL.createObjectURL(audioBlob);

        setHasStartChat(true);
        setIsTyping(true);

        if(!url){
          setIsTyping(false)
        }

        const message: ChatMessage = {
          id: Date.now(),
          text: "",
          sender: "user",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          audioUrl: url,
          duration: recordingDuration,
        };
        setMessages((prev) => [...prev, message]);

        const formData = new FormData();
        formData.append("file", audioBlob, "recording.webm");

        try {
          const response = await fetch("/api/whisper", {
            method: "POST",
            body: formData,
          });

          const data = await response.json();
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

      setupAudioVisualization(stream);
      mediaRecorder.current.start(100);
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
      cleanupAudioResources();
    }
  };

  const setupAudioVisualization = (stream: MediaStream) => {

    if (!analyserRef.current || !audioContextRef.current) {
  console.warn("❌ Audio context or analyser is not available.");
}

    try {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      analyserRef.current = audioContextRef.current.createAnalyser();
      
      const source = audioContextRef.current.createMediaStreamSource(stream);

      analyserRef.current.fftSize = 1024;
      analyserRef.current.smoothingTimeConstant = 0.3;
      source.connect(analyserRef.current);

      visualize();
    } catch (error) {
      console.error("Error setting up audio visualization:", error);
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
      if (!recording && !voiceChatEnabled) return;

      animationRef.current = requestAnimationFrame(draw);
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate average for color intensity
      const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
      const intensity = average / 255;

      const barWidth = 3;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength && x < canvas.width; i++) {
        barHeight = (dataArray[i] / 255) * canvas.height * 0.6;
        
        // Dynamic color based on intensity
        if (voiceChatEnabled) {
          const greenIntensity = Math.min(255, intensity * 500);
          ctx.fillStyle = `rgb(0, ${greenIntensity}, 0)`;
        } else {
          ctx.fillStyle = "black";
        }
        
        ctx.fillRect(x, (canvas.height - barHeight) / 2, barWidth, barHeight);
        x += barWidth + 2;
      }
    };

    draw();
  };

  const cleanupAudioResources = () => {
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    if (analyserRef.current) {
      analyserRef.current = null;
    }
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (vadIntervalRef.current) {
      clearInterval(vadIntervalRef.current);
      vadIntervalRef.current = null;
    }
  };

  // Fixed Voice Activity Detection
 const detectVoiceActivityRef = useRef<() => void>(() => {});

useEffect(() => {
  detectVoiceActivityRef.current = () => {
    if (!analyserRef.current || !isVoiceChatActive || isSpeaking || isProcessing) return;

    console.log({
  isVoiceChatActive,
  recording,
  isSpeaking,
  isProcessing,
});


    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    analyserRef.current.getByteFrequencyData(dataArray);

    const average = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
    const normalizedLevel = average / 255;
    const VOICE_THRESHOLD = 0.015;
    const SILENCE_DURATION = 2000;

    console.log("🎤 Voice level:", normalizedLevel.toFixed(4));

    if (normalizedLevel > VOICE_THRESHOLD) {
      if (silenceTimer) {
        clearTimeout(silenceTimer);
        setSilenceTimer(null);
      }
      if (!recording && !isSpeaking && !isProcessing) {
        console.log("🎤 Voice detected! Starting recording...");
        startVoiceChatRecording();
      }
    } else if (recording) {
      if (!silenceTimer) {
        console.log("🔇 Silence detected, starting timer...");
        const timer = setTimeout(() => {
          console.log("⏰ Silence timeout, stopping recording...");
          stopVoiceChatRecording();
        }, SILENCE_DURATION);
        setSilenceTimer(timer);
      }
    }
  };
}, [isVoiceChatActive, recording, isSpeaking, silenceTimer, isProcessing]);


  const startVoiceChatRecording = async () => {
    if (isSpeaking || recording || isProcessing) return;

    if (!streamRef.current) {
  console.warn("⚠️ No audio stream available!");
  return;
}



    try {
      console.log("🎤 Starting voice chat recording...");
      recordingStartTime.current = Date.now();
      
      const options = { mimeType: "audio/webm;codecs=opus" };
      let mediaRecorderInstance;

      try {
        mediaRecorderInstance = new MediaRecorder(streamRef.current, options);
      } catch (e) {
        mediaRecorderInstance = new MediaRecorder(streamRef.current);
      }

      mediaRecorder.current = mediaRecorderInstance;
      audioChunks.current = [];

      mediaRecorder.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.current.push(event.data);
        }
      };

      mediaRecorder.current.onstop = () => {
        console.log("🎤 Voice chat recording stopped");
        processVoiceChatAudio();
      };

      mediaRecorder.current.start(100);
      setRecording(true);
      setIsListening(true);
      console.log("🎤 Voice chat recording started successfully");
    } catch (error) {
      console.error("Error starting voice chat recording:", error);
    }
  };

  const stopVoiceChatRecording = () => {
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      console.log("🛑 Stopping voice chat recording...");
      mediaRecorder.current.stop();
      setRecording(false);
      setIsListening(false);

      if (silenceTimer) {
        clearTimeout(silenceTimer);
        setSilenceTimer(null);
      }
    }
  };

  const processVoiceChatAudio = async () => {
    if (isProcessing) return;
    
    console.log("🔄 Processing voice chat audio...");
    setIsProcessing(true);
    
    const recordingDuration = (Date.now() - recordingStartTime.current) / 1000;

    if (recordingDuration < 1) {
      console.log("Recording too short, ignoring...");
      setIsProcessing(false);
      return;
    }

    const audioBlob = new Blob(audioChunks.current, {
      type: mediaRecorder.current?.mimeType || "audio/webm",
    });

    if (audioBlob.size < 1000) {
      console.log("Audio blob too small, ignoring...");
      setIsProcessing(false);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", audioBlob, "recording.webm");

      console.log("📡 Sending audio to Whisper API...");
      const response = await fetch("/api/whisper", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      console.log("📡 Whisper API response:", data);

      if (data.text && data.text.trim()) {
        console.log("✅ Got transcript:", data.text);
        
        const userMessage: ChatMessage = {
          id: Date.now(),
          text: data.text,
          sender: "user",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };
        setVoiceChatMessages(prev => [...prev, userMessage]);

        // Generate bot response
        const botResponse = generateBotResponse(data.text);
        console.log("🤖 Bot response:", botResponse);
        
        const botMessage: ChatMessage = {
          id: Date.now() + 1,
          text: botResponse,
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        };

        setVoiceChatMessages(prev => [...prev, botMessage]);
        
        // Speak the response
        setTimeout(() => {
          speak(botResponse);
        }, 500);
      } else {
        console.log("❌ No text in response or empty text");
      }
    } catch (error) {
      console.error("Voice chat processing error:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const generateBotResponse = (userText: string) => {
    const responses = [
      `I understand you said "${userText}". How can I help you with that?`,
      `Thanks for sharing that. Let me think about "${userText}" and provide you with some insights.`,
      `That's interesting about "${userText}". Here's what I can tell you...`,
      `I heard you mention "${userText}". Let me provide you with some relevant information.`,
      `You mentioned "${userText}". Let me help you explore that topic further.`,
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };

  const speak = (text: string) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    console.log("🔊 Starting to speak:", text);
    setIsSpeaking(true);
    
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesisRef.current = utterance;
    
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    
    utterance.onstart = () => {
      console.log("🗣️ Speech started");
      setIsSpeaking(true);
    };
    
    utterance.onend = () => {
      console.log("🔇 Speech ended");
      setIsSpeaking(false);
    };
    
    utterance.onerror = (error) => {
      console.error("❌ Speech error:", error);
      setIsSpeaking(false);
    };

    speechSynthesis.speak(utterance);
  };

  const handleVoiceChat = async () => {
    try {
      console.log("🎙️ Starting voice chat...");
      
      // Clean up any existing resources first
      cleanupAudioResources();
      
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
          sampleRate: 44100,
        }
      });
      
      streamRef.current = stream;
      
      // Setup audio visualization with the stream
      setupAudioVisualization(stream);
      
      setVoiceChatEnabled(true);
      setIsVoiceChatActive(true);
      setVoiceChatMessages([]);
      setHasStartChat(true);
      setIsProcessing(false);

      // Start VAD interval
      vadIntervalRef.current = setInterval(() => {
  detectVoiceActivityRef.current();
}, 100);

      
      console.log("✅ Voice chat started successfully");
      
    } catch (error) {
      console.error("❌ Error starting voice chat:", error);
      toast({
        title: "Voice Chat Error",
        description: "Could not access microphone. Please check permissions.",
        variant: "destructive",
      });
    }
  };

  const stopVoiceChat = () => {
    console.log("🛑 Stopping voice chat...");
    
    setVoiceChatEnabled(false);
    setIsVoiceChatActive(false);
    setIsListening(false);
    setIsSpeaking(false);
    setIsProcessing(false);

    // Stop any ongoing recording
    if (mediaRecorder.current && mediaRecorder.current.state !== "inactive") {
      mediaRecorder.current.stop();
      setRecording(false);
    }

    // Stop speech synthesis
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }

    // Clear timers
    if (silenceTimer) {
      clearTimeout(silenceTimer);
      setSilenceTimer(null);
    }

    cleanupAudioResources();

    // Merge voice chat messages into main messages
    if (voiceChatMessages.length > 0) {
      setMessages(prev => [...prev, ...voiceChatMessages]);
      setVoiceChatMessages([]);
    }
  };

  useEffect(() => {
    if (recording) {
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
        canvas.width = textarea.offsetWidth;
        canvas.height = textarea.offsetHeight;
      }
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
    };
  }, [recording]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      cleanupAudioResources();
      if (speechSynthesis.speaking) {
        speechSynthesis.cancel();
      }
    };
  }, []);

  const currentMessages = voiceChatEnabled ? voiceChatMessages : messages;

  return (
    <div className="flex flex-col gap-10 h-full items-center justify-center w-full m-auto">
      {hasStartChat && (
        <ChatBox
          messages={currentMessages}
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

        <div className="relative mx-auto lg:mx-0 w-full max-w-[95%] md:w-[600px] lg:w-[800px]">
          <textarea
            style={{ overflowX: "hidden", overflowY: "hidden" }}
            ref={textareaRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={1}
            className={`w-full outline-[#D7D7D7] rounded-[20px] resize-none px-5 py-5 md:px-7 md:py-6 pr-16 leading-normal text-[#212221] text-base border-[0.5px] border-[#D7D7D7] bg-[#F6F6F6] max-h-[200px] transition-opacity duration-200 ${
              (recording && !voiceChatEnabled) || voiceChatEnabled ? "opacity-60 cursor-not-allowed" : ""
            }`}
            placeholder={
              recording && !voiceChatEnabled ? "Recording..." : 
              voiceChatEnabled ? "Voice chat active..." : 
              "Ask anything..."
            }
            disabled={(recording && !voiceChatEnabled) || voiceChatEnabled}
          />

          {/* Waveform Canvas Overlay */}
          {(recording || voiceChatEnabled) && (
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
            <div className="absolute left-4 top-4 right-4 bottom-4 pointer-events-none flex items-center justify-center">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                <p className="text-lg font-medium text-center">
                  {isSpeaking ? "🔊 Speaking..." : 
                   isProcessing ? "🔄 Processing..." :
                   isListening ? "🎤 Listening..." : 
                   recording ? "🔴 Recording..." :
                   "🎙️ Voice chat active - Say something..."}
                </p>
                <div className="mt-2 text-sm text-gray-600 text-center">
                  {recording ? "Stop speaking to send" : 
                   isProcessing ? "Processing your message..." :
                   "Start speaking to record"}
                </div>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex gap-3 items-center absolute bottom-5 md:bottom-5 right-5 z-10">
            {!voiceChatEnabled && (
              <button
                className=" w-8 h-8 md:w-10 md:h-10 mt-3 md:mt-0 rounded-full p-2 flex items-center justify-center hover:bg-primary hover:text-white transition bg-white border border-gray-300 shadow-sm"
                onClick={recording ? stopRecording : startRecording}
                disabled={voiceChatEnabled}
              >
                {recording ? <X  /> : <MicIcon />}
              </button>
            )}
            
            {inputText && !recording && !voiceChatEnabled && (
              <Button
                onClick={handleSendMessage}
                className="bg-[#D7D7D7] w-7 h-7 md:w-10 md:h-10 mt-3 md:mt-0 rounded-full p-2 flex items-center justify-center bg-primary text-white hover:bg-white hover:text-black transition"
              >
                <MoveUp />
              </Button>
            )}
            
            {!inputText && !recording && (
              <Button
                onClick={voiceChatEnabled ? stopVoiceChat : handleVoiceChat}
                className="bg-[#D7D7D7] rounded-full w-7 h-7 md:w-10 md:h-10 mt-3 md:mt-0 p-2 flex items-center font-bold justify-center bg-primary text-white hover:bg-white hover:text-black transition"
              >
                {voiceChatEnabled ? <X /> : <AudioLines />}
              </Button>
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
                  onClick={() => handleSampleClick(text)}
                  className={`cursor-pointer px-[10px] py-[8px] border-[0.5px] border-[#D7D7D7] rounded-[32px] hover:bg-primary/90 hover:text-primary-foreground ${
                    (recording || voiceChatEnabled) ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {text}
                </p>
              ))}
            </div>
            <div className="mt-[16px] mx-auto lg:mx-0 text-sm md:text-base flex flex-col lg:flex-row text-[#212221] gap-[16px]">
              {[
                "Solana adoption rate in 2024",
                "How to increase Twitter engagement",
                "Online Community building strategies",
              ].map((text, index) => (
                <p
                  key={index}
                  onClick={() => handleSampleClick(text)}
                  className={`cursor-pointer px-[10px] py-[8px] border-[0.5px] border-[#D7D7D7] rounded-[32px] hover:bg-primary/90 hover:text-primary-foreground ${
                    (recording || voiceChatEnabled) ? "opacity-50 cursor-not-allowed" : ""
                  }`}
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