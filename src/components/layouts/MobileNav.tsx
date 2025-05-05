"use client";
import {
  MdMenu,
  MdManageSearch,
  MdAdsClick,
  MdFlashOn,
  MdBookmark,
  MdSettings,
  MdLogout,
} from "react-icons/md";
import { useState } from "react";
import { CustomWalletButton } from "../CustomWalletButton";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useStepContext } from "@/context/StepContext";

const MobileNav = () => {
  const [showNavItems, setShowNavItems] = useState(false); // toggle state
  const { stepData, updateStepData } = useStepContext();

  const navItems = [
    { id: "Research", label: "Research", icon: <MdManageSearch size={20} /> },
    { id: "Advert", label: "Advert", icon: <MdAdsClick size={20} /> },
    { id: "Content", label: "Content", icon: <MdFlashOn size={20} /> },
    { id: "Library", label: "Library", icon: <MdBookmark size={20} /> },
  ];

  const activeItem = navItems.find((item) => item.id === stepData.active);

  const handleToggleNav = () => {
    setShowNavItems((prev) => !prev);
  };

  return (
    <>
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-white shadow-sm fixed top-0 z-30 w-full">
        <div className="flex items-center gap-2">
          <MdMenu size={24} onClick={handleToggleNav} className="cursor-pointer" />
          <span className="font-medium text-sm">{activeItem?.label || "Menu"}</span>
        </div>
        {/* <CustomWalletButton /> */}
        <WalletMultiButton style={{ display: "none" }} />
      </div>

      {showNavItems && (
        <div className="md:hidden fixed top-[60px] left-0 w-full bg-white shadow z-20 px-4 py-3 space-y-3">
          {navItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-center gap-2 text-center text-xl text-gray-700 hover:bg-gray-100 px-2 py-2 rounded cursor-pointer"
              onClick={() => {
                // Optional: update current step here
                updateStepData({ active: item.id });
                setShowNavItems(false); // close menu after click
              }}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default MobileNav;
