import React from "react";
import{useAuthState} from 'react-firebase-hooks/auth';
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import Pomodro_timer from "./Pomodro_timer";
import {toast} from 'react-toastify'

const Home = () =>{
    const navigate = useNavigate();
    const [user, loading,error] = useAuthState(auth);
    const signOutClick = ()=>{
        auth.signOut();
        navigate('/');
        toast.success("successfully Logout")
    }
    
    return(
        <>
        <div className="user d-flex justify-content-around pt-2">
        
        <h1 className="user-email">Hello,<span>  {user?.email}</span> </h1>
        
        <h3 className="sign-out" onClick={signOutClick}>Sign out</h3>
        </div>
        

        <Pomodro_timer />

        </>
    )

}
export default Home;