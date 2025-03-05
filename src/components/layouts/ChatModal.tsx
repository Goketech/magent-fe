import React from "react";
import { X, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Message } from "../../app/(dashboard)/try/page";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  messages: Message[];
  isLoading: boolean;
}

const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  messages,
  isLoading,
}) => {
  const formatMessage = (text: string) => {
    // Split text into paragraphs or items based on newline or numbered list
    const items = text.split(/\d\.\s/).filter((item) => item.trim() !== "");
    return items.map((item, index) => (
      <p key={index} className="mb-4 leading-relaxed text-sm text-gray-300">
        {index > 0 ? `${index}. ${item.trim()}` : item.trim()}
      </p>
    ));
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 300 }}
          className="fixed inset-0 bg-black/95 backdrop-blur-sm z-50"
        >
          <div className="h-full w-full flex flex-col p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-white">
                Chat with Agent
              </h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-800 rounded-full transition-colors"
              >
                <X className="text-white h-6 w-6" />
              </button>
            </div>

            {/* Chat Container */}
            <div className="flex-1 overflow-y-auto mb-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`max-w-[80%] ${
                      message.user === "user"
                        ? "ml-auto bg-primary/10"
                        : "bg-[#1D1C1A]"
                    } rounded-lg p-4`}
                  >
                    <p className="text-white">{formatMessage(message.text)}</p>
                  </motion.div>
                ))}
              </div>

              {/* Loading indicator */}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center space-x-2 text-white mt-4"
                >
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Agent is thinking...</span>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatModal;
