import { PlatformContext } from "../../Context/PlatformContext";
import { useContext, useEffect } from "react";

import SidebarDesktop from "../Desktop/Sidebar";
import SidebarMobile from "../Mobile/Sidebar";
import { ActiveContentContext } from "../../Context/ActiveContentContext";

import "../../Styles/Peripheral/Sidebar.scss";

export default
function Sidebar() {
 
  const { platform } = useContext(PlatformContext);
  const { sidebarState } = useContext(ActiveContentContext);
  
  const viewReset = () => {
    document.getElementById("mySidenav").children[0].classList.remove("xt-sidebar");
    document.getElementById("myContent").classList.remove("xt-content");
    document.getElementById("mySidenav").dispatchEvent(new Event("shrink"));
  }

  useEffect(() => {
    let text = document.querySelectorAll(".sidenav-desktop .menu-item h3");
    let icon = document.querySelectorAll(".sidenav-desktop .menu-icon");

    document.getElementById("mySidenav").addEventListener('expand', () => {
      for (let i = 0; i < text.length; i++) {
        icon[i].classList.remove("menu-item-collapsed")
        text[i].classList.remove("hidden");
      }
    });

    document.getElementById("mySidenav").addEventListener('shrink', () => {
      for (let i = 0; i < text.length; i++) {
        icon[i].classList.add("menu-item-collapsed")
        text[i].classList.add("hidden");
      }
    })

  });

  return (
    <div className={"sidebar-container " + sidebarState} id="mySidenav" onClick={viewReset}>
      {platform === "desktop" ? <SidebarDesktop/> : <SidebarMobile/>}
    </div>
  )
}
