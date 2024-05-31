import '../../Styles/Peripheral/Toolbar.scss';

import search_icon from '../../Assets/Icons/search.svg';
import logo from '../../logo.svg';
import cross_icon from '../../Assets/Icons/cross.svg';

import Search from '../Wrappers/Search';

import serverContext from '../../Context/ServerContext';
import { useState, useContext } from "react";
import { ActiveContentContext } from '../../Context/ActiveContentContext';
import { ThemeContext } from '../../Context/ThemeContext';

export default
function ToolbarMobile({ openFilter }) {

  const { setActiveContent, toolbarState } = useContext(ActiveContentContext);
  const { setTheme } = useContext(ThemeContext);
  const { serverPort } = useContext(serverContext);

  const toggleSearch = () => { 
    document.querySelector(".search").classList.toggle("removed");
    document.getElementById("search-btn").classList.toggle("removed");
  };

  const switchTheme = () => {
    let logo = document.getElementsByClassName("logo-icon");
    logo = logo[0];
    logo.classList.toggle("on");
    let theme = document.getElementsByTagName("html")[0];
    let color = theme.getAttribute("data-color-theme") === "light" ? "dark" : "light";
    theme.setAttribute("data-color-theme", color);
    setTheme(color);
  }

  const [requestText, setRequestText] = useState("");
  const showSearchOnEnter = async(e) => {
    if(e.key === 'Enter') {
    try {
      const response = await fetch(
        `${serverPort}/Videos/search/${requestText}`
      );
      if (!response.ok) {
        console.log("Error HTTP:" + response.status);
        return null;
      } else {
        const data = await response.json();

        setActiveContent(<Search videos={data} />);
      }
    } catch (error) {
      console.error("Error search:", error);
      throw error;
    }
  }
  }

  return (
    <div className={"toolbar " + toolbarState}>
      <span className="sub-menu title" >
        <span className="logo toggle" onClick={switchTheme}>
          <img className="logo-icon" src={logo} alt="Logo switch" />
        </span>
      </span>

      <span className="sub-menu search removed">
        <input type="text" placeholder='' onKeyDown={showSearchOnEnter} value={requestText}
          onChange={(e) => setRequestText(e.target.value)}/>
        <button className='close-btn' onClick={toggleSearch}>
            <img id='close-btn' alt="Cross icon" src={cross_icon} />
        </button>
      </span>

      <span className="sub-menu profile">
        {/* <button className='btn-sm' onClick={openFilter}>
          Filters
        </button> */}
        <button className='search-icn' onClick={toggleSearch}>
          <img id='search-btn' alt="Magnifying glass icon" src={search_icon} />
        </button>
      </span>
    </div>
  );
}