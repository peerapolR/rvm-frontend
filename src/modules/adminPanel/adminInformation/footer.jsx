import BaseButton from "@components/BaseButton";
import { useRouter } from "next/navigation";

export default function FooterBar({ adminData, updateUserDetail, _id }) {
  const router = useRouter();

  return (
    <footer className="min-h-20 bg-revomed-white">
      <div className="flex gap-5 justify-end mx-5 pt-4">
        <BaseButton
          className="w-[162px] h-[48px] py-3 px-10 bg-revomed-primary rounded-lg text-revomed-white"
          onClick={() => {
            updateUserDetail(_id, adminData);
          }}
        >
          Save Change
        </BaseButton>
        <BaseButton
          className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary border-2 bg-revomed-white border-revomed-secondary"
          onClick={() => {
            router.back();
          }}
        >
          Back
        </BaseButton>
      </div>
    </footer>
  );
}
