
import home_icon from '../../Assets/Icons/home.svg';
import subscriptions_icon from '../../Assets/Icons/subscriptions.svg';
import history_icon from '../../Assets/Icons/history.svg';
import channel_icon from '../../Assets/Icons/channel.svg';
import videos_icon from '../../Assets/Icons/videos.svg';
import clock_icon from '../../Assets/Icons/clock.svg';
import like_icon from '../../Assets/Icons/like.svg';
import settings_icon from '../../Assets/Icons/settings.svg';

import { useContext, useEffect } from "react";
import { ActiveContentContext } from '../../Context/ActiveContentContext';
import userContext from '../../Context/UserContext';

import VideoGallery from "../Common/VideoGallery";
import Subscriptions from "../Wrappers/Subscriptions";
import Channel from "../Wrappers/Channel";
import History from "../Common/History";
import Playlist from "../Common/Playlist";
import MyStudio from "../Common/Studio";
import Settings from "../Wrappers/Settings";

export default 
function SidebarDesktop() {
    const {user,setUser}=useContext(userContext);
    const {setActiveContent } = useContext(ActiveContentContext);

    useEffect(() => {
      setUser(JSON.parse(localStorage.getItem("userCookie")));
    }, []);
   
    const viewReset = () => {
        if(document.getElementById("mySidenav").classList.contains("xt-sidebar")) {
          let text = document.querySelectorAll(".sidenav-desktop .menu-item h3");
          let icon = document.querySelectorAll(".menu-icon");
          for(let i = 0; i < text.length; i++) {
            text[i].style.display = ("none")
            icon[i].classList.toggle("menu-item-collapsed")
          }
        }
        
        document.getElementById("mySidenav").classList.remove("xt-sidebar");
        document.getElementById("myContent").classList.remove("xt-content");
        document.getElementById("myContent").classList.remove("fullscreen");
      }

    return (
        <>
        <nav className="sidenav-desktop" onClick={viewReset}>
        <ul >
          <li className="menu-item-container">
            <div className="menu-item icon-btn" onClick={() => setActiveContent(<VideoGallery/>)}>
              <img className="menu-icon icn" alt="Placeholder" src={home_icon}/>
              <h3 className='hidden'>Home</h3>
            </div>
          </li>
          <li>
            <div className={`menu-item icon-btn ${(!user || user === "user") ? 'inactive' : ''}`} onClick={() => setActiveContent(<Subscriptions/>)}>
              <img className="menu-icon icn" alt="Placeholder" src={subscriptions_icon}/>
              <h3 className='hidden'>Subscriptions</h3>
            </div>
            {(!user || user === "user") &&  (
                  <div className="login-prompt">
                    Please log in!
                  </div>
            )}
          </li>
          <li>
            <div className={`menu-item icon-btn ${(!user || user === "user") ? 'inactive' : ''}`} onClick={() => setActiveContent(<History/>)}>
              <img className="menu-icon icn" alt="Placeholder" src={history_icon}/>
              <h3 className='hidden'>Watch later</h3>
            </div>
            {(!user || user === "user") &&  (
                  <div className="login-prompt">
                    Please log in!
                  </div>
            )}
          </li>
        </ul>
        <hr/>
        <ul>
          <li>
            <div className={`menu-item icon-btn ${(!user || user === "user") ? 'inactive' : ''}`} onClick={() =>  {
              if (user) {
                setActiveContent(<Channel isOwner="true" user={user}/>);
            }}}>
              <img className="menu-icon icn" alt="Placeholder" src={channel_icon}/>
              <h3 className='hidden'>My channel</h3>
            </div>
            {(!user || user === "user") &&  (
                  <div className="login-prompt">
                    Please log in!
                  </div>
            )}
          </li>
          <li>
            <div className={`menu-item icon-btn ${(!user || user === "user") ? 'inactive' : ''}`} onClick={() => setActiveContent(<MyStudio/>)}>
              <img className="menu-icon icn" alt="Placeholder" src={videos_icon} />
              <h3 className='hidden'>My videos</h3>
            </div>
                {(!user || user === "user") &&  (
                  <div className="login-prompt">
                    Please log in!
                  </div>
                    )}
          </li>
        </ul>
        <hr/>
        <ul>
          <li>
            <span className={`${(!user || user === "user") ? 'inactive' : ''}`} onClick={() => setActiveContent(<Playlist heading="Liked"/>)}>
              <div className={`menu-item icon-btn`}>
                  <img className="menu-icon icn" alt="Placeholder" src={like_icon}/>
                  <h3 className='hidden'>Liked</h3>
              </div>
            </span>
            {(!user || user === "user") &&  (
                  <div className="login-prompt">
                    Please log in!
                  </div>
            )}
          </li>
          <li>
            <span className={`${(!user || user === "user") ? 'inactive' : ''}`} onClick={() => setActiveContent(<Playlist heading="History"/>)}>
              <div  className={`menu-item icon-btn`}>
                  <img className="menu-icon icn" alt="Placeholder" src={clock_icon}/>
                  <h3 className='hidden'>History</h3>
              </div>
            </span>
            {(!user || user === "user") &&  (
                  <div className="login-prompt">
                    Please log in!
                  </div>
            )}
          </li>
          <li>
            <span className={`${(!user || user === "user") ? 'inactive' : ''}`} onClick={() => setActiveContent(<Settings/>)}>
              <div className={`menu-item icon-btn`}>
                  <img className="menu-icon icn" alt="Placeholder" src={settings_icon}/>
                  <h3 className='hidden'>Settings</h3>
              </div>
            </span>
            {(!user || user === "user") &&  (
                  <div className="login-prompt">
                    Please log in!
                  </div>
            )}
          </li>
        </ul>         
      </nav>
        </>
    );
}