import React from "react";
import LibraryContentBox from "./LibraryContentBox";

function SchedulePost({ content }: { content: any[] }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
        {content.map((item) => (
          <div key={item.id} className="flex flex-col h-full">
            <div className="flex-1 flex flex-col min-h-full">
              <LibraryContentBox
                socialMedia={item.socialMedia}
                post={item.post}
                date={item.date}
                time={item.time}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SchedulePost;
