"use client";
import { Bookmark, Heart, MessageSquare, Repeat2, Edit2 } from "lucide-react";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import { useStepContext } from "@/context/StepContext";
import { Loading } from "../ui/loading";

type PreviewProps = {
  isStepCompleted: (step: number) => boolean;
  loading: boolean;
  // buttonClicked: boolean;
  handlePublish: () => void;
  handleRegenerate: () => void;
  isPublishing: boolean;
};

const splitParagraph = (text: string, linesPerChunk: number = 5) => {
  console.log("text", text);
  const sentences = text.split(".");
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

  if (tempChunk) chunks.push(tempChunk.trim());

  console.log("chunks", chunks);

  return chunks;
};

const Preview: React.FC<PreviewProps> = ({
  isStepCompleted,
  loading,
  // buttonClicked,
  handlePublish,
  handleRegenerate,
  isPublishing,
}) => {
  const { stepData } = useStepContext();
  const paragraphs = splitParagraph(stepData.samplePost || "");
  const [editedText, setEditedText] = useState<string>("");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(e.target.value);

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // Reset height
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set to scroll height
    }
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [editedText]);

  return (
    <div className=" w-full md:w-[501px] h-full p-5 bg-[#F9F9F9] mt-7 md:mt-0">
      <h1 className="text-[18px] text-[#212221] font-semibold">Preview</h1>
      <div className="my-6 w-full md:w-[435px] h-auto bg-white rounded-[6px] px-3 py-5 border flex gap-4 items-start">
        <div className="flex items-center justify-center w-full max-w-[50px]">
          {stepData.socialMediaAccount.profilePicture ? (
            <Image
              src={stepData.socialMediaAccount.profilePicture}
              alt="preview"
              width={50}
              height={50}
              className=" rounded-full"
            />
          ) : (
            <div className="w-[50px] h-[50px] rounded-full bg-[#F0F0F0]" />
          )}
        </div>
        <div className="flex flex-col justify-center w-full">
          <div className="flex flex-col gap-3 justify-center">
            {isStepCompleted(1) ? (
              <div>
                <span className="text-[#212221] text-base font-medium mr-2">
                  {stepData.socialMediaAccount.name}
                </span>
                <span className="text-[#6A6B6A] text-sm">
                  {" "}
                  {stepData.socialMediaAccount.userName &&
                    `@${stepData.socialMediaAccount.userName}`}
                </span>
              </div>
            ) : (
              <div className="w-[76px] h-[12px] rounded-[20px] bg-[#F0F0F0]" />
            )}

            {loading || paragraphs.length === 1 ? (
              <>
                <div className="w-[135px] md:w-[271px] h-[12px] rounded-[20px] bg-[#F0F0F0]" />
                <div className="w-[162px] md:w-[298px] h-[12px] rounded-[20px] bg-[#F0F0F0]" />
                <div className="w-[200px] md:w-[324px] h-[12px] rounded-[20px] bg-[#F0F0F0]" />
                <div className="w-[225px] md:w-[349px] h-[12px] rounded-[20px] bg-[#F0F0F0]" />
              </>
            ) : isStepCompleted(5) && paragraphs.length > 1 ? (
              <div className="relative group text-[#212221] text-sm flex flex-col gap-4 bg-white p-2 rounded-md">
                {editingIndex === 0 ? (
                  <div className="relative">
                    <textarea
                      ref={textareaRef}
                      value={editedText}
                      onChange={handleChange}
                      className="w-full text-sm text-[#212221] leading-[1.5] font-normal bg-white resize-none focus:outline-none border border-gray-300 rounded-md p-3"
                      style={{ whiteSpace: "pre-wrap", overflow: "hidden" }}
                    />
                    <div className="mt-2 flex gap-2 justify-end">
                      <button
                        onClick={() => {
                          stepData.samplePost = editedText;
                          setEditingIndex(null);
                        }}
                        className="rounded-[32px] w-full md:w-[120px] px-4 py-2 text-sm font-semibold bg-[#330065] hover:opacity-90 text-white transition"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingIndex(null)}
                        className="rounded-[32px] w-full md:w-[120px] px-4 py-2 text-sm font-semibold border border-[#330065] text-[#330065] hover:bg-[#330065] hover:text-white transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    className="relative group"
                    onMouseEnter={() => setHoveredIndex(0)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {paragraphs.map((para, index) => (
                      <p key={index} className="mb-3">
                        {para}
                      </p>
                    ))}
                    {hoveredIndex === 0 && (
                      <button
                        className="absolute inset-0 m-auto w-fit h-fit p-1 bg-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-[6px] shadow-md"
                        onClick={() => {
                          setEditingIndex(0);
                          setEditedText(stepData.samplePost || "");
                          setHoveredIndex(null);
                        }}
                      >
                        <span className="bg-[#F6F6F6] p-1 rounded-[6px] flex gap-2 justify-center items-center text-[#212221]">
                          <Edit2 size={16} className="text-[#212221]" />
                          Edit
                        </span>
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : null}
          </div>
          <div className="flex justify-between items-center mt-6">
            <MessageSquare className="text-[#A8A8A8]" />
            <Repeat2 className="text-[#A8A8A8]" />
            <Heart className="text-[#A8A8A8]" />
            <Bookmark className="text-[#A8A8A8]" />
          </div>
        </div>
      </div>
      <div
        className="flex flex-col-reverse md:flex-row gap-4 md:gap-0 justify-between items-center w-full"
        style={{ justifyContent: "space-around" }}
      >
        <button
          onClick={handleRegenerate}
          disabled={loading}
          className={`border-none bg-transparent text-sm font-semibold flex gap-2 items-center transition ${
            loading
              ? "text-[#D7D7D7] cursor-not-allowed"
              : "text-[#330065] hover:text-[#220044]"
          }`}
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <p className="text-[#330065]">Regenerating</p>
              <Loading height="20" width="20" color="#330065" />
            </div>
          ) : (
            <div className="flex gap-2 items-center">
              <Image src="/replay.png" alt="restart" width={20} height={20} />
              Regenerate
            </div>
          )}
        </button>

        <button
          onClick={handlePublish}
          disabled={loading}
          className={`rounded-[32px] w-full md:w-[120px] px-4 py-2 text-sm font-semibold ${
            loading
              ? "bg-[#D7D7D7] cursor-not-allowed"
              : "bg-[#330065] hover:opacity-90"
          } text-white transition`}
        >
          {isPublishing ? (
            <div className="flex items-center gap-2 ">
              <p>Publishing</p>
              <Loading height="20" width="20" color="#FFF" />
            </div>
          ) : (
            <p>Post</p>
          )}
        </button>
      </div>
    </div>
  );
};

export default Preview;
