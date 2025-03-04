import React from "react";
import { X } from "lucide-react";

type PopUpProps = {
  closePopup: () => void;
  handleTryAgain: () => void;
}

function PopUp({ closePopup, handleTryAgain }: PopUpProps) {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-[999] h-screen max-h-[600px] top-1/2 transform -translate-y-1/2 overflow-auto">
      <div className="w-[522px] h-[510px] rounded-[12px] py-7 px-5 bg-white shadow relative">
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-[#6A6B6A] hover:text-[#330065]"
        >
          <X size={20} />
        </button>

        <div className="flex justify-center items-center w-[482px] h-[105px] bg-[#EBE6F0] py-3 rounded-[12px] mt-6">
          <span className="text-4xl">🤖👏</span>
        </div>

        <div className="mt-4">
          <h2 className="text-[28px] font-medium text-[#212221]">
            Congratulations on publishing your first content!
          </h2>
          <p className="text-[#4D4E4D] text-base mt-2">
            Keep exploring, keep creating, and most importantly keep sharing
            your unique perspective.
          </p>
          <p className="text-[#4D4E4D] text-base mt-2">
            This is just the start. We can’t wait to see what you publish next!
          </p>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={handleTryAgain} className="border border-[#330065] rounded-[32px] px-5 py-2 text-sm font-semibold text-[#330065] hover:bg-[#330065] hover:text-white transition">
            Create another content
          </button>
          <button onClick={closePopup} className="bg-[#330065] px-5 py-2 text-sm rounded-[32px] font-semibold text-white hover:bg-[#220044] transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default PopUp;
