import React from "react";
import { useRouter } from "next/navigation";
import BaseButton from "../BaseButton";

export default function FooterBar(props) {
  const { setPath, path } = props;
  const router = useRouter();
  return (
    <div className="min-h-20 bg-revomed-white mt-[11.5rem]">
      <div className="flex gap-5 justify-between mx-5 pt-4">
        {path === "newFormula" ? (
          <div
            className="flex gap-4 font-bold items-center"
            style={{ fontSize: "16px" }}
          >
            <div className="text-revomed-dark-grey">Total price:</div>
            <div className="text-revomed-primary">0.00 THB</div>
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <BaseButton className="p-3 text-revomed-secondary border-0 bg-revomed-white">
            Cancel
          </BaseButton>
          </div>
        )}
        <div className="flex gap-6 items-center">
          {path === "newFormula" ? (
            <>
              {" "}
              <BaseButton className="p-3 text-revomed-secondary border-0 bg-revomed-white">
                Cancel
              </BaseButton>
              <BaseButton className="p-3 text-revomed-secondary border-0 bg-revomed-white">
                Save
              </BaseButton>
              <BaseButton
                // disabled
                className="w-[162px] h-[48px] py-3 px-10 border-1 border-revomed-secondary bg-revomed-secondary rounded-lg text-revomed-white"
                onClick={()=>setPath("summary")}
              >
                Next
              </BaseButton>
            </>
          ) : (
            <>
              {" "}
              <BaseButton className="p-3 text-revomed-secondary border-0 bg-revomed-white">
                Save
              </BaseButton>
              <BaseButton 
              className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary border-1 bg-revomed-white border-revomed-secondary"
               onClick={()=>setPath("newFormula")}>
                Back
              </BaseButton>
              <BaseButton
                // disabled
                className="w-[162px] h-[48px] py-3 px-10 border-1 border-revomed-secondary bg-revomed-secondary rounded-lg text-revomed-white"
                // onClick={}
              >
                Publish
              </BaseButton>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
