
import "../../Styles/ContentType/Subscriptions.scss"

import { useContext } from "react";
import { ActiveContentContext } from "../../Context/ActiveContentContext";
import Channel from "./Channel";

import notification_icon from "../../Assets/Icons/notification.svg"
import dropdown_icon from "../../Assets/Icons/dd.svg"

export default
function SubscriptionCard() {
    const { setActiveContent, hideToolbar } = useContext(ActiveContentContext);

    const handleClick = () => {  
        setActiveContent(<Channel/>);
        hideToolbar(true);
    }

    return (
    <>
        <div id="subscriptions-list" className="sub-row" onClick={handleClick}>
            <div className="avatar">
                <img src="https://via.placeholder.com/100x100" alt="avatar" />
            </div>
            <div className="desc">
                <h4>Channel Name</h4>
                <span className="desktop">
                    <span>Data to show 1</span>
                    <span>Data to show 2</span>
                </span>
                <p className="desktop">Description</p>
            </div>
            <div className="action">
                <button className="row">
                    <img className="icn" src={notification_icon} alt="Notification icon"/>
                    <p className="desktop">Unsubscribe</p>
                    <img className="icn" src={dropdown_icon} alt="Dropdown icon" />
                </button>
            </div>
        </div>
    </>
    );
}