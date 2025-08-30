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
  error: any;
}

export type AuthResponse = AuthSuccess | AuthError;

export const loginUser = async (email: string, password: string): Promise<AuthResponse> => {
  const response = await api.post<AuthResponse>('/auth/login', { email, password });
  return response.data;
};

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>('/auth/signup', { name, email, password });
  return res.data;
};
