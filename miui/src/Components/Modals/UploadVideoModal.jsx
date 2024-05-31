import React, { useEffect, useState, useContext } from "react";
import "../../Styles/Modals/UploadVideoModal.scss";
import UploadIcon from "../../Assets/Icons/download-icon.png";
import UploadFrameIcon from "../../Assets/Icons/uploadFrame.svg";
import userContext from "../../Context/UserContext";
import serverContext from "../../Context/ServerContext";
import PhotoCropping from "../Modals/PhotoCroppingModal";

export default function UploadVideoModal({ handleClose, show }) {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  const [uploadVideo, setUploadVideo] = useState(null);
  const [videoThumbnails, setVideoThumbnails] = useState([]);
  const [selectPreview, setSelectPreview] = useState(null);
  const [parametrs, setParametrs] = useState(false);
  const [uploadPreview, setUploadPreview] = useState(null);
  const [newVideo, setNewVideo] = useState({
    userId: "",
    title: "",
    videoFile: "",
    posterFile: "",
    description: "",
    isPublic: true,
    duration: "",
    date: "",
    playlistId:""
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [showForPreview, setShowForPreview] = useState(false);
  const [aspectRatio, setAspectRatio] = useState(16 / 9);
  const [playlists, setPlaylists] = useState([]);

  let videoFile;

  const { user, setUser } = useContext(userContext);
  const { serverPort } = useContext(serverContext);

    useEffect(() => {
        setUser(JSON.parse(localStorage.getItem('userCookie')));
        const fetchPlaylists= async () => {
          try {
            const response = await fetch(`${serverPort}/Playlists/user/${user.id}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch playlists. Status: ${response.status}`);
            }
            const data = await response.json();
            setPlaylists(data);
            
          } catch (error) {
            console.error("Error fetching playlists:", error);
          }
        };
        fetchPlaylists();
        
    }, []);


  const handleCloseModal = () => {
    setUploadVideo(null);
    setVideoThumbnails([]);
    setParametrs(false);
    setSelectPreview(null);
    setUploadPreview(null);
    setNewVideo({ ...newVideo, title: "", description: "", posterFile: "" });
  };

  const handleDropFile = (e) => {
    e.preventDefault();

    videoFile = e.dataTransfer.files[0];
    var alert = document.getElementById("alert-p");
    if (e.dataTransfer.items && e.dataTransfer.items.length === 1) {
      if (videoFile.type.includes("video")) {
        setUploadVideo(videoFile);
        cuttingFrames();
      } else {
        alert.textContent =
          "*Будь-ласка, перетягніть для завантаження тільки відео-файл ";
      }
    } else {
      alert.textContent =
        "*Будь-ласка, перетягніть для завантаження тільки один відео-файл ";
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const selectVideoFile = (e) => {
    videoFile = e.target.files[0];
    setUploadVideo(videoFile);
    cuttingFrames();
  };

  const cuttingFrames = () => {
    const videoUrl = URL.createObjectURL(videoFile);
    console.log("videoUrl", videoUrl);
    const video = document.createElement("video");
    video.preload = "metadata";
    video.src = videoUrl;
    video.addEventListener("loadedmetadata", () => {
      newVideo.duration = parseInt(video.duration);
      console.log("duration", newVideo.duration);

      const timepoints = [];
      for (let i = 0; i < 3; i++) {
        const timepoint = Math.random() * video.duration;
        timepoints.push(timepoint);
      }

      timepoints.forEach((timepoint) => {
        const videoCopy = video.cloneNode();
        videoCopy.currentTime = timepoint;
        videoCopy.addEventListener("seeked", () => {
          const canvas = document.createElement("canvas");
          const context = canvas.getContext("2d");
          canvas.width = videoCopy.videoWidth;
          canvas.height = videoCopy.videoHeight;
          context.drawImage(videoCopy, 0, 0, canvas.width, canvas.height);
          const thumbnailUrl = canvas.toDataURL("image/jpeg");
          setVideoThumbnails((prevThumbnails) => [
            ...prevThumbnails,
            thumbnailUrl,
          ]);
        });
      });
    });
  };

  // а воно так має працювати? base4 to blob (maybe)
  const b64toBlob = (b64Data, contentType = "", sliceSize = 512) => {
    const byteCharacters = atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });

    return blob;
  };

  const handlePreviewChange = (e) => {
    const selectPreviewInRadio = e.target.value;
    setSelectedImage(selectPreviewInRadio);
    setShowForPreview(true);
  };

  const selectFrameFile = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageData = await readFileAsDataURL(file);
      setSelectedImage(imageData);
      setShowForPreview(true);
    }
  };

  const readFileAsDataURL = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  };

  const handlePreviewCropped = (croppedImage) => {
    setSelectPreview(croppedImage);
    const base64String = croppedImage.split(",")[1];
    const contentType = "image/jpeg";
    const b64Data = base64String;
    const blob = b64toBlob(b64Data, contentType);
    setNewVideo({ ...newVideo, posterFile: blob });
  };

  const handleVideoName = (e) => {
    const { value } = e.target;
    setNewVideo((prevState) => ({
      ...prevState,
      title: value,
    }));
  };

  const selectPreviewStyle = {
    backgroundImage: `url(${uploadPreview}`,
    backgroundSize: `cover`,
  };

  const handleUploadNewVideo = async () => {
    newVideo.userId = user.id;
    newVideo.videoFile = uploadVideo;
    const date = new Date();
    const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${
      date.getMonth() + 1
    } ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    newVideo.date = dateString;

    const formData = new FormData();
    formData.append("sessionId", user.id);
    formData.append("userId", newVideo.userId);
    formData.append("title", newVideo.title);
    formData.append(
      "videoFile",
      newVideo.videoFile,
      `videoFile${dateString + newVideo.videoFile.name}`
    );
    formData.append(
      "posterFile",
      newVideo.posterFile,
      `myPrewiew${dateString}.jpg`
    );
    formData.append("description", newVideo.description);
    formData.append("isPublic", newVideo.isPublic);
    formData.append("duration", newVideo.duration);
    formData.append("date", newVideo.date);
    formData.append("playlistId",newVideo.playlistId);

    const response = await fetch(`${serverPort}/Videos`, {
      method: "POST",
      credentials: "include",
      body: formData,
    });
    if (!response.ok) {
      console.log("Error HTTP:" + response.status);
    } else {
      handleClose();
      handleCloseModal();
    }
  };

  return (
    <>
      <div className={showHideClassName}>
        <div className="modal-upload">
          <div
            className="cross"
            onClick={() => {
              handleClose();
              handleCloseModal();
            }}
          ></div>
          <form>
            {!uploadVideo ? (
              <div className="center-elements">
                <div>
                  <h2>Video download</h2>
                </div>
                <div
                  onDrop={handleDropFile}
                  onDragOver={handleDragOver}
                  className="upload-place"
                >
                  <label htmlFor="file-input-1">
                    <img className="upload-icon" src={UploadIcon}></img>
                  </label>
                  <p id="alert-p"></p>
                </div>

                <label className="inscription-span">
                  Drag and drop your files here or click the button below to
                  select them on your computer.
                </label>
                <label className="inscription-span">
                  Until you publish the video, access to it will be restricted.
                </label>
                <label htmlFor="file-input" className="upload-button">
                  <span>Select file</span>
                  <input
                    id="file-input"
                    type="file"
                    accept="video/*"
                    className="hidden"
                    onChange={selectVideoFile}
                  />
                </label>

                <label className="inscription-span">
                  By adding a video, you accept the Terms of Use and community
                  rules.
                </label>
                <label className="inscription-span">
                  You also agree to respect the copyright and confidentiality of
                  other users' data.
                </label>
              </div>
            ) : !parametrs ? (
              <div>
                <h2 className="modal-inform">Information.</h2>
                <div className="upload-video-information">
                  <div className="inf-left">
                    <input
                      type="text"
                      placeholder="Name (required field)"
                      value={newVideo.title}
                      onChange={handleVideoName}
                    ></input>
                    <textarea
                      placeholder="Description: Tell us what your video is about.(required field)"
                      className="textarea"
                      value={newVideo.description}
                      onChange={(e) =>
                        setNewVideo({
                          ...newVideo,
                          description: e.target.value,
                        })
                      }
                    ></textarea>
                    <h3>Preview</h3>
                    <label className="inscription-label">
                      Choose a screensaver from the suggested ones or upload a
                      new one. It should grab the viewers' attention and reflect
                      the content of the video.
                    </label>
                    <div className="preview-galery">
                      <label
                        className="upload-preview"
                        style={selectPreviewStyle}
                      >
                        <input
                          id="file-input-2"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={selectFrameFile}
                        />
                        {!uploadPreview && (
                          <img
                            src={UploadFrameIcon}
                            alt="upload frame"
                            className="upload-preview-icon"
                          />
                        )}
                      </label>
                      {videoThumbnails.map((thumbnail, index) => (
                        <label className="upload-preview" key={index}>
                          <input
                            type="radio"
                            name="preview"
                            value={thumbnail}
                            checked={selectPreview === thumbnail}
                            onChange={handlePreviewChange}
                          />
                          <img
                            key={index}
                            src={thumbnail}
                            alt={`Frame ${index + 1}`}
                            className="preview-img"
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="inf-right">
                    {selectPreview ? (
                      <div className="test">
                        <img
                          src={selectPreview}
                          alt="upload frame"
                          className="upload-preview-icon"
                        />
                      </div>
                    ) : (
                      <video>
                        <source
                          src={URL.createObjectURL(uploadVideo)}
                          type={uploadVideo.type}
                        />
                      </video>
                    )}
                    <h3>Playlists</h3>
                    <label className="inscription-label">
                      Add videos to at least one playlist to make it easier for
                      viewers to navigate your channel.
                    </label>
                    <br />
                    <select className="playlists-select" onChange={(e) =>
                        setNewVideo({
                          ...newVideo,
                          playlistId: e.target.value,
                        })}>
                      <option disabled selected="selected">
                        Select a playlist
                      </option>
                      {
            playlists.filter(playlist => playlist.name!=="watch later").map((playlist) => (
              <option key={playlist.id} value={playlist.id}>
                {playlist.name}
              </option>
            ))}
                      
                    </select>
                  </div>
                </div>
                <button
                  className="btn-lg btn-next-inf"
                  disabled={
                    !newVideo.title.trim() ||
                    !newVideo.description.trim() ||
                    newVideo.posterFile == ""
                  }
                  onClick={() => setParametrs(true)}
                >
                  Next
                </button>
              </div>
            ) : (
              <div className="parametrs">
                <h2 className="modal-inform">Access parameters</h2>
                <label className="inscription-label">
                  Specify who can watch the video.
                </label>
                <div className="left-righr-p">
                  <div className="p-left">
                    <hr />
                    <h3>Save or publish</h3>
                    <label className="inscription-label">
                      Select the video access option: open, via link, or
                      restricted
                    </label>
                    <div className="radio-access">
                      <div>
                        <input
                          type="radio"
                          id="open"
                          name="access"
                          value={true}
                          checked
                          onChange={(e) =>
                            setNewVideo({
                              ...newVideo,
                              isPublic: e.target.value,
                            })
                          }
                        />
                        <label for="open" className="inscription-label types">
                          {" "}
                          Open access
                        </label>
                        <br></br>
                        <label className="inscription-label ins">
                          available for everyone to search and view
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="forLink"
                          name="access"
                          value={false}
                          onChange={(e) =>
                            setNewVideo({
                              ...newVideo,
                              isPublic: e.target.value,
                            })
                          }
                        />
                        <label
                          for="forLink"
                          className="inscription-label types"
                        >
                          {" "}
                          Access via the link
                        </label>
                        <br></br>
                        <label className="inscription-label ins">
                          {" "}
                          available to those who have a link
                        </label>
                      </div>
                      <div>
                        <input
                          type="radio"
                          id="forClosed"
                          name="access"
                          disabled="false"
                        />
                        <label
                          for="forClosed"
                          className="inscription-label types disabled"
                        >
                          {" "}
                          Closed access
                        </label>
                        <br></br>
                        <label
                          for="forClosed"
                          className="inscription-label ins disabled"
                        >
                          {" "}
                          available only to selected users
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="p-right">
                    {selectPreview ? (
                      <div className="test">
                        <img
                          src={selectPreview}
                          alt="upload frame"
                          className="upload-preview-icon"
                        />
                      </div>
                    ) : (
                      <video>
                        <source
                          src={URL.createObjectURL(uploadVideo)}
                          type={uploadVideo.type}
                        />
                      </video>
                    )}
                  </div>
                </div>
                <div className="btn-save-back">
                  <button
                    className="btn-lg back"
                    onClick={() => setParametrs(false)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn-lg "
                    onClick={handleUploadNewVideo}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      <PhotoCropping
        show={showForPreview}
        handleClose={() => setShowForPreview(false)}
        selectedImage={selectedImage}
        aspectRatio={aspectRatio}
        propOnImageCropped={handlePreviewCropped}
      />
    </>
  );
}
