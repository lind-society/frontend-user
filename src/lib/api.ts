import axios, { AxiosRequestConfig } from 'axios';

/**
 * Shared axios instance for the Lind Society backend.
 *
 * `VITE_API_BASE_URL` is inlined at build time, so changing it needs a rebuild.
 */
export const API_URL = import.meta.env.VITE_API_BASE_URL;

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
