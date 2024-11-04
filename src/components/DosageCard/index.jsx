import React, { useEffect, useState } from "react";
import Image from "next/image";
export default function DosageCard(props) {
  const { image, name, onClick, title, selected, id, i } = props;
  const [found, setFound] = useState(false);

  useEffect(() => {
    setFound(() => selected?.includes(id));
  }, [selected]);

  return (
    <div
      key={i}
      className={`flex items-center gap-[45px] w-[348px] h-[110px] bg-revomed-white rounded-2xl border cursor-pointer
        ${
          found ? "border-revomed-primary-light1" : "border-revomed-light-grey2"
        }
        `}
      onClick={onClick}
    >
      <Image src={image} alt={name} width={104} height={108}></Image>
      <div
        className="text-revomed-primary font-bold flex flex-col"
        style={{ fontSize: "16px", lineHeight: "24px" }}
      >
        {name}
        {title ? (
          <>
            <br />
            <>{title}</>
          </>
        ) : null}
      </div>
    </div>
  );
}
