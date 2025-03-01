import { Input } from "antd";
import { Table } from "antd";
import { createStyles } from "antd-style";
import BaseButton from "@components/BaseButton";
import { SearchOutlined } from "@ant-design/icons";

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
const columns = [
  {
    title: "Admin Name",
    width: 400,
    dataIndex: "name",
    key: "name",
    fixed: "left",
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
    dataIndex: "createdate",
    key: "1",
  },
  {
    title: "Update Date",
    dataIndex: "updatedate",
    key: "2",
  },
  {
    title: "Password",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => (
      <BaseButton className="bg-[#47A6FF] text-[#FCFCFC] border-0">
        Reset
      </BaseButton>
    ),
  },
  {
    title: "Manage",
    key: "operation",
    fixed: "right",
    width: 100,
    render: () => (
      <BaseButton className="bg-[#F74E3B] text-[#FCFCFC] border-0">
        Delete
      </BaseButton>
    ),
  },
];
const dataSource = [
  {
    key: "1",
    name: "Chaianan Phattanakarn",
    role: "Super Admin",
    createdate: "20/07/24",
    updatedate: "20/07/24",
  },
  {
    key: "2",
    name: "Supanut Wongtanom",
    role: "Admin",
    createdate: "20/07/24",
    updatedate: "20/07/24",
  },
  {
    key: "3",
    name: "Peerapol Rattanawongghun",
    role: "Sale",
    createdate: "20/07/24",
    updatedate: "20/07/24",
  },
  {
    key: "4",
    name: "Punyaporn AAA",             
    role: "Sale Manager",
    createdate: "20/07/24",
    updatedate: "20/07/24",
  },
];

export default function AdminPanel() {
  const { styles } = useStyle();

  return (
    <section>
      <div className="m-6 mb-1 p-6 bg-white rounded-t-2xl">
        <div className="text-[#545867] mb-2">Search</div>

        <div className="flex justify-between">
          <Input
            type="text"
            placeholder="Search Name..."
            className="w-[30%]"
            startContent={<SearchOutlined />}
          />
          <BaseButton
            className="w-[162px] h-[48px] py-3 px-10 text-[#FCFCFC] border-0 bg-[#004D7D]"
            onClick={() => {
              console.log("New admin added");
            }}
          >
            + New Admin
          </BaseButton>
        </div>
      </div>

      <div className="mt-0 m-6 p-6 bg-white rounded-b-2xl">
        <Table
          className={styles.customTable}
          pagination={false}
          columns={columns}
          dataSource={dataSource}
          scroll={{
            x: "max-content",
          }}
        />
      </div>
    </section>
  );
}
