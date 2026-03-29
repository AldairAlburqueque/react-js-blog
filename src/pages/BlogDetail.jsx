import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/url";
import config from "../utils/getConfig";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const BlogDetail = () => {
  const [blog, setBlog] = useState(null);
  const { register, handleSubmit, reset } = useForm();
  const { auth } = useSelector((state) => state);

  console.log("auth: ", auth);
  console.log("auth role: ", auth.role);

  const { id } = useParams();

  useEffect(() => {
    const url = `${API_URL}/blog/${id}`;
    axios
      .get(url, config())
      .then((res) => setBlog(res.data))
      .catch((err) => console.log(err));
  }, [id]);

  const handleComment = (data) => {
    const url = `${API_URL}/comments/save`;

    const body = {
      ...data,
      blogId: blog.idBlog,
    };
    axios
      .post(url, body, config())
      .then((res) => {
        setBlog((prev) => ({
          ...prev,
          comments: [res.data, ...(prev.comments || [])],
        }));
        reset();
      })
      .catch((err) => console.log(err));
  };

  const handleDeleteComment = (commentId) => {
    const url = `${API_URL}/comments/delete/${commentId}`;
    axios
      .delete(url, config())
      .then((res) => res.data)
      .catch((err) => console.log(err));
  };

  const token = localStorage.getItem("token");

  if (!blog) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-500 font-mono">
        loading_blog_data...
      </div>
    );
  }
  console.log("blog: ", blog);
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
            <span className="text-cyan-400">{blog.category?.categoria}</span>
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

          {/* FORM */}
          <div className="mb-8 bg-zinc-900 border border-zinc-700 p-4">
            <h4 className="text-xs text-zinc-500 mb-3 tracking-wide">
              write_new_comment...
            </h4>

            <form
              onSubmit={handleSubmit(handleComment)}
              className="flex flex-col gap-3"
            >
              <textarea
                {...register("comment")}
                id="comment"
                placeholder="type your comment..."
                rows={3}
                className="w-full bg-zinc-800 border border-zinc-700 text-zinc-300 p-3 text-sm 
        focus:outline-none focus:border-amber-400 transition-colors resize-none"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="border border-amber-400 text-amber-400 px-4 py-1.5 text-xs
          hover:bg-amber-400 hover:text-black transition-all duration-300 tracking-wide"
                >
                  EXECUTE_COMMENT
                </button>
              </div>
            </form>
          </div>

          {/* EMPTY STATE */}
          {blog?.comments?.length === 0 ? (
            <p className="text-zinc-500 text-sm">no_comments_found...</p>
          ) : (
            <div className="space-y-6">
              {blog.comments.map((com) => (
                <div
                  key={com.idComment}
                  className="bg-zinc-900 border border-zinc-700 p-4 hover:border-amber-400 transition-all duration-300"
                >
                  <div className="flex gap-3">
                    {/* AVATAR */}
                    <div className="w-8 h-8 flex items-center justify-center border border-amber-400 text-amber-400 text-xs">
                      {com.user?.name?.charAt(0)}
                    </div>

                    <div className="flex-1">
                      {/* HEADER */}
                      <div className="flex justify-between items-center mb-1 text-xs text-zinc-500">
                        <span>
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

                      {blog?.user.idUser === com?.user.idUser ? (
                        <button
                          onClick={() => handleDeleteComment(com.idComment)}
                        >
                          Eliminar
                        </button>
                      ) : (
                        <h1>hola</h1>
                      )}
                    </div>
                  </div>
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
