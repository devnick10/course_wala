import { config } from "@/config/index.js";

import mongoose from "mongoose";
export const connectDB = () => {
  mongoose
    .connect(config.MONGO_URL!, { dbName: "courseDB" })
    .then((c) => {
      console.log(`Connected with ${c.connection.name}`);
    })
    .catch((e) => console.log(e));

}

