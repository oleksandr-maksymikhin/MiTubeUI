
import back from "../../../Assets/Icons/back.svg";
import three_dots from "../../../Assets/Icons/three_dots.svg";
import edit_icon from "../../../Assets/Icons/edit.svg";

import { useContext, useState, useEffect } from "react";
import { ActiveContentContext } from "../../../Context/ActiveContentContext";
import serverContext from "../../../Context/ServerContext";

import VideoGallery from "../../Common/VideoGallery";
import Playlist from "../../Common/Playlist"

export default
function ChannelMobile({ isOwner, id,user,handleFollow}) {

    //! TODO : Fetch channel data from API
    
    
    const { serverPort } = useContext(serverContext);
    const { setActiveContent } = useContext(ActiveContentContext);

    const [analitics, setAnalitics] = useState([]);
    useEffect(()=>{
        const fetchAnalitics = async () => {
        try {
            const response = await fetch(`${serverPort}/Users/${user.id}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch analitics. Status: ${response.status}`);
            }
            const data = await response.json();
            setAnalitics(data);
        } catch (error) {
            console.error("Error fetching analitics:", error);
            }
        };
        fetchAnalitics();
 },[]);

    let btnSetMobile;
    if(isOwner) {
        btnSetMobile = (<>
            <button className="btn-xl">Manage</button>
            <button className="edit-btn">
                <img src={edit_icon} alt="edit"></img>
            </button>
        </>);    
    } else  {    
        btnSetMobile = (<>
            <button onClick={handleFollow} className="btn-xl">Follow</button>
        </>);
    }
    
    return(<>
        <div className="pseudo-toolbar row mobile">
            <img className="icn" src={back} alt="go back"/>
            <img className="icn" src={three_dots} alt="kebab"/>
        </div>
        <div className="profile-cover">
        { (!user.banerUrl)? (
            <img src="https://via.placeholder.com/1000x250" alt="Profile cover"/>
        ):(
            <img src={`${serverPort}/showImage?url=${user.banerUrl}`} alt="Profile cover"/>
        ) }
        </div>
        <div className="profile-header mobile">
                <div className="row">
                { (!user.posterUrl)? (
            <img src="https://via.placeholder.com/300x300" alt="Profile avatar"/>
        ):(
            <img src={`${serverPort}/showImage?url=${user.posterUrl}`} alt="Profile cover"/>
        ) }
                
                    <span className="column">
                        <h3>{user.name}</h3>
                        <p>{user.nickname}</p>
                        <p>{`${analitics.subscribersQuantity} subscribers`}</p>
                    </span>
                </div>
                <button className="details-btn">{user.description}</button>
                <div className="actions">
                    <div className="row row-top">
                        {btnSetMobile}
                    </div>
                    <div className="row row-bottom">
                        <button  onClick={() => setActiveContent(<VideoGallery/>)}>Main</button>
                        <button  onClick={() => setActiveContent(<Playlist/>)}>Playlists</button>
                    </div>
                </div>
                <h3 className="header">Videos</h3>
        </div>
    </>);
}