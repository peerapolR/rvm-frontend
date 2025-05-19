import BaseButton from "@components/BaseButton";
import { useRouter } from "next/navigation";

export default function FooterBar({ accessibility, passwordSet, sendDataToParent }) {
  const router = useRouter();

  const handleSave = () => {
    sendDataToParent(true)
  };
  
  return (
    <footer className="min-h-20 bg-revomed-white">
      <div className="flex gap-5 justify-between mx-5 pt-4">
        <BaseButton
          className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary border-0 bg-revomed-white"
          onClick={() => {
            router.push("/main");
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
            onClick={handleSave}
          >
            Save
          </BaseButton>
        </div>
      </div>
    </footer>
  );
}
// className={`py-2 px-4 rounded-md text-white w-full ${
//           accessibility ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
//         }`}
