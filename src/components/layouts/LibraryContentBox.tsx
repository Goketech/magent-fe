import { Calendar, Clock } from 'lucide-react';
import React from 'react';

function LibraryContentBox({ socialMedia, post, date, time }: { socialMedia: string; post: string; date: string; time: string }) {
  return (
    <div className="flex flex-col bg-[#F6F6F6] rounded-[6px] p-4 mb-4 h-full">
      <div className='bg-white px-3 py-1 rounded-[6px] flex gap-3 w-[111px] mb-4'><h2 className="text-sm text-[#4D4E4D]">{socialMedia}</h2></div>
      <p className="text-sm text-[#6A6B6A] flex-grow">{post}</p>
      <div className="flex justify-between mt-10">
        <span className="text-sm text-[#4D4E4D] flex gap-2 items-center"><Calendar width={15} height={15} color='#999999'/> {date}</span>
        <span className="text-sm text-[#4D4E4D] flex gap-2 items-center"><Clock width={15} height={15} color='#999999'/>{time}</span>
      </div>
    </div>
  );
}

export default LibraryContentBox;
