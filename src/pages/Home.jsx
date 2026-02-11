import axios from "axios";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const url = `http://localhost:8080/blog/list`;
    axios
      .get(url)
      .then((res) => setBlogs(res.data.content))
      .catch((err) => console.log(err));
  }, []);

  console.log(blogs);
  return (
    <div>
      {blogs.map((blog) => (
        <div key={blog.idBlog}>
          <h3>{blog.title}</h3>
          <p>{blog.content}</p>
          <h4>{blog.user.name}</h4>
        </div>
      ))}
    </div>
  );
};

export default Home;
