import mongoose from "mongoose";

const urlDatabase = process.env.DATABASE_ULR_CONNECTION || "";

enum StatusDatabase {
  disconnected = 0,
  connected = 1,
}

let conectionStatus: StatusDatabase = 0;

const connect = async () => {
  if (
    (mongoose.connections.length && mongoose.connections[0].readyState === 1) ||
    conectionStatus === StatusDatabase.connected
  )
    return;

  if (mongoose.connections.length && mongoose.connections[0].readyState !== 1)
    await disconnect();

  try {
    await mongoose.connect(urlDatabase);
    conectionStatus = StatusDatabase.connected;
    console.log(`Mongo DB is: ${conectionStatus ? "On" : "Off"}`);
  } catch (error) {
    conectionStatus = StatusDatabase.disconnected;
    console.log("Trying to connect to MondgoDB: " + error);
  }
};

const disconnect = async () => {
  if (
    conectionStatus === StatusDatabase.disconnected &&
    process.env.NODE_ENV === "development"
  )
    return;

  try {
    await mongoose.disconnect();
    conectionStatus = StatusDatabase.disconnected;
    console.log("MongoDB is disconnected");
  } catch (error) {
    throw new Error(
      "Trying to disconnect was not possible, see more details " + error
    );
  }
};

export { connect, disconnect };
