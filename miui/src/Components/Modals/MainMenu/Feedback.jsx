import "../../../Styles/MainMenu/Feedback.scss";
import React, { useState, useRef, useEffect, useContext } from "react";
import emailjs from "emailjs-com";
import serverContext from "../../../Context/ServerContext";
import userContext from "../../../Context/UserContext";

export default function Feedback() {
  const form = useRef();
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const{serverPort}=useContext(serverContext);
  const {user,setUser}=useContext(userContext);

  useEffect(() => {
   JSON.parse(localStorage.getItem("userCookie"));
    setEmail(user.email);
  }, []);

  const sendEmail = async (e) => {
    e.preventDefault();
    let data;
    if (email) {
      const response=await fetch(`${serverPort}/Keys/${user.id}`,{
        credentials:'include',
        headers:{
            'Content-Type':'application/json'
        },
  
    });
    if (!response.ok) {
        alert.textContent='*Login or password entered incorrectly!';
    }
    else{
        data=await response.json();
        console.log('data',data)
        
    }
      try {
        
        await emailjs.sendForm(
          data.key_1,
          data.key_2,
          form.current,
          data.key_3,
          {
            user_message: message,
            from_email: email,
            to_email: data.email,
          }
        ); 
        
        console.log("Message sent successfully!");
      
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };
  const handleTextareaChange = (e) => {
    setMessage(e.target.value);
  };

  return (
    <form ref={form} onSubmit={sendEmail}>
      <input
        type="email"
        name="from_email"
        placeholder="User@gmail.com"
        className="input-email"
        defaultValue={email}
        hidden
      />
      <input
        type="email"
        name="to_email"
        value="mitubestudentproject@gmail.com"
        hidden
      />
      <div className="feedbackMenu">
        <div className="button feedback btn-lg n1" onClick={sendEmail}>
          Send feedback
        </div>
        <hr />
        <div className="inform n3">Write your review</div>
        <textarea
          name="user_message"
          className="textarea n3"
          required
          value={message}
          onChange={handleTextareaChange}
        ></textarea>
        <button type="submit" className="btn" id="bt">
          Send feedback
        </button>
        <div className="inform n3">
          <div className="checkboxes__item">
            <label className="checkbox style-b">
              <input type="checkbox" />
              <div className="checkbox__checkmark"></div>
              <div className="checkbox__body"></div>
            </label>
          </div>
          <span className="check n3">
            We may send you emails asking for additional information
          </span>
        </div>
        <hr />
      </div>
    </form>
  );
}
