import {signInWithEmailAndPassword } from "firebase/auth";
import {auth} from './firebase';
import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'

import login from './Image/login.png';
function SignIn() {
  
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate()
  
    const signIn = (e) =>{
      e.preventDefault()
      signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
            navigate('/home');
          toast.success("Successfully login")
    })
      
      .catch((error) => {
        toast.error("Email & Password is Invalid")
    });
  }
      
    
    return (
      <>
      <div className="text-center mt-5 log-card mx-auto d-flex justify-content-between align-items-center">
        <div className="log w-50">
          <img src={login} alt="" />
        </div>
        <div className="log w-100 px-3">
        <input type='email' placeholder='email' onChange={(e) =>setEmail(e.target.value)}/>
        <br />
        <input type="password" placeholder='password' onChange={(e) =>setPassword(e.target.value)}/>
        <br /> <br />
        <h3 className="log-btn" onClick={signIn}>Sign In</h3>
        <Link className="nav-link sign-link" to="/signup">new create account...!</Link>
        </div>

      </div>
      </>
      );
  }
  
  export default SignIn;
  