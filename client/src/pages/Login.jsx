import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signin, errors: signinErrors, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md shadow-md shadow-black">
        {signinErrors.length > 0 &&
          signinErrors.map((err, i) => (
            <div
              className="bg-red-500 text-white p-2 text-center my-2 rounded-md"
              key={i}
            >
              {err}
            </div>
          ))}
        <h1 className="text-2xl font-bold my-2">Login</h1>

        <form onSubmit={onSubmit}>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            {...register("password", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button
            className="px-4 py-2 bg-blue-600 rounded-md my-3 hover:bg-blue-500 transition-colors"
            type="submit"
          >
            Login
          </button>
        </form>

        <p className="flex gap-x-2 mt-5 justify-between">
          Don't have an account?{" "}
          <Link className="text-sky-500 my-2" to="/register">
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
