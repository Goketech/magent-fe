import ChatResponse from "@/components/layouts/ChatResponse";

export default function ChatPage() {
  // Your LLM response data
  const responseData = {
    // ... your data
  };

  return <ChatResponse response={responseData} />;
}
