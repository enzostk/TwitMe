import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';
import EditProfile from '../components/EditProfile'
import { useSelector } from "react-redux";
import { useDispatch } from 'react-redux';

function Profile() {


	const JWT = useSelector((state) => state.JWT);
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	// const [ userData, setUserData ] = useState(null);
	useEffect( () => {

		fetch("http://localhost:1337/users/me", {
			method: "get",
			headers: { 'Authorization': `Bearer ${JWT}`}
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			setEmail(data.email);
      setUsername(data.username);
		// setUserData(data)
		  
		})
		.catch(error => console.log(error.message))

	}, [])

	return (
		<div>
			{" "}
			<h1 className='text-3xl font-bold underline'>Hello Profile !</h1>

			<h2>Vos infos : </h2>
			<p>{email}</p>
			<p>{username}</p>


			<EditProfile/>

			
		</div>
	);
}

export default Profile;
