import { faker } from "@faker-js/faker";
import mongoose from "mongoose";
import { fakeReview, getRandomNumber, getRndZipData } from "./getRndData.js";

const fakeUserSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  userInfo: {
    firstName: {
      type: String,
    },
    lastName: {
      type: String,
    },
    aboutMe: {
      type: String,
    },
    interest: {
      type: [String],
    },
    defaultLocation: {
      placeName: {
        type: String,
      },
      state: {
        type: String,
      },
      coordinates: {
        type: [Number],
        index: "2dsphere",
      },
    },
    avatar: {
      secure_url: {
        type: String,
      },
    },
  },
  reviews: [
    {
      postUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      content: {
        type: String,
      },
      rating: {
        type: Number,
      },
      creationDate: {
        type: Date,
      },
    },
  ],
  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  connections: {
    following: {
      type: [String],
    },

    followers: {
      type: [String],
    },
  },
});

const FakeUser = mongoose.model("User", fakeUserSchema);

const postFakeUser = async () => {
  const { latitude, longitude, state, placeName } = await getRndZipData();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const interest = Array.from({ length: 8 }, () => faker.commerce.department());
  const following = Array.from({ length: getRandomNumber() }, () =>
    faker.database.mongodbObjectId(),
  );
  const followers = Array.from({ length: getRandomNumber() }, () =>
    faker.database.mongodbObjectId(),
  );

  const fakeUserData = {
    email: faker.internet.email({ firstName, lastName }),
    password: faker.internet.password(),
    userInfo: {
      firstName,
      lastName,
      aboutMe: `Hey! My name is ${firstName}, im ${faker.number.int({
        min: 35,
        max: 55,
      })} years old and live in ${placeName}. Follow me if you want to Checkout my feature Events! And if you like me then please leave a review before you go.`,
      interest,
      defaultLocation: {
        placeName,
        state,
        coordinates: [latitude, longitude],
      },
      avatar: {
        secure_url: faker.image.urlLoremFlickr({ category: "selfie" }),
      },
    },
    bookmarks: [],
    connections: {
      following,
      followers,
    },
    __v: 0,
  };

  const fakeUser = new FakeUser(fakeUserData);

  try {
    await fakeUser.save();
    console.log(`Fake User: ${firstName} saved`);
  } catch (error) {
    console.error("Error saving fake user data", error);
  }
};
export const postFakeOrganizer = async () => {
  const { latitude, longitude, state, placeName } = await getRndZipData();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const interest = Array.from({ length: 8 }, () => faker.commerce.department());
  const reviews = Array.from({ length: Math.floor(Math.random() * 6) }, () =>
    fakeReview(),
  );
  const following = Array.from({ length: getRandomNumber() }, () =>
    faker.database.mongodbObjectId(),
  );
  const followers = Array.from({ length: getRandomNumber() }, () =>
    faker.database.mongodbObjectId(),
  );

  const fakeUserData = {
    email: faker.internet.email({ firstName, lastName }),
    password: faker.internet.password(),
    userInfo: {
      firstName,
      lastName,
      aboutMe: `Hey! My name is ${firstName}, im ${faker.number.int({
        min: 35,
        max: 55,
      })} years old and live in ${placeName}. Follow me if you want to Checkout my feature Events! And if you like me then please leave a review before you go.`,
      interest,
      defaultLocation: {
        placeName,
        state,
        coordinates: [latitude, longitude],
      },
      avatar: {
        secure_url: faker.image.urlLoremFlickr({ category: "selfie" }),
      },
    },
    reviews,
    bookmarks: [],
    connections: {
      following,
      followers,
    },
    __v: 0,
  };

  const fakeUser = new FakeUser(fakeUserData);

  try {
    await fakeUser.save();
    console.log(`Fake Organizer: ${firstName} saved`);
  } catch (error) {
    console.error("Error saving fake Orangizer data", error);
  }
};

export const getFakeUserId = async () => {
  try {
    const users = await FakeUser.find({}, "_id").lean();

    if (!Array.isArray(users)) {
      throw new Error("The result is not an array.");
    }

    return users.map((user) => user._id.toString());
  } catch (error) {
    console.error(error);
  }
};

export default postFakeUser;
