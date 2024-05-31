import back from "../../../Assets/Icons/back.svg";
import "../../../Styles/MobileSettings/General.scss";

import { useContext } from "react";
import Settings from "./Settings";
import { ActiveContentContext } from "../../../Context/ActiveContentContext";

export default function About() {
	let { setActiveContent } = useContext(ActiveContentContext);

	let goBack = () => {
		setActiveContent(<Settings />);
	};

	return (
		<div className="general-settings-container mobile">
			<div className="logo row">
				<div onClick={goBack}>
					<img className="logo-icon" src={back} alt="Logo switch" />
				</div>
				<h2>About</h2>
			</div>
		</div>
	);
}
