import React, { useEffect, useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API = 'https://bugged-ishop.onrender.com';

const SignUp = () => {
	const navigate = useNavigate();

	const [user, setUser] = useState({});

	const onchangeee = (e) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};

	const login = async (e) => {
		e.preventDefault();
		navigate('/login');

		// await sUserdata( (prevObj)=>{
		//   prevObj.push(user);
		//   return (prevObj)
		// })
		// await userdata.push(user)
		// console.log(userdata)
		console.log(user);
		axios
			.post(`${API}/signup`, {
				body: user,
				headers: {
					'Content-Type': 'application/json',
				},
			})
			.then(() => {
				console.log('submitted');
			});
	};

	return (
		<div className="app">
			<div className="login-form">
				<div className="title">Sign Up</div>
				<div className="form">
					<form action="POST">
						<div className="input-container">
							<label>First Name </label>
							<input type="text" name="fname" required onChange={onchangeee} />
						</div>
						<div className="input-container">
							<label>Last Name </label>
							<input type="text" name="lname" required onChange={onchangeee} />
						</div>
						<div className="input-container">
							<label>Email </label>
							<input type="email" name="email" required onChange={onchangeee} />
						</div>
						<div className="input-container">
							<label>Password </label>
							<input type="password" name="password" required onChange={onchangeee} />
						</div>
						<div className="button-container">
							<input type="submit" onClick={login} />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};

export default SignUp;
