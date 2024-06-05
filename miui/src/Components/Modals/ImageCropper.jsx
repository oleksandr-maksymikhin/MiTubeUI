import React, { useState,useEffect } from 'react';
import Cropper from "react-easy-crop";


export const ImageCropper = ({image,onCropDone,onCropCancel,aspect}) => {
    const[crop,setCrop]=useState({x:0,y:0});
    const [zoom,setZoom]=useState(1);
    const[croppedArea,setCrroppedArea]=useState(null);
 
    const onCropComplete=(croppedAreaPercentage,croppedAreaPixels)=>{
        setCrroppedArea(croppedAreaPixels)
    }

  return (
    <>
        <Cropper
            image={image}
            aspect={aspect}
            crop={crop}
            zoom={zoom}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            style={
                {
                    containerStyle:{
                        width:"90%",
                        height:"80%",
                        backgroundColor:"#fff",
                        marginTop:"5%",
                        marginLeft:"5%",
                        marginBottom:"5%"
                    }                
                }
            }/> 
            <button className="btn-lg cut" onClick={()=>{
                onCropDone(croppedArea);
            }}>Cut</button>
      </>      
  )
}
