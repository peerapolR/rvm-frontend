import React from "react";
import pptxgen from "pptxgenjs";
import { useRouter } from "next/navigation";

import BaseButton from "@components/BaseButton";

import { useNewProposalCTX } from "@contexts/NewProposalContext";

export default function FooterBar({ status, _id, reactPrint }) {
  const router = useRouter();
  const newProposalctx = useNewProposalCTX();
  const { proposedOrder, declineOrder } = newProposalctx;

  const handlePPT = () => {
    let pres = new pptxgen();
    let slide = pres.addSlide();

    // Image URL
    let proxyUrl = "https://cors-anywhere.herokuapp.com/";
    let imageUrl =
      "https://revomed.s3.ap-southeast-1.amazonaws.com/1738784703511-luggage%201.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAR6T5XXKMJYUDKHWE%2F20250205%2Fap-southeast-1%2Fs3%2Faws4_request&X-Amz-Date=20250205T194628Z&X-Amz-Expires=86400&X-Amz-Signature=79f03e49eb2d66a66cd92fadb93f96a4904ca7f935aef4589793c53c1d4469dd&X-Amz-SignedHeaders=host"; // Example image URL

    // Fetch image as base64
    fetch(proxyUrl + imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        let reader = new FileReader();
        reader.onloadend = function () {
          let base64Image = reader.result;

          // Add the image as base64 to the slide
          slide.addImage({
            data: base64Image,
            x: 1, // Optional: X position on the slide
            y: 1, // Optional: Y position on the slide
            w: 4, // Optional: Width of the image
            h: 3, // Optional: Height of the image
          });

          // Save the presentation
          pres.writeFile();
        };
        reader.readAsDataURL(blob);
      })
      .catch((error) => {
        console.error("Error fetching image: ", error);
      });
  };
  return (
    <>
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
