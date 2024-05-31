import { PlatformContext } from "../../Context/PlatformContext";
import { useContext } from "react";

import ToolbarDesktop from "../Desktop/Toolbar";
import ToolbarMobile from "../Mobile/Toolbar";

import "../../Styles/Peripheral/Toolbar.scss"

export default 
function Toolbar({ openFilter }) {
    const { platform } = useContext(PlatformContext);

    return (
    <>
        <div className="toolbar-content">
            {platform === "desktop" ? <ToolbarDesktop openFilter={openFilter}/> : <ToolbarMobile openFilter={openFilter}/>}
        </div>
    </>);
}