import React from "react";
import './MainNavbar.scss';
import { useResponsive } from "../../../hooks";
import { MainNavbarDesk } from "./MainNavbarDesk";
import { MainNavbarMobile } from "./MainNavbarMobile";


export const MainNavbar = () => {
  const { isFromMobile } = useResponsive();
  if(isFromMobile) return <MainNavbarMobile /> 
  else return <MainNavbarMobile />
}