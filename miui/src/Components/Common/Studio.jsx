
import { useState, useEffect} from "react";
import "../../Styles/MyStudio.scss";
import StudioSideBar from "../Desktop/Studio/StudioSideBar";
import ChannelHome from "../Desktop/Studio/ChannelHome";
import ChannelSettings from "../Desktop/Studio/ChanelSettings";
import ChannelVideos from "../Desktop/Studio/ChannelVideos";
import ChannelComments from "../Desktop/Studio/ChannelComments";



export default
function Studio({ activeComponent }) {
  const [selectMenuItem, setSelectMenuItem] = useState("HomeComponent");
  const [contentComponent, setCurrentComponent] = useState(<ChannelHome />);

  useEffect(() => {
    if (activeComponent !== undefined) {
      if(activeComponent === 'ChannelSettings'){
        setCurrentComponent(<ChannelSettings />);
      }
      else if(activeComponent === 'ChannelVideos'){
        setCurrentComponent(<ChannelVideos />);
      }
    }
  }, [activeComponent]);

  const handleSelectMenuItem = (menuItem) => {

    setSelectMenuItem(menuItem);
    switch (menuItem) {
      case 'HomeComponent':
        setCurrentComponent(<ChannelHome />);
        break;
      case 'SettingsComponent':
        setCurrentComponent(<ChannelSettings />);
        break;
      case 'VideosComponent':
        setCurrentComponent(<ChannelVideos />);
        break;
      case 'CommentsComponent':
        setCurrentComponent(<ChannelComments />);
        break;
      default:
        setCurrentComponent(null);
        break;
      }
  }
  
  return (
    <div className="container">
      <div className="row">
      <div className="column1">
          <StudioSideBar 
            selectMenuItem={selectMenuItem} 
            handleSelectMenuItem={handleSelectMenuItem} 
            className="sidebar1" 
          />
        </div>
        <div className="column1 content1">
          {contentComponent}
        </div>
      </div>
    </div>
  );
}
