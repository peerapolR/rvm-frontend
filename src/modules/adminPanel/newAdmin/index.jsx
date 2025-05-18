import { useState } from "react";
import { Input, Form, Select, Modal } from "antd";
import FooterBar from "./footerBar";
import BaseButton from "@components/BaseButton";
import SmileIcon from "@icons/ModalConfirm/SmileIcon";

export default function NewAdmin() {
  const [form] = Form.useForm();

  const AdminData = {
    first_name: "",
    last_name: "",
    phone_number: "",
    email: "",
    role: "",
  };

  const [adminData, setAdminData] = useState(AdminData);
  const [accessibility, setAccessibility] = useState(false);
  const [createState, setCreateState] = useState(false);

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

  const validatePhone = (_, value) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(value)
      ? Promise.resolve()
      : Promise.reject(new Error("Enter a valid 10-digit phone number!"));
  };

  const handleFormChange = async (_, allValues) => {
    console.log("Form Values:", allValues);

    // Ensure all fields are filled and not empty strings
    const allFieldsFilled = Object.values(allValues).every(
      (val) => val !== undefined && val !== null && val.toString().trim() !== ""
    );

    try {
      //Ensure form updates before validation
      await form.setFieldsValue(allValues);

      //Wait for validation to complete
      await form.validateFields();

      //Enable button only if all fields are filled and valid
      setAccessibility(allFieldsFilled);
    } catch (errorInfo) {
      console.log("Validation Failed:", errorInfo);

      //Disable button if validation fails
      setAccessibility(false);
    }
  };

  return (
    <section className="flex flex-col justify-between min-h-[calc(100vh-72px)]">
      <div>
        <p className="text-[#004D7D] mt-6 ml-6 text-lg font-semibold">
          New Admin
        </p>
        <div className="m-6 p-6 bg-white rounded-2xl">
          <Form
            form={form}
            onValuesChange={handleFormChange}
            // initialValues={adminData}
            rules={[
              {
                required: true,
                message: "Please enter your firstname",
              },
              { whitespace: true },
            ]}
          >
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
                    { whitespace: true },
                  ]}
                >
                  <Input
                    onChange={handleInputChange}
                    name="first_name"
                    className="w-[95%] mt-1 p-2 px-3 bg-white border rounded-lg outline-none"
                    type="text"
                    placeholder="Firstname..."
                    label="Current Password"
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
                    { whitespace: true },
                  ]}
                >
                  <Input
                    onChange={handleInputChange}
                    name="last_name"
                    className="w-[95%] mt-1 p-2 px-3 bg-white border rounded-lg outline-none"
                    type="text"
                    placeholder="Lastname..."
                    label="New Password"
                    required
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
                    { whitespace: true },
                    {
                      validator: validatePhone,
                      message: "Please enter 10 digits of number (0-9)",
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
                    required
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
                    { whitespace: true },
                  ]}
                >
                  <Input
                    onChange={handleInputChange}
                    name="email"
                    className="w-[95%] mt-1 p-2 px-3 bg-white border rounded-lg outline-none"
                    type="text"
                    placeholder="Email..."
                    label="Current Password"
                  />
                </Form.Item>
              </div>

              {/* fifth col */}
              <div>
                <p>Role</p>
                <Form.Item
                  name="role"
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

        <Modal
          open={createState}
          // centered
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
              <p className="text-[#6F7489] text-[16px]">
                ข้อมูลของคุณถูกบันทึก
              </p>
              <p className="text-[#6F7489] text-[16px]">เรียบร้อยแล้ว</p>
            </div>
            <div className="flex justify-center gap-6">
              <BaseButton
                className="rounded-lg h-12 w-[132px] bg-revomed-primary text-revomed-white py-3 px-6"
                onClick={() => {
                  setCreateState(false);
                }}
              >
                Got it
              </BaseButton>
            </div>
          </div>
        </Modal>
        
      </div>
      <FooterBar
        accessibility={accessibility}
        adminData={adminData}
        sendDataToParent={setCreateState}
      />
    </section>
  );
}
