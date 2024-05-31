import "../../../Styles/Studio/StudioSideBar.scss";
import Comments from "../../../Assets/Icons/Comments.svg";
import Content from "../../../Assets/Icons/content.svg";
import Home from "../../../Assets/Icons/home.svg";
import Settings from "../../../Assets/Icons/settings.svg";
import userContext from "../../../Context/UserContext";
import React, { useContext, useEffect } from "react";
import serverContext from "../../../Context/ServerContext";

function StudioSideBar({handleSelectMenuItem}) {
  const { user, setUser } = useContext(userContext);
  const { serverPort } = useContext(serverContext);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userCookie")));
  }, []);

    return (
        <div className="containersidebar">
            <div className='photo'>
              { (!user || !user.posterUrl)? (
                <img className="profileimg"  src='https://i.pinimg.com/736x/95/47/0c/95470c8d65cb8bc6801814bbdf76f98b.jpg'/>
                
               ):(
                <img className="profileimg"  src={`${serverPort}/ShowImage?url=${user.posterUrl}`}/>
                ) }
               </div>
               <div className="menu">
        <div className="menu-item" onClick={() => handleSelectMenuItem('HomeComponent')}>
          <img className="imgi" src={Home} alt='Home link' />
          <label>Main</label>
        </div>
        <div className="menu-item" onClick={() => handleSelectMenuItem('VideosComponent')}>
          <img className="imgi" alt='Content link' src={Content} />
          <label>Content</label>
        </div>
        <div className="menu-item" onClick={() => handleSelectMenuItem('CommentsComponent')}>
          <img className="imgi" alt='Comments link' src={Comments} />
          <label>Comments</label>
        </div>
        <div className="menu-item" onClick={() => handleSelectMenuItem('SettingsComponent')}>
          <img className="imgi" src={Settings} alt='Settings link' />
          <label>Settings</label>
        </div>
      </div>
    </div>
       
    )
}
export default StudioSideBar;
