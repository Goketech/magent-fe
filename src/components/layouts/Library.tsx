import React, { useState, useEffect } from "react";
import SchedulePost from "./SchedulePost";
import PublishPost from "./PublishPost";
import { useAuth } from "@/context/AuthProvider";
import { apiClient } from "@/utils/apiClient";

const content = [
  {
    id: 1,
    socialMedia: "Twitter",
    post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat",
    date: "2023-10-01",
    time: "10:00 AM",
  },
  {
    id: 2,
    socialMedia: "Instagram",
    post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. ",
    date: "2023-10-01",
    time: "10:00 AM",
  },
  {
    id: 3,
    socialMedia: "Facebook",
    post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2023-10-01",
    time: "10:00 AM",
  },
  {
    id: 4,
    socialMedia: "LinkedIn",
    post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2023-10-01",
    time: "10:00 AM",
  },
  {
    id: 5,
    socialMedia: "Twitter",
    post: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    date: "2023-10-01",
    time: "10:00 AM",
  }
]

function Library() {
  const [activeTab, setActiveTab] = useState("schedule");
  const { jwt } = useAuth();

  const renderActiveTabContent = () => {
    switch (activeTab) {
      case "schedule":
        return <SchedulePost content={content} />;
      case "published":
        return <PublishPost />;
      default:
        return <SchedulePost content={content} />;
  }
}

  useEffect(() => {
    const fetchPublishedPost = async () => {
      try {
        const response = await apiClient(
          "/twitter/content-history",
          {
            method: "GET",
            token: jwt || undefined,
          }
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
        } else {
          console.error("Failed to fetch published posts");
        }
      } catch (error) {
        console.error("Error fetching published posts:", error);
      }
    }

    fetchPublishedPost();
  }, [])
  return (
    <div className="flex flex-col justify-start w-full">
      <div className="flex space-y-6 flex-col">
        <h1 className="text-[24px] text-[#212221] font-medium">Library</h1>
        <div className="flex bg-white rounded-[32px] border border-[#D7D7D7] w-full md:w-[300px] whitespace-nowrap">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === "schedule"
                ? "bg-[#EBE6F0] rounded-tl-[32px] w-full rounded-bl-[32px] px-2 py-3 text-sm text-[#330065] font-medium"
                : "px-2 py-3"
            }`}
            onClick={() => setActiveTab("schedule")}
          >
            Scheduled Post
          </button>

          <button
            className={`px-4 py-2 rounded ${
              activeTab === "published"
                ? "bg-[#EBE6F0] rounded-tr-[32px] rounded-br-[32px] w-full px-2 py-3 text-sm text-[#330065] font-medium"
                : "px-2 py-3"
            }`}
            onClick={() => setActiveTab("published")}
          >
            Published Post
          </button>
        </div>
        <div className="relative">
        <input
          type="text"
          placeholder="Search post"
          className="p-2 pl-8 border-[0.5px] border-[#D7D7D7] rounded-[6px] w-full md:w-[373px] text:placeholder-[#6A6B6A] text-[#212221]"
        />
        <svg
          className="absolute left-2 top-3 w-4 h-4 text-[#6A6B6A]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        </div>
      </div>
      <div className="mt-10">
        {renderActiveTabContent()}
      </div>
    </div>
  );
}

export default Library;
