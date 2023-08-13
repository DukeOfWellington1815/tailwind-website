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

  const isLoggedIn = !!session.user; // Check if the 'user' property exists to determine if logged in

  const updateSession = (data) => {
    setSession(data);
    Cookies.set(SESSION_COOKIE_KEY, JSON.stringify(data), { expires: 2 });
    window.location.reload(); // Refresh the page after updating the session
    window.location.href = "/dossier"; // Redirect to the home page
  };

  const login = (data) => {
    updateSession(data);
  };

  const logout = () => {
    Cookies.remove(SESSION_COOKIE_KEY);
    setSession(defaultModel);
    window.location.href = "/"; // Redirect to the home page
  };

  return {
    ...session,
    isLoggedIn,
    ready,
    login,
    logout,
  };
}
