"use client";
import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

const PathContext = createContext(null);

function PathProvider({ children }) {
  const [header, setHeader] = useState("Revomend");
  const [currentPage, setCurrentPage] = useState("");

  const value = {
    header,
    setHeader,
    currentPage,
    setCurrentPage,
  };

  return <PathContext.Provider value={value}>{children}</PathContext.Provider>;
}

export default PathProvider;

export const usePath = () => {
  const ctx = useContext(PathContext);
  if (!ctx) {
    throw new Error("usePath must be used within a PathProvider");
  }
  return ctx;
};
