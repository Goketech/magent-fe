import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { apiClient } from '@/utils/apiClient';
import { logEvent } from '@/utils/logEvent';

// Extend the Window interface to include google
declare global {
  interface Window {
    google?: any;
  }
}

interface GoogleAuthResponse {
  credential: string;
  select_by: string;
}

interface GoogleAuthData {
  token: string;
  user: {
    id: string;
    email: string;
    name: string;
    picture?: string;
    publisherCampaigns?: any[]; // Adjust type as needed
  };
  isNewUser: boolean;
}

export const useGoogleAuth = () => {
  const router = useRouter();
  const { toast } = useToast();

  const handleGoogleAuth = useCallback(async (
    response: GoogleAuthResponse,
    isSignup: boolean = false,
    signupData?: {
      role: string;
      companyName?: string;
      industry?: string;
      expertise?: string;
    }
  ) => {
    try {
      logEvent({
        action: 'click',
        category: 'Button',
        label: isSignup ? 'Google Signup' : 'Google Login',
        value: 1,
      });

      const data: GoogleAuthData = await apiClient('/auth/google', {
        method: 'POST',
        body: {
          credential: response.credential,
          isSignup,
          signupData,
        },
      });
      console.log('Google auth response:', data);
      // Store auth token
      localStorage.setItem('auth_token', data.token);
      localStorage.setItem('wallet_connected_address', data.user.id);
      localStorage.setItem('email', data.user.email);
      localStorage.setItem("publisher_campaign", JSON.stringify(data.user.publisherCampaigns || []));

      // Show success message
      toast({
        title: data.isNewUser ? 'Account Created' : 'Login Successful',
        description: data.isNewUser 
          ? 'Welcome! Your account has been created successfully.' 
          : 'Welcome back!',
        variant: 'success',
      });

      // Redirect to dashboard
      router.push('/dashboard');

      return data;
    } catch (error: any) {
      console.error('Google authentication error:', error);
      
      const message = error?.message || 'Authentication failed. Please try again.';
      
      toast({
        title: 'Authentication Failed',
        description: message,
        variant: 'destructive',
      });

      throw error;
    }
  }, [router, toast]);

  const initializeGoogleAuth = useCallback(() => {
    if (typeof window !== 'undefined' && window.google) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: (response: GoogleAuthResponse) => {
          // This will be overridden by specific components
          console.log('Google auth response:', response);
        },
        auto_select: false,
        cancel_on_tap_outside: true,
      });
    }
  }, []);

  return {
    handleGoogleAuth,
    initializeGoogleAuth,
  };
};