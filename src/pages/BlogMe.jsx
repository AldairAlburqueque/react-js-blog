import React, { useEffect } from "react";
import CardBlog from "../components/CardBlog";
import { useDispatch, useSelector } from "react-redux";
import { getMyBlogThunk } from "../store/slices/blogs.slice";

const BlogMe = () => {
  const dispatch = useDispatch();
  const { blogs } = useSelector((state) => state);

  useEffect(() => {
    dispatch(getMyBlogThunk());
  }, []);

  return (
    <div className="min-h-screen bg-black p-10 font-mono text-zinc-300">
      <h1 className="text-3xl text-amber-400 mb-10">MIS BLOGS</h1>

      <div className="grid md:grid-cols-2 gap-8">
        {blogs?.content?.map((blog) => (
          <CardBlog key={blog.idBlog} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogMe;
