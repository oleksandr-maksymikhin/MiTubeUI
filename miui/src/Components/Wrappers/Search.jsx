import { PlatformContext } from "../../Context/PlatformContext";
import SearchDesktop from "../Desktop/Content/Search";
import SearchMobile from "../Mobile/Content/Search";
import { useContext } from "react";

export default
function Search({videos}) {
    
    const { platform } = useContext(PlatformContext);
    return (
    <>
        <div className="search-content">
            {platform === "desktop" ? <SearchDesktop videos={videos} /> : <SearchMobile videos={videos}/>}
        </div>
    </>);
}