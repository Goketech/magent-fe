// components/GoogleAuthButton.tsx
import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useGoogleAuth } from '@/hooks/useGoogleAuth';

interface GoogleAuthButtonProps {
  isSignup?: boolean;
  signupData?: {
    role: string;
    companyName?: string;
    industry?: string;
    expertise?: string;
  };
  disabled?: boolean;
  className?: string;
}

declare global {
  interface Window {
    google?: any;
  }
}

const GoogleAuthButton: React.FC<GoogleAuthButtonProps> = ({
  isSignup = false,
  signupData,
  disabled = false,
  className = '',
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoaded, setIsGoogleLoaded] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);
  const { handleGoogleAuth, initializeGoogleAuth } = useGoogleAuth();

  useEffect(() => {
    const loadGoogleScript = () => {
      if (window.google) {
        setIsGoogleLoaded(true);
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setIsGoogleLoaded(true);
      };
      document.head.appendChild(script);
    };

    loadGoogleScript();
  }, []);

  useEffect(() => {
    if (isGoogleLoaded && buttonRef.current) {
      initializeGoogleAuth();
      
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: async (response: any) => {
          setIsLoading(true);
          try {
            await handleGoogleAuth(response, isSignup, signupData);
          } catch (error) {
            console.error('Google auth error:', error);
          } finally {
            setIsLoading(false);
          }
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      // Render the Google button
      window.google.accounts.id.renderButton(buttonRef.current, {
        theme: 'outline',
        size: 'large',
        width: '100%',
        text: isSignup ? 'signup_with' : 'signin_with',
        logo_alignment: 'center',
      });
    }
  }, [isGoogleLoaded, handleGoogleAuth, isSignup, signupData]);

  // Fallback custom button
  const handleCustomButtonClick = () => {
    if (window.google && window.google.accounts) {
      window.google.accounts.id.prompt();
    }
  };

  if (!isGoogleLoaded) {
    return (
      <button
        type="button"
        disabled
        className={`w-full bg-gray-100 text-gray-400 py-3 rounded-[32px] border border-gray-200 transition-colors duration-200 flex justify-center items-center gap-2 ${className}`}
      >
        <div className="w-5 h-5 border-2 border-gray-300 border-t-transparent rounded-full animate-spin"></div>
        Loading Google...
      </button>
    );
  }

  return (
    <div className="w-full">
      {/* Google's rendered button */}
      <div 
        ref={buttonRef} 
        className={`w-full ${disabled ? 'opacity-50 pointer-events-none' : ''}`}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
      
      {/* Loading state */}
      {isLoading && (
        <button
          type="button"
          disabled
          className={`w-full bg-white text-[#212221] py-3 rounded-[32px] border border-[#D7D7D7] transition-colors duration-200 flex justify-center items-center gap-2 ${className}`}
        >
          <div className="w-5 h-5 border-2 border-[#330065] border-t-transparent rounded-full animate-spin"></div>
          <span>Authenticating...</span>
        </button>
      )}

      {/* Fallback custom button if Google button fails to render */}
      <button
        type="button"
        onClick={handleCustomButtonClick}
        disabled={disabled || isLoading}
        className={`w-full bg-white text-[#212221] py-3 rounded-[32px] hover:bg-[#330065] hover:text-white border border-[#D7D7D7] transition-colors duration-200 flex justify-center items-center gap-2 ${className}`}
        style={{ display: 'none' }} // Hidden by default, shown via JS if needed
      >
        <Image
          src="/google.svg"
          alt="Google"
          width={20}
          height={20}
        />
        Continue with Google
      </button>
    </div>
  );
};

export default GoogleAuthButton;