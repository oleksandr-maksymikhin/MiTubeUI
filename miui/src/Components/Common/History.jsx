import "../../Styles/ContentType/History.scss";
import serverContext from "../../Context/ServerContext";
import HistoryCard from "../Cards/HistoryCard";
import React, { useContext, useState, useEffect } from "react";

export default function History() {
  const { serverPort } = useContext(serverContext);
  
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    let user= JSON.parse(localStorage.getItem("userCookie"));

    const fetchPlaylists = async () => {
      try {
        const response = await fetch(`${serverPort}/Playlists/user/${user.id}`);
        if (!response.ok) {
          throw new Error(
            `Failed to fetch playlists.Status: ${response.status}`
          );
        }
       
        const data = await response.json();
        let list = data.find(element => element.name === "watch later");
       
        fetchVideosPlaylists(list);
      } catch (error) {
        console.error("Error fetching playlists:", error);
      }
    };
    fetchPlaylists();
  }, []);

  const fetchVideosPlaylists = async (list) => {
   
    try {
      
          const response = await fetch(
            `${serverPort}/Playlists/videos/${list.id}`
          );
          if (!response.ok) {
            throw new Error(
              `Failed to fetch Video. Status: ${response.status}`
            );
          };
          const data = await response.json();

          setPlaylists(data);
          return data;
        
      

    //   const sortedVideos = fetchedVideos.sort(
    //     (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    //   );
      
      //setPlaylists(sortedVideos);
    } catch (error) {
      console.error("Error fetching UsersLikesVideo:", error);
    }
  };

  return (
    <div className="history-wrapper">
      <h2>Watch later</h2>
      <div className="history-container">
       {playlists.length>0?( playlists.map((video) => (
          <HistoryCard key={video.id} video={video}></HistoryCard>
        ))):(<div className="n2">There are no videos yet</div>)}
      </div>
    </div>
  );
}
