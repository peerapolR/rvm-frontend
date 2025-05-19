import { useState } from "react";
import { Input, Form, Select, Space } from "antd";
import FooterBar from "./footer";

export default function AdminInformation(admin) {
  const AdminData = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    role: "",
  };

  const [adminData, setAdminData] = useState(AdminData);
  const [accessibility, setAccessibility] = useState(false);

  console.log(adminData);

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
          <Form>
            <div className="grid grid-cols-3">
              {/* first col */}
              <div>
                <p>Firstname</p>
                <Form.Item
                  name="first_name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your firstname",
                    },
                  ]}
                >
                  <Input
                    onChange={handleInputChange}
                    name="first_name"
                    className="w-[95%] mt-1 p-2 px-3 bg-white border rounded-lg outline-none"
                    type="text"
                    placeholder="Firstname..."
                    label="Firstname"
                    value="Supanut"
                    disabled
                  />
                </Form.Item>
              </div>

              {/* second col */}
              <div>
                <p>Lastname</p>
                <Form.Item
                  name="last_name"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your lastname",
                    },
                  ]}
                >
                  <Input
                    onChange={handleInputChange}
                    name="last_name"
                    className="w-[95%] mt-1 p-2 px-3 bg-white border rounded-lg outline-none"
                    type="text"
                    placeholder="Lastname..."
                    label="New Password"
                    disabled
                  />
                </Form.Item>
              </div>

              {/* third col */}
              <div>
                <p>Phone Number</p>
                <Form.Item
                  name="phone_number"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your phone number",
                    },
                  ]}
                >
                  <Input
                    onChange={handleInputChange}
                    name="phone_number"
                    className="w-[95%] mt-1 p-2 px-3 bg-white border rounded-lg outline-none"
                    type="text"
                    placeholder="Phone Number..."
                    label="Confirm New Password"
                    disabled
                  />
                </Form.Item>
              </div>

              {/* fourth col */}
              <div>
                <p>Email</p>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      type: "email",
                      message: "The email is not valid",
                    },
                    {
                      required: true,
                      message: "Please enter your email",
                    },
                  ]}
                >
                  <Input
                    onChange={handleInputChange}
                    name="email"
                    className="w-[95%] mt-1 p-2 px-3 bg-white border rounded-lg outline-none"
                    type="text"
                    placeholder="Email..."
                    label="Current Password"
                    disabled
                  />
                </Form.Item>
              </div>

              {/* fifth col */}
              <div>
                <p>Role</p>
                <Form.Item
                  name="Role"
                  rules={[
                    {
                      required: true,
                      message: "Please enter your role",
                    },
                  ]}
                >
                  <Select
                    onChange={handleSelectChange}
                    name="role"
                    id="role"
                    className="w-[95%] mt-1 bg-white"
                    style={{ height: "40px", width: "95%" }}
                    placeholder="Select Role..."
                    disabled
                    options={[
                      {
                        value: "Super Admin",
                        label: "Super Admin",
                      },
                      {
                        value: "Admin",
                        label: "Admin",
                      },
                      {
                        value: "Sale",
                        label: "Sale",
                      },
                      {
                        value: "Sale Manager",
                        label: "Sale Manager",
                      },
                      {
                        value: "P&D",
                        label: "P&D",
                      },
                    ]}
                  />
                </Form.Item>
              </div>
            </div>
          </Form>
        </div>
      </div>
      <FooterBar accessibility={accessibility} adminData={adminData} />
    </section>
  );
}
