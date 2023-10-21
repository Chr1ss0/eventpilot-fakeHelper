import mongoose from "mongoose";
import "dotenv/config";
import postFakeEvent from "./FakeEvent.js";
import postFakeUser from "./FakeUser.js";

const { MONGO_URI } = process.env;

mongoose.connect(MONGO_URI).catch((error) => console.log(error));

// Intervall for Feed

// postFakeEvent().catch((error) => console.log(error));
postFakeUser().catch((error) => console.log(error));
