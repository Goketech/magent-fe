import { Bookmark, Heart, MessageSquare, Repeat2 } from "lucide-react";
import Image from "next/image";
import React from "react";

type PreviewProps = {
  isStepCompleted: (step: number) => boolean;
  loading: boolean;
  buttonClicked: boolean;
  handlePublish: () => void;
};

const text = `Marketing is the strategic process of creating value for customers and building strong relationships with them. It encompasses understanding consumer needs, developing tailored offerings, and effectively communicating your brand's unique value proposition. Marketing is the strategic process of creating value for customers and building strong relationships with them. It encompasses understanding consumer needs, developing tailored offerings, and effectively communicating your brand's unique value proposition. Marketing is the strategic process of creating value for customers and building strong relationships with them. It encompasses understanding consumer needs, developing tailored offerings, and effectively communicating your brand's unique value proposition.`;

const splitParagraph = (text: string, linesPerChunk: number = 5) => {
  const sentences = text.split(". "); // Split by full stop
  const chunks: string[] = [];
  let tempChunk = "";

  sentences.forEach((sentence) => {
    if (tempChunk.split(" ").length / 5 < linesPerChunk) {
      tempChunk += sentence + ". ";
    } else {
      chunks.push(tempChunk.trim());
      tempChunk = sentence + ". ";
    }
  });

  if (tempChunk) chunks.push(tempChunk.trim()); // Push remaining text

  return chunks;
};

const Preview: React.FC<PreviewProps> = ({
  isStepCompleted,
  loading,
  buttonClicked,
  handlePublish,
}) => {
  const paragraphs = splitParagraph(text);

  return (
    <div className="w-[501px] h-full p-5 bg-[#F9F9F9]">
      <h1 className="text-[18px] text-[#212221] font-semibold">Preview</h1>
      <div className="my-6 w-[435px] h-auto bg-white rounded-[6px] px-3 py-5 border flex gap-4 items-start">
        <div className="flex items-center justify-center w-full">
          {isStepCompleted(1) ? (
            <Image
              src="/profile.svg"
              alt="preview"
              width={50}
              height={50}
              className=" rounded-full"
            />
          ) : (
            <div className="w-[50px] h-[50px] rounded-full bg-[#F0F0F0]" />
          )}
        </div>
        <div className="flex flex-col justify-center">
          <div className="flex flex-col gap-3 justify-center">
            {isStepCompleted(1) ? (
              <div>
                <span className="text-[#212221] text-base font-medium mr-2">
                  naeche
                </span>
                <span className="text-[#6A6B6A] text-sm">@22naee</span>
              </div>
            ) : (
              <div className="w-[76px] h-[12px] rounded-[20px] bg-[#F0F0F0]" />
            )}

            {!buttonClicked || loading ? (
              <>
                <div className="w-[271px] h-[12px] rounded-[20px] bg-[#F0F0F0]" />
                <div className="w-[298px] h-[12px] rounded-[20px] bg-[#F0F0F0]" />
                <div className="w-[324px] h-[12px] rounded-[20px] bg-[#F0F0F0]" />
                <div className="w-[349px] h-[12px] rounded-[20px] bg-[#F0F0F0]" />
              </>
            ) : (
              isStepCompleted(5) && (
                <div className="text-[#212221] text-sm flex flex-col gap-4">
                  {paragraphs.map((para, index) => (
                    <p key={index}>{para}</p>
                  ))}
                </div>
              )
            )}
          </div>
          <div className="flex justify-between items-center mt-6">
            <MessageSquare className="text-[#A8A8A8]" />
            <Repeat2 className="text-[#A8A8A8]" />
            <Heart className="text-[#A8A8A8]" />
            <Bookmark className="text-[#A8A8A8]" />
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center w-full">
        <button
          disabled={!buttonClicked || loading}
          className={`border-none bg-transparent text-sm font-semibold flex gap-2 items-center transition ${
            !buttonClicked || loading
              ? "text-[#D7D7D7] cursor-not-allowed"
              : "text-[#330065] hover:text-[#220044]"
          }`}
        >
          <Image src="/replay.png" alt="restart" width={20} height={20} />
          Regenerate
        </button>

        <button
          onClick={handlePublish}
          disabled={!buttonClicked || loading}
          className={`rounded-[32px] px-4 py-2 text-sm font-semibold ${
            !buttonClicked || loading
              ? "bg-[#D7D7D7] cursor-not-allowed"
              : "bg-[#330065] hover:opacity-90"
          } text-white transition`}
        >
          Publish
        </button>
      </div>
    </div>
  );
};

export default Preview;
