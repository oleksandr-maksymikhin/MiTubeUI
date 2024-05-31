import "../../Styles/ContentType/VideoCard.scss";
import { useContext } from "react";
import { ActiveContentContext } from "../../Context/ActiveContentContext";
import VideoFull from "../Wrappers/Video";
import serverContext from "../../Context/ServerContext";

export default function VideoCard({ video }) {
	const { setActiveContent } = useContext(ActiveContentContext);
	const { serverPort } = useContext(serverContext);

	function openVideo() {
		setActiveContent(<VideoFull key={video.id + 3} videoId={video.id} />);
	}

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
		<div className="video-card" onClick={openVideo}>
			<span className="duration-box">
				{`${formatDuration(video.duration)}`}
			</span>
			<img
				src={`${serverPort}/showImage?url=${video.posterUrl}`}
				alt=""
			/>
			<div className="row">
				<img
					className="mobile profile-icon"
					src={`${serverPort}/showImage?url=${video.user.posterUrl}`}
					alt="Account"
				/>
				<span className="col">
					<h4 className="title">{`${video.title}`}</h4>
					<span className="mobile info row">
						<h5 className="mobile">{`${video.user.name}`}</h5>
						<h5 className="mobile">{`${formatDate(
							video.date
						)}`}</h5>
					</span>
				</span>
			</div>
		</div>
	);
}
