import { ConfigProvider } from "antd";
import React from "react";

export default function AntdConfigProvider({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgBase: "#F3F5FB",
          colorPrimary: "#004D7D",
          colorSecondary: "#DC818D",
          colorFillSecondary: "#fff",
          fontFamily: "LINESeedSans",
        },
        components: {
          Menu: {
            iconMarginInlineEnd: 16,
            activeBarBorderWidth: 0,
            itemColor: "#6F7489",
            itemHoverColor: "#DC818D",
            itemHoverBg: "#FCE5E7",
            itemSelectedColor: "#DC818D",
            itemSelectedBg: "#FCE5E7",
          },
          Button: {
            // defaultHoverBg: "#FDAEB8",
            // defaultHoverColor: "#fff",
          },
          Tabs: {
            cardBg: "#dedede",
          },
          Breadcrumb: {
            separatorColor: "#ABB1C1",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
