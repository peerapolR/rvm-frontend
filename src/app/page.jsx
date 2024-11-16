"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";
import * as userApi from "@api/user";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    const run = async () => {
      try {
        if (localStorage.getToken()) {
          const res = await userApi.getMe();
          const data = res.data;
          if (!Array.isArray(data.data)) {
            const { data: fetchUser } = data;
            router.push("/main");
            setUser(fetchUser);
            return;
          } else {
            router.push("/login");
          }
        } else {
          router.push("/login");
        }
      } catch (err) {}
      router.push("/login");
    };

    run();
  }, []);

  return <></>;
};

export default Home;
