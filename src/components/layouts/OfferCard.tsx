interface OfferCardProps {
  label: string;
  title: string;
  text: string;
  color: string;
}

export function OfferCard({ label, title, text, color }: OfferCardProps) {
  return (
    <div className="bg-[#242424] px-[20px] py-[28px] border border-[#2E2E2E] text-white">
      <span className={`font-[500] text-black text-[13px] leading-[19.5px] rounded-[32px] px-[12px] py-[2px] ${color}`}>{label}</span>
      <h3 className="mt-[28px] mb-[12px] font-[600] text-[24px] leading-[36px]">{title}</h3>
      <p className="text-[14px] font-[400] leading-[21px]">{text}</p>
    </div>
  );
}

export default OfferCard;
