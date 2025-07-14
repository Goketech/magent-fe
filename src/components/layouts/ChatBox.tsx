import React, { useState, useEffect, useRef } from "react";
import {
  Send,
  Bot,
  User,
  Clock,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import Image from "next/image";

type Message = {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
  audioUrl?: string | null;
  duration?: number;
};

interface ChatBoxProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  audioUrl?: string | null;
  duration?: number;
}

function AudioPlayer({
  audioUrl,
  messageDuration,
}: {
  audioUrl: string;
  messageDuration?: number;
}) {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !audioUrl) return;

    const updateTime = () => {
      if (audio.currentTime && !isNaN(audio.currentTime)) {
        setCurrentTime(audio.currentTime);
      }
    };

    const updateDuration = () => {
      if (
        audio.duration &&
        !isNaN(audio.duration) &&
        isFinite(audio.duration)
      ) {
        setDuration(audio.duration);
        setIsLoaded(true);
        setError(null);
      } else if (messageDuration && messageDuration > 0) {
        // Fallback to message duration if audio duration not available
        setDuration(messageDuration);
        setIsLoaded(true);
        setError(null);
      }
    };

    const handleLoadedMetadata = () => {
      console.log("Audio metadata loaded:", audio.duration);
      updateDuration();
    };

    const handleCanPlay = () => {
      console.log("Audio can play:", audio.duration);
      updateDuration();
    };

    const handleError = (e: Event) => {
      console.error("Audio error:", e);
      setError("Failed to load audio");
      setIsLoaded(false);
    };

    const handleLoadStart = () => {
      console.log("Audio load started");
      setError(null);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", handleLoadedMetadata);
    audio.addEventListener("canplay", handleCanPlay);
    audio.addEventListener("error", handleError);
    audio.addEventListener("loadstart", handleLoadStart);
    audio.addEventListener("ended", handleEnded);

    // Reset states
    setCurrentTime(0);
    setDuration(0);
    setIsLoaded(false);
    setIsPlaying(false);

    // If we have a message duration, use it immediately
    if (messageDuration && messageDuration > 0) {
      setDuration(messageDuration);
      setIsLoaded(true);
    }

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
      audio.removeEventListener("canplay", handleCanPlay);
      audio.removeEventListener("error", handleError);
      audio.removeEventListener("loadstart", handleLoadStart);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioUrl, messageDuration]);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    const audio = audioRef.current;
    if (audio && isLoaded) {
      audio.currentTime = time;
      setCurrentTime(time);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    const audio = audioRef.current;
    if (audio) {
      audio.volume = newVolume;
      if (newVolume === 0) {
        audio.muted = true;
        setIsMuted(true);
      } else {
        audio.muted = false;
        setIsMuted(false);
      }
    }
  };

  const toggleMute = () => {
    const audio = audioRef.current;
    if (!audio) return;

    const newMuted = !isMuted;
    audio.muted = newMuted;
    setIsMuted(newMuted);
  };

  const formatTime = (time: number) => {
    if (!time || isNaN(time) || !isFinite(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  // Show error state
  if (error) {
    return (
      <div className="w-full max-w-md p-4 border rounded-[20px] shadow bg-red-50 border-red-200 mt-2">
        <div className="text-red-600 text-sm">{error}</div>
        <div className="text-xs text-gray-500 mt-1">URL: {audioUrl}</div>
      </div>
    );
  }

  return (
    <div
  className="w-full max-w-[340px] px-4 py-2 flex flex-wrap items-center gap-2 rounded-full relative bg-[#f2f3f5] text-black"
>
  <audio
    ref={audioRef}
    src={audioUrl}
    preload="metadata"
    crossOrigin="anonymous"
  />

  {/* Play/Pause Button */}
  <button
    onClick={togglePlay}
    disabled={!isLoaded}
    title={isLoaded ? "Play/Pause" : "Loading..."}
    className="text-black"
  >
    {isPlaying ? (
      <Pause size={16} className="fill-black" />
    ) : (
      <Play size={16} className="fill-black" />
    )}
  </button>

  {/* Time display */}
  <span className="text-xs sm:text-sm text-black whitespace-nowrap">
    {formatTime(currentTime)} / {formatTime(duration)}
  </span>

  {/* Progress bar */}
  <input
    type="range"
    min={0}
    max={duration || 0}
    step="0.1"
    value={currentTime}
    onChange={handleSeek}
    disabled={!isLoaded}
    className="flex-1 h-[4px] accent-black min-w-0"
  />

  {/* Volume control */}
  <div className="relative flex items-center group">
    <button
      onClick={toggleMute}
      className="text-black z-10"
      title="Mute / Unmute"
    >
      {isMuted || volume === 0 ? (
        <VolumeX size={16} className="fill-black" />
      ) : (
        <Volume2 size={16} className="fill-black" />
      )}
    </button>

    <input
      type="range"
      min={0}
      max={1}
      step="0.01"
      value={volume}
      onChange={handleVolumeChange}
      className="absolute -right-3 w-[50px] md:w-[60px] h-[4px] opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out bg-transparent accent-gray-500"
      title="Volume"
    />
  </div>
</div>
  );
}

function ChatBox({ messages, isTyping, messagesEndRef }: ChatBoxProps) {
  return (
    <div className="flex flex-1 flex-col gap-6 w-full p-6 md:p-8 overflow-y-auto scrollbar-hide">
      {messages.map((message) => (
        <div
          key={message.id}
          className={`flex w-full ${
            message.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`flex items-start gap-3 w-full md:max-w-[70%] ${
              message.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                message.sender === "user"
                  ? "bg-gradient-to-br from-blue-500 to-purple-600"
                  : "bg-gradient-to-br from-white to-gray-50"
              }`}
            >
              {message.sender === "user" ? (
                <User width={20} height={20} className="text-white" />
              ) : (
                <Image src="/magent.svg" alt="logo" width={19} height={20}  />
              )}
            </div>

            {/* Message Bubble */}
            <div className="flex flex-col gap-1">
              <div
                className={`px-5 py-3 rounded-2xl shadow-md transition-all duration-200 hover:shadow-lg ${
                  message.sender === "user"
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-tr-md"
                    : "bg-white border border-gray-200 text-gray-800 rounded-tl-md hover:border-gray-300"
                }`}
              >
                <p className="text-sm leading-relaxed">{message.text}</p>
                {message.audioUrl && (
                  <AudioPlayer
                    audioUrl={message.audioUrl}
                    messageDuration={message.duration}
                  />
                  // <audio src={message.audioUrl} controls />
                )}
              </div>

              {/* Timestamp */}
              <div
                className={`flex items-center gap-1 px-2 ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <Clock className="w-3 h-3 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {message.timestamp}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Typing Indicator */}
      {isTyping && (
        <div className="flex justify-start w-full">
          <div className="flex items-start gap-3 max-w-[85%]">
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg bg-gradient-to-br from-white to-gray-50">
              <Image src="/magent.svg" alt="logo" width={19} height={20} />
            </div>
            <div className="bg-white border border-gray-200 rounded-2xl rounded-tl-md px-5 py-4 shadow-md">
              <div className="flex items-center gap-1">
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 ml-2">
                  AI is thinking...
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div ref={messagesEndRef} />

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default ChatBox;
