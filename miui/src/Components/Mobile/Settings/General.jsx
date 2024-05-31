import "../../../Styles/MobileSettings/General.scss";
import back from "../../../Assets/Icons/back.svg";

import { useContext } from "react";
import Settings from "./Settings";
import { ActiveContentContext } from "../../../Context/ActiveContentContext";

export default function General() {
	let { setActiveContent } = useContext(ActiveContentContext);

	let goBack = () => {
		setActiveContent(<Settings />);
	};

	return (
		<>
			<div className="general-settings-container mobile">
				<div className="logo row">
					<div onClick={goBack}>
						<img
							className="logo-icon"
							src={back}
							alt="Logo switch"
						/>
					</div>
					<h2>General Settings</h2>
				</div>
				<ul>
					<li>
						<h4>Appearance</h4>
						<select defaultValue={"Select theme"}>
							<option>Select theme</option>
							<option>Light</option>
							<option>Dark</option>
						</select>
					</li>
					<li>
						<h4>Language</h4>
						<select defaultValue={"Select language"}>
							<option>Select language</option>
							<option>English</option>
							<option>Ukrainian</option>
						</select>
					</li>
					<li>
						<h4>Downloads</h4>
						<select defaultValue={"Select network"}>
							<option>Select network</option>
							<option>WiFi only</option>
							<option>Mobile and WiFi</option>
						</select>
					</li>
					<li>
						<h4>Safe mode</h4>
						<select defaultValue={"Off"}>
							<option>On</option>
							<option>Off</option>
						</select>
					</li>
				</ul>
			</div>
		</>
	);
}
