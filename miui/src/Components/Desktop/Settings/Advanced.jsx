import "../../../Styles/Settings/Advanced.scss";
import React, { useState, useContext, useEffect } from "react";
import userContext from "../../../Context/UserContext";
import serverContext from "../../../Context/ServerContext";

export default function Advanced() {
  const { user, setUser } = useContext(userContext);
  const { serverPort } = useContext(serverContext);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("userCookie")));
  }, []);

  const handleDeleteChanel = async () => {
    //const deleteUser = { sessionId: user.id };
    const response = await fetch(`${serverPort}/Users/${user.id}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user.id),
    });
    if (!response.ok) {
      console.log("Error HTTP:" + response.status);
    }
    else{
      localStorage.clear();
    }
  };
  return (
    <div className="advancedMenu">
      <span className="inform">
        <span className="n2 ">Advanced settings</span>
      </span>

      <hr />
      <span className="inform">
        <span className="n4 ">
          This is the default web address for your channel. A set of numbers and
          letters at the end of the link is a unique channel identifier.
        </span>
      </span>
      <span className="inform">
        <span className="n2 ">Channel URL</span>
        <input disabled value={"Channel URL"}></input>
        <button className="">Copy</button>
      </span>
      <hr />
      <span className="inform">
        <span className="n2 ">Delete channel</span>
        <button type="button" className="" onClick={handleDeleteChanel}>
          Delete channel{" "}
        </button>
      </span>
    </div>
  );
}
