import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { userLogin } from '../stores/action';
// import { loggedAtom } from '../atoms/user';
// import { useSetAtom } from 'jotai';
// import { currentUserAtom } from '../atoms/currentUser';
const API_URL = "http://localhost:1337/auth/local/register"
function Signup() {

    // const userID = useSetAtom(currentUserAtom);
    // const logged = useSetAtom(loggedAtom);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setUsername(e.target.username.value);
        setEmail(e.target.email.value);
        setPassword(e.target.password.value);
        const data = {
            username: e.target.username.value,
            email: e.target.email.value,
            password: e.target.password.value,
        };

        fetch(API_URL, {
            method: "POST",
            headers: {"Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            dispatch(userLogin(data.jwt, data.user.id))
            console.log(dispatch);
            Cookies.set('token', data.jwt)
            Cookies.set('id', data.user.id )


            // logged(true);
            // userID(JSON.stringify(data.user));
        })
        .catch(error => {
            console.log(error.message);
            // logged(false);
            })
    }

    
    
    return (
        <div>
            <form onSubmit={handleSubmit}>
                Username : 
                    <label htmlFor="username">
                        <input type="text" name="username"/>
                    </label>
                    <br/>
                EMail : <input type="text" name="email"/><br/>
                Password : <input type="password" name="password"/><br/>
                <button type="submit" className='bg-black text-white text-sm font-bold rounded-3xl py-2 px-4 w-fit cursor-pointer'>submit</button>
            </form>

            
        </div>
    );
}

export default Signup;