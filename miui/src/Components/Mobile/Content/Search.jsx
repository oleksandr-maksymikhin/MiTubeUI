import SearchCard from "../../Cards/SearchCard";
import VideoCard from "../../Cards/GalleryCard";

export default
function SearchMobile({ videos }) {
    return (
    <>
    {
       videos.filter(video => video.isPublic).map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
    </>);
}