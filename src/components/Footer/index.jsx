import React, { useState } from "react";
import { useRouter } from "next/navigation";
import BaseButton from "../BaseButton";
import ModalConfirm from "@components/ModalConfirm";

import { useFormulaCTX } from "@contexts/FormulaContext";

import { notification } from "antd";

export default function FooterBar(props) {
  const ctx = useFormulaCTX();
  const { addNewFormula } = ctx;
  const { setPath, path, newFormula, formulation, ingredientDose } = props;
  const [modal, setModal] = useState({
    type: "",
    isOpen: false,
  });

  const [api, contextHolder] = notification.useNotification();

  const openNotification = (text) => {
    api.info({
      message: text,
      // description:
      //   "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement: "top",
      showProgress: true,
      pauseOnHover: true,
    });
  };

  const checkValidNext = () => {
    if (
      !newFormula.dosage_form ||
      newFormula.dosage_form === "" ||
      !newFormula.formula_name ||
      newFormula.formula_name === "" ||
      !newFormula.formula_type ||
      newFormula.formula_type === "" ||
      formulation.length <= 0
    ) {
      openNotification("กรุณาระบุข้อมูลให้ครบถ้วน");
    } else {
      setPath("summary");
    }
    if (ingredientDose.length <= 0) {
      openNotification("กรุณาระบุสารที่ต้องการ");
    } else {
      ingredientDose.forEach((i) => {
        if (!i.dosageToUse || i.dosageToUse === "") {
          openNotification("กรุณากรอก Dosage ให้ครบถ้วน");
        } else {
          setPath("summary");
        }
      });
    }
  };

  const handleModal = (type) => {
    setModal({
      type,
      isOpen: true,
    });
  };

  const handlePublish = () => {
    addNewFormula();
    handleModal("success");
  };

  return (
    <div className="min-h-20 bg-revomed-white ">
      {contextHolder}
      <div className="flex gap-5 justify-between mx-5 pt-4">
        {path === "newFormula" ? (
          <div
            className="flex gap-4 font-bold items-center"
            style={{ fontSize: "16px" }}
          >
            {/* <div className="text-revomed-dark-grey">Total price:</div>
            <div className="text-revomed-primary">0.00 THB</div> */}
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <BaseButton
              className="p-3 text-revomed-secondary border-0 bg-revomed-white"
              onClick={() => handleModal("delete")}
            >
              Cancel
            </BaseButton>
          </div>
        )}
        <div className="flex gap-6 items-center">
          {path === "newFormula" ? (
            <>
              <BaseButton
                className="p-3 text-revomed-secondary border-0 bg-revomed-white"
                onClick={() => handleModal("delete")}
              >
                Cancel
              </BaseButton>
              <BaseButton
                className="p-3 text-revomed-secondary border-0 bg-revomed-white"
                onClick={() => handleModal("save")}
              >
                Save
              </BaseButton>
              <BaseButton
                // disabled
                className="w-[162px] h-[48px] py-3 px-10 border-1 border-revomed-secondary bg-revomed-secondary rounded-lg text-revomed-white"
                onClick={checkValidNext}
              >
                Next
              </BaseButton>
            </>
          ) : (
            <>
              <BaseButton
                className="p-3 text-revomed-secondary border-0 bg-revomed-white"
                onClick={() => handleModal("save")}
              >
                Save
              </BaseButton>
              <BaseButton
                className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary border-1 bg-revomed-white border-revomed-secondary"
                onClick={() => setPath("newFormula")}
              >
                Back
              </BaseButton>
              <BaseButton
                // disabled
                className="w-[162px] h-[48px] py-3 px-10 border-1 border-revomed-secondary bg-revomed-secondary rounded-lg text-revomed-white"
                onClick={handlePublish}
              >
                Publish
              </BaseButton>
            </>
          )}
        </div>
      </div>
      <ModalConfirm
        isOpen={modal.isOpen}
        type={modal.type}
        setModal={setModal}
        onClick={() => setModal({ type: "", isOpen: false })}
      />
    </div>
  );
}
