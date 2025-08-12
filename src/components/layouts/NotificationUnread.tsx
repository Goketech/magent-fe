const NotificationUnread = () => {
  const notifications = [
    {
      time: "10 minutes ago",
      title: "Your campaign is gaining traction!",
      message:
        "Engagement just spiked by 23% in the last hour. Let’s keep the momentum going",
      button: true,
    },
    {
      time: "2 days ago",
      title: "Your campaign is gaining traction!",
      message:
        "Engagement just spiked by 23% in the last hour. Let’s keep the momentum going",
      button: true,
    },
    {
      time: "July 28, 2025",
      title: "Almost at your weekly goal",
      message:
        "We found an audience 17% more likely to convert. Tap to explore and activate.",
      button: false,
    },
    {
      time: "July 28, 2025",
      title: "Almost at your weekly goal",
      message:
        "We found an audience 17% more likely to convert. Tap to explore and activate.",
      button: false,
    },
  ];

  return (
    <div className="space-y-6">
      {notifications.map((note, idx) => (
        <div key={idx} className="border-b border-gray-200 pb-4 md:flex  md:items-start gap-6">
          <div className=" w-[110px]">
            <p className="text-[.8rem] text-gray-500">{note.time}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-900">{note.title}</p>
            <p className="text-sm text-gray-600 mb-2">{note.message}</p>
            {note.button && (
              <button className="px-4 py-1 text-sm rounded-full bg-purple-700 text-white">
                View
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotificationUnread;
