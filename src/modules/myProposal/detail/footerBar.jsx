import React from "react";
import pptxgen from "pptxgenjs";
import { useRouter } from "next/navigation";

import BaseButton from "@components/BaseButton";

import { notification } from "antd";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

export default function FooterBar({
  status,
  _id,
  reactPrint,
  masterImage,
  ingredientImage,
}) {
  const router = useRouter();
  const newProposalctx = useNewProposalCTX();
  const { proposedOrder, declineOrder } = newProposalctx;

  const [api, contextHolder] = notification.useNotification();

  const getBase64FromUrl = async (url) => {
    let response = await fetch(url);
    let blob = await response.blob();
    return new Promise((resolve, reject) => {
      let reader = new FileReader();
      reader.onloadend = () => {
        let base64data = reader.result.split(",")[1]; // Remove data:image/jpeg;base64, part
        resolve(base64data);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handlePPT = async () => {
    let pres = new pptxgen();

    // List of multiple S3 image URLs

    const masterUrls = (masterImage || []) // Ensure it's an array
      .map((item) => item.ingredient_image)
      .filter((url) => url);
    const ingredientUrls = (ingredientImage || []) // Ensure it's an array
      .map((item) => item.ingredient_image)
      .filter((url) => url);

    const imageUrls = [...masterUrls, ...ingredientUrls];
    if (imageUrls.length > 0) {
      try {
        for (let url of imageUrls) {
          let slide = pres.addSlide(); // Create a new slide for each image
          let base64Image = await getBase64FromUrl(url);

          slide.addImage({
            x: 1,
            y: 1,
            // w: 5,
            // h: 3,
            data: `image/jpeg;base64,${base64Image}`,
          });
        }

        // Save the Presentation
        pres.writeFile({ fileName: "presentation.pptx" });
      } catch (error) {
        console.error("Error loading images:", error);
      }
    } else {
      openNotification();
    }
  };
  const openNotification = () => {
    api.info({
      message: `ไม่มีรูปภาพ`,
      // description:
      //   "This is the content of the notification. This is the content of the notification. This is the content of the notification.",
      placement: "top",
      showProgress: true,
      pauseOnHover: true,
    });
  };

  return (
    <>
      {contextHolder}
      {status === "pending" || status === "reject" ? (
        <div className="min-h-20 bg-revomed-white bottom-0 flex gap-5 justify-end pt-4 px-5">
          <BaseButton
            className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary bg-revomed-white border-1 border-revomed-secondary font-semibold"
            onClick={() => {
              router.back();
            }}
          >
            Back
          </BaseButton>
        </div>
      ) : status === "approve" ? (
        <div className="min-h-20 bg-revomed-white bottom-0 flex gap-5 justify-between pt-4 px-5">
          <div>
            <BaseButton
              className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary bg-revomed-white border-1 border-revomed-secondary font-semibold"
              onClick={() => {
                router.back();
              }}
            >
              Back
            </BaseButton>
          </div>
          <div className="gap-5 flex">
            <BaseButton
              className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary bg-revomed-white border-0 font-semibold"
              onClick={() => reactPrint()}
            >
              Print
            </BaseButton>
            <BaseButton
              className="w-[162px] h-[48px] py-3 px-10 text-revomed-white bg-revomed-secondary border-1 font-semibold"
              onClick={handlePPT}
            >
              Download
            </BaseButton>
            <BaseButton
              className="w-[162px] h-[48px] py-3 px-10 text-revomed-white bg-revomed-red border-0 font-semibold"
              onClick={() => {
                declineOrder(_id);
              }}
            >
              Decline
            </BaseButton>
            <BaseButton
              className="w-[162px] h-[48px] py-3 px-10 text-revomed-white bg-revomed-green border-0 font-semibold"
              onClick={() => {
                proposedOrder(_id);
              }}
            >
              Success
            </BaseButton>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
