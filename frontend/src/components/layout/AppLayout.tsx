import React, { ReactNode } from "react";
import { Header } from "./Header";

interface AppLayoutProps {
  children: ReactNode;
  showNav?: boolean;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children, showNav = true }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        width: "100vw",
        overflow: "hidden",
        backgroundColor: "#090d16",
      }}
    >
      {showNav && <Header />}
      <main style={{ flex: 1, position: "relative", overflow: "hidden", width: "100%", height: "100%" }}>
        {children}
      </main>
    </div>
  );
};
