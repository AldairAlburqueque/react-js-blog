import React from "react";
import { useForm } from "react-hook-form";
import { API_URL } from "../utils/url";
import axios from "axios";
import defaultValues from "../utils/defaultValues";

const LoginPage = () => {
  const { register, handleSubmit, reset } = useForm();

  const submit = (data) => {
    const url = `${API_URL}/auth/login`;
    axios
      .post(url, data)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    reset(defaultValues);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="">Email</label>
          <input type="email" id="email" {...register("email")} />
        </div>

        <div>
          <label htmlFor="">Password</label>
          <input type="password" id="password" {...register("password")} />
        </div>

        <button>Login</button>
      </form>
    </div>
  );
};

export default LoginPage;
