import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBlogThunk } from "../store/slices/blogs.slice";
import CardBlog from "../components/CardBlog";
import { Link, useParams } from "react-router-dom";

const HomePage = () => {
  const { blogs } = useSelector((state) => state);
  const dispatch = useDispatch();

  const { id } = useParams();

  useEffect(() => {
    dispatch(getAllBlogThunk(id));
  }, [id]);

  return (
    <div className="min-h-screen bg-black p-10 font-mono text-zinc-300">
      <h1 className="text-3xl text-amber-400 mb-10 border border-zinc-700 p-4 inline-block">
        BLOG_ARCHIVE
      </h1>

      <Link
        to="/blog/create"
        className="
    fixed bottom-8 right-8 
    w-14 h-14
    
    flex items-center justify-center
    
    bg-amber-400 text-black 
    rounded-full
    
    border border-amber-400
    shadow-lg shadow-amber-400/20
    
    hover:bg-black hover:text-amber-400
    transition-all duration-300
    
    z-50
  "
      >
        +
      </Link>

      <div className="grid md:grid-cols-2 gap-8">
        {blogs?.content?.map((blog) => (
          <CardBlog key={blog.idBlog} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
