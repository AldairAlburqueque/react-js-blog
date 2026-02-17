import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "../utils/url";
import axios from "axios";
import defaultValues from "../utils/defaultValues";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/auth.slice";

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm();

  const [token, setToken] = useState();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const submit = (data) => {
    const url = `${API_URL}/auth/login`;
    axios
      .post(url, data)
      .then((res) => {
        console.log(res.data);
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("name", res.data.name);

        dispatch(setUser(res.data.name));
        if (localStorage.getItem("token")) {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
        localStorage.clear();
      });

    reset(defaultValues);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center font-mono px-4">
      <div className="bg-zinc-900 border border-zinc-700 w-full max-w-md p-8">
        {/* Metadata tipo sistema */}

        <h1 className="text-2xl text-amber-400 border-b border-zinc-700 pb-3 mb-6">
          ACCESS_PORTAL
        </h1>

        <form onSubmit={handleSubmit(submit)} className="space-y-5">
          {/* Email */}
          <div className="flex flex-col">
            <label className="text-zinc-400 text-xs mb-1">EMAIL</label>
            <input
              type="email"
              {...register("email", { required: true })}
              className="bg-zinc-800 border border-zinc-700 
                     text-zinc-200 p-2 
                     focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-zinc-400 text-xs mb-1">PASSWORD</label>
            <input
              type="password"
              {...register("password", { required: true })}
              className="bg-zinc-800 border border-zinc-700 
                     text-zinc-200 p-2 
                     focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Botón */}
          <button
            type="submit"
            className="w-full border border-amber-400 
                   text-amber-400 py-2 
                   hover:bg-amber-400 hover:text-black 
                   transition-colors duration-200"
          >
            EXECUTE_LOGIN
          </button>
        </form>

        {/* Divider */}
        <div className="border-t border-zinc-700 my-6"></div>

        {/* Link a register */}
        <div className="text-sm text-zinc-400">
          New access request?{" "}
          <Link
            to="/auth/register"
            className="text-cyan-400 hover:text-amber-400 transition-colors"
          >
            CREATE_ACCOUNT
          </Link>
        </div>

        {/* Footer estado */}
        <div className="mt-6 text-xs text-zinc-500">
          status: awaiting_credentials...
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
