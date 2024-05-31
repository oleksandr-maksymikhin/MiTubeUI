import "../../../Styles/VideoFull/MakeComment.scss";
import bnt_input_icon from "../../../Assets/Icons/bnt_input.svg";

export default function MakeCommentMobile({ makeComment, answerComment }) {
  return (
    <div className="item make-comment-mobile">
      <div className="row">
        <span className="sub-com  make-comment">
          <input
            key={answerComment?.id + "1"}
            id="inputComment"
            type="text"
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
