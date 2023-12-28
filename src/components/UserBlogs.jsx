import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Blog from './Blog';

function UserBlogs() {
    const [user, setUser] = useState();
    const id = localStorage.getItem("userID");

    async function sendRequest() {
        const res = await axios.get(`http://localhost:5000/api/blog/user/${id}`)
            .catch(err => console.log(err))
        const data = await res.data;
        return data;
    }
    useEffect(() => {
        sendRequest()
            .then((data) => setUser(data.user.blogs))
    }, [sendRequest])
    console.log(user);
    return (
        <>
            {" "}
            {user && user.map((blog, index) => (
                <Blog key={index}
                    isUser={true}
                    id={blog._id}
                    user={user.name}
                    description={blog.description}
                    imageURL={blog.image}
                    title={blog.title} />
            ))}
        </>
    )
}

export default UserBlogs;