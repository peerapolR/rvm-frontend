import localFont from "next/font/local";
import "./globals.css";
import { Inter } from "next/font/google";
import { Header, Content } from "antd/es/layout/layout";
import { Layout } from "antd";
import ContextProvider from "@contexts/UserAuthContext";
import PathProvider from "@contexts/PathContext";
import AntdConfigProvider from "@provider/AntdConfigProvider";
import SideBar from "@components/SideBar";
import HeaderBar from "@components/HeaderBar";

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Revomed - CRM",
  description: "Generated by Cy-Click",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body
        className={inter.className}
        style={{ fontFamily: "LINESeedSans", minHeight: "100vh" }}
      >
        <ContextProvider>
          <AntdConfigProvider>
            <PathProvider>
              <Layout style={{ minHeight: "100vh" }}>
                <SideBar />
                <Layout>
                  <HeaderBar />
                  <Content>{children}</Content>
                </Layout>
              </Layout>
            </PathProvider>
          </AntdConfigProvider>
        </ContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;