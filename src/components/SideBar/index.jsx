"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Sider from "antd/es/layout/Sider";
import RevomedLogo from "@icons/RevomedLogo";
import MenuBar from "./MenuBar";

export default function Navbar() {
  const router = useRouter();
  return (
    <Sider
      className="text-revomed-grey flex flex-col items-center pt-8 px-4"
      // theme="light"
      width={300}
      style={{
        backgroundColor: "white",
      }}
    >
      {/* Logo */}
      <div className="mb-4 flex justify-center">
        <div className="cursor-pointer" onClick={() => router.push("/main")}>
          <RevomedLogo />
        </div>
      </div>
      {/* Menu */}
      <div className="text-base">
        <MenuBar />
      </div>
    </Sider>
  );
}
