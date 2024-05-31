import React, { useEffect, useState, useContext } from 'react';
import '../../../Styles/Studio/ChannelHome.scss';
import UploadVideoModal from '../../Modals/UploadVideoModal';

import studio_image from "../../../Assets/Images/studio1.png"
import userContext from '../../../Context/UserContext';
import serverContext from '../../../Context/ServerContext';

function ChannelHome() {
  const [show, setShow] = useState(false);
  const {user,setUser}=useContext(userContext);
  const { serverPort } = useContext(serverContext);

 const [analitics, setAnalitics] = useState([]);
  
  useEffect(()=>{
    setUser(JSON.parse(localStorage.getItem('userCookie')));
    const fetchAnalitics = async () => {
      try {
        const response = await fetch(`${serverPort}/Users/${user.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch analitics. Status: ${response.status}`);
        }
        const data = await response.json();
        setAnalitics(data);
      } catch (error) {
        console.error("Error fetching analitics:", error);
      }
    };
    fetchAnalitics();
 },[]);

 




    return (
       
      <div className='studio'>
        <UploadVideoModal show={show} handleClose={()=>setShow(false)}/>
        <div className='rectangl'>
          <h2 className='panel-settings'>
          Channel control panel
          </h2>
        </div>
        <div className='columncontainer'>
          <div className='left'>
            <img className='image' src={studio_image} />
            <div className='text'>
            <p className='paragraf-upload'>It will show you the video you downloaded last.</p>
            <p className='paragraf-upload'> To add a video, click below.</p>
            </div>
            <button className='upload btn-lg' onClick={()=>setShow(true)}>Add a video</button>
          </div>
          <div className='right'>
    <div className='info title'><span>Channel analytics</span></div>
    <div className='canal-analitics'>
      <div className='subscribers-block'>
      <p>Subscribers</p>
      <p className='number-sub'>{analitics.subscribersQuantity}</p>
      </div>
    </div>
 
  <hr></hr>
  <div className='info title'><span>Summary data</span></div>
  <div className='canal-analitics'>
    <div className='info-time'>
      <p>Views</p>
      <p>{analitics.videoViewQuantity}</p>
    </div>
    <div className='info-time'>
      <p>Video Quantity</p>
      <p>{analitics.videosQuantity}</p>
    </div>
    <div className='info-time'>
      <p>Comments Quantity</p>
      <p>{analitics.commentsQuantity}</p>
    </div>
  </div>
</div>
        </div>
      </div>
  
    )
}
export default ChannelHome;