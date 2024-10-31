"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@nextui-org/input";

import EyeSlashFilledIcon from "../../../public/assets/icon/EyeSlashFilledIcon.svg";
import EyeFilledIcon from "../../../public/assets/icon/EyeFilledIcon.svg";

import Button from "@components/button";

import { useUserAuth } from "@contexts/UserAuthContext";

const Page = () => {
  const {
    username,
    setUsername,
    password,
    setPassword,
    click,
    isLoading,
    isInvalidUsername,
    isInvalidPassword,
  } = useUserAuth();

  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-revomed-white w-[53rem] h-[31rem] rounded-2xl grid grid-cols-2 border">
        <div className="col-span-1">
          <Image
            height={496}
            width={424}
            src="/assets/background/loginCard.png"
            alt="Login Image"
            className="h-[496px]"
            priority={true}
          />
        </div>
        <div className="col-span-1 flex flex-col justify-center items-center gap-5">
          <Image
            height={43}
            width={143}
            src="/assets/RVMLogo.svg"
            alt="RVM Logo"
          />
          <div className="text-center">
            <p className="font-semibold text-revomed-secondary text-2xl">
              ยินดีต้อนรับเข้าสู่ระบบ
            </p>
            <p className="text-revomed-light-grey1 text-sm">
              กรุณากรอกอีเมลและรหัสเพื่อเข้าสู่ระบบ
            </p>
          </div>
          <div className="flex flex-col gap-5 w-full px-10">
            <Input
              type="text"
              variant="bordered"
              labelPlacement="outside"
              radius="sm"
              placeholder="กรุณาระบุชื่อผู้ใช้..."
              label="ชื่อผู้ใช้"
              onValueChange={setUsername}
              value={username}
              isInvalid={isInvalidUsername}
              errorMessage="Please enter a Username"
            />
            <Input
              label="รหัสผ่าน"
              variant="bordered"
              placeholder="กรุณาระบุรหัสผ่าน..."
              onValueChange={setPassword}
              value={password}
              isInvalid={isInvalidPassword}
              errorMessage="Please enter a Password"
              endContent={
                <button
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              type={isVisible ? "text" : "password"}
              labelPlacement="outside"
              radius="sm"
            />
          </div>
          <div className="flex flex-col gap-5 w-full px-10">
            <Button
              text="เข้าสู่ระบบ"
              isLoading={isLoading}
              onClick={click}
              className="bg-revomed-secondary text-revomed-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
