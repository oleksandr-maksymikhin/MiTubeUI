import VideoCard from "../../Cards/GalleryCard";

export default function NextVideoMobile({ videos }) {
  return (
    <>
      <div className="content-row">
        {videos?.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </>
  );
}
