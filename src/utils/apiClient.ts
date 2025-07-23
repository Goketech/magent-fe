import { redirect } from 'next/navigation';
// import {showUnauthorizedToast} from "@/utils/capitalize"


type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiOptions {
  method?: RequestMethod;
  body?: any;
  token?: string; // optional override
}
const handleUnauthorized = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  }
};

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiClient = async (path: string, options: ApiOptions = {}) => {
  const { method = 'GET', body, token } = options;
  let authToken = token;
  
  // Only check localStorage if we're in the browser AND no token was provided
  if (!authToken) {
    // Check if we're in a browser environment
    if (typeof window !== 'undefined' && typeof localStorage !== 'undefined') {
      try {
        const stored = localStorage.getItem('auth_token');
        if (stored) {
          try {
            authToken = JSON.parse(stored);
          } catch {
            authToken = stored;
          }
        }
      } catch (error) {
        console.warn('Failed to access localStorage:', error);
      }
    }
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  
  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  try {
    const res = await fetch(`${BASE_URL}${path}`, {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) }),
    });

    if (res.status === 401) {
      handleUnauthorized();
      throw new Error('Unauthorized - redirecting');
    }

    let data;
    try {
      data = await res.json();
    } catch {
      data = {};
    }

    if (!res.ok) {
      // Check for both 'error' and 'message' properties
      const errorMessage = data.error || data.message || 'API request failed';
      throw new Error(errorMessage);
    }

    return data;
  } catch (error) {
    // Handle fetch errors
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Network error occurred');
  }
};