import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { abi, address } from "../../utils/constants";
import { I_HEADER_PROPS } from "./types";

export const Header = ({ account, setAccount }: I_HEADER_PROPS) => {
  const AyYildizIcon = require("../../utils/images/ay-yildiz.png");

  return (
    <header className="w-[95%] mx-auto md:w-full py-4 flex flex-row justify-between items-center">
      <div className="flex flex-row p-3 bg-slate-50 gap-2 w-full justify-center border-2 border-solid rounded-xl text-black hover:border-blue-500 hover:text-blue-500">
        <a href="/">
          <h1 className="text-2xl font-bold">SECİM2023 - ADMIN DASHBOARD</h1>
        </a>
      </div>
    </header>
  );
};
