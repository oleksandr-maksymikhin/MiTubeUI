import React, { useContext } from "react";
import "../../../Styles/VideoFull/MakeComment.scss";
import bnt_input_icon from "../../../Assets/Icons/bnt_input.svg";
import serverContext from "../../../Context/ServerContext";

export default function MakeCommentDesktop({
  user,
  makeComment,
  answerComment,
}) {
  const { serverPort } = useContext(serverContext);
  return (
    <div className="item desktop">
      <div className="row">
        <img
          className="userImg"
          src={`${serverPort}/showImage?url=${user.posterUrl}`}
          alt=""
        />
        <span className="sub-com  make-comment">
          <input
            id="inputComment"
            type="text"
            key={answerComment?.id + "1"}
            className="n3"
            placeholder="Write your comment"
            defaultValue={answerComment ? `@${answerComment.nickname} ` : ""}
          />
          <button className=" icon-btn" onClick={makeComment}>
            <img alt="icon hr" src={bnt_input_icon} />
          </button>
        </span>
      </div>
    </div>
  );
}
