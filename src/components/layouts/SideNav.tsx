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
import React, {useState} from "react";
import Image from "next/image";
import ConfirmLogoutModal from "@/components/ui/ConfirmLogoutModal";
import { CustomWalletButton } from "../CustomWalletButton";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useStepContext } from "@/context/StepContext";
import { useRouter } from "next/navigation";

const SideNav = ({
  isSidebarOpen,
  toggleSidebar,
}: {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const { stepData, updateStepData } = useStepContext();
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };
  const [showConfirmLogout, setShowConfirmLogout] = useState(false);

  const navItems = [
    { id: "Research", label: "Research", icon: <MdManageSearch size={20} /> },
    { id: "Campaign", label: "Campaign", icon: <MdAdsClick size={20} /> },
    { id: "Content", label: "SMM", icon: <MdFlashOn size={20} /> },
    { id: "Library", label: "Library", icon: <MdBookmark size={20} /> },
  ];

  return (
    <>
      {/* Backdrop for mobile screens */}
      {/* {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={toggleSidebar}
        />
      )} */}

      <div
        className={`hidden md:flex fixed top-0 left-0 h-full w-[250px] px-[8px] py-[20px] bg-white shadow-lg z-20 overflow-y-auto flex-col transition-all duration-300 
        ${isSidebarOpen ? "left-0" : "left-[-100%]"} md:left-0 md:w-[201px]`}
      >
        <div className="flex items-center justify-between mb-[40px] ml-[16px]">
          <Image src="/magent.svg" alt="logo" width={19} height={20} />
        </div>

        <div className="flex flex-col h-[50%]">
          <div className="flex flex-col gap-4 flex-grow">
            {navItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
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

          {/* Settings & Logout */}
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
              onClick={() => setShowConfirmLogout(true)}
              className={`flex items-center gap-2 p-[8px] text-red-600 rounded-[4px] text-[14px] leading-[21px] cursor-pointer ${
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
        <ConfirmLogoutModal 
        isOpen ={showConfirmLogout}
        onClose={() => setShowConfirmLogout(false)}
        onLogout={logout}
        />

        {/* Wallet Button */}
        <div className="mt-auto">
          <CustomWalletButton />
        </div>
      </div>
    </>
  );
};

export default SideNav;
