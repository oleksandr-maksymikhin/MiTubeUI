import NextVideoCard from "../../Cards/NextVideoCard";

export default function NextVideoDesktop({ videos }) {
  return (
    <>
      {videos?.map((video) => (
        <NextVideoCard key={video.id} video={video} />
      ))}
    </>
  );
}
