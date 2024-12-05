import React from "react";

export default function StatusIndicator(props) {
  const { status } = props;
  let bgColor = "";
  let content = "";

  switch (status) {
    case "draft":
      bgColor = "bg-revomed-light-grey1";
      content = "Draft";
      break;
    case "publish":
      bgColor = "bg-revomed-aqua";
      content = "Publish";
      break;
    case "success":
      bgColor = "bg-revomed-green";
      content = "Success";
      break;
    case "approve":
      bgColor = "bg-revomed-green";
      content = "Approve";
      break;
    case "decline":
      bgColor = "bg-revomed-red";
      content = "Decline";
      break;
    case "cancel":
      bgColor = "bg-revomed-red";
      content = "Cancel";
      break;
  }

  return (
    <div
      className={`min-w-[88px] rounded-full py-1 px-[26px] ${bgColor} text-revomed-white`}
    >
      {content}
    </div>
  );
}
