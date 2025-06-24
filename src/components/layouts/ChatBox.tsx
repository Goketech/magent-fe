import React from "react";
import { Send, Bot, User, Clock } from "lucide-react";

type Message = {
  id: number;
  sender: string;
  text: string;
  timestamp: string;
  audioUrl?: string | null;
};

interface ChatBoxProps {
  messages: Message[];
  isTyping: boolean;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  audioUrl?: string | null;
}

function ChatBox({
  messages,
  isTyping,
  messagesEndRef,
  audioUrl,
}: ChatBoxProps) {
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
            className={`flex items-start gap-3 max-w-[85%] ${
              message.sender === "user" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            {/* Avatar */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg ${
                message.sender === "user"
                  ? "bg-gradient-to-br from-blue-500 to-purple-600"
                  : "bg-gradient-to-br from-emerald-500 to-teal-600"
              }`}
            >
              {message.sender === "user" ? (
                <User className="w-5 h-5 text-white" />
              ) : (
                <Bot className="w-5 h-5 text-white" />
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
                {message.audioUrl && <audio src={message.audioUrl} controls />}
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
            <div className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg bg-gradient-to-br from-emerald-500 to-teal-600">
              <Bot className="w-5 h-5 text-white" />
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
