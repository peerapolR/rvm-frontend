import React from "react";
import { Button } from "@nextui-org/react";

const ButtonCommon = ({ text, icon, isLoading, className, onClick }) => {
  return (
    <Button isLoading={isLoading} onPress={onClick} className={className}>
      {text}
    </Button>
  );
};

export default ButtonCommon;
