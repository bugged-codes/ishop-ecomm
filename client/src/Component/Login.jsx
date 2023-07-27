import React, { useState } from 'react'
import './Login.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
const API = "http://localhost:9000"

const Login=()=>{
  const navigate = useNavigate()
 

  const [user, setUser]= useState({})


  const onchangeee= (e)=>{
    setUser({...user,[e.target.name] : e.target.value})
  }

  const navigatetosignup = () =>{
    navigate('/signup')
  }

  const signup = async (e)=>{
   
    e.preventDefault();
    navigate('/')

      // await sUserdata( (prevObj)=>{
      //   prevObj.push(user);
      //   return (prevObj)
      // })
      // await userdata.push(user)
      // console.log(userdata)
      console.log(user)
      axios.post(`${API}/login`, {
       
      body: user,
      headers: {
        "Content-Type" : "application/json"
      }

      })
      .then(()=>{console.log("logged in")})

      

    
  }
  

	return(
        <div className="app">
      <div className="login-form">

        <div className="title">Sign In</div>
        <div className="form">
     <form>
       <div className="input-container">
         <label>Username </label>
         <input type="text" name="email" required onChange={onchangeee} />
       </div>
       <div className="input-container">
         <label>Password </label>
         <input type="password" name="password" required onChange={onchangeee} />
       </div>
       <div className="button-container">
         <input type="submit" onClick={signup}/>
       </div>
       <p className='forget-password'>Forget Password ?</p>
       <hr/>
       <div className="button-container">
         <button className="button-create" onClick={navigatetosignup}>Create New Account</button>
       </div>

     </form>
   </div>


      </div>
    </div>
		
	)
}

export default Login    