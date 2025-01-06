import mongoose from "mongoose";
const coondb = async () => {
  await mongoose
    .connect( process.env.MONGO_URI, { dbName: "fulltask" })
    .then(() => {
      console.log("Database connected");
    })
    .catch((error) => {
      console.error("Error connecting to database", error);
    });
};

export default coondb;
