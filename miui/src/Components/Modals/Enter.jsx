import "../../Styles/Modals/Enter.scss";
import React, { useState, useContext } from "react";
import userContext from "../../Context/UserContext";
import serverContext from "../../Context/ServerContext";

function Enter({ onForgotPasswordClick, onRegisterClick, onEnterClick }) {
  const [checked, setChecked] = useState(false);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { serverPort } = useContext(serverContext);
  const { setUser } = useContext(userContext);

    const handleLoginUser=async()=>{
        let alert=document.getElementById('alert-p');
        if(!login || !password){
            alert.textContent='*Enter your email address and password!';
        }
        else{
            const testUser={
            email:login,
            password:password
        };
        const response=await fetch(`${serverPort}/Usercredentials/Login`,{
            method:'POST',
            credentials:'include',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(testUser)
        });
        if (!response.ok) {
            alert.textContent='*Login or password entered incorrectly!';
        }
        else{
            const data=await response.json();
            localStorage.setItem('userCookie',JSON.stringify(data));
            setUser({data});
            alert.textContent='';
            window.location.reload();
            onEnterClick();
        }
        }
        // const userData = {
        //     id:'116D460B-B5CE-4972-9BBB-0035C124CEA9',
        //     userTypeId:'2',
        //     name:'bart',
        //     nickname:'bart_man',
        //     description:'Bart plays soliter',
        //     posterUrl:'https://oleksandrmaksymikhin.blob.core.windows.net/mitube/Simpson_Bart_Poster.jpg',
        //     banerUrl:'https://oleksandrmaksymikhin.blob.core.windows.net/mitube/Simpson_Bart_Banner.jpg'
        // }
        
        // localStorage.setItem('userCookie',JSON.stringify(userData));
        // setUser({userData});
        
    }

  return (
    <>
      <form>
        <label className="user-title">Login</label>
        <input
          type="email"
          name="login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Enter your email address"
          className="input-register"
        />
        <input
          type={checked ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          placeholder="Enter your password"
          className={`input-register ${checked ? "password" : ""}`}
        />
        <p id="alert-p"></p>
        <label className="checkbox">
          <input
            type="checkbox"
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          Show password
        </label>
        {/* <a onClick={onForgotPasswordClick}>Forgot your password?</a> */}
        <div className="button-cont">
        <button
          className="btn-lg btn-sm"
          onClick={onRegisterClick}
        >
          Create an account
        </button>
        <button
          type="button"
          className="btn-lg btn-sm"
          onClick={handleLoginUser}
        >
          Next
        </button>
        </div>
      </form>
    </>
  );
}
export default Enter;
