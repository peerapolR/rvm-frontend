import { useEffect, useState } from "react";
import { Input, Form, Select, Space } from "antd";
import FooterBar from "./footer";
import { useUserAuth } from "@contexts/UserAuthContext";

export default function AdminInformation({ _id }) {
  const { fetchUserById, userToChange, updateUserDetail } = useUserAuth();
  const [form] = Form.useForm();

  const [adminData, setAdminData] = useState({
    firstName: "",
    lastName: "",
    tel: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    fetchUserById(_id);
  }, []);

  useEffect(() => {
    if (userToChange) {
      const mappedData = {
        firstName: userToChange.firstName || "",
        lastName: userToChange.lastName || "",
        tel: userToChange.tel || "",
        email: userToChange.email || "",
        role: userToChange.role || "",
      };

      setAdminData(mappedData);
      form.setFieldsValue(mappedData);
    }
  }, [userToChange]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdminData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setAdminData((prevData) => ({
      ...prevData,
      role: value,
    }));
  };

  return (
    <section className="flex flex-col justify-between min-h-[calc(100vh-72px)]">
      <div>
        <p className="text-[#004D7D] mt-6 ml-6 text-lg font-semibold">
          Information
        </p>
        <div className="m-6 p-6 bg-white rounded-2xl">
          <Form form={form}>
            <div className="grid grid-cols-3">
              {/* Firstname */}
              <div>
                <p>Firstname</p>
                <Form.Item
                  name="firstName"
                  rules={[
                    { required: true, message: "Please enter your firstname" },
                  ]}
                >
                  <Input
                    onChange={handleInputChange}
                    name="firstName"
                    className="w-[95%] mt-1 p-2 px-3 bg-white border rounded-lg outline-none"
                    type="text"
                    placeholder="Firstname..."
                  />
                </Form.Item>
              </div>

              {/* Lastname */}
              <div>
                <p>Lastname</p>
                <Form.Item
                  name="lastName"
                  rules={[
                    { required: true, message: "Please enter your lastname" },
                  ]}
                >
                  <Input
                    onChange={handleInputChange}
                    name="lastName"
                    className="w-[95%] mt-1 p-2 px-3 bg-white border rounded-lg outline-none"
                    type="text"
                    placeholder="Lastname..."
                  />
                </Form.Item>
              </div>

              {/* Phone */}
              <div>
                <p>Phone Number</p>
                <Form.Item
                  name="tel"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input
                    onChange={handleInputChange}
                    name="tel"
                    className="w-[95%] mt-1 p-2 px-3 bg-white border rounded-lg outline-none"
                    type="text"
                    placeholder="Phone Number..."
                  />
                </Form.Item>
              </div>

              {/* Email */}
              <div>
                <p>Email</p>
                <Form.Item
                  name="email"
                  rules={[
                    { type: "email", message: "The email is not valid" },
                    { required: true, message: "Please enter your email" },
                  ]}
                >
                  <Input
                    onChange={handleInputChange}
                    name="email"
                    className="w-[95%] mt-1 p-2 px-3 bg-white border rounded-lg outline-none"
                    type="text"
                    placeholder="Email..."
                  />
                </Form.Item>
              </div>

              {/* Role */}
              <div>
                <p>Role</p>
                <Form.Item
                  name="role"
                  rules={[
                    { required: true, message: "Please enter your role" },
                  ]}
                >
                  <Select
                    onChange={handleSelectChange}
                    name="role"
                    className="w-[95%] mt-1 bg-white"
                    style={{ height: "40px", width: "95%" }}
                    placeholder="Select Role..."
                    options={[
                      { value: "admin", label: "Admin" },
                      { value: "sale", label: "Sale" },
                      { value: "sale manager", label: "Sale Manager" },
                      { value: "p&d", label: "P&D" },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>

      <FooterBar
        adminData={adminData}
        updateUserDetail={updateUserDetail}
        _id={_id}
      />
    </section>
  );
}
