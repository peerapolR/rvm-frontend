import React from "react";
import Icon from "@ant-design/icons";
const ExportIconSvg = () => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.71 7.70892L11 5.40892V14.9989C11 15.2641 11.1054 15.5185 11.2929 15.706C11.4804 15.8936 11.7348 15.9989 12 15.9989C12.2652 15.9989 12.5196 15.8936 12.7071 15.706C12.8946 15.5185 13 15.2641 13 14.9989V5.40892L15.29 7.70892C15.383 7.80265 15.4936 7.87704 15.6154 7.92781C15.7373 7.97858 15.868 8.00472 16 8.00472C16.132 8.00472 16.2627 7.97858 16.3846 7.92781C16.5064 7.87704 16.617 7.80265 16.71 7.70892C16.8037 7.61596 16.8781 7.50536 16.9289 7.3835C16.9797 7.26164 17.0058 7.13093 17.0058 6.99892C17.0058 6.86691 16.9797 6.7362 16.9289 6.61434C16.8781 6.49248 16.8037 6.38188 16.71 6.28892L12.71 2.28892C12.6149 2.19788 12.5028 2.12651 12.38 2.07892C12.1365 1.9789 11.8635 1.9789 11.62 2.07892C11.4972 2.12651 11.3851 2.19788 11.29 2.28892L7.29 6.28892C7.19676 6.38216 7.1228 6.49285 7.07234 6.61467C7.02188 6.73649 6.99591 6.86706 6.99591 6.99892C6.99591 7.13078 7.02188 7.26135 7.07234 7.38317C7.1228 7.50499 7.19676 7.61568 7.29 7.70892C7.38324 7.80216 7.49393 7.87612 7.61575 7.92658C7.73757 7.97704 7.86814 8.00301 8 8.00301C8.13186 8.00301 8.26243 7.97704 8.38425 7.92658C8.50607 7.87612 8.61676 7.80216 8.71 7.70892ZM21 13.9989C20.7348 13.9989 20.4804 14.1043 20.2929 14.2918C20.1054 14.4793 20 14.7337 20 14.9989V18.9989C20 19.2641 19.8946 19.5185 19.7071 19.706C19.5196 19.8936 19.2652 19.9989 19 19.9989H5C4.73478 19.9989 4.48043 19.8936 4.29289 19.706C4.10536 19.5185 4 19.2641 4 18.9989V14.9989C4 14.7337 3.89464 14.4793 3.70711 14.2918C3.51957 14.1043 3.26522 13.9989 3 13.9989C2.73478 13.9989 2.48043 14.1043 2.29289 14.2918C2.10536 14.4793 2 14.7337 2 14.9989V18.9989C2 19.7946 2.31607 20.5576 2.87868 21.1202C3.44129 21.6828 4.20435 21.9989 5 21.9989H19C19.7956 21.9989 20.5587 21.6828 21.1213 21.1202C21.6839 20.5576 22 19.7946 22 18.9989V14.9989C22 14.7337 21.8946 14.4793 21.7071 14.2918C21.5196 14.1043 21.2652 13.9989 21 13.9989Z"
        fill="#004D7D"
      />
    </svg>
  );
};

export default function ExportIcon(props) {
  return <Icon component={ExportIconSvg} {...props} />;
}