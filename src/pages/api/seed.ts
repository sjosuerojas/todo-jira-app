import { db } from "@/database";
import { seedData } from "@/database/seed-data";
import TaskModel from "@/database/task.model";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  msg: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await db.connect();
  await TaskModel.deleteMany();
  await TaskModel.insertMany(seedData.entries);
  await db.disconnect();

  res.status(200).json({ msg: "DB loaded with data" });
}
