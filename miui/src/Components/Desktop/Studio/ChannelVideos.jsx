import "../../../Styles/Studio/ChannelVideo.scss";
import  "../../../index.scss";

import serverContext from "../../../Context/ServerContext";
import userContext from "../../../Context/UserContext";
import { ActiveContentContext } from "../../../Context/ActiveContentContext";
import { useState, useEffect, useContext } from "react";
import VideoFull from "../../Wrappers/Video";
import open_access from '../../../Assets/Icons/open_access.svg';
import access_link from '../../../Assets/Icons/access_link.svg';
import access_close from '../../../Assets/Icons/access_close.svg';



export default

function ChannelVideos() {
    let [selectedTab, setSelectedTab] = useState(<VideoTable/>);
    let [activeTab, setActiveTab] = useState("video");

    let videoTab = () => {
        setActiveTab("video");
        setSelectedTab(<VideoTable/>);
    }

    let playlistTab = () => {   
        setActiveTab("playlist");
        setSelectedTab(<PlaylistTable onPlayListSelected={onPlayListSelected}/>);
    }
    const onPlayListSelected = (playlistId) => {
        setSelectedTab(<VideoFromPlaylist playlistId={playlistId} />);
    };

    return (
    <>
        <div className="channel-videos">
            <h2>Channel Videos</h2>
            <span className="row">
                <button className={'btn-lg ' + (activeTab === 'video' ? '' : 'btn-trp ')} onClick={videoTab}>Videos</button>
                <button className={'btn-lg ' + (activeTab === 'playlist' ? '' : 'btn-trp ')} onClick={playlistTab}>Playlists</button>
            </span>
            {selectedTab}
        </div>
    </>
    )
}

function PlaylistTable({onPlayListSelected}) {
    const {user,setUser}=useContext(userContext);
    const {serverPort } = useContext(serverContext);
    
    const [playlists, setPlaylists] = useState([]);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userCookie')));
        const fetchPlaylists= async () => {
          try {
            const response = await fetch(`${serverPort}/Playlists/user/${user.id}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch playlists. Status: ${response.status}`);
            }
            const data = await response.json();
            setPlaylists(data);
            
          } catch (error) {
            console.error("Error fetching playlists:", error);
          }
        };
        fetchPlaylists();
      }, []);
    return (
        <table>
            <thead>
                <tr>
                    <th>Playlist</th>
                    <th>Access</th>
                    <th>Last edited</th>
                    <th>Video amount</th>
                </tr>
            </thead>
            <tbody>
            {
            playlists.map((playlist) => (
                <PlaylistRow key={playlist.id} playlist={playlist} onPlayListSelected={onPlayListSelected} />
            ))}
            </tbody>
        </table>);
}

function PlaylistRow({playlist,onPlayListSelected}) {
    
    const { serverPort } = useContext(serverContext);

    function formatDate(dateString) {
        const options = {
          year: "numeric",
          month: "short",
          day: "2-digit",
        };
        return new Date(dateString).toLocaleDateString("en-US", options);
      }

   

    return (
        <tr className="playlist-row">
            <td>
                <div className="row" key={playlist.id} onClick={()=>onPlayListSelected(playlist.id)}>
                    <img src={`${serverPort + "/showImage?url=" + playlist.posterUrl}`} className="thumbnail-img" alt="playlist preview"/>
                    <span className="col">
                        <h4>{playlist.name}</h4>
                        <p>{playlist.description}</p>
                    </span>
                </div>
            </td>
            <td>
            {(playlist.isPublic)  ? (
                <div className="access-block">
                    <img src={open_access} alt='' className="acces-icon"/> 
                    <span>open access</span>
                </div>
                ):(
                <div className="access-block">
                    <img src={access_close} className="acces-icon" /> 
                    <span>access close</span>
                </div>
                )}
            </td>
            <td>{`${formatDate(playlist.date)}`}</td>
            <td>{playlist.videoQuantity}</td>
        </tr>
    );
}
function VideoFromPlaylist({playlistId}){

    const {serverPort } = useContext(serverContext);
    
    const [playlists, setPlaylists] = useState([]);


    useEffect(() => {
        const fetchPlaylists= async () => {
          try {
            const response = await fetch(`${serverPort}/Playlists/videos/${playlistId}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch playlists. Status: ${response.status}`);
            }
            const data = await response.json();
            setPlaylists(data);
            
          } catch (error) {
            console.error("Error fetching playlists:", error);
          }
        };
        fetchPlaylists();
      }, []);




    return (
        <table>
            <thead>
                <tr>
                    <th>Video</th>
                    <th>Visibility</th>
                    <th>Date</th>
                    <th>Views</th>
                    <th>Comments</th>
                    <th>Likes</th>
                </tr>
            </thead>
            <tbody>
            {
            playlists.map((video) => (
            <VideoRow key={video.id} video={video} />
            ))}
            </tbody>
        </table>
    );
}

function VideoTable() {

    const {user,setUser}=useContext(userContext);
    const { serverPort } = useContext(serverContext);
    
    const [videos, setVideos] = useState([]);
    
    

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('userCookie')));
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${serverPort}/Videos/user/${user.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch videos. Status: ${response.status}`);
        }
        const data = await response.json();
        setVideos(data);
        
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);


    return (
        <table>
            <thead>
                <tr>
                    <th>Video</th>
                    <th>Visibility</th>
                    <th>Date</th>
                    <th>Views</th>
                    <th>Comments</th>
                    <th>Likes</th>
                </tr>
            </thead>
            <tbody>
            {
            videos.map((video) => (
            <VideoRow key={video.id} video={video} />
            ))}
            </tbody>
        </table>
    );
}

function VideoRow({video}) {
    const { setActiveContent } = useContext(ActiveContentContext);
    const { serverPort } = useContext(serverContext);
    function formatDate(dateString) {
        const options = {
          year: "numeric",
          month: "short",
          day: "2-digit",
        };
        return new Date(dateString).toLocaleDateString("en-US", options);
      }

      function openVideo() {
        setActiveContent(<VideoFull videoId={video.id} />);
      }
    return (
        <tr className="video-row">
            <td>
                <div className="row" onClick={openVideo}>
                    <img src={`${serverPort + "/showImage?url=" + video.posterUrl}`} className="thumbnail-img" alt="video preview"/>
                    <span className="col">
                        <h4>{video.title}</h4>
                        <p>{video.description}</p>
                    </span>
                </div>
            </td>
            <td>{(video.isPublic)  ? (
                <div className="access-block">
                    <img src={open_access} alt='' className="acces-icon"/> 
                    <span>open access</span>
                </div>
                ):(
                <div className="access-block">
                    <img src={access_link} className="acces-icon" /> 
                    <span>access via link</span>
                </div>
                )}
            </td>
            <td>{`${formatDate(video.date)}`}</td>
            <td>{video.views}</td>
            <td>{video.commentscount}</td>
            <td>{video.likecount}</td>
        </tr>
    );

}
