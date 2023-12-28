import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Blog from './Blog.jsx';

function Blogs() {
  const [blogs, setBlogs] = useState([]);

  async function sendRequest() {
    try {
      const res = await axios.get(`http://localhost:5000/api/blog`);
      const data = res.data;
      return data;
    } catch (err) {
      console.error(err);
      return [];
    }
  }

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);

  console.log(blogs);

  return (
    <div>
      {blogs.length !== 0 &&
        blogs.map((blog) => (
          <Blog
            key={blog._id}
            id={blog._id}
            isUser={localStorage.getItem('userID') === blog.user._id}
            user={blog.user.name}
            description={blog.description}
            imageURL={blog.image}
            title={blog.title}
          />
        ))}
    </div>
  );
}

export default Blogs;
