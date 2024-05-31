import "../../../Styles/MainMenu/MainMenu.scss";
import toas_icon from "../../../Assets/Icons/MainMenu/toas.svg";
import day_icon from "../../../Assets/Icons/MainMenu/day.svg";
import change_icon from "../../../Assets/Icons/MainMenu/change.svg";
import exit_icon from "../../../Assets/Icons/MainMenu/exit.svg";
import langv_icon from "../../../Assets/Icons/MainMenu/langv.svg";
import more_icon from "../../../Assets/Icons/MainMenu/more.svg";
import savemode_icon from "../../../Assets/Icons/MainMenu/savemode.svg";
import shops_icon from "../../../Assets/Icons/MainMenu/shops.svg";
import check_icon from "../../../Assets/Icons/MainMenu/check.svg";
import sun_icon from "../../../Assets/Icons/MainMenu/sun.svg";
import settings_icon from "../../../Assets/Icons/settings.svg";
import placeholder from "../../../Assets/Icons/placeholder.svg";
import serverContext from "../../../Context/ServerContext";
import Certificate from "./Certificate.jsx";
import Feedback from "./Feedback.jsx";
import React, { useState, useContext, useEffect } from "react";
import { ActiveContentContext } from "../../../Context/ActiveContentContext";
import LoginRegister from "../LoginRegister.jsx";
import Studio from "../../Common/Studio";
import Bee from "../../../Assets/Images/bee.jpg";
import Channel from "../../Wrappers/Channel";

export default function DefaultMenu({
  user,
  show,
  setSelected,
  setShowDropdownMenu,
}) {
  const { setActiveModal, setActiveContent } = useContext(ActiveContentContext);
  const [isLightTheme, setIsLightTheme] = useState(true);
  const { serverPort } = useContext(serverContext);
  const [login, setLogin] = useState("Exit");

  const toggleTheme = () => {
    setIsLightTheme(!isLightTheme);
    let logo = document.getElementsByClassName("logo-icon");
    logo = logo[0];
    logo.classList.toggle("on");
    let theme = document.getElementsByTagName("html")[0];
    theme.setAttribute(
      "data-color-theme",
      theme.getAttribute("data-color-theme") === "light" ? "dark" : "light"
    );
  };

  useEffect(() => {
    user === "user" ? setLogin("Login") : setLogin("Exit");
  }, []);

  const handleExit = () => {
    if (login === "Exit") {
      localStorage.clear();

      const fetchLogout = async () => {
        try {
          const sessionUser = new FormData();
          sessionUser.append("sessionId", user.id);

          const response = await fetch(`${serverPort}/Usercredentials/Logout`,{
            method:'POST',
            credentials:'include',
            body:sessionUser
        });
          if (!response.ok) {
            console.log("Logout Error");
          }
        } catch (error) {
          console.error("Error fetching Comments:", error);
        }
      };
      fetchLogout();
      setLogin("Login");
       window.location.reload();
    } else {
      setLogin("Exit");
      setActiveModal(
        <LoginRegister
          onEnterClick={() => setActiveModal()}
          handleClose={() => setActiveModal(null)}
        />
      );
    }
    setShowDropdownMenu(false);
   
  };

  return (
    <span className={show ? "defaultMenu" : "removed"}>
      <span className="userBlock">
        <img
          className="userImg"
          src={`${
            user.posterUrl
              ? serverPort + "/showImage?url=" + user.posterUrl
              : Bee
          }`}
          alt=""
        />

        <span className="infoUser">
          <h4 className="n2">{user.nickname ? user.nickname : "User"}</h4>
          <span className={`n3 ${(!user || user === "user") ? 'inactive' : ''} `}onClick={() =>
          setActiveContent(<Channel isOwner="true" user={user}/>
          )
        } >Go to channel</span>
        </span>
      </span>
      <hr />
      <span
        className={`inform  ${(!user || user === "user") ? 'inactive' : ''}`}
        onClick={() =>
          setActiveModal(
            <LoginRegister
              onEnterClick={() => setActiveModal()}
              handleClose={() => setActiveModal(null)}
            />
          )
        }
      >
        <img className="" alt="change_icon" src={change_icon} />
        <span className="n3 ">Change account</span>
      </span>
      <span className="inform " onClick={handleExit}>
        <img className="" alt="exit_icon" src={exit_icon} />
        <span className="n3 ">{login}</span>
      </span>
      <span className={`inform  ${(!user || user === "user") ? 'inactive' : ''}`} onClick={() => setActiveContent(<Studio />)}>
        <img className="" alt="Placeholder" src={placeholder} />
        <span className="n3 ">Studio</span>
      </span>
      <span className={`inform  ${(!user || user === "user") ? 'inactive' : ''}`}>
        <img className="" alt="shops_icon" src={shops_icon} />
        <span className="n3 ">Purchases and paid subscriptions</span>
      </span>
      <div className="inform" onClick={toggleTheme}>
        <img
          className=""
          alt={isLightTheme ? "sun_icon" : "day_icon"}
          src={isLightTheme ? sun_icon : day_icon}
        />
        <span className="n3">
          Appearance: {isLightTheme ? "light theme" : "dark theme"}
        </span>
      </div>
      <LanguageMenu />

      <span className="inform ">
        <img className="" alt="savemode_icon" src={savemode_icon} />
        <span className="n3 ">Safe Mode: Off</span>
      </span>
      <span className={`inform  ${(!user || user === "user") ? 'inactive' : ''}`} onClick={() =>setActiveContent(<Studio activeComponent={"ChannelSettings"} />)}>
        <img className="" alt="settings_icon" src={settings_icon} />
        <span className="n3 ">Settings</span>
      </span>
      <span className="inform" onClick={() => setSelected(<Certificate />)}>
        <img className="" alt="more_icon" src={more_icon} />
        <span className="n3 ">Certificate</span>
      </span>
      <span className={`inform  ${(!user || user === "user") ? 'inactive' : ''}`} onClick={() => setSelected(<Feedback user={user}  />)}>
        <img className="" alt="toas_icon" src={toas_icon} />
        <span className="n3 ">Send feedback</span>
       
      </span>
      
    </span>
  );
}

function LanguageMenu() {
  const [language, setLanguage] = useState("English");
  const [isHovered, setIsHovered] = useState(false);
  const [isSubMenuHovered, setIsSubMenuHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleSubMenuEnter = () => {
    setIsSubMenuHovered(true);
  };

  const handleSubMenuLeave = () => {
    setIsSubMenuHovered(false);
  };

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  };

  return (
    <div
      className="langv"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span className="inform">
        <img className="" alt="langv_icon" src={langv_icon} />
        <span className="n3">Language: {language}</span>
      </span>
      {(isHovered || isSubMenuHovered) && (
        <div
          className="submenu-cont"
          onMouseEnter={handleSubMenuEnter}
          onMouseLeave={handleSubMenuLeave}
        >
          <div className="submenu">
            <ul>
              <li className="n3" onClick={() => changeLanguage("English")}>
                {language === "English" && (
                  <img
                    className="check-icon"
                    alt="check_icon"
                    src={check_icon}
                  />
                )}{" "}
                English
              </li>
              <li className="n3" onClick={() => changeLanguage("Ukrainian")}>
                {language === "Ukrainian" && (
                  <img
                    className="check-icon"
                    alt="check_icon"
                    src={check_icon}
                  />
                )}{" "}
                Ukrainian
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
