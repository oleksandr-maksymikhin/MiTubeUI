import "../../Styles/ContentType/VideoCard.scss";

import VideoCard from "../Cards/GalleryCard";
import React, { useState, useEffect, useContext } from "react";
import serverContext from "../../Context/ServerContext";

export default function VideoGallery() {
  const { serverPort } = useContext(serverContext);

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${serverPort}/Videos`);
        if (!response.ok) {
          throw new Error(`Failed to fetch videos. Status: ${response.status}`);
        }
        const data = await response.json();
       
        setVideos( data.filter(video => video.isPublic));
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <>
      <div className="content-row">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </>
  );
}
