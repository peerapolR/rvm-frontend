import BaseButton from "@components/BaseButton";
import { useRouter } from "next/navigation";

export default function FooterBar() {
  
  const router = useRouter();

  return (
    <footer className="min-h-20 bg-revomed-white">
      <div className="flex gap-5 justify-end mx-5 pt-4">
        <BaseButton
          className="w-[162px] h-[48px] py-3 px-10 text-revomed-secondary border-2 bg-revomed-white border-revomed-secondary"
          
          onClick={() => {
            router.push("/main/adminPanel");
          }}
        >
          Back
        </BaseButton>
        
      </div>
    </footer>
  );
}
// className={`py-2 px-4 rounded-md text-white w-full ${
//           accessibility ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-400 cursor-not-allowed'
//         }`}
