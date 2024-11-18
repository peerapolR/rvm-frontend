import React, { useEffect, useState } from "react";
import Image from "next/image";
export default function DosageCard(props) {
  const {
    image,
    name,
    onClick,
    title,
    selected,
    id,
    i,
    showOnly = false,
  } = props;
  const [found, setFound] = useState(false);

  useEffect(() => {
    setFound(() => (id === selected ? true : false));
  }, [selected]);

  return (
    <div
      key={i}
      className={
        showOnly
          ? `flex items-center gap-[45px] w-[300px] h-[110px] bg-revomed-white rounded-2xl border border-revomed-light-grey2`
          : `flex items-center gap-[45px] w-[348px] h-[110px] bg-revomed-white rounded-2xl border cursor-pointer
        ${
          found ? "border-revomed-primary-light1" : "border-revomed-light-grey2"
        }
        `
      }
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
