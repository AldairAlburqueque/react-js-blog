import axios from "axios";
import React from "react";

import { useForm } from "react-hook-form";
import defaultValues from "../utils/defaultValues";
import { useNavigate } from "react-router-dom";
import { API_URL } from "../utils/url";

const RegisterPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();

  const submit = async (data) => {
    try {
      const url = `${API_URL}/auth/save`;
      const res = await axios.post(url, data);

      console.log(res.data);

      reset(defaultValues);
      navigate("/login");
    } catch (err) {
      console.error("Error al registrar:", err.response?.data || err.message);
    }
  };

  const roles = [
    { idRol: 1, rol: "Admin" },
    { idRol: 2, rol: "User" },
  ];

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono px-4">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-lg p-8">
        {/* Header tipo sistema */}

        <h1 className="text-2xl text-amber-400 border-b border-zinc-700 pb-3 mb-6">
          CREATE_ACCOUNT
        </h1>

        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-zinc-400 text-xs mb-1">NAME</label>
            <input
              {...register("name")}
              type="text"
              className="bg-zinc-800 border border-zinc-700 
                       text-zinc-200 p-2 
                       focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-zinc-400 text-xs mb-1">EMAIL</label>
            <input
              {...register("email")}
              type="text"
              className="bg-zinc-800 border border-zinc-700 
                       text-zinc-200 p-2 
                       focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col">
            <label className="text-zinc-400 text-xs mb-1">DESCRIPTION</label>
            <input
              {...register("description")}
              type="text"
              className="bg-zinc-800 border border-zinc-700 
                       text-zinc-200 p-2 
                       focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-zinc-400 text-xs mb-1">PASSWORD</label>
            <input
              {...register("password")}
              type="password"
              className="bg-zinc-800 border border-zinc-700 
                       text-zinc-200 p-2 
                       focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label className="text-zinc-400 text-xs mb-1">ROLE</label>
            <select
              {...register("rolId")}
              className="bg-zinc-800 border border-zinc-700 
               text-zinc-200 p-2 
               focus:outline-none focus:border-amber-400"
            >
              <option value="">-- SELECT ROLE --</option>
              <option value="1">ADMIN</option>
              <option value="2">USER</option>
            </select>
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full border border-amber-400 
                     text-amber-400 py-2 
                     hover:bg-amber-400 hover:text-black 
                     transition-colors duration-200"
          >
            EXECUTE
          </button>
        </form>

        {/* Footer */}
      </div>
    </div>
  );
};

export default RegisterPage;
