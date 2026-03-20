import React, { useEffect, useState } from "react";
import { API_URL } from "../utils/url";
import config from "../utils/getConfig";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export const CreateBlog = () => {
  const { register, handleSubmit, reset } = useForm();
  const [category, setCategory] = useState([]);
  const navigate = useNavigate();

  const submit = (data) => {
    const url = `${API_URL}/blog/create`;

    // const body = {
    //   ...data,
    //   categoryId: Number(data.categoryId),
    // };

    axios
      .post(url, data, config())
      .then((res) => res.data)
      .catch((err) => console.log(err.response?.data));

    navigate("/");
  };

  useEffect(() => {
    const url = `http://localhost:8080/category/list`;
    axios
      .get(url)
      .then((res) => setCategory(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono px-4">
      <div className="w-full max-w-2xl bg-zinc-900 border border-zinc-700 p-8">
        {/* Header */}
        <h2 className="text-2xl text-amber-400 border-b border-zinc-700 pb-3 mb-6 tracking-wide">
          CREATE_BLOG_ENTRY
        </h2>

        <form className="space-y-6" onSubmit={handleSubmit(submit)}>
          {/* Title */}
          <div className="flex flex-col">
            <label htmlFor="title" className="text-zinc-400 text-xs mb-1">
              TITLE
            </label>
            <input
              type="text"
              {...register("title")}
              id="title"
              className="bg-zinc-800 border border-zinc-700 text-zinc-200 p-2 
            focus:outline-none focus:border-amber-400 transition-colors"
            />
          </div>

          {/* Content */}
          <div className="flex flex-col">
            <label htmlFor="content" className="text-zinc-400 text-xs mb-1">
              CONTENT
            </label>
            <textarea
              {...register("content")}
              id="content"
              rows="5"
              className="bg-zinc-800 border border-zinc-700 text-zinc-200 p-2 
            focus:outline-none focus:border-amber-400 transition-colors resize-none"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="text-zinc-400 text-xs mb-1">CATEGORY</label>
            <select
              {...register("categoryId")}
              className="bg-zinc-800 border border-zinc-700 text-zinc-200 p-2 
  focus:outline-none focus:border-amber-400 transition-colors"
            >
              <option value="">-- SELECT CATEGORY --</option>
              {category?.map((cat) => (
                <option
                  key={cat.idCategory}
                  value={cat.idCategory}
                  id={cat.idCategory}
                >
                  {cat.categoria}
                </option>
              ))}
            </select>
          </div>

          {/* Button */}
          <button
            type="submit"
            className="w-full border border-amber-400 text-amber-400 py-2 
          hover:bg-amber-400 hover:text-black transition-all duration-300 tracking-wide"
          >
            EXECUTE_CREATE
          </button>
        </form>

        {/* Footer tipo sistema */}
        <div className="mt-6 text-xs text-zinc-500">
          status: ready_to_insert_data...
        </div>
      </div>
    </div>
  );
};
