import React from "react";
import { Outlet } from "react-router-dom";
import Coding from "@/page/coding/main";
import Cpp from "@/page/coding/cpp";
const RouterCoding = {
  path: "/coding",
  element: Outlet,
  children: [
    {
      path: "",
      element: Coding,
    },
    {
      path: "cpp",
      element: Cpp,
    },
  ],
};

export default RouterCoding