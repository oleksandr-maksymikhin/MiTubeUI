import "../../Styles/ContentType/Subscriptions.scss";

import { useContext } from "react";
import { ActiveContentContext } from "../../Context/ActiveContentContext";
import Channel from "../Wrappers/Channel";
import notification_icon from "../../Assets/Icons/notification.svg";
import dropdown_icon from "../../Assets/Icons/dd.svg";
import serverContext from "../../Context/ServerContext";
export default function AllSubscriptions({ subscriptions }) {
  return (
    <div className="subs-container">
      <h3 className="header">Subscriptions</h3>
      <div>
        {subscriptions?.map((subscription) => (
          <SubscriptionCard
            key={subscription.id}
            subscription={subscription}
          ></SubscriptionCard>
        ))}
      </div>
    </div>
  );
}

function SubscriptionCard({ subscription }) {
  const { setActiveContent, hideToolbar } = useContext(ActiveContentContext);
  const { serverPort } = useContext(serverContext);

  const handleClick = () => {
    setActiveContent(<Channel isOwner={false} user={subscription} />);
    
  };

  return (
    <>
      <div id="subscriptions-list" className="sub-row" onClick={handleClick}>
        <div className="avatar">
          <img
            src={`${serverPort}/showImage?url=${subscription.posterUrl}`}
            alt="avatar"
          />
        </div>
        <div className="desc">
          <h4>{subscription.name}</h4>
          <span className="desktop" id="nameFollow">
            <span>{subscription.nickname}</span>
            <span>{subscription.subscribersQuantity} followers</span>
          </span>
          <p className="desktop">{subscription.description}</p>
        </div>
        <div className="action">
          <button className="row">
            <img
              className="icn"
              src={notification_icon}
              alt="Notification icon"
            />
            <p className="desktop">Unsubscribe</p>
            <img className="icn" src={dropdown_icon} alt="Dropdown icon" />
          </button>
        </div>
      </div>
    </>
  );
}
