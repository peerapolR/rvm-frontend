"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Layout } from "antd";
import Sider from "antd/es/layout/Sider";
import { Content, Header } from "antd/es/layout/layout";

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    const run = async () => {
      router.push("/login");
      // try {
      //   if (localStorage.getToken()) {
      //     const res = await userApi.getMe();
      //     const data = res.data;
      //     if (!Array.isArray(data.data)) {
      //       const { data: fetchUser } = data;
      //       router.push("/");
      //       setUser(fetchUser);
      //       return;
      //     } else {
      //       router.push("/login");
      //     }
      //   } else {
      //     router.push("/login");
      //   }
      // } catch (err) {}
      // router.push("/login/admin");
    };

    run();
  }, []);

  return <></>;
};

export default Home;
