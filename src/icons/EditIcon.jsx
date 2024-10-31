import React from "react";
import Icon from "@ant-design/icons";
const EditIconSvg = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5 17.998H9.24C9.37161 17.9987 9.50207 17.9735 9.62391 17.9238C9.74574 17.874 9.85656 17.8007 9.95 17.708L16.87 10.778L19.71 7.99799C19.8037 7.90502 19.8781 7.79442 19.9289 7.67256C19.9797 7.5507 20.0058 7.42 20.0058 7.28799C20.0058 7.15597 19.9797 7.02527 19.9289 6.90341C19.8781 6.78155 19.8037 6.67095 19.71 6.57799L15.47 2.28799C15.377 2.19426 15.2664 2.11986 15.1446 2.06909C15.0227 2.01833 14.892 1.99219 14.76 1.99219C14.628 1.99219 14.4973 2.01833 14.3754 2.06909C14.2536 2.11986 14.143 2.19426 14.05 2.28799L11.23 5.11799L4.29 12.048C4.19732 12.1414 4.12399 12.2522 4.07423 12.3741C4.02446 12.4959 3.99924 12.6264 4 12.758V16.998C4 17.2632 4.10536 17.5176 4.29289 17.7051C4.48043 17.8926 4.73478 17.998 5 17.998ZM14.76 4.40799L17.59 7.23799L16.17 8.65799L13.34 5.82799L14.76 4.40799ZM6 13.168L11.93 7.23799L14.76 10.068L8.83 15.998H6V13.168ZM21 19.998H3C2.73478 19.998 2.48043 20.1033 2.29289 20.2909C2.10536 20.4784 2 20.7328 2 20.998C2 21.2632 2.10536 21.5176 2.29289 21.7051C2.48043 21.8926 2.73478 21.998 3 21.998H21C21.2652 21.998 21.5196 21.8926 21.7071 21.7051C21.8946 21.5176 22 21.2632 22 20.998C22 20.7328 21.8946 20.4784 21.7071 20.2909C21.5196 20.1033 21.2652 19.998 21 19.998Z"
        fill="#004D7D"
      />
    </svg>
  );
};

export default function EditIcon(props) {
  return <Icon component={EditIconSvg} {...props} />;
}
