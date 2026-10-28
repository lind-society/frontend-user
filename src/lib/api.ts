import axios, { AxiosRequestConfig } from 'axios';

/**
 * Shared axios instance for the Lind Society backend.
 *
 * `NEXT_PUBLIC_API_BASE_URL` is the canonical variable (it is what
 * src/constant/config.ts reads); `NEXT_PUBLIC_API_URL` is kept as a fallback
 * because .env.local currently defines both.
 */
export const API_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? process.env.NEXT_PUBLIC_API_URL;

export const apiConfig: AxiosRequestConfig = {
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
};

export const api = axios.create(apiConfig);

/**
 * Bearer token used for the endpoints that are not marked `@Public()`.
 * Public browsing (villas, activities, properties, blogs, search, …) works
 * without it, so it stays unset until a session provides one.
 */
let authToken: string | null = null;

export const setAuthToken = (token: string | null) => {
  authToken = token;
};

api.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

export default api;
