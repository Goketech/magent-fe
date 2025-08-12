import { Bell } from "lucide-react"

const NotificationNewest = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 px-4">
            <div className="flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                No unread notification yet
            </h3>
            <p className="text-gray-500 text-center max-w-sm">
                You're all caught up! New notifications will appear here when they arrive.
            </p>
        </div>
    )
}

export default NotificationNewest