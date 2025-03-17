"use client";
import {
  MdManageSearch,
  MdAdsClick,
  MdFlashOn,
  MdBookmark,
  MdSettings,
  MdLogout,
  MdMenu,
} from "react-icons/md";
import Image from "next/image";
import { useState } from "react";
import { Button } from "../ui/button";
import { CustomWalletButton } from "../CustomWalletButton";
import { useStepContext } from "@/context/StepContext";

const customLabels = {
  "change-wallet": "Change wallet",
  connecting: "Connecting ...",
  "copy-address": "Copy address",
  copied: "Copied",
  disconnect: "Disconnect",
  "has-wallet": "Connect",
  "no-wallet": "Connect Wallet", // Changed from 'Select Wallet' to 'Connect Wallet'
};

const SideNav = ({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const { stepData, updateStepData } = useStepContext();

  const navItems = [
    { id: "Research", label: "Research", icon: <MdManageSearch size={20} /> },
    { id: "Advert", label: "Advert", icon: <MdAdsClick size={20} /> },
    { id: "Content", label: "Content", icon: <MdFlashOn size={20} /> },
    { id: "Library", label: "Library", icon: <MdBookmark size={20} /> },
  ];

  return (
    <div
      className={`fixed top-0 left-0 h-full w-[201px] px-[8px] py-[20px] bg-white shadow-lg z-10 overflow-y-auto flex flex-col transition-transform duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 md:w-[201px]`}
    >
      <div className="flex items-center justify-between mb-[40px] ml-[16px]">
        <Image src="/magent.svg" alt="logo" width={19} height={20} />
      </div>

      <div className="flex flex-col h-[50%]">
        <div className="flex flex-col gap-4 flex-grow">
          {navItems.map((item) => (
            <div
              key={item.id}
              onClick={() =>{ 
                updateStepData({ active: item.id });
                toggleSidebar();
              }}
              className={`flex items-center gap-2 p-[8px] rounded-[4px] text-[14px] leading-[21px] cursor-pointer ${
                stepData.active === item.id
                  ? "bg-[#F2F2F2] text-[#330065]"
                  : "hover:bg-[#F2F2F2] text-black"
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 border-t border-[#ECECEC] pt-[16px]">
          <div
            onClick={() => updateStepData({ active: "Settings" })}
            className={`flex items-center gap-2 p-[8px] rounded-[4px] text-[14px] leading-[21px] cursor-pointer ${
              stepData.active === "Settings"
                ? "bg-[#F2F2F2] text-[#330065]"
                : "hover:bg-[#F2F2F2] text-black"
            }`}
          >
            <MdSettings size={20} />
            <span>Settings</span>
          </div>
          <div
            onClick={() => updateStepData({ active: "" })}
            className={`flex items-center gap-2 p-[8px] rounded-[4px] text-[14px] leading-[21px] cursor-pointer ${
              stepData.active === "Logout"
                ? "bg-[#F2F2F2] text-[#D42620]"
                : "hover:bg-[#F2F2F2] text-black"
            }`}
          >
            <MdLogout size={20} />
            <span>Logout</span>
          </div>
        </div>
      </div>
      <div className="mt-auto">
        {/* <Button className="w-full" variant="main">
          Connect wallet
        </Button> */}
        <CustomWalletButton />
      </div>
    </div>
  );
};

export default SideNav;
