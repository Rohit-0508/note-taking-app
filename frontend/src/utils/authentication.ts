import api from '../services/api';

interface AuthSuccess {
  message: string;
  token: string;
  user: {
    id: string;
    email: string;
    name?: string;
    [key: string]: any;
  };
}

interface AuthError {
  message: string;
  error?: any;
}

export type AuthResponse = AuthSuccess | AuthError;

// ✅ Login with email + OTP
export const loginUser = async (email: string, otp: string): Promise<AuthResponse> => {
  try {
    const response = await api.post<AuthSuccess>('/auth/login', { email, otp });
    return response.data;
  } catch (err: any) {
    return { message: err.response?.data?.message || 'Login failed', error: err };
  }
};

// ✅ Signup with name, dob, email (OTP is auto-generated)
export const registerUser = async (
  name: string,
  dob: string, // pass as string (ISO date) from frontend
  email: string
): Promise<AuthResponse> => {
  try {
    const res = await api.post<AuthSuccess>('/auth/signup', { name, dob, email });
    return res.data;
  } catch (err: any) {
    return { message: err.response?.data?.message || 'Signup failed', error: err };
  }
};
