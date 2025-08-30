import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface IUser {
  _id: string;
  name: string;
  email: string;
  googleId?: string;
  isVerified: boolean;
  [key: string]: any; // for any additional fields
}

interface IAuthContext {
  user: IUser | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (userData: IUser, authToken: string) => void;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<IAuthContext | undefined>(undefined);

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('auth_token');
    const storedUser = localStorage.getItem('auth_user');
    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get('token');
    const userFromURL = urlParams.get('user');

    if (tokenFromURL && userFromURL) {
      try {
        const parsedUser: IUser = JSON.parse(decodeURIComponent(userFromURL));
        setUser(parsedUser);
        setToken(tokenFromURL);
        localStorage.setItem('auth_token', tokenFromURL);
        localStorage.setItem('auth_user', JSON.stringify(parsedUser));

        // Clean the URL
        window.history.replaceState({}, document.title, window.location.pathname);
      } catch (err) {
        console.error('Error parsing user from Google login:', err);
      }
    } else if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch (error) {
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }

    setIsLoading(false);
  }, []);

  const login = (userData: IUser, authToken: string) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem('auth_token', authToken);
    localStorage.setItem('auth_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!user && !!token,
        login,
        logout,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
