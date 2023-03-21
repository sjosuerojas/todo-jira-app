import type { NextApiRequest, NextApiResponse } from "next";
import type { Task } from "@/models";
import { db } from "@/database";
import mongoose from "mongoose";
import TaskModel from "@/database/task.model";
import { StatusCodes } from "http-status-codes";

type ResponseMsg = {
  msg: string;
  data?: Task | Task[];
};

type Data = ResponseMsg | Task | Task[];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id } = req.query;

  if (!mongoose.isValidObjectId(id))
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ msg: "Please send a valid ID" });

  switch (req.method) {
    case "PUT":
      return updateTask(req, res);
    case "GET":
      return getTaskbyId(req, res);
    default:
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "Method not implemented" });
  }
}

const updateTask = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();
    const task = await TaskModel.findById(id);
    if (task) {
      const { description = task.description, status = task.status } = req.body;

      const updateOptions = { runValidators: true, new: true };
      const updatedTask = await TaskModel.findByIdAndUpdate(
        id,
        { description, status },
        updateOptions
      );

      await db.disconnect();
      return res.status(StatusCodes.OK).json({
        msg: "Task has been updated successfully",
        data: updatedTask!,
      });
    }

    res.status(StatusCodes.BAD_GATEWAY).json({ msg: "Task not found" });
    await db.disconnect();
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Unexpeted fail when trying to update" });
  }
};

const getTaskbyId = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  const { id } = req.query;

  try {
    await db.connect();
    const task = await TaskModel.findById(id);

    if (!task) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ msg: "The provided task id was not found" });
    }

    res
      .status(StatusCodes.OK)
      .json({ msg: "Successfully retrieved data", data: task });

    await db.disconnect();
  } catch (error) {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ msg: "Unexpeted fail when trying to update" });
  }
};
