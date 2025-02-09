import React, { useState, useEffect } from "react";
import { message, Upload } from "antd";

import PlusUploadIconSvg from "@icons/PlusUploadIcon";
import { useIngredientCTX } from "@contexts/IngredientContext";

const { Dragger } = Upload;

export default function PhotoSection({ photo }) {
  const ctx = useIngredientCTX();
  const { setNewIngredient } = ctx;

  const [img, setImg] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(photo);

  const props = {
    name: "ingredient_image",
    multiple: false,
    maxCount: 1,
    accept: "image/*",
    showUploadList: false,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        setImg(info.file.originFileObj);
        const objectUrl = URL.createObjectURL(info.file.originFileObj);
        setPreviewUrl(objectUrl);
      }
      if (status === "done") {
        if (
          !["image/jpeg", "image/png", "image/jpg"].includes(info.file.type)
        ) {
          message.error(`Please upload only Image File`);
          setImg(null);
          setPreviewUrl(null);
        } else {
          message.success(`${info.file.name} file uploaded successfully.`);
        }
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  useEffect(() => {
    if (img) {
      setNewIngredient((prevState) => ({
        ...prevState,
        ingredient_image: img,
      }));
    }
  }, [img]);

  return (
    <div className="h-56">
      <p className="mb-3 text-base">Photo</p>
      <div className="bg-revomed-white rounded-lg h-full">
        <Dragger {...props}>
          {previewUrl ? (
            <div className="flex justify-center">
              <div className="h-full w-24">
                <img
                  src={previewUrl}
                  alt="Uploaded Preview"
                  className="w-full object-contain min-h-0"
                />
              </div>
            </div>
          ) : (
            <>
              <p className="ant-upload-drag-icon">
                <PlusUploadIconSvg />
              </p>
              <p className="ant-upload-hint">
                Click to drag and drop one in this area (.jpg, .png)
              </p>
            </>
          )}
        </Dragger>
      </div>
    </div>
  );
}
