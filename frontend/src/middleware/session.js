// session.js
import { useEffect, useState } from "react";

const STORAGE_KEY = "session";

const defaultModel = {
  user: null,
  token: null,
};

export default function useSession() {
  const [session, setSession] = useState(defaultModel);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedSession = localStorage.getItem(STORAGE_KEY);
    if (savedSession) {
      try {
        const value = JSON.parse(savedSession);
        const now = new Date();
        if (value.exp && new Date(value.exp * 1000) > now) {
          setSession(value);
        } else {
          setSession(defaultModel);
        }
      } catch (e) {
        console.log(e);
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (session.user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [session]);

  const login = (value) => {
    setSession(value);
  };

  const logout = () => {
    setSession(defaultModel);
  };

  return {
    ...session,
    ready,
    login,
    logout,
  };
}
