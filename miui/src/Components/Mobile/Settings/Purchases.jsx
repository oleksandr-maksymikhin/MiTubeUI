import "../../../Styles/MobileSettings/Purchases.scss";
import free_banner from "../../../Assets/Images/free.svg";
import paid_banner from "../../../Assets/Images/paid.svg";
import back_icon from "../../../Assets/Icons/back.svg";

import { useContext } from "react";
import Settings from "./Settings";
import { ActiveContentContext } from "../../../Context/ActiveContentContext";

export default function Purchases() {
	let { setActiveContent } = useContext(ActiveContentContext);

	let goBack = () => {
		setActiveContent(<Settings />);
	};

	return (
		<div className="purchases-container column">
			<div className="logo row">
				<span onClick={goBack}>
					<img
						className="logo-icon"
						src={back_icon}
						alt="Logo switch"
					/>
				</span>
				<h2>Purchases</h2>
			</div>
			<div className="sub-container">
				<img src={free_banner} alt="Banner for free transactions" />
				<h3>Безкоштовна пробна підписака Premium на місяць</h3>
				<p>
					Оформіть підписку Premium і дивіться відео без реклами та
					завантажуйте відео. Відмовитися від підписки можна
					будь-коли.
				</p>
			</div>
			<div className="sub-container">
				<img src={paid_banner} alt="banner for paid transactions" />
				<h3>Підписка преміум на рік</h3>
				<p>
					Оформіть підписку Premium і дивіться відео без реклами та
					завантажуйте відео. Відмовитися від підписки можна
					будь-коли.
				</p>
			</div>
		</div>
	);
}
