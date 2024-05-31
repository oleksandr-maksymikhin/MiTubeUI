import "../../../Styles/Studio/ChannelComments.scss";
import "../../../index.scss";
import NextVideoCard from "../../Cards/NextVideoCard";
import React, { useState, useEffect, useContext } from "react";
import serverContext from "../../../Context/ServerContext";
import userContext from "../../../Context/UserContext";
import CommentsDesktop from "../../Desktop/Video/Comments";

export default function ChannelComments() {
  const { user, setUser } = useContext(userContext);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userCookie")));
  }, []);

  return (
    <>
      {user && (
        <div className="channel-comments">
          <h2 className="n1">Channel Comments</h2>
          <CommentVideoAddData key={Date.now() + 57} user={user} />
        </div>
      )}
    </>
  );
}

function CommentVideoAddData({ user }) {
  const { serverPort } = useContext(serverContext);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${serverPort}/Videos/user/${user.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch videos. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, [serverPort, user.id]);

  return (
    <table className="comment-row">
      <tbody>
        {videos.map((video) => (
          <React.Fragment key={video.id}>
            <CommentRow video={video} />
            <tr>
              <td></td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
}

function CommentRow({ video }) {
  const [allComments, setAllComments] = useState([]);
  const { serverPort } = useContext(serverContext);

  useEffect(() => {
    const fetchCommentsVideo = async () => {
      try {
        const response = await fetch(
          `${serverPort}/Comments/video/${video.id}`
        );
        if (!response.ok) {
          throw new Error(
            `Failed to fetch Comments. Status: ${response.status}`
          );
        }
        const data = await response.json();
        data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setAllComments(data);
      } catch (error) {
        console.error("Error fetching Comments:", error);
      }
    };
    if (video) fetchCommentsVideo();
  }, [serverPort, video.id]);

  return (
    <React.Fragment>
      {allComments.map((comment) => (
        <tr key={comment.id + Date.now()} id="commentRow">
          <td>
            <CommentsDesktop comment={comment}></CommentsDesktop>
          </td>
          <td>
            <NextVideoCard video={video}></NextVideoCard>
          </td>
        </tr>
      ))}
    </React.Fragment>
  );
}
