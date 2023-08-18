import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import { taskSchema } from "../schemas/task.schema.js";
import { validateSchema } from "../middlewares/validateAuthSchema.js";
const taskRouter = Router();
taskRouter.get("/tasks", authRequired, getTasks);
taskRouter.get("/tasks/:id", authRequired, getTask);
taskRouter.post("/tasks", authRequired, validateSchema(taskSchema), createTask);
taskRouter.put(
  "/tasks/:id",
  authRequired,
  validateSchema(taskSchema),
  updateTask
);
taskRouter.delete("/tasks/:id", authRequired, deleteTask);

export default taskRouter;
