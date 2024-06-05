import { useContext } from "react";
import { ActiveContentContext } from "../../../Context/ActiveContentContext";
import SubscriptionsAll from "../../Common/SubscriptionsAll";



export default
function NotificationsMobile() {
    let {setActiveContent} = useContext(ActiveContentContext);
   
    return (
        <div className="mobile-subscriptions-container mobile">
            <span className="channels row">
           
                <span className="row">
                <h3 className="header">Notifications</h3>
                </span>
                
            </span>
        </div>
    )
}
