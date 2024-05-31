import { PlatformContext } from "../../Context/PlatformContext";
import { useContext, useState, useEffect } from "react";
import serverContext from "../../Context/ServerContext";
import SubscriptionsDesktop from "../Desktop/Content/Subscriptions";
import SubscriptionsMobile from "../Mobile/Content/Subscriptions";
import SubscriptionsAll from "../Common/SubscriptionsAll";

export default function Subscriptions() {
  const { serverPort } = useContext(serverContext);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetcSubscriptions = async () => {
      try {
        let user = JSON.parse(localStorage.getItem("userCookie"));
        const response = await fetch(`${serverPort}/Subscriptions/subscribers/${user.id}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch videos. Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setSubscriptions(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetcSubscriptions();
  }, [serverPort]);

  const { platform } = useContext(PlatformContext);

  return (
    <>{subscriptions&&(
      <div className="subscriptions-content">
        {/* {platform === "desktop" ? <SubscriptionsDesktop /> : <SubscriptionsMobile/>} */}

        <SubscriptionsAll subscriptions={subscriptions}/>
      </div>)}
    </>
  );
}
