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
  const [allUser, setAllUser] = useState([]);
  const [userToChange, setUserToChange] = useState({});

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
      return error;
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

  const fetchAllUser = async () => {
    try {
      const res = await userApi.getAllUser();
      if (res.status === 200 || res.status === 201) {
        setAllUser(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchUserById = async (_id) => {
    try {
      const res = await userApi.getUserById(_id);
      if (res.status === 200 || res.status === 201) {
        setUserToChange(res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserDetail = async (_id, params) => {
    try {
      const res = await userApi.updateUserById(_id, params);
      if (res.status === 200 || res.status === 201) {
        console.log("Updated!!!");
        router.push("/main/adminPanel");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const resetPassword = async (_id) => {
    try {
      const res = await userApi.resetPassword(_id);
      if (res.status === 200 || res.status === 201) {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const register = async (params) => {
    try {
      const res = await userApi.register(params);
      if (res.status === 200 || res.status === 201) {
        console.log(res.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updatePassword = async (_id, params) => {
    try {
      const res = await userApi.updatePassword(_id, params);
      if (res.status === 200 || res.status === 201) {
        console.log("Updated!!!");
        router.push("/main/adminPanel");
      }
    } catch (error) {
      console.log(error);
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
    fetchAllUser,
    allUser,
    fetchUserById,
    userToChange,
    updateUserDetail,
    resetPassword,
    register,
    updatePassword,
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
