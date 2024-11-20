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
import * as userApi from "../api/user";
import * as localStorage from "../services/localStorage";

const UserAuthContext = createContext(null);

function UserAuthContextProvider({ children }) {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isInvalidUsername, setIsInvalidUsername] = useState(false);
  const [isInvalidPassword, setIsInvalidPassword] = useState(false);

  const [user, setUser] = useState(null);
  const [authUser, setAuthUser] = useState({});
  const [accessToken, setAccessToken] = useState("");

  const login = async () => {
    try {
      // e.preventDefault();
      setIsLoading(true);

      const res = await userApi.login(authUser);
      if (res.data) {
        setAccessToken(res.data.access_token);
        setUser(res.data.data);
      }
    } catch (error) {
      // toast.error("เข้าสู่ระบบไม่สำเร็จ");
      console.log("เข้าสู่ระบบไม่สำเร็จ");
    } finally {
      setIsLoading(false);
    }
    // router.push("/main");
  };

  useEffect(() => {
    // if (authUser.username) {
    //   setIsInvalidUsername(false);
    // } else {
    //   setIsInvalidUsername(true);
    // }
    // if (authUser.password) {
    //   setIsInvalidPassword(false);
    // } else {
    //   setIsInvalidPassword(true);
    // }
  }, [authUser]);

  const logout = () => {
    localStorage.removeToken();
    setAccessToken("");
    setUser(null);
    setAuthUser(null);
    router.push("/");
  };

  const fetchUser = () => {
    try {
      userApi.getMe().then((res) => {
        if (res.data.data) {
          setUser(res.data.data);
          return res.data.data;
        } else {
          router.push("/login");
        }
      });
    } catch (err) {
      router.push("/login");
    }
  };

  useEffect(() => {
    const initAccessToken = localStorage.getToken();

    if (accessToken || initAccessToken) {
      localStorage.setToken(accessToken || initAccessToken);

      fetchUser();
    } else {
      localStorage.removeToken();
      router.push("/login");
    }
  }, [accessToken]);

  const value = {
    username,
    setUsername,
    password,
    setPassword,
    login,
    isLoading,
    isInvalidUsername,
    isInvalidPassword,
    logout,
    fetchUser,
    setAuthUser,
    user,
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
