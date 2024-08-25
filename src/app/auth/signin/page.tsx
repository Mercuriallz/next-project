import React from "react";
import Image from "next/image";
import { Metadata } from "next";
import Signin from "@/components/Auth/Signin";
import InternalBackground from "@/../public/background/internalBackground.png";

export const metadata: Metadata = {
  title: "Admin Login",
  description: "Admin Login",
};

const SignIn: React.FC = () => {
  return (
    <>
      <div className="relative flex h-screen items-center justify-center rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        {/* <Image
          src={InternalBackground}
          alt="Admin Internal Background"
          layout="fill"
          className="z-0 object-cover"
        /> */}
        <div className="z-10 w-full max-w-md">
          <div className="rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
            <Signin />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
