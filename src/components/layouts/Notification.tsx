import { useState } from "react";
import NotificationHead from "./NotificationHead";
import NotificationNewest from "./NotificationNewest";
import NotificationUnread from "./NotificationUnread";

const Notification = () => {
  const [activeView, setActiveView] = useState<"unread" | "newest">("newest");

  return (
    <div className="mt-[-3rem] w-full max-w-[690px] mx-auto">
      {/* Header */}
      <div className="px-2 py-2 md:px-4 md:py-4 border-gray-100">
        <h1 className="text-[#212221] text-2xl font-semibold mb-4">
          Notification
        </h1>
        <NotificationHead
          activeView={activeView}
          setActiveView={setActiveView}
        />
      </div>

      <div className="px-6 py-6 min-h-[350px]">
        {activeView === "unread" && <NotificationUnread />}
        {activeView === "newest" && <NotificationNewest />}
      </div>
    </div>
  );
};

export default Notification;
