// middleware/session.js

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const SESSION_COOKIE_KEY = "session";

const defaultModel = {
  user: null,
};

export default function useSession() {
  const [session, setSession] = useState(defaultModel);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const savedSession = Cookies.get(SESSION_COOKIE_KEY);
    if (savedSession) {
      try {
        const value = JSON.parse(savedSession);
        setSession(value);
      } catch (e) {
        console.error("Error parsing session data.", e);
      }
    }
    setReady(true);
  }, []);

  const updateSession = (data) => {
    setSession(data);
    Cookies.set(SESSION_COOKIE_KEY, JSON.stringify(data), { expires: 2 }); // Set the session data as a cookie, expires in 1 day
  };

  const login = (data) => {
    updateSession(data);
  };

  const logout = () => {
    updateSession(defaultModel);
  };

  return {
    ...session,
    ready,
    login,
    logout,
  };
}
