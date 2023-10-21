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
      firstName: {
        type: String,
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
      secure_url: {
        type: String,
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

const FakeUserModel = mongoose.model("FakeUser", fakeUserSchema);

const postFakeUser = async () => {
  const { latitude, longitude, state, placeName } = await getRndZipData();
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const interest = Array.from({ length: 8 }, () => faker.commerce.department());
  const reviews = Array.from({ length: 5 }, () => fakeReview());
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
      following: following,
      followers,
    },
    __v: 0,
  };

  const event = new FakeUserModel(fakeUserData);

  try {
    await event.save();
    console.log("Fake User data saved");
  } catch (error) {
    console.error("Error saving fake event data");
  }
};

export default postFakeUser;
