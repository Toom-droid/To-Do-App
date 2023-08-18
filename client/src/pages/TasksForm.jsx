import { useForm } from "react-hook-form";
import { useTasks } from "../context/TaskContext";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import utc from "dayjs/plugin/utc";
import dayjs from "dayjs";
dayjs.extend(utc);

function TasksForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { createTask, getTask, updateTask } = useTasks();

  const [taskCreated, setTaskCreated] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    async function loadTask() {
      if (id) {
        const {
          data: { title, description, date },
        } = await getTask(id);
        setValue("title", title);
        setValue("description", description);
        setValue("date", dayjs(date).utc().format("YYYY-MM-DD"));
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit(async (data) => {
    const dataValid = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : undefined,
    };

    if (data.date) dataValid.date = dayjs.utc(data.date).format();

    if (id) {
      await updateTask(id, dataValid);
    } else {
      await createTask(dataValid);
    }
    navigate("/tasks");
  });

  return (
    <div className="flex items-center justify-center h-[calc(100vh-100px)]">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md shadow-md shadow-black">
        <form onSubmit={onSubmit}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            placeholder="Title"
            {...register("title", { required: true })}
            autoFocus
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          {errors.title && (
            <p className="text-red-500 mb-2">Title is required</p>
          )}

          <label htmlFor="title">Description</label>
          <textarea
            rows="3"
            name="description"
            placeholder="description"
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            {...register("description", { required: true })}
          />
          {errors.description && (
            <p className="text-red-500 mb-2">description is required</p>
          )}

          <label htmlFor="date">Date</label>
          <input
            type="date"
            name="date"
            {...register("date")}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />

          <button className="px-4 py-2 bg-blue-600 rounded-md my-1 hover:bg-blue-500 transition-colors">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}

export default TasksForm;
