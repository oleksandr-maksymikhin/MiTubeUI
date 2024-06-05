import "../../Styles/Peripheral/Toolbar.scss";

import menu_icon from "../../Assets/Icons/menu.svg";
import search_icon from "../../Assets/Icons/search.svg";
import notification_icon from "../../Assets/Icons/bell.svg";
import logo from "../../logo.svg";
import placeholder from "../../Assets/Icons/placeholder.svg";
import icon_back from "../../Assets/Icons/arrow_back.svg";
import userContext from '../../Context/UserContext';
import Search from "../Wrappers/Search";
import MainMenu from "../Modals/MainMenu/MainMenu";
import { useContext, useState, useEffect, useRef } from "react";
import { ActiveContentContext } from "../../Context/ActiveContentContext";
import { ThemeContext } from "../../Context/ThemeContext";
import VideoGallery from "../Common/VideoGallery";
import serverContext from "../../Context/ServerContext";

import Bee from "../../Assets/Images/bee.jpg";
export default function ToolbarDesktop({ openFilter }) {
  const { activeContent, setActiveContent, toolbarState, sidebarState } =
    useContext(ActiveContentContext);
  const { setTheme } = useContext(ThemeContext);
  const {user,setUser}=useContext(userContext);
  const { serverPort } = useContext(serverContext);
  let activeIcon =
    activeContent.type.name === "Studio" ||
    activeContent.type.name === "Settings"
      ? icon_back
      : menu_icon;

  const toggleNav = () => {
    let sidenav = document.getElementById("mySidenav");

    if (
      activeContent.type.name === "Studio" ||
      activeContent.type.name === "Settings"
    ) {
      setActiveContent(<VideoGallery />);
    } else {
      if (sidenav.children[0].classList.contains("xt-sidebar")) {
        sidenav.dispatchEvent(new Event("shrink"));
      } else {
        sidenav.dispatchEvent(new Event("expand"));
      }
      sidenav.children[0].classList.toggle("xt-sidebar");
      document.getElementById("myContent").classList.toggle("xt-content");
    }

    if (sidebarState === "removed") {
      sidenav.classList.toggle("removed");
    } else {
      sidenav.classList.remove("removed");
    }
  };

  const switchTheme = () => {
    let logo = document.getElementsByClassName("logo-icon");
    logo = logo[0];
    logo.classList.toggle("on");
    let theme = document.getElementsByTagName("html")[0];
    let color =
      theme.getAttribute("data-color-theme") === "light" ? "dark" : "light";
    theme.setAttribute("data-color-theme", color);
    setTheme(color);
  };

  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const dropdownRef = useRef(null);
  const mainMenuRef = useRef(null);
  const [selected, setSelected] = useState(null);

  let [refDropdown, setRefDropdown] = useState(null);


  useEffect(() => {
    function handleClickOutsideMenu(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        mainMenuRef.current &&
        !mainMenuRef.current.contains(event.target)
      ) {
        const insideImage = dropdownRef.current.contains(event.target);
        const insideMenu = mainMenuRef.current.contains(event.target);
        console.log(
          "click within image button:" +
            insideImage +
            " within menu:" +
            insideMenu
        );

        setShowDropdownMenu(false);
        console.log("handleClickOutsideMenu outside click");
        setSelected(null);
      }
    }

    document.addEventListener("click", handleClickOutsideMenu);

    return () => {
      document.removeEventListener("click", handleClickOutsideMenu);
    };
  }, []);

  function handleDropdownToggle() {
    
    if (!showDropdownMenu) {
      let userData = JSON.parse(localStorage.getItem("userCookie"));
      userData ? setUser(userData) : setUser("user");
    }
    setShowDropdownMenu(!showDropdownMenu);
    setRefDropdown(null);
  }

  const [requestText, setRequestText] = useState("");

  const onSearch = async () => {
    try {
      const response = await fetch(
        `${serverPort}/Videos/search/${requestText}`
      );
      if (!response.ok) {
        console.log("Error HTTP:" + response.status);
        return null;
      } else {
        const data = await response.json();
        setActiveContent(<Search videos={data} />);
      }
    } catch (error) {
      console.error("Error search:", error);
      throw error;
    }
  };

  const showSearchOnEnter = async (e) => {
    if (e.key === "Enter") {
      try {
        await onSearch(requestText);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const showSearchOnClick = async () => {
    await onSearch();
  };

  return (
    <div className={"toolbar " + toolbarState}>
      <span className="sub-menu title">
        <span className="icon-btn" onClick={toggleNav}>
          <img className="icn" src={activeIcon} alt="Menu Button" />
        </span>
        <span className="logo toggle" onClick={switchTheme}>
          <img className="logo-icon" src={logo} alt="Logo switch" />
        </span>
      </span>

      <span className="sub-menu search">
        <input
          type="text"
          placeholder=""
          onKeyDown={showSearchOnEnter}
          value={requestText}
          onChange={(e) => setRequestText(e.target.value)}
        />

        <button
          onClick={showSearchOnClick}
        >
          <img id="search-btn" alt="Magnifying glass icon" src={search_icon} />
        </button>
      </span>

      <span className="sub-menu profile">
        <button
           ref={dropdownRef}
          className="dropbtn icon-button icon-btn"
          onClick={handleDropdownToggle}
        >
          <img
            src={`${
              user
                ? serverPort + "/showImage?url=" + user.posterUrl
                : Bee
            }`}
            alt="studio"
          />
        </button>
        <span
          id="myDropdownMenu"
          className={`dropdown-contentMenu ${showDropdownMenu ? "show" : ""}`}
        >
          {showDropdownMenu && user && (
            <MainMenu
              key={user?.id + 1}
              user={user}
              defaultMenu={refDropdown}
              setShowDropdownMenu={setShowDropdownMenu}
              mainMenuRef={mainMenuRef}
              selected={selected}
              setSelected={setSelected}
            />
          )}
        </span>
      </span>
    </div>
  );
}
