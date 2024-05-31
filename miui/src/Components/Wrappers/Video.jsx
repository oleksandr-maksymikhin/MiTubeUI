import React, { useState, useEffect, useRef, useContext } from "react";
import "../../Styles/VideoFull/VideoFull.scss";

import Channel from "./Channel";
import NextVideos from "./NextVideo";
import VideoPlayer from "../Common/Video/VideoPlayer";
import MakeComment from "./MakeComment";
import Comments from "./Comments";
import LikeIcon from "../Cards/LikeIcon";
import activ_icon from "../../Assets/Icons/activ.svg";
import download_icon from "../../Assets/Icons/download.svg";
import save_icon from "../../Assets/Icons/save.svg";
import next_icon from "../../Assets/Icons/next.svg";
import share_icon from "../../Assets/Icons/share.svg";
import serverContext from "../../Context/ServerContext";

import { ActiveContentContext } from "../../Context/ActiveContentContext";

export default function VideoFull({ videoId }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRefVideo = useRef(null);
  const dropdownButtonRef = useRef(null);
  const { serverPort } = useContext(serverContext);
  const [commentGet, setCommentGet] = useState(true);
  const [showMakeComment, setShowMakeComment] = useState(false);
  const [answerComment, setAnswerComment] = useState();
  const [colorCount, setColorCount] = useState();
  const [video, setVideo] = useState();
  const { setActiveContent } = useContext(ActiveContentContext);
  const [userLogin, setUserLogin] = useState(false);
  useEffect(() => {
    setUserLogin(JSON.parse(localStorage.getItem("userCookie")) ? true : false);
    const fetchVideos = async () => {
      try {
        const response = await fetch(`${serverPort}/Videos/${videoId}`, {
          method: "GET",
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch videos. Status: ${response.status}`);
        }
        const data = await response.json();

        setVideo(data);
        let myColorCount = {};
        if (data.likeStatus == 2) {
          myColorCount.like = 2;
          myColorCount.dislike = 1;
        } else if (data.likeStatus == 3) {
          myColorCount.like = 1;
          myColorCount.dislike = 3;
        } else {
          myColorCount.like = 1;
          myColorCount.dislike = 1;
        }
        myColorCount.likecount = data.likecount;
        myColorCount.dislikecount = data.dislikecount;

        setColorCount(myColorCount);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();

    function handleClickOutsideVideo(event) {
      if (
        dropdownRefVideo.current &&
        !dropdownRefVideo.current.contains(event.target) &&
        event.target !== dropdownButtonRef.current &&
        event.target.parentNode !== dropdownButtonRef.current
      ) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("click", handleClickOutsideVideo);

    return () => {
      document.removeEventListener("click", handleClickOutsideVideo);
    };
  }, []);

  const handleComment = async () => {
    let user = JSON.parse(localStorage.getItem("userCookie"));

    if (user) {
      const formData = new FormData();
      formData.append("sessionId", user.id);
      let currentTimestamp = new Date().toISOString();
      formData.append("Timestamp", currentTimestamp);
      const response = await fetch(
        `${serverPort}/Playlists/videos?playlistId=${user.watchLaterPlaylistId}&videoId=${videoId}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );
      if (!response.ok) {
        alert.textContent = "Sing in";
      } else {
        // const data = await response.json();
      }
      document.getElementById("inputComment").value = "";
      setCommentGet(true);
    }
  };

  const handleFollow = async () => {
    let user = JSON.parse(localStorage.getItem("userCookie"));
    
    if (user) {
      const formData = new FormData();
      formData.append("sessionId", user.id);
      formData.append("PublisherId", user.id);
      formData.append("SubscriberId", video.user.id);
      const response = await fetch(`${serverPort}/Subscriptions`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!response.ok) {
        alert.textContent = "Sing in";
      } else {
        // const data = await response.json();
      }
      console.log("Add Folower");
    }
  };

  const handleCopyToClipboard = () => {
    const textToCopy = `${window.location.origin}/video/${videoId}`;
    navigator.clipboard.writeText(textToCopy);
  };

  function handleDropdownToggle() {
    setShowDropdown(!showDropdown);
  }

  let showComments = () => {
    setShowMakeComment(true);
    document.getElementById("floating-comments").classList.remove("hidden");
  };

  return (
    <>
      {video && colorCount && (
        <div className="video-container" key={video.id}>
          <div className="content-row-start">
            <div className="item-2">
              <VideoPlayer video={video} />
              <div className="section-container">
                <h1 className="n1">{video.title}</h1>
                <span className="folow user-details">
                  <span
                    className="channel-banner"
                    onClick={() => {
                      setActiveContent(
                        <Channel isOwner={false} user={video.user} />
                      );
                    }}
                  >
                    <img
                      className="userImg"
                      src={`${
                        serverPort + "/showImage?url=" + video.user.posterUrl
                      }`}
                      alt=""
                    />
                    <div className="name">
                      <span className="n2 channel-name">{video.user.name}</span>
                      <span className="n3 desktop">
                        {video.user.subscribersQuantity
                          ? video.user.subscribersQuantity
                          : 0}
                      </span>
                    </div>
                  </span>
                  <button
                    className={`btn-lg ${userLogin ? "" : "inactive"}`}
                    onClick={handleFollow}
                  >
                    Follow
                  </button>
                  {colorCount && video && (
                    <aside className="action-group">
                      <LikeIcon
                        key={Date.now() + 2}
                        colorCount={colorCount.like}
                        colorObj={colorCount}
                        setColorCount={setColorCount}
                        alt="like"
                        videoId={video.id}
                      />

                      <LikeIcon
                        key={Date.now()}
                        colorObj={colorCount}
                        colorCount={colorCount.dislike}
                        setColorCount={setColorCount}
                        alt="dislike"
                        videoId={video.id}
                      />
                    </aside>
                  )}
                  <button
                    ref={dropdownButtonRef}
                    className="dropbtn icon-button icon-btn desktop"
                    onClick={handleDropdownToggle}
                  >
                    <img alt="icon" src={activ_icon} />
                  </button>
                  <span
                    ref={dropdownRefVideo}
                    id="myDropdown"
                    className={`dropdown-content ${
                      showDropdown ? "hiddens" : ""
                    }`}
                  >
                    <a className="n2" href="#" onClick={handleCopyToClipboard}>
                      <img alt="icon" src={share_icon} />
                      Share
                    </a>
                    <a className="n2" href="#">
                      <img alt="icon" src={download_icon} />
                      Download
                    </a>
                    <a className="n2" href="#" onClick={handleComment}>
                      <img alt="icon" src={save_icon} />
                      Save
                    </a>
                  </span>
                </span>
                <span className="plag n3">{video.description}</span>
                {!showMakeComment && (
                  <>
                    <span className="n1 mb-25">Comments</span>
                    <span className="n2 showComents" onClick={showComments}>
                      Comments <img alt="icon" src={next_icon} />
                    </span>
                  </>
                )}
                <MakeComment
                  videoId={videoId}
                  setCommentGet={setCommentGet}
                  showMakeComment={showMakeComment}
                  answerComment={answerComment}
                  setAnswerComment={setAnswerComment}
                />
                <Comments
                  key={videoId + 28}
                  videoId={videoId}
                  commentGet={commentGet}
                  setCommentGet={setCommentGet}
                  setShowMakeComment={setShowMakeComment}
                  setAnswerComment={setAnswerComment}
                />
              </div>
            </div>
            <div className={`item-1 ${showMakeComment ? "hidden" : ""}`}>
              <NextVideos />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
