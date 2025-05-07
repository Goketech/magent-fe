'use client';

import { FC, ReactNode, useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  header?: ReactNode | string;
  className?: string;
  hasDarkHeader?: boolean;
  width?: string;
}

const Modal: FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = '',
  header,
  hasDarkHeader = false,
  width = '40rem',
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('overflow-hidden');
    } else {
      document.body.classList.remove('overflow-hidden');
    }

    return () => {
      document.body.classList.remove('overflow-hidden');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <span
      className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4 py-6`}
      onClick={onClose}
    >
      <span
        className={`bg-white  shadow-lg w-full overflow-hidden`}
        style={{ maxWidth: width }}
        onClick={(e) => e.stopPropagation()}
      >
        <span
          className={`flex justify-between items-center px-6 py-4 ${
            hasDarkHeader ? 'bg-gradient-to-r from-[#330065] to-[#4e008c] text-white' : 'bg-white border-b'
          }`}
        >
          {typeof header === 'string' ? (
            <h2 className="text-lg font-semibold">{header}</h2>
          ) : (
            header
          )}
          <button
            onClick={onClose}
            className={`text-2xl font-bold hover:text-red-600 transition`}
            aria-label="Close modal"
          >
            &times;
          </button>
        </span>
        <div className={`p-6 ${className}`}>{children}</div>
      </span>
    </span>
  );
};

export default Modal;
