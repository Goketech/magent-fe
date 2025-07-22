import { useEffect, useRef, useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";

interface InfoTooltipProps {
  text: string;
}

const InfoTooltip = ({ text }: InfoTooltipProps) => {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <span className="relative inline-block" ref={ref}>
      <AiOutlineInfoCircle
        className="text-green-600 cursor-pointer hover:text-grren-900"
        size={16}
        onClick={() => setOpen(!open)}
      />
      {open && (
        <div className="absolute z-10 mt-2 left-0 w-max max-w-xs bg-purple-50 text-purple-800 text-xs p-2 border border-purple-200 rounded shadow-md">
          {text}
        </div>
      )}
    </span>
  );
};

export default InfoTooltip;
