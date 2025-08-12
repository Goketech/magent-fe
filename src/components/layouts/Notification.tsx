import { useState } from "react"
import NotificationHead from "./NotificationHead"
import NotificationNewest from "./NotificationNewest"
import NotificationUnread from "./NotificationUnread"

const Notification = () => {
    const [activeView, setActiveView] = useState<"unread" | "newest">("newest")
    
    return (
        <div className="mt-[-2.5rem] w-[640px] mx-auto">
            {/* Header */}
            <div className="px-6 py-6 border-b border-gray-100">
                <h1 className="text-[#212221] text-2xl font-semibold mb-4">
                    Notification
                </h1>
                <NotificationHead activeView={activeView} setActiveView={setActiveView}/>
            </div>
            
            {/* Content Area */}
            <div className="px-6 py-6">
                {activeView === "unread" && <NotificationUnread/>}
                {activeView === "newest" && <NotificationNewest/>}
            </div>
        </div>
    )
}

export default Notification