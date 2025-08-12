import { MdNotifications } from "react-icons/md"

const NotificationNewest = () => {
    return (
        <div className="flex flex-col items-center justify-center py-16 h-[500px] px-4 bg-[#F9F9F9]">
            <div className="flex items-center justify-center w-16 h-16 bg-[#EBE6F0] rounded-full mb-4">
                <MdNotifications className="w-8 h-8 text-[#330065]" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
                No unread notification yet
            </h3>
            
        </div>
    )
}

export default NotificationNewest