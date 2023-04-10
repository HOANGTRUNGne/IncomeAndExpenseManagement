import { MenuProps } from "antd";
import { HeaderDesktop } from "./header-desktop";
import { HeaderMobile } from "./header-mobile";

export function Header() {
  return (
    <>
      <HeaderMobile />
      <HeaderDesktop />
    </>
  );
}
