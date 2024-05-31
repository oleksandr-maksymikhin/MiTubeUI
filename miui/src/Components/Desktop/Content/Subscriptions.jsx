import "../../../Styles/ContentType/VideoCard.scss";
import { useContext } from "react";
import { ActiveContentContext } from "../../../Context/ActiveContentContext";
import AllSubscriptions from "../../Common/SubscriptionsAll";

export default
function SubscriptionsDesktop({isSubscriptions}) {
  const { setActiveContent } = useContext(ActiveContentContext);

  return (
    <>
      <div className="row desktop gallery-header ">
        <h2>Subscriptions</h2>
        <button className="btn-sm" onClick={() => setActiveContent(<AllSubscriptions/>)}>All</button>
      </div>
    </>
  );
}