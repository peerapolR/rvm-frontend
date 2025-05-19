import { useEffect, useState } from "react";
import EyeSlashFilledIcon from "../../../public/assets/icon/EyeSlashFilledIcon.svg";
import EyeFilledIcon from "../../../public/assets/icon/EyeFilledIcon.svg";
import { Input, Form, Modal } from "antd";
import FooterBar from "./footerBar";
import SmileIcon from "@icons/ModalConfirm/SmileIcon";
import BaseButton from "@components/BaseButton";

import { useUserAuth } from "@contexts/UserAuthContext";

export default function ChangePassword() {
  const { user, updatePassword } = useUserAuth();
  const [newPasswordToggle, setNewPasswordToggle] = useState(false);
  const [confirmToggle, setConfirmToggle] = useState(false);

  const passwordSet = {
    current_password: "",
    new_password: "",
    confirm_password: "",
  };

  const [newPassword, setNewPassword] = useState(passwordSet);
  const [accessibility, setAccessibility] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPassword((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const [isSave, setIsSave] = useState(false);

  useEffect(() => {
    if (
      newPassword.new_password === newPassword.confirm_password &&
      newPassword.new_password.length > 0
    ) {
      setAccessibility(true);
    } else {
      setAccessibility(false);
    }
  }, [newPassword.new_password, newPassword.confirm_password]);

  return (
    <section className="flex flex-col justify-between min-h-[calc(100vh-72px)]">
      <div className="m-6 p-6 bg-white rounded-2xl">
        <p className="mb-5 text-revomed-red">
          * Password ต้องใส่อย่างน้อย 5 ตัวขึ้นไป
        </p>
        <Form>
          <div className="grid grid-cols-3">
            {/* first col */}
            <div>
              <p>Current Password</p>
              <Form.Item
                name="current_password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your current password",
                  },
                ]}
              >
                <Input.Password
                  onChange={handleChange}
                  name="current_password"
                  className="w-[95%] mt-1 p-2 px-3 bg-white border rounded-lg outline-none"
                  type="text"
                  placeholder="Current Password..."
                  label="Current Password"
                  iconRender={(confirmToggle) =>
                    confirmToggle ? <EyeFilledIcon /> : <EyeSlashFilledIcon />
                  }
                />
              </Form.Item>
            </div>

            {/* second col */}
            <div>
              <p>New Password</p>
              <Form.Item
                name="new_password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your new password",
                  },
                ]}
              >
                <Input.Password
                  onChange={handleChange}
                  name="new_password"
                  className="w-[95%] mt-1 p-2 px-3 bg-white border rounded-lg outline-none"
                  type={newPasswordToggle ? "text" : "password"}
                  placeholder="Password..."
                  label="New Password"
                  required
                  iconRender={(newPasswordToggle) =>
                    newPasswordToggle ? (
                      <EyeFilledIcon />
                    ) : (
                      <EyeSlashFilledIcon />
                    )
                  }
                />
              </Form.Item>
            </div>

            {/* third col */}
            <div>
              <p>Confirm New Password</p>
              <Form.Item
                name="confirm_password"
                rules={[
                  {
                    required: true,
                    message: "Please confirm your new password",
                  },
                ]}
              >
                <Input.Password
                  onChange={handleChange}
                  name="confirm_password"
                  className="w-[95%] mt-1 p-2 px-3 bg-white border rounded-lg outline-none"
                  type={confirmToggle ? "text" : "password"}
                  placeholder="Password..."
                  label="Confirm New Password"
                  required
                  iconRender={(confirmToggle) =>
                    confirmToggle ? <EyeFilledIcon /> : <EyeSlashFilledIcon />
                  }
                />
              </Form.Item>
            </div>
          </div>
        </Form>
      </div>

      <Modal
        open={isSave}
        height={420}
        width={363}
        footer={false}
        closeIcon={false}
        maskClosable={false}
        mask={true}
        className="text-center p-0"
      >
        <div className="flex flex-col items-center justify-center h-[400px]">
          <div className="flex items-center justify-center">
            <SmileIcon className="text-revomed-primary mb-6" />
          </div>
          <div className="flex flex-col gap-2 mb-[72px]">
            <div className="text-xl text-#152142 font-semibold">Success!</div>
            <p className="text-[#6F7489] text-[16px]">ข้อมูลของคุณถูกบันทึก</p>
            <p className="text-[#6F7489] text-[16px]">เรียบร้อยแล้ว</p>
          </div>
          <div className="flex justify-center gap-6">
            <BaseButton
              className="rounded-lg h-12 w-[132px] bg-revomed-primary text-revomed-white py-3 px-6"
              onClick={() => {
                setIsSave(false);
              }}
            >
              Got it
            </BaseButton>
          </div>
        </div>
      </Modal>

      <FooterBar
        accessibility={accessibility}
        passwordSet={newPassword}
        sendDataToParent={setIsSave}
        updatePassword={updatePassword}
        _id={user?._id}
      />
    </section>
  );
}
