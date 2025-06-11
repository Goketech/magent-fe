interface ConfirmLogoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    onLogout: () => void;
}

const ConfirmLogoutModal: React.FC<ConfirmLogoutModalProps> = ({
    isOpen,
    onClose,
    onLogout,
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop:blur-sm bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
                <h2 className="text-lg font-semibold mb-4 text-[#330065] flex justify-center">Confirm Logout</h2>
                <p className="text-sm text-gray-700 mb-6">
                    Are you sure you want to log out? You will need to log in again to access your account.
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-200 rounded-xl hover:bg-gray-300"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onLogout}
                        className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700"
                    >
                        Logout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmLogoutModal;