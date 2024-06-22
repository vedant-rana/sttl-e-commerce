import mongoose from "mongoose";

export const connectToMongoDb = async (connectionString) => {
  await mongoose
    .connect(connectionString, {
      tlsAllowInvalidCertificates: true,
    })
    .then((data) => {
      const data1 = data.connection
      console.log("DB Connected to : " + data1.name);
    })
    .catch((err) => {
      console.log("Error Connecting to MongoDB : " + err.message);
    });
};
