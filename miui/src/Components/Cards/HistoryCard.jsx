import serverContext from "../../Context/ServerContext";
import React, { useContext } from "react";
import VideoFull from "../Wrappers/Video";
import { ActiveContentContext } from "../../Context/ActiveContentContext";

export default
function HistoryCard({video}) {
    const { serverPort } = useContext(serverContext);

    const { setActiveContent } = useContext(ActiveContentContext);

    function formatDate(dateString) {
        console.log(video);
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
          <VideoFull key={video.id + 52} videoId={video.id} />
        );
      }
      function formatDuration(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        const formattedMins = String(mins).padStart(2, "0");
        const formattedSecs = String(secs).padStart(2, "0");
        return `${formattedMins}:${formattedSecs}`;
      }

    return (
    <div className="history-card row" onClick={openVideo}>
        <div className="card-thumbnail">
            <img className="thumbnail" 
             src={`${serverPort}/showImage?url=${video.posterUrl}`}alt="Placeholder" />
            <span className="timestamp">{`${formatDuration(
        video.duration
      )}`}</span>
        </div>
        <div className="card-content">
            <h3>{video.title}</h3>
            <span className="card-info row">
                <span>{video.views} views</span>
                <span>{formatDate(video.date)}</span>
            </span>
            <span className="card-author row">
                <img src={`${serverPort}/showImage?url=${video.user.posterUrl}`} className="card-avatar" alt="Avatar"/>
                <h4 className="card-nickname">{video.user.nickname}</h4>
            </span>
            <p>{video.description}</p>
        </div>
    </div>);
}