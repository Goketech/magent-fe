
interface NotificationHeadProps {
  activeView: "newest" | "unread";
  setActiveView: (view: "newest" | "unread") => void;
}

const NotificationHead: React.FC<NotificationHeadProps> = ({
  activeView,
  setActiveView,
}) => {
  const tabs = [
    { id: "newest", label: "Newest" },
    { id: "unread", label: "Unread" },
  ];

  return (
    <div className="border-b border-gray-200 relative w-full">
      <div className="flex space-x-6">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id as "newest" | "unread")}
            className={`pb-2 text-sm font-medium transition-colors ${
              activeView === tab.id ? "text-purple-600" : "text-gray-500"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Sliding purple border */}
      <div
        className="absolute bottom-0 h-[2px] bg-purple-600 transition-all duration-300"
        style={{
          width: "60px", // adjust to match text width
          transform: `translateX(${
            activeView === "newest" ? 0 : 72 // adjust based on spacing
          }px)`,
        }}
      />
    </div>
  );
};

export default NotificationHead;
