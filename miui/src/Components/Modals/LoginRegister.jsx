import "../../Styles/Modals/LoginRegister.scss"; 

import { useState, useContext } from "react";

import Enter from './Enter';
import logo from '../../logo.svg';
import ForgotPassword from "./ForgotPassword";
import Register from "./Register";



function LoginRegister({onEnterClick,handleClose}) {

    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [showRegister, setShowRegister] = useState(false);
   
    

    const handleForgotPassword = () => {
        setShowForgotPassword(true);
    }

    const handleRegister = () => {
        setShowRegister(true);
    }

    

    return (
        <div className='login-register'>
            <button type="button" className="back" onClick={handleClose}><div className="left-arrow"></div></button>
            <div className="forms">
                <div className="logo" >
                    <img src={logo}/>
                </div>
                <div className="form-content">
                {
                    showForgotPassword ? (<ForgotPassword/>)
                    :
                    showRegister ? (<Register onSuccessfulRegister={()=>setShowRegister(false)}/>) 
                    :
                    (<Enter onRegisterClick={handleRegister} onForgotPasswordClick={handleForgotPassword}  onEnterClick={onEnterClick}/>)
                }
                </div>
            </div> 
            <div className="informations-block">
                <div>
                    <select name="lenguage">
                        <option value="english">Englis</option>
                        <option value="ukrainian">Українська</option>
                        
                    </select>
                </div>
                <div className="links-information">
                    <a>Certificate</a>
                    <a>Privacy</a>
                    <a>Conditions</a>
                </div>
            </div>
          
     
</div>
    );
}




export default LoginRegister;