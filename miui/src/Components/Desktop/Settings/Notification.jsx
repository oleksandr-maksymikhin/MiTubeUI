import "../../../Styles/Settings/Notification.scss";

import { useState } from "react";

export default
    function Notifications() {


    return (

        <div className="notificationsMenu">


            <span className="inform">
                <span className="n2 ">Notification</span>
            </span>
            <span className="inform ">

                <span className="n1 ">Notification settings</span>
            </span>
            <span className="inform" >

                <span className="n3 ">Specify which notifications you want to receive</span>
            </span>
            <hr />
            <span className="inform">
                <span className="n1 ">General</span>
            </span>
            <span className="inform ">
                <span className="n3 ">Manage notifications on your computer</span>
            </span>
            <span className="inform ">
                <span className="n2 ">Your settings</span>
            </span>
            <span className="inform ">
                <ToggleSwitch />
                <span className="n3 ">Subscriptions</span>
            </span>
            <span className="inform">
                <ToggleSwitch />
                <span className="n3 ">Recommended videos</span>
            </span>
            <span className="inform">
                <ToggleSwitch />
                <span className="n3 ">Actions in my channel</span>
            </span>
            <span className="inform">
                <ToggleSwitch />
                <span className="n3 ">Answers to my comments</span>
            </span>
            <span className="inform">
                <ToggleSwitch />
                <span className="n3 ">Mentions</span>
            </span>
            <span className="inform">
                <ToggleSwitch />
                <span className="n3 ">Distribution of content</span>
            </span>


        </div>
    );
}

function ToggleSwitch() {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <label className="toggle">
            <input type="checkbox" />
            <span className="roundbutton"> </span>
        </label>
    );
}


