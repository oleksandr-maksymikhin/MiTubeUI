import back from "../../../Assets/Icons/back.svg";

import About from "./About";
import Downloads from "./Downloads";
import General from "./General";
import Profiles from "./Profiles";
import Purchases from "./Purchases";
import Quality from "./Quality";
import LoginRegister from "../../Modals/LoginRegister";
import { useContext, useEffect } from "react";
import { ActiveContentContext } from "../../../Context/ActiveContentContext";
import VideoGallery from "../../Common/VideoGallery";
import React, { useState } from "react";
import serverContext from "../../../Context/ServerContext";

export default function SettingsMobile() {
  const { setActiveModal, setActiveContent } = useContext(ActiveContentContext);
  const [login, setLogin] = useState();
  const [user, setUser] = useState();
  const { serverPort } = useContext(serverContext);
  useEffect(() => {
    let user1 = JSON.parse(localStorage.getItem("userCookie"));
    console.log(user1);

    if (user1) {
      setLogin("Exit");
      setUser(user1);
    } else {
      setLogin("Login");
    }
  }, []);

  const handleExit = () => {
    if (login === "Exit") {
      localStorage.clear();

      const fetchLogout = async () => {
        try {
          const sessionUser = new FormData();
          sessionUser.append("sessionId", user.id);

          const response = await fetch(`${serverPort}/Usercredentials/Logout`, {
            method: "POST",
            credentials: "include",
            body: sessionUser,
          });
          if (!response.ok) {
            console.log("Logout Error");
          }
        } catch (error) {
          console.error("Error fetching Comments:", error);
        }
        setLogin("Login");
      };

      fetchLogout();
	  window.location.reload();
    }

    if (login === "Login") {
      console.log("Login");
      setActiveContent(
        <LoginRegister
          onEnterClick={() => setActiveModal()}
          handleClose={() => setActiveModal(null)}
        />
      );
    }
     
  };

  return (
    <>
      <div className="settings-container mobile">
        <div className="logo row">
          <img
            className="logo-icon"
            src={back}
            alt="Go back"
            onClick={() => setActiveContent(<VideoGallery />)}
          />
          <h2>Settings</h2>
        </div>
        <ul>
          <li onClick={() => setActiveContent(<General />)}>General</li>
          <li onClick={() => setActiveContent(<Profiles />)}>Profiles</li>
          <li onClick={() => setActiveContent(<Quality />)}>Video quality</li>
          <li onClick={() => setActiveContent(<Downloads />)}>Downloads</li>
          <li onClick={() => setActiveContent(<Purchases />)}>Purchases</li>
          <li onClick={() => setActiveContent(<About />)}>About</li>
          <li onClick={() => handleExit()}>{login}</li>
        </ul>
      </div>
    </>
  );
}
