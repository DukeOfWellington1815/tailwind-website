import { useEffect, useState } from "react";

const STORAGE_KEY = "session";

const defaultModel = {
  user: null,
  token: null,
};

export default function useSession() {
  const [session, setSession] = useState(defaultModel);
  const [ready, setReady] = useState(false);
  const [updateLocalStorage, setUpdateLocalStorage] = useState(true);
  const [error, setError] = useState(null); // New state to handle errors

  useEffect(() => {
    const savedSession = localStorage.getItem(STORAGE_KEY);
    if (savedSession) {
      try {
        const value = JSON.parse(savedSession);
        setSession(value);
      } catch (e) {
        setError("Error parsing session data.");
      }
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (updateLocalStorage) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
      } catch (e) {
        setError("Error saving session data.");
      }
      setUpdateLocalStorage(false);
    }
  }, [session, updateLocalStorage]);

  const login = (data) => {
    const { user, token } = data;
    console.log("Logging in with data:", data); // Add this log to check the data being passed
    setSession({
      user,
      token,
    });
    setUpdateLocalStorage(true);
    console.log("Updated session after login:", session); // Add this log to check the updated session
  };

  const logout = () => {
    setSession(defaultModel);
    setUpdateLocalStorage(true);
  };

  console.log("Current session state:", session); // Add this log to check the current session state

  return {
    ...session,
    ready,
    error,
    login,
    logout,
  };
}
