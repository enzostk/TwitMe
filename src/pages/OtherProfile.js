import React, { useEffect, useState } from "react";
// import Cookies from 'js-cookie';
// import EditProfile from '../components/EditProfile'
import { useSelector } from "react-redux";
// import { useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";

const OtherProfile = () => {

   const {username} = useParams()
  const JWT = useSelector((state) => state.JWT);
	const [author, setAuthor] = useState("");
  const [posts, setPosts] = useState([]);
	// const [ userData, setUserData ] = useState(null);
	useEffect( () => {

		fetch(`http://localhost:1337/users/${username}`, {
			method: "get",
			headers: { 'Authorization': `Bearer ${JWT}`}
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
      setAuthor(data);
		// setUserData(data)
  })
  .catch(error => console.log(error.message))

  fetch(`http://localhost:1337/posts?user.id=${username}`, {
			method: "get",
			headers:  {
        'Authorization': `Bearer ${JWT}`,
        'Content-Type': 'application/json'
      }
		})
		.then(response => response.json())
		.then(data => {
			console.log(data);
      setPosts(data);
		// setUserData(data)
  })
  .catch(error => console.log(error.message))
  }, [])


     
  return (
    <div>
       <p>{author.username}</p>
       <p>{author.email}</p>

      {posts && posts.map(post => (
         <>
        <p>Auteur: {post.user.username}
          {post.text}
          like: {post.like}
					</p>
          </>
          ))
          
			 } 


    </div>
  )
}

export default OtherProfile