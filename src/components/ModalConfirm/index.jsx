import BaseButton from "@components/BaseButton";
import DiskSaveIcon from "@icons/ModalConfirm/DiskSaveIcon";
import SmileIcon from "@icons/ModalConfirm/SmileIcon";
import TrashIconInModal from "@icons/ModalConfirm/TrashIcon";
import UnpublishIcon from "@icons/ModalConfirm/UnpublishIcon";
import { Modal } from "antd";
import React, { useEffect, useState } from "react";

export default function ModalConfirm(props) {
  const { type = "success", onClick, setConfirmOpen, confirmOpen } = props;
  const [content, setContent] = useState(null);

  useEffect(() => {
    switch (type) {
      case "success":
        setContent(
          <>
            <SmileIcon className="text-#07A804 mb-6" />
            <div className="flex flex-col gap-2 mb-[60px]">
              <div className="text-xl text-#152142">Success !</div>
              <div className="text-#6F7489" style={{ fontSize: "16px" }}>
                Formula ของคุณได้ถูกเผยแพร่
                <br />
                เรียบร้อยแล้ว
              </div>
            </div>
            <BaseButton
              className="h-12 bg-revomed-primary py-3 px-6 text-revomed-white font-bold"
              style={{ fontSize: "16px" }}
              onClick={onClick}
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
              <div className="text-xl text-#152142">Unpublish Formula?</div>
              <div className="text-#6F7489" style={{ fontSize: "16px" }}>
                ยืนยันการยกเลิกเผยแพร่
                <br />
                Formula นี้
              </div>
            </div>
            <div className="flex justify-center gap-6">
              <BaseButton
                className="border-2 border-revomed-primary rounded-lg text-revomed-primary py-3 px-6"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </BaseButton>
              <BaseButton
                className="rounded-lg bg-revomed-primary text-revomed-white py-3 px-6"
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
              <div className="text-xl text-#152142">Delete Formula?</div>
              <div className="text-#6F7489" style={{ fontSize: "16px" }}>
                หากลบแล้วคุณจะไม่สามารถ
                <br />
                นำข้อมูลนี้กลับมาได้
              </div>
            </div>
            <div className="flex justify-center gap-6">
              <BaseButton
                className="border-2 border-revomed-primary rounded-lg text-revomed-primary py-3 px-6"
                onClick={() => setConfirmOpen(false)}
              >
                Cancel
              </BaseButton>
              <BaseButton
                className="rounded-lg bg-revomed-primary text-revomed-white py-3 px-6"
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
              <div className="text-xl text-#152142">Save Information?</div>
              <div className="text-#6F7489" style={{ fontSize: "16px" }}>
                คุณต้องการบันทึกข้อมูลหรือไม่
              </div>
            </div>
            <div className="flex justify-center gap-6">
              <BaseButton
                className="border-2 border-revomed-primary rounded-lg text-revomed-primary py-3 px-6"
                onClick={() => setConfirmOpen(false)}
              >
                Discard
              </BaseButton>
              <BaseButton
                className="rounded-lg bg-revomed-primary text-revomed-white py-3 px-6"
                onClick={onClick}
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
  }, [confirmOpen]);

  return (
    <Modal
      open={confirmOpen}
      className="h-[420px]"
      width={363}
      footer={false}
      closeIcon={false}
    >
      <div className="flex flex-col items-center justify-center">{content}</div>
    </Modal>
  );
}
