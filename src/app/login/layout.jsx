import React from "react";

const title = "Login";

const RootLayout = ({ children }) => {
  return (
    <div
      className="w-screen min-h-screen bg-no-repeat bg-cover"
      style={{
        backgroundImage: `url('/assets/background/loginBG.png')`,
      }}
    >
      {children}
    </div>
  );
};

export default RootLayout;
