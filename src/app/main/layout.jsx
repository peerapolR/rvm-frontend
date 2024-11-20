import localFont from "next/font/local";
// import "./globals.css";
import { Inter } from "next/font/google";
import { Header, Content } from "antd/es/layout/layout";
import { Layout } from "antd";
// import ContextProvider from "@contexts/UserAuthContext";
import PathProvider from "@contexts/PathContext";
import AntdConfigProvider from "@provider/AntdConfigProvider";
import SideBar from "@components/SideBar";
import HeaderBar from "@components/HeaderBar";
import IngredientProvider from "@contexts/IngredientContext";
import FormulaProvider from "@contexts/FormulaContext";
import NewProposalProvider from "@contexts/NewProposalContext";

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
  title: "PCR - Product Concept Request",
  description: "Generated by Cy-Click",
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className} style={{ fontFamily: "LINESeedSans" }}>
        <AntdConfigProvider>
          <PathProvider>
            <Layout>
              <SideBar />
              <Layout>
                <HeaderBar />
                <IngredientProvider>
                  <FormulaProvider>
                    <NewProposalProvider>
                      <Content>{children}</Content>
                    </NewProposalProvider>
                  </FormulaProvider>
                </IngredientProvider>
              </Layout>
            </Layout>
          </PathProvider>
        </AntdConfigProvider>
      </body>
    </html>
  );
};

export default RootLayout;
