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
import { useRouter } from "next/navigation";

const UserAuthContext = createContext(null);

function UserAuthContextProvider({ children }) {
  const router = useRouter();

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
    router.push("/main");
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
