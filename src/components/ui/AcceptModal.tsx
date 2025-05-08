import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Modal from "./Modal";
import { Campaign } from "../layouts/CampaignList";
import { acceptSchema } from "../../lib/validation";
import { MyCampaign } from "@/lib/types";

interface AcceptModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: Campaign | MyCampaign;
}

const AcceptModal: React.FC<AcceptModalProps> = ({ isOpen, onClose, campaign }) => {
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
    onSubmit: (values) => {
      console.log("Accepted campaign with data:", values);
      // Add your confirm logic here
    },
  });

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} header="Get Ready to Promote" width="30rem">
      <p className="text-sm text-gray-700 mb-6">
        Before you start earning, let's quickly set up your profile so we can track your results and pay you seamlessly.
      </p>

      <form onSubmit={formik.handleSubmit} className="space-y-4 text-sm">
        {/* X Account */}
        <div>
          <label htmlFor="xAccount" className="block">X Account <span className="text-red-500">*</span></label>
          <input
            id="xAccount"
            name="xAccount"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.xAccount}
            placeholder="https://x.com/yourhandle"
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          {formik.touched.xAccount && formik.errors.xAccount && (
            <p className="text-red-500">{formik.errors.xAccount}</p>
          )}
        </div>

        {/* Wallet Address */}
        <div>
          <label htmlFor="walletAddress" className="block">Wallet Address <span className="text-red-500">*</span></label>
          <input
            id="walletAddress"
            name="walletAddress"
            type="text"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.walletAddress}
            placeholder="Enter your wallet address"
            className="w-full border border-gray-300 px-3 py-2 rounded"
          />
          {formik.touched.walletAddress && formik.errors.walletAddress && (
            <p className="text-red-500">{formik.errors.walletAddress}</p>
          )}
        </div>

        {/* Optional Socials */}
        {["youtube", "instagram", "telegram", "discord"].map((field) => (
          <div key={field}>
            <label htmlFor={field} className="block capitalize">{field}</label>
            <input
              id={field}
              name={field}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={(formik.values as any)[field]}
              placeholder={`https://${field}.com/yourhandle`}
              className="w-full border border-gray-300 px-3 py-2 rounded"
            />
          </div>
        ))}

        <div className="flex justify-end gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 rounded text-sm"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#330065] text-white rounded text-sm hover:bg-purple-800"
          >
            Confirm & Connect
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AcceptModal;
