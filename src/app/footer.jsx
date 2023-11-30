import React from "react";

export default function Footer() {
  return (<div className="h-52 w-full bg-neutral-100 flex items-center justify-center">
  <div className="flex flex-col align-middle items-center text-neutral-500 text-lg max-sm:flex max-sm:flex-col max-sm:justify-center max-sm:items-center">
    <p className="p-6 text-2xl max-sm:text-sm max-sm:p-7">© 2023 Liventi Inc, Pembroke Park, FL 33009</p>
    <p className="text-sm p-1 max-sm:text-[10px] max-sm:text-center">Boogie Toes®, Piero Liventi® products are imported and/or manufactured by Inversiones JLB Import LLC,</p>
    <p className="text-xs max-sm:text-[8.5px] max-sm:text-center max-md:mt-1">and distributed exclusively in USA by Liventi Inc</p>
  </div>
</div>);
}
