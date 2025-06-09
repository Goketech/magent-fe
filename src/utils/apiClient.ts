type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
import { redirect } from 'next/navigation'

interface ApiOptions {
  method?: RequestMethod;
  body?: any;
  token?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiClient = async (path: string, options: ApiOptions = {}) => {
  const { method = 'GET', body, token } = options;

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) })
    
  });

  if (res.status === 401) {
    // Redirect to login page
    if (typeof window !== 'undefined') {
      window.location.href = '/login'; // Client-side redirect
    } else {
      redirect('/login'); // Server-side redirect for App Router
    }
    throw new Error('Unauthorized - redirecting');
  }

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.message || 'API request failed');
  }

  return res;
};
