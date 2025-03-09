import React from "react";
import Image from "next/image";
import { SidebarItem } from "./SidebarItem";

type SidebarProps = {
  sidebarItems: SidebarItem[];
  active: string;
  setActive: (id: string) => void;
};

const SideBar: React.FC<SidebarProps> = ({
  active,
  setActive,
  sidebarItems,
}) => {
  return (
    <div className="bg-white min-h-screen w-[201px] px-2 py-5 flex flex-col justify-between">
      <div className="flex flex-col gap-5">
        <div className="p-2">
          <Image src="/logo.svg" alt="logo" width={20} height={20} />
        </div>
        <div>
          <ul className="flex flex-col gap-3">
            {sidebarItems.map((item) => (
              <li
                key={item.id}
                onClick={() => setActive(item.id)}
                className={`flex gap-2 p-2 text-[#6A6B6A] items-center cursor-pointer rounded-[8px] transition-all ${
                  active === item.id
                    ? "bg-[#F2F2F2] text-[#330065]"
                    : "hover:bg-[#F2F2F2] hover:text-[#330065]"
                }`}
              >
                <span>
                  <Image src={item.icon} alt={item.id} width={20} height={20} />
                </span>
                <span className="text-sm">{item.label}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <button className="rounded-[32px] px-5 py-2 bg-[#330065] text-white text-sm font-semibold flex items-center justify-center hover:bg-[#220044] transition">
          Connect Wallet
        </button>
      </div>
    </div>
  );
};

export default SideBar;
