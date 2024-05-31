import Notifications from "./Notification";
import Downloads from "./Downloads";
import Privacy from "./Privacy";
import Advanced from "./Advanced";
import Bee from "../../../Assets/Images/bee.jpg";

import { useContext, useEffect} from "react";

import { SettingsContext } from "../../../Context/MobileSettingsContext";
import userContext from "../../../Context/UserContext";

export default function SettingsDesktop() {

  
  const {user,setUser}=useContext(userContext);


  let { selectedSettings, setSelectedSettings } = useContext(SettingsContext);

  useEffect(() => {


    setUser(JSON.parse(localStorage.getItem('userCookie')));

    if (selectedSettings === null) {
      setSelectedSettings(<Notifications />);
    }
  }, []);

  let setActive = (e) => {
    document.querySelectorAll("#sidenav li").forEach((li) => {
      li.classList.remove("active");
    });
    e.target.classList.add("active");
    e.target.innerHTML === "Downloads"
      ? setSelectedSettings(<Downloads />)
      : e.target.innerHTML === "Privacy"
      ? setSelectedSettings(<Privacy />)
      : e.target.innerHTML === "Advanced"
      ? setSelectedSettings(<Advanced />)
      : setSelectedSettings(<Notifications />);
  };

  return (
    <>
      <div className="settings-container">
        <div className="row">
          <div className="column" id="sidenav">
            <img
              className="profile-icon"
              src={user ? user.posterUrl : Bee}
              alt="Profile poster"
            />
            <h2>Settings</h2>
            <ul>
              <li className="active" onClick={(e) => setActive(e)}>
                Notifications
              </li>
              <li onClick={(e) => setActive(e)}>Downloads</li>
              <li onClick={(e) => setActive(e)}>Privacy</li>
              <li onClick={(e) => setActive(e)}>Advanced</li>
            </ul>
          </div>
          <div className="column" id="page">
            {selectedSettings}
          </div>
        </div>
      </div>
    </>
  );
}
