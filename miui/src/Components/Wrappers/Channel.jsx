import { PlatformContext } from "../../Context/PlatformContext";
import serverContext from "../../Context/ServerContext";
import { useContext, useState, useEffect } from "react";

import VideoCard from "../Cards/GalleryCard";
import ChannelDesktop from "../Desktop/Content/Channel";
import ChannelMobile from "../Mobile/Content/Channel";

import "../../Styles/ContentType/Channel.scss";
import "../../index.scss";

export default function Channel({ isOwner, id, user }) {
  const { platform } = useContext(PlatformContext);
  const { serverPort } = useContext(serverContext);
  let [selectedTab, setSelectedTab] = useState(
    <VideosMyChanel userId={user.id} />
  );
  let [activeTab, setActiveTab] = useState("video");

  let videoTab = () => {
    setActiveTab("video");
    setSelectedTab(<VideosMyChanel userId={user.id} />);
  };

  let playlistTab = () => {
    setActiveTab("playlist");
    setSelectedTab(<PlaylistMyChanel userId={user.id} />);
  };

  const handleFollow = async () => {
    let myUser = JSON.parse(localStorage.getItem("userCookie"));
    if (myUser && !isOwner) {
      const formData = new FormData();
      formData.append("sessionId", myUser.id);
      formData.append("PublisherId", myUser.id);
      formData.append("SubscriberId", user.id);
      const response = await fetch(`${serverPort}/Subscriptions`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!response.ok) {
        alert.textContent = "Sing in";
      } else {
        // const data = await response.json();
      }
      console.log("Add Folower");
    }
  };

  return (
    <>
      <div className="channel-content">
        {platform === "desktop" ? (
          <ChannelDesktop
            isOwner={isOwner}
            id={id}
            user={user}
            handleFollow={handleFollow}
          />
        ) : (
          <ChannelMobile
            isOwner={isOwner}
            id={id}
            user={user}
            handleFollow={handleFollow}
          />
        )}
      </div>
      <hr></hr>
      <div className="channel-content desktop">
        <span className="row">
          <button
            className={"btn-lg " + (activeTab === "video" ? "" : "btn-trp")}
            onClick={videoTab}
          >
            Videos
          </button>
          <button
            className={"btn-lg " + (activeTab === "playlist" ? "" : "btn-trp")}
            onClick={playlistTab}
          >
            Playlists
          </button>
        </span>
      </div>

      <div className="content-row">{selectedTab}</div>
    </>
  );
}
function VideosMyChanel({ userId }) {
  const { serverPort } = useContext(serverContext);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${serverPort}/Videos/user/${userId}`);
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
    <>
      {videos
        .filter((video) => video.isPublic)
        .map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
    </>
  );
}

function PlaylistMyChanel({ userId }) {
  const { serverPort } = useContext(serverContext);
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const fetchPlaylists = async () => {
      try {
        const response = await fetch(`${serverPort}/Playlists/user/${userId}`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch playlists. Status: ${response.status}`
          );
        }
        const data = await response.json();
        setPlaylists(data);
      } catch (error) {
        console.error("Error fetching playlist:", error);
      }
    };
    fetchPlaylists();
  }, []);

  return (
    <>
      {playlists
        .filter((playlist) => playlist.isPublic)
        .map((playlist) => (
          <div>
            <div className="" key={playlist.id}>
              <img
                src={`${serverPort + "/showImage?url=" + playlist.posterUrl}`}
                className="thumbnail-img"
                alt="playlist preview"
              />
            </div>
            <h4>{playlist.name}</h4>
          </div>
        ))}
    </>
  );
}
