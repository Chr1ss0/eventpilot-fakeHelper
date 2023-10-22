import mongoose from "mongoose";
import "dotenv/config";
import { createUserBase } from "./createUserBase.js";

const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI).catch((error) => console.log(error));

createUserBase(150, 20, 50).catch((error) => console.log(error));
