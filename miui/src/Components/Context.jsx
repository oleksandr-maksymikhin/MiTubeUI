import Content from "./Content";

import VideoGallery from "./Common/VideoGallery";
import { Outlet } from "react-router-dom";

import { useState, useEffect } from "react";

import { ActiveContentContext } from "../Context/ActiveContentContext";
import { ThemeContext } from "../Context/ThemeContext";
import { PlatformContext } from "../Context/PlatformContext";
import UserContextProvider from "../Context/UserContextProvider";
import ServerContext from "../Context/ServerContext";

import { useParams } from "react-router-dom";
import VideoFull from "./Wrappers/Video";
import Playlist from "./Common/Playlist";
import Settings from "./Wrappers/Settings";
import Studio from "./Common/Studio";

function ContextWrapper() {
	const [theme, setTheme] = useState("light");

	let [activeContent, setActiveContent] = useState(<VideoGallery />);
	let [activeModal, setActiveModal] = useState();
	let [platform, setPlatform] = useState();
	let [sidebarState, setSidebarState] = useState("");
	let [toolbarState, setToolbarState] = useState("");

	let { id } = useParams();
	useEffect(() => {
		const curr = localStorage.getItem("transition");
		const curr_id = localStorage.getItem("id");
		if (curr !== null) {
			localStorage.removeItem("transition");
			switch (curr) {
				case "video":
					setActiveContent(<VideoFull videoId={curr_id} />);
					break;
				case "playlist":
					setActiveContent(
						<Playlist heading="Shared playlist" id={curr_id} />
					);
					break;
				default:
					break;
			}
			localStorage.removeItem("id");
		}
	}, [id]);

	if (id !== undefined) {
		console.log(id);
		const url = window.location.href;
		if (url.includes("video")) {
			localStorage.setItem("transition", "video");
			localStorage.setItem("id", id);
		} else if (url.includes("playlist")) {
			localStorage.setItem("transition", "playlist");
			localStorage.setItem("id", id);
		}

		id = undefined;
		window.location.href = "/";
	}

	useEffect(() => {
		setPlatform(window.innerWidth < 450 ? "mobile" : "desktop");
	}, []);

	useEffect(() => {
		if (
			activeContent.type === Settings ||
			activeContent.type === Studio ||
			activeContent.type === VideoFull
		) {
			setSidebarState("removed");
			if (document.getElementById("myContent")) {
				document
					.getElementById("myContent")
					.classList.add("fullscreen");
			}
		} else {
			setSidebarState("");
			setToolbarState("");
			if (document.getElementById("myContent")) {
				document
					.getElementById("myContent")
					.classList.remove("fullscreen");
			}
		}
	}, [activeContent]);

	window.addEventListener("resize", () =>
		setPlatform(window.innerWidth < 450 ? "mobile" : "desktop")
	);

	//const serverPort = "http://localhost:5208/api/v1";
	const serverPort = "https://api-mitube-eastus-dev-001.azurewebsites.net/api/v1";

	return (
		<ThemeContext.Provider value={{ theme, setTheme }}>
			<ActiveContentContext.Provider
				value={{
					activeContent,
					setActiveContent,
					sidebarState,
					toolbarState,
					activeModal,
					setActiveModal,
				}}
			>
				<PlatformContext.Provider value={{ platform }}>
					<UserContextProvider>
						<ServerContext.Provider value={{ serverPort }}>
							<Content />
							<Outlet />
						</ServerContext.Provider>
					</UserContextProvider>
				</PlatformContext.Provider>
			</ActiveContentContext.Provider>
		</ThemeContext.Provider>
	);
}

export default ContextWrapper;
