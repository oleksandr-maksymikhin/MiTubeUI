import '../../Styles/Modals/OnboardingModal.scss'
import React, { useEffect, useState } from 'react';
import Onboarding7 from '../../Assets/Images/onboarding7.png';
import Onboarding8 from '../../Assets/Images/onboarding8.png';
import Onboarding9 from '../../Assets/Images/onboarding9.png';

const Onboarding = ({ handleClose, show }) => {
    const [slideIndex, setSlideIndex] = useState(1);
    useEffect(() => {
        showSlides(slideIndex);
    },[slideIndex]);

    const plusSlides = (e) => {
        var slides = document.getElementsByClassName("slide");
        let newIndex = slideIndex + e;
        if (newIndex < 1) {
            setSlideIndex(slides.length);
        } else if (newIndex > slides.length) {
            setSlideIndex(1);
        } else {
            setSlideIndex(newIndex);
        }
    };

    const currentSlide = (e) => {
        showSlides(e);
    };

    const showSlides = (e) => { 
        var i;
        var slides = document.getElementsByClassName("slide");
        var numberSlides = slides.length;
        var dot = document.getElementsByClassName("dot");
        var next = document.getElementsByClassName("next");
        var prev = document.getElementsByClassName("prev");
        var close=document.getElementsByClassName("close");
        if (e > numberSlides) {
            setSlideIndex(1);
        }
        if (e < 1) {
            setSlideIndex(numberSlides);
        }
        if (e == numberSlides) {
            for (i = 0; i < next.length; i++) {
            next[i].style.display = "none";
        }
        for (i = 0; i < prev.length; i++) {
            prev[i].style.display = "none";
        }
        for (i = 0; i < close.length; i++) {
            close[i].style.display = "block";
        }
        } else {
        for (i = 0; i < next.length; i++) {
            next[i].style.display = "block";
        }   
        for (i = 0; i < prev.length; i++) {
            prev[i].style.display = "block";
        }
        for (i = 0; i < close.length; i++) {
            close[i].style.display = "none";
        }
        }
        for (i = 0; i < numberSlides; i++)
        {
            slides[i].style.display = "none";
        }
        for (i = 0; i < dot.length; i++){
           dot[i].classList.remove("active");
        }
        slides[e - 1].style.display = "block";
        dot[e- 1].classList.add("active");
        console.log(dot[slideIndex - 1].className);
    };

    const showHideClassName = show ? "modal display-block" : "modal display-none";
    

return (
    <div className={showHideClassName}>
        <div className="modal-main">
            <div className="rectangle" onClick={handleClose}></div>
                <div className="slideshow-container">
                    <div className='slide'>
                        <div className='img-block'>
                        <img className='img' src={Onboarding7} />
                    </div>
                    <div className='text-block'>
                        <div className='title-onboarding'>Congratulations!</div>
                        <div className='onboarding-text'>Our program will open a new world of possibilities for you and incredible emotions that you can share with your friends</div>
                      </div>
                </div>
                <div className='slide fade'>
                    <div className='img-block'>
                        <img className='img' src={Onboarding8} />
                    </div>
                    
                     <div className='text-block'>
                        <div className='title-onboarding'>Search</div>
                        <div className='onboarding-text'>Easy search and filtering options will help you find what you want in one click </div>
                        </div>
                </div>
                <div className='slide fade'>
                    <div className='img-block'>
                        <img className='img' src={Onboarding9} />
                    </div>
                     <div className='text-block'>
                        <div className='title-onboarding'>Good luck!</div>
                        <div className='onboarding-text'>Watch and create new stories with millions of other people. We wish you the best time!</div>
                    </div>
                </div>
                
            </div>
              <div className="dotcontainer">
                    <span className="dot 1" onClick={()=>currentSlide(1)}></span> 
                    <span className="dot 2"  onClick={()=>currentSlide(2)}></span> 
                    <span className="dot 3"  onClick={()=>currentSlide(3)}></span> 
                </div>
            <div className="arrowscontainer">
                
                <div className="prev" onClick={() => plusSlides(-1)}>
                    <a  >&#10094;</a>
                    </div>
                <div className="next" onClick={() => plusSlides(1)}>
                    <a >&#10095;</a>
                    </div>
                    <div className="close" onClick={handleClose}>
                    Close
                </div>
                </div>
        </div>
       
    </div>
);
};
export default Onboarding;