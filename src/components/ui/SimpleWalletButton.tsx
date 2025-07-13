"use client";

import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { Button } from "@/components/ui/button";
import { useCallback } from "react";

export function SimpleWalletButton(props: any) {
  const { publicKey, connected, connecting, disconnect } = useWallet();

  const handleWalletConnect = () => {
    const button = document.querySelector(
      ".wallet-adapter-button"
    ) as HTMLButtonElement;
    if (button) button.click();
  };

  const handleClick = useCallback(() => {
    if (!connected) {
      handleWalletConnect();
    } else {
      disconnect();
    }
  }, [connected, disconnect]);

  const getButtonText = useCallback(() => {
    if (connecting) return "Connecting...";
    if (connected && publicKey) {
      const addr = publicKey.toString();
      return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
    }
    return "Connect Wallet";
  }, [connecting, connected, publicKey]);

  return (
    <>
      <Button
        onClick={handleClick}
        disabled={connecting}
        className="bg-[#330065] hover:bg-[#5C3384] text-white hover:text-white py-2 px-4 rounded-full"
        {...props}
      >
        {getButtonText()}
      </Button>
      <WalletMultiButton style={{ display: "none" }} />
    </>
  );
}
