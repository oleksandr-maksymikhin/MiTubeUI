import { useEffect } from "react";
import VideoCard from "../../Cards/GalleryCard";

export default
function SearchDesktop({ videos }) {

    return (
    <>
    <div className="content-row">
        {
            videos.filter(video => video.isPublic).map((video) => (
                <VideoCard key={video.id} video={video} />
            ))
        }
    </div>
    </>);
}