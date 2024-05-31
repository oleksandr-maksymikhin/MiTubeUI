import { useState, useContext } from "react";
import serverContext from "../../Context/ServerContext";
import userContext from "../../Context/UserContext";
import { ActiveContentContext } from "../../Context/ActiveContentContext";
import Onboarding from "./Onboarding";


function Register({ onSuccessfulRegister }) {
  
  const [checked, setChecked] = useState(false);
  const [userCredentials, setUserCredentials] = useState({
    email: "",
    password: "",
  });
  const { setActiveModal } = useContext(ActiveContentContext);

  const { serverPort } = useContext(serverContext);
  const { setUser } = useContext(userContext);


//   const handleNewUser=async()=>{
//     let alert=document.getElementById('alert-p');
//     if(!userCredentials.email|| !userCredentials.password) {
//         alert.textContent='*Enter your email address and password!';
//     }
//         else {
//             console.log(userCredentials);
//         await fetch(`${serverPort}/Usercredentials`,{
//                 method:'POST',
//             credentials:'include',
//                 headers:{
//                     'Content-Type':'application/json'
//                 },
//                 body:JSON.stringify(userCredentials)
//             })
//             .then(response=>{
//                 if(response.ok){
//                     console.log('Error HTTP:'+response.status);
//                 }
//                 response.json();
//             })
//             .then(data=>{
//                 console.log('Responce from server: '+data);
//                 setActiveModal(<Onboarding show={"true"} handleClose={() => setActiveModal()}/>);
//         })
//             .catch(
//             error=>{console.error(error);
//         })
//             alert.textContent='';
//         onSuccessfulRegister();
//         }
// }

  const handleNewUser = async () => {
    let alert = document.getElementById("alert-p");
    if (!userCredentials.email || !userCredentials.password) {

      alert.textContent = "*Enter your email address and password!";
    }
    else 
    {
      const response= await fetch(`${serverPort}/Usercredentials`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userCredentials),
      });
      if (!response.ok) {
            console.log("Error HTTP:" + response.status);
          }
      else{
            const newResponse=await fetch(`${serverPort}/Usercredentials/Login`,{
              method:'POST',
              credentials:'include',
              headers:{
                  'Content-Type':'application/json'
              },
              body:JSON.stringify(userCredentials)
              });
            if (!newResponse.ok) {
            }
            else{
              const data=await newResponse.json();
              localStorage.setItem('userCookie',JSON.stringify(data));
              setUser({data});
              setActiveModal(
                <Onboarding show={"true"} handleClose={() => setActiveModal()} />
              );
          }
      alert.textContent = "";
      onSuccessfulRegister();
      }}
  };

  return (
    <div>
      <form>
        <label className="user-title">Registration</label>
        <input
          type="email"
          name="login"
          placeholder="Enter your email address"
          value={userCredentials.email}
          onChange={(e) =>
            setUserCredentials({ ...userCredentials, email: e.target.value })
          }
          className="input-register-email"
        />
        <input
          type={checked ? "text" : "password"}
          onChange={(e) =>
            setUserCredentials({ ...userCredentials, password: e.target.value })
          }
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
        <div className="button-cont">
        <button
          className="btn-lg btn-sm"
          onClick={onSuccessfulRegister}
        >
          Login to an existing account
        </button>
        <button
          type="button"
          className="btn-lg btn-sm"
          onClick={handleNewUser}
        >
          Next
        </button>
        </div>
      </form>
    </div>
  );
}
export default Register;
