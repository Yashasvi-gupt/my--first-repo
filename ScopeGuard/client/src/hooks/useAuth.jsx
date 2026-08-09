import { createContext, useContext, useEffect, useState } from 'react';

const TOKEN_KEY = 'scopeguard_token';
const USER_KEY = 'scopeguard_user';

const getStoredAuth = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  const user = localStorage.getItem(USER_KEY);
  return token && user ? { token, user: JSON.parse(user) } : { token: null, user: null };
};

const AuthContext = createContext({
  token: null,
  user: null,
  setAuth: () => {},
  clearAuth: () => {},
});

export function AuthProvider({ children }) {
  const [auth, setAuthState] = useState(() => getStoredAuth());

  useEffect(() => {
    setAuthState(getStoredAuth());
  }, []);

  const setAuth = ({ token, user }) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
    setAuthState({ token, user });
  };

  const clearAuth = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    setAuthState({ token: null, user: null });
  };

  return <AuthContext.Provider value={{ ...auth, setAuth, clearAuth }}>{children}</AuthContext.Provider>;
}

export default function useAuth() {
  return useContext(AuthContext);
}
