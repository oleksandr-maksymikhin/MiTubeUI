import "../../../Styles/ContentType/MobileSubscriptions.scss";
import { useContext } from "react";
import { ActiveContentContext } from "../../../Context/ActiveContentContext";
import Channel from "./Channel";
import SubscriptionsAll from "../../Common/SubscriptionsAll";

export default
function SubscriptionsMobile() {

    let {setActiveContent} = useContext(ActiveContentContext);

    const showAll = () => {
        setActiveContent(<SubscriptionsAll/>)
    }

    return (
        <div className="mobile-subscriptions-container mobile">
            <span className="channels row">
                <span className="row">
                    <ChannelBanner poster="https://via.placeholder.com/50" channel="name1" />
                    <ChannelBanner poster="https://via.placeholder.com/50" channel="name2"/>
                    <ChannelBanner poster="https://via.placeholder.com/50" channel="name3"/>
                    <ChannelBanner poster="https://via.placeholder.com/50" channel="name4"/>
                    <ChannelBanner poster="https://via.placeholder.com/50" channel="name5"/>
                    <ChannelBanner poster="https://via.placeholder.com/50" channel="name6"/>
                    <ChannelBanner poster="https://via.placeholder.com/50" channel="name7"/>
                </span>
                <button onClick={showAll}>All</button>
            </span>
        </div>
    )
}

function ChannelBanner({ poster, channel }) {

    const {setActiveContent} = useContext(ActiveContentContext);

    const clickHandler = () => {
        setActiveContent(<Channel isOwner="false"/>);
    }

    return (
        <span className="channel column" onClick={clickHandler}>
            <img src={poster} alt={"poster of " + channel}/>
            <h5>{channel}</h5>
        </span>
    );
}