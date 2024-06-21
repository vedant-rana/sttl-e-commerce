import mongoose from "mongoose";

export const connectToMongoDb = async (connectionString) => {
  await mongoose
    .connect(connectionString, {
      dbName: "practice",
    })
    .then((data) => {
      console.log("DB Connected to : " + data.connection.host);
    })
    .catch((err) => {
      console.log("Error Connecting to MongoDB : " + err.message);
    });
};
