"use client";

import React from "react";
import { BaseWalletMultiButton } from "@solana/wallet-adapter-react-ui";

// Override labels
const CUSTOM_LABELS = {
  "change-wallet": "Change Wallet",
  connecting: "Connecting...",
  "copy-address": "Copy Address",
  copied: "Copied!",
  disconnect: "Disconnect",
  "has-wallet": "Connect", // If the wallet is connected
  "no-wallet": "Connect Wallet", // Change this from "Select Wallet"
} as const;

export function CustomWalletButton(props: any) {
  return <BaseWalletMultiButton {...props} labels={CUSTOM_LABELS} />;
}
