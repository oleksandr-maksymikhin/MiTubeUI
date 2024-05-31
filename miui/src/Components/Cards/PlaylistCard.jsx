import React, { useContext,useState } from "react";
import serverContext from "../../Context/ServerContext";

export default function PlaylistCard({ video, setLikesVideos }) {
  const { serverPort } = useContext(serverContext);

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

  function formatDuration(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    const formattedMins = String(mins).padStart(2, "0");
    const formattedSecs = String(secs).padStart(2, "0");
    return `${formattedMins}:${formattedSecs}`;
  }

  function lookVideo() {
    setLikesVideos(video)
  }

  return (
    <div className="micro-card row" onClick={lookVideo}>
      <div className="card-thumbnail">
        <img
          className="thumbnail"
          src={`${serverPort}/showImage?url=${video.posterUrl}`}
          alt=""
        />
        <span className="timestamp">{`${formatDuration(video.duration)}`}</span>
      </div>
      <div className="card-content">
        <h3>{video.title}</h3>
        <h4>{video.user.nickname}</h4>
        <span className="card-info row">
          <span>{video.views} views</span>
          <span>{formatDate(video.date)}</span>
        </span>
      </div>
    </div>
  );
}
