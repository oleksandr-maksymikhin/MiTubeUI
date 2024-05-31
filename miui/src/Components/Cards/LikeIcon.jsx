import React from "react";
import userContext from "../../Context/UserContext";
import serverContext from "../../Context/ServerContext";
import { useContext, useEffect, useState } from "react";

function LikeIcon({ colorCount, alt, videoId, setColorCount, colorObj }) {
  const { user, setUser } = useContext(userContext);
  const { serverPort } = useContext(serverContext);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userCookie")));
  }, []);

  const handleLike = async () => {
    if (user) {
      const formData = new FormData();
      formData.append("sessionId", user.id);
      formData.append("UserId", user.id);
      formData.append("VideoId", videoId);

      alt === "like"
        ? formData.append("Actionstate", 2)
        : formData.append("Actionstate", 3);

      const response = await fetch(`${serverPort}/Interactions`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!response.ok) {
        alert.textContent = "Sing in";
      } else {
        const data = await response.json();

        let myColorCount = {};
        switch (colorCount) {
          case 1:
            if (alt === "like") {
              myColorCount.like = 2;
              myColorCount.dislike = 1;
              myColorCount.likecount = colorObj.likecount + 1;
              colorObj.dislike > 1
                ? (myColorCount.dislikecount = colorObj.dislikecount - 1)
                : (myColorCount.dislikecount = colorObj.dislikecount);
            } else {
              myColorCount.like = 1;
              myColorCount.dislike = 3;

              colorObj.like > 1
                ? (myColorCount.likecount = colorObj.likecount - 1)
                : (myColorCount.likecount = colorObj.likecount);
              myColorCount.dislikecount = colorObj.dislikecount + 1;
            }
            break;
          case 2:
            myColorCount.like = 1;
            myColorCount.dislike = colorObj.dislike;
            myColorCount.likecount = colorObj.likecount - 1;
            myColorCount.dislikecount = colorObj.dislikecount;

            break;
          case 3:
            myColorCount.like = colorObj.like;
            myColorCount.dislike = 1;
            myColorCount.likecount = colorObj.likecount;
            myColorCount.dislikecount = colorObj.dislikecount - 1;
            console.log(colorObj.like);
            break;
          default:
            break;
        }

        setColorCount(myColorCount);
      }
    }
  };
  return (
    <>
      {colorCount !== null && colorObj && (
        <span >
          <div className={`like ${user?"":"inactive"}`} alt={alt} onClick={handleLike}>
            <svg 
              viewBox="0 0 30 30"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M30 13.5C30 12.7044 29.7127 11.9413 29.2012 11.3787C28.6897 10.8161 27.996 10.5 27.2727 10.5H18.6545L19.9636 3.645C19.9909 3.495 20.0045 3.33 20.0045 3.165C20.0045 2.55 19.7727 1.98 19.4045 1.575L17.9591 0L8.98636 9.87C8.48182 10.425 8.18182 11.175 8.18182 12V27C8.18182 27.7956 8.46916 28.5587 8.98062 29.1213C9.49208 29.6839 10.1858 30 10.9091 30H23.1818C24.3136 30 25.2818 29.25 25.6909 28.17L29.8091 17.595C29.9318 17.25 30 16.89 30 16.5V13.5ZM0 30H5.45455V12H0V30Z"
                fill={colorCount > 1 ? "#BDCC9D" : "#DCA277"}
              />
            </svg>
          </div>
          <span className="n2" key={Date.now()}>
            {alt === "like" ? colorObj.likecount : colorObj.dislikecount}
          </span>
        </span>
      )}
    </>
  );
}

export default LikeIcon;
