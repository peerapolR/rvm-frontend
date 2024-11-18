import { Button } from "antd";
import { BaseButtonProps } from "antd/es/button/button";
import React from "react";

export default function BaseButton(props) {
  const {
    children,
    type,
    loading,
    icon,
    iconPosition = "end",
    className,
    onClick,
    disabled = false,
  } = props;
  return (
    <Button
      className={className}
      type={type}
      loading={loading}
      icon={icon}
      iconPosition={iconPosition}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </Button>
  );
}
