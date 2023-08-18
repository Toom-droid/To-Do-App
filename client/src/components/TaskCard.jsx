import { useTasks } from "../context/TaskContext";
import { Link } from "react-router-dom";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  return (
    <div className="bg-zinc-800 max-w-md w-full rounded-md shadow-md shadow-black p-5 mx-auto">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{task.title}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            className="bg-red-600 hover:bg-red-500 transition colors p-2 rounded-sm"
            onClick={() => {
              deleteTask(task._id);
            }}
          >
            Delete
          </button>
          <Link
            className="bg-green-800 hover:bg-green-700 transition colors p-2 rounded-sm"
            to={`/tasks/${task._id}`}
          >
            Edit
          </Link>
        </div>
      </header>
      <p className="text-slate-300">{task.description}</p>
      <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
    </div>
  );
}

export default TaskCard;
