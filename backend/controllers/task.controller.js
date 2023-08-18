import Task from "../models/task.model.js";
export const getTasks = async ({ user: { id } }, res) => {
  try {
    const tasks = await Task.find({ user: id }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(404);
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user.id,
    }).populate("user");
    if (!task.user) return res.status(404).json({ message: "Unauthorized" });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Task not found" });
  }
};

export const createTask = async (
  { body: { title, description, date }, user: { id } },
  res
) => {
  try {
    const newTask = new Task({ title, description, date, user: id });
    const savedTask = await newTask.save();
    res.json(savedTask);
  } catch (error) {
    return res.status(404);
  }
};

export const updateTask = async (
  { body: { title, description, date }, params: { id } },
  res
) => {
  try {
    const updatedTask = { title, description, date: date || new Date() };
    console.log(updatedTask);
    const task = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    return res.status(404);
  }
};

export const deleteTask = async ({ params: { id } }, res) => {
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.json({
      message: "Task Deleted",
      taskDeleted: task,
    });
  } catch (error) {
    return res.status(404);
  }
};
