import "../../../Styles/VideoFull/Comment.scss";

import React, { useState, useEffect, useContext } from "react";
import serverContext from "../../../Context/ServerContext";

export default function CommentsDesktop({ comment, setAnswerComment }) {
  const { serverPort } = useContext(serverContext);
  const [user, setUser] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${serverPort}/Users/${comment.userId}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch user. Status: ${response.status}`);
        }
        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
      
    };

    fetchUsers();
  }, []);

  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);

    return `${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")} ${date.getDate().toString().padStart(2, "0")}.${(
      date.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}.${date.getFullYear()}`;
  }

  function setAnswerToComment() {
    setAnswerComment(null);
    let data = { id: comment.id, nickname: user.nickname };
    setAnswerComment(data);
  }
  function getUserNicknameByKey(key) {
    const element = document.querySelector(`[name="${key}"]`);
    if (element) {
      const userNickname ="@"+ element.querySelector(".userName").textContent;
      return userNickname;
    } else {
      return "User or administrator has deleted the comment ";
    }
  }

  return (
    <>
      {user && (
        <div
          key={`${comment.id}`}
          name={`${comment.id}`}
          className="content-row-start mobile-comment bord"
        >
          <div>
            <img
              className="userImg"
              src={`${serverPort}/showImage?url=${user.posterUrl}`}
              alt=""
            />
          </div>
          <div className="wd">
            <div className="row">
              <span className="userName n2 nickname">{user.nickname}</span>
              <span className="n4 time">
                {formatTimestamp(comment.timestamp)}
              </span>
            </div>
            <div className="dm n3">
              <span>
                {comment.parentId
                  ? 
                    getUserNicknameByKey(comment.parentId) +
                    " " +
                    comment.value
                  : comment.value}
              </span>
            </div>
            <button className="bn2 n2" onClick={setAnswerToComment}>
              Answer
            </button>
          </div>
        </div>
      )}
    </>
  );
}
