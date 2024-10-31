import React from "react";
import { Input } from "@nextui-org/input";

const InputLabel = ({
  label,
  placeholder,
  icon,
  disabled,
  isInvalid,
  errorMessage,
  value,
  onChange,
}) => {
  return (
    <div className="flex flex-col w-full flex-wrap md:flex-nowrap gap-5 text-revomed-dark-grey text-base">
      <Input
        type="text"
        variant="bordered"
        labelPlacement="outside"
        radius="sm"
        placeholder={placeholder ? placeholder : " "}
        label={label}
        disabled={disabled}
        startContent={icon ? icon : ""}
        isInvalid={isInvalid}
        errorMessage={errorMessage}
        onChange={onChange}
        value={value}
      />
    </div>
  );
};

export default InputLabel;
