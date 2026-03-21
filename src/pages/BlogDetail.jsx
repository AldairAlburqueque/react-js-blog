import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/url";
import config from "../utils/getConfig";

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const url = `${API_URL}/blog/${id}`;
    axios
      .get(url, config())
      .then((res) => setBlog(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!blog) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-mono">
        loading_blog_data...
      </div>
    );
  }
  console.log(blog)
  return (
    <div className="min-h-screen bg-black text-zinc-300 font-mono px-6 py-10">
      <div className="max-w-4xl mx-auto">

        {/* TITLE */}
        <h1 className="text-4xl text-amber-400 mb-6 border border-zinc-700 p-4 inline-block tracking-wide">
          {blog.title}
        </h1>

        {/* META INFO */}
        <div className="flex flex-wrap gap-4 text-xs text-zinc-500 mb-8">

          {/* AUTHOR */}
          <div className="border border-zinc-700 px-3 py-1">
            user: <span className="text-amber-400">{blog.user?.name}</span>
          </div>

          {/* CATEGORY */}
          <div className="border border-zinc-700 px-3 py-1">
            category:{" "}
            <span className="text-cyan-400">
              {blog.category?.categoria}
            </span>
          </div>

          {/* DATE */}
          <div className="border border-zinc-700 px-3 py-1">
            created:{" "}
            <span className="text-zinc-400">
              {new Date(blog.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* CONTENT */}
        <div className="bg-zinc-900 border border-zinc-700 p-6 leading-relaxed text-sm whitespace-pre-line">
          {blog.content}
        </div>

        {/* COMMENTS */}
<div className="mt-12">
  <h2 className="text-lg text-amber-400 border-b border-zinc-700 pb-2 mb-6 tracking-wide">
    COMMENTS ({blog?.comments?.length || 0})
  </h2>

  {blog?.comments?.length === 0 ? (
    <p className="text-zinc-500 text-sm">
      no_comments_found...
    </p>
  ) : (
    <div className="space-y-6">
      {blog.comments.map((com) => (
        <div
          key={com.idComment}
          className="bg-zinc-900 border border-zinc-700 p-4 hover:border-amber-400 transition-colors"
        >
          {/* HEADER */}
          <div className="flex justify-between items-center mb-2 text-xs text-zinc-500">
            <span>
              user:{" "}
              <span className="text-amber-400">
                {com.user?.name}
              </span>
            </span>

            <span>
              {new Date(com.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* CONTENT */}
          <p className="text-sm text-zinc-300 leading-relaxed">
            {com.comment}
          </p>
        </div>
      ))}
    </div>
  )}
</div>

        {/* FOOTER SYSTEM STYLE */}
        <div className="mt-10 text-xs text-zinc-600 border-t border-zinc-800 pt-4">
          status: blog_loaded_successfully ✔
        </div>

      </div>
    </div>
  );
};

export default BlogDetail;
