import "../../Styles/MySettings.scss";

import { PlatformContext } from "../../Context/PlatformContext";
import { SettingsContext } from "../../Context/MobileSettingsContext";
import { useContext, useState } from "react";

import SettingsDesktop from "../Desktop/Settings/Settings";
import SettingsMobile from "../Mobile/Settings/Settings";

export default 
function Settings() {
    const { platform } = useContext(PlatformContext);
    let [selectedSettings, setSelectedSettings] = useState(null);

    return (
    <>
        <SettingsContext.Provider value={{selectedSettings, setSelectedSettings}}>
            <div className="settings-content-container">
                {platform === "desktop" ? <SettingsDesktop/> : <SettingsMobile/>}
            </div>
        </SettingsContext.Provider>
    </>);
}