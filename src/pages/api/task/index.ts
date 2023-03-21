import type { NextApiRequest, NextApiResponse } from "next";
import type { Task } from "@/models";
import { StatusCodes } from "http-status-codes";
import { db } from "@/database";
import TaskModel from "@/database/task.model";

type ResponseMsg = {
  msg: string;
  data?: Task | Task[];
};

type Data = ResponseMsg | Task | Task[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case "GET":
      return getAllTasks(res);
    case "POST":
      return createTask(req, res);
    default:
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Method not implemented" });
  }
}

const getAllTasks = async (res: NextApiResponse<Data>) => {
  try {
    await db.connect();
    const tasks = await TaskModel.find();
    await db.disconnect();

    res
      .status(StatusCodes.OK)
      .json({ msg: "Successfully retrieved data", data: tasks });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Unexpeted fail when trying to fecth all results" });
  }
};

const createTask = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { description } = req.body;
  const task = new TaskModel({ description, createdAt: Date.now() });

  try {
    await db.connect();
    await task.save();
    await db.disconnect();

    res
      .status(StatusCodes.CREATED)
      .json({ msg: "New Task created", data: task });
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Unexpeted fail when trying to update Task" });
  }
};
