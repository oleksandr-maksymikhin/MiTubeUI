
import bell from "../../../Assets/Icons/bell.svg";
import serverContext from "../../../Context/ServerContext";
import { useContext,useEffect, useState } from "react";

import { ActiveContentContext } from "../../../Context/ActiveContentContext";
import Studio from '../../Common/Studio';

export default
function ChannelDesktop({ isOwner, user,handleFollow}) {
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

    let btnSet;
    if(isOwner) {
        btnSet = (<>
            <button className="btn-lg btn-inverted" onClick={() => setActiveContent(<Studio activeComponent={"ChannelSettings"} />)}>Personalize the channel</button>
            <button className="btn-lg btn-inverted" onClick={() => setActiveContent(<Studio activeComponent={"ChannelVideos"} />)}>Manage the video</button>
        </>);
    } else {
        btnSet = (<>
            <button className="btn-lg btn-inverted row sub-button" onClick={handleFollow}>
                <img src={bell} alt="bell"></img>
                <p>Follow</p>
            </button>
        </>);
    }

    return(<>
    <div className="profile-cover">
        { (!user.banerUrl)? (
            <img src="https://via.placeholder.com/1000x250" alt="Profile cover"/>
        ):(
            <img src={`${serverPort}/showImage?url=${user.banerUrl}`} alt="Profile cover"/>
        ) }
        
    </div>
    <div className="profile-header desktop">
        <div className="row">
            <span className="profile-image">
            { (!user.posterUrl)? (
            <img src="https://via.placeholder.com/300x300" alt="Profile avatar"/>
        ):(
            <img src={`${serverPort}/showImage?url=${user.posterUrl}`} alt="Profile cover"/>
        ) }
                
            </span>
            <span className="profile-detail">
                <div className="column">
                    <h3>{user.name}</h3>
                    <span>
                        <span>{`${analitics.subscribersQuantity} subscribers`}</span>
                        <span>{`${analitics.videosQuantity} videos`}</span>
                    </span>
                    <p>{analitics.description}</p>
                    <span>
                        {btnSet}
                    </span>
                </div>
            </span>
        </div>
    </div>
    </>);
}