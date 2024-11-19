import { TLoginPayload, TLoginResponse } from '@/types/auth';

/* eslint-disable no-console */
export interface ApiResponse {
  message: string;
}

export const loginRequest = async (
  payload: TLoginPayload
): Promise<TLoginResponse> => {
  console.log(payload, 'payload');
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const { email, password } = payload;

      // Simulate network error with a random condition (e.g., if email is "error@test.com")
      if (email === 'error@test.com') {
        reject(new Error('Network error occurred. Please try again later.'));
        return;
      }

      // Check if the provided credentials match the dummy data
      if (email === 'test@gmail.com' && password === 'password') {
        resolve({
          success: true,
          message: 'Login successful.',
          token: 'dummy-jwt-token', // In a real app, this would be a JWT or similar token
          user: {
            id: 1,
            name: 'Test User',
            email: 'test@gmail.com',
          },
        });
      } else {
        resolve({
          success: false,
          message: 'Invalid email or password.',
        });
      }
    }, 2000); // 2-second delay to simulate network latency
  });
};

export const logoutRequest = async (): Promise<ApiResponse> => {
  try {
    const response = await fetch('/api/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData: ApiResponse = await response.json();
      throw new Error(errorData.message || 'Logout failed');
    }

    const data: ApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error('Logout Request Error:', error);
    throw error; // Let the calling function handle the error
  }
};
