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
  (response) => {
    // A wrong or missing API URL makes the web server answer with index.html
    // (status 200). Fail here with a clear message instead of letting the pages
    // crash on `undefined.data`.
    if (typeof response.data !== 'object' || response.data === null) {
      return Promise.reject(
        new Error(
          `Unexpected response from ${response.config.url}: the API did not return JSON. Check VITE_API_BASE_URL (now: ${API_URL ?? 'not set'}).`
        )
      );
    }
    return response;
  },
  (error) => Promise.reject(error)
);

export default api;
