import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { useDispatch } from 'react-redux';
import { userLogin } from '../stores/action';
// import { useSetAtom } from 'jotai';
// import { loggedAtom } from '../atoms/user';
const API_URL = "http://localhost:1337/auth/local/"

function Login() {

  // const logged = useSetAtom(loggedAtom)
  //const [emailapp, setEmail] = useAtom(emailAtom);
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch()
  

    const handleSubmit = (e) => {
        e.preventDefault();
        setIdentifier(e.target.identifier.value)
        setPassword(e.target.password.value)

        const data = {
            identifier: e.target.identifier.value,
            password: e.target.password.value,
        };

        // console.log(typeof JSON.stringify(data));

        fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {

            if (data.statusCode) {
                alert("erreur de connexion");
                return;
            }

            dispatch(userLogin(data.jwt, data.user.id))
            console.log(data.jwt);
            Cookies.set('token', data.jwt)
            Cookies.set('id', data.user.id)
            // console.log(Cookies.get('token'));
            // logged(true);
        })
        .catch(error => {
            alert("erreur");
            console.log(error.message);
            
            // logged(false);
            })
    }

   
    return (
        <div>
            <form onSubmit={handleSubmit}>
                Identifier : <input type="text" name="identifier"/>
                   
                <br/>
                
                Password : <input type="password" name="password"/><br/>

                <button type="submit" className='bg-black text-white text-sm font-bold rounded-3xl py-2 px-4 w-fit cursor-pointer'>submit</button>
            </form>

            
        </div>
    );
}

export default Login;