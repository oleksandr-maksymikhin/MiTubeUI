import "../../../Styles/VideoFull/VideoPlayer.scss";

import back from "../../../Assets/Icons/back.svg";

import VideoGallery from "../VideoGallery";
import { useContext, useEffect } from "react";
import userContext from "../../../Context/UserContext";
import { ActiveContentContext } from "../../../Context/ActiveContentContext";
import serverContext from "../../../Context/ServerContext";

export default function VideoPlayer({ video }) {
  const { serverPort } = useContext(serverContext);
  let { setActiveContent } = useContext(ActiveContentContext);
  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userCookie")));
  }, []);

  let goBack = () => {
    setActiveContent(<VideoGallery />);
  };

  let watchingVideo = async () => {
    if (user && !video.likeStatus) {
      const formData = new FormData();
      formData.append("sessionId", user.id);
      formData.append("UserId", user.id);
      formData.append("VideoId", video.id);
      formData.append("Actionstate", 1);
      formData.forEach((e) => console.log(e));
      const response = await fetch(`${serverPort}/Interactions`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!response.ok) {
        alert.textContent = "Sing in";
      } else {
        const data = await response.json();
       
      }
    }
  };

  return (
    <div className="videoPlayer">
      <img
        className="icn back-overlay-button mobile"
        alt="go back"
        src={back}
        onClick={goBack}
      />

      <video
        onClick={watchingVideo}
        key={video.id}
        className="Img"
        controls
        poster={`${serverPort}/showImage?url=${video.posterUrl}`}
      >
        <source
          src={`${serverPort}/ShowVideo?url=${video.videoUrl}`}
          type="video/mp4"
        />
      </video>
    </div>
  );
}
