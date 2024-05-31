import "../../Styles/VideoFull/NextVideo.scss";
import React, { useState, useEffect, useContext } from "react";
import { PlatformContext } from "../../Context/PlatformContext";
import NextVideoDesktop from "../Desktop/Video/NextVideo";
import NextVideoMobile from "../Mobile/Video/NextVideo";
import serverContext from "../../Context/ServerContext";

export default function NextVideo({ video, setActiveVideo }) {
  const { platform } = useContext(PlatformContext);
  const { serverPort } = useContext(serverContext);

  const [nextVideos, setNextVideos] = useState();

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${serverPort}/Videos`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch videos. Status: ${response.status}`);
        }
        const data = await response.json();
        setNextVideos( data.filter(video => video.isPublic));
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    fetchVideos();
  }, []);

  return (
    <>
      {nextVideos && (
        <div className="item">
          {platform === "desktop" ? (
            <NextVideoDesktop videos={nextVideos} />
          ) : (
            <NextVideoMobile videos={nextVideos} />
          )}
        </div>
      )}
    </>
  );
}
