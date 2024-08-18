import { ReactNode } from "react";
import { SideBar } from "./_components/sideBar";

export default function DashboardRootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <div className="min-h-screen flex ">
        <SideBar />
        <div className="relative left-52 w-[calc(100%-13rem)] bg-slate-200">
          {children}
        </div>
      </div>
    </>
  );
}
