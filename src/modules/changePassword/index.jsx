import { useEffect, useState } from "react";
import EyeSlashFilledIcon from "../../../public/assets/icon/EyeSlashFilledIcon.svg";
import EyeFilledIcon from "../../../public/assets/icon/EyeFilledIcon.svg";
import { Input, Form } from "antd";
import FooterBar from "./footerBar";

export default function ChangePassword() {
  const [newPasswordToggle, setNewPasswordToggle] = useState(false);
  const [confirmToggle, setConfirmToggle] = useState(false);

  // const toggleVisibility = () => setNewPasswordToggle(!newPasswordToggle);
  // const confirmToggleVisibility = () => setConfirmToggle(!confirmToggle);

  const passwordSet = {
    new_password : "",
    confirm_password : "",
  }

  const [newPassword, setNewPassword] = useState(passwordSet)
  const [accessibility, setAccessibility] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
      setNewPassword((prevData) => ({
        ...prevData,
        [name]: value, // Update specific field in state
      }));
  }

  const handleSave = () => {
      console.log(passwordSet)
  }

  //set the value to single object
  useEffect(() => {
    if (newPassword.new_password === newPassword.confirm_password && newPassword.new_password.length > 0) {
      //ensure the new password and confirm password is the same
      setAccessibility(true);
    } else {
      setAccessibility(false);
    }
  }, [newPassword.new_password, newPassword.confirm_password]);

  console.log("The accessibility =", newPassword.new_password);

  return (
    <section className="flex flex-col justify-between min-h-[calc(100vh-72px)]">
      <div className="m-6 p-6 bg-white rounded-2xl">
        <Form>
          <div className="grid grid-cols-3">
            {/* first col */}
            <div>
              <p>Current Password</p>
              <Form.Item>
                <Input
                  className="w-[95%] mt-1 p-2 px-3 bg-[#F3F5FB] border-1 border-[#E0E3EB] rounded-lg focus:outline-none"
                  type="text"
                  placeholder="123456"
                  label="Current Password"
                  variant="faded"
                  readOnly
                />
              </Form.Item>
            </div>

            {/* second col */}
            <div>
              <p>New Password</p>
              <Form.Item
                name="new password"
                rules={[
                  {
                    required: true,
                    message: "Please input your new password",
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
                name="confirm new password"
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

      <FooterBar accessibility={accessibility} />
    </section>
  );
}
