import "../../../Styles/Studio/ChannelSettings.scss";
import React, { useState, useContext, useEffect } from "react";

import userContext from '../../../Context/UserContext';
import serverContext from '../../../Context/ServerContext';
import PhotoCropping from '../../Modals/PhotoCroppingModal';
import { ActiveContentContext } from "../../../Context/ActiveContentContext";
import LoginRegister from '../../Modals/LoginRegister';

function ChannelSettings() {

    const [selectedImage, setSelectedImage] = useState(null);
    const [show, setShow] = useState(false);
    const [showForBaner,setShowForBaner] = useState(false);
    const [aspectRatio,setAspectRatio]=useState(4 / 3);
    const [imgAfterCrop, setImgAfterCrop] = useState(null);
    
    

    const[profilePhoto,setPhotoProfile]=useState(null);
    const[profileBanner,setProfileBanner]=useState(null);
    const[newUser,setNewUser]=useState({name:'',
                                    nickname:'',
                                    description:'',
                                    posterFile:'',
                                    banerFile:''})

    const {user,setUser}=useContext(userContext);
    const{serverPort}=useContext(serverContext);
    
    const { setActiveModal, setActiveContent } = useContext(ActiveContentContext);

    useEffect(()=>{
       
        setUser(JSON.parse(localStorage.getItem('userCookie')));
        console.log('user',user);
        setPhotoProfile(user.posterUrl);
        setProfileBanner(user.banerUrl);
        setNewUser(user);
       
    },[]);


  const handleOnChangePoster = async (e) => {
    setAspectRatio(10 / 3);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageData = await readFileAsDataURL(file);
      setSelectedImage(imageData);
      setShowForBaner(true);
    }
  };

  const handleOnChangeBaner = async (e) => {
    setAspectRatio(3 / 3);
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const imageData = await readFileAsDataURL(file);
      setSelectedImage(imageData);
      setShow(true);
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

    const handleImageCropped = (croppedImage) => {
        setPhotoProfile(croppedImage);
        const base64String = croppedImage.split(",")[1];
        const contentType = 'image/jpeg';
        const b64Data = base64String;
        const blob = b64toBlob(b64Data, contentType);
        setNewUser({...newUser, posterFile: blob });
    };

    const handleBanerCropped = (croppedImage) => {
        setProfileBanner(croppedImage);
        const base64String = croppedImage.split(",")[1];
        const contentType = 'image/jpeg';
        const b64Data = base64String;
        const blob = b64toBlob(b64Data, contentType);
        setNewUser({...newUser, banerFile: blob });
    };

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

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userCookie")));
    setPhotoProfile(user.posterUrl);
    setProfileBanner(user.banerUrl);
    setNewUser(user);
  }, []);

    const handleSaveSettingsUser=async()=>{
        const date = new Date();
        const dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getMonth() + 1}`;
        const formData = new FormData();
        formData.append('sessionId', user.id);
        formData.append('id',user.id);
        formData.append('userId', newUser.id);
        formData.append('name',newUser.name);
        formData.append('nickname',newUser.nickname);
        formData.append('description',newUser.description);
       /* ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()} */
        if (newUser.posterFile) {
          if (newUser.posterFile instanceof Blob) {
              formData.append('PosterFile', newUser.posterFile, `myPoster${dateString}.jpeg`);
          } else {
              console.error('PosterFile is not a Blob:', newUser.posterFile);
          }
      }
      if (newUser.banerFile) {
          if (newUser.banerFile instanceof Blob) {
              formData.append('BanerFile', newUser.banerFile, `myBaner${dateString}.jpeg`);
          } else {
              console.error('BanerFile is not a Blob:', newUser.banerFile);
          }
      }
        //formData.append('PosterFile',newUser.posterFile, `myPoster${dateString}.jpeg`);
       // formData.append('BanerFile',newUser.banerFile,`myBaner${dateString}.jpeg`);
        if(user.userTypeDescription=='Administrator')
          {
            formData.append('userTypeId',1);
          }
        else if(user.userTypeDescription=='Registered user')
          {
            formData.append('userTypeId',2);
          }
        //formData.append('userTypeId',user.userTypeId);
        const response=await fetch(`${serverPort}/Users/${user.id}`,{
                method:'PUT',
                credentials:'include',                           
                body:formData
            });
            if(!response.ok){
              if(response.status===401){

                  setActiveModal(<LoginRegister
                      onEnterClick={() => setActiveModal()}
                      handleClose={() => setActiveModal(null)}
                    />);
              }
                console.log('Error HTTP:'+response.status);
            }
             else{
              const data=await response.json();
                localStorage.setItem('userCookie',JSON.stringify(data));
                setUser(data);
              console.log('new user',JSON.stringify(data));
              //setActiveContent(<Studio/>);
        //         //this.forceUpdate();
             }
            
    }


  return (
    <>
      <PhotoCropping
        show={show}
        handleClose={() => setShow(false)}
        selectedImage={selectedImage}
        aspectRatio={aspectRatio}
        propOnImageCropped={handleImageCropped}
      />

      <PhotoCropping
        show={showForBaner}
        handleClose={() => setShowForBaner(false)}
        selectedImage={selectedImage}
        aspectRatio={aspectRatio}
        propOnImageCropped={handleBanerCropped}
      />

      <div className="settings-content">
        <h2>Channel settings</h2>
        <form>
          <div>Channel name</div>
          <span>
            {" "}
            Come up with a channel name that represents you and your content.
          </span>
          <br></br>
          <span>You can change your name twice within 14 days.</span>
          <br></br>
          <input
            type="text"
            name="userName"
            placeholder="User"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
          />
          <br></br>
          <div>Pseudonym</div>
          <span>Come up with a unique username using letters and numbers.</span>
          <br></br>
          <input
            type="text"
            name="userPseudonim"
            placeholder="@User"
            value={newUser.nickname}
            onChange={(e) =>
              setNewUser({ ...newUser, nickname: e.target.value })
            }
          />
          <br></br>
          <div>Channel description</div>
          <textarea
            placeholder="Tell your audience about your channel"
            value={newUser.description}
            onChange={(e) =>
              setNewUser({ ...newUser, description: e.target.value })
            }
          ></textarea>
          <div>Profile photo</div>
          <span>
            A profile photo is displayed, for example, next to your videos or
            comments
          </span>
          <div className="photo-baner">
            <img
              src={profilePhoto}
              alt="Cropped"
              className="img-new-photo-profile"
            />
            <div>
              <span>
                We recommend using images with a size of at least 98x98 pixels
                in PNG or GIF format. Animated pictures cannot be downloaded.
                The file size is just over 4 MB.
              </span>
              <div className="btn-p-b">
                <label htmlFor="file-photo" className="upload-button btn-lg">
                  <span>Change</span>
                  <input
                    id="file-photo"
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleOnChangeBaner(e)}
                  />
                </label>
                {/* <label htmlFor="delete-photo" className="upload-button btn-lg">
                  <input
                    type="button"
                    id="delete-photo"
                    className="hidden"
                    onClick={() => {
                      setNewUser({ ...newUser, posterFile: null });
                      setPhotoProfile(null);
                    }}
                  />
                  <span>Remove</span>
                </label> */}
              </div>
            </div>
          </div>
          <div>Banner</div>
          <span>This image appears at the top of the channel page.</span>
          <div className="photo-baner">
            <img src={profileBanner} className="img-new-photo-banner" />
            <div>
              <span>
                In order for the channel to look attractive on all devices, we
                recommend uploading an image of at least 2048 x 1152 pixels. The
                file size is no more than 6 MB.
              </span>
              <div className="btn-p-b">
                <label htmlFor="file-baner" className="upload-button btn-lg">
                  <span>Change</span>
                  <input
                    id="file-baner"
                    className="hidden"
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleOnChangePoster(e)}
                  />
                </label>
                {/* <label htmlFor="delete-baner" className="upload-button btn-lg">
                  <span>Remove</span>
                  <input
                    type="button"
                    id="delete-baner"
                    className="hidden"
                    onClick={() => {
                      setNewUser({ ...newUser, banerFile: null });
                      setProfileBanner(null);
                    }}
                  />
                </label> */}
              </div>
            </div>
          </div>
          {/* <div>URL channel</div>
          <span>
            This is the default web address for your channel. A set of numbers
            and letters at the end of the link is a unique channel identifier.
          </span>
          <br></br>
          <input
            type="text"
            name="urlChanel"
            className="input-copy-url"
            readOnly
          /> */}
          <div>Contact Information</div>
          <span>Specify how to contact you regarding cooperation.</span>
          <br></br>
          <input
            type="text"
            name="userEmeil"
            placeholder=" Адреса електронної пошти"
            value={user.email}
          />
          <br></br>
          <button
            type="button"
            onClick={handleSaveSettingsUser}
            className="btn-lg"
          >
            Save changes
          </button>
        </form>
      </div>
    </>
  );
}
export default ChannelSettings;
