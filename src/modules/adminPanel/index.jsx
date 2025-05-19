"use client";
import { Input, Table, Modal } from "antd";
import { createStyles } from "antd-style";
import BaseButton from "@components/BaseButton";
import { SearchOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import SmileIcon from "@icons/ModalConfirm/SmileIcon";
import ResetIcon from "@icons/ModalConfirm/ResetIcon";
import TrashIconInModal from "@icons/ModalConfirm/TrashIcon";

const useStyle = createStyles(({ css, token }) => {
  const { antCls } = token;
  return {
    customTable: css`
      ${antCls}-table {
        ${antCls}-table-container {
          ${antCls}-table-body,
          ${antCls}-table-content {
            scrollbar-width: thin;
            scrollbar-color: #eaeaea transparent;
            scrollbar-gutter: stable;
          }
        }
      }
    `,
  };
});

export default function AdminPanel() {

  const dataSource = [
    {
      key: "1",
      name: "Chaianan Phattanakarn",
      role: "Super Admin",
      email: "abc1@gmail.com",
      phone_number: "0000000001",
      password: "abcdef1",
      create_date: "20/07/24",
      update_date: "20/07/24",
    },
    {
      key: "2",
      name: "Supanut Wongtanom",
      role: "Admin",
      email: "abc2@gmail.com",
      phone_number: "0000000002",
      password: "abcdef2",
      create_date: "20/07/24",
      update_date: "20/07/24",
    },
    {
      key: "3",
      name: "Peerapol Rattanawongghun",
      role: "Sale",
      email: "abc3@gmail.com",
      phone_number: "0000000003",
      password: "abcdef3",
      create_date: "20/07/24",
      update_date: "20/07/24",
    },
    {
      key: "4",
      name: "Punyaporn AAA",
      role: "Sale Manager",
      email: "abc4@gmail.com",
      phone_number: "0000000004",
      password: "abcdef4",
      create_date: "20/07/24",
      update_date: "20/07/24",
    },
  ];

  const [data, setData] = useState(dataSource);
  const [isDelete, setIsDelete] = useState(false);
  const [isConfirmDelete, setIsConfirmDelete] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isConfirmReset, setIsConfirmReset] = useState(false);
  const [deletedIndex, setDeleteIndex] = useState(null)

  const [searchedName, setSearchedName] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  const handleReset = () => {
    setIsReset(true);
  };

  const handleDeleteRecord = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
    setFilteredData((prev) => prev.filter((item) => item.key !== key));
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchedName(value);
    setFilteredData(
      data.filter((item) => item.name.toLowerCase().includes(value))
    );
  };

  const columns = [
    {
      title: "Admin Name",
      width: 400,
      dataIndex: "name",
      key: "name",
      fixed: "left",
      filteredValue: [searchedName],
      onfilter: (value, record) => {
        return String(record.name).toLowerCase().includes(value.toLowerCase());
      },
      render: (name) => (
        <Link href={`/main/adminPanel/${name}`}>{name}</Link>
      ),
    },
    {
      title: "Role",
      width: 200,
      dataIndex: "role",
      key: "role",
      fixed: "left",
    },
    {
      title: "Create Date",
      dataIndex: "create_date",
      key: "create_date",
    },
    {
      title: "Update Date",
      dataIndex: "update_date",
      key: "update_date",
    },
    {
      title: "Password",
      key: "password",
      fixed: "right",
      width: 100,
      render: () => (
        <BaseButton
          onClick={handleReset}
          className="bg-[#47A6FF] text-[#FCFCFC] border-0"
        >
          Reset
        </BaseButton>
      ),
    },
    {
      title: "Manage",
      key: "manage",
      fixed: "right",
      width: 100,
      render: (_,record) => (
        <BaseButton
          onClick={() => {
            setDeleteIndex(record.key)
            setIsDelete(true)
          }}
          className="bg-[#F74E3B] text-[#FCFCFC] border-0"
        >
          Delete
        </BaseButton>
      ),
    },
  ];

  const { styles } = useStyle();
  const router = useRouter();

  const onAddNewAdmin = () => {
    router.push("/main/adminPanel/newAdmin");
  };

  return (
    <section>
      <div className="m-6 mb-1 p-6 bg-white rounded-t-2xl">
        <div className="text-[#545867] mb-2">Search</div>

        <div className="flex justify-between">
          <Input
            type="text"
            placeholder="Search Name..."
            className="w-[30%]"
            onChange={handleSearch}
            startContent={<SearchOutlined />}
          />
          <BaseButton
            className="w-[162px] h-[48px] py-3 px-10 text-[#FCFCFC] border-0 bg-[#004D7D]"
            onClick={onAddNewAdmin}
          >
            + New Admin
          </BaseButton>
        </div>
      </div>

      <div className="mt-0 m-6 p-6 bg-white rounded-b-2xl">
        <Table
          style={{ backgroundColor: "#fafafa" }}
          bodySortBg="#fafafa"
          className={styles.customTable}
          pagination={true}
          columns={columns}
          dataSource={
            filteredData.length > 0 || searchedName ? filteredData : data
          }
          scroll={{
            x: "max-content",
          }}
        />
      </div>

      {/*Reset modal before confirm */}
      <Modal
        open={isReset}
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
            <ResetIcon />
          </div>
          <div className="flex flex-col gap-2">
            <p className="mt-6 mb-2 font-semibold text-xl text-[#152142]">
              Reset Password?
            </p>
            <p className="text-[#6F7489] text-[16px]">
              คุณต้องการยืนยันการรีเซ็ตรหัส
            </p>
            <p className="text-[#6F7489] text-[16px]">ผ่านใช่หรือไม่</p>
          </div>
          <div className="flex justify-center gap-6">
            <BaseButton
              className="mt-16 w-[125px] h-[48px] py-3 px-10 text-[#004D7D] border-2 border-[#004D7D] bg-[#FCFCFC] text-[16px]"
              onClick={() => {
                setIsReset(false);
              }}
            >
              Cancel
            </BaseButton>
            <BaseButton
              className="mt-16 w-[125px] h-[48px] py-3 px-10 text-[#FCFCFC] border-0 bg-[#004D7D] text-[16px]"
              onClick={() => {
                setIsReset(false);
                setIsConfirmReset(true);
              }}
            >
              Reset
            </BaseButton>
          </div>
        </div>
      </Modal>

      {/*Reset modal after confirm */}
      <Modal
        open={isConfirmReset}
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
              เราได้รีเซ็ทรหัสผ่านเรียบร้อยแล้ว
            </p>
          </div>
          <div className="flex justify-center gap-6">
            <BaseButton
              className="rounded-lg h-12 w-[132px] bg-revomed-primary text-revomed-white py-3 px-6"
              onClick={() => {
                setIsConfirmReset(false);
              }}
            >
              Got it
            </BaseButton>
          </div>
        </div>
      </Modal>

      {/*Delete modal before confirm */}
      <Modal
        open={isDelete}
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
            <TrashIconInModal className="text-[#F74E3B]" />
          </div>
          <div className="flex flex-col gap-2">
            <p className="mt-6 mb-2 font-semibold text-xl text-[#152142]">
              Delete this User?
            </p>
            <p className="text-[#6F7489] text-[16px]">
              หากลบแล้วคุณจะไม่สามารถ
            </p>
            <p className="text-[#6F7489] text-[16px]">
              นำข้อมูลของผู้ใช้งานนี้กลับมาได้
            </p>
          </div>
          <div className="flex justify-center gap-6">
            <BaseButton
              className="mt-16 w-[125px] h-[48px] py-3 px-10 text-[#004D7D] border-2 border-[#004D7D] bg-[#FCFCFC] text-[16px]"
              onClick={() => {
                setIsDelete(false);
              }}
            >
              Cancel
            </BaseButton>
            <BaseButton
              className="mt-16 w-[125px] h-[48px] py-3 px-10 text-[#FCFCFC] border-0 bg-[#004D7D] text-[16px]"
              onClick={() => {
                setIsDelete(false);
                setIsConfirmDelete(true);
                handleDeleteRecord(deletedIndex);
                setDeleteIndex(null); // Clear after deleting
              }}
            >
              Delete
            </BaseButton>
          </div>
        </div>
      </Modal>

      {/*Delete modal after confirm */}
      <Modal
        open={isConfirmDelete}
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
              ข้อมูลของคุณถูกลบเรียบร้อยแล้ว
            </p>
          </div>
          <div className="flex justify-center gap-6">
            <BaseButton
              className="rounded-lg h-12 w-[132px] bg-revomed-primary text-revomed-white py-3 px-6"
              onClick={() => {
                setIsConfirmDelete(false);
              }}
            >
              Got it
            </BaseButton>
          </div>
        </div>
      </Modal>
    </section>
  );
}
