import { Task } from "@/models";

interface SeedTask extends Omit<Task, "_id"> {}
interface SeedDataTask {
  entries: SeedTask[];
}

export const seedData: SeedDataTask = {
  entries: [
    {
      description: "# Removal of Synth Sub from Pelvic Cav, Perc Endo Approach",
      status: "Pending",
      createdAt: 164873593400,
    },
    {
      description: "# Restriction of Left Hypogastric Vein, Perc Endo Approach",
      status: "Done",
      createdAt: 167111286200,
    },
    {
      description:
        "# Release Left Knee Joint, Percutaneous Endoscopic Approach",
      status: "Done",
      createdAt: 166586937800,
    },
    {
      description: "# Repair Pancreas, Percutaneous Approach",
      status: "InProgress",
      createdAt: 165033343200,
    },
    {
      description: "# Occlusion of Sigmoid Colon, Open Approach",
      status: "Pending",
      createdAt: 165204745300,
    },
    {
      description:
        "# Dilate of Innom Art, Bifurc, with 2 Drug-elut, Open Approach",
      status: "Pending",
      createdAt: 167472511000,
    },
    {
      description: "# Fusion 2-7 T Jt w Autol Sub, Ant Appr A Col, Perc",
      status: "Pending",
      createdAt: 165390098400,
    },
    {
      description:
        "# Drainage of Left Ethmoid Sinus with Drain Dev, Open Approach",
      status: "InProgress",
      createdAt: 165024623200,
    },
    {
      description: "# Fusion Thor Jt w Synth Sub, Ant Appr A Col, Perc Endo",
      status: "Done",
      createdAt: 166668243100,
    },
    {
      description: "# Excision of Right Ventricle, Perc Endo Approach, Diagn",
      status: "Done",
      createdAt: 167648334300,
    },
  ],
};
