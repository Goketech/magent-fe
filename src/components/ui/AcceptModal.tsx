"use client";

import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useWallet } from "@solana/wallet-adapter-react";
import Modal from "./Modal";
import { Campaign } from "../layouts/CampaignList";
import { acceptSchema } from "../../lib/validation";
import { MyCampaign } from "@/lib/types";
import { apiClient } from "@/utils/apiClient";
import { useToast } from "@/hooks/use-toast";

interface AcceptModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign | MyCampaign;
  onJoinSuccess?: (campaignId: string, joinResponse: any) => void;
}

const AcceptModal: React.FC<AcceptModalProps> = ({
  isOpen,
  onClose,
  campaign,
  onJoinSuccess, // NEW PROP
}) => {
  
  const { publicKey } = useWallet();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const email = localStorage.getItem("email") || "";

  const formik = useFormik({
    initialValues: {
      xAccount: "",
      walletAddress: "",
      youtube: "",
      instagram: "",
      telegram: "",
      discord: "",
    },
    validationSchema: acceptSchema,
    onSubmit: async (values) => {
      setIsSubmitting(true);
      
      try {
        // Make API call to join campaign
        const joinResponse = await apiClient(`/campaign/join-campaign/${campaign._id}`, {
          method: "POST",
          body: {
            xAccount: values.xAccount,
            wallet: values.walletAddress,
            youtube: values.youtube || "",
            instagram: values.instagram || "",
            telegram: values.telegram || "",
            discord: values.discord || "",
            email: email,
          },
        });

        console.log("Join Response: ", joinResponse);

        // Show success toast
        toast({
          variant: "success",
          description: `Successfully joined ${joinResponse.campaignName}!`,
        });

        // Call the success callback to update parent state
        if (onJoinSuccess) {
          onJoinSuccess(campaign._id, joinResponse);
}
        
        // Close modal
        onClose();
        
      } catch (error) {
        toast({
          variant: "destructive",
          description: error instanceof Error ? error.message : "Failed to join campaign. Please try again.",
        });
      } finally {
        setIsSubmitting(false);
      }
    },
  });

  // Prefill wallet address from connected wallet or localStorage
  useEffect(() => {
    const localStored = localStorage.getItem("wallet_connected_address");
    if (publicKey) {
      formik.setFieldValue("walletAddress", publicKey.toString());
    } else if (localStored) {
      formik.setFieldValue("walletAddress", localStored);
    }
  }, [publicKey]);

  if (!isOpen) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      header="Get Ready to Promote"
      width="30rem"
    >
      <p className="text-sm text-gray-700 mb-6">
        Before you start earning, let's quickly set up your profile so we can
        track your results and pay you seamlessly.
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-4 text-sm">
        {/* X Account */}
        <div>
          <label htmlFor="xAccount" className="block">
            X Account <span className="text-red-500">*</span>
          </label>
          <input
            id="xAccount"
            name="xAccount"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.xAccount}
            placeholder="https://x.com/yourhandle"
            className="w-full border border-gray-300 px-3 py-2 rounded"
            disabled={isSubmitting}
          />
          {formik.touched.xAccount && formik.errors.xAccount && (
            <p className="text-red-500">{formik.errors.xAccount}</p>
          )}
        </div>

        {/* Wallet Address */}
        <div>
          <label htmlFor="walletAddress" className="block">
            Wallet Address <span className="text-red-500">*</span>
          </label>
          <input
            id="walletAddress"
            name="walletAddress"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            readOnly={!!formik.values.walletAddress}
            value={formik.values.walletAddress}
            placeholder="Enter your wallet address"
            className={`w-full border px-3 py-2 rounded ${
              formik.values.walletAddress
                ? "bg-gray-100 text-gray-700 cursor-not-allowed"
                : "border-gray-300"
            }`}
            disabled={isSubmitting}
          />
          {formik.touched.walletAddress && formik.errors.walletAddress && (
            <p className="text-red-500">{formik.errors.walletAddress}</p>
          )}
        </div>

        {/* Optional Socials */}
        {["youtube", "instagram", "telegram", "discord"].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block capitalize">
              {field}
            </label>
            <input
              id={field}
              name={field}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={(formik.values as any)[field]}
              placeholder={`https://${field}.com/yourhandle`}
              className="w-full border border-gray-300 px-3 py-2 rounded"
              disabled={isSubmitting}
            />
          </div>
        ))}

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded text-sm"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#330065] text-white rounded text-sm hover:bg-purple-800 disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Joining..." : "Confirm & Connect"}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AcceptModal;