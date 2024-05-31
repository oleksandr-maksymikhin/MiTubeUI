import { PlatformContext } from "../../Context/PlatformContext";
import MakeCommentDesktop from "../Desktop/Video/MakeCommentDesktop";
import MakeCommentMobile from "../Mobile/Video/MakeCommentMobile";
import { useContext, useEffect } from "react";
import userContext from "../../Context/UserContext";
import serverContext from "../../Context/ServerContext";

export default function MakeComment({
  videoId,
  setCommentGet,
  showMakeComment,
  answerComment,
  setAnswerComment,
}) {
  const { user, setUser } = useContext(userContext);
  const { serverPort } = useContext(serverContext);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userCookie")));
  }, []);

  const { platform } = useContext(PlatformContext);

  const handleComment = async () => {
    let data = document.getElementById("inputComment").value;

    if (!data) {
      alert.textContent = "Write your comments";
    } else {
      const formData = new FormData();
      formData.append("sessionId", user.id);
      formData.append("UserId", user.id);
      formData.append("VideoId", videoId);

      if (answerComment) {
        formData.append("ParentId", answerComment.id);
        const datanew = data.replace(/@[^ ]+/g, "").trim();
        formData.append("Value", datanew);
        setAnswerComment(null);
      } else {
        formData.append("Value", data);
      }
      let currentTimestamp = new Date().toISOString();
      formData.append("Timestamp", currentTimestamp);
      const response = await fetch(`${serverPort}/Comments`, {
        method: "POST",
        credentials: "include",
        body: formData,
      });
      if (!response.ok) {
        alert.textContent = "Sing in";
      } else {
        const data = await response.json();
      }
      document.getElementById("inputComment").value = "";
      setCommentGet(true);
    }
  };

  return (
    <>
      {user && (
        <div className="search-content">
          {platform === "desktop" ? (
            <MakeCommentDesktop
              user={user}
              makeComment={handleComment}
              answerComment={answerComment}
            />
          ) : (
            showMakeComment && (
              <MakeCommentMobile
                makeComment={handleComment}
                answerComment={answerComment}
              />
            )
          )}
        </div>
      )}
    </>
  );
}
