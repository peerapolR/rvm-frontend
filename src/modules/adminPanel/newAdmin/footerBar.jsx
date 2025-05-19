import BaseButton from "@components/BaseButton";
import { useRouter } from "next/navigation";

export default function FooterBar({
  accessibility,
  sendDataToParent,
  adminData,
  register,
}) {
  const router = useRouter();

  const handleCreate = () => {
    register(adminData);
    sendDataToParent(true);
  };

  return (
    <footer className="min-h-20 bg-revomed-white">
      <div className="flex gap-5 justify-between mx-5 pt-4">
        <BaseButton
          className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary border-0 bg-revomed-white"
          onClick={() => {
            router.back();
          }}
        >
          Cancel
        </BaseButton>
        <div className="flex gap-5">
          <BaseButton
            disabled={!accessibility}
            className={`w-[162px] h-[48px] py-3 px-10  border-0 ${
              accessibility
                ? "bg-[#DC818D] text-[#FCFCFC]"
                : "bg-[#E0E3EB] text-[#ABB1C1]"
            }`}
            onClick={handleCreate}
          >
            Create
          </BaseButton>
        </div>
      </div>
    </footer>
  );
}
