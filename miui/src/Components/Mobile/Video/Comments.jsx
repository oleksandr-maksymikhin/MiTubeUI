import arrow_down from "../../../Assets/Icons/arrow_down.svg";
import "../../../Styles/VideoFull/Comment.scss";
import CommentsDesktop from "../../Desktop/Video/Comments";

export default function CommentsMobile({ comments, setShowMakeComment,setAnswerComment }) {
  let hideComments = () => {
    setShowMakeComment(false);
    document.getElementById("floating-comments").classList.add("hidden");
  };

  return (
    <>
      <div id="floating-comments" className="hidden">
        <span className="row">
          <h4>Comments</h4>
          <button onClick={hideComments}>
            <img src={arrow_down} alt="close" />
          </button>
        </span>
        <div className="comment-container">
          {comments.map((comment) => (
            <CommentsDesktop key={comment.id} comment={comment} setAnswerComment={setAnswerComment} />
          ))}
        </div>
      </div>
    </>
  );
}
