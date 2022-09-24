import { createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from './firebase';
import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import login from './Image/login.png';
import {toast} from 'react-toastify'

function SignUp() {
  
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate()


    const signup=()=>{
      createUserWithEmailAndPassword(auth, email, password)
        .then((res) => {
          // Signed in
          navigate('/home');
          toast.success("Successfully Created Account")
          // ...
        })
        .catch((error) => {
            toast.error("Write Correct Email & Strong Password")

        });
  
      }
    
      
    
    return (
      <>
      <div className="text-center mt-5 log-card mx-auto d-flex justify-content-between align-items-center">
      <div className="log w-50">
          <img src={login} alt="" />
        </div>
      <div className="log w-100 px-3">

        <input type='email' placeholder='email'  onChange={(e) =>setEmail(e.target.value)}/>
        <br />
        <input type="password" placeholder='password' onChange={(e) =>setPassword(e.target.value)}/>
        <br /> <br />
        <h3 className="log-btn" onClick={signup}>create account</h3>
        <Link className="sign-link nav-link" to="/">Sign In...!</Link>
        </div>
      </div>
      </>
      );
  }
  
  export default SignUp;
  