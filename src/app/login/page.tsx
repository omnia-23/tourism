import Image from "next/image";
import logo from "@/assets/logo.png";
import { LoginForm } from "./Form/LoginForm";
export default function LoginPage() {
  return (
    <>
      <div className="flex h-screen ">
        <div className="flex-1 grid place-items-center">
          <Image
            className="w-2/3"
            src={logo}
            alt="logo"
            width={500}
            height={500}
          />
        </div>
        <div className="bg-blue-200 w-3/5 flex items-center px-10">
          <LoginForm />
        </div>
      </div>
    </>
  );
}
