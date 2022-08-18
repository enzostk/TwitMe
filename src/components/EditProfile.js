import React, { useState } from "react";
import Cookies from 'js-cookie';
import { useSetAtom } from 'jotai';
import { loggedAtom } from '../atoms/user';
import { useSelector } from "react-redux";

// const API_URL = "http://localhost:1337/auth/local/"


function EditProfile() {

    // const logged = useSetAtom(loggedAtom)

    const JWT = useSelector((state) => state.JWT);
    console.log(JWT);
    const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setUsername(e.target.username.value)
        setEmail(e.target.email.value)

        const data = {
            username: e.target.username.value,
            email: e.target.email.value,
        };

        // console.log(typeof JSON.stringify(data));

        fetch(`http://localhost:1337/users/me` , {
            method: "PUT",
            headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${JWT}` },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.log(error.message);
            })
    }

   
    return (
        <div className='mt-10'>
            
            <h3>Edit Profile</h3>
            <form onSubmit={handleSubmit}>
                Username : <input type="text" name="username"/>
                   
                <br/>
                
                Email : <input type="text" name="email"/><br/>

                <button type="submit" className='bg-black text-white text-sm font-bold rounded-3xl py-2 px-4 w-fit cursor-pointer'>submit</button>
            </form>

            
        </div>
    );
}

export default EditProfile;