import React, { useContext } from "react";
import serverContext from "../../Context/ServerContext";
import { ActiveContentContext } from "../../Context/ActiveContentContext";
import VideoFull from "../Wrappers/Video";

export default function NextVideos({ video }) {
  const { setActiveContent } = useContext(ActiveContentContext);
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

  function openVideo() {
    setActiveContent(<VideoFull key={video.id + 85} videoId={video.id} />);
  }

  return (
    <div className="row align-items-start" onClick={openVideo}>
      <div>
        <img
          className="Img"
          src={`${serverPort}/showImage?url=${video.posterUrl}`}
          alt=""
        />
      </div>
      <div className="next-inform">
        <h4 className="n2">{video.title}</h4>
        <span className="n3 chennel">{video.nickname}</span>
        <span className="n4 date">{video.views} views</span>
        <span className="n4 date">{formatDate(video.date)}</span>
      </div>
    </div>
  );
}
