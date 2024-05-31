import serverContext from "../../Context/ServerContext";
import { useContext } from "react";
import "../../Styles/ContentType/Search.scss"

export default
function SearchCard({video}) {

    const { serverPort } = useContext(serverContext);


    function formatDuration(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        const formattedMins = String(mins).padStart(2, "0");
        const formattedSecs = String(secs).padStart(2, "0");
        return `${formattedMins}:${formattedSecs}`;
      }
      
      function formatDate(dateString) {
        const options = {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        };
        return new Date(dateString).toLocaleDateString("en-US", options);
      }


    return (
        <>
        <div className="search-card row">
            <div className="card-thumbnail">
                <img className="thumbnail" src={`${serverPort}/showImage?url=${video.posterUrl}`} alt="Placeholder" />
                <span className="timestamp">{`${formatDuration(video.duration)}`}</span>
            </div>
            <div className="card-content">
                <h3>{`${video.title}`}</h3>
                <span className="card-info row">
                    <span>{`${video.views} views`} </span>
                    <span>{`${formatDate(video.date)} days ago`} </span>
                </span>
                <span className="card-author row">
                    <img src={`${serverPort}/showImage?url=${video.user.posterUrl}`} className="card-avatar" alt="Avatar"/>
                    <h4 className="card-nickname">Da nickname</h4>
                </span>
                <p>Card Description</p>
            </div>
        </div>
        </>
    );
}
