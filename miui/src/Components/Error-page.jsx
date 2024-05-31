import { useRouteError } from "react-router-dom";
import "../Styles/Error-page.scss";

import error_pic from "../Assets/Images/error-pic.png";

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-container" id="error-page">
      <img src={error_pic} alt="404"/>
      <h1>This page is unavailable</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  );
}