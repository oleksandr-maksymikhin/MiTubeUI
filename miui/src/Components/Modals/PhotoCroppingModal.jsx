import "../../Styles/Modals/PhotoCropping.scss";
import React, { useEffect, useState } from 'react'; 
import { ImageCropper } from "./ImageCropper";
import Cropper from "react-easy-crop";

function PhotoCropping({handleClose,show,selectedImage,aspectRatio, propOnImageCropped }) {
    
    const showHideClassName = show ? "modal display-block" : "modal display-none";
    
    const[image,setImage]=useState("");
    const[aspect,setAspect]=useState();
    const [imgAfterCrop,setImgAfterCrop]=useState("");

    useEffect(()=>{
        setImage(selectedImage);
        setAspect(aspectRatio);
    },[selectedImage,aspect])

    const onCropDone=(imgCroppedArea)=>{
        const canvasEle=document.createElement("canvas");
        canvasEle.width=imgCroppedArea.width;
        canvasEle.height=imgCroppedArea.height;
        const context=canvasEle.getContext("2d");

        let imageObj1=new Image();
        imageObj1.src=image;
        imageObj1.onload=function(){
            context.drawImage(
                imageObj1,
                imgCroppedArea.x,
                imgCroppedArea.y,
                imgCroppedArea.width,
                imgCroppedArea.height,
                0,
                0,
                imgCroppedArea.width,
                imgCroppedArea.height
            );

            const dataUrl=canvasEle.toDataURL("image/jpeg");
            setImgAfterCrop(dataUrl);
            propOnImageCropped(dataUrl);
            handleClose()
        }

    }

    const onCropCancel=()=>{
    }

    return (
        <div className={showHideClassName}>
        <div className="modal-photo">
            <div className="cross-p" onClick={handleClose}></div>
            <ImageCropper 
                image={selectedImage}
                onCropDone={onCropDone}
                onCropCancel={onCropCancel}
                aspect={aspect}
                className="cropper"
            />
        </div>
        </div>
    )
}
export default PhotoCropping;