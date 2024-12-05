import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import BaseButton from "@components/BaseButton";
import DiskSaveIcon from "@icons/ModalConfirm/DiskSaveIcon";
import SmileIcon from "@icons/ModalConfirm/SmileIcon";
import TrashIconInModal from "@icons/ModalConfirm/TrashIcon";
import UnpublishIcon from "@icons/ModalConfirm/UnpublishIcon";
import { Modal } from "antd";

import { useFormulaCTX } from "@contexts/FormulaContext";

export default function ModalConfirm(props) {
  const router = useRouter();
  const ctx = useFormulaCTX();
  const { saveDraftFormula } = ctx;
  const { type, onClick, isOpen, setModal } = props;
  const [content, setContent] = useState(null);

  const confirmPublish = () => {
    setModal({ type: "", isOpen: false });
    router.push("/main/formula");
  };

  useEffect(() => {
    switch (type) {
      case "success":
        setContent(
          <>
            <SmileIcon className="mb-6" />
            <div className="flex flex-col gap-2 mb-[60px]">
              <div className="text-xl text-#152142 font-bold">Success !</div>
              <div className="text-#6F7489" style={{ fontSize: "16px" }}>
                Formula ของคุณได้ถูกเผยแพร่
                <br />
                เรียบร้อยแล้ว
              </div>
            </div>
            <BaseButton
              className="h-12 w-[132px] bg-revomed-primary py-3 px-6 text-revomed-white font-bold "
              style={{ fontSize: "16px" }}
              onClick={confirmPublish}
            >
              Got it
            </BaseButton>
          </>
        );
        break;
      case "unPublish":
        setContent(
          <>
            <UnpublishIcon className="text-revomed-primary mb-6" />
            <div className="flex flex-col gap-2 mb-[84px]">
              <div className="text-xl text-#152142 font-bold">
                Unpublish Formula?
              </div>
              <div className="text-#6F7489" style={{ fontSize: "16px" }}>
                ยืนยันการยกเลิกเผยแพร่
                <br />
                Formula นี้
              </div>
            </div>
            <div className="flex justify-center gap-6">
              <BaseButton
                className="border-2 h-12 w-[132px] border-revomed-primary rounded-lg text-revomed-primary py-3 px-6"
                onClick={() => setModal({ type: "", isOpen: false })}
              >
                Cancel
              </BaseButton>
              <BaseButton
                className="rounded-lg h-12 w-[132px] bg-revomed-primary text-revomed-white py-3 px-6"
                onClick={onClick}
              >
                Confirm
              </BaseButton>
            </div>
          </>
        );
        break;
      case "delete":
        setContent(
          <>
            <TrashIconInModal className="text-revomed-red mb-6" />
            <div className="flex flex-col gap-2 mb-[84px]">
              <div className="text-xl text-#152142 font-bold">
                Delete Formula?
              </div>
              <div className="text-#6F7489" style={{ fontSize: "16px" }}>
                หากลบแล้วคุณจะไม่สามารถ
                <br />
                นำข้อมูลนี้กลับมาได้
              </div>
            </div>
            <div className="flex justify-center gap-6">
              <BaseButton
                className="border-2 h-12 w-[132px] border-revomed-primary rounded-lg text-revomed-primary py-3 px-6"
                onClick={() => setModal({ type: "", isOpen: false })}
              >
                Cancel
              </BaseButton>
              <BaseButton
                className="rounded-lg h-12 w-[132px] bg-revomed-primary text-revomed-white py-3 px-6"
                onClick={onClick}
              >
                Delete
              </BaseButton>
            </div>
          </>
        );
        break;
      case "save":
        setContent(
          <>
            <div className="flex items-center justify-center">
              <DiskSaveIcon className="text-revomed-primary mb-6" />
            </div>
            <div className="flex flex-col gap-2 mb-[84px]">
              <div className="text-xl text-#152142 font-bold">
                Save Information?
              </div>
              <div className="text-#6F7489" style={{ fontSize: "16px" }}>
                คุณต้องการบันทึกข้อมูลหรือไม่
              </div>
            </div>
            <div className="flex justify-center gap-6">
              <BaseButton
                className="border-2 h-12 w-[132px] border-revomed-primary rounded-lg text-revomed-primary py-3 px-6"
                onClick={() => setModal({ type: "", isOpen: false })}
              >
                Discard
              </BaseButton>
              <BaseButton
                className="rounded-lg h-12 w-[132px] bg-revomed-primary text-revomed-white py-3 px-6"
                onClick={saveDraftFormula}
              >
                Save
              </BaseButton>
            </div>
          </>
        );
        break;
      default:
        break;
    }
  }, [isOpen]);

  return (
    <Modal
      open={isOpen && type}
      // style={{height : '420px'}}
      height={420}
      width={363}
      footer={false}
      closeIcon={false}
      className="text-center"
    >
      <div className="flex flex-col items-center justify-center h-[400px]">
        {content}
      </div>
    </Modal>
  );
}
