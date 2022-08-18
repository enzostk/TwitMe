import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { loggedAtom } from "../atoms/user";
import { useAtomValue } from "jotai";
import { currentUserAtom } from '../atoms/currentUser';
import store from "../stores/user";
import { useSelector } from "react-redux";

function Home() {

	const JWT = useSelector((state) => state.JWT);
	const id = useSelector((state) => state.id);
	const userData = useAtomValue(currentUserAtom);
	const logged = useAtomValue(loggedAtom);
	const [ postsList, setPostsList ] = useState(null);
	const token = Cookies.get('token');

	useEffect( () => {

		fetch("http://localhost:1337/posts", {
			method: "GET",
			headers: {"Authorization": `Bearer ${token}`}
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
			setPostsList(data);
		})
		.catch(error =>	console.log(error.message))

	}, [token])

	const newPost = (e) => {
		e.preventDefault();
		const user = JSON.parse(userData);

		const data = {
			text: e.target.text.value,
			user: user.id
		}
		
		fetch("http://localhost:1337/posts", {
			method: "POST",
			headers: { "Content-Type": 'application/json', "Authorization": `Bearer ${token}` },
			body: JSON.stringify(data)
		})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.log(error.message))
	}

	const remove = (postId) => {

		fetch(`http://localhost:1337/posts/${postId}`,{
			method:"DELETE",
			headers: {"Authorization": `Bearer ${token}`}
		})
		.then(response => response.json())
		.then(data => console.log(data))
		.catch(error => console.log(error.message))

	}

	return (
		<div>
			{" "}

			{

				!logged ? <h1 className='text-3xl font-bold underline'>Hello Home!</h1> :
				<>
					<h4>Nouvel Article :</h4>

					<form onSubmit={newPost}>
						<input type="text" name="text"/>
						<button type="submit" className="bg-black text-white text-sm font-bold rounded-3xl py-2 px-4 w-fit cursor-pointer">OK</button>
					</form>
					<h4>Liste des articles</h4>
					{

						postsList && postsList.map(post => (
										<>
											Auteur : {post.user.username}<br/>
											{post.text}<br/>
											like : {post.like}<br/>
											<button onClick={() => remove (post.id)}>DEL</button>

											<br/><br/><br/>
										</>
						))
					}
				</>
		}
		</div>
	);
}

export default Home;
