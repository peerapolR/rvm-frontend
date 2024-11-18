import React from "react";
import { message, Upload } from "antd";

import PlusUploadIconSvg from "@icons/PlusUploadIcon";

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: false,
  action: "https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

export default function PhotoSection() {
  return (
    <div className="h-56">
      <p className="mb-3 text-base">Photo</p>
      <div className="bg-revomed-white rounded-lg h-full">
        <Dragger {...props}>
          <p className="ant-upload-drag-icon">
            <PlusUploadIconSvg />
          </p>
          {/* <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p> */}
          <p className="ant-upload-hint">
            Click to drag and drop one in this area (.jpg, .png)
          </p>
        </Dragger>
      </div>
    </div>
  );
}
