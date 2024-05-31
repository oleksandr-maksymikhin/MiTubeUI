import "../../Styles/ContentType/Playlist.scss";
import play_icon from "../../Assets/Icons/play.svg";
import PlaylistCard from "../Cards/PlaylistCard";
import serverContext from "../../Context/ServerContext";
import React, { useEffect, useContext, useState } from "react";
import VideoFull from "../Wrappers/Video";
import { ActiveContentContext } from "../../Context/ActiveContentContext";
import { PlatformContext } from "../../Context/PlatformContext";


export default function Playlist({ heading, id = null}) {

  const { serverPort } = useContext(serverContext);
  const { setActiveContent } = useContext(ActiveContentContext);
  const [allUsersLikesVideos, SetAllUsersLikesVideos] = useState([]);
  const [likesVideos, setLikesVideos] = useState();
  const { platform } = useContext(PlatformContext);

  useEffect(() => {
    SetAllUsersLikesVideos([]);
    
    let user = JSON.parse(localStorage.getItem("userCookie"));
    let data = [];

    if(user === null) {
      window.location.href = "/invalid";
    }

    if(id === null) {
      const fetchUsersLikes = async () => {
        try {
          const response = await fetch(
            `${serverPort}/Interactions/user/${user.id}`
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch UsersLikes. Status: ${response.status}`
            );
          }
          data = await response.json();

          if (heading === "Liked") {
            data = data.filter((e) => e.actionstate === 2);
          }

          fetchUsersLikesVideo(data);
        } catch (error) {
          console.error("Error fetching UsersLikes:", error);
        }
      };

      fetchUsersLikes();
    } else {
      const fetchVideos = async () => {
        try {
          const response = await fetch(
            `${serverPort}/Playlists/videos/${id}`
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch UsersLikes. Status: ${response.status}`
            );
          }
          data = await response.json();
          
          setLikesVideos(data[0]);
          SetAllUsersLikesVideos(data);
        } catch (error) {
          console.error("Error fetching UsersLikes:", error);
        }
      };
      fetchVideos();
    }
  }, [heading]);

  const fetchUsersLikesVideo = async (likes) => {
    try {
      const fetchedVideos = await Promise.all(
        likes.map(async (element) => {
          const response = await fetch(
            `${serverPort}/Videos/${element.videoId}`
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch Video. Status: ${response.status}`
            );
          }
          return response.json();
        })
      );

      const sortedVideos = fetchedVideos.sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
      );
      setLikesVideos(sortedVideos[0]);
      SetAllUsersLikesVideos(sortedVideos);
    } catch (error) {
      console.error("Error fetching UsersLikesVideo:", error);
    }
  };

  function formatDate(dateString) {
    const options = {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  }

  function openVideo() {
    setActiveContent(
      <VideoFull key={likesVideos.id + 81} videoId={likesVideos.id} />
    );
  }

  return (
    <>
      {allUsersLikesVideos && likesVideos && (
        <div className="pl-container">
          <div className="row">
          {platform === "desktop" ? (<div className="columnF">
              <div className="module">
                <img
                  className="module-cover"
                  src={`${serverPort}/showImage?url=${likesVideos.posterUrl}`}
                  alt="Placeholder"
                />
                <h3 className="module-header">{heading}</h3>
                <h4 className="module-user">{likesVideos.user.nickname}</h4>
                <div className="module-stats ">
                  <span>{likesVideos.likecount} likes</span>
                  <span>{likesVideos.views} views</span>
                  <span>Last updated: {formatDate(likesVideos.date)}</span>
                </div>
                <button className="btn-sm" onClick={openVideo}>
                  <img className="button-icon" src={play_icon} alt="play" />
                  Play video
                </button>
              </div>
            </div>):<></>}
            <div className="columnS">
              {allUsersLikesVideos.map((video) => (
                <PlaylistCard key={video.id} video={video} setLikesVideos={platform === "desktop" ?setLikesVideos:openVideo}/>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
