import React from "react";
import Image from "next/image";
import white_logo from '/public/white_logo.png'

export default function Header() {
  return <div className="h-24 bg-neutral-800 text-white flex flex-row items-center pl-20 w-screen">
        <Image
            src={white_logo}
            alt="css_profile"
            width={180}
            height={180}
            className={
              "z-10 opacity-95 mr-40 max-sm:mr-0 hover:cursor-pointer hover:scale-125 easi-in duration-300 max-sm:p-2"
            }
          />
  </div>;
}