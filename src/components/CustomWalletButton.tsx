"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useAuth } from "@/context/AuthProvider";
import { Button } from "@/components/ui/button";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";

export function CustomWalletButton(props: any) {
  const { publicKey, connected, connecting, disconnect } = useWallet();
  const { jwt, authenticate, isAuthenticating } = useAuth();
  const { setVisible } = useWalletModal();
  const [authPending, setAuthPending] = useState(false);

  // Handle authentication after wallet connection
  // useEffect(() => {
  //   if (connected && !jwt && !authPending && !isAuthenticating) {
  //     handleAuthenticate();
  //   }
  // }, [connected, jwt, isAuthenticating]);

  const handleAuthenticate = useCallback(async () => {
    if (connected && !jwt) {
      setAuthPending(true);
      try {
        await authenticate();
      } finally {
        setAuthPending(false);
      }
    }
  }, [connected, jwt, authenticate]);

  const handleWalletConnect = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // Trigger WalletMultiButton functionality
    const button = document.querySelector(
      ".wallet-adapter-button"
    ) as HTMLButtonElement;
    if (button) {
      button.click();
    }
  };

  const handleClick = useCallback(() => {
    if (!connected) {
      // Open wallet modal if not connected
      setVisible(true);
    } else if (!jwt) {
      // If connected but not authenticated, try authenticate
      handleAuthenticate();
    } else {
      // If already authenticated, disconnect wallet
      disconnect();
    }
  }, [connected, jwt, setVisible, handleAuthenticate, disconnect]);

  // Show appropriate button text based on state
  const getButtonText = useCallback(() => {
    if (connecting || isAuthenticating) return "Connecting...";
    if (connected && !jwt) return "Sign Message";
    if (connected && jwt) {
      const shortenedAddress = publicKey
        ? `${publicKey.toString().slice(0, 4)}...${publicKey
            .toString()
            .slice(-4)}`
        : "";
      return shortenedAddress;
    }
    return "Connect Wallet";
  }, [connecting, isAuthenticating, connected, jwt, publicKey]);

  return (
    <Button
      onClick={handleWalletConnect}
      // disabled={connecting || isAuthenticating}
      className="md:w-full bg-[#330065] hover:bg-[#5C3384] text-white hover:text-white font-medium py-[8px] px-[20px] rounded-[32px]"
      {...props}
    >
      {getButtonText()}
    </Button>
  );
}
