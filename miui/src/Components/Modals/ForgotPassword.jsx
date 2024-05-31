
import "../../Styles/Modals/ForgotPassword.scss";
import React, { useState , useRef} from 'react';
import emailjs from 'emailjs-com';
import NewPassword from "./NewPassword";

function ForgotPassword() {

  const [disabledButton, setDisabledButton] = useState(true);
  const [timer,setTimer]=useState(0);
  const [messageCode,setMessageCode]=useState();
  const[code,setCode]=useState('');
  const[showNewPassword,setShowNewPassword]=useState(false);
  const form = useRef();

  const activeTimer=()=>{
    setDisabledButton(false);
    setTimer(120);
    const time=setInterval(()=>{
        setTimer(pTime=>pTime-1);
    },1000);

    setTimeout(()=>{
        clearInterval(time);
        setDisabledButton(true);
        setTimer(0);
    },120000);

  }

  const generateRandomCode=async()=>{
    const randomCode= Math.floor(100000+Math.random()*900000);
    setMessageCode(randomCode);
    return randomCode;
  }



  
  const sendEmail = async(e) => {
    await generateRandomCode();
   console.log(form.current);
    await emailjs.sendForm('service_df9y0ts', 'template_k245muw'
    ,form.current,'9SHnPPgARMCVUVe09',{ user_message: messageCode })
        .then((result) => {
            console.log(result.text);
            console.log("message sent!")
        }, (error) => {
            console.log(error.text);
            console.log("error sending message, try again!")
        });
    };
    const handleCode=(e)=>{
        setCode(e.target.value);
        
    }
    const handleNewPassword=()=>{
        var alert = document.getElementById('alert-p');
        if(code===messageCode)
        {
            setShowNewPassword(true);
        }
        else{
            alert.textContent = "*Password recovery code is incorrect";
        }

    }

    return (
        <div>
            {!showNewPassword ?
        (<div>
            <form ref={form} onSubmit={sendEmail} className="form-forgot-password">
                <label className="user-title">Restore your account</label>
                <label className="passwor-information">To keep your account secure, we want to make sure you're the one who's logged in</label>
                <div>
                    <input type="email" name="email" placeholder="User@gmail.com" className="input-email"  />
                    <button type='sybmit' className="btn-lg btn-sm" onClick={() =>{activeTimer(); sendEmail()}} disabled={!disabledButton}>Send</button>
                </div>
                {
                    timer>0 && <div>You can resend the password reset code via: {timer} с.</div>
                }
                 <input type="text" name="user_message"  className="input-email hidden" value={messageCode} />
                </form>

                <form action='' method='' className="form-forgot-password">
                <label className="passwor-information">A letter with a confirmation code has been sent to your email address Us**@gmail.com</label>
                <input type="text" name="code" value={code} onChange={handleCode} placeholder="Enter your password" className="input-password"/>
                <p id="alert-p"></p>
                <button type='button' className="btn-lg btn-sm button-next" onClick={handleNewPassword}>Next</button>
            </form>
            </div>
            ):(
                <NewPassword/>
            )}
        </div>);
}
export default ForgotPassword;