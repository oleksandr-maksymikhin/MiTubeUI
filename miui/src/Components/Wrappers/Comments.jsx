import { PlatformContext } from "../../Context/PlatformContext";
import React, { useState, useEffect, useContext } from "react";

import "../../Styles/VideoFull/Comment.scss";
import CommentsDesktop from "../Desktop/Video/Comments";
import CommentsMobile from "../Mobile/Video/Comments";
import serverContext from "../../Context/ServerContext";

export default function Comments({
  videoId,
  commentGet,
  setCommentGet,
  setShowMakeComment,
  setAnswerComment,
}) {
  const [allComments, setAllComments] = useState();
  const { platform } = useContext(PlatformContext);
  const { serverPort } = useContext(serverContext);

  useEffect(() => {
    const fetchCommentsVideos = async () => {
      try {
        const response = await fetch(`${serverPort}/Comments/video/${videoId}`);
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
      setCommentGet(false);
    };
    if (commentGet) {
      fetchCommentsVideos();
    }
  }, [commentGet, serverPort, setCommentGet, videoId]);

  return (
    <>
      {allComments &&
        (platform === "desktop" ? (
          allComments.map((comment) => (
            <CommentsDesktop
              key={comment.id}
              comment={comment}
              setAnswerComment={setAnswerComment}
            />
          ))
        ) : (
          <CommentsMobile
            comments={allComments}
            setShowMakeComment={setShowMakeComment}
            setAnswerComment={setAnswerComment}
          />
        ))}
    </>
  );
}
