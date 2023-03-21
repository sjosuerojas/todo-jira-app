import mongoose, { Model, Schema } from "mongoose";
import { Task } from "@/models";

const taskSchema = new Schema({
  description: { type: String, require: true },
  createdAt: { type: Number },
  status: {
    type: String,
    default: "Pending",
    enum: { values: ["Pending", "InProgress", "Done"] },
  },
});

const TaskModel: Model<Task> =
  mongoose.models.Task || mongoose.model("Task", taskSchema);

export default TaskModel;
