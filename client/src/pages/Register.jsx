import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
function Register() {
  const { signup, isAuthenticated, errors: registerErrors } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/tasks");
  }, [isAuthenticated]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md shadow-md shadow-black">
        {registerErrors.length > 0 &&
          registerErrors[0].map((err, i) => (
            <div
              className="bg-red-500 text-white text-center p-2 my-2 rounded-md"
              key={i}
            >
              {err}
            </div>
          ))}

        <h1 className="text-2xl font-bold my-2">Register</h1>

        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register("username", { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}
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
            Register
          </button>
        </form>

        <p className="flex gap-x-2 mt-5 justify-between">
          Already have an account?
          <Link className="text-sky-500 my-2" to="/Login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
