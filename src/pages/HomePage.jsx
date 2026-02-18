import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogThunk } from "../store/slices/blogs.slice";
import CardBlog from "../components/CardBlog";

const HomePage = () => {
  const { blogs } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBlogThunk());
  }, []);

  console.log(blogs);
  return (
    <div className="min-h-screen bg-black p-10 font-mono text-zinc-300">
      <h1 className="text-3xl text-amber-400 mb-10 border border-zinc-700 p-4 inline-block">
        BLOG_ARCHIVE
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {blogs?.content?.map((blog) => (
          <CardBlog key={blog.idBlog} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
