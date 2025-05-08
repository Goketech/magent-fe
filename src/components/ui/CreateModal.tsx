import React from "react";
import Modal from "./Modal";
import { MyCampaign } from "@/lib/types";
import { CheckCircle2 } from "lucide-react";

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  campaign: MyCampaign;
  onConfirm: () => void;
}

const CreateModal: React.FC<CreateModalProps> = ({ isOpen, onClose, campaign, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} header="" width="30rem" rounded={true}>
      <div className="text-center px-6 py-4">
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-2 rounded-full">
            <CheckCircle2 className="text-green-600 w-8 h-8" />
          </div>
        </div>

        <h2 className="text-lg font-semibold mb-2">Confirm campaign launch</h2>
        <p className="text-sm text-gray-700 mb-4">
          You&apos;re about to lock <strong>${campaign.amount} USDC</strong> into Magent&apos;s liquidity vault to fund your campaign.
          This amount will be used to reward publishers based on verified results. <br />
          <br />
          Are you sure you want to proceed?
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-[#330065] text-[#330065] rounded-3xl text-sm hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 bg-[#330065] text-white rounded-3xl text-sm hover:bg-purple-800"
          >
            Confirm & Launch
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default CreateModal;
