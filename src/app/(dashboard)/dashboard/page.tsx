// "use client";
// import { ReactTyped } from "react-typed";
// import { MoveRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import { useToast } from "@/hooks/use-toast";
// import ChatModal from "@/components/layouts/ChatModal";

// const Page = () => {
//   const { toast } = useToast();
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputText, setInputText] = useState("");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleSubmit = async () => {
//     if (!inputText.trim()) return;

//     const token = localStorage.getItem("access_token");
//     if (!token) {
//       toast({
//         variant: "destructive",
//         description: "Please sign in.",
//       });
//       return;
//     }

//     setIsModalOpen(true);

//     // Add user message
//     const userMessage: Message = {
//       user: "user",
//       text: inputText,
//       action: "NONE",
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setIsLoading(true);
//     setInputText("");

//     try {
//       /* eslint-disable  @typescript-eslint/no-explicit-any */
//       const response: any = await fetch(
//         "https://www.api.hellomagent.com/api/ai/query",
//         {
//           method: "POST",

//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify({ input: inputText }),
//         }
//       );

//       if (response.status === 401) {
//         toast({
//           variant: "destructive",
//           description: "Please sign in.",
//         });
//         localStorage.removeItem("access_token");
//         return;
//       }

//       console.log(response);

//       const reader = response.body.getReader();
//       const decoder = new TextDecoder("utf-8");
//       let result = "";

//       while (true) {
//         const { done, value } = await reader.read();
//         if (done) break;

//         // Decode chunk and process it
//         const chunk = decoder.decode(value, { stream: true });
//         result += chunk;

//         try {
//           // Parse chunk as JSON
//           const parsedChunk = JSON.parse(chunk);

//           // Update UI with intermediate agent response
//           setMessages((prev) => [...prev, ...parsedChunk]);
//           /* eslint-disable  @typescript-eslint/no-unused-vars */
//         } catch (e) {
//           // Handle case where the chunk is not complete JSON
//           console.warn("Chunk not yet complete:", chunk);
//         }
//       }

//       // Final data processing if needed
//       console.log("Final response:", result);
//       // Add agent response
//     } catch (error) {
//       console.error("Error sending message:", error);
//       toast({
//         variant: "destructive",
//         description: "Failed to send message. Please try again.",
//       });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   /* eslint-disable  @typescript-eslint/no-explicit-any */
//   const handleKeyPress = (e: any) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSubmit();
//     }
//   };

//   const handleSampleClick = (text: string) => {
//     setInputText(text);
//   };

//   const handleCloseModal = () => {
//     setIsModalOpen(false);
//     setMessages([]);
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen">
//       <div>
//         <p className="text-center mb-[24px] text-[24px] font-[500] leading-[36px] text-white">
//           Need help with{" "}
//           <span className="text-primary">
//             <ReactTyped
//               strings={[
//                 '<span class="text-[#FFC8DD]">reports?</span>',
//                 '<span class="text-[#CDB4DB]">insights?</span>',
//                 '<span class="text-[#BDE0FE]">analysis?</span>',
//                 '<span class="text-[#F2E8CF]">strategy?</span>',
//               ]}
//               typeSpeed={50}
//               backSpeed={30}
//               backDelay={1000}
//               loop
//             />
//           </span>
//         </p>

//         <div className="relative mx-auto lg:mx-0  md:w-[600px] lg:w-[800px]">
//           <textarea
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             onKeyPress={handleKeyPress}
//             cols={70}
//             rows={6}
//             className="w-full outline-[#D7D7D7] rounded-[6px] resize-none p-2 md:p-5 text-white border-[0.5px] border-[#D7D7D7] bg-[#1D1C1A]"
//             placeholder="Ask us..."
//           ></textarea>
//           <Button
//             onClick={handleSubmit}
//             className="w-25 h-25 absolute bottom-5 right-5 bg-[#D7D7D7] rounded-full p-2 flex items-center justify-center"
//           >
//             <MoveRight className="text-white" size={15} />
//           </Button>
//         </div>
//         <p className="mx-auto lg:mx-0 mt-[24px] mb-[16px] text-white">
//           Try searching for
//         </p>
//         <div className="mx-auto lg:mx-0 flex flex-col lg:flex-row text-white gap-[8px] md:gap-[16px]">
//           {[
//             "Number of Facebook users in 2024",
//             "How to increase Instagram followers",
//             "Top 10 marketing strategies",
//           ].map((text, index) => (
//             <p
//               key={index}
//               onClick={() => handleSampleClick(text)}
//               className="cursor-pointer px-[10px] py-[8px] border-[0.5px] border-[#D7D7D7] rounded-[32px] hover:bg-primary/90 hover:text-primary-foreground"
//             >
//               {text}
//             </p>
//           ))}
//         </div>
//         <div className="mt-[16px] mx-auto lg:mx-0 flex flex-col lg:flex-row text-white gap-[16px]">
//           {[
//             "Solana adoption rate in 2024",
//             "How to increase Twitter engagement",
//             "Online Community building strategies",
//           ].map((text, index) => (
//             <p
//               key={index}
//               onClick={() => handleSampleClick(text)}
//               className="cursor-pointer px-[10px] py-[8px] border-[0.5px] border-[#D7D7D7] rounded-[32px] hover:bg-primary/90 hover:text-primary-foreground"
//             >
//               {text}
//             </p>
//           ))}
//         </div>
//         <ChatModal
//           isOpen={isModalOpen}
//           onClose={handleCloseModal}
//           messages={messages}
//           isLoading={isLoading}
//         />
//       </div>
//     </div>
//   );
// };

// export default Page;

"use client";
import React, { useState } from "react";
import SideBar from "@/components/layouts/SideBar";
import DashboardContent from "@/components/layouts/DashboardContent";
import { SidebarItem } from "@/components/layouts/SidebarItem";
import Content from "@/components/layouts/Content";

// interface TwitterProfile {
//   profile_image_url: string;
//   name: string;
//   username: string;
// }

const Page: React.FC = () => {
  const [active, setActive] = useState<string>("content");

  const sidebarItems: SidebarItem[] = [
    {
      id: "research",
      label: "Research",
      icon: "/research.svg",
      component: Content,
    },
    { id: "ads", label: "Ads", icon: "/ads.svg", component: Content },
    {
      id: "content",
      label: "Content",
      icon: "/flashon.svg",
      component: Content,
    },
    {
      id: "library",
      label: "Library",
      icon: "/bookmarks.svg",
      component: Content,
    },
    {
      id: "settings",
      label: "Settings",
      icon: "/setting.svg",
      component: Content,
    },
    { id: "logout", label: "Logout", icon: "/logout.svg", component: Content },
  ];

  return (
    <div className="flex justify-center min-h-screen bg-[#F2F2F2] w-full relative">
      <SideBar
        sidebarItems={sidebarItems}
        active={active}
        setActive={setActive}
      />
      <div className="w-full m-3">
        <DashboardContent sidebarItems={sidebarItems} active={active} />
      </div>
    </div>
  );
};

export default Page;
