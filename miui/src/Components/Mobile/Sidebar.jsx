import home_icon from '../../Assets/Icons/home.svg';
import subscriptions_icon from '../../Assets/Icons/subscriptions.svg';
import videos_icon from '../../Assets/Icons/videos.svg';
import plus_icon from '../../Assets/Icons/plus.svg';
import notification_icon from '../../Assets/Icons/notification.svg';

import { useContext } from "react";
import { ActiveContentContext } from '../../Context/ActiveContentContext';

import VideoGallery from "../Common/VideoGallery";
import Subscriptions from "../Wrappers/Subscriptions";
import Settings from '../Wrappers/Settings';
import Notifications from '../Mobile/Content/Notifications';

export default
function SidebarMobile() {

    const { setActiveContent } = useContext(ActiveContentContext);

    return (
    <>
    <nav className="sidenav-mobile mobile">
        <ul className="row">
            <li><div className="column menu-item icon-btn" onClick={() => setActiveContent(<VideoGallery/>)}>
                <img className="menu-icon icn" alt="Placeholder" src={home_icon}/>
                <h3>Home</h3>
            </div></li>

            <li><div className="column menu-item icon-btn" onClick={() => setActiveContent(<Subscriptions/>)}>
                <img className="menu-icon icn" alt="Placeholder" src={subscriptions_icon}/>
                <h3>Subscriptions</h3>
            </div></li>

            <li>
                <img className="menu-icon primary-menu-icon" alt="Placeholder" src={plus_icon} onClick={() => setActiveContent(<VideoGallery/>)}/>
            </li>

            <li><div className="column menu-item icon-btn" onClick={() => setActiveContent(<Notifications/>)}>
                <img className="menu-icon icn" alt="Placeholder" src={notification_icon}/>
                <h3>Notifications</h3>
            </div></li>

            <li><div className="column menu-item icon-btn" onClick={() => setActiveContent(<Settings/>)}>
                <img className="menu-icon icn" alt="Placeholder" src={videos_icon}/>
                <h3>Profile</h3>
            </div></li>
        </ul>
    </nav>
    </>
    );
}