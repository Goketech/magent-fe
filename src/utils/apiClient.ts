import { redirect } from 'next/navigation';
// import {showUnauthorizedToast} from "@/utils/capitalize"

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface ApiOptions {
  method?: RequestMethod;
  body?: any;
  token?: string; // optional override
}

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const apiClient = async (path: string, options: ApiOptions = {}) => {
  const { method = 'GET', body, token } = options;

  let authToken = token;
  if (!authToken && typeof window !== 'undefined') {
    const stored = localStorage.getItem('auth_token');
    if (stored) {
      try {
        authToken = JSON.parse(stored);
      } catch {
        authToken = stored;
      }
    }
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (authToken) {
    headers['Authorization'] = `Bearer ${authToken}`;
  }

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  });

  if (res.status === 401) {
    if (typeof window !== 'undefined') {
      window.location.href = '/login';
    } else {
      redirect('/login');
    }
    throw new Error('Unauthorized - redirecting');
  }

  let data;
  try {
    data = await res.json();
  } catch {
    data = {};
  }

  if (!res.ok) {
    throw new Error(data.message || 'API request failed');
  }

  return data;
};
