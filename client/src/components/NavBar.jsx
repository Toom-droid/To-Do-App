import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function NavBar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-2 flex justify-between py-5 px-10 rounded-lg shadow-sm shadow-black">
      <Link to={isAuthenticated ? "/tasks" : "/"}>
        <h1 className="text-2xl font-bold">Tasks Manager</h1>
      </Link>
      <ul className="flex gap-x-5">
        {isAuthenticated ? (
          <>
            <li>
              Welcome <strong>{user.username}</strong>
            </li>
            <li>
              <Link
                to="/add-task"
                className="bg-indigo-600 hover:bg-indigo-500 transition-colors px-4 py-2 rounded-sm"
              >
                Add Task
              </Link>
            </li>
            <li>
              <Link
                className="bg-orange-500 hover:bg-orange-600 transition-colors px-4 py-2 rounded-sm"
                to="/"
                onClick={() => {
                  logout();
                }}
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/login" className="bg-indigo-500 px-4 py-2 rounded-sm">
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="bg-indigo-500 px-4 py-2 rounded-sm"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default NavBar;
