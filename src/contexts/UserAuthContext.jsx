"use client";
import React, {
  createContext,
  useContext,
  ReactNode,
  SetStateAction,
  Dispatch,
  useState,
  useEffect,
} from "react";

const UserAuthContext = createContext(null);

function UserAuthContextProvider({ children }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const click = () => {
    setIsLoading(true);
    if (username) {
      setIsInvalidUsername(false);
    } else {
      setIsInvalidUsername(true);
    }
    if (password) {
      setIsInvalidPassword(false);
    } else {
      setIsInvalidPassword(true);
    }
    setIsLoading(false);
  };

  const value = {
    username,
    setUsername,
    password,
    setPassword,
    click,
    isLoading,
    isInvalidUsername,
    isInvalidPassword,
  };
  return (
    <UserAuthContext.Provider value={value}>
      {children}
    </UserAuthContext.Provider>
  );
}

export default UserAuthContextProvider;

export const useUserAuth = () => {
  const ctx = useContext(UserAuthContext);

  if (!ctx) {
    throw new Error(
      "useUserAuth must be used within a UserAuthContextProvider"
    );
  }

  return ctx;
};
