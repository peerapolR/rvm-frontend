import { useRouter } from "next/navigation";
import StatusIndicator from "@components/StatusIndicator";
import DeleteIcon from "@icons/DeleteIcon";
import EditIcon from "@icons/EditIcon";
import React from "react";
import { UserOutlined } from "@ant-design/icons";

import formattedDate from "@functions/formatDate";

export default function FormulaCard(props) {
  const router = useRouter();
  const {
    header,
    creater,
    status,
    date,
    form,
    code,
    details,
    onEdit,
    onDelete,
    approve,
    _id,
  } = props;

  let newHeader = "";

  switch (header) {
    case "prototype":
      newHeader = "Prototype Formula";
      break;
    case "concept":
      newHeader = "Concept Formula";
      break;
    case "saleCustom":
      newHeader = "Sale-Custom Formula";
      break;
    default:
      break;
  }

  const handleClick = () => {
    if (status === "publish") {
      router.push(`/main/formula/formulaDetail/${_id}`);
    }
  };

  return (
    <div
      className={`flex flex-col ${
        status === "publish" ? `cursor-pointer` : ""
      }`}
      onClick={status === "publish" ? handleClick : undefined}
    >
      {/* header */}
      <div className="bg-revomed-primary-light2 px-4 py-3 flex justify-between items-center rounded-t-lg">
        <div className="text-revomed-primary-blue text-[16px] font-bold">
          {newHeader}
        </div>
        <div className="flex gap-2">
          {status === "draft" ? (
            <>
              {onEdit && <EditIcon onClick={onEdit} />}
              {onDelete && <DeleteIcon onClick={onDelete} />}
            </>
          ) : status === "cancel" ? (
            <>{onDelete && <DeleteIcon onClick={onDelete} />}</>
          ) : status === "publish" ? (
            <div className="text-revomed-primary-blue">Approve : {approve}</div>
          ) : (
            <></>
          )}
        </div>
      </div>
      {/* body */}
      <div className="flex flex-col pt-4 px-6 pb-[22px] border-revomed-light-grey2 rounded-b-lg border-r-1 border-l-1 border-b-1">
        <div className="flex justify-between pb-3">
          <StatusIndicator status={status} />
          <div className="text-revomed-primary">{form}</div>
        </div>
        <div className="flex flex-col w-[242px] pb-3">
          <div className="text-revomed-primary-dark font-bold text-base">
            {details?.header}
          </div>
          <div className="text-revomed-primary h-[70px]">
            {details?.component.map((e, i) => [<p key={i}>{e}</p>])}
          </div>
        </div>
        <div className="flex justify-between">
          <div className="flex gap-2 text-revomed-primary-light1">
            <UserOutlined />
            {code} ({creater})
          </div>
          <div className="text-revomed-grey">{formattedDate(date)}</div>
        </div>
      </div>
    </div>
  );
}
