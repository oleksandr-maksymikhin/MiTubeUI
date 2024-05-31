import "../../../Styles/MainMenu/Certificate.scss";
import search_icon from '../../../Assets/Icons/search.svg';
import more_icon from '../../../Assets/Icons/MainMenu/more.svg';
export default
function Certificate() {

  return (

      <span className="certificateMenu">
        <span className="certificate button btn-lg n1 mb-25">
           Certificate
        </span>
        <hr/>
        <span className="inform">
          <img className="" alt="more_icon" src={more_icon}/>
          <span className="n3 ">How to search for videos?</span>
        </span>
        <span className="inform ">
          <img className="" alt="more_icon" src={more_icon}/>
          <span className="n3 ">How to change video settings?</span>
        </span>
        <span className="inform "href='/studio' >
          <img className="" alt="more_icon" src={more_icon}/>
          <span className="n3 ">How to change the theme to dark?</span>
        </span>
        <span className="inform">
          <img className="" alt="more_icon" src={more_icon}/>
          <span className="n3 ">How to delete a channel?</span>
        </span>
        <span className="inform ">
          <img className="" alt="more_icon" src={more_icon}/>
          <span className="n3 ">How to make subscriptions private?</span>
        </span>
        <hr/>
        <span className="sub-menu search">
                <input type="text" />
                <button>
                <img alt="Magnifying glass icon" src={search_icon} />
            </button>
         </span>
        

      </span>
  );
}